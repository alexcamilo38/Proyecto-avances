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
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
                <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-lg shadow-slate-900/5 sm:px-10">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-3xl text-sky-600">
                        <i className="bi bi-journal-x" aria-hidden="true" />
                    </span>
                    <h1 className="mb-0 mt-5 text-2xl font-bold text-slate-900">Selecciona un módulo</h1>
                    <p className="mb-0 mt-2 text-sm leading-6 text-slate-600">Debes iniciar la postulación desde el catálogo de módulos.</p>
                    <Link to="/ModulosAcademicos" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white no-underline transition hover:bg-sky-700">
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                        Volver al catálogo
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-6xl space-y-6 pb-10">
                <Link to="/ModulosAcademicos" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 no-underline shadow-sm transition hover:border-sky-200 hover:text-sky-700">
                    <i className="bi bi-arrow-left" aria-hidden="true" />
                    Volver al catálogo
                </Link>

                <header className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
                    <div className="pointer-events-none absolute -right-14 -top-20 -z-10 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                                <i className="bi bi-send-fill" aria-hidden="true" />
                                Proceso de inscripción
                            </span>
                            <h1 className="mb-0 mt-0 break-words text-2xl font-bold leading-tight sm:text-3xl">{module.nombre || "Postulación al módulo"}</h1>
                            <p className="mb-0 mt-3 text-sm leading-6 text-slate-300">
                                Verifica tu identidad para registrar la postulación a este módulo.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                            <i className="bi bi-person-badge-fill text-cyan-300" aria-hidden="true" />
                            {module.docente || "Docente por asignar"}
                        </span>
                    </div>
                </header>

                {error && (
                    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-800">
                        <i className="bi bi-exclamation-circle-fill mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div role="status" className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 sm:flex-row sm:items-center sm:justify-between">
                        <span className="flex items-center gap-2 font-medium">
                            <i className="bi bi-check-circle-fill" aria-hidden="true" />
                            {success}
                        </span>
                        <Link to="/MatriculasE" className="font-semibold text-emerald-800 underline underline-offset-2">Ver mis matrículas</Link>
                    </div>
                )}

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-7">
                            <div className="mb-6 flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-lg font-bold text-sky-700">1</span>
                                <div>
                                    <h2 className="m-0 text-lg font-bold text-slate-900">Identificación del estudiante</h2>
                                    <p className="mb-0 mt-1 text-sm leading-5 text-slate-500">Ingresa los datos de la persona que realizará el módulo.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass} htmlFor="student-document-type">Tipo de documento <span className="font-normal text-slate-400">(opcional)</span></label>
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
                                        placeholder="Escribe el número de documento"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-7">
                            <div className="mb-5 flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-700">2</span>
                                <div>
                                    <h2 className="m-0 text-lg font-bold text-slate-900">Confirmación y envío</h2>
                                    <p className="mb-0 mt-1 text-sm leading-5 text-slate-500">Confirma que los datos corresponden al titular.</p>
                                </div>
                            </div>
                            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/50">
                                <input
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                    checked={accepted}
                                    onChange={(event) => setAccepted(event.target.checked)}
                                    required
                                />
                                <span>Confirmo que soy el titular del documento ingresado y solicito la inscripción al módulo.</span>
                            </label>
                            <button
                                type="submit"
                                disabled={submitting || Boolean(success)}
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? "Enviando postulación..." : success ? "Postulación registrada" : "Confirmar inscripción"}
                                <i className={`bi ${submitting ? "bi-arrow-repeat animate-spin" : success ? "bi-check-lg" : "bi-send-fill"}`} aria-hidden="true" />
                            </button>
                        </section>
                    </form>

                    <aside className="lg:sticky lg:top-6">
                        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5">
                            <div className="bg-gradient-to-r from-slate-900 to-sky-950 px-5 py-4 text-white">
                                <h2 className="m-0 flex items-center gap-2 text-base font-bold">
                                    <i className="bi bi-journal-bookmark-fill text-cyan-300" aria-hidden="true" />
                                    Resumen del módulo
                                </h2>
                            </div>
                            <div className="p-5">
                                <dl className="m-0 divide-y divide-dashed divide-slate-200">
                                    <div className="flex items-start justify-between gap-3 py-3 first:pt-0">
                                        <dt className="text-sm text-slate-500">Docente</dt>
                                        <dd className="m-0 max-w-[65%] break-words text-right text-sm font-semibold text-slate-800">{module.docente || "Por asignar"}</dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-3 py-3">
                                        <dt className="text-sm text-slate-500">Horario</dt>
                                        <dd className="m-0 max-w-[65%] break-words text-right text-sm font-semibold text-slate-800">{module.horario || module.dias || "Por definir"}</dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-3 py-3">
                                        <dt className="text-sm text-slate-500">Duración</dt>
                                        <dd className="m-0 max-w-[65%] break-words text-right text-sm font-semibold text-slate-800">{module.duracion || "Por definir"}</dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-3 py-3 last:pb-0">
                                        <dt className="text-sm text-slate-500">Cupos libres</dt>
                                        <dd className="m-0 text-right text-sm font-bold text-slate-800">{module.cupos ?? "No definidos"}</dd>
                                    </div>
                                </dl>
                                <p className="mb-0 mt-5 flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-xs leading-5 text-sky-800">
                                    <i className="bi bi-shield-check mt-0.5 shrink-0" aria-hidden="true" />
                                    Tu documento se usará para validar el registro del estudiante.
                                </p>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default PostularmeM;
