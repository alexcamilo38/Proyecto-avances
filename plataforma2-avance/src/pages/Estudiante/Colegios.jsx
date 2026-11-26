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
        <div className="contenido-principal2 [margin-left:260px] [padding:20px_15px] [width:calc(100%_-_260px)]">
            <div className="header-seccion2 [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:40px] [gap:20px] [width:100%]">
                <div className="texto-header2">
                    <h1 className="[.texto-header2_&]:[color:var(--azul-navy)] [.texto-header2_&]:[margin:0] [.texto-header2_&]:[font-size:2rem]">
                        Instituciones disponibles
                    </h1>
                    <p className="[.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0]">
                        Explora las instituciones y sus sedes registradas.
                    </p>
                </div>
                <label className="busqueda-contenedor2 [background:var(--blanco)] [display:flex] [align-items:center] [padding:12px_20px] [border-radius:15px] [width:100%] [max-width:400px] [box-shadow:var(--sombra)] [border:1px_solid_#e2e8f0]">
                    <i className="bi bi-search [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px]" aria-hidden="true" />
                    <input
                        className="[.busqueda-contenedor2_&]:[border:none] [.busqueda-contenedor2_&]:[outline:none] [.busqueda-contenedor2_&]:[width:100%] [.busqueda-contenedor2_&]:[font-weight:500]"
                        type="search"
                        placeholder="Buscar institución, sede o ciudad..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>
            </div>

            {institutionError && (
                <div role="alert" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <span>{institutionError}</span>
                    <button type="button" onClick={retryLoading} className="shrink-0 font-semibold underline">Reintentar</button>
                </div>
            )}

            {campusError && !institutionError && (
                <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    {campusError}
                </p>
            )}

            {loading ? (
                <div role="status" className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500">
                    Cargando instituciones...
                </div>
            ) : institutionError ? null : filteredInstitutions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <i className="bi bi-building text-4xl text-slate-300" aria-hidden="true" />
                    <p className="mb-0 mt-3 text-sm text-slate-600">
                        {institutions.length === 0
                            ? "Todavía no hay instituciones registradas."
                            : "No se encontraron instituciones con esa búsqueda."}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {filteredInstitutions.map(({ institution, campuses: institutionCampuses }) => (
                            <article
                                key={institution.id}
                                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
                            >
                                <div className="flex flex-col gap-5 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
                                    {institution.logo_url ? (
                                        <img
                                            src={institution.logo_url}
                                            alt={`Logo de ${institution.name_institution}`}
                                            className="h-24 w-24 rounded-2xl border border-slate-100 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-4xl text-slate-400">
                                            <i className="bi bi-building" aria-hidden="true" />
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-sky-700">Institución</p>
                                        <h2 className="m-0 text-xl font-bold text-slate-900">{institution.name_institution}</h2>
                                        <p className="mb-0 mt-2 text-sm text-slate-600">
                                            <i className="bi bi-geo-alt mr-2 text-sky-600" aria-hidden="true" />
                                            {[institution.city, institution.address_institution].filter(Boolean).join(" · ") || "Ubicación no especificada"}
                                        </p>
                                        {institution.description_institution && (
                                            <p className="mb-0 mt-2 line-clamp-2 text-sm text-slate-500">
                                                {institution.description_institution}
                                            </p>
                                        )}
                                    </div>
                                    <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800">
                                        {institutionCampuses.length} {institutionCampuses.length === 1 ? "sede" : "sedes"}
                                    </span>
                                    <Link
                                        to={`/InfoSede?institutionId=${encodeURIComponent(institution.id)}`}
                                        className="shrink-0 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-700 no-underline transition hover:bg-sky-100 hover:text-sky-800"
                                    >
                                        Ver institución
                                    </Link>
                                </div>

                                <div className="p-6">
                                    <h3 className="mb-4 mt-0 text-base font-semibold text-slate-800">Sedes registradas</h3>
                                    {institutionCampuses.length === 0 ? (
                                        <p className="mb-0 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                            Esta institución todavía no tiene sedes registradas.
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {institutionCampuses.map((campus) => (
                                                <div key={campus.id} className="flex gap-4 rounded-2xl border border-slate-100 p-4">
                                                    {campus.facade_url ? (
                                                        <img
                                                            src={campus.facade_url}
                                                            alt={`Fachada de ${campus.name}`}
                                                            className="h-24 w-28 shrink-0 rounded-xl object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-24 w-28 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-3xl text-slate-400">
                                                            <i className="bi bi-building" aria-hidden="true" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h4 className="m-0 font-semibold text-slate-800">{campus.name}</h4>
                                                            {campus.is_main && (
                                                                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                                                                    Principal
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="mb-0 mt-2 text-sm text-slate-600">
                                                            {[campus.city, campus.address].filter(Boolean).join(" · ") || "Ubicación no especificada"}
                                                        </p>
                                                        {campus.phone && <p className="mb-0 mt-1 text-xs text-slate-500">{campus.phone}</p>}
                                                        {campus.email && <p className="mb-0 mt-1 truncate text-xs text-slate-500">{campus.email}</p>}
                                                        <Link
                                                            to={`/InfoSede?institutionId=${encodeURIComponent(institution.id)}&campusId=${encodeURIComponent(campus.id)}`}
                                                            className="mt-3 inline-block text-sm font-semibold text-sky-700 no-underline hover:text-sky-900"
                                                        >
                                                            Ver sede
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                    <p className="mt-5 text-sm text-slate-500">
                        {filteredInstitutions.length} {filteredInstitutions.length === 1 ? "institución" : "instituciones"} ·{" "}
                        {filteredInstitutions.reduce((total, item) => total + item.campuses.length, 0)} sedes
                    </p>
                </>
            )}
        </div>
    );
};

export default Colegios;
