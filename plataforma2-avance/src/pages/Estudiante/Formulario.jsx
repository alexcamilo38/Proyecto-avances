import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../Config/env";
import { getCurrentUserId } from "../Auth/authUtils";

const emptyStudent = {
    document_type: "",
    document: "",
    birth_date: "",
    gender: "",
    gender_other: "",
    address: "",
    socioeconomic_stratum: "",
};

const emptyGuardian = {
    first_name: "",
    middle_name: "",
    last_name: "",
    second_last_name: "",
    document_type: "",
    document: "",
    phone: "",
    email: "",
    emergency_phone: "",
    relationship: "",
};

const formSteps = [
    { id: "enrollment-section", label: "Matrícula", icon: "bi-building-check" },
    { id: "student-section", label: "Estudiante", icon: "bi-person-vcard" },
    { id: "guardian-section", label: "Acudiente", icon: "bi-people" },
    { id: "documents-section", label: "Archivos", icon: "bi-file-earmark-arrow-up" },
    { id: "confirmation-section", label: "Enviar", icon: "bi-check2-circle" },
];

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
const sectionClass = "scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7";

const FormSectionHeading = ({ step, icon, title, description }) => (
    <div className="mb-5 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-700">
            <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-sky-700">{step}</p>
            <h2 className="mb-0 mt-0 text-lg font-bold text-slate-900">{title}</h2>
            {description && <p className="mb-0 mt-1 text-sm leading-5 text-slate-500">{description}</p>}
        </div>
    </div>
);

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

const getEntity = (responseData, key) => {
    const data = responseData?.data?.data ?? responseData?.data ?? responseData;
    if (Array.isArray(data)) return data[0] ?? null;
    return data && Object.prototype.hasOwnProperty.call(data, key) ? data[key] : data;
};

const localDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
};

const normalizeCycle = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

const isRequiredRequirement = (value) => (
    value === true || value === 1 || ["1", "true"].includes(String(value).toLowerCase())
);

const Formulario = () => {
    const [searchParams] = useSearchParams();
    const institutionId = searchParams.get("institutionId") || "";
    const initialCampusId = searchParams.get("campusId") || "";
    const [form, setForm] = useState({
        campus_id: initialCampusId,
        grade_level_id: "",
        academic_year_id: "",
        shift: "",
        student: emptyStudent,
        guardian: emptyGuardian,
        terms_accepted: false,
    });
    const [files, setFiles] = useState({});
    const [catalogResult, setCatalogResult] = useState({
        key: "",
        data: null,
        error: "",
    });
    const [reloadKey, setReloadKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [createdStudentId, setCreatedStudentId] = useState(null);
    const [createdGuardianId, setCreatedGuardianId] = useState(null);
    const [createdStudentGuardian, setCreatedStudentGuardian] = useState(false);
    const [createdEnrollmentId, setCreatedEnrollmentId] = useState(null);
    const [createdEnrollmentCode, setCreatedEnrollmentCode] = useState("");
    const [uploadedDocumentKeys, setUploadedDocumentKeys] = useState([]);
    const [submissionComplete, setSubmissionComplete] = useState(false);

    useEffect(() => {
        if (!institutionId) return undefined;

        let ignore = false;
        const requests = [
            ["institutions", api.get("/institutions/list").then((response) => getCollection(response.data, "institutions"))],
            ["campuses", api.get("/campuses/list").then((response) => getCollection(response.data, "campuses"))],
            ["gradeLevels", api.get("/grade-levels/list").then((response) => getCollection(response.data, "grade_levels"))],
            ["academicYears", api.get("/academic-years/list").then((response) => getCollection(response.data, "academic_years"))],
            ["requirementTypes", api.get("/requirement-types/list").then((response) => getCollection(response.data, "requirement_types"))],
        ];

        Promise.allSettled(requests.map(([, request]) => request)).then((results) => {
            if (ignore) return;

            const data = {};
            const errors = [];
            results.forEach((result, index) => {
                const [key] = requests[index];
                if (result.status === "fulfilled") {
                    data[key] = result.value;
                } else {
                    console.error(`Error al cargar ${key}:`, result.reason);
                    errors.push(getErrorMessage(result.reason, `No se pudo cargar ${key}.`));
                }
            });

            setCatalogResult({
                key: institutionId,
                data,
                error: errors.join(" "),
            });
        });

        return () => {
            ignore = true;
        };
    }, [institutionId, reloadKey]);

    const isLoadingCatalogs = Boolean(institutionId) && catalogResult.key !== institutionId;
    const catalog = catalogResult.key === institutionId ? catalogResult.data : null;
    const institution = catalog?.institutions?.find((item) => String(item.id) === institutionId);
    const belongsToInstitution = (item) => (
        String(item.institution_id ?? item.institution?.id) === institutionId
    );
    const campuses = (catalog?.campuses || []).filter(belongsToInstitution);
    const gradeLevels = (catalog?.gradeLevels || [])
        .filter(belongsToInstitution)
        .sort((first, second) => (first.sort_order || 0) - (second.sort_order || 0));
    const academicYears = (catalog?.academicYears || []).filter(belongsToInstitution);
    const selectedCampus = campuses.find(
        (campus) => String(campus.id) === String(form.campus_id),
    ) || campuses.find(
        (campus) => String(campus.id) === initialCampusId,
    ) || (campuses.length === 1 ? campuses[0] : null);
    const selectedGrade = gradeLevels.find(
        (grade) => String(grade.id) === String(form.grade_level_id),
    );
    const selectedYear = academicYears.find(
        (year) => String(year.id) === String(form.academic_year_id),
    );
    const requirementTypes = catalog?.requirementTypes;
    const selectedCycle = normalizeCycle(selectedGrade?.cycle);
    const documents = (requirementTypes || [])
        .filter((requirement) => {
            const requirementInstitutionId = requirement.institution_id ?? requirement.institution?.id;
            const belongsToSelectedInstitution = requirementInstitutionId === null
                || requirementInstitutionId === undefined
                || String(requirementInstitutionId) === institutionId;
            const requirementCycle = normalizeCycle(requirement.applies_to_cycle);
            const appliesToAllCycles = ["*", "all", "all cycles", "todos", "todos los ciclos"].includes(requirementCycle);
            const appliesToSelectedCycle = selectedCycle
                && requirementCycle
                && (requirementCycle === selectedCycle
                    || requirementCycle.includes(selectedCycle)
                    || selectedCycle.includes(requirementCycle));

            return Boolean(selectedGrade)
                && belongsToSelectedInstitution
                && (appliesToAllCycles || appliesToSelectedCycle);
        })
        .map((requirement) => ({
            ...requirement,
            key: String(requirement.id),
            label: requirement.name,
            required: isRequiredRequirement(requirement.is_required),
            accept: "image/jpeg,image/png,image/webp",
        }));
    const isStudentLocked = Boolean(createdStudentId) || submissionComplete;
    const isGuardianLocked = Boolean(createdGuardianId || createdStudentGuardian) || submissionComplete;
    const isEnrollmentLocked = Boolean(createdEnrollmentId) || submissionComplete;

    const handleEnrollmentChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleStudentChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            student: {
                ...current.student,
                [name]: value,
                ...(name === "gender" && value !== "Otro" ? { gender_other: "" } : {}),
            },
        }));
    };

    const handleGuardianChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            guardian: { ...current.guardian, [name]: value },
        }));
    };

    const handleFileChange = (event) => {
        const { name, files: selectedFiles } = event.target;
        setFiles((current) => ({ ...current, [name]: selectedFiles?.[0] || null }));
    };

    const retryCatalogs = () => {
        setCatalogResult({ key: "", data: null, error: "" });
        setReloadKey((current) => current + 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsSubmitting(true);

        try {
            if (!institution) throw new Error("No se encontró la institución seleccionada.");
            if (!selectedCampus) throw new Error("Selecciona una sede válida de esta institución.");
            if (!selectedGrade) throw new Error("Selecciona un grado válido de esta institución.");
            if (!selectedYear) throw new Error("Selecciona un año académico válido de esta institución.");
            if (!Array.isArray(requirementTypes)) {
                throw new Error("No se pudieron cargar los requisitos documentales. Reintenta la carga antes de enviar la matrícula.");
            }
            if (!form.shift) throw new Error("Selecciona la jornada.");
            if (!form.terms_accepted) throw new Error("Debes aceptar la certificación de veracidad.");
            if (!form.student.document.trim()) throw new Error("Ingresa el documento asociado a tu cuenta.");
            if (!form.student.document_type) throw new Error("Selecciona el tipo de documento del estudiante.");
            if (!form.student.socioeconomic_stratum) throw new Error("Selecciona el estrato socioeconómico.");
            if (form.student.gender === "Otro" && !form.student.gender_other.trim()) {
                throw new Error("Especifica el género del estudiante.");
            }
            const missingRequiredDocument = documents.find(
                (document) => document.required
                    && !files[document.key]
                    && !uploadedDocumentKeys.includes(document.key),
            );
            if (missingRequiredDocument) {
                throw new Error(`Adjunta el documento obligatorio: ${missingRequiredDocument.label}.`);
            }

            const currentUserId = getCurrentUserId();
            if (!currentUserId || !Number.isInteger(Number(currentUserId)) || Number(currentUserId) <= 0) {
                throw new Error("No se encontró la cuenta del estudiante. Inicia sesión nuevamente.");
            }

            const guardianHasData = Object.values(form.guardian).some((value) => value.trim());
            if (guardianHasData) {
                const requiredGuardianFields = [
                    ["first_name", "nombre"],
                    ["last_name", "apellido"],
                    ["document_type", "tipo de documento"],
                    ["document", "número de documento"],
                    ["phone", "teléfono"],
                    ["email", "correo electrónico"],
                    ["emergency_phone", "teléfono de emergencia"],
                    ["relationship", "parentesco"],
                ];
                const missingGuardianField = requiredGuardianFields.find(([key]) => !form.guardian[key].trim());
                if (missingGuardianField) {
                    throw new Error(`Completa el ${missingGuardianField[1]} del acudiente o deja vacía toda su sección.`);
                }
            }

            let studentId = createdStudentId;
            let guardianId = createdGuardianId;
            let studentGuardianCreated = createdStudentGuardian;
            let enrollmentId = createdEnrollmentId;
            let enrollmentCode = createdEnrollmentCode;

            if (!studentId) {
                let existingStudent = null;
                try {
                    const studentResponse = await api.get("/students/by-document", {
                        params: {
                            document: form.student.document.trim(),
                            document_type: form.student.document_type,
                        },
                    });
                    existingStudent = getEntity(studentResponse.data, "student");
                } catch (lookupError) {
                    if (lookupError.response?.status !== 404) throw lookupError;
                }

                if (existingStudent) {
                    const linkedUserId = existingStudent.user_system_id ?? existingStudent.user_system?.id;
                    if (!existingStudent.id) {
                        throw new Error("La API devolvió un estudiante sin identificador.");
                    }
                    if (String(linkedUserId) !== String(currentUserId)) {
                        throw new Error("El documento ya está asociado a otro usuario. Verifica los datos ingresados.");
                    }
                    studentId = existingStudent.id;
                } else {
                    const studentPayload = {
                        birth_date: form.student.birth_date,
                        gender: form.student.gender === "Otro"
                            ? form.student.gender_other.trim()
                            : form.student.gender,
                        address: form.student.address.trim(),
                        socieconomic_stratum: Number(form.student.socioeconomic_stratum),
                        user_system_id: Number(currentUserId),
                        institution_id: null,
                        grade_level_id: null,
                        class__group_id: null,
                        guardian_id: null,
                    };
                    const studentResponse = await api.post("/students/store", studentPayload);
                    const student = getEntity(studentResponse.data, "student");
                    studentId = student?.id;
                    if (!studentId) {
                        throw new Error("La API no devolvió el id del estudiante.");
                    }
                }

                setCreatedStudentId(studentId);
            }

            if (guardianHasData && !guardianId) {
                const guardianPayload = {
                    first_name: form.guardian.first_name.trim(),
                    middle_name: form.guardian.middle_name.trim() || null,
                    last_name: form.guardian.last_name.trim(),
                    second_last_name: form.guardian.second_last_name.trim() || null,
                    document: form.guardian.document.trim(),
                    phone: form.guardian.phone.trim(),
                    email: form.guardian.email.trim(),
                    document_type: form.guardian.document_type,
                    emergency_phone: form.guardian.emergency_phone.trim(),
                };
                const guardianResponse = await api.post("/guardians/store", guardianPayload);
                const guardian = getEntity(guardianResponse.data, "guardian");
                guardianId = guardian?.id;
                if (!guardianId) {
                    throw new Error("La API no devolvió el id del acudiente.");
                }
                setCreatedGuardianId(guardianId);
            }

            if (guardianHasData && !studentGuardianCreated) {
                await api.post("/student-guardians/store", {
                    relationship: form.guardian.relationship.trim(),
                    is_primary: "1",
                    student_id: Number(studentId),
                    guardian_id: Number(guardianId),
                });
                studentGuardianCreated = true;
                setCreatedStudentGuardian(true);
            }

            if (!enrollmentId) {
                const payload = {
                    institution_id: Number(institution.id),
                    campuse_id: Number(selectedCampus.id),
                    academic__year_id: Number(selectedYear.id),
                    grade_level_id: Number(selectedGrade.id),
                    student_id: Number(studentId),
                    shift: form.shift,
                    enrollment_date: localDate(),
                    status: "pendiente",
                    reviewed_at: null,
                    rejection_reason: null,
                };

                const response = await api.post("/enrollments/store", payload);
                const enrollment = getEntity(response.data, "enrollment");
                enrollmentId = enrollment?.id;
                if (!enrollmentId) {
                    throw new Error("La API no devolvió el id de la matrícula; no es posible asociar los documentos.");
                }
                enrollmentCode = enrollment?.enrollment_code || "";
                setCreatedEnrollmentId(enrollmentId);
                setCreatedEnrollmentCode(enrollmentCode);
            }

            const pendingDocuments = documents.filter(
                ({ key }) => files[key] && !uploadedDocumentKeys.includes(key),
            );
            const uploadResults = await Promise.allSettled(pendingDocuments.map((document) => {
                const documentData = new FormData();
                documentData.append("status", "pendiente");
                documentData.append("enrollment_id", String(enrollmentId));
                documentData.append("requirement__type_id", String(document.id));
                documentData.append("imagen", files[document.key]);

                return api.post("/enrollment-documents/store", documentData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }));

            const uploadedKeys = [];
            const failedUploads = [];
            uploadResults.forEach((result, index) => {
                const document = pendingDocuments[index];
                if (result.status === "fulfilled") {
                    uploadedKeys.push(document.key);
                } else {
                    console.error(`Error al subir ${document.label}:`, result.reason);
                    failedUploads.push(`${document.label}: ${getErrorMessage(result.reason, "falló la carga.")}`);
                }
            });

            const nextUploadedKeys = [...uploadedDocumentKeys, ...uploadedKeys];
            setUploadedDocumentKeys(nextUploadedKeys);

            if (failedUploads.length > 0) {
                setError(`La matrícula ${enrollmentCode || `#${enrollmentId}`} se creó, pero algunos documentos no se cargaron: ${failedUploads.join(" ")}`);
                return;
            }

            setSuccessMessage(`Solicitud de matrícula enviada correctamente. Número de registro: ${enrollmentCode || enrollmentId}.`);
            setSubmissionComplete(true);
        } catch (submitError) {
            console.error("Error al enviar la matrícula:", submitError);
            setError(getErrorMessage(submitError, "No se pudo enviar la solicitud de matrícula."));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!institutionId) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">
                        <i className="bi bi-building-check" aria-hidden="true" />
                    </span>
                    <h1 className="mb-2 mt-0 text-2xl font-bold text-slate-900">Selecciona una institución</h1>
                    <p className="mx-auto mb-6 max-w-lg text-sm leading-6 text-slate-600">Debes iniciar la matrícula desde una institución y una de sus sedes.</p>
                    <Link to="/Colegios" className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white no-underline transition hover:bg-sky-800">
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                        Volver a instituciones
                    </Link>
                </section>
            </main>
        );
    }

    if (isLoadingCatalogs) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <div role="status" className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
                    <i className="bi bi-arrow-repeat mb-3 block animate-spin text-2xl text-sky-600" aria-hidden="true" />
                    Cargando institución, sedes, grados, requisitos y años académicos...
                </div>
            </main>
        );
    }

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
            <div className="mx-auto max-w-5xl">
                <header className="mb-5 flex flex-col gap-5 rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="min-w-0">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                            <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                            Proceso de matrícula
                        </span>
                        <h1 className="mb-2 mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Completa tu solicitud</h1>
                        <p className="mb-0 text-sm text-slate-300">
                            {institution
                                ? `${institution.name_institution}${selectedCampus ? ` · ${selectedCampus.name}` : ""}`
                                : "No se pudo cargar la institución seleccionada."}
                        </p>
                    </div>
                    {institution?.logo_url ? (
                        <img
                            src={institution.logo_url}
                            alt={`Logo de ${institution.name_institution}`}
                            className="h-14 w-14 shrink-0 rounded-2xl border border-white/15 bg-white object-contain p-1.5"
                        />
                    ) : (
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl text-sky-200">
                            <i className="bi bi-building-check" aria-hidden="true" />
                        </span>
                    )}
                </header>

                <nav aria-label="Secciones del formulario" className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {formSteps.map((step, index) => (
                        <a
                            key={step.id}
                            href={`#${step.id}`}
                            className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 no-underline transition hover:border-sky-300 hover:bg-sky-50"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                                <i className={`bi ${step.icon}`} aria-hidden="true" />
                            </span>
                            <span className="truncate">{index + 1}. {step.label}</span>
                        </a>
                    ))}
                </nav>

                {catalogResult.error && (
                    <div role="alert" className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        <span>{catalogResult.error}</span>
                        <button type="button" onClick={retryCatalogs} className="shrink-0 font-semibold underline">Reintentar</button>
                    </div>
                )}
                {!institution && (
                    <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        No se encontró la institución seleccionada. Regresa al listado y selecciona otra.
                    </p>
                )}
                {institution && campuses.length === 0 && (
                    <p role="alert" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        Esta institución no tiene sedes registradas. No se puede enviar la matrícula hasta que se agregue una sede.
                    </p>
                )}
                {error && <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                {successMessage && <p role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <section id="enrollment-section" className={sectionClass}>
                        <FormSectionHeading
                            step="Paso 1"
                            icon="bi-building-check"
                            title="Institución y matrícula"
                            description="Confirma la sede y el nivel al que quieres ingresar."
                        />
                        <fieldset disabled={isSubmitting || isEnrollmentLocked} className="m-0 grid min-w-0 grid-cols-1 gap-5 border-0 p-0 md:grid-cols-2">
                            <div>
                                <label className={labelClass} htmlFor="campus-id">Sede</label>
                                <select id="campus-id" className={fieldClass} name="campus_id" value={selectedCampus ? String(selectedCampus.id) : ""} onChange={handleEnrollmentChange} required>
                                    <option value="">Selecciona una sede</option>
                                    {campuses.map((campus) => (
                                        <option key={campus.id} value={String(campus.id)}>
                                            {campus.name}{campus.is_main ? " (Principal)" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="grade-level-id">Grado al que aspira</label>
                                <select id="grade-level-id" className={fieldClass} name="grade_level_id" value={form.grade_level_id} onChange={handleEnrollmentChange} required>
                                    <option value="">Selecciona un grado</option>
                                    {gradeLevels.map((grade) => <option key={grade.id} value={grade.id}>{grade.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="academic-year-id">Año académico</label>
                                <select id="academic-year-id" className={fieldClass} name="academic_year_id" value={form.academic_year_id} onChange={handleEnrollmentChange} required>
                                    <option value="">Selecciona un año</option>
                                    {academicYears.map((year) => (
                                        <option key={year.id} value={String(year.id)}>
                                            {year.name}{year.is_current ? " (Actual)" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="shift">Jornada</label>
                                <select id="shift" className={fieldClass} name="shift" value={form.shift} onChange={handleEnrollmentChange} required>
                                    <option value="">Selecciona una jornada</option>
                                    <option value="Mañana">Mañana</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Única">Única</option>
                                </select>
                            </div>
                        </fieldset>
                    </section>

                    <section id="student-section" className={sectionClass}>
                        <FormSectionHeading
                            step="Paso 2"
                            icon="bi-person-vcard"
                            title="Datos del estudiante"
                            description="Los datos de identidad y contacto se vinculan desde la cuenta con la que iniciaste sesión."
                        />
                        <p className="mb-5 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm leading-5 text-sky-900">
                            Escribe el documento asociado a tu cuenta para comprobar si ya existe un registro de estudiante. Tus nombres, correo y teléfono se toman de esa cuenta.
                        </p>
                        <fieldset disabled={isSubmitting || isStudentLocked} className="m-0 grid min-w-0 grid-cols-1 gap-5 border-0 p-0 md:grid-cols-2">
                            <div>
                                <label className={labelClass} htmlFor="student-document-type">Tipo de documento</label>
                                <select id="student-document-type" className={fieldClass} name="document_type" value={form.student.document_type} onChange={handleStudentChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="TI">Tarjeta de identidad</option>
                                    <option value="CC">Cédula de ciudadanía</option>
                                    <option value="CE">Cédula de extranjería</option>
                                </select>
                            </div>
                            <div><label className={labelClass} htmlFor="student-document">Número de documento</label><input id="student-document" className={fieldClass} type="text" name="document" value={form.student.document} onChange={handleStudentChange} required /></div>
                            <div><label className={labelClass} htmlFor="student-birth-date">Fecha de nacimiento</label><input id="student-birth-date" className={fieldClass} type="date" name="birth_date" value={form.student.birth_date} onChange={handleStudentChange} required /></div>
                            <div>
                                <label className={labelClass} htmlFor="student-gender">Género</label>
                                <select id="student-gender" className={fieldClass} name="gender" value={form.student.gender} onChange={handleStudentChange} required>
                                    <option value="">Selecciona...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            {form.student.gender === "Otro" && (
                                <div>
                                    <label className={labelClass} htmlFor="student-gender-other">Especifica el género</label>
                                    <input
                                        id="student-gender-other"
                                        className={fieldClass}
                                        name="gender_other"
                                        value={form.student.gender_other}
                                        onChange={handleStudentChange}
                                        required
                                    />
                                </div>
                            )}
                            <div><label className={labelClass} htmlFor="student-address">Dirección de residencia</label><input id="student-address" className={fieldClass} name="address" value={form.student.address} onChange={handleStudentChange} required /></div>
                            <div>
                                <label className={labelClass} htmlFor="student-stratum">Estrato socioeconómico</label>
                                <select id="student-stratum" className={fieldClass} name="socioeconomic_stratum" value={form.student.socioeconomic_stratum} onChange={handleStudentChange} required>
                                    <option value="">No especificado</option>
                                    {[1, 2, 3, 4, 5, 6].map((stratum) => <option key={stratum} value={stratum}>{stratum}</option>)}
                                </select>
                            </div>
                        </fieldset>
                    </section>

                    <section id="guardian-section" className={sectionClass}>
                        <FormSectionHeading
                            step="Paso 3 · Opcional"
                            icon="bi-people"
                            title="Datos del acudiente"
                            description="Si completas esta sección, los campos principales del acudiente serán obligatorios."
                        />
                        <fieldset disabled={isSubmitting || isGuardianLocked} className="m-0 grid min-w-0 grid-cols-1 gap-5 border-0 p-0 md:grid-cols-2">
                            <div><label className={labelClass} htmlFor="guardian-first-name">Primer nombre</label><input id="guardian-first-name" className={fieldClass} name="first_name" value={form.guardian.first_name} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-middle-name">Segundo nombre</label><input id="guardian-middle-name" className={fieldClass} name="middle_name" value={form.guardian.middle_name} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-last-name">Primer apellido</label><input id="guardian-last-name" className={fieldClass} name="last_name" value={form.guardian.last_name} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-second-last-name">Segundo apellido</label><input id="guardian-second-last-name" className={fieldClass} name="second_last_name" value={form.guardian.second_last_name} onChange={handleGuardianChange} /></div>
                            <div>
                                <label className={labelClass} htmlFor="guardian-document-type">Tipo de documento</label>
                                <select id="guardian-document-type" className={fieldClass} name="document_type" value={form.guardian.document_type} onChange={handleGuardianChange}>
                                    <option value="">Selecciona...</option>
                                    <option value="CC">Cédula de ciudadanía</option>
                                    <option value="CE">Cédula de extranjería</option>
                                    <option value="TI">Tarjeta de identidad</option>
                                </select>
                            </div>
                            <div><label className={labelClass} htmlFor="guardian-document">Número de documento</label><input id="guardian-document" className={fieldClass} name="document" value={form.guardian.document} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-phone">Teléfono</label><input id="guardian-phone" className={fieldClass} type="tel" name="phone" value={form.guardian.phone} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-email">Correo</label><input id="guardian-email" className={fieldClass} type="email" name="email" value={form.guardian.email} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-emergency-phone">Teléfono de emergencia</label><input id="guardian-emergency-phone" className={fieldClass} type="tel" name="emergency_phone" value={form.guardian.emergency_phone} onChange={handleGuardianChange} /></div>
                            <div><label className={labelClass} htmlFor="guardian-relationship">Parentesco</label><input id="guardian-relationship" className={fieldClass} name="relationship" value={form.guardian.relationship} onChange={handleGuardianChange} /></div>
                        </fieldset>
                    </section>

                    <section id="documents-section" className={sectionClass}>
                        <FormSectionHeading
                            step="Paso 4"
                            icon="bi-file-earmark-arrow-up"
                            title="Documentos"
                            description="Adjunta los documentos solicitados para el ciclo del grado elegido. Los requisitos obligatorios deben cargarse."
                        />
                        {selectedGrade && !Array.isArray(requirementTypes) && (
                            <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                No se pudieron cargar los requisitos documentales. Reintenta la carga antes de continuar.
                            </p>
                        )}
                        {selectedGrade && Array.isArray(requirementTypes) && documents.length === 0 && (
                            <p role="status" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                                No hay requisitos documentales configurados para el ciclo {selectedGrade.cycle || "seleccionado"}.
                            </p>
                        )}
                        {!selectedGrade && (
                            <p className="mb-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                Selecciona un grado para consultar los requisitos documentales de su ciclo.
                            </p>
                        )}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {documents.map((document) => (
                                <div key={document.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-300">
                                    <div className="mb-2 flex items-start justify-between gap-3">
                                        <label className={`${labelClass} mb-0`} htmlFor={`document-${document.key}`}>{document.label}</label>
                                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${document.required ? "bg-rose-50 text-rose-700" : "bg-slate-200 text-slate-600"}`}>
                                            {document.required ? "Obligatorio" : "Opcional"}
                                        </span>
                                    </div>
                                    <input
                                        id={`document-${document.key}`}
                                        className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-sky-800 hover:file:bg-sky-200"
                                        type="file"
                                        name={document.key}
                                        accept={document.accept}
                                        onChange={handleFileChange}
                                        disabled={isSubmitting || uploadedDocumentKeys.includes(document.key)}
                                        required={document.required && !uploadedDocumentKeys.includes(document.key)}
                                    />
                                    {files[document.key] && (
                                        <p className="mb-0 mt-2 break-all text-xs text-slate-500">{files[document.key].name}</p>
                                    )}
                                    {uploadedDocumentKeys.includes(document.key) && (
                                        <p className="mb-0 mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                            Documento cargado
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="confirmation-section" className={`${sectionClass} border-sky-200`}>
                        <FormSectionHeading
                            step="Paso 5"
                            icon="bi-check2-circle"
                            title="Revisa y envía"
                            description="Confirma que los datos sean correctos antes de enviar la solicitud."
                        />
                        <label className="flex items-start gap-3 text-sm text-slate-700">
                            <input
                                type="checkbox"
                                checked={form.terms_accepted}
                                onChange={(event) => setForm((current) => ({ ...current, terms_accepted: event.target.checked }))}
                                required
                                disabled={submissionComplete}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                            />
                            Certifico que la información ingresada es verídica y autorizo su uso para gestionar esta solicitud.
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting || submissionComplete || !institution || campuses.length === 0}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-4 font-bold text-white shadow-sm transition hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none"
                        >
                            {isSubmitting
                                ? "Enviando..."
                                : createdEnrollmentId
                                    ? "Reintentar carga de documentos"
                                    : createdStudentId || createdGuardianId
                                        ? "Reanudar envío de solicitud"
                                    : "Finalizar y enviar solicitud"}
                            <i className="bi bi-send-fill" aria-hidden="true" />
                        </button>
                    </section>
                </form>
            </div>
        </main>
    );
};

export default Formulario;
