import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const PostularmeM = () => {
    const { state } = useLocation();
    const module = state?.modulo || null;
    const moduleId = module?.id ?? module?.module_id ?? "";
    const [documentType, setDocumentType] = useState("");
    const [document, setDocument] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!moduleId) {
            setError("No se recibió el módulo. Regresa al catálogo y selecciónalo nuevamente.");
            return;
        }
        if (!accepted) {
            setError("Debes confirmar que eres el titular del documento.");
            return;
        }
        if (module?.is_published === false || module?.is_published === 0 || module?.is_published === "0") {
            setError("Este módulo no está publicado.");
            return;
        }
        if (module?.allow_self_enrollment === false || module?.allow_self_enrollment === 0 || module?.allow_self_enrollment === "0") {
            setError("Este módulo no permite autoinscripción.");
            return;
        }
        if (Number.isFinite(Number(module?.cupos)) && Number(module.cupos) <= 0) {
            setError("Este módulo no tiene cupos disponibles.");
            return;
        }

        const now = new Date();
        if (module?.enrollment_opens_at && now < new Date(module.enrollment_opens_at)) {
            setError("El periodo de inscripción todavía no ha abierto.");
            return;
        }
        if (module?.enrollment_closes_at && now > new Date(module.enrollment_closes_at)) {
            setError("El periodo de inscripción ya cerró.");
            return;
        }

        setSubmitting(true);
        try {
            const [studentResponse, enrollmentsResponse] = await Promise.all([
                api.get("/students/by-document", {
                    params: { document: document.trim(), document_type: documentType || undefined },
                }),
                api.get("/module-enrollments/list", { params: { module_id: moduleId } }),
            ]);
            const moduleEnrollments = getCollection(enrollmentsResponse.data, "module_enrollments");
            const student = getEntity(studentResponse.data);

            if (!student?.id) {
                throw new Error("No encontramos un estudiante registrado con ese documento y tipo.");
            }

            const alreadyEnrolled = moduleEnrollments.some((enrollment) => (
                String(enrollment.module_id ?? enrollment.module?.id) === String(moduleId)
                && String(enrollment.student_id ?? enrollment.student?.id) === String(student.id)
                && !["cancelado", "cancelada", "rechazado", "retirado"].includes(String(enrollment.status || "").toLowerCase())
            ));
            if (alreadyEnrolled) {
                throw new Error("Este estudiante ya está inscrito o tiene una postulación activa para el módulo.");
            }

            await api.post("/module-enrollments/store", {
                module_id: Number(moduleId),
                student_id: Number(student.id),
                status: "inscrito",
            });

            setSuccess(`Postulación registrada para ${module.nombre || "el módulo seleccionado"}.`);
        } catch (submitError) {
            console.error("Error al registrar la postulación:", submitError);
            setError(getErrorMessage(submitError, "No se pudo registrar la postulación."));
        } finally {
            setSubmitting(false);
        }
    };

    if (!module) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-100 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
                <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="mt-0 text-2xl font-bold text-slate-900">Selecciona un módulo</h1>
                    <p className="text-slate-600">Debes iniciar la postulación desde el catálogo de módulos.</p>
                    <Link to="/ModulosAcademicos" className="font-semibold text-sky-700">Volver al catálogo</Link>
                </section>
            </main>
        );
    }

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-100 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-3xl">
                <header className="mb-6">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wide text-sky-700">Postulación al módulo</p>
                    <h1 className="mb-2 mt-0 text-3xl font-bold text-slate-900">{module.nombre}</h1>
                    <p className="mb-0 text-slate-600">Ingresa el documento del estudiante que ya está registrado en la institución.</p>
                </header>

                {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                {success && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-5 mt-0 text-xl font-bold text-slate-900">Identificación del estudiante</h2>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                                <label className={labelClass} htmlFor="student-document">Número de documento</label>
                                <input
                                    id="student-document"
                                    className={fieldClass}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    value={document}
                                    onChange={(event) => setDocument(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                checked={accepted}
                                onChange={(event) => setAccepted(event.target.checked)}
                                required
                            />
                            Confirmo que soy el titular del documento ingresado y solicito la inscripción al módulo.
                        </label>
                        <button
                            type="submit"
                            disabled={submitting || Boolean(success)}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-4 font-bold text-sky-300 transition hover:bg-sky-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting ? "Enviando postulación..." : success ? "Postulación registrada" : "Inscribirse al módulo"}
                            <i className="bi bi-send-fill" aria-hidden="true" />
                        </button>
                    </section>
                </form>

                <Link to="/ModulosAcademicos" className="mt-5 inline-flex font-semibold text-slate-600 no-underline hover:text-sky-700">
                    <i className="bi bi-arrow-left mr-2" aria-hidden="true" />
                    Volver al catálogo
                </Link>
            </div>
        </main>
    );
};

export default PostularmeM;
