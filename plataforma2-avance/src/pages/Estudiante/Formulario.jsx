import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../Config/env";

const emptyStudent = {
    first_name: "",
    middle_name: "",
    last_name: "",
    second_last_name: "",
    document_type: "",
    document: "",
    birth_date: "",
    gender: "",
    address: "",
    socioeconomic_stratum: "",
    phone: "",
    email: "",
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

const documents = [
    { key: "identity", label: "Documento de identidad", accept: "image/jpeg,image/png,image/webp" },
    { key: "grades", label: "Certificado de notas o médico", accept: "image/jpeg,image/png,image/webp" },
    { key: "photo", label: "Foto del estudiante", accept: "image/jpeg,image/png,image/webp" },
];

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

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

const localDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
};

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
    const [createdEnrollmentId, setCreatedEnrollmentId] = useState(null);
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

    const handleEnrollmentChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleStudentChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({
            ...current,
            student: { ...current.student, [name]: value },
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
            if (!form.shift) throw new Error("Selecciona la jornada.");
            if (!form.terms_accepted) throw new Error("Debes aceptar la certificación de veracidad.");

            const guardianHasData = Object.values(form.guardian).some((value) => value.trim());
            if (guardianHasData) {
                const requiredGuardianFields = [
                    ["first_name", "nombre"],
                    ["last_name", "apellido"],
                    ["document_type", "tipo de documento"],
                    ["document", "número de documento"],
                    ["phone", "teléfono"],
                    ["relationship", "parentesco"],
                ];
                const missingGuardianField = requiredGuardianFields.find(([key]) => !form.guardian[key].trim());
                if (missingGuardianField) {
                    throw new Error(`Completa el ${missingGuardianField[1]} del acudiente o deja vacía toda su sección.`);
                }
            }

            let enrollmentId = createdEnrollmentId;
            if (!enrollmentId) {
                const payload = {
                    institution_id: institution.id,
                    campus_id: selectedCampus.id,
                    academic_year_id: selectedYear.id,
                    grade_level_id: selectedGrade.id,
                    shift: form.shift,
                    enrollment_date: localDate(),
                    status: "pendiente",
                    terms_accepted_at: new Date().toISOString(),
                    student: {
                        ...form.student,
                        institution_id: institution.id,
                        current_grade_level_id: selectedGrade.id,
                    },
                    guardian: guardianHasData
                        ? { ...form.guardian, is_primary: true }
                        : null,
                };

                const response = await api.post("/enrollments/store", payload);
                const enrollment = response.data?.data ?? response.data?.enrollment ?? response.data;
                enrollmentId = enrollment?.id;
                if (!enrollmentId) {
                    throw new Error("La API no devolvió el id de la matrícula; no es posible asociar los documentos.");
                }
                setCreatedEnrollmentId(enrollmentId);
            }

            const pendingDocuments = documents.filter(
                ({ key }) => files[key] && !uploadedDocumentKeys.includes(key),
            );
            const uploadResults = await Promise.allSettled(pendingDocuments.map(({ key }) => {
                const documentData = new FormData();
                documentData.append("status", "pendiente");
                documentData.append("enrollment_id", String(enrollmentId));
                documentData.append("imagen", files[key]);

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
                setError(`La matrícula #${enrollmentId} se creó, pero algunos documentos no se cargaron: ${failedUploads.join(" ")}`);
                return;
            }

            setSuccessMessage(`Solicitud de matrícula enviada correctamente. Número de registro: ${enrollmentId}.`);
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
                <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="mt-0 text-2xl font-bold text-slate-900">Selecciona una institución</h1>
                    <p className="text-slate-600">Debes iniciar la matrícula desde una institución y una de sus sedes.</p>
                    <Link to="/Colegios" className="inline-flex rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white no-underline hover:bg-sky-700">
                        Volver a instituciones
                    </Link>
                </section>
            </main>
        );
    }

    if (isLoadingCatalogs) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <div role="status" className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">
                    Cargando institución, sedes, grados y años académicos...
                </div>
            </main>
        );
    }

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sky-700">Solicitud de matrícula</p>
                    <h1 className="mb-2 mt-0 text-3xl font-bold text-slate-900">Proceso de matrícula institucional</h1>
                    <p className="mb-0 text-slate-600">
                        {institution
                            ? `${institution.name_institution}${selectedCampus ? ` · ${selectedCampus.name}` : ""}`
                            : "No se pudo cargar la institución seleccionada."}
                    </p>
                </header>

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
                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 mt-0 text-xl font-bold text-slate-900">Institución y matrícula</h2>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 mt-0 text-xl font-bold text-slate-900">Datos del estudiante</h2>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div><label className={labelClass} htmlFor="student-first-name">Primer nombre</label><input id="student-first-name" className={fieldClass} name="first_name" value={form.student.first_name} onChange={handleStudentChange} required /></div>
                            <div><label className={labelClass} htmlFor="student-middle-name">Segundo nombre</label><input id="student-middle-name" className={fieldClass} name="middle_name" value={form.student.middle_name} onChange={handleStudentChange} /></div>
                            <div><label className={labelClass} htmlFor="student-last-name">Primer apellido</label><input id="student-last-name" className={fieldClass} name="last_name" value={form.student.last_name} onChange={handleStudentChange} required /></div>
                            <div><label className={labelClass} htmlFor="student-second-last-name">Segundo apellido</label><input id="student-second-last-name" className={fieldClass} name="second_last_name" value={form.student.second_last_name} onChange={handleStudentChange} /></div>
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
                                    <option value="O">Otro</option>
                                </select>
                            </div>
                            <div><label className={labelClass} htmlFor="student-address">Dirección de residencia</label><input id="student-address" className={fieldClass} name="address" value={form.student.address} onChange={handleStudentChange} required /></div>
                            <div>
                                <label className={labelClass} htmlFor="student-stratum">Estrato socioeconómico</label>
                                <select id="student-stratum" className={fieldClass} name="socioeconomic_stratum" value={form.student.socioeconomic_stratum} onChange={handleStudentChange}>
                                    <option value="">No especificado</option>
                                    {[1, 2, 3, 4, 5, 6].map((stratum) => <option key={stratum} value={stratum}>{stratum}</option>)}
                                </select>
                            </div>
                            <div><label className={labelClass} htmlFor="student-phone">Teléfono celular</label><input id="student-phone" className={fieldClass} type="tel" name="phone" value={form.student.phone} onChange={handleStudentChange} required /></div>
                            <div><label className={labelClass} htmlFor="student-email">Correo electrónico</label><input id="student-email" className={fieldClass} type="email" name="email" value={form.student.email} onChange={handleStudentChange} required /></div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-2 mt-0 text-xl font-bold text-slate-900">Acudiente (opcional)</h2>
                        <p className="mb-5 text-sm text-slate-500">Si completas esta sección, los campos principales del acudiente serán obligatorios.</p>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-2 mt-0 text-xl font-bold text-slate-900">Documentos</h2>
                        <p className="mb-5 text-sm text-slate-500">
                            Puedes adjuntar imágenes JPG, PNG o WEBP (máximo 5 MB por archivo, según la API).
                        </p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {documents.map((document) => (
                                <div key={document.key} className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                                    <label className={labelClass} htmlFor={`document-${document.key}`}>{document.label}</label>
                                    <input
                                        id={`document-${document.key}`}
                                        className="block w-full text-sm text-slate-600"
                                        type="file"
                                        name={document.key}
                                        accept={document.accept}
                                        onChange={handleFileChange}
                                        disabled={isSubmitting || uploadedDocumentKeys.includes(document.key)}
                                    />
                                    {files[document.key] && (
                                        <p className="mb-0 mt-2 break-all text-xs text-slate-500">{files[document.key].name}</p>
                                    )}
                                    {uploadedDocumentKeys.includes(document.key) && (
                                        <p className="mb-0 mt-2 text-xs font-semibold text-emerald-700">Documento cargado</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
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
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Enviando..."
                                : createdEnrollmentId
                                    ? "Reintentar carga de documentos"
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
