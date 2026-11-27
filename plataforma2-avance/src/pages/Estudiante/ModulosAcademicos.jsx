import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/env";
import defaultModuleImage from "../../assets/ilustracion estudiando.jpg";

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

const isTrue = (value) => value === true || value === 1 || value === "1";

const getTeacherName = (module, teachersById) => {
    const teacher = module.teacher || teachersById.get(String(module.teacher_id));
    const user = teacher?.user_system || teacher?.userSystem || {};
    const name = [
        user.first_name || teacher?.first_name,
        user.middle_name || teacher?.middle_name,
        user.last_name || teacher?.last_name,
        user.second_last_name || teacher?.second_last_name,
    ].filter(Boolean).join(" ");

    return name || "Docente por asignar";
};

const getModuleDetails = (module, availableSeats, teacherName, groupLabel) => ({
    id: module.id,
    nombre: module.name_module,
    cupos: availableSeats,
    docente: teacherName,
    duracion: module.duration || (module.weekly_hours ? `${module.weekly_hours} horas semanales` : ""),
    dias: module.schedule || "",
    horario: module.schedule || "",
    lugar: module.class_group?.classroom || module.class_group?.campus?.name || groupLabel,
    descripcion: module.description_module || "",
    temario: [],
    requisitos: [],
    enrollment_opens_at: module.enrollment_opens_at,
    enrollment_closes_at: module.enrollment_closes_at,
    is_published: module.is_published,
    allow_self_enrollment: module.allow_self_enrollment,
});

const ModulosAcademicos = () => {
    const [modules, setModules] = useState([]);
    const [moduleEnrollments, setModuleEnrollments] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classGroups, setClassGroups] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let ignore = false;
        const requests = [
            ["modules", "/modules/list", "modules"],
            ["moduleEnrollments", "/module-enrollments/list", "module_enrollments"],
            ["teachers", "/teachers/list", "teachers"],
            ["classGroups", "/class-groups/list", "class_groups"],
            ["gradeLevels", "/grade-levels/list", "grade_levels"],
        ];

        Promise.allSettled(requests.map(([, url]) => api.get(url))).then((results) => {
            if (ignore) return;

            const values = {
                modules: [],
                moduleEnrollments: [],
                teachers: [],
                classGroups: [],
                gradeLevels: [],
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
            setModuleEnrollments(values.moduleEnrollments);
            setTeachers(values.teachers);
            setClassGroups(values.classGroups);
            setGradeLevels(values.gradeLevels);
            setError(errors.join(" "));
            setLoading(false);
        });

        return () => {
            ignore = true;
        };
    }, [reloadKey]);

    const teachersById = useMemo(
        () => new Map(teachers.map((teacher) => [String(teacher.id), teacher])),
        [teachers],
    );
    const groupsById = useMemo(
        () => new Map(classGroups.map((group) => [String(group.id), group])),
        [classGroups],
    );
    const gradesById = useMemo(
        () => new Map(gradeLevels.map((grade) => [String(grade.id), grade])),
        [gradeLevels],
    );

    const getGroupLabel = useCallback((module) => {
        const group = module.class_group
            || module.classGroup
            || groupsById.get(String(module.class_group_id));
        const grade = group?.grade_level
            || group?.gradeLevel
            || gradesById.get(String(group?.grade_level_id));

        return [
            grade?.name || (group?.grade_level_id ? `Grado ${group.grade_level_id}` : ""),
            group?.section,
        ].filter(Boolean).join(" ") || "Grupo no especificado";
    }, [gradesById, groupsById]);

    const getAvailableSeats = (module) => {
        if (module.seats === null || module.seats === undefined) return null;
        const registered = moduleEnrollments.filter((enrollment) => {
            const sameModule = String(enrollment.module_id ?? enrollment.module?.id) === String(module.id);
            const status = String(enrollment.status || "").toLowerCase();
            return sameModule && !["cancelado", "cancelada", "rechazado", "retirado", "inactivo"].includes(status);
        }).length;

        return Math.max(0, Number(module.seats) - registered);
    };

    const publishedModules = useMemo(
        () => modules.filter((module) => isTrue(module.is_published)),
        [modules],
    );
    const filteredModules = useMemo(() => publishedModules.filter((module) => {
        const query = search.trim().toLocaleLowerCase();
        const matchesSearch = !query || [
            module.name_module,
            getGroupLabel(module),
            getTeacherName(module, teachersById),
        ].some((value) => String(value || "").toLocaleLowerCase().includes(query));

        return matchesSearch;
    }), [publishedModules, search, getGroupLabel, teachersById]);

    const retryLoad = () => {
        setLoading(true);
        setError("");
        setReloadKey((current) => current + 1);
    };

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
                    <div className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-36 w-36 rounded-full bg-indigo-400/15 blur-3xl" />
                    <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                                <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                                Catálogo académico
                            </span>
                            <h1 className="mb-0 mt-0 text-3xl font-bold leading-tight sm:text-4xl">Encuentra tu próximo módulo</h1>
                            <p className="mb-0 mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                                Explora la oferta disponible, compara sus detalles y postúlate al módulo que mejor se adapte a ti.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex min-w-36 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-200">
                                    <i className="bi bi-journal-bookmark-fill text-lg" aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="m-0 text-xs text-slate-300">Módulos</p>
                                    <p className="m-0 mt-0.5 text-lg font-bold">{loading ? "..." : publishedModules.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {error && (
                    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                        <i className="bi bi-exclamation-triangle-fill mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="flex-1">{error}</span>
                        <button type="button" onClick={retryLoad} className="shrink-0 font-semibold underline underline-offset-2">Reintentar</button>
                    </div>
                )}

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-6">
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="m-0 text-lg font-bold text-slate-900">Explora la oferta</h2>
                            <p className="mb-0 mt-1 text-sm text-slate-500">Busca por módulo, docente o grupo.</p>
                        </div>
                        {!loading && (
                            <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                                {filteredModules.length} {filteredModules.length === 1 ? "resultado" : "resultados"}
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <label className="relative block">
                            <span className="sr-only">Buscar módulo, docente o grupo</span>
                            <i className="bi bi-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar módulo, docente o grupo..."
                                aria-label="Buscar módulo, docente o grupo"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                            />
                        </label>
                    </div>
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="mt-3 inline-flex items-center gap-2 rounded-lg px-1 py-1 text-xs font-semibold text-sky-700 transition hover:text-sky-900"
                        >
                            <i className="bi bi-x-circle" aria-hidden="true" />
                            Limpiar filtros
                        </button>
                    )}
                </section>

                {loading ? (
                    <section role="status" aria-label="Cargando módulos" className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                        {Array.from({ length: 6 }, (_, index) => (
                            <article key={index} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                                <div className="h-36 animate-pulse bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100" />
                                <div className="space-y-4 p-5">
                                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                                    <div className="h-6 w-3/4 animate-pulse rounded bg-slate-100" />
                                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                                    <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                                </div>
                            </article>
                        ))}
                    </section>
                ) : filteredModules.length === 0 ? (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center shadow-sm">
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-3xl text-sky-600">
                            <i className={`bi ${publishedModules.length || search ? "bi-search" : error ? "bi-cloud-slash" : "bi-journal-x"}`} aria-hidden="true" />
                        </span>
                        <h2 className="mb-0 mt-4 text-xl font-bold text-slate-900">
                            {publishedModules.length || search
                                ? "No encontramos módulos"
                                : error
                                    ? "No se pudo confirmar la oferta"
                                    : "Aún no hay módulos disponibles"}
                        </h2>
                        <p className="mx-auto mb-0 mt-2 max-w-lg text-sm leading-6 text-slate-500">
                            {publishedModules.length || search
                                ? "Prueba con otros términos o cambia los filtros para encontrar una opción."
                                : error
                                    ? "Revisa el error mostrado arriba y vuelve a intentarlo."
                                    : "Cuando se publiquen nuevos módulos aparecerán en este catálogo."}
                        </p>
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
                            >
                                <i className="bi bi-x-circle" aria-hidden="true" />
                                Limpiar filtros
                            </button>
                        )}
                    </section>
                ) : (
                    <section aria-label="Módulos disponibles" className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                        {filteredModules.map((module) => {
                            const availableSeats = getAvailableSeats(module);
                            const teacherName = getTeacherName(module, teachersById);
                            const groupLabel = getGroupLabel(module);
                            const detail = getModuleDetails(module, availableSeats, teacherName, groupLabel);
                            const canApply = isTrue(module.allow_self_enrollment)
                                && (availableSeats === null || availableSeats > 0);
                            const seatStyle = availableSeats === 0
                                ? "bg-rose-50 text-rose-700"
                                : "bg-emerald-50 text-emerald-700";

                            return (
                                <article key={module.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5">
                                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-sky-600 via-indigo-600 to-slate-900">
                                        <img
                                            src={module.syllabus_url || defaultModuleImage}
                                            alt={module.syllabus_url ? `Imagen del módulo ${module.name_module || ""}` : "Ilustración de estudiantes estudiando"}
                                            onError={(event) => {
                                                if (!event.currentTarget.dataset.fallbackApplied) {
                                                    event.currentTarget.dataset.fallbackApplied = "true";
                                                    event.currentTarget.src = defaultModuleImage;
                                                }
                                            }}
                                            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-slate-900/20" />
                                        <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-white/10 transition duration-300 group-hover:scale-110" />
                                        <div className="absolute -bottom-16 left-1/3 h-36 w-36 rounded-full bg-cyan-300/10" />
                                        <div className="relative flex items-start justify-between gap-2">
                                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                                                {module.subject?.name_subject || "Módulo académico"}
                                            </span>
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${availableSeats === null ? "bg-white/15 text-white" : seatStyle}`}>
                                                <i className="bi bi-people-fill" aria-hidden="true" />
                                                {availableSeats === null
                                                    ? "Cupos no definidos"
                                                    : availableSeats === 0
                                                        ? "Sin cupos"
                                                        : `${availableSeats} ${availableSeats === 1 ? "cupo libre" : "cupos libres"}`}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-xl backdrop-blur">
                                                <i className="bi bi-journal-richtext" aria-hidden="true" />
                                            </span>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-sky-100">Oferta académica</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                                            <i className="bi bi-bookmark-fill" aria-hidden="true" />
                                            Módulo académico
                                        </div>
                                        <h2 className="mb-0 mt-0 line-clamp-2 min-h-14 text-xl font-bold leading-7 text-slate-900">
                                            {module.name_module || "Módulo sin nombre"}
                                        </h2>
                                        <p className="mb-5 mt-3 flex items-center gap-2 text-sm text-slate-600">
                                            <i className="bi bi-person-badge-fill text-sky-600" aria-hidden="true" />
                                            <span className="font-medium">{teacherName}</span>
                                        </p>

                                        <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
                                            <div className="flex items-start gap-3">
                                                <i className="bi bi-calendar3 mt-0.5 shrink-0 text-sky-600" aria-hidden="true" />
                                                <span className="min-w-0">{module.schedule || `${module.weekly_hours || "—"} horas semanales`}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <i className="bi bi-clock-fill mt-0.5 shrink-0 text-sky-600" aria-hidden="true" />
                                                <span className="min-w-0">{module.duration || `${module.weekly_hours || "—"} horas semanales`}</span>
                                            </div>
                                            <div className="flex items-start gap-3 sm:col-span-2">
                                                <i className="bi bi-geo-alt-fill mt-0.5 shrink-0 text-sky-600" aria-hidden="true" />
                                                <span className="min-w-0">
                                                    {module.class_group?.classroom
                                                        || module.class_group?.campus?.name
                                                        || module.classGroup?.campus?.name
                                                        || groupLabel}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="mb-0 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
                                            {module.description_module || "No hay descripción registrada para este módulo."}
                                        </p>

                                        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                                            <Link
                                                to="/DetalleM"
                                                state={{ modulo: detail }}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-3 text-center text-sm font-bold text-slate-700 no-underline transition hover:bg-sky-100 hover:text-sky-800"
                                            >
                                                <i className="bi bi-eye" aria-hidden="true" />
                                                Ver detalles
                                            </Link>
                                            {canApply ? (
                                                <Link
                                                    to="/FormMod"
                                                    state={{ modulo: detail }}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-3 text-center text-sm font-bold text-white no-underline transition hover:bg-sky-600"
                                                >
                                                    <i className="bi bi-send-fill" aria-hidden="true" />
                                                    Postularme
                                                </Link>
                                            ) : (
                                                <button type="button" disabled className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-400">
                                                    <i className="bi bi-lock-fill" aria-hidden="true" />
                                                    No disponible
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}
            </div>
        </main>
    );
};

export default ModulosAcademicos;
