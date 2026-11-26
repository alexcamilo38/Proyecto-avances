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

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-100 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="mb-2 mt-0 text-3xl font-semibold text-slate-900">Mis Módulos Asignados</h1>
                        <p className="mb-0 text-slate-600">
                            Gestiona los contenidos, revisa los estudiantes inscritos y sube las calificaciones finales.
                        </p>
                    </div>
                    <Link
                        to="/SubirModulo"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white no-underline transition hover:bg-sky-600"
                    >
                        <i className="bi bi-plus-lg" aria-hidden="true" />
                        Subir Nuevo Módulo
                    </Link>
                </header>

                {error && (
                    <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        <span>{error}</span>
                        <button type="button" onClick={retryLoad} className="shrink-0 font-semibold underline">
                            Reintentar
                        </button>
                    </div>
                )}

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <i className="bi bi-search text-slate-400" aria-hidden="true" />
                            <input
                                className="w-full border-0 bg-transparent text-sm outline-none"
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar módulo o grado..."
                                aria-label="Buscar módulo o grado"
                            />
                        </label>
                        <span className="text-sm text-slate-500">
                            {loading ? "Cargando módulos..." : `${filteredModules.length} módulo(s)`}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    {["N°", "Nombre del módulo", "Grado / Curso", "Estudiantes inscritos", "Estado", "Acciones"].map((heading) => (
                                        <th key={heading} className="px-4 py-4 text-sm font-bold text-slate-900">{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-sm text-slate-500">
                                            Cargando módulos...
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredModules.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-sm text-slate-500">
                                            {modules.length ? "No hay módulos que coincidan con la búsqueda." : "Aún no hay módulos registrados."}
                                        </td>
                                    </tr>
                                )}
                                {!loading && filteredModules.map((module, index) => {
                                    const published = isPublished(module);
                                    return (
                                        <tr key={module.id} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-5 text-sm text-slate-500">{String(index + 1).padStart(2, "0")}</td>
                                            <td className="px-4 py-5 text-sm font-semibold text-slate-900">{module.name_module}</td>
                                            <td className="px-4 py-5 text-sm text-slate-700">
                                                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                                    {getGroupLabel(module)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5 text-sm font-semibold text-slate-700">
                                                {getEnrollmentCount(module)} estudiante(s)
                                            </td>
                                            <td className="px-4 py-5 text-sm">
                                                <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${published ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                                    {published ? "Activo" : "Pendiente"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5">
                                                <div className="flex flex-wrap gap-2">
                                                    <Link
                                                        to={`/EditarModulo/${encodeURIComponent(module.id)}`}
                                                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 no-underline transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                        title="Editar módulo"
                                                    >
                                                        <i className="bi bi-pencil-square" aria-hidden="true" />
                                                        Editar
                                                    </Link>
                                                    <Link
                                                        to={`/GrupoModulo?moduleId=${encodeURIComponent(module.id)}`}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white no-underline transition hover:bg-sky-600"
                                                        title="Gestionar estudiantes y notas"
                                                    >
                                                        <i className="bi bi-eye-fill" aria-hidden="true" />
                                                        Ver Grupo
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default DocenteMo;
