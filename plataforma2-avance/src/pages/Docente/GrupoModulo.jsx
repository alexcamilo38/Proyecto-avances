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
            evaluation_type: "Final",
            registration_date: today(),
            student_id: studentId,
            module_id: Number(moduleId),
        };
        if (moduleAcademicPeriodId) payload.academic_period_id = moduleAcademicPeriodId;
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

    if (!moduleId) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
                <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="mt-0 text-2xl font-bold text-slate-900">Selecciona un módulo</h1>
                    <p className="text-slate-600">No llegó el identificador del módulo que quieres revisar.</p>
                    <Link to="/DocenteMo" className="font-semibold text-sky-700">Volver a Mis Módulos</Link>
                </section>
            </main>
        );
    }

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <Link to="/DocenteMo" className="text-3xl text-slate-500 no-underline hover:text-sky-600" aria-label="Volver a mis módulos">
                                <i className="bi bi-arrow-left-short" aria-hidden="true" />
                            </Link>
                            <h1 className="mb-0 mt-0 text-3xl font-semibold text-slate-900">Estudiantes e Historial de Notas</h1>
                        </div>
                        <p className="mb-0 mt-2 text-slate-600">
                            Módulo: <strong>{module?.name_module || "Cargando módulo..."}</strong>
                            {module && <strong> ({getGroupLabel()})</strong>}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleSaveAll}
                        disabled={loading || saving || roster.length === 0}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <i className="bi bi-save" aria-hidden="true" />
                        {saving ? "Guardando..." : "Guardar Todas las Notas"}
                    </button>
                </header>

                {error && (
                    <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        <span>{error}</span>
                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                setError("");
                                setReloadKey((current) => current + 1);
                            }}
                            className="shrink-0 font-semibold underline"
                        >
                            Reintentar
                        </button>
                    </div>
                )}
                {success && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>}

                <section className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] border-collapse text-left">
                            <thead className="bg-slate-50">
                                <tr>
                                    {["N°", "Nombre completo", "ID Matrícula", "Género", "Nota final", "Acciones"].map((heading) => (
                                        <th key={heading} className="px-4 py-4 text-sm font-bold text-slate-900">{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-sm text-slate-500">Cargando estudiantes y notas...</td>
                                    </tr>
                                )}
                                {!loading && roster.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-sm text-slate-500">
                                            No hay estudiantes inscritos en este módulo.
                                        </td>
                                    </tr>
                                )}
                                {!loading && roster.map((row, index) => {
                                    const studentId = getStudentId(row);
                                    const key = String(studentId ?? row.id);
                                    const enrollmentCode = row.enrollment?.enrollment_code
                                        || row.enrollment_code
                                        || "—";
                                    return (
                                        <tr key={key} className="border-b border-slate-100 last:border-0">
                                            <td className="px-4 py-5 text-sm text-slate-500">{String(index + 1).padStart(2, "0")}</td>
                                            <td className="px-4 py-5 text-sm font-semibold text-slate-900">{getStudentName(row)}</td>
                                            <td className="px-4 py-5">
                                                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">{enrollmentCode}</span>
                                            </td>
                                            <td className="px-4 py-5 text-sm text-slate-600">{displayGender(row.student?.gender ?? row.gender)}</td>
                                            <td className="px-4 py-5">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="5"
                                                    value={gradeValues[key] ?? ""}
                                                    onChange={(event) => setGradeValues((current) => ({ ...current, [key]: event.target.value }))}
                                                    aria-label={`Nota final de ${getStudentName(row)}`}
                                                    className="w-24 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center font-semibold text-slate-800 outline-none focus:border-sky-500"
                                                />
                                            </td>
                                            <td className="px-4 py-5">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSaveOne(row)}
                                                    disabled={saving}
                                                    className="flex h-10 w-10 items-center justify-center rounded-lg border-0 bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                    title="Guardar nota individual"
                                                    aria-label={`Guardar nota de ${getStudentName(row)}`}
                                                >
                                                    <i className="bi bi-check-lg" aria-hidden="true" />
                                                </button>
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

export default GrupoModulo;
