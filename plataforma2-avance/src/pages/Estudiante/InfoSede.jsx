import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

const Detail = ({ label, value }) => (
    <div className="rounded-xl bg-slate-50 p-4">
        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
        <dd className="mb-0 mt-1 break-words text-sm font-medium text-slate-800">{value || "No registrado"}</dd>
    </div>
);

const InfoSede = () => {
    const [searchParams] = useSearchParams();
    const institutionId = searchParams.get("institutionId") || "";
    const campusId = searchParams.get("campusId") || "";
    const [reloadKey, setReloadKey] = useState(0);
    const requestKey = `${institutionId}:${campusId}:${reloadKey}`;
    const [result, setResult] = useState({
        key: "",
        institution: null,
        campus: null,
        error: "",
    });

    useEffect(() => {
        if (!institutionId) return undefined;

        let ignore = false;
        const institutionRequest = api.get("/institutions/list")
            .then((response) => getCollection(response.data, "institutions"));
        const campusRequest = campusId
            ? api.get("/campuses/list").then((response) => getCollection(response.data, "campuses"))
            : Promise.resolve([]);

        Promise.all([institutionRequest, campusRequest])
            .then(([institutions, campuses]) => {
                const institution = institutions.find((item) => String(item.id) === institutionId);
                if (!institution) throw new Error("No se encontró la institución seleccionada.");

                let campus = null;
                if (campusId) {
                    campus = campuses.find((item) => String(item.id) === campusId);
                    if (!campus) throw new Error("No se encontró la sede seleccionada.");

                    const campusInstitutionId = campus.institution_id ?? campus.institution?.id;
                    if (String(campusInstitutionId) !== String(institution.id)) {
                        throw new Error("La sede seleccionada no pertenece a esta institución.");
                    }
                }

                if (!ignore) setResult({ key: requestKey, institution, campus, error: "" });
            })
            .catch((error) => {
                console.error("Error al cargar los detalles de la institución o sede:", error);
                if (!ignore) {
                    setResult({
                        key: requestKey,
                        institution: null,
                        campus: null,
                        error: getErrorMessage(error, "No se pudo cargar la información seleccionada."),
                    });
                }
            });

        return () => {
            ignore = true;
        };
    }, [institutionId, campusId, requestKey]);

    const isLoading = Boolean(institutionId) && result.key !== requestKey;
    const institution = result.key === requestKey ? result.institution : null;
    const campus = result.key === requestKey ? result.campus : null;
    const error = result.key === requestKey ? result.error : "";
    const heroImage = campus?.facade_url || institution?.logo_url;

    if (!institutionId) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h1 className="mt-0 text-2xl font-bold text-slate-900">Selecciona una institución</h1>
                    <p className="text-slate-600">Abre una institución o una de sus sedes desde el listado para ver sus datos.</p>
                    <Link to="/Colegios" className="inline-flex rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white no-underline hover:bg-sky-700">
                        Volver a instituciones
                    </Link>
                </section>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <div role="status" className="mx-auto max-w-5xl rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">
                    Cargando información...
                </div>
            </main>
        );
    }

    if (error || !institution) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <section className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <p role="alert" className="text-red-700">{error || "No se encontró la institución seleccionada."}</p>
                    <div className="flex justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setReloadKey((current) => current + 1)}
                            className="rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
                        >
                            Reintentar
                        </button>
                        <Link to="/Colegios" className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 no-underline hover:bg-slate-50">
                            Volver al listado
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    const locationCity = campus?.city || institution.city || "";
    const locationAddress = campus?.address || institution.address_institution || "";
    const mapQuery = [locationAddress, locationCity].filter(Boolean).join(", ");
    const enrollmentParams = new URLSearchParams({ institutionId: String(institution.id) });
    if (campus?.id) enrollmentParams.set("campusId", String(campus.id));

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
            <div className="mx-auto max-w-6xl">
                <header className="relative mb-8 overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-sm sm:px-10">
                    {heroImage && (
                        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/50" />
                    <div className="relative">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-200">
                            {campus ? "Sede seleccionada" : "Institución"}
                        </p>
                        <h1 className="mb-2 mt-0 text-3xl font-bold">
                            {campus?.name || institution.name_institution}
                        </h1>
                        {campus && <p className="mb-2 text-sm text-slate-200">{institution.name_institution}</p>}
                        <p className="mb-0 text-sm text-slate-200">
                            <i className="bi bi-geo-alt mr-2" aria-hidden="true" />
                            {[locationCity, locationAddress].filter(Boolean).join(" · ") || "Ubicación no registrada"}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-6">
                        {campus && (
                            <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 mt-0 text-xl font-bold text-slate-900">Información de la sede</h2>
                                {campus.facade_url && (
                                    <img src={campus.facade_url} alt={`Fachada de ${campus.name}`} className="mb-5 h-56 w-full rounded-xl object-cover" />
                                )}
                                <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Detail label="Nombre" value={campus.name} />
                                    <Detail label="Sede principal" value={campus.is_main ? "Sí" : "No"} />
                                    <Detail label="Ciudad" value={campus.city} />
                                    <Detail label="Dirección" value={campus.address} />
                                    <Detail label="Teléfono" value={campus.phone} />
                                    <Detail label="Correo" value={campus.email} />
                                </dl>
                            </section>
                        )}

                        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 mt-0 text-xl font-bold text-slate-900">Información de la institución</h2>
                            {institution.description_institution && (
                                <p className="mb-5 leading-7 text-slate-600">{institution.description_institution}</p>
                            )}
                            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <Detail label="Nombre" value={institution.name_institution} />
                                <Detail label="NIT" value={institution.nit} />
                                <Detail label="Ciudad" value={institution.city} />
                                <Detail label="Dirección" value={institution.address_institution} />
                                <Detail label="Correo" value={institution.email_institution} />
                                <Detail label="Teléfono" value={institution.phone_institution} />
                                <Detail label="Inicio de clases" value={institution.class_start_date} />
                                <Detail label="Fin de clases" value={institution.class_end_date} />
                            </dl>
                        </section>
                    </div>
                    <section className="lg:col-start-1 lg:row-start-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 mt-0 flex items-center gap-2 text-xl font-bold text-slate-900">
                            <i className="bi bi-geo-alt-fill text-sky-600" aria-hidden="true" />
                            Ubicación de {campus ? "la sede" : "la institución"}
                        </h2>
                        {mapQuery ? (
                            <div className="aspect-video overflow-hidden rounded-xl border border-slate-200">
                                <iframe
                                    title={`Mapa de ${campus?.name || institution.name_institution}`}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                                    className="h-full w-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        ) : (
                            <p className="mb-0 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                                La dirección no está registrada, así que no se puede mostrar el mapa.
                            </p>
                        )}
                    </section>

                    <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-start-2 lg:row-start-1 lg:sticky lg:top-6">
                        <h2 className="mb-3 mt-0 text-xl font-bold text-slate-900">Inicia tu proceso</h2>
                        <p className="text-sm leading-6 text-slate-600">
                            Revisa los datos de la institución y la sede seleccionadas antes de iniciar la matrícula.
                        </p>
                        <Link to={`/Formulario?${enrollmentParams.toString()}`} className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 px-5 py-4 font-bold text-sky-300 no-underline transition hover:bg-sky-700 hover:text-white">
                            <span>Iniciar matrícula</span>
                            <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                        <Link to="/Colegios" className="mt-4 inline-block text-sm font-semibold text-sky-700 no-underline hover:text-sky-900">
                            Volver a instituciones
                        </Link>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default InfoSede;
