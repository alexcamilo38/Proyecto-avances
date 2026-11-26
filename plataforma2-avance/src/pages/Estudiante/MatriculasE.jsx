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

const getEntity = (responseData) => (
    responseData?.data?.data
    || responseData?.data
    || responseData?.student
    || responseData
);

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const normalizeStatus = (status) => {
    const value = String(status || "").trim().toLowerCase();
    if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobado";
    if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazado";
    if (["en_revision", "en revisión", "revision", "revisión", "review"].includes(value)) return "En revisión";
    return status || "Pendiente";
};

const isApproved = (status) => normalizeStatus(status) === "Aprobado";

const getStudentId = (student) => student?.id;

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
                const groupCampusId = group?.campus_id ?? group?.campus?.id;
                const groupYearId = group?.academic_year_id ?? group?.academicYear?.id;
                const sameCampus = !enrollment.campus_id
                    || !groupCampusId
                    || String(enrollment.campus_id) === String(groupCampusId);
                const sameYear = !enrollment.academic_year_id
                    || !groupYearId
                    || String(enrollment.academic_year_id) === String(groupYearId);

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
        setDocuments([]);
        setLoading(true);

        try {
            const studentResponse = await api.get("/students/by-document", {
                params: { document: document.trim(), document_type: documentType || undefined },
            });
            const foundStudent = getEntity(studentResponse.data);
            if (!foundStudent?.id) {
                throw new Error("No encontramos un estudiante registrado con ese documento.");
            }

            const studentId = foundStudent.id;
            const requests = [
                ["enrollments", "/enrollments/list", "enrollments"],
                ["moduleEnrollments", "/module-enrollments/list", "module_enrollments"],
                ["modules", "/modules/list", "modules"],
                ["institutions", "/institutions/list", "institutions"],
                ["campuses", "/campuses/list", "campuses"],
                ["classGroups", "/class-groups/list", "class_groups"],
                ["documents", "/enrollment-documents/list", "enrollment_documents"],
            ];
            const results = await Promise.allSettled(requests.map(([, url]) => (
                api.get(url, {
                    params: url.endsWith("/list")
                        ? { student_id: studentId }
                        : undefined,
                })
            )));
            const values = {
                enrollments: [],
                moduleEnrollments: [],
                modules: [],
                institutions: [],
                campuses: [],
                classGroups: [],
                documents: [],
            };
            const warnings = [];

            results.forEach((result, index) => {
                const [key, , responseKey] = requests[index];
                if (result.status === "rejected") {
                    console.error(`Error al cargar ${key}:`, result.reason);
                    warnings.push(getErrorMessage(result.reason, `No se pudo cargar ${key}.`));
                    return;
                }

                try {
                    values[key] = getCollection(result.value.data, responseKey);
                } catch (parseError) {
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
            setDocuments(values.documents);
            setWarning(warnings.join(" "));

            if (studentEnrollments.length === 0) {
                setError("El estudiante existe, pero no tiene matrículas registradas.");
            }
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
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-100 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-7">
                    <h1 className="mb-2 mt-0 text-3xl font-semibold text-[#153051]">Seguimiento de Matrículas</h1>
                    <p className="mb-0 text-slate-600">Consulta el estado de tus solicitudes y descarga comprobantes de matrículas aprobadas.</p>
                </header>

                <form onSubmit={loadStudentEnrollments} className="mb-7 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_2fr_auto]">
                        <div>
                            <label className={labelClass} htmlFor="student-document-type">Tipo de documento</label>
                            <select
                                id="student-document-type"
                                className={fieldClass}
                                value={documentType}
                                onChange={(event) => setDocumentType(event.target.value)}
                            >
                                <option value="">Cualquier tipo</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="CC">Cédula de ciudadanía</option>
                                <option value="CE">Cédula de extranjería</option>
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
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl !bg-sky-600 px-5 py-3.5 font-bold !text-white transition hover:!bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Consultando..." : "Consultar"}
                        </button>
                    </div>
                </form>

                {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                {warning && <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{warning}</p>}

                {!loading && student && enrollments.length === 0 && !error && (
                    <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">No hay matrículas para mostrar.</div>
                )}

                <div className="space-y-6">
                    {enrollments.map((enrollment) => {
                        const institutionName = getInstitutionName(enrollment);
                        const status = normalizeStatus(enrollment.status);
                        const approved = isApproved(enrollment.status);
                        const progressStep = getProgressStep(enrollment);
                        const moduleList = getModulesForEnrollment(enrollment);
                        const enrollmentDocuments = getDocumentsForEnrollment(enrollment);
                        const campus = enrollment.campus
                            || campusesById.get(String(enrollment.campus_id));

                        return (
                            <article key={enrollment.id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                                <header className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-xl text-sky-500">
                                            <i className="bi bi-building" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <h2 className="mb-1 mt-0 text-xl font-semibold text-[#153051]">{institutionName}</h2>
                                            <p className="mb-0 text-sm text-slate-400">
                                                ID Proceso: #{enrollment.enrollment_code || enrollment.id}
                                                {campus?.name ? ` · Sede: ${campus.name}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`w-fit rounded-xl px-4 py-2 text-sm font-bold ${approved ? "bg-emerald-100 text-emerald-700" : status === "Rechazado" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                                        {status}
                                    </span>
                                </header>

                                <section className="mb-6">
                                    <h3 className="mb-3 mt-0 flex items-center gap-2 text-base font-semibold text-[#153051]">
                                        <i className="bi bi-layers text-sky-500" aria-hidden="true" />
                                        Módulos inscritos
                                    </h3>
                                    {moduleList.length ? (
                                        <div className="flex flex-wrap gap-2.5">
                                            {moduleList.map((module) => (
                                                <span key={module.id} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#153051]">
                                                    {module.name_module}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mb-0 text-sm text-slate-500">No hay módulos vinculados a esta matrícula.</p>
                                    )}
                                </section>

                                <section className="mb-6">
                                    <h3 className="mb-5 mt-0 flex items-center gap-2 text-base font-semibold text-[#153051]">
                                        <i className="bi bi-activity text-sky-500" aria-hidden="true" />
                                        Estado del proceso
                                    </h3>
                                    <div className="flex items-start justify-between gap-2">
                                        {steps.map((step, index) => {
                                            const stepNumber = index + 1;
                                            const completed = stepNumber < progressStep || (approved && stepNumber === progressStep);
                                            const active = stepNumber === progressStep && !approved;
                                            return (
                                                <div key={step} className="flex flex-1 flex-col items-center text-center">
                                                    <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${completed ? "bg-emerald-500" : active ? "bg-sky-500 shadow-lg shadow-sky-200" : "bg-slate-200 text-slate-500"}`}>
                                                        {stepNumber}
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-500">{step}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {enrollment.rejection_reason && (
                                        <p className="mb-0 mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                                            Motivo de rechazo: {enrollment.rejection_reason}
                                        </p>
                                    )}
                                </section>

                                <footer className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedEnrollment(enrollment)}
                                        className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-bold text-[#153051] transition hover:bg-slate-200"
                                    >
                                        <i className="bi bi-eye" aria-hidden="true" />
                                        Detalles
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDownload(enrollment)}
                                        disabled={!approved || downloadingId === enrollment.id}
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#153051] px-5 py-3 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                                    >
                                        <i className={`bi ${approved ? "bi-file-earmark-pdf" : "bi-file-earmark-lock"}`} aria-hidden="true" />
                                        {downloadingId === enrollment.id ? "Generando..." : approved ? "Descargar Comprobante" : "Comprobante no disponible"}
                                    </button>
                                </footer>

                                {selectedEnrollment?.id === enrollment.id && (
                                    <div
                                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                                        onClick={(event) => {
                                            if (event.target === event.currentTarget) setSelectedEnrollment(null);
                                        }}
                                    >
                                        <section role="dialog" aria-modal="true" aria-labelledby={`matricula-title-${enrollment.id}`} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                                            <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                                <div>
                                                    <h2 id={`matricula-title-${enrollment.id}`} className="m-0 text-xl font-bold text-[#153051]">Detalle de matrícula</h2>
                                                    <p className="mb-0 mt-1 text-sm text-slate-500">{institutionName}</p>
                                                </div>
                                                <button type="button" onClick={() => setSelectedEnrollment(null)} aria-label="Cerrar detalles" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                                                    <i className="bi bi-x-lg" aria-hidden="true" />
                                                </button>
                                            </div>
                                            <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Código</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{enrollment.enrollment_code || `#${enrollment.id}`}</dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Estado</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{status}</dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Fecha de solicitud</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{enrollment.enrollment_date || "No registrada"}</dd></div>
                                                <div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500">Fecha de revisión</dt><dd className="mb-0 mt-1 font-semibold text-slate-800">{enrollment.reviewed_at || "Pendiente"}</dd></div>
                                            </dl>
                                            <h3 className="mb-3 mt-6 text-sm font-bold text-[#153051]">Documentos de matrícula</h3>
                                            {enrollmentDocuments.length ? (
                                                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                                    {enrollmentDocuments.map((item) => (
                                                        <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm">
                                                            <span className="text-slate-700">{item.requirement_type?.name || item.title || "Documento"}</span>
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
