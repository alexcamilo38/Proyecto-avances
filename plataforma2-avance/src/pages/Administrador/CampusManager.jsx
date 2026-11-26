import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../Config/env";

const emptyCampus = {
    institution_id: "",
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    is_main: false,
};

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const getCampuses = (responseData) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.campuses)) return responseData.campuses;
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error("El servidor devolvió una respuesta inesperada al consultar las sedes.");
};

const normalizeCampus = (campus) => ({
    ...campus,
    is_main: campus.is_main === true || campus.is_main === 1 || campus.is_main === "1",
});

const requestCampuses = async () => {
    const response = await api.get("/campuses/list");
    return getCampuses(response.data).map(normalizeCampus);
};

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const CampusManager = ({ institutions, uploadImage }) => {
    const [campuses, setCampuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCampus, setEditingCampus] = useState(null);
    const [form, setForm] = useState(emptyCampus);
    const [facadeFile, setFacadeFile] = useState(null);
    const [facadePreview, setFacadePreview] = useState("");
    const facadePreviewUrl = useRef("");

    const loadCampuses = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            setCampuses(await requestCampuses());
        } catch (loadError) {
            console.error("Error al cargar las sedes:", loadError);
            setError(getErrorMessage(loadError, "No se pudieron cargar las sedes."));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let ignore = false;

        requestCampuses()
            .then((loadedCampuses) => {
                if (!ignore) {
                    setCampuses(loadedCampuses);
                    setError("");
                }
            })
            .catch((loadError) => {
                console.error("Error al cargar las sedes:", loadError);
                if (!ignore) setError(getErrorMessage(loadError, "No se pudieron cargar las sedes."));
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => () => {
        if (facadePreviewUrl.current) URL.revokeObjectURL(facadePreviewUrl.current);
    }, []);

    const clearFacadePreview = () => {
        if (facadePreviewUrl.current) URL.revokeObjectURL(facadePreviewUrl.current);
        facadePreviewUrl.current = "";
        setFacadePreview("");
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingCampus(null);
        setForm(emptyCampus);
        setFacadeFile(null);
        clearFacadePreview();
    };

    const openCreateModal = () => {
        setEditingCampus(null);
        setForm({
            ...emptyCampus,
            institution_id: institutions.length === 1 ? String(institutions[0].id) : "",
        });
        setFacadeFile(null);
        clearFacadePreview();
        setError("");
        setModalOpen(true);
    };

    const openEditModal = (campus) => {
        setEditingCampus(campus);
        setForm({
            institution_id: String(campus.institution_id ?? campus.institution?.id ?? ""),
            name: campus.name || "",
            address: campus.address || "",
            city: campus.city || "",
            phone: campus.phone || "",
            email: campus.email || "",
            is_main: campus.is_main,
        });
        setFacadeFile(null);
        clearFacadePreview();
        setError("");
        setModalOpen(true);
    };

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFacadeChange = (event) => {
        const selectedFile = event.target.files?.[0] || null;
        clearFacadePreview();
        setFacadeFile(selectedFile);

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            facadePreviewUrl.current = previewUrl;
            setFacadePreview(previewUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const institution = institutions.find(
                (item) => String(item.id) === form.institution_id,
            );
            if (!institution) throw new Error("Selecciona una institución válida.");

            const payload = {
                ...form,
                institution_id: institution.id,
            };

            if (editingCampus) {
                const facade = facadeFile
                    ? await uploadImage(facadeFile, "la fachada de la sede")
                    : {
                        url: editingCampus.facade_url || "",
                        publicId: editingCampus.facade_public_id || "",
                    };

                payload.facade_url = facade.url;
                payload.facade_public_id = facade.publicId;
                await api.put(`/campuses/${editingCampus.id}`, payload);
            } else {
                if (!facadeFile) throw new Error("Selecciona la foto de fachada.");

                const formData = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    formData.append(key, key === "is_main" ? (value ? "1" : "0") : String(value));
                });
                formData.append("facade", facadeFile);

                await api.post("/campuses/store", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            closeModal();
            await loadCampuses();
        } catch (saveError) {
            console.error("Error al guardar la sede:", saveError);
            setError(getErrorMessage(saveError, "No se pudo guardar la sede."));
        } finally {
            setSaving(false);
        }
    };

    const deleteCampus = async (campus) => {
        if (!window.confirm(`¿Eliminar la sede "${campus.name}"? Esta acción no se puede deshacer.`)) return;

        setDeletingId(campus.id);
        setError("");
        try {
            await api.delete(`/campuses/${campus.id}`);
            setCampuses((current) => current.filter((item) => item.id !== campus.id));
        } catch (deleteError) {
            console.error("Error al eliminar la sede:", deleteError);
            setError(getErrorMessage(deleteError, "No se pudo eliminar la sede."));
        } finally {
            setDeletingId(null);
        }
    };

    const getInstitutionName = (campus) => (
        institutions.find((item) => String(item.id) === String(campus.institution_id))?.name_institution
        || campus.institution?.name_institution
        || "Institución no disponible"
    );

    return (
        <section className="mt-10">
            <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="m-0 text-2xl font-bold tracking-tight text-slate-900">Sedes (campus)</h2>
                    <p className="mb-0 mt-2 text-sm leading-6 text-slate-500">
                        Administra las sedes y vincúlalas con su institución.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={openCreateModal}
                    disabled={institutions.length === 0}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <i className="bi bi-plus-lg" aria-hidden="true" />
                    Crear sede
                </button>
            </header>

            {institutions.length === 0 && !loading && (
                <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Primero registra una institución para poder asociarle una sede.
                </p>
            )}

            {error && (
                <div role="alert" className="mb-4 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <span>{error}</span>
                    {!modalOpen && (
                        <button type="button" onClick={loadCampuses} className="shrink-0 font-bold underline">
                            Reintentar
                        </button>
                    )}
                </div>
            )}

            {loading ? (
                <div role="status" className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                    Cargando sedes...
                </div>
            ) : campuses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
                    <i className="bi bi-geo-alt text-3xl text-slate-300" aria-hidden="true" />
                    <p className="mb-0 mt-3 text-sm text-slate-500">Aún no hay sedes registradas.</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-5 py-4 font-semibold">Sede</th>
                                    <th className="px-5 py-4 font-semibold">Institución</th>
                                    <th className="px-5 py-4 font-semibold">Ubicación</th>
                                    <th className="px-5 py-4 font-semibold">Contacto</th>
                                    <th className="px-5 py-4 font-semibold">Tipo</th>
                                    <th className="px-5 py-4 text-right font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {campuses.map((campus) => (
                                    <tr key={campus.id} className="align-middle hover:bg-slate-50/70">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {campus.facade_url ? (
                                                    <img src={campus.facade_url} alt={`Fachada de ${campus.name}`} className="h-11 w-14 rounded-lg border border-slate-100 object-cover" />
                                                ) : (
                                                    <span className="flex h-11 w-14 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                                                        <i className="bi bi-building" aria-hidden="true" />
                                                    </span>
                                                )}
                                                <span className="font-semibold text-slate-800">{campus.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600">{getInstitutionName(campus)}</td>
                                        <td className="px-5 py-4">
                                            <p className="m-0 text-sm text-slate-700">{campus.city}</p>
                                            <p className="m-0 mt-1 text-xs text-slate-500">{campus.address}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="m-0 text-sm text-slate-700">{campus.email || "—"}</p>
                                            <p className="m-0 mt-1 text-xs text-slate-500">{campus.phone || "—"}</p>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {campus.is_main ? "Principal" : "Secundaria"}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(campus)}
                                                    aria-label={`Editar ${campus.name}`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                >
                                                    <i className="bi bi-pencil" aria-hidden="true" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteCampus(campus)}
                                                    disabled={deletingId === campus.id}
                                                    aria-label={`Eliminar ${campus.name}`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
                                                >
                                                    <i className={`bi ${deletingId === campus.id ? "bi-arrow-repeat animate-spin" : "bi-trash3"}`} aria-hidden="true" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                        {campuses.length} {campuses.length === 1 ? "sede registrada" : "sedes registradas"}
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4" role="presentation">
                    <section role="dialog" aria-modal="true" aria-labelledby="campus-modal-title" className="my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <div>
                                <h2 id="campus-modal-title" className="m-0 text-xl font-bold text-slate-900">
                                    {editingCampus ? "Editar sede" : "Crear sede"}
                                </h2>
                                <p className="mb-0 mt-1 text-sm text-slate-500">Asocia esta sede a una institución.</p>
                            </div>
                            <button type="button" onClick={closeModal} disabled={saving} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                                <i className="bi bi-x-lg" aria-hidden="true" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className={labelClass} htmlFor="campus-institution">Institución</label>
                                    <select id="campus-institution" className={fieldClass} name="institution_id" value={form.institution_id} onChange={handleChange} required>
                                        <option value="">Selecciona una institución</option>
                                        {institutions.map((institution) => (
                                            <option key={institution.id} value={institution.id}>{institution.name_institution}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="campus-name">Nombre de la sede</label>
                                    <input id="campus-name" className={fieldClass} name="name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="campus-city">Ciudad</label>
                                    <input id="campus-city" className={fieldClass} name="city" value={form.city} onChange={handleChange} required />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass} htmlFor="campus-address">Dirección</label>
                                    <input id="campus-address" className={fieldClass} name="address" value={form.address} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="campus-phone">Teléfono</label>
                                    <input id="campus-phone" className={fieldClass} type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="campus-email">Correo</label>
                                    <input id="campus-email" className={fieldClass} type="email" name="email" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass} htmlFor="campus-facade">Foto de fachada</label>
                                    <input id="campus-facade" className={fieldClass} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFacadeChange} required={!editingCampus} />
                                    {(facadePreview || editingCampus?.facade_url) && (
                                        <img
                                            src={facadePreview || editingCampus.facade_url}
                                            alt={`Fachada de ${form.name || "la sede"}`}
                                            className="mt-3 h-32 w-full rounded-xl border border-slate-200 object-cover"
                                        />
                                    )}
                                </div>
                                <label className="sm:col-span-2 flex items-center gap-3 text-sm font-medium text-slate-700">
                                    <input type="checkbox" name="is_main" checked={form.is_main} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                                    Esta es la sede principal de la institución
                                </label>
                            </div>

                            {error && <p role="alert" className="m-0 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={saving} className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? "Guardando..." : editingCampus ? "Guardar cambios" : "Crear sede"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </section>
    );
};

export default CampusManager;
