import { useEffect, useState } from "react";
import api from "../../Config/env";

const emptyRole = { name_role: "", slug: "", description: "" };
const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const getRoles = (responseData) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.roles)) return responseData.roles;
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error("El servidor devolvió una respuesta inesperada al consultar los roles.");
};

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const slugify = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [form, setForm] = useState(emptyRole);
    const [slugEdited, setSlugEdited] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const loadRoles = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/rols/list");
            setRoles(getRoles(response.data));
        } catch (loadError) {
            console.error("Error al cargar los roles:", loadError);
            setError(getErrorMessage(loadError, "No se pudieron cargar los roles."));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ignore = false;

        api.get("/rols/list")
            .then((response) => {
                const loadedRoles = getRoles(response.data);
                if (!ignore) setRoles(loadedRoles);
            })
            .catch((loadError) => {
                console.error("Error al cargar los roles:", loadError);
                if (!ignore) setError(getErrorMessage(loadError, "No se pudieron cargar los roles."));
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, []);

    const openCreateModal = () => {
        setEditingRole(null);
        setForm(emptyRole);
        setSlugEdited(false);
        setError("");
        setModalOpen(true);
    };

    const openEditModal = (role) => {
        setEditingRole(role);
        setForm({
            name_role: role.name_role || "",
            slug: role.slug || "",
            description: role.description || "",
        });
        setSlugEdited(true);
        setError("");
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingRole(null);
        setForm(emptyRole);
        setSlugEdited(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "name_role") {
            setForm((current) => ({
                ...current,
                name_role: value,
                slug: slugEdited ? current.slug : slugify(value),
            }));
            return;
        }

        if (name === "slug") setSlugEdited(true);
        setForm((current) => ({ ...current, [name]: value }));
    };

    const saveRole = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const payload = {
                name_role: form.name_role.trim(),
                slug: form.slug.trim(),
                description: form.description.trim(),
            };

            if (editingRole) {
                await api.put(`/rols/${editingRole.id}`, payload);
            } else {
                await api.post("/rols/store", payload);
            }

            closeModal();
            await loadRoles();
        } catch (saveError) {
            console.error("Error al guardar el rol:", saveError);
            setError(getErrorMessage(saveError, "No se pudo guardar el rol."));
        } finally {
            setSaving(false);
        }
    };

    const deleteRole = async (role) => {
        if (!window.confirm(`¿Eliminar el rol "${role.name_role}"? Esta acción no se puede deshacer.`)) return;

        setDeletingId(role.id);
        setError("");
        try {
            await api.delete(`/rols/${role.id}`);
            setRoles((current) => current.filter((item) => item.id !== role.id));
        } catch (deleteError) {
            console.error("Error al eliminar el rol:", deleteError);
            setError(getErrorMessage(deleteError, "No se pudo eliminar el rol."));
        } finally {
            setDeletingId(null);
        }
    };

    const filteredRoles = roles.filter((role) => (
        [role.name_role, role.slug, role.description]
            .some((value) => value?.toLowerCase().includes(searchTerm.toLowerCase()))
    ));

    return (
        <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] bg-slate-50 px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-800">
                            <i className="bi bi-shield-lock" aria-hidden="true" />
                            Administración
                        </span>
                        <h1 className="m-0 text-3xl font-bold tracking-tight text-slate-900">Roles y accesos</h1>
                        <p className="mb-0 mt-2 text-sm leading-6 text-slate-500">
                            Administra los perfiles de acceso y sus descripciones en la plataforma.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-700/20 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/30"
                    >
                        <i className="bi bi-plus-lg" aria-hidden="true" />
                        Crear rol
                    </button>
                </header>

                {error && (
                    <div role="alert" className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>
                        {!modalOpen && (
                            <button type="button" onClick={loadRoles} className="shrink-0 font-bold underline">
                                Reintentar
                            </button>
                        )}
                    </div>
                )}

                <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="m-0 text-lg font-bold text-slate-900">Listado de roles</h2>
                            <p className="mb-0 mt-1 text-sm text-slate-500">Consulta los nombres, identificadores y descripciones.</p>
                        </div>
                        <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 sm:max-w-sm">
                            <i className="bi bi-search text-slate-400" aria-hidden="true" />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Buscar roles..."
                                aria-label="Buscar roles"
                                className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </label>
                    </div>

                    {loading ? (
                        <div role="status" className="p-8 text-center text-sm text-slate-500">Cargando roles...</div>
                    ) : filteredRoles.length === 0 ? (
                        <div className="px-6 py-14 text-center">
                            <i className="bi bi-shield text-4xl text-slate-300" aria-hidden="true" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-800">
                                {roles.length ? "No se encontraron roles" : "Aún no hay roles"}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                {roles.length ? "Prueba con otro término de búsqueda." : "Crea el primer rol para que aparezca en esta lista."}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[780px] text-left">
                                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                        <tr>
                                            <th className="px-5 py-4 font-semibold">Rol</th>
                                            <th className="px-5 py-4 font-semibold">Slug</th>
                                            <th className="px-5 py-4 font-semibold">Descripción</th>
                                            <th className="px-5 py-4 font-semibold">Última edición</th>
                                            <th className="px-5 py-4 text-right font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredRoles.map((role) => (
                                            <tr key={role.id} className="hover:bg-slate-50/70">
                                                <td className="px-5 py-4">
                                                    <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800">
                                                        {role.name_role}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">{role.slug || "—"}</code>
                                                </td>
                                                <td className="max-w-md px-5 py-4 text-sm leading-6 text-slate-600">{role.description || "—"}</td>
                                                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                                                    {role.updated_at ? new Date(role.updated_at).toLocaleDateString() : "—"}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(role)}
                                                            aria-label={`Editar ${role.name_role}`}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                        >
                                                            <i className="bi bi-pencil" aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteRole(role)}
                                                            disabled={deletingId === role.id}
                                                            aria-label={`Eliminar ${role.name_role}`}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
                                                        >
                                                            <i className={`bi ${deletingId === role.id ? "bi-arrow-repeat animate-spin" : "bi-trash3"}`} aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                                {filteredRoles.length} {filteredRoles.length === 1 ? "rol" : "roles"}
                            </div>
                        </>
                    )}
                </section>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4" role="presentation">
                    <section role="dialog" aria-modal="true" aria-labelledby="role-modal-title" className="my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <div>
                                <h2 id="role-modal-title" className="m-0 text-xl font-bold text-slate-900">
                                    {editingRole ? "Editar rol" : "Crear rol"}
                                </h2>
                                <p className="mb-0 mt-1 text-sm text-slate-500">Define la información del perfil de acceso.</p>
                            </div>
                            <button type="button" onClick={closeModal} disabled={saving} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50">
                                <i className="bi bi-x-lg" aria-hidden="true" />
                            </button>
                        </div>

                        <form onSubmit={saveRole} className="space-y-5 p-6">
                            {error && (
                                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                            )}
                            <div>
                                <label className={labelClass} htmlFor="role-name">Nombre del rol</label>
                                <input
                                    id="role-name"
                                    className={fieldClass}
                                    name="name_role"
                                    value={form.name_role}
                                    onChange={handleChange}
                                    placeholder="Ej. Administrador"
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="role-slug">Slug</label>
                                <input
                                    id="role-slug"
                                    className={fieldClass}
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    placeholder="ej-administrador"
                                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                                    title="Usa letras minúsculas, números y guiones."
                                    required
                                />
                                <p className="mb-0 mt-1.5 text-xs text-slate-500">Se genera desde el nombre y puedes modificarlo.</p>
                            </div>
                            <div>
                                <label className={labelClass} htmlFor="role-description">Descripción</label>
                                <textarea
                                    id="role-description"
                                    className={`${fieldClass} min-h-28 resize-y`}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe las responsabilidades o el alcance del rol."
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                <button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={saving} className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">
                                    {saving ? "Guardando..." : editingRole ? "Guardar cambios" : "Crear rol"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Roles;
