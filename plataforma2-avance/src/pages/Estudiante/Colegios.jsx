import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Colegios = () => {
    const [institutions, setInstitutions] = useState([]);
    const [campuses, setCampuses] = useState([]);
    const [search, setSearch] = useState("");
    const [expandedInstitutionId, setExpandedInstitutionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [institutionError, setInstitutionError] = useState("");
    const [campusError, setCampusError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let ignore = false;

        const institutionRequest = api.get("/institutions/list")
            .then((response) => getCollection(response.data, "institutions"));
        const campusRequest = api.get("/campuses/list")
            .then((response) => getCollection(response.data, "campuses"));

        Promise.allSettled([institutionRequest, campusRequest]).then(([institutionResult, campusResult]) => {
            if (ignore) return;

            if (institutionResult.status === "fulfilled") {
                setInstitutions(institutionResult.value);
                setInstitutionError("");
            } else {
                console.error("Error al cargar las instituciones:", institutionResult.reason);
                setInstitutionError(getErrorMessage(institutionResult.reason, "No se pudieron cargar las instituciones."));
            }

            if (campusResult.status === "fulfilled") {
                setCampuses(campusResult.value);
                setCampusError("");
            } else {
                console.error("Error al cargar las sedes:", campusResult.reason);
                setCampuses([]);
                setCampusError("No se pudieron cargar las sedes. Se mostrarán las instituciones disponibles.");
            }

            setLoading(false);
        });

        return () => {
            ignore = true;
        };
    }, [reloadKey]);

    const institutionGroups = institutions.map((institution) => ({
        institution,
        campuses: campuses.filter(
            (campus) => String(campus.institution_id ?? campus.institution?.id) === String(institution.id),
        ),
    }));

    const filteredInstitutions = institutionGroups.filter(({ institution, campuses: institutionCampuses }) => {
        const searchableText = [
            institution.name_institution,
            institution.city,
            institution.address_institution,
            ...institutionCampuses.flatMap((campus) => [campus.name, campus.city, campus.address]),
        ].filter(Boolean).join(" ").toLocaleLowerCase();

        return searchableText.includes(search.trim().toLocaleLowerCase());
    });

    const retryLoading = () => {
        setLoading(true);
        setInstitutionError("");
        setCampusError("");
        setReloadKey((current) => current + 1);
    };

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 rounded-2xl bg-slate-900 px-6 py-5 text-white shadow-sm">
                    <div className="min-w-0">
                        <p className="mb-1 text-sm text-slate-300">
                            Explora las instituciones disponibles y encuentra dónde iniciar tu matrícula.
                        </p>
                        <h1 className="m-0 text-2xl font-semibold max-sm:text-xl">
                            Encuentra tu institución
                        </h1>
                        <label className="mt-4 flex max-w-md items-center gap-2 rounded-xl bg-white p-1.5 focus-within:ring-4 focus-within:ring-sky-300/30">
                            <i className="bi bi-search pl-3 text-slate-400" aria-hidden="true" />
                            <span className="sr-only">Buscar institución, sede o ciudad</span>
                            <input
                                className="min-w-0 flex-1 px-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                type="search"
                                placeholder="Buscar institución, sede o ciudad"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                        </label>
                    </div>
                </header>

                {institutionError && (
                    <div role="alert" className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{institutionError}</span>
                        <button type="button" onClick={retryLoading} className="shrink-0 font-semibold underline">
                            Reintentar
                        </button>
                    </div>
                )}

                {campusError && !institutionError && (
                    <p role="status" className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        {campusError}
                    </p>
                )}

                {loading ? (
                    <div role="status" className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
                        <i className="bi bi-arrow-repeat mb-3 block text-2xl text-sky-600" aria-hidden="true" />
                        Cargando instituciones...
                    </div>
                ) : institutionError ? null : filteredInstitutions.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <i className="bi bi-buildings text-4xl text-slate-300" aria-hidden="true" />
                        <p className="mb-0 mt-3 text-sm text-slate-600">
                            {institutions.length === 0
                                ? "Todavía no hay instituciones registradas."
                                : "No se encontraron instituciones con esa búsqueda."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
                            {filteredInstitutions.map(({ institution, campuses: institutionCampuses }) => {
                                const isExpanded = String(expandedInstitutionId) === String(institution.id);
                                const optionsId = `institution-options-${institution.id}`;
                                const coverImage = institution.imagen_url || institution.logo_url;

                                return (
                                    <article
                                        key={institution.id}
                                        className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                                    >
                                        <div className="relative h-24 overflow-hidden bg-sky-100">
                                            {coverImage ? (
                                                <img
                                                    src={coverImage}
                                                    alt={`Imagen de ${institution.name_institution}`}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sky-300">
                                                    <i className="bi bi-buildings text-4xl" aria-hidden="true" />
                                                </div>
                                            )}
                                            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full border border-white/25 bg-slate-950/35 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                                                <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                                                {institution.city || "Ubicación no especificada"}
                                            </span>
                                            <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
                                                {institutionCampuses.length} {institutionCampuses.length === 1 ? "sede" : "sedes"}
                                            </span>
                                        </div>

                                        <div className="p-3">
                                            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">
                                                Institución educativa
                                            </p>
                                            <h2 className="mb-1 mt-0 text-sm font-semibold leading-snug text-slate-900">
                                                {institution.name_institution}
                                            </h2>
                                            <p className="mb-0 flex items-start gap-1.5 text-xs text-slate-500">
                                                <i className="bi bi-pin-map mt-0.5 text-sky-600" aria-hidden="true" />
                                                <span>{institution.address_institution || "Dirección no especificada"}</span>
                                            </p>
                                            {institution.description_institution && (
                                                <p className="mb-0 mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                                                    {institution.description_institution}
                                                </p>
                                            )}

                                            {!isExpanded && (
                                                <button
                                                    type="button"
                                                    aria-expanded="false"
                                                    aria-controls={optionsId}
                                                    onClick={() => setExpandedInstitutionId(institution.id)}
                                                    className="mt-4 flex w-full items-center justify-between rounded-lg bg-slate-900 px-3 py-2.5 text-left text-xs font-semibold text-white transition hover:bg-sky-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <i className="bi bi-arrow-up-right-circle" aria-hidden="true" />
                                                        Explorar institución
                                                    </span>
                                                    <i className="bi bi-chevron-down" aria-hidden="true" />
                                                </button>
                                            )}

                                            <div id={optionsId} hidden={!isExpanded} className="mt-4 border-t border-slate-100 pt-4">
                                                <div className="mb-4 flex items-center justify-start gap-2">
                                                    <Link
                                                        to={`/InfoSede?institutionId=${encodeURIComponent(institution.id)}`}
                                                        className="inline-flex min-w-0 items-center rounded-lg bg-sky-50 px-2 py-1.5 text-[11px] font-bold text-sky-800 no-underline transition hover:bg-sky-100"
                                                    >
                                                        Ver institución
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        aria-label="Cerrar opciones"
                                                        title="Cerrar opciones"
                                                        aria-expanded={isExpanded}
                                                        aria-controls={optionsId}
                                                        onClick={() => setExpandedInstitutionId(null)}
                                                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                                                    >
                                                        <i className="bi bi-x-lg" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <h3 className="mb-3 mt-0 text-sm font-bold text-slate-800">
                                                    Elige una sede para matricularte
                                                </h3>
                                                {institutionCampuses.length === 0 ? (
                                                    <p className="mb-0 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                                        Esta institución todavía no tiene sedes registradas.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {institutionCampuses.map((campus) => {
                                                            const enrollmentParams = new URLSearchParams({
                                                                institutionId: String(institution.id),
                                                                campusId: String(campus.id),
                                                            });

                                                            return (
                                                                <div
                                                                    key={campus.id}
                                                                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                                                                >
                                                                    <div className="flex min-w-0 items-center gap-3">
                                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-700">
                                                                            <i className="bi bi-geo-alt" aria-hidden="true" />
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <div className="flex flex-wrap items-center gap-2">
                                                                                <h4 className="m-0 truncate text-sm font-bold text-slate-800">{campus.name}</h4>
                                                                                {campus.is_main && (
                                                                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                                                                        Principal
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                            <p className="mb-0 mt-1 text-xs text-slate-500">
                                                                                {[campus.city, campus.address].filter(Boolean).join(" · ") || "Ubicación no especificada"}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <Link
                                                                        to={`/Formulario?${enrollmentParams.toString()}`}
                                                                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 text-sm font-bold text-sky-800 no-underline transition hover:bg-sky-100"
                                                                    >
                                                                        Elegir sede
                                                                        <i className="bi bi-arrow-right" aria-hidden="true" />
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        <p className="mb-0 mt-6 text-sm text-slate-500">
                            {filteredInstitutions.length} {filteredInstitutions.length === 1 ? "institución" : "instituciones"} ·{" "}
                            {filteredInstitutions.reduce((total, item) => total + item.campuses.length, 0)} sedes disponibles
                        </p>
                    </>
                )}
            </div>
        </main>
    );
};

export default Colegios;
