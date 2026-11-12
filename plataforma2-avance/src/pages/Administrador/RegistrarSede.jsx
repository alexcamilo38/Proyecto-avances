import { useEffect, useRef, useState } from "react";
import api from "../../Config/env";

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const emptyInstitution = {
    name_institution: "",
    email_institution: "",
    phone_institution: "",
    address_institution: "",
    description_institution: "",
    nit: "",
    city: "",
    class_start_date: "",
    class_end_date: "",
};

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const getInstitutions = (responseData) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.institutions)) return responseData.institutions;
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error("El servidor devolvió una respuesta inesperada al consultar las instituciones.");
};

const normalizeInstitution = (institution) => ({
    ...institution,
    class_start_date: institution.class_start_date?.slice(0, 10) || "",
    class_end_date: institution.class_end_date?.slice(0, 10) || "",
});

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const RegistrarSede = () => {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingInstitution, setEditingInstitution] = useState(null);
    const [form, setForm] = useState(emptyInstitution);
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const logoPreviewUrl = useRef("");

    useEffect(() => () => {
        if (logoPreviewUrl.current) URL.revokeObjectURL(logoPreviewUrl.current);
    }, []);

    const loadInstitutions = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/institutions/list");
            setInstitutions(getInstitutions(response.data).map(normalizeInstitution));
        } catch (loadError) {
            console.error("Error al cargar las instituciones:", loadError);
            setError(getErrorMessage(loadError, "No se pudieron cargar las instituciones."));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ignore = false;

        api.get("/institutions/list")
            .then((response) => {
                const loadedInstitutions = getInstitutions(response.data).map(normalizeInstitution);
                if (!ignore) setInstitutions(loadedInstitutions);
            })
            .catch((loadError) => {
                console.error("Error al cargar las instituciones:", loadError);
                if (!ignore) setError(getErrorMessage(loadError, "No se pudieron cargar las instituciones."));
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, []);

    const clearLogoPreview = () => {
        if (logoPreviewUrl.current) URL.revokeObjectURL(logoPreviewUrl.current);
        logoPreviewUrl.current = "";
        setLogoPreview("");
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingInstitution(null);
        setForm(emptyInstitution);
        setLogo(null);
        clearLogoPreview();
    };

    const openCreateModal = () => {
        setEditingInstitution(null);
        setForm(emptyInstitution);
        setLogo(null);
        clearLogoPreview();
        setError("");
        setModalOpen(true);
    };

    const openEditModal = (institution) => {
        setEditingInstitution(institution);
        setForm({
            name_institution: institution.name_institution || "",
            email_institution: institution.email_institution || "",
            phone_institution: institution.phone_institution || "",
            address_institution: institution.address_institution || "",
            description_institution: institution.description_institution || "",
            nit: institution.nit || "",
            city: institution.city || "",
            class_start_date: institution.class_start_date || "",
            class_end_date: institution.class_end_date || "",
        });
        setLogo(null);
        clearLogoPreview();
        setError("");
        setModalOpen(true);
    };

    const handleLogoChange = (event) => {
        const selectedLogo = event.target.files?.[0] || null;
        clearLogoPreview();
        setLogo(selectedLogo);

        if (selectedLogo) {
            logoPreviewUrl.current = URL.createObjectURL(selectedLogo);
            setLogoPreview(logoPreviewUrl.current);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const uploadLogo = async (file) => {
        if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
            throw new Error("Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET.");
        }

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", cloudinaryUploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudinaryCloudName)}/image/upload`,
            { method: "POST", body: uploadData },
        );
        const result = await response.json();

        if (!response.ok || !result.secure_url || !result.public_id) {
            throw new Error(result.error?.message || "Cloudinary no pudo subir el logo.");
        }

        return {
            imagen_url: result.secure_url,
            imagen_public_id: result.public_id,
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const imageData = logo
                ? await uploadLogo(logo)
                : {
                    imagen_url: editingInstitution?.imagen_url || "",
                    imagen_public_id: editingInstitution?.imagen_public_id || "",
                };

            if (!editingInstitution && !logo) {
                throw new Error("Selecciona el logo de la institución.");
            }

            const payload = { ...form, ...imageData };

            if (editingInstitution) {
                await api.put(`/institutions/${editingInstitution.id}`, payload);
            } else {
                await api.post("/institutions/store", payload);
            }

            closeModal();
            await loadInstitutions();
        } catch (saveError) {
            console.error("Error al guardar la institución:", saveError);
            setError(getErrorMessage(saveError, "No se pudo guardar la institución."));
        } finally {
            setSaving(false);
        }
    };

    const deleteInstitution = async (institution) => {
        if (!window.confirm(`¿Eliminar la institución "${institution.name_institution}"? Esta acción no se puede deshacer.`)) return;

        setDeletingId(institution.id);
        setError("");
        try {
            await api.delete(`/institutions/${institution.id}`);
            setInstitutions((current) => current.filter((item) => item.id !== institution.id));
        } catch (deleteError) {
            console.error("Error al eliminar la institución:", deleteError);
            setError(getErrorMessage(deleteError, "No se pudo eliminar la institución."));
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-50 px-5 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-800">
                            <i className="bi bi-buildings" aria-hidden="true" />
                            Administración
                        </span>
                        <h1 className="m-0 text-3xl font-bold tracking-tight text-slate-900">Instituciones</h1>
                        <p className="mb-0 mt-2 text-sm leading-6 text-slate-500">
                            Consulta y administra las instituciones registradas en la plataforma.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-700/20 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/30"
                    >
                        <i className="bi bi-plus-lg" aria-hidden="true" />
                        Crear institución
                    </button>
                </header>

                {error && (
                    <div role="alert" className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>
                        {!modalOpen && (
                            <button type="button" onClick={loadInstitutions} className="shrink-0 font-bold underline">
                                Reintentar
                            </button>
                        )}
                    </div>
                )}

                {loading ? (
                    <div role="status" className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                        Cargando instituciones...
                    </div>
                ) : institutions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <i className="bi bi-building text-4xl text-slate-300" aria-hidden="true" />
                        <h2 className="mt-4 text-lg font-semibold text-slate-800">Aún no hay instituciones</h2>
                        <p className="mt-2 text-sm text-slate-500">Crea la primera institución para que aparezca en esta lista.</p>
                        <button type="button" onClick={openCreateModal} className="mt-5 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700">
                            Crear institución
                        </button>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-5 py-4 font-semibold">Institución</th>
                                        <th className="px-5 py-4 font-semibold">NIT</th>
                                        <th className="px-5 py-4 font-semibold">Contacto</th>
                                        <th className="px-5 py-4 font-semibold">Ciudad</th>
                                        <th className="px-5 py-4 font-semibold">Calendario</th>
                                        <th className="px-5 py-4 text-right font-semibold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {institutions.map((institution) => (
                                        <tr key={institution.id} className="align-middle hover:bg-slate-50/70">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {institution.imagen_url ? (
                                                        <img src={institution.imagen_url} alt={`Logo de ${institution.name_institution}`} className="h-11 w-11 rounded-xl border border-slate-100 object-cover" />
                                                    ) : (
                                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                                                            <i className="bi bi-building" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="m-0 truncate font-semibold text-slate-800">{institution.name_institution}</p>
                                                        <p className="m-0 mt-1 max-w-xs truncate text-xs text-slate-500">{institution.address_institution}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-600">{institution.nit}</td>
                                            <td className="px-5 py-4">
                                                <p className="m-0 text-sm text-slate-700">{institution.email_institution}</p>
                                                <p className="m-0 mt-1 text-xs text-slate-500">{institution.phone_institution}</p>
                                            </td>
                                            <td className="px-5 py-4 text-sm text-slate-600">{institution.city}</td>
                                            <td className="px-5 py-4 text-xs leading-5 text-slate-600">
                                                <p className="m-0">Inicio: {institution.class_start_date || "—"}</p>
                                                <p className="m-0">Fin: {institution.class_end_date || "—"}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditModal(institution)}
                                                        aria-label={`Editar ${institution.name_institution}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                    >
                                                        <i className="bi bi-pencil" aria-hidden="true" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteInstitution(institution)}
                                                        disabled={deletingId === institution.id}
                                                        aria-label={`Eliminar ${institution.name_institution}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        <i className={`bi ${deletingId === institution.id ? "bi-arrow-repeat animate-spin" : "bi-trash3"}`} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                            {institutions.length} {institutions.length === 1 ? "institución registrada" : "instituciones registradas"}
                        </div>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4" role="presentation">
                    <section role="dialog" aria-modal="true" aria-labelledby="institution-modal-title" className="my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <div>
                                <h2 id="institution-modal-title" className="m-0 text-xl font-bold text-slate-900">
                                    {editingInstitution ? "Editar institución" : "Crear institución"}
                                </h2>
                                <p className="mb-0 mt-1 text-sm text-slate-500">Completa los datos de la institución.</p>
                            </div>
                            <button type="button" onClick={closeModal} disabled={saving} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                                <i className="bi bi-x-lg" aria-hidden="true" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass} htmlFor="institution-name">Nombre</label>
                                    <input id="institution-name" className={fieldClass} name="name_institution" value={form.name_institution} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-nit">NIT</label>
                                    <input id="institution-nit" className={fieldClass} name="nit" value={form.nit} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-email">Correo institucional</label>
                                    <input id="institution-email" className={fieldClass} type="email" name="email_institution" value={form.email_institution} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-phone">Teléfono</label>
                                    <input id="institution-phone" className={fieldClass} type="tel" name="phone_institution" value={form.phone_institution} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-city">Ciudad</label>
                                    <input id="institution-city" className={fieldClass} name="city" value={form.city} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-address">Dirección</label>
                                    <input id="institution-address" className={fieldClass} name="address_institution" value={form.address_institution} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-start-date">Inicio de clases</label>
                                    <input id="institution-start-date" className={fieldClass} type="date" name="class_start_date" value={form.class_start_date} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="institution-end-date">Fin de clases</label>
                                    <input id="institution-end-date" className={fieldClass} type="date" name="class_end_date" value={form.class_end_date} onChange={handleChange} min={form.class_start_date || undefined} required />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass} htmlFor="institution-description">Descripción</label>
                                    <textarea id="institution-description" className={`${fieldClass} min-h-24 resize-y`} name="description_institution" value={form.description_institution} onChange={handleChange} required />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass} htmlFor="institution-logo">{editingInstitution ? "Cambiar logo (opcional)" : "Logo de la institución"}</label>
                                    <input id="institution-logo" className={fieldClass} type="file" accept="image/*" onChange={handleLogoChange} required={!editingInstitution} />
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Vista previa del logo" className="mt-3 h-20 w-20 rounded-xl border border-slate-200 object-cover" />
                                    ) : editingInstitution?.imagen_url ? (
                                        <img src={editingInstitution.imagen_url} alt={`Logo de ${editingInstitution.name_institution}`} className="mt-3 h-20 w-20 rounded-xl border border-slate-200 object-cover" />
                                    ) : null}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={saving} className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? "Guardando..." : editingInstitution ? "Guardar cambios" : "Crear institución"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
};

export default RegistrarSede;
