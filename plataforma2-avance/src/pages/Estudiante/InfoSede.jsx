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

const normalizeCampus = (campus) => ({
    ...campus,
    is_main: campus.is_main === true || campus.is_main === 1 || campus.is_main === "1",
});

const Detail = ({ label, value }) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors hover:border-sky-200">
        <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</dt>
        <dd className="mb-0 mt-2 break-words text-sm font-semibold text-slate-800">{value || "No registrado"}</dd>
    </div>
);

const InfoSede = () => {
    const [searchParams] = useSearchParams();
    const institutionId = searchParams.get("institutionId") || "";
    const campusId = searchParams.get("campusId") || "";
    const [reloadKey, setReloadKey] = useState(0);
    const [expandedCampusId, setExpandedCampusId] = useState(null);
    const requestKey = `${institutionId}:${campusId}:${reloadKey}`;
    const [result, setResult] = useState({
        key: "",
        institution: null,
        campus: null,
        campuses: [],
        error: "",
    });

    useEffect(() => {
        if (!institutionId) return undefined;

        let ignore = false;
        const institutionRequest = api.get("/institutions/list")
            .then((response) => getCollection(response.data, "institutions"));
        const campusRequest = api.get("/campuses/list")
            .then((response) => getCollection(response.data, "campuses").map(normalizeCampus));

        Promise.all([institutionRequest, campusRequest])
            .then(([institutions, campuses]) => {
                const institution = institutions.find((item) => String(item.id) === institutionId);
                if (!institution) throw new Error("No se encontró la institución seleccionada.");

                const institutionCampuses = campuses.filter((item) => (
                    String(item.institution_id ?? item.institution?.id) === String(institution.id)
                ));
                let campus = null;
                if (campusId) {
                    campus = campuses.find((item) => String(item.id) === campusId);
                    if (!campus) throw new Error("No se encontró la sede seleccionada.");

                    const campusInstitutionId = campus.institution_id ?? campus.institution?.id;
                    if (String(campusInstitutionId) !== String(institution.id)) {
                        throw new Error("La sede seleccionada no pertenece a esta institución.");
                    }
                }

                if (!ignore) setResult({ key: requestKey, institution, campus, campuses: institutionCampuses, error: "" });
            })
            .catch((error) => {
                console.error("Error al cargar los detalles de la institución o sede:", error);
                if (!ignore) {
                    setResult({
                        key: requestKey,
                        institution: null,
                        campus: null,
                        campuses: [],
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
    const institutionCampuses = result.key === requestKey ? result.campuses : [];
    const error = result.key === requestKey ? result.error : "";
    const heroImage = campus?.facade_url || institution?.imagen_url || institution?.logo_url;

    if (!institutionId) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl text-sky-700">
                        <i className="bi bi-buildings" aria-hidden="true" />
                    </span>
                    <h1 className="mb-2 mt-0 text-2xl font-bold text-slate-900">Selecciona una institución</h1>
                    <p className="mx-auto mb-6 max-w-lg text-sm leading-6 text-slate-600">Abre una institución o una de sus sedes desde el listado para ver sus datos.</p>
                    <Link to="/Colegios" className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white no-underline transition hover:bg-sky-800">
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                        Volver a instituciones
                    </Link>
                </section>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <div role="status" className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
                    <i className="bi bi-arrow-repeat mb-3 block animate-spin text-2xl text-sky-600" aria-hidden="true" />
                    Cargando información...
                </div>
            </main>
        );
    }

    if (error || !institution) {
        return (
            <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-10 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
                <section className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm sm:p-10">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-600">
                        <i className="bi bi-exclamation-circle" aria-hidden="true" />
                    </span>
                    <p role="alert" className="mb-6 text-sm leading-6 text-red-700">{error || "No se encontró la institución seleccionada."}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setReloadKey((current) => current + 1)}
                            className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800"
                        >
                            Reintentar
                        </button>
                        <Link to="/Colegios" className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 no-underline transition hover:bg-slate-50">
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
                <Link to="/Colegios" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 no-underline transition hover:text-sky-700">
                    <i className="bi bi-arrow-left" aria-hidden="true" />
                    Instituciones
                </Link>

                <header className="relative mb-6 overflow-hidden rounded-3xl bg-slate-900 text-white shadow-lg">
                    {heroImage && (
                        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                    )}
                    <div className="relative max-w-4xl px-6 py-8 sm:px-10 sm:py-9">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                            <i className={`bi ${campus ? "bi-geo-alt-fill" : "bi-buildings"}`} aria-hidden="true" />
                            {campus ? "Sede seleccionada" : "Institución educativa"}
                        </span>
                        <h1 className="mb-2 mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {campus?.name || institution.name_institution}
                        </h1>
                        {campus && <p className="mb-3 text-sm text-slate-200">{institution.name_institution}</p>}
                        <p className="mb-0 flex items-center gap-2 text-sm text-slate-200">
                            <i className="bi bi-geo-alt-fill text-sky-300" aria-hidden="true" />
                            <span>{[locationCity, locationAddress].filter(Boolean).join(" · ") || "Ubicación no registrada"}</span>
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-5">
                        {campus && (
                            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-700">
                                        <i className="bi bi-geo-alt" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="mb-0 text-xs font-semibold uppercase tracking-wider text-sky-700">Detalles</p>
                                        <h2 className="mb-0 mt-1 text-lg font-bold text-slate-900">Información de la sede</h2>
                                    </div>
                                </div>
                                {campus.facade_url && (
                                    <img src={campus.facade_url} alt={`Fachada de ${campus.name}`} className="mb-5 h-48 w-full rounded-2xl object-cover sm:h-56" />
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

                        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-700">
                                    <i className="bi bi-buildings" aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="mb-0 text-xs font-semibold uppercase tracking-wider text-indigo-700">Conócela</p>
                                    <h2 className="mb-0 mt-1 text-lg font-bold text-slate-900">Información de la institución</h2>
                                </div>
                            </div>
                            {institution.description_institution && (
                                <p className="mb-5 rounded-2xl bg-slate-50 px-4 py-3 leading-7 text-slate-600">{institution.description_institution}</p>
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

                        {!campus && (
                            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-lg text-amber-700">
                                            <i className="bi bi-geo-alt" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <p className="mb-0 text-xs font-semibold uppercase tracking-wider text-amber-700">Explora sus ubicaciones</p>
                                            <h2 className="mb-0 mt-1 text-lg font-bold text-slate-900">Sedes disponibles</h2>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                        {institutionCampuses.length}
                                    </span>
                                </div>

                                {institutionCampuses.length === 0 ? (
                                    <p className="mb-0 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                                        Esta institución todavía no tiene sedes registradas.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {institutionCampuses.map((institutionCampus) => {
                                            const isMapExpanded = String(expandedCampusId) === String(institutionCampus.id);
                                            const mapPanelId = `campus-map-${institutionCampus.id}`;
                                            const campusMapQuery = [
                                                institutionCampus.address,
                                                institutionCampus.city,
                                            ].filter(Boolean).join(", ");

                                            return (
                                                <article key={institutionCampus.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                                    {institutionCampus.facade_url && (
                                                        <img
                                                            src={institutionCampus.facade_url}
                                                            alt={`Fachada de ${institutionCampus.name}`}
                                                            className="h-40 w-full object-cover"
                                                        />
                                                    )}
                                                    <div className="p-4 sm:p-5">
                                                        <div className="mb-4 flex flex-wrap items-center gap-2">
                                                            <h3 className="m-0 text-base font-bold text-slate-900">{institutionCampus.name}</h3>
                                                            {institutionCampus.is_main && (
                                                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                                                    Sede principal
                                                                </span>
                                                            )}
                                                        </div>
                                                        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                            <Detail label="Ciudad" value={institutionCampus.city} />
                                                            <Detail label="Dirección" value={institutionCampus.address} />
                                                            <Detail label="Teléfono" value={institutionCampus.phone} />
                                                            <Detail label="Correo" value={institutionCampus.email} />
                                                        </dl>
                                                        <button
                                                            type="button"
                                                            aria-expanded={isMapExpanded}
                                                            aria-controls={mapPanelId}
                                                            onClick={() => setExpandedCampusId(isMapExpanded ? null : institutionCampus.id)}
                                                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-800 transition hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                                                        >
                                                            <i className={`bi ${isMapExpanded ? "bi-map" : "bi-map-fill"}`} aria-hidden="true" />
                                                            {isMapExpanded ? "Ocultar mapa" : "Ver mapa"}
                                                        </button>
                                                        <div id={mapPanelId} hidden={!isMapExpanded} className="mt-4">
                                                            {isMapExpanded && (campusMapQuery ? (
                                                                <div className="aspect-video overflow-hidden rounded-xl border border-slate-200">
                                                                    <iframe
                                                                        title={`Mapa de ${institutionCampus.name}`}
                                                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(campusMapQuery)}&output=embed`}
                                                                        className="h-full w-full border-0"
                                                                        allowFullScreen
                                                                        loading="lazy"
                                                                        referrerPolicy="no-referrer-when-downgrade"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <p className="mb-0 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                                                                    Esta sede no tiene una dirección registrada para mostrar en el mapa.
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-start-1 lg:row-start-2">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-700">
                                <i className="bi bi-map" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="mb-0 text-xs font-semibold uppercase tracking-wider text-emerald-700">Encuéntrala</p>
                                <h2 className="mb-0 mt-1 text-lg font-bold text-slate-900">
                                    Ubicación de {campus ? "la sede" : "la institución"}
                                </h2>
                            </div>
                        </div>
                        {mapQuery ? (
                            <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200">
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

                    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-6">
                        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-xl text-sky-700">
                            <i className="bi bi-journal-check" aria-hidden="true" />
                        </span>
                        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-sky-700">Siguiente paso</p>
                        <h2 className="mb-3 mt-0 text-xl font-bold text-slate-900">Inicia tu matrícula</h2>
                        <p className="mb-0 text-sm leading-6 text-slate-600">
                            Revisa los datos de la institución y la sede seleccionadas antes de iniciar la matrícula.
                        </p>
                        <Link to={`/Formulario?${enrollmentParams.toString()}`} className="mt-5 flex items-center justify-between rounded-xl bg-sky-700 px-5 py-4 font-bold text-white no-underline transition hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200">
                            <span>Iniciar matrícula</span>
                            <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                        <Link to="/Colegios" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 no-underline transition hover:text-sky-700">
                            <i className="bi bi-arrow-left" aria-hidden="true" />
                            Volver a instituciones
                        </Link>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default InfoSede;
