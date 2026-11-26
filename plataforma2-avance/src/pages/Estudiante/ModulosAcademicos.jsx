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
    modalidad: module.modality || "Modalidad no especificada",
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
    const [modality, setModality] = useState("");
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

    const publishedModules = modules.filter((module) => isTrue(module.is_published));
    const modalities = [...new Set(publishedModules.map((module) => module.modality).filter(Boolean))];
    const filteredModules = useMemo(() => publishedModules.filter((module) => {
        const query = search.trim().toLocaleLowerCase();
        const matchesSearch = !query
            || module.name_module?.toLocaleLowerCase().includes(query)
            || getGroupLabel(module).toLocaleLowerCase().includes(query);
        const matchesModality = !modality
            || String(module.modality || "").toLowerCase() === modality.toLowerCase();

        return matchesSearch && matchesModality;
    }), [publishedModules, search, modality, getGroupLabel]);

    const retryLoad = () => {
        setLoading(true);
        setError("");
        setReloadKey((current) => current + 1);
    };

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-100 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h1 className="mb-2 mt-0 text-3xl font-semibold text-slate-900">Módulos Académicos Disponibles</h1>
                        <p className="mb-0 text-slate-600">Explora los módulos publicados y postúlate si hay cupos disponibles.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky-500"
                            value={modality}
                            onChange={(event) => setModality(event.target.value)}
                            disabled={modalities.length === 0}
                            aria-label="Filtrar por modalidad"
                        >
                            <option value="">{modalities.length ? "Todas las modalidades" : "Modalidad no registrada"}</option>
                            {modalities.map((item) => <option key={item} value={item}>{item}</option>)}
                        </select>
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar módulo por nombre..."
                            aria-label="Buscar módulo por nombre"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500 sm:w-64"
                        />
                    </div>
                </header>

                {error && (
                    <div role="alert" className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        <span>{error}</span>
                        <button type="button" onClick={retryLoad} className="shrink-0 font-semibold underline">Reintentar</button>
                    </div>
                )}

                {loading ? (
                    <div role="status" className="rounded-2xl bg-white p-10 text-center text-slate-600 shadow-sm">
                        Cargando módulos disponibles...
                    </div>
                ) : filteredModules.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center text-slate-600 shadow-sm">
                        {publishedModules.length
                            ? "No hay módulos que coincidan con la búsqueda."
                            : "No hay módulos publicados disponibles en este momento."}
                    </div>
                ) : (
                    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                        {filteredModules.map((module) => {
                            const availableSeats = getAvailableSeats(module);
                            const teacherName = getTeacherName(module, teachersById);
                            const groupLabel = getGroupLabel(module);
                            const detail = getModuleDetails(module, availableSeats, teacherName, groupLabel);
                            const canApply = isTrue(module.allow_self_enrollment)
                                && (availableSeats === null || availableSeats > 0);

                            return (
                                <article key={module.id} className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-extrabold uppercase text-slate-600">
                                            {module.modality || "Modalidad no especificada"}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-500">
                                            <i className="bi bi-people-fill mr-1.5" aria-hidden="true" />
                                            {availableSeats === null ? "Cupos no definidos" : `${availableSeats} cupos libres`}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="mb-3 mt-0 text-xl font-semibold text-slate-900">{module.name_module}</h2>
                                        <p className="mb-5 flex items-center gap-2 text-sm text-slate-600">
                                            <i className="bi bi-person-badge text-sky-500" aria-hidden="true" />
                                            Docente: <strong>{teacherName}</strong>
                                        </p>

                                        <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                                            <div className="flex items-start gap-3">
                                                <i className="bi bi-calendar3 mt-0.5 text-sky-500" aria-hidden="true" />
                                                <span>{module.schedule || `${module.weekly_hours || "—"} horas semanales`}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <i className="bi bi-clock mt-0.5 text-sky-500" aria-hidden="true" />
                                                <span>{module.duration || `${module.weekly_hours || "—"} horas semanales`}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <i className="bi bi-geo-alt mt-0.5 text-sky-500" aria-hidden="true" />
                                                <span>
                                                    {module.class_group?.classroom
                                                        || module.class_group?.campus?.name
                                                        || module.classGroup?.campus?.name
                                                        || groupLabel}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="mb-0 text-sm leading-6 text-slate-600">
                                            {module.description_module || "No hay descripción registrada para este módulo."}
                                        </p>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <Link
                                            to="/DetalleM"
                                            state={{ modulo: detail }}
                                            className="rounded-xl bg-slate-100 px-3 py-3 text-center text-sm font-bold text-slate-600 no-underline transition hover:bg-sky-100 hover:text-sky-800"
                                        >
                                            Más detalles
                                        </Link>
                                        {canApply ? (
                                            <Link
                                                to="/FormMod"
                                                state={{ modulo: detail }}
                                                className="rounded-xl bg-slate-900 px-3 py-3 text-center text-sm font-bold text-sky-400 no-underline transition hover:bg-sky-500 hover:text-slate-900"
                                            >
                                                Postularme
                                            </Link>
                                        ) : (
                                            <button type="button" disabled className="cursor-not-allowed rounded-xl bg-slate-200 px-3 py-3 text-sm font-bold text-slate-500">
                                                No disponible
                                            </button>
                                        )}
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
