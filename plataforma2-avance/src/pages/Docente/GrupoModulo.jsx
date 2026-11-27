import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../Config/env";

const getCollection = (responseData, key) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.[key])) return responseData[key];
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error(`El servidor devolvió una respuesta inesperada al consultar ${key}.`);
};

const getEntity = (responseData) => (
    responseData?.data?.data
    || responseData?.data
    || responseData?.module
    || responseData
);

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const getStudentId = (row) => row.student_id ?? row.student?.id;

const getStudentName = (row) => {
    const student = row.student || {};
    const user = student.user_system || student.userSystem || row.user_system || row.userSystem || {};
    const name = [
        user.first_name || student.first_name || row.first_name,
        user.middle_name || student.middle_name || row.middle_name,
        user.last_name || student.last_name || row.last_name,
        user.second_last_name || student.second_last_name || row.second_last_name,
    ].filter(Boolean).join(" ");

    return name || `Estudiante #${getStudentId(row) ?? row.id}`;
};

const displayGender = (value) => {
    const normalized = String(value || "").toLowerCase();
    if (normalized === "m") return "Masculino";
    if (normalized === "f") return "Femenino";
    if (normalized === "o") return "Otro";
    return value || "No registrado";
};

const today = () => {
    const currentDate = new Date();
    return [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, "0"),
        String(currentDate.getDate()).padStart(2, "0"),
    ].join("-");
};

const GrupoModulo = () => {
    const [searchParams] = useSearchParams();
    const moduleId = searchParams.get("moduleId") || "";
    const [module, setModule] = useState(null);
    const [roster, setRoster] = useState([]);
    const [grades, setGrades] = useState([]);
    const [classGroups, setClassGroups] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [gradeValues, setGradeValues] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(Boolean(moduleId));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        if (!moduleId) return undefined;

        let ignore = false;
        const requests = [
            ["module", () => api.get(`/modules/${moduleId}`), "module"],
            ["moduleEnrollments", () => api.get("/module-enrollments/list", { params: { module_id: moduleId } }), "module_enrollments"],
            ["students", () => api.get("/students/list"), "students"],
            ["enrollments", () => api.get("/enrollments/list"), "enrollments"],
            ["grades", () => api.get("/grades/list", { params: { module_id: moduleId } }), "grades"],
            ["classGroups", () => api.get("/class-groups/list"), "class_groups"],
            ["gradeLevels", () => api.get("/grade-levels/list"), "grade_levels"],
            ["teachers", () => api.get("/teachers/list"), "teachers"],
        ];

        Promise.allSettled(requests.map(([, request]) => request())).then((results) => {
            if (ignore) return;

            const values = {
                module: null,
                moduleEnrollments: [],
                students: [],
                enrollments: [],
                grades: [],
                classGroups: [],
                gradeLevels: [],
                teachers: [],
            };
            const errors = [];

            results.forEach((result, index) => {
                const [key, , responseKey] = requests[index];
                if (result.status === "rejected") {
                    console.error(`Error al cargar ${key}:`, result.reason);
                    errors.push(getErrorMessage(result.reason, `No se pudo cargar ${key}.`));
                    return;
                }

                try {
                    values[key] = key === "module"
                        ? getEntity(result.value.data)
                        : getCollection(result.value.data, responseKey);
                } catch (parseError) {
                    console.error(`Error al leer ${key}:`, parseError);
                    errors.push(parseError.message);
                }
            });

            const moduleEnrollments = values.moduleEnrollments.filter(
                (item) => String(item.module_id ?? item.module?.id) === String(moduleId),
            );
            const studentById = new Map(values.students.map((student) => [String(student.id), student]));
            const enrollmentByStudentId = new Map();
            [...values.enrollments]
                .sort((first, second) => String(second.enrollment_date || "").localeCompare(String(first.enrollment_date || "")))
                .forEach((enrollment) => {
                    const studentId = enrollment.student_id ?? enrollment.student?.id;
                    if (studentId !== null && studentId !== undefined && !enrollmentByStudentId.has(String(studentId))) {
                        enrollmentByStudentId.set(String(studentId), enrollment);
                    }
                });

            const studentRows = moduleEnrollments.map((item) => {
                const studentId = getStudentId(item);
                const student = item.student || studentById.get(String(studentId));
                const enrollment = item.enrollment
                    || student?.enrollment
                    || enrollmentByStudentId.get(String(studentId));

                return {
                    ...item,
                    student,
                    enrollment,
                };
            });
            const moduleGrades = values.grades.filter((grade) => (
                String(grade.module_id ?? grade.module?.id) === String(moduleId)
            ));

            setModule(values.module);
            setRoster(studentRows);
            setGrades(moduleGrades);
            setClassGroups(values.classGroups);
            setGradeLevels(values.gradeLevels);
            setTeachers(values.teachers);
            setGradeValues(Object.fromEntries(studentRows.map((row) => {
                const studentId = getStudentId(row);
                const finalGrade = moduleGrades.find((grade) => (
                    String(grade.student_id ?? grade.student?.id) === String(studentId)
                    && String(grade.evaluation_type || "").toLowerCase() === "final"
                ));
                return [String(studentId ?? row.id), finalGrade?.grade ?? ""];
            })));
            setError(errors.join(" "));
            setLoading(false);
        });

        return () => {
            ignore = true;
        };
    }, [moduleId, reloadKey]);

    const classGroupById = useMemo(
        () => new Map(
            classGroups
                .concat(module?.class_group ? [module.class_group] : [])
                .concat(module?.classGroup ? [module.classGroup] : [])
                .map((group) => [String(group.id), group]),
        ),
        [classGroups, module],
    );
    const gradeLevelById = useMemo(
        () => new Map(
            gradeLevels
                .concat(module?.class_group?.grade_level ? [module.class_group.grade_level] : [])
                .concat(module?.classGroup?.gradeLevel ? [module.classGroup.gradeLevel] : [])
                .map((grade) => [String(grade.id), grade]),
        ),
        [gradeLevels, module],
    );

    const getGroupLabel = () => {
        const group = module?.class_group
            || module?.classGroup
            || classGroupById.get(String(module?.class_group_id));
        const grade = group?.grade_level
            || group?.gradeLevel
            || gradeLevelById.get(String(group?.grade_level_id));

        return [
            grade?.name || (group?.grade_level_id ? `Grado ${group.grade_level_id}` : ""),
            group?.section,
        ].filter(Boolean).join(" ") || (module?.class_group_id ? `Grupo #${module.class_group_id}` : "Grupo no asignado");
    };

    const teachersById = useMemo(
        () => new Map(
            teachers
                .concat(module?.teacher ? [module.teacher] : [])
                .map((teacher) => [String(teacher.id), teacher]),
        ),
        [module, teachers],
    );
    const moduleAcademicPeriodId = module?.academic_period_id
        ?? module?.academic__period_id
        ?? module?.academic_period?.id
        ?? module?.academicPeriod?.id;
    const teacher = teachersById.get(String(module?.teacher_id));
    const recordedBy = teacher?.user_system_id
        ?? teacher?.userSystem?.id
        ?? teacher?.user_system?.id;

    const finalGradeFor = (studentId) => grades.find((grade) => (
        String(grade.student_id ?? grade.student?.id) === String(studentId)
        && String(grade.evaluation_type || "").toLowerCase() === "final"
    ));

    const saveGradeRequest = async (row) => {
        const studentId = getStudentId(row);
        const gradeValue = gradeValues[String(studentId ?? row.id)];
        const numericGrade = Number(gradeValue);

        if (gradeValue === "" || !Number.isFinite(numericGrade) || numericGrade < 0 || numericGrade > 5) {
            throw new Error(`Ingresa una nota entre 0 y 5 para ${getStudentName(row)}.`);
        }

        const currentGrade = finalGradeFor(studentId);
        const payload = {
            grade: numericGrade,
            recovery_grade: currentGrade?.recovery_grade ?? 0,
            evaluation_type: "Final",
            registration_date: today(),
            student_id: studentId,
            module_id: Number(moduleId),
        };
        if (moduleAcademicPeriodId) payload.academic__period_id = moduleAcademicPeriodId;
        if (recordedBy) payload.recorded_by = recordedBy;

        const response = currentGrade?.id
            ? await api.put(`/grades/${currentGrade.id}`, payload)
            : await api.post("/grades/store", payload);

        return response.data?.data ?? response.data?.grade ?? response.data;
    };

    const updateSavedGrades = (savedGrades, rows) => {
        setGrades((current) => {
            const nextGrades = [...current];
            savedGrades.forEach((saved, index) => {
                const row = rows[index];
                const studentId = getStudentId(row);
                const existingIndex = nextGrades.findIndex((grade) => (
                    String(grade.student_id ?? grade.student?.id) === String(studentId)
                    && String(grade.evaluation_type || "").toLowerCase() === "final"
                ));
                const normalized = {
                    ...saved,
                    module_id: saved.module_id ?? Number(moduleId),
                    student_id: saved.student_id ?? studentId,
                    evaluation_type: saved.evaluation_type ?? "Final",
                    grade: saved.grade ?? gradeValues[String(studentId ?? row.id)],
                };

                if (existingIndex >= 0) nextGrades[existingIndex] = normalized;
                else nextGrades.push(normalized);
            });
            return nextGrades;
        });
    };

    const handleSaveOne = async (row) => {
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const saved = await saveGradeRequest(row);
            updateSavedGrades([saved], [row]);
            setSuccess(`Nota de ${getStudentName(row)} guardada.`);
        } catch (saveError) {
            console.error("Error al guardar la nota:", saveError);
            setError(getErrorMessage(saveError, "No se pudo guardar la nota."));
        } finally {
            setSaving(false);
        }
    };

    const handleSaveAll = async () => {
        const rowsToSave = roster.filter((row) => (
            gradeValues[String(getStudentId(row) ?? row.id)] !== ""
        ));
        if (rowsToSave.length === 0) {
            setError("Ingresa al menos una nota antes de guardar.");
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");
        const results = await Promise.allSettled(rowsToSave.map(saveGradeRequest));
        const savedGrades = [];
        const savedRows = [];
        const failures = [];

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                savedGrades.push(result.value);
                savedRows.push(rowsToSave[index]);
            } else {
                console.error("Error al guardar una nota:", result.reason);
                failures.push(getErrorMessage(result.reason, `No se pudo guardar la nota de ${getStudentName(rowsToSave[index])}.`));
            }
        });

        if (savedGrades.length > 0) updateSavedGrades(savedGrades, savedRows);
        if (failures.length > 0) setError(failures.join(" "));
        if (savedGrades.length > 0) setSuccess(`${savedGrades.length} nota(s) guardada(s).`);
        setSaving(false);
    };

    const filteredRoster = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();
        if (!query) return roster;

        return roster.filter((row) => {
            const enrollmentCode = row.enrollment?.enrollment_code || row.enrollment_code || "";
            return [getStudentName(row), enrollmentCode, getStudentId(row)]
                .some((value) => String(value ?? "").toLocaleLowerCase().includes(query));
        });
    }, [roster, search]);

    const finalGradeStudentIds = new Set(
        grades
            .filter((grade) => String(grade.evaluation_type || "").toLowerCase() === "final")
            .map((grade) => grade.student_id ?? grade.student?.id)
            .filter((studentId) => studentId !== null && studentId !== undefined)
            .map(String),
    );
    const gradedStudentCount = roster.filter(
        (row) => finalGradeStudentIds.has(String(getStudentId(row))),
    ).length;

    if (!moduleId) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
                <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-900/5">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-3xl text-sky-600">
                        <i className="bi bi-journal-x" aria-hidden="true" />
                    </span>
                    <h1 className="mb-0 mt-5 text-2xl font-bold text-slate-900">Selecciona un módulo</h1>
                    <p className="mb-0 mt-2 text-slate-600">No llegó el identificador del módulo que quieres revisar.</p>
                    <Link to="/DocenteMo" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white no-underline transition hover:bg-sky-700">
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                        Volver a Mis Módulos
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-3xl">
                            <Link to="/DocenteMo" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100 no-underline transition hover:bg-white/15">
                                <i className="bi bi-arrow-left" aria-hidden="true" />
                                Volver a Mis Módulos
                            </Link>
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                                <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                                Gestión académica
                            </span>
                            <h1 className="mb-0 mt-0 text-2xl font-bold leading-tight sm:text-3xl">Estudiantes e historial de notas</h1>
                            <p className="mb-0 mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                                {module?.name_module || (loading ? "Cargando módulo..." : "Módulo no disponible")}
                            </p>
                            <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-sky-100">
                                <i className="bi bi-people-fill" aria-hidden="true" />
                                {module ? getGroupLabel() : loading ? "Cargando grupo..." : "Grupo no disponible"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                            <button
                                type="button"
                                onClick={handleSaveAll}
                                disabled={loading || saving || roster.length === 0}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <i className={`bi ${saving ? "bi-arrow-repeat animate-spin" : "bi-save"}`} aria-hidden="true" />
                                {saving ? "Guardando..." : "Guardar todas las notas"}
                            </button>
                            <p className="m-0 text-center text-xs text-slate-300">Se guardarán las notas ingresadas</p>
                        </div>
                    </div>
                </header>

                {error && (
                    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                        <i className="bi bi-exclamation-triangle-fill mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="flex-1">{error}</span>
                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                setError("");
                                setReloadKey((current) => current + 1);
                            }}
                            className="shrink-0 font-semibold underline underline-offset-2"
                        >
                            Reintentar
                        </button>
                    </div>
                )}
                {success && (
                    <p role="status" className="m-0 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-800">
                        <i className="bi bi-check-circle-fill" aria-hidden="true" />
                        {success}
                    </p>
                )}

                <section aria-label="Resumen del grupo" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                        { label: "Estudiantes inscritos", value: loading ? "..." : roster.length, icon: "bi-people-fill", tone: "bg-sky-50 text-sky-700" },
                        { label: "Notas registradas", value: loading ? "..." : gradedStudentCount, icon: "bi-journal-check", tone: "bg-emerald-50 text-emerald-700" },
                        { label: "Pendientes por calificar", value: loading ? "..." : roster.length - gradedStudentCount, icon: "bi-hourglass-split", tone: "bg-amber-50 text-amber-700" },
                    ].map((item) => (
                        <article key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.tone}`}>
                                <i className={`bi ${item.icon} text-xl`} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="m-0 text-sm text-slate-500">{item.label}</p>
                                <p className="m-0 mt-1 text-2xl font-bold leading-none text-slate-900">{item.value}</p>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="m-0 text-lg font-bold text-slate-900">Lista de estudiantes</h2>
                                {!loading && <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{filteredRoster.length} de {roster.length}</span>}
                            </div>
                            <p className="mb-0 mt-1 text-sm text-slate-500">Ingresa las notas finales en una escala de 0 a 5.</p>
                        </div>
                        <label className="relative block w-full sm:max-w-sm">
                            <span className="sr-only">Buscar estudiante o matrícula</span>
                            <i className="bi bi-search pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar estudiante o matrícula..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                            />
                        </label>
                    </div>

                    <div className="space-y-3 p-4 sm:p-6">
                        {loading ? (
                            <div role="status" className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center text-sm text-slate-500">
                                <i className="bi bi-arrow-repeat animate-spin text-2xl text-sky-600" aria-hidden="true" />
                                Cargando estudiantes y notas...
                            </div>
                        ) : roster.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-sky-600 shadow-sm">
                                    <i className={`bi ${error ? "bi-cloud-slash" : "bi-people"}`} aria-hidden="true" />
                                </span>
                                <h3 className="mb-0 mt-4 text-base font-semibold text-slate-900">
                                    {error ? "No se pudo verificar el grupo" : "Aún no hay estudiantes"}
                                </h3>
                                <p className="mb-0 mt-1 text-sm text-slate-500">
                                    {error
                                        ? "Revisa el error mostrado arriba y vuelve a intentarlo."
                                        : "Los estudiantes inscritos en este módulo aparecerán aquí."}
                                </p>
                            </div>
                        ) : filteredRoster.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
                                <i className="bi bi-search text-2xl text-slate-400" aria-hidden="true" />
                                <p className="mb-0 mt-3 text-sm text-slate-600">No encontramos estudiantes que coincidan con “{search}”.</p>
                            </div>
                        ) : filteredRoster.map((row, index) => {
                            const studentId = getStudentId(row);
                            const key = String(studentId ?? row.id);
                            const studentName = getStudentName(row);
                            const enrollmentCode = row.enrollment?.enrollment_code
                                || row.enrollment_code
                                || "—";
                            const initials = studentName
                                .split(/\s+/)
                                .slice(0, 2)
                                .map((part) => part.charAt(0))
                                .join("")
                                .toUpperCase();

                            return (
                                <article key={key} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-sky-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
                                    <div className="flex min-w-0 items-center gap-4">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-sm font-bold text-sky-800">
                                            {initials || <i className="bi bi-person-fill" aria-hidden="true" />}
                                        </span>
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Estudiante {String(index + 1).padStart(2, "0")}</span>
                                                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{enrollmentCode}</span>
                                            </div>
                                            <h3 className="mb-0 mt-1 break-words text-base font-semibold text-slate-900">{studentName}</h3>
                                            <p className="mb-0 mt-1 text-sm text-slate-500">{displayGender(row.student?.gender ?? row.gender)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-end gap-3 sm:shrink-0">
                                        <label className="flex-1 sm:flex-none">
                                            <span className="mb-1.5 block text-xs font-semibold text-slate-600">Nota final (0–5)</span>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={gradeValues[key] ?? ""}
                                                onChange={(event) => setGradeValues((current) => ({ ...current, [key]: event.target.value }))}
                                                aria-label={`Nota final de ${studentName}`}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center font-semibold text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 sm:w-28"
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => handleSaveOne(row)}
                                            disabled={saving}
                                            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            title="Guardar nota individual"
                                            aria-label={`Guardar nota de ${studentName}`}
                                        >
                                            <i className="bi bi-check-lg" aria-hidden="true" />
                                            <span className="sm:hidden">Guardar</span>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default GrupoModulo;
