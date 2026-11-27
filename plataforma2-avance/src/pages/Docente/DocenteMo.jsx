import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/env";

const getCollection = (responseData, key) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.[key])) return responseData[key];
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error(`El servidor devolvió una respuesta inesperada al consultar ${key}.`);
};

const getErrorMessage = (error, fallback) => (
    error.response?.data?.message || error.message || fallback
);

const isPublished = (module) => (
    module.is_published === true
    || module.is_published === 1
    || module.is_published === "1"
);

const getDateOnly = (value) => {
    const date = String(value ?? "").slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
};

const getLocalDate = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${now.getFullYear()}-${month}-${day}`;
};

const getModuleStatus = (module, today) => {
    if (!isPublished(module)) return "pending";

    const opensAt = getDateOnly(module.enrollment_opens_at);
    if (opensAt && opensAt > today) return "scheduled";

    const closesAt = getDateOnly(module.enrollment_closes_at);
    if (closesAt && closesAt < today) return "finished";

    return "active";
};

const moduleStatusLabels = {
    active: "Activo",
    finished: "Finalizado",
    pending: "Pendiente",
    scheduled: "Programado",
};

const moduleStatusStyles = {
    active: "bg-emerald-50 text-emerald-700",
    finished: "bg-slate-100 text-slate-600",
    pending: "bg-amber-50 text-amber-700",
    scheduled: "bg-sky-50 text-sky-700",
};

const DocenteMo = () => {
    const [modules, setModules] = useState([]);
    const [classGroups, setClassGroups] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [moduleEnrollments, setModuleEnrollments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let ignore = false;
        const requests = [
            ["modules", "/modules/list", "modules"],
            ["classGroups", "/class-groups/list", "class_groups"],
            ["gradeLevels", "/grade-levels/list", "grade_levels"],
            ["moduleEnrollments", "/module-enrollments/list", "module_enrollments"],
        ];

        Promise.allSettled(requests.map(([, url]) => api.get(url))).then((results) => {
            if (ignore) return;

            const values = {
                modules: [],
                classGroups: [],
                gradeLevels: [],
                moduleEnrollments: [],
            };
            const errors = [];

            results.forEach((result, index) => {
                const [key, , responseKey] = requests[index];
                if (result.status === "fulfilled") {
                    try {
                        values[key] = getCollection(result.value.data, responseKey);
                    } catch (parseError) {
                        console.error(`Error al leer ${key}:`, parseError);
                        errors.push(parseError.message);
                    }
                } else {
                    console.error(`Error al cargar ${key}:`, result.reason);
                    errors.push(getErrorMessage(result.reason, `No se pudo cargar ${key}.`));
                }
            });

            setModules(values.modules);
            setClassGroups(values.classGroups);
            setGradeLevels(values.gradeLevels);
            setModuleEnrollments(values.moduleEnrollments);
            setError(errors.join(" "));
            setLoading(false);
        });

        return () => {
            ignore = true;
        };
    }, [reloadKey]);

    const groupById = useMemo(
        () => new Map(classGroups.map((group) => [String(group.id), group])),
        [classGroups],
    );
    const gradeById = useMemo(
        () => new Map(gradeLevels.map((grade) => [String(grade.id), grade])),
        [gradeLevels],
    );

    const getGroupLabel = useCallback((module) => {
        const group = module.class_group
            || module.classGroup
            || groupById.get(String(module.class_group_id));
        if (!group) return "Curso no asignado";

        const grade = group.grade_level
            || group.gradeLevel
            || gradeById.get(String(group.grade_level_id));
        const gradeName = grade?.name || (group.grade_level_id ? `Grado ${group.grade_level_id}` : "");
        const parts = [
            gradeName,
            group.section,
            group.shift,
            group.campus?.name || group.campuse?.name,
        ].filter(Boolean);

        return parts.join(" · ") || "Curso no asignado";
    }, [gradeById, groupById]);

    const getEnrollmentCount = (module) => {
        const studentIds = new Set(
            moduleEnrollments
                .filter((enrollment) => String(enrollment.module_id ?? enrollment.module?.id) === String(module.id))
                .map((enrollment) => enrollment.student_id ?? enrollment.student?.id)
                .filter((studentId) => studentId !== null && studentId !== undefined),
        );
        return studentIds.size;
    };

    const filteredModules = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase();
        if (!normalizedSearch) return modules;

        return modules.filter((module) => (
            [module.name_module, getGroupLabel(module)]
                .some((value) => value?.toLocaleLowerCase().includes(normalizedSearch))
        ));
    }, [modules, search, getGroupLabel]);

    const retryLoad = () => {
        setLoading(true);
        setError("");
        setReloadKey((current) => current + 1);
    };

    const today = getLocalDate();
    const activeModuleCount = modules.filter((module) => getModuleStatus(module, today) === "active").length;
    const totalEnrollments = modules.reduce(
        (total, module) => total + getEnrollmentCount(module),
        0,
    );

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="max-w-2xl">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                                <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                                Espacio docente
                            </span>
                            <h1 className="m-0 text-2xl font-bold tracking-tight sm:text-3xl">Mis módulos</h1>
                            <p className="mb-0 mt-2 max-w-xl text-sm leading-6 text-slate-300">
                                Administra tus contenidos, consulta estudiantes inscritos y registra calificaciones.
                            </p>
                        </div>
                        <Link
                            to="/SubirModulo"
                            className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 no-underline shadow-lg shadow-sky-950/20 transition hover:bg-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-200/40"
                        >
                            <i className="bi bi-plus-lg" aria-hidden="true" />
                            Crear módulo
                        </Link>
                    </div>
                </header>

                {error && (
                    <div role="alert" className="flex items-start justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                        <span>{error}</span>
                        <button type="button" onClick={retryLoad} className="shrink-0 font-semibold underline">
                            Reintentar
                        </button>
                    </div>
                )}

                <section aria-label="Resumen de módulos" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: "Módulos asignados", value: loading ? "..." : modules.length, icon: "bi-journal-bookmark", tone: "bg-sky-50 text-sky-700" },
                        { label: "Módulos activos", value: loading ? "..." : activeModuleCount, icon: "bi-check-circle", tone: "bg-emerald-50 text-emerald-700" },
                        { label: "Inscripciones", value: loading ? "..." : totalEnrollments, icon: "bi-people", tone: "bg-violet-50 text-violet-700" },
                    ].map((item) => (
                        <article key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${item.tone}`}>
                                <i className={`bi ${item.icon}`} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="m-0 text-sm text-slate-500">{item.label}</p>
                                <p className="m-0 mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] sm:p-7">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="m-0 text-xl font-semibold text-slate-900">Tu oferta académica</h2>
                            <p className="mb-0 mt-1 text-sm text-slate-500">Busca por nombre del módulo o grupo asignado.</p>
                        </div>
                        <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-sky-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-500/10 sm:max-w-sm">
                            <i className="bi bi-search text-slate-400" aria-hidden="true" />
                            <input
                                className="w-full min-w-0 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar módulo o grupo..."
                                aria-label="Buscar módulo o grupo"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Limpiar búsqueda"
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                                >
                                    <i className="bi bi-x-lg" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                        <p className="m-0 text-sm font-semibold text-slate-800">
                            {loading ? "Cargando módulos..." : `${filteredModules.length} ${filteredModules.length === 1 ? "módulo" : "módulos"}`}
                        </p>
                        {!loading && modules.length > 0 && (
                            <span className="text-xs text-slate-500">{activeModuleCount} activos</span>
                        )}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3" role="status" aria-label="Cargando módulos">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                    <div className="h-36 animate-pulse bg-slate-100" />
                                    <div className="space-y-3 p-5">
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                                        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                                        <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredModules.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-5 py-14 text-center">
                            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-sky-600 shadow-sm">
                                <i className={`bi ${modules.length ? "bi-search" : "bi-journal-plus"}`} aria-hidden="true" />
                            </span>
                            <h3 className="mb-0 mt-4 text-lg font-semibold text-slate-900">
                                {modules.length ? "No encontramos coincidencias" : "Aún no tienes módulos"}
                            </h3>
                            <p className="mx-auto mb-0 mt-2 max-w-md text-sm leading-6 text-slate-500">
                                {modules.length
                                    ? "Prueba con otro nombre de módulo o grupo."
                                    : "Crea tu primer módulo para organizar la oferta académica y gestionar a tus estudiantes."}
                            </p>
                            {modules.length === 0 && (
                                <Link to="/SubirModulo" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white no-underline transition hover:bg-sky-700">
                                    <i className="bi bi-plus-lg" aria-hidden="true" />
                                    Crear primer módulo
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                            {filteredModules.map((module) => {
                                const moduleStatus = getModuleStatus(module, today);
                                const enrollmentCount = getEnrollmentCount(module);
                                const subjectName = module.subject?.name_subject || module.subject?.name || "Módulo académico";
                                return (
                                    <article key={module.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/5">
                                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-sky-100 via-indigo-50 to-slate-100">
                                            {module.syllabus_url ? (
                                                <img src={module.syllabus_url} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-5xl text-sky-500/70">
                                                    <i className="bi bi-journal-bookmark-fill" aria-hidden="true" />
                                                </div>
                                            )}
                                            <span className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${moduleStatusStyles[moduleStatus]}`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${moduleStatus === "active" ? "bg-emerald-500" : moduleStatus === "finished" ? "bg-slate-400" : moduleStatus === "scheduled" ? "bg-sky-500" : "bg-amber-500"}`} />
                                                {moduleStatusLabels[moduleStatus]}
                                            </span>
                                        </div>

                                        <div className="p-5">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-700">{subjectName}</p>
                                            <h3 className="m-0 line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-slate-900">{module.name_module || "Módulo sin nombre"}</h3>
                                            <p className="mb-0 mt-3 flex items-start gap-2 text-sm leading-5 text-slate-600">
                                                <i className="bi bi-people-fill mt-0.5 shrink-0 text-sky-600" aria-hidden="true" />
                                                <span>{getGroupLabel(module)}</span>
                                            </p>

                                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                                                <div className="rounded-xl bg-slate-50 p-3">
                                                    <p className="m-0 text-xs text-slate-500">Inscripciones</p>
                                                    <p className="m-0 mt-1 text-sm font-bold text-slate-800">{enrollmentCount}</p>
                                                </div>
                                                <div className="rounded-xl bg-slate-50 p-3">
                                                    <p className="m-0 text-xs text-slate-500">Cupos</p>
                                                    <p className="m-0 mt-1 text-sm font-bold text-slate-800">{module.seats ?? "—"}</p>
                                                </div>
                                                {module.duration && (
                                                    <p className="col-span-2 m-0 flex items-center gap-2 text-xs text-slate-500">
                                                        <i className="bi bi-clock" aria-hidden="true" />
                                                        Duración: {module.duration}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-5 grid grid-cols-2 gap-2">
                                                <Link
                                                    to={`/EditarModulo/${encodeURIComponent(module.id)}`}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 no-underline transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/15"
                                                    aria-label={`Editar ${module.name_module || "módulo"}`}
                                                >
                                                    <i className="bi bi-pencil-square" aria-hidden="true" />
                                                    Editar
                                                </Link>
                                                <Link
                                                    to={`/GrupoModulo?moduleId=${encodeURIComponent(module.id)}`}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-3 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                                                    aria-label={`Ver grupo de ${module.name_module || "módulo"}`}
                                                >
                                                    <i className="bi bi-arrow-up-right-square" aria-hidden="true" />
                                                    Ver grupo
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default DocenteMo;
