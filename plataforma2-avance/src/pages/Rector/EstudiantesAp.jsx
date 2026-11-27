import { useCallback, useEffect, useMemo, useState } from "react";
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

const isApproved = (status) => (
  ["aprobado", "aprobada", "approved", "aceptado", "aceptada"]
    .includes(String(status || "").trim().toLowerCase())
);

const getStudentId = (enrollment) => enrollment.student_id ?? enrollment.student?.id;

const mergeStudentRecords = (enrolledStudent, listedStudent) => {
  if (!enrolledStudent) return listedStudent;
  if (!listedStudent) return enrolledStudent;

  const mergedStudent = { ...enrolledStudent, ...listedStudent };
  [
    "birth_date",
    "birthDate",
    "gender",
    "address",
    "guardian_id",
    "guardian",
    "user_system",
    "userSystem",
  ].forEach((key) => {
    if (
      (mergedStudent[key] === null || mergedStudent[key] === undefined || mergedStudent[key] === "")
      && enrolledStudent[key] !== null
      && enrolledStudent[key] !== undefined
      && enrolledStudent[key] !== ""
    ) {
      mergedStudent[key] = enrolledStudent[key];
    }
  });

  return mergedStudent;
};

const getGradeLevelId = (enrollment, student) => (
  enrollment.grade_level_id
  ?? enrollment.grade_level?.id
  ?? enrollment.gradeLevel?.id
  ?? student.grade_level?.id
  ?? student.gradeLevel?.id
  ?? student.grade_level_id
  ?? student.current_grade_level_id
  ?? student.current_grade_level?.id
  ?? student.currentGradeLevel?.id
);

const getGuardianId = (student) => student.guardian_id ?? student.guardian?.id;

const isPrimaryGuardian = (studentGuardian) => (
  studentGuardian.is_primary === true
  || studentGuardian.is_primary === 1
  || studentGuardian.is_primary === "1"
  || studentGuardian.pivot?.is_primary === true
  || studentGuardian.pivot?.is_primary === 1
  || studentGuardian.pivot?.is_primary === "1"
);

const getStudentName = (student) => {
  const user = student.user_system || student.userSystem || {};
  const name = [
    user.first_name || student.first_name,
    user.middle_name || student.middle_name,
    user.last_name || student.last_name,
    user.second_last_name || student.second_last_name,
  ].filter(Boolean).join(" ");

  return name || student.name || `Estudiante #${student.id}`;
};

const getGuardianName = (guardian) => {
  if (!guardian) return "Acudiente no registrado";

  const name = [
    guardian.first_name,
    guardian.middle_name,
    guardian.last_name,
    guardian.second_last_name,
  ].filter(Boolean).join(" ");

  return name || guardian.name || "Acudiente no registrado";
};

const getStudentAge = (birthDate) => {
  if (!birthDate) return "No registrado";
  const dateValue = String(birthDate).trim();
  const dateParts = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const date = dateParts
    ? new Date(Number(dateParts[1]), Number(dateParts[2]) - 1, Number(dateParts[3]))
    : new Date(dateValue);
  if (
    Number.isNaN(date.getTime())
    || (dateParts && (
      date.getFullYear() !== Number(dateParts[1])
      || date.getMonth() !== Number(dateParts[2]) - 1
      || date.getDate() !== Number(dateParts[3])
    ))
  ) return "No registrado";

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  if (
    today.getMonth() < date.getMonth()
    || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
  ) {
    age -= 1;
  }
  if (age < 0) return "No registrado";
  return age === 0 ? "Menos de 1 año" : `${age} años`;
};

const getGender = (gender) => {
  const value = String(gender || "").toLowerCase();
  if (value === "m") return "Masculino";
  if (value === "f") return "Femenino";
  if (value === "o") return "Otro";
  return gender || "No registrado";
};

// Consulta estudiantes con matrículas aprobadas desde la API.
const EstudiantesAp = () => {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [studentGuardians, setStudentGuardians] = useState([]);
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadStudents = async () => {
      setLoading(true);
      setError("");
      setWarning("");

      try {
        const [studentsResponse, enrollmentsResponse] = await Promise.all([
          api.get("/students/list"),
          api.get("/enrollments/list"),
        ]);
        const loadedStudents = getCollection(studentsResponse.data, "students");
        const loadedEnrollments = getCollection(enrollmentsResponse.data, "enrollments");
        const [gradeLevelsResult, guardiansResult, studentGuardiansResult] = await Promise.allSettled([
          api.get("/grade-levels/list"),
          api.get("/guardians/list"),
          api.get("/student-guardians/list"),
        ]);
        const warnings = [];
        let loadedGradeLevels = [];
        let loadedGuardians = [];
        let loadedStudentGuardians = [];

        if (gradeLevelsResult.status === "fulfilled") {
          try {
            loadedGradeLevels = getCollection(gradeLevelsResult.value.data, "grade_levels");
          } catch (parseError) {
            console.error("Error al leer los grados:", parseError);
            warnings.push("No se pudieron leer los grados; se mostrarán los datos incluidos en las matrículas.");
          }
        } else {
          console.error("Error al consultar los grados:", gradeLevelsResult.reason);
          warnings.push("No se pudieron consultar los grados; se mostrarán los datos incluidos en las matrículas.");
        }

        if (guardiansResult.status === "fulfilled") {
          try {
            loadedGuardians = getCollection(guardiansResult.value.data, "guardians");
          } catch (parseError) {
            console.error("Error al leer los acudientes:", parseError);
            warnings.push("No se pudieron leer los acudientes; se mostrarán los datos incluidos en los estudiantes.");
          }
        } else {
          console.error("Error al consultar los acudientes:", guardiansResult.reason);
          warnings.push("No se pudieron consultar los acudientes; se mostrarán los datos incluidos en los estudiantes.");
        }

        if (studentGuardiansResult.status === "fulfilled") {
          try {
            loadedStudentGuardians = getCollection(studentGuardiansResult.value.data, "student_guardians");
          } catch (parseError) {
            console.error("Error al leer la relación estudiante-acudiente:", parseError);
            warnings.push("No se pudo leer la relación entre estudiantes y acudientes.");
          }
        } else {
          console.error("Error al consultar la relación estudiante-acudiente:", studentGuardiansResult.reason);
          warnings.push("No se pudo consultar la relación entre estudiantes y acudientes.");
        }

        if (!ignore) {
          setStudents(loadedStudents);
          setEnrollments(loadedEnrollments);
          setGradeLevels(loadedGradeLevels);
          setGuardians(loadedGuardians);
          setStudentGuardians(loadedStudentGuardians);
          setWarning(warnings.join(" "));
        }
      } catch (loadError) {
        console.error("Error al cargar estudiantes aprobados:", loadError);
        if (!ignore) {
          setError(getErrorMessage(loadError, "No se pudieron cargar los estudiantes."));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadStudents();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const approvedRows = useMemo(() => {
    const studentsById = new Map(students.map((student) => [String(student.id), student]));
    const latestApprovedEnrollments = [...enrollments]
      .filter((enrollment) => isApproved(enrollment.status))
      .sort((first, second) => (
        String(second.enrollment_date || "").localeCompare(String(first.enrollment_date || ""))
      ));
    const seenStudentIds = new Set();

    return latestApprovedEnrollments.flatMap((enrollment) => {
      const studentId = getStudentId(enrollment);
      if (studentId === null || studentId === undefined || seenStudentIds.has(String(studentId))) {
        return [];
      }

      const student = mergeStudentRecords(
        enrollment.student,
        studentsById.get(String(studentId)),
      );
      if (!student) return [];

      seenStudentIds.add(String(studentId));
      return [{ student, enrollment }];
    });
  }, [enrollments, students]);

  const gradeLevelsById = useMemo(
    () => new Map(gradeLevels.map((grade) => [String(grade.id), grade])),
    [gradeLevels],
  );
  const guardiansById = useMemo(
    () => new Map(guardians.map((guardian) => [String(guardian.id), guardian])),
    [guardians],
  );
  const studentGuardianByStudentId = useMemo(() => {
    const linksByStudentId = new Map();
    studentGuardians.forEach((link) => {
      const studentId = link.student_id ?? link.student?.id;
      if (studentId === null || studentId === undefined) return;

      const key = String(studentId);
      const currentLink = linksByStudentId.get(key);
      if (!currentLink || isPrimaryGuardian(link)) linksByStudentId.set(key, link);
    });
    return linksByStudentId;
  }, [studentGuardians]);
  const getGradeName = useCallback((enrollment, student) => {
    const gradeLevelId = getGradeLevelId(enrollment, student);
    return enrollment.grade_level?.name
      || enrollment.gradeLevel?.name
      || student.grade_level?.name
      || student.gradeLevel?.name
      || student.current_grade_level?.name
      || student.currentGradeLevel?.name
      || gradeLevelsById.get(String(gradeLevelId))?.name
      || (gradeLevelId ? `Grado #${gradeLevelId}` : "Sin asignar");
  }, [gradeLevelsById]);
  const getGuardian = useCallback((student) => {
    const studentGuardian = studentGuardianByStudentId.get(String(student.id));
    const guardianId = getGuardianId(student)
      ?? studentGuardian?.guardian_id
      ?? studentGuardian?.guardian?.id;

    return guardiansById.get(String(guardianId))
      || studentGuardian?.guardian
      || student.guardian
      || null;
  }, [guardiansById, studentGuardianByStudentId]);

  const gradeOptions = useMemo(() => {
    const options = new Map();
    approvedRows.forEach(({ student, enrollment }) => {
      const gradeLevelId = getGradeLevelId(enrollment, student);
      const key = gradeLevelId === null || gradeLevelId === undefined
        ? "sin_asignar"
        : String(gradeLevelId);
      if (!options.has(key)) {
        options.set(key, getGradeName(enrollment, student));
      }
    });

    return [...options.entries()]
      .map(([id, name]) => ({ id, name }))
      .sort((first, second) => first.name.localeCompare(second.name, "es"));
  }, [approvedRows, getGradeName]);

  const filteredStudents = useMemo(() => approvedRows.filter(({ student, enrollment }) => {
    const user = student.user_system || student.userSystem || {};
    const guardian = getGuardian(student);
    const gradeLevelId = getGradeLevelId(enrollment, student);
    const gradeFilterKey = gradeLevelId === null || gradeLevelId === undefined
      ? "sin_asignar"
      : String(gradeLevelId);
    const searchable = [
      getStudentName(student),
      user.username || student.username,
      enrollment.enrollment_code || enrollment.id,
      getGradeName(enrollment, student),
      user.document || student.document,
      getGuardianName(guardian),
      guardian?.phone,
      guardian?.email,
    ].join(" ").toLowerCase();

    return (gradeFilter === "Todos" || gradeFilter === gradeFilterKey)
      && searchable.includes(query.trim().toLowerCase());
  }), [approvedRows, query, gradeFilter, getGradeName, getGuardian]);

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
              <i className="bi bi-people" aria-hidden="true" />
              Comunidad educativa
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Estudiantes aprobados</h1>
            <p className="mb-0 mt-2 text-sm text-slate-500">Gestiona el listado de estudiantes matriculados en tu institución.</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-3 shadow-sm">
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">Total matriculados</span>
            <strong className="mt-1 block text-2xl text-slate-900">{approvedRows.length}</strong>
          </div>
        </header>

        {error && (
          <div role="alert" className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="shrink-0 font-semibold underline">
              Reintentar
            </button>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="m-0 text-lg font-semibold text-slate-900">Lista de matriculados</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">Estudiantes cuyas matrículas fueron aprobadas.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row">
              <label className="relative block min-w-0 flex-1">
                <span className="sr-only">Buscar estudiante o acudiente</span>
                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10" placeholder="Buscar estudiante o acudiente" />
              </label>
              <label>
                <span className="sr-only">Filtrar estudiantes por grado</span>
                <select
                  value={gradeFilter}
                  onChange={(event) => setGradeFilter(event.target.value)}
                  className="w-full min-w-44 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                >
                  <option value="Todos">Todos los grados</option>
                  {gradeOptions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
              </label>
            </div>
          </div>
          {warning && (
            <p role="status" className="m-0 border-b border-amber-100 bg-amber-50 px-5 py-3 text-sm text-amber-800">{warning}</p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] border-collapse text-left">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Nombre / usuario</th>
                  <th className="px-5 py-4">ID matrícula</th>
                  <th className="px-5 py-4">Grado</th>
                  <th className="px-5 py-4">Acudiente / contacto</th>
                  <th className="px-5 py-4">Edad</th>
                  <th className="px-5 py-4">Género</th>
                  <th className="px-5 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && (
                  <tr>
                    <td colSpan="7" className="px-5 py-12 text-center text-sm text-slate-500">Cargando estudiantes desde la API...</td>
                  </tr>
                )}
                {!loading && filteredStudents.map(({ student, enrollment }) => {
                  const user = student.user_system || student.userSystem || {};
                  const grade = getGradeName(enrollment, student);
                  const guardian = getGuardian(student);
                  const document = user.document || student.document;

                  return (
                  <tr key={`${student.id}-${enrollment.id}`} className="transition hover:bg-violet-50/40">
                    <td className="px-5 py-4">
                      <strong className="block text-sm font-semibold text-slate-800">{getStudentName(student)}</strong>
                      <span className="mt-1 block text-xs text-slate-500">
                        {user.username || student.username || (document ? `Documento: ${document}` : "Sin usuario")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {enrollment.enrollment_code || `#${enrollment.id}`}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{grade}</span>
                    </td>
                    <td className="px-5 py-4">
                      <strong className="block text-sm font-semibold text-slate-800">{getGuardianName(guardian)}</strong>
                      <span className="mt-1 block text-xs text-slate-500">
                        {guardian?.phone || guardian?.email || guardian?.document || "Contacto no registrado"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {getStudentAge(student.birth_date || student.birthDate || enrollment.student?.birth_date || enrollment.student?.birthDate)}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{getGender(student.gender)}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {enrollment.status}
                      </span>
                    </td>
                  </tr>
                  );
                })}
                {!loading && filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-5 py-12 text-center">
                      <i className="bi bi-person-plus mb-3 block text-3xl text-slate-300" aria-hidden="true" />
                      <span className="block text-sm font-semibold text-slate-700">
                        {approvedRows.length === 0 ? "Aún no hay estudiantes aprobados" : "No se encontraron estudiantes"}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {approvedRows.length === 0 ? "Las matrículas aprobadas aparecerán aquí." : "Prueba con otro nombre, acudiente o grado."}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

    </div>
  );
};

export default EstudiantesAp;