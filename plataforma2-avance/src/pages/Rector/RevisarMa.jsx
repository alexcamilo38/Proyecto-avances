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

const getErrorMessage = (error, fallback) => {
  const validationErrors = error.response?.data?.errors;
  const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

  return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const getInstitutionId = (enrollment) => enrollment.institution_id ?? enrollment.institution?.id;
const getStudentId = (enrollment) => enrollment.student_id ?? enrollment.student?.id;
const getCampusId = (enrollment) => (
  enrollment.campuse_id
  ?? enrollment.campus_id
  ?? enrollment.campuse?.id
  ?? enrollment.campus?.id
);
const getAcademicYearId = (enrollment) => (
  enrollment.academic__year_id
  ?? enrollment.academic_year_id
  ?? enrollment.academic__year?.id
  ?? enrollment.academicYear?.id
  ?? enrollment.academic_year?.id
);
const getGradeLevelId = (enrollment) => (
  enrollment.grade_level_id
  ?? enrollment.grade_level?.id
  ?? enrollment.gradeLevel?.id
);

const normalizeStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();
  if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobada";
  if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazada";
  if (["en_revision", "en revisión", "revision", "revisión", "review", "in_review"].includes(value)) return "En revisión";
  return "Pendiente";
};

const getStatusClasses = (status) => {
  const normalizedStatus = normalizeStatus(status);
  if (normalizedStatus === "Aprobada") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (normalizedStatus === "Rechazada") return "border-rose-200 bg-rose-50 text-rose-700";
  if (normalizedStatus === "En revisión") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
};

const formatDate = (value) => {
  if (!value) return "No registrada";
  const stringValue = String(value);
  const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(stringValue) ? `${stringValue}T00:00:00` : stringValue;
  const date = new Date(dateValue);

  return Number.isNaN(date.getTime())
    ? stringValue
    : date.toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" });
};

const formatDatabaseTimestamp = () => new Date().toISOString().slice(0, 19).replace("T", " ");

const getStudentName = (student, enrollment) => {
  const user = student?.user_system || student?.userSystem || {};
  const name = [
    user.first_name || student?.first_name,
    user.middle_name || student?.middle_name,
    user.last_name || student?.last_name,
    user.second_last_name || student?.second_last_name,
  ].filter(Boolean).join(" ");

  return name || student?.name || `Estudiante #${getStudentId(enrollment) ?? enrollment.id}`;
};

const getDocumentName = (document, requirementTypesById) => (
  document.requirement_type?.name
  || document.requirementType?.name
  || document.requirement__type?.name
  || requirementTypesById.get(String(
    document.requirement__type_id
    ?? document.requirement_type_id
    ?? document.requirement_type?.id
    ?? document.requirementType?.id,
  ))?.name
  || document.title
  || document.name
  || document.file_name
  || "Documento adjunto"
);

const getDocumentUrl = (document) => {
  const rawUrl = document.imagen_url
    || document.image_url
    || document.document_url
    || document.file_url
    || document.url
    || document.imagen
    || "";

  if (typeof rawUrl !== "string" || !/^(https?:\/\/|\/)/i.test(rawUrl)) return "";

  try {
    const resolvedUrl = new URL(rawUrl, api.defaults.baseURL || window.location.origin);
    return ["http:", "https:"].includes(resolvedUrl.protocol) ? resolvedUrl.href : "";
  } catch {
    return "";
  }
};

const SummaryCard = ({ label, value, icon, tone }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
        <p className="mb-0 text-xl font-bold text-slate-900">{value}</p>
      </div>
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${tone}`}>
        <i className={`bi ${icon}`} aria-hidden="true" />
      </span>
    </div>
  </article>
);

const DetailItem = ({ label, value }) => (
  <div className="min-w-0 rounded-xl bg-slate-50 p-3">
    <dt className="text-xs font-medium text-slate-500">{label}</dt>
    <dd className="mb-0 mt-1 break-words text-sm font-semibold text-slate-800">{value || "No registrado"}</dd>
  </div>
);

const RevisarMa = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [institution, setInstitution] = useState(null);
  const [students, setStudents] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [requirementTypes, setRequirementTypes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [notice, setNotice] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [detailsId, setDetailsId] = useState(null);
  const [decisionType, setDecisionType] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadApplications = async () => {
      setLoading(true);
      setError("");
      setWarning("");

      const requests = [
        { key: "enrollments", responseKey: "enrollments", path: "/enrollments/list", required: true },
        { key: "institutions", responseKey: "institutions", path: "/institutions/list", required: true },
        { key: "students", responseKey: "students", path: "/students/list" },
        { key: "campuses", responseKey: "campuses", path: "/campuses/list" },
        { key: "gradeLevels", responseKey: "grade_levels", path: "/grade-levels/list" },
        { key: "academicYears", responseKey: "academic_years", path: "/academic-years/list" },
        { key: "guardians", responseKey: "guardians", path: "/guardians/list" },
        { key: "requirementTypes", responseKey: "requirement_types", path: "/requirement-types/list" },
        { key: "documents", responseKey: "enrollment_documents", path: "/enrollment-documents/list" },
      ];
      const results = await Promise.allSettled(requests.map(({ path }) => api.get(path)));
      const loaded = {
        enrollments: [],
        institutions: [],
        students: [],
        campuses: [],
        gradeLevels: [],
        academicYears: [],
        guardians: [],
        requirementTypes: [],
        documents: [],
      };
      const warnings = [];
      let requiredError = null;

      results.forEach((result, index) => {
        const request = requests[index];
        if (result.status === "rejected") {
          console.error(`Error al consultar ${request.path}:`, result.reason);
          const message = getErrorMessage(result.reason, `No se pudo consultar ${request.path}.`);
          if (request.required) requiredError = new Error(message);
          else warnings.push(message);
          return;
        }

        try {
          loaded[request.key] = getCollection(result.value.data, request.responseKey);
        } catch (parseError) {
          console.error(`Error al leer ${request.path}:`, parseError);
          if (request.required) requiredError = parseError;
          else warnings.push(parseError.message);
        }
      });

      if (ignore) return;
      if (requiredError) {
        setError(getErrorMessage(requiredError, "No se pudieron cargar las solicitudes de matrícula."));
        setLoading(false);
        return;
      }

      setEnrollments(loaded.enrollments);
      setInstitution(loaded.institutions[0] || null);
      setStudents(loaded.students);
      setCampuses(loaded.campuses);
      setGradeLevels(loaded.gradeLevels);
      setAcademicYears(loaded.academicYears);
      setGuardians(loaded.guardians);
      setRequirementTypes(loaded.requirementTypes);
      setDocuments(loaded.documents);
      setWarning(warnings.join(" "));
      setLoading(false);
    };

    loadApplications().catch((loadError) => {
      console.error("Error al cargar las solicitudes de matrícula:", loadError);
      if (!ignore) {
        setError(getErrorMessage(loadError, "No se pudieron cargar las solicitudes de matrícula."));
        setLoading(false);
      }
    });

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const studentsById = useMemo(
    () => new Map(students.map((student) => [String(student.id), student])),
    [students],
  );
  const campusesById = useMemo(
    () => new Map(campuses.map((campus) => [String(campus.id), campus])),
    [campuses],
  );
  const gradesById = useMemo(
    () => new Map(gradeLevels.map((grade) => [String(grade.id), grade])),
    [gradeLevels],
  );
  const academicYearsById = useMemo(
    () => new Map(academicYears.map((year) => [String(year.id), year])),
    [academicYears],
  );
  const guardiansById = useMemo(
    () => new Map(guardians.map((guardian) => [String(guardian.id), guardian])),
    [guardians],
  );
  const requirementTypesById = useMemo(
    () => new Map(requirementTypes.map((requirement) => [String(requirement.id), requirement])),
    [requirementTypes],
  );

  const institutionApplications = useMemo(() => {
    if (!institution?.id) return [];
    return enrollments.filter(
      (enrollment) => String(getInstitutionId(enrollment)) === String(institution.id),
    );
  }, [enrollments, institution]);

  const getStudent = useCallback((enrollment) => (
    enrollment.student || studentsById.get(String(getStudentId(enrollment))) || null
  ), [studentsById]);
  const getGradeName = useCallback((enrollment) => (
    enrollment.grade_level?.name
    || enrollment.gradeLevel?.name
    || gradesById.get(String(getGradeLevelId(enrollment)))?.name
    || (getGradeLevelId(enrollment) ? `Grado #${getGradeLevelId(enrollment)}` : "Sin asignar")
  ), [gradesById]);
  const getCampus = useCallback((enrollment) => (
    enrollment.campuse
    || enrollment.campus
    || campusesById.get(String(getCampusId(enrollment)))
    || null
  ), [campusesById]);
  const getAcademicYear = (enrollment) => (
    enrollment.academic__year
    || enrollment.academicYear
    || enrollment.academic_year
    || academicYearsById.get(String(getAcademicYearId(enrollment)))
    || null
  );
  const getEnrollmentDocuments = (enrollment) => documents.filter(
    (document) => String(document.enrollment_id ?? document.enrollment?.id) === String(enrollment.id),
  );
  const getGuardian = (student) => (
    student?.guardian
    || guardiansById.get(String(student?.guardian_id ?? student?.guardian?.id))
    || null
  );

  const grades = useMemo(
    () => [...new Set(institutionApplications.map((enrollment) => getGradeName(enrollment)))].sort(),
    [institutionApplications, getGradeName],
  );

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return institutionApplications.filter((enrollment) => {
      const student = getStudent(enrollment);
      const user = student?.user_system || student?.userSystem || {};
      const grade = getGradeName(enrollment);
      const campus = getCampus(enrollment);
      const status = normalizeStatus(enrollment.status);
      const searchable = [
        getStudentName(student, enrollment),
        user.username || student?.username,
        user.document || student?.document,
        enrollment.enrollment_code,
        grade,
        campus?.name || campus?.name_campus,
      ].join(" ").toLowerCase();

      return (gradeFilter === "Todos" || grade === gradeFilter)
        && (statusFilter === "Todos" || status === statusFilter)
        && searchable.includes(normalizedQuery);
    });
  }, [
    institutionApplications,
    getStudent,
    getCampus,
    getGradeName,
    query,
    gradeFilter,
    statusFilter,
  ]);

  const summary = useMemo(() => ({
    total: institutionApplications.length,
    pending: institutionApplications.filter(({ status }) => normalizeStatus(status) === "Pendiente").length,
    inReview: institutionApplications.filter(({ status }) => normalizeStatus(status) === "En revisión").length,
    approved: institutionApplications.filter(({ status }) => normalizeStatus(status) === "Aprobada").length,
    rejected: institutionApplications.filter(({ status }) => normalizeStatus(status) === "Rechazada").length,
  }), [institutionApplications]);

  const selectedApplication = institutionApplications.find(
    (enrollment) => String(enrollment.id) === String(detailsId),
  );

  const closeDetails = () => {
    setDetailsId(null);
    setDecisionType("");
    setRejectionReason("");
  };

  const handleDecision = async () => {
    if (!selectedApplication || !decisionType) return;
    if (decisionType === "reject" && !rejectionReason.trim()) {
      setError("Indica el motivo del rechazo para continuar.");
      return;
    }

    const currentStatus = normalizeStatus(selectedApplication.status);
    if (["Aprobada", "Rechazada"].includes(currentStatus)) {
      setError("Esta matrícula ya tiene una decisión registrada.");
      return;
    }
    if (decisionType === "review" && currentStatus !== "Pendiente") {
      setError("Solo se pueden marcar como en revisión las matrículas pendientes.");
      return;
    }

    setSavingId(selectedApplication.id);
    setError("");
    setNotice("");

    const payload = {
      enrollment_date: selectedApplication.enrollment_date,
      status: decisionType === "approve"
        ? "aprobado"
        : decisionType === "reject"
          ? "rechazado"
          : "en_revision",
      enrollment_code: selectedApplication.enrollment_code,
      shift: selectedApplication.shift,
      reviewed_at: formatDatabaseTimestamp(),
      rejection_reason: decisionType === "reject" ? rejectionReason.trim() : null,
      student_id: getStudentId(selectedApplication) ?? null,
      institution_id: getInstitutionId(selectedApplication) ?? institution.id,
      campuse_id: getCampusId(selectedApplication) ?? null,
      academic__year_id: getAcademicYearId(selectedApplication) ?? null,
      grade_level_id: getGradeLevelId(selectedApplication) ?? null,
    };

    try {
      await api.put(`/enrollments/${selectedApplication.id}`, payload);
      const noticeByDecision = {
        review: "pasó a En revisión correctamente.",
        approve: "fue aprobada correctamente.",
        reject: "fue rechazada correctamente.",
      };
      setNotice(`La matrícula ${selectedApplication.enrollment_code || `#${selectedApplication.id}`} ${noticeByDecision[decisionType]}`);
      closeDetails();
      setReloadKey((key) => key + 1);
    } catch (saveError) {
      console.error("Error al guardar la decisión de matrícula:", saveError);
      setError(getErrorMessage(saveError, "No se pudo guardar la decisión. Verifica los datos e inténtalo nuevamente."));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <main className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] bg-slate-50 px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
              <i className="bi bi-clipboard-check" aria-hidden="true" />
              Gestión académica
            </span>
            <h1 className="m-0 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Revisar matrículas</h1>
            <p className="mb-0 mt-2 text-sm text-slate-500">Consulta los datos y documentos de cada solicitud y registra la decisión de la institución.</p>
          </div>
          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <i className={`bi ${loading ? "bi-arrow-repeat animate-spin" : "bi-arrow-clockwise"}`} aria-hidden="true" />
            Actualizar
          </button>
        </header>

        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {notice && (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {notice}
          </div>
        )}
        {warning && (
          <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Algunos datos complementarios no se pudieron cargar. {warning}
          </div>
        )}

        {!loading && !institution && (
          <div className="flex flex-col gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-900 sm:flex-row sm:items-center sm:justify-between">
            <span>Registra primero la institución para asociar y revisar sus solicitudes.</span>
            <Link to="/RegistrarIns" className="font-bold text-violet-800 hover:text-violet-950">Registrar institución</Link>
          </div>
        )}

        {institution && (
          <>
            <section aria-label="Resumen de matrículas" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              <SummaryCard label="Solicitudes recibidas" value={summary.total} icon="bi-collection" tone="bg-violet-50 text-violet-700" />
              <SummaryCard label="Pendientes de revisión" value={summary.pending} icon="bi-hourglass-split" tone="bg-amber-50 text-amber-700" />
              <SummaryCard label="En revisión" value={summary.inReview} icon="bi-search" tone="bg-sky-50 text-sky-700" />
              <SummaryCard label="Aprobadas" value={summary.approved} icon="bi-person-check" tone="bg-emerald-50 text-emerald-700" />
              <SummaryCard label="Rechazadas" value={summary.rejected} icon="bi-person-x" tone="bg-rose-50 text-rose-700" />
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h2 className="m-0 text-lg font-semibold text-slate-900">Solicitudes de {institution.name_institution || institution.name || "la institución"}</h2>
                  <p className="mb-0 mt-1 text-sm text-slate-500">Revisa la información y los archivos antes de decidir.</p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <label className="sr-only" htmlFor="application-search">Buscar solicitud</label>
                  <input
                    id="application-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar estudiante o código"
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />
                  <label className="sr-only" htmlFor="filter-grade">Filtrar por grado</label>
                  <select
                    id="filter-grade"
                    value={gradeFilter}
                    onChange={(event) => setGradeFilter(event.target.value)}
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="Todos">Todos los grados</option>
                    {grades.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                  </select>
                  <label className="sr-only" htmlFor="filter-status">Filtrar por estado</label>
                  <select
                    id="filter-status"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="Todos">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En revisión">En revisión</option>
                    <option value="Aprobada">Aprobada</option>
                    <option value="Rechazada">Rechazada</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div role="status" className="p-10 text-center text-sm text-slate-500">
                  <i className="bi bi-arrow-repeat mr-2 animate-spin text-violet-700" aria-hidden="true" />
                  Cargando solicitudes desde la API...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-5 py-4">Estudiante</th>
                        <th className="px-5 py-4">Grado / sede</th>
                        <th className="px-5 py-4">Fecha de solicitud</th>
                        <th className="px-5 py-4">Documentos</th>
                        <th className="px-5 py-4">Estado</th>
                        <th className="px-5 py-4">Revisión</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplications.map((enrollment) => {
                        const student = getStudent(enrollment);
                        const user = student?.user_system || student?.userSystem || {};
                        const enrollmentDocuments = getEnrollmentDocuments(enrollment);
                        const campus = getCampus(enrollment);

                        return (
                          <tr key={enrollment.id} className="transition hover:bg-violet-50/40">
                            <td className="px-5 py-4">
                              <strong className="block text-sm font-semibold text-slate-800">{getStudentName(student, enrollment)}</strong>
                              <span className="mt-1 block text-xs text-slate-500">
                                {user.document || student?.document || "Documento no registrado"}
                                {enrollment.enrollment_code ? ` · ${enrollment.enrollment_code}` : ""}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <strong className="block text-sm font-medium text-slate-700">{getGradeName(enrollment)}</strong>
                              <span className="mt-1 block text-xs text-slate-500">{campus?.name || campus?.name_campus || "Sede no especificada"}</span>
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-600">{formatDate(enrollment.enrollment_date)}</td>
                            <td className="px-5 py-4 text-sm text-slate-600">{enrollmentDocuments.length} archivo(s)</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(enrollment.status)}`}>
                                {normalizeStatus(enrollment.status)}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setDetailsId(enrollment.id);
                                  setDecisionType("");
                                  setRejectionReason("");
                                  setError("");
                                }}
                                className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                              >
                                <i className="bi bi-eye" aria-hidden="true" />
                                Ver solicitud
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredApplications.length === 0 && (
                        <tr>
                          <td colSpan="6" className="px-5 py-12 text-center text-sm text-slate-500">
                            {institutionApplications.length === 0
                              ? "Aún no hay solicitudes de matrícula para esta institución."
                              : "No se encontraron solicitudes con los filtros seleccionados."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {selectedApplication && (() => {
        const student = getStudent(selectedApplication);
        const user = student?.user_system || student?.userSystem || {};
        const guardian = getGuardian(student);
        const enrollmentDocuments = getEnrollmentDocuments(selectedApplication);
        const campus = getCampus(selectedApplication);
        const academicYear = getAcademicYear(selectedApplication);
        const currentStatus = normalizeStatus(selectedApplication.status);
        const isFinalized = ["Aprobada", "Rechazada"].includes(currentStatus);

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !savingId) closeDetails();
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="enrollment-detail-title"
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
            >
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                    Solicitud {selectedApplication.enrollment_code || `#${selectedApplication.id}`}
                  </p>
                  <h2 id="enrollment-detail-title" className="m-0 text-lg font-bold text-slate-900">Detalle de matrícula</h2>
                  <p className="mb-0 mt-1 text-sm text-slate-500">{institution?.name_institution || institution?.name}</p>
                </div>
                <button
                  type="button"
                  onClick={closeDetails}
                  disabled={Boolean(savingId)}
                  aria-label="Cerrar detalles"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
                >
                  <i className="bi bi-x-lg" aria-hidden="true" />
                </button>
              </div>

              <section aria-labelledby="student-details-title">
                <h3 id="student-details-title" className="mb-3 mt-0 text-sm font-bold text-slate-800">Información del estudiante</h3>
                <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailItem label="Nombre completo" value={getStudentName(student, selectedApplication)} />
                  <DetailItem label="Usuario" value={user.username || student?.username} />
                  <DetailItem label="Tipo y número de documento" value={[user.document_type || student?.document_type, user.document || student?.document].filter(Boolean).join(" · ")} />
                  <DetailItem label="Fecha de nacimiento" value={formatDate(student?.birth_date)} />
                  <DetailItem label="Dirección" value={student?.address} />
                  <DetailItem label="Correo" value={user.email || student?.email} />
                </dl>
              </section>

              <section aria-labelledby="enrollment-data-title" className="mt-5">
                <h3 id="enrollment-data-title" className="mb-3 mt-0 text-sm font-bold text-slate-800">Datos de la solicitud</h3>
                <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailItem label="Grado solicitado" value={getGradeName(selectedApplication)} />
                  <DetailItem label="Sede" value={campus?.name || campus?.name_campus} />
                  <DetailItem label="Año académico" value={academicYear?.name} />
                  <DetailItem label="Jornada" value={selectedApplication.shift} />
                  <DetailItem label="Fecha de solicitud" value={formatDate(selectedApplication.enrollment_date)} />
                  <DetailItem label="Fecha de revisión" value={formatDate(selectedApplication.reviewed_at)} />
                  <DetailItem label="Estado actual" value={currentStatus} />
                  {selectedApplication.rejection_reason && (
                    <DetailItem label="Motivo de rechazo" value={selectedApplication.rejection_reason} />
                  )}
                </dl>
              </section>

              {guardian && (
                <section aria-labelledby="guardian-title" className="mt-5">
                  <h3 id="guardian-title" className="mb-3 mt-0 text-sm font-bold text-slate-800">Acudiente</h3>
                  <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <DetailItem label="Nombre" value={[guardian.first_name, guardian.middle_name, guardian.last_name, guardian.second_last_name].filter(Boolean).join(" ")} />
                    <DetailItem label="Documento" value={guardian.document} />
                    <DetailItem label="Teléfono" value={guardian.phone} />
                    <DetailItem label="Correo" value={guardian.email} />
                  </dl>
                </section>
              )}

              <section aria-labelledby="documents-title" className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 id="documents-title" className="m-0 text-sm font-bold text-slate-800">Documentos adjuntos</h3>
                  <span className="text-xs text-slate-500">{enrollmentDocuments.length} archivo(s)</span>
                </div>
                {enrollmentDocuments.length ? (
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {enrollmentDocuments.map((document) => {
                      const documentUrl = getDocumentUrl(document);
                      return (
                        <li key={document.id} className="flex flex-col justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 sm:flex-row sm:items-center">
                          <div className="flex min-w-0 items-start gap-3">
                            <i className="bi bi-file-earmark-text mt-0.5 text-violet-700" aria-hidden="true" />
                            <div className="min-w-0">
                              <p className="m-0 break-words text-sm font-semibold text-slate-700">{getDocumentName(document, requirementTypesById)}</p>
                              <p className="mb-0 mt-1 text-xs text-slate-500">Estado: {document.status || "Sin estado"}</p>
                            </div>
                          </div>
                          {documentUrl && (
                            <a
                              href={documentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                            >
                              <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                              Abrir archivo
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mb-0 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">No se encontraron documentos asociados a esta solicitud.</p>
                )}
              </section>

              {!isFinalized && (
                <section aria-label="Registrar decisión" className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                  {!decisionType ? (
                    <>
                      <p className="mb-3 text-sm font-semibold text-slate-800">
                        {currentStatus === "En revisión"
                          ? "La solicitud está en revisión. Cuando termines, registra la decisión."
                          : "¿Qué decisión deseas registrar?"}
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        {currentStatus === "Pendiente" && (
                          <button
                            type="button"
                            onClick={() => setDecisionType("review")}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-bold text-sky-700 transition hover:bg-sky-50 focus:outline-none focus:ring-4 focus:ring-sky-500/20"
                          >
                            <i className="bi bi-search" aria-hidden="true" />
                            Marcar en revisión
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDecisionType("approve")}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                        >
                          <i className="bi bi-check-lg" aria-hidden="true" />
                          Aprobar matrícula
                        </button>
                        <button
                          type="button"
                          onClick={() => setDecisionType("reject")}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-500/20"
                        >
                          <i className="bi bi-x-lg" aria-hidden="true" />
                          Rechazar solicitud
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <p className="m-0 text-sm font-semibold text-slate-800">
                        {decisionType === "review"
                          ? "Confirma que deseas cambiar el estado a En revisión."
                          : decisionType === "approve"
                            ? "Confirma que deseas aprobar esta matrícula."
                            : "Indica el motivo que se comunicará al estudiante."}
                      </p>
                      {decisionType === "reject" && (
                        <label className="block text-sm font-medium text-slate-700" htmlFor="rejection-reason">
                          Motivo de rechazo
                          <textarea
                            id="rejection-reason"
                            value={rejectionReason}
                            onChange={(event) => setRejectionReason(event.target.value)}
                            rows={3}
                            maxLength={2000}
                            required
                            className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                            placeholder="Explica brevemente el motivo..."
                          />
                        </label>
                      )}
                      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setDecisionType("");
                            setRejectionReason("");
                            setError("");
                          }}
                          disabled={Boolean(savingId)}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleDecision}
                          disabled={Boolean(savingId) || (decisionType === "reject" && !rejectionReason.trim())}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${decisionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : decisionType === "review" ? "bg-sky-600 hover:bg-sky-700" : "bg-rose-600 hover:bg-rose-700"}`}
                        >
                          {savingId
                            ? <i className="bi bi-arrow-repeat animate-spin" aria-hidden="true" />
                            : <i className={`bi ${decisionType === "approve" ? "bi-check-lg" : decisionType === "review" ? "bi-search" : "bi-x-lg"}`} aria-hidden="true" />}
                          {savingId
                            ? "Guardando..."
                            : decisionType === "approve"
                              ? "Confirmar aprobación"
                              : decisionType === "review"
                                ? "Confirmar revisión"
                                : "Confirmar rechazo"}
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {isFinalized && (
                <p className={`mb-0 mt-5 rounded-xl border p-3 text-sm ${currentStatus === "Aprobada" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
                  Esta solicitud ya fue {currentStatus.toLowerCase()} y no admite otra decisión.
                </p>
              )}
            </section>
          </div>
        );
      })()}
    </main>
  );
};

export default RevisarMa;
