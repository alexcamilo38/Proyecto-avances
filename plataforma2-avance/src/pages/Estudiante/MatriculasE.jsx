import { useMemo, useState } from "react";
import api from "../../Config/env";

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const getCollection = (responseData, key) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.[key])) return responseData[key];
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error(`El servidor devolvió una respuesta inesperada al consultar ${key}.`);
};

const getStudentEntity = (responseData) => {
    let entity = responseData?.data?.data ?? responseData?.data ?? responseData;

    for (let depth = 0; depth < 4; depth += 1) {
        if (Array.isArray(entity)) {
            entity = entity[0] ?? null;
            continue;
        }
        if (!entity || typeof entity !== "object") return null;
        if (entity.student) {
            entity = entity.student;
            continue;
        }
        if (entity.data !== undefined) {
            entity = entity.data;
            continue;
        }
        return entity;
    }

    return entity;
};

const findStudentByDocument = async (document, documentType) => {
    const requests = [
        ...(documentType ? [{ document, document_type: documentType }] : []),
        { document },
    ];

    for (const params of requests) {
        try {
            const response = await api.get("/students/by-document", { params });
            const student = getStudentEntity(response.data);
            if (student?.id) return student;
        } catch (lookupError) {
            if (lookupError.response?.status !== 404) throw lookupError;
        }
    }

    return null;
};

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const normalizeStatus = (status) => {
    const value = String(status || "").trim().toLowerCase();
    if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobado";
    if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazado";
    if (["en_revision", "en revisión", "revision", "revisión", "review", "in_review"].includes(value)) return "En revisión";
    if (["pendiente", "pending", "submitted"].includes(value)) return "Pendiente";
    return status || "Pendiente";
};

const isApproved = (status) => normalizeStatus(status) === "Aprobado";

const getStudentId = (student) => student?.id;
const getEnrollmentCampusId = (enrollment) => (
    enrollment.campuse_id
    ?? enrollment.campus_id
    ?? enrollment.campuse?.id
    ?? enrollment.campus?.id
);
const getEnrollmentYearId = (enrollment) => (
    enrollment.academic__year_id
    ?? enrollment.academic_year_id
    ?? enrollment.academic__year?.id
    ?? enrollment.academicYear?.id
);
const formatDate = (value) => {
    if (!value) return "No registrada";
    const stringValue = String(value);
    const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(stringValue) ? `${stringValue}T00:00:00` : stringValue;
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime())
        ? stringValue
        : date.toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" });
};

const getStatusClasses = (status) => {
    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus === "Aprobado") return "border-emerald-200 bg-emerald-50 text-emerald-700";
    if (normalizedStatus === "Rechazado") return "border-rose-200 bg-rose-50 text-rose-700";
    if (normalizedStatus === "En revisión") return "border-sky-200 bg-sky-50 text-sky-700";
    return "border-amber-200 bg-amber-50 text-amber-700";
};

const SummaryCard = ({ label, value, icon, tone }) => (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-3">
            <div>
                <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
                <p className="mb-0 text-lg font-bold text-slate-900">{value}</p>
            </div>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${tone}`}>
                <i className={`bi ${icon}`} aria-hidden="true" />
            </span>
        </div>
    </article>
);

const createReceipt = async (enrollment, institutionName, moduleNames) => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFillColor(21, 48, 81);
    pdf.rect(0, 0, pageWidth, 42, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("EasyMatric", 18, 18);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text("Comprobante de matrícula", 18, 30);

    pdf.setTextColor(21, 48, 81);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Información del proceso", 18, 56);
    pdf.setDrawColor(226, 232, 240);
    pdf.line(18, 60, pageWidth - 18, 60);

    const data = [
        ["Institución", institutionName],
        ["ID del proceso", enrollment.enrollment_code || `#${enrollment.id}`],
        ["Estado", normalizeStatus(enrollment.status)],
        ["Fecha de solicitud", enrollment.enrollment_date || "No registrada"],
        ["Fecha de emisión", new Date().toLocaleDateString("es-CO")],
    ];
    let y = 72;

    data.forEach(([label, value]) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(label, 18, y);
        pdf.setFont("helvetica", "normal");
        const lines = pdf.splitTextToSize(String(value), pageWidth - 82);
        pdf.text(lines, 68, y);
        y += Math.max(9, lines.length * 6);
    });

    y += 7;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Módulos inscritos", 18, y);
    pdf.setDrawColor(226, 232, 240);
    pdf.line(18, y + 4, pageWidth - 18, y + 4);
    y += 14;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    (moduleNames.length ? moduleNames : ["No hay módulos relacionados"]).forEach((name) => {
        const lines = pdf.splitTextToSize(`- ${name}`, pageWidth - 44);
        if (y + lines.length * 7 > 275) {
            pdf.addPage();
            y = 20;
        }
        pdf.text(lines, 22, y);
        y += lines.length * 7;
    });

    y += 10;
    if (y > 280) {
        pdf.addPage();
        y = 20;
    }
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text("Documento generado desde la plataforma EasyMatric.", 18, y);
    pdf.save(`comprobante-${enrollment.enrollment_code || enrollment.id}.pdf`);
};

const MatriculasE = () => {
    const [documentType, setDocumentType] = useState("");
    const [document, setDocument] = useState("");
    const [student, setStudent] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [moduleEnrollments, setModuleEnrollments] = useState([]);
    const [modules, setModules] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [classGroups, setClassGroups] = useState([]);
    const [requirementTypes, setRequirementTypes] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);

    const modulesById = useMemo(
        () => new Map(modules.map((module) => [String(module.id), module])),
        [modules],
    );
    const institutionsById = useMemo(
        () => new Map(institutions.map((institution) => [String(institution.id), institution])),
        [institutions],
    );
    const campusesById = useMemo(
        () => new Map(campuses.map((campus) => [String(campus.id), campus])),
        [campuses],
    );
    const classGroupsById = useMemo(
        () => new Map(classGroups.map((group) => [String(group.id), group])),
        [classGroups],
    );
    const requirementTypesById = useMemo(
        () => new Map(requirementTypes.map((requirement) => [String(requirement.id), requirement])),
        [requirementTypes],
    );
    const enrollmentSummary = useMemo(() => {
        const approved = enrollments.filter((item) => isApproved(item.status)).length;
        const rejected = enrollments.filter((item) => normalizeStatus(item.status) === "Rechazado").length;
        return {
            total: enrollments.length,
            approved,
            rejected,
            inProgress: enrollments.length - approved - rejected,
        };
    }, [enrollments]);

    const getInstitutionName = (enrollment) => (
        enrollment.institution?.name_institution
        || institutionsById.get(String(enrollment.institution_id))?.name_institution
        || "Institución no registrada"
    );

    const getModulesForEnrollment = (enrollment) => {
        const studentId = getStudentId(student);
        return moduleEnrollments
            .filter((item) => String(item.student_id ?? item.student?.id) === String(studentId))
            .filter((item) => {
                const module = item.module || modulesById.get(String(item.module_id));
                const group = module?.class_group
                    || module?.classGroup
                    || classGroupsById.get(String(module?.class_group_id));
                const groupCampusId = group?.campuse_id
                    ?? group?.campus_id
                    ?? group?.campuse?.id
                    ?? group?.campus?.id;
                const groupYearId = group?.academic__year_id
                    ?? group?.academic_year_id
                    ?? group?.academic__year?.id
                    ?? group?.academicYear?.id;
                const enrollmentCampusId = getEnrollmentCampusId(enrollment);
                const enrollmentYearId = getEnrollmentYearId(enrollment);
                const sameCampus = !enrollmentCampusId
                    || !groupCampusId
                    || String(enrollmentCampusId) === String(groupCampusId);
                const sameYear = !enrollmentYearId
                    || !groupYearId
                    || String(enrollmentYearId) === String(groupYearId);

                return sameCampus && sameYear;
            })
            .map((item) => item.module || modulesById.get(String(item.module_id)))
            .filter(Boolean);
    };

    const getDocumentsForEnrollment = (enrollment) => documents.filter(
        (item) => String(item.enrollment_id ?? item.enrollment?.id) === String(enrollment.id),
    );

    const getProgressStep = (enrollment) => {
        const status = normalizeStatus(enrollment.status);
        if (status === "Aprobado" || status === "Rechazado") return 4;
        if (enrollment.reviewed_at || status === "En revisión") return 3;
        if (getDocumentsForEnrollment(enrollment).length > 0) return 2;
        return 1;
    };

    const loadStudentEnrollments = async (event) => {
        event.preventDefault();
        setError("");
        setWarning("");
        setStudent(null);
        setEnrollments([]);
        setModuleEnrollments([]);
        setModules([]);
        setInstitutions([]);
        setCampuses([]);
        setClassGroups([]);
        setRequirementTypes([]);
        setDocuments([]);
        setSelectedEnrollment(null);
        setLoading(true);

        try {
            const foundStudent = await findStudentByDocument(document.trim(), documentType);
            if (!foundStudent?.id) {
                throw new Error("No encontramos un estudiante con ese documento. Verifica el tipo y el número e inténtalo de nuevo.");
            }

            const studentId = foundStudent.id;
            const requests = [
                { key: "enrollments", url: "/enrollments/list", responseKey: "enrollments", params: { student_id: studentId } },
                { key: "moduleEnrollments", url: "/module-enrollments/list", responseKey: "module_enrollments", params: { student_id: studentId } },
                { key: "modules", url: "/modules/list", responseKey: "modules" },
                { key: "institutions", url: "/institutions/list", responseKey: "institutions" },
                { key: "campuses", url: "/campuses/list", responseKey: "campuses" },
                { key: "classGroups", url: "/class-groups/list", responseKey: "class_groups" },
                { key: "requirementTypes", url: "/requirement-types/list", responseKey: "requirement_types" },
                { key: "documents", url: "/enrollment-documents/list", responseKey: "enrollment_documents" },
            ];
            const results = await Promise.allSettled(requests.map(({ url, params }) => api.get(url, { params })));
            const values = {
                enrollments: [],
                moduleEnrollments: [],
                modules: [],
                institutions: [],
                campuses: [],
                classGroups: [],
                requirementTypes: [],
                documents: [],
            };
            const warnings = [];

            results.forEach((result, index) => {
                const { key, responseKey } = requests[index];
                if (result.status === "rejected") {
                    if (key === "enrollments") throw result.reason;
                    console.error(`Error al cargar ${key}:`, result.reason);
                    warnings.push(getErrorMessage(result.reason, `No se pudo cargar ${key}.`));
                    return;
                }

                try {
                    values[key] = getCollection(result.value.data, responseKey);
                } catch (parseError) {
                    if (key === "enrollments") throw parseError;
                    console.error(`Error al leer ${key}:`, parseError);
                    warnings.push(parseError.message);
                }
            });

            const studentEnrollments = values.enrollments.filter(
                (item) => String(item.student_id ?? item.student?.id) === String(studentId),
            );
            const studentModuleEnrollments = values.moduleEnrollments.filter(
                (item) => String(item.student_id ?? item.student?.id) === String(studentId),
            );

            setStudent(foundStudent);
            setEnrollments(studentEnrollments);
            setModuleEnrollments(studentModuleEnrollments);
            setModules(values.modules);
            setInstitutions(values.institutions);
            setCampuses(values.campuses);
            setClassGroups(values.classGroups);
            setRequirementTypes(values.requirementTypes);
            setDocuments(values.documents);
            setWarning(warnings.join(" "));
        } catch (loadError) {
            console.error("Error al consultar matrículas:", loadError);
            setError(getErrorMessage(loadError, "No se pudieron cargar las matrículas."));
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (enrollment) => {
        setDownloadingId(enrollment.id);
        setError("");

        try {
            const moduleNames = getModulesForEnrollment(enrollment).map((module) => module.name_module);
            await createReceipt(enrollment, getInstitutionName(enrollment), moduleNames);
        } catch (downloadError) {
            console.error("No se pudo generar el comprobante PDF:", downloadError);
            setError("No se pudo generar el comprobante. Inténtalo nuevamente.");
        } finally {
            setDownloadingId(null);
        }
    };

    const steps = ["Solicitud", "Documentación", "Revisión", "Finalizado"];

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto min-w-0 max-w-7xl">
                <header className="relative mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-8 sm:py-9">
                    <span className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[32px] border-white/5" aria-hidden="true" />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-100">
                                <i className="bi bi-journal-check" aria-hidden="true" />
                                Portal del estudiante
                            </span>
                            <h1 className="mb-2 mt-0 text-2xl font-semibold max-sm:text-xl">Mis matrículas</h1>
                            <p className="mb-0 max-w-2xl text-sm leading-6 text-slate-300">
                                Consulta tus solicitudes, revisa su avance y descarga el comprobante cuando una matrícula sea aprobada.
                            </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-sm font-semibold text-emerald-100">
                            <i className="bi bi-shield-check" aria-hidden="true" />
                            Seguimiento seguro
                        </span>
                    </div>
                </header>

                <form onSubmit={loadStudentEnrollments} className="relative z-10 mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-6">
                    <div className="mb-5 flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-700">
                            <i className="bi bi-search" aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className="mb-1 mt-0 text-sm font-bold text-slate-900">Consulta tus solicitudes</h2>
                            <p className="mb-0 text-sm text-slate-500">Ingresa el documento con el que está registrado el estudiante.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(190px,0.8fr)_minmax(240px,1.5fr)_auto]">
                        <div>
                            <label className={labelClass} htmlFor="student-document-type">Tipo de documento</label>
                            <select
                                id="student-document-type"
                                className={fieldClass}
                                value={documentType}
                                onChange={(event) => setDocumentType(event.target.value)}
                                disabled={loading}
                            >
                                <option value="">Cualquier tipo</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="CC">Cédula de ciudadanía</option>
                                <option value="CE">Cédula de extranjería</option>
                                <option value="RC">Registro civil</option>
                                <option value="PP">Pasaporte</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="student-document">Documento del estudiante</label>
                            <input
                                id="student-document"
                                className={fieldClass}
                                value={document}
                                onChange={(event) => setDocument(event.target.value)}
                                autoComplete="off"
                                disabled={loading}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3.5 font-bold text-white transition hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-300 sm:col-span-2 lg:col-span-1"
                        >
                            <i className={`bi ${loading ? "bi-arrow-repeat animate-spin" : "bi-search"}`} aria-hidden="true" />
                            {loading ? "Consultando..." : "Consultar matrículas"}
                        </button>
                    </div>
                </form>

                {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                {warning && <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{warning}</p>}

                {student && (
                    <section aria-label="Resumen de matrículas" className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        <SummaryCard label="Solicitudes" value={enrollmentSummary.total} icon="bi-collection" tone="bg-slate-100 text-slate-700" />
                        <SummaryCard label="En proceso" value={enrollmentSummary.inProgress} icon="bi-hourglass-split" tone="bg-amber-50 text-amber-700" />
                        <SummaryCard label="Aprobadas" value={enrollmentSummary.approved} icon="bi-check-circle" tone="bg-emerald-50 text-emerald-700" />
                        <SummaryCard label="Rechazadas" value={enrollmentSummary.rejected} icon="bi-x-circle" tone="bg-rose-50 text-rose-700" />
                    </section>
                )}

                {loading && (
                    <div role="status" className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-600 shadow-sm">
                        <i className="bi bi-arrow-repeat animate-spin text-xl text-sky-700" aria-hidden="true" />
                        Consultando el registro y sus matrículas...
                    </div>
                )}

                {!loading && student && enrollments.length === 0 && (
                    <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
                        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">
                            <i className="bi bi-journal-x" aria-hidden="true" />
                        </span>
                        <h2 className="mb-2 mt-0 text-sm font-bold text-slate-900">Aún no hay matrículas registradas</h2>
                        <p className="mx-auto mb-0 max-w-lg text-sm leading-6 text-slate-500">
                            Encontramos el perfil del estudiante, pero todavía no hay solicitudes asociadas a este documento.
                        </p>
                    </section>
                )}

                {!loading && !student && !error && (
                    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center sm:px-10">
                        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-500">
                            <i className="bi bi-card-list" aria-hidden="true" />
                        </span>
                        <h2 className="mb-2 mt-0 text-sm font-bold text-slate-900">Tus solicitudes aparecerán aquí</h2>
                        <p className="mx-auto mb-0 max-w-lg text-sm leading-6 text-slate-500">
                            Consulta con el tipo y número de documento del estudiante para ver sus matrículas y el estado de cada una.
                        </p>
                    </section>
                )}

                <div className="space-y-6">
                    {enrollments.map((enrollment) => {
                        const institutionName = getInstitutionName(enrollment);
                        const status = normalizeStatus(enrollment.status);
                        const approved = isApproved(enrollment.status);
                        const progressStep = getProgressStep(enrollment);
                        const moduleList = getModulesForEnrollment(enrollment);
                        const enrollmentDocuments = getDocumentsForEnrollment(enrollment);
                        const campus = enrollment.campuse
                            || enrollment.campus
                            || campusesById.get(String(getEnrollmentCampusId(enrollment)));
                        const rejected = status === "Rechazado";

                        return (
                            <article key={enrollment.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                <header className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                    <div className="flex min-w-0 items-center gap-4">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-xl text-sky-700">
                                            <i className="bi bi-building-check" aria-hidden="true" />
                                        </span>
                                        <div className="min-w-0">
                                            <h2 className="mb-1 mt-0 truncate text-sm font-semibold text-slate-900">{institutionName}</h2>
                                            <p className="mb-0 text-sm text-slate-500">
                                                Código <span className="font-semibold text-slate-700">{enrollment.enrollment_code || `#${enrollment.id}`}</span>
                                                {campus?.name ? ` · ${campus.name}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold ${getStatusClasses(status)}`}>
                                        <i className={`bi ${approved ? "bi-check-circle-fill" : rejected ? "bi-x-circle-fill" : status === "En revisión" ? "bi-search" : "bi-hourglass-split"}`} aria-hidden="true" />
                                        {status}
                                    </span>
                                </header>

                                <div className="p-5 sm:p-6">
                                    <dl className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                <i className="bi bi-calendar3 text-sky-700" aria-hidden="true" />
                                                Fecha de solicitud
                                            </dt>
                                            <dd className="mb-0 mt-2 text-sm font-bold text-slate-800">{formatDate(enrollment.enrollment_date)}</dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                <i className="bi bi-geo-alt text-sky-700" aria-hidden="true" />
                                                Sede
                                            </dt>
                                            <dd className="mb-0 mt-2 text-sm font-bold text-slate-800">{campus?.name || "No especificada"}</dd>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                <i className="bi bi-sun text-sky-700" aria-hidden="true" />
                                                Jornada
                                            </dt>
                                            <dd className="mb-0 mt-2 text-sm font-bold text-slate-800">{enrollment.shift || "No especificada"}</dd>
                                        </div>
                                    </dl>

                                    <section className="mb-6">
                                        <h3 className="mb-3 mt-0 flex items-center gap-2 text-sm font-bold text-slate-900">
                                            <i className="bi bi-layers text-sky-700" aria-hidden="true" />
                                            Módulos inscritos
                                        </h3>
                                    {moduleList.length ? (
                                            <div className="flex flex-wrap gap-2">
                                            {moduleList.map((module) => (
                                                    <span key={module.id} className="rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-sm font-semibold text-sky-900">
                                                    {module.name_module}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                            <p className="mb-0 text-sm text-slate-500">No hay módulos vinculados a esta matrícula.</p>
                                    )}
                                    </section>

                                    <section className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5">
                                        <div className="mb-5 flex items-center justify-between gap-3">
                                            <h3 className="m-0 flex items-center gap-2 text-sm font-bold text-slate-900">
                                                <i className="bi bi-activity text-sky-700" aria-hidden="true" />
                                                Avance del proceso
                                            </h3>
                                            <span className="text-xs font-medium text-slate-500">{enrollment.reviewed_at ? `Revisada ${formatDate(enrollment.reviewed_at)}` : "Pendiente de revisión"}</span>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-[12.5%] right-[12.5%] top-4 h-0.5 bg-slate-100" />
                                            <div
                                                className={`absolute left-[12.5%] top-4 h-0.5 ${rejected ? "bg-rose-400" : approved ? "bg-emerald-500" : "bg-sky-500"}`}
                                                style={{ width: `${((progressStep - 1) / 3) * 75}%` }}
                                            />
                                            <div className="relative grid grid-cols-4 gap-1">
                                        {steps.map((step, index) => {
                                            const stepNumber = index + 1;
                                                    const completed = stepNumber < progressStep || (approved && stepNumber === progressStep);
                                                    const active = stepNumber === progressStep && !approved && !rejected;
                                                    const rejectedStep = rejected && stepNumber === progressStep;
                                            return (
                                                <div key={step} className="flex flex-1 flex-col items-center text-center">
                                                            <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${completed ? "bg-emerald-500 text-white" : active ? "bg-sky-600 text-white shadow-lg shadow-sky-200" : rejectedStep ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                                                {completed ? <i className="bi bi-check-lg" aria-hidden="true" /> : rejectedStep ? <i className="bi bi-x-lg" aria-hidden="true" /> : stepNumber}
                                                    </span>
                                                            <span className={`text-center text-[11px] font-semibold leading-4 sm:text-xs ${completed || active || rejectedStep ? "text-slate-700" : "text-slate-400"}`}>
                                                                {rejectedStep ? "Respuesta" : step}
                                                            </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                        </div>
                                    {enrollment.rejection_reason && (
                                            <p className="mb-0 mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                                                <strong>Motivo de rechazo:</strong> {enrollment.rejection_reason}
                                        </p>
                                    )}
                                </section>

                                    <footer className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedEnrollment(enrollment)}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                                    >
                                        <i className="bi bi-eye" aria-hidden="true" />
                                            Ver detalles
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDownload(enrollment)}
                                        disabled={!approved || downloadingId === enrollment.id}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                                    >
                                        <i className={`bi ${approved ? "bi-file-earmark-pdf" : "bi-file-earmark-lock"}`} aria-hidden="true" />
                                            {downloadingId === enrollment.id ? "Generando..." : approved ? "Descargar comprobante" : "Disponible al aprobarse"}
                                    </button>
                                </footer>
                                </div>

                                {selectedEnrollment?.id === enrollment.id && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                                        onClick={(event) => {
                                            if (event.target === event.currentTarget) setSelectedEnrollment(null);
                                        }}
                                    >
                                        <section role="dialog" aria-modal="true" aria-labelledby={`matricula-title-${enrollment.id}`} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/60 bg-white p-6 shadow-2xl sm:p-8">
                                            <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                                <div>
                                                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-sky-700">Solicitud {enrollment.enrollment_code || `#${enrollment.id}`}</p>
                                                    <h2 id={`matricula-title-${enrollment.id}`} className="m-0 text-base font-bold text-slate-900">Detalle de matrícula</h2>
                                                    <p className="mb-0 mt-1 text-sm text-slate-500">{institutionName}</p>
                                                </div>
                                                <button type="button" onClick={() => setSelectedEnrollment(null)} aria-label="Cerrar detalles" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                                                    <i className="bi bi-x-lg" aria-hidden="true" />
                                                </button>
                                            </div>
                                            <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Estado</dt><dd className="mb-0 mt-1"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusClasses(status)}`}>{status}</span></dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Fecha de solicitud</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{formatDate(enrollment.enrollment_date)}</dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Fecha de revisión</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{enrollment.reviewed_at ? formatDate(enrollment.reviewed_at) : "Pendiente"}</dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Sede</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{campus?.name || "No especificada"}</dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Jornada</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{enrollment.shift || "No especificada"}</dd></div>
                                            </dl>
                                            <h3 className="mb-3 mt-6 text-sm font-bold text-[#153051]">Documentos de matrícula</h3>
                                            {enrollmentDocuments.length ? (
                                                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                                    {enrollmentDocuments.map((item) => (
                                                        <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm">
                                                            <span className="text-slate-700">
                                                                {item.requirement_type?.name
                                                                    || item.requirementType?.name
                                                                    || item.requirement__type?.name
                                                                    || requirementTypesById.get(String(item.requirement__type_id ?? item.requirement_type_id ?? item.requirement_type?.id))?.name
                                                                    || item.title
                                                                    || "Documento"}
                                                            </span>
                                                            <span className="font-semibold text-slate-600">{item.status || "Sin estado"}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mb-0 text-sm text-slate-500">No hay documentos asociados a esta matrícula.</p>
                                            )}
                                            <h3 className="mb-3 mt-6 text-sm font-bold text-[#153051]">Módulos</h3>
                                            {moduleList.length ? (
                                                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                                    {moduleList.map((item) => <li key={item.id} className="rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">{item.name_module}</li>)}
                                                </ul>
                                            ) : (
                                                <p className="mb-0 text-sm text-slate-500">Sin módulos inscritos.</p>
                                            )}
                                        </section>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default MatriculasE;
