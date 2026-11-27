import { useEffect, useState } from "react";
import api from "../../Config/env";
import { getApiErrorMessage, getCollection, getCurrentUserId, getDashboardPath } from "../Auth/authUtils";

const emptyForm = {
    first_name: "",
    middle_name: "",
    last_name: "",
    second_last_name: "",
    document: "",
    document_type: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    institution_id: "",
    rol_id: "",
    status: "1",
    photo_url: "",
    photo_public_id: "",
};

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const getUser = (responseData) => {
    const user = responseData?.user_system
        || responseData?.data?.user_system
        || responseData?.data?.data
        || responseData?.data
        || responseData;

    if (!user || typeof user !== "object" || Array.isArray(user)) {
        throw new Error("El servidor devolvió una respuesta inesperada al consultar el usuario.");
    }
    return user;
};

const getStatusValue = (status) => {
    const normalized = String(status).toLowerCase();
    return status === true || status === 1 || ["1", "true", "active", "activo", "enabled", "habilitado"].includes(normalized)
        ? "1"
        : "0";
};

const getFullName = (user) => [
    user.first_name,
    user.middle_name,
    user.last_name,
    user.second_last_name,
].filter(Boolean).join(" ");

const getUserRole = (user, roles) => {
    const role = user.rol ?? user.role;
    if (getDashboardPath(role)) return role;
    const roleId = user.rol_id ?? user.role_id ?? role?.id ?? role;
    return roles.find((item) => String(item.id) === String(roleId));
};

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [photo, setPhoto] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const currentUserId = getCurrentUserId();

    const loadData = async () => {
        setLoading(true);
        setError("");
        try {
            const [usersResponse, rolesResponse, institutionsResponse] = await Promise.all([
                api.get("/user-systems/list"),
                api.get("/rols/list"),
                api.get("/institutions/list"),
            ]);
            setUsers(getCollection(usersResponse.data, "user_systems"));
            setRoles(getCollection(rolesResponse.data, "roles"));
            setInstitutions(getCollection(institutionsResponse.data, "institutions"));
        } catch (loadError) {
            console.error("Error al cargar usuarios:", loadError);
            setError(getApiErrorMessage(loadError, "No se pudieron cargar los usuarios."));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let ignore = false;

        const loadInitialData = async () => {
            setLoading(true);
            setError("");
            try {
                const [usersResponse, rolesResponse, institutionsResponse] = await Promise.all([
                    api.get("/user-systems/list"),
                    api.get("/rols/list"),
                    api.get("/institutions/list"),
                ]);
                const loadedUsers = getCollection(usersResponse.data, "user_systems");
                const loadedRoles = getCollection(rolesResponse.data, "roles");
                const loadedInstitutions = getCollection(institutionsResponse.data, "institutions");
                if (!ignore) {
                    setUsers(loadedUsers);
                    setRoles(loadedRoles);
                    setInstitutions(loadedInstitutions);
                }
            } catch (loadError) {
                console.error("Error al cargar usuarios:", loadError);
                if (!ignore) setError(getApiErrorMessage(loadError, "No se pudieron cargar los usuarios."));
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadInitialData();
        return () => {
            ignore = true;
        };
    }, []);

    const closeModal = () => {
        if (saving) return;
        setModalOpen(false);
        setEditingUser(null);
        setForm(emptyForm);
        setPhoto(null);
        setError("");
        setLoadingDetails(false);
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setForm(emptyForm);
        setPhoto(null);
        setError("");
        setModalOpen(true);
    };

    const openEditModal = async (user) => {
        setEditingUser(user);
        setPhoto(null);
        setError("");
        setModalOpen(true);
        setLoadingDetails(true);
        setForm({
            ...emptyForm,
            ...user,
            middle_name: user.middle_name || "",
            second_last_name: user.second_last_name || "",
            institution_id: user.institution_id ?? user.institution?.id ?? "",
            rol_id: user.rol_id ?? user.rol?.id ?? user.role?.id ?? "",
            status: getStatusValue(user.status),
            password: "",
            password_confirmation: "",
        });

        try {
            const response = await api.get(`/user-systems/${user.id}`);
            const details = getUser(response.data);
            setForm({
                ...emptyForm,
                ...details,
                middle_name: details.middle_name || "",
                second_last_name: details.second_last_name || "",
                institution_id: details.institution_id ?? details.institution?.id ?? "",
                rol_id: details.rol_id ?? details.rol?.id ?? details.role?.id ?? "",
                status: getStatusValue(details.status),
                password: "",
                password_confirmation: "",
            });
        } catch (detailError) {
            console.error("Error al consultar el usuario:", detailError);
            setError(getApiErrorMessage(detailError, "No se pudieron cargar los datos completos del usuario."));
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const uploadPhoto = async (file) => {
        if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
            throw new Error("Configura Cloudinary antes de subir una foto de perfil.");
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
            throw new Error(result.error?.message || "No se pudo subir la foto de perfil.");
        }
        return { url: result.secure_url, publicId: result.public_id };
    };

    const saveUser = async (event) => {
        event.preventDefault();
        if (form.password && form.password !== form.password_confirmation) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const uploadedPhoto = photo ? await uploadPhoto(photo) : null;
            const payload = {
                first_name: form.first_name.trim(),
                middle_name: form.middle_name.trim() || null,
                last_name: form.last_name.trim(),
                second_last_name: form.second_last_name.trim() || null,
                document: form.document.trim(),
                document_type: form.document_type,
                phone: form.phone.trim(),
                email: form.email.trim(),
                username: form.username.trim(),
                status: form.status === "1",
                institution_id: form.institution_id ? Number(form.institution_id) : null,
                rol_id: form.rol_id ? Number(form.rol_id) : null,
                photo_url: uploadedPhoto?.url || form.photo_url || "",
                photo_public_id: uploadedPhoto?.publicId || form.photo_public_id || "",
            };
            if (form.password) {
                payload.password = form.password;
                payload.password_confirmation = form.password_confirmation;
            }

            if (editingUser) {
                await api.put(`/user-systems/${editingUser.id}`, payload);
            } else {
                await api.post("/user-systems/store", payload);
            }

            setModalOpen(false);
            setEditingUser(null);
            setPhoto(null);
            await loadData();
        } catch (saveError) {
            console.error("Error al guardar el usuario:", saveError);
            setError(getApiErrorMessage(saveError, "No se pudo guardar el usuario."));
        } finally {
            setSaving(false);
        }
    };

    const deleteUser = async (user) => {
        if (!canDeleteUsers || String(user.id) === String(currentUserId)) return;

        setDeletingId(user.id);
        setError("");
        try {
            const [studentsResponse, teachersResponse] = await Promise.all([
                api.get("/students/list"),
                api.get("/teachers/list"),
            ]);
            const student = getCollection(studentsResponse.data, "students").find((item) => (
                String(item.user_system_id ?? item.user_system?.id ?? item.userSystem?.id) === String(user.id)
            ));
            const teacher = getCollection(teachersResponse.data, "teachers").find((item) => (
                String(item.user_system_id ?? item.user_system?.id ?? item.userSystem?.id) === String(user.id)
            ));

            if (student) {
                if (student.id == null) throw new Error("El estudiante asociado no tiene identificador.");
                await api.delete(`/students/${student.id}`);
            }
            if (teacher) {
                if (teacher.id == null) throw new Error("El docente asociado no tiene identificador.");
                await api.delete(`/teachers/${teacher.id}`);
            }
            await api.delete(`/user-systems/${user.id}`);
            setUsers((current) => current.filter((item) => item.id !== user.id));
            setUserToDelete(null);
        } catch (deleteError) {
            console.error("Error al eliminar el usuario:", deleteError);
            setError(getApiErrorMessage(deleteError, "No se pudo eliminar el usuario."));
        } finally {
            setDeletingId(null);
        }
    };

    const filteredUsers = users.filter((user) => {
        const query = searchTerm.trim().toLowerCase();
        const userRoleId = user.rol_id ?? user.rol?.id ?? user.role?.id;
        if (roleFilter === "none" && userRoleId != null) return false;
        if (roleFilter && roleFilter !== "none" && String(userRoleId ?? "") !== roleFilter) return false;
        if (!query) return true;
        const roleName = user.rol?.name_role || user.role?.name_role || "";
        const institutionName = user.institution?.name_institution || user.institution?.name || "";
        return [
            getFullName(user),
            user.document,
            user.email,
            user.username,
            user.phone,
            roleName,
            institutionName,
        ].some((value) => String(value || "").toLowerCase().includes(query));
    });

    const getRoleName = (user) => user.rol?.name_role
        || user.role?.name_role
        || roles.find((role) => String(role.id) === String(user.rol_id))?.name_role
        || "Sin rol";
    const getInstitutionName = (user) => user.institution?.name_institution
        || user.institution?.name
        || institutions.find((institution) => String(institution.id) === String(user.institution_id))?.name_institution
        || "Sin institución";
    const currentUser = users.find((user) => String(user.id) === String(currentUserId));
    const canDeleteUsers = currentUser && getDashboardPath(getUserRole(currentUser, roles)) === "/admin";

    return (
        <main className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] bg-slate-50 px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-800">
                            <i className="bi bi-people" aria-hidden="true" />
                            Administración
                        </span>
                        <h1 className="m-0 text-3xl font-bold tracking-tight text-slate-900">Usuarios del sistema</h1>
                        <p className="mb-0 mt-2 text-sm leading-6 text-slate-500">
                            Consulta y administra las cuentas, roles e instituciones de los usuarios.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-700/20 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/30"
                    >
                        <i className="bi bi-person-plus" aria-hidden="true" />
                        Crear usuario
                    </button>
                </header>

                {error && !modalOpen && !userToDelete && (
                    <div role="alert" className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>
                        <button type="button" onClick={loadData} className="shrink-0 font-bold underline">Reintentar</button>
                    </div>
                )}

                <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="m-0 text-lg font-bold text-slate-900">Listado de usuarios</h2>
                            <p className="mb-0 mt-1 text-sm text-slate-500">Busca por nombre, documento, correo, rol o institución.</p>
                        </div>
                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                                <i className="bi bi-funnel text-slate-400" aria-hidden="true" />
                                <select
                                    value={roleFilter}
                                    onChange={(event) => setRoleFilter(event.target.value)}
                                    aria-label="Filtrar usuarios por rol"
                                    className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none sm:min-w-44"
                                >
                                    <option value="">Todos los roles</option>
                                    <option value="none">Sin rol</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={String(role.id)}>
                                            {role.name_role || role.name || `Rol ${role.id}`}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 sm:max-w-sm">
                                <i className="bi bi-search text-slate-400" aria-hidden="true" />
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Buscar usuarios..."
                                    aria-label="Buscar usuarios"
                                    className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />
                            </label>
                        </div>
                    </div>

                    {loading ? (
                        <div role="status" className="p-8 text-center text-sm text-slate-500">Cargando usuarios...</div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="px-6 py-14 text-center">
                            <i className="bi bi-person-lines-fill text-4xl text-slate-300" aria-hidden="true" />
                            <h3 className="mt-4 text-lg font-semibold text-slate-800">
                                {users.length ? "No se encontraron usuarios" : "Aún no hay usuarios"}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                {users.length ? "Prueba con otro término de búsqueda." : "Crea el primer usuario para que aparezca en esta lista."}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[980px] text-left">
                                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                        <tr>
                                            <th className="px-5 py-4 font-semibold">Usuario</th>
                                            <th className="px-5 py-4 font-semibold">Documento</th>
                                            <th className="px-5 py-4 font-semibold">Contacto</th>
                                            <th className="px-5 py-4 font-semibold">Rol / institución</th>
                                            <th className="px-5 py-4 font-semibold">Estado</th>
                                            <th className="px-5 py-4 text-right font-semibold">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUsers.map((user) => {
                                            const active = getStatusValue(user.status) === "1";
                                            return (
                                                <tr key={user.id} className="hover:bg-slate-50/70">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            {user.photo_url ? (
                                                                <img src={user.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                                                            ) : (
                                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
                                                                    {(user.first_name || user.username || "?").charAt(0).toUpperCase()}
                                                                </span>
                                                            )}
                                                            <div>
                                                                <p className="m-0 font-semibold text-slate-800">{getFullName(user) || "—"}</p>
                                                                <p className="mb-0 mt-1 text-xs text-slate-500">@{user.username || "—"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        <span className="block">{user.document || "—"}</span>
                                                        <span className="text-xs text-slate-400">{user.document_type || ""}</span>
                                                    </td>
                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        <span className="block">{user.email || "—"}</span>
                                                        <span className="text-xs text-slate-400">{user.phone || "—"}</span>
                                                    </td>
                                                    <td className="px-5 py-4 text-sm text-slate-600">
                                                        <span className="block">{getRoleName(user)}</span>
                                                        <span className="text-xs text-slate-400">{getInstitutionName(user)}</span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                                            {active ? "Activo" : "Inactivo"}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(user)}
                                                                aria-label={`Editar ${getFullName(user) || user.username}`}
                                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                                                            >
                                                                <i className="bi bi-pencil" aria-hidden="true" />
                                                            </button>
                                                            {canDeleteUsers && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setError("");
                                                                        setUserToDelete(user);
                                                                    }}
                                                                    disabled={deletingId === user.id || String(user.id) === String(currentUserId)}
                                                                    aria-label={`Eliminar ${getFullName(user) || user.username}`}
                                                                    title={String(user.id) === String(currentUserId) ? "No puedes eliminar tu propio usuario." : undefined}
                                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
                                                                >
                                                                    <i className={`bi ${deletingId === user.id ? "bi-arrow-repeat animate-spin" : "bi-trash3"}`} aria-hidden="true" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                                {filteredUsers.length} {filteredUsers.length === 1 ? "usuario" : "usuarios"}
                            </div>
                        </>
                    )}
                </section>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
                    <section role="dialog" aria-modal="true" aria-labelledby="user-modal-title" className="my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <div>
                                <h2 id="user-modal-title" className="m-0 text-xl font-bold text-slate-900">
                                    {editingUser ? "Editar usuario" : "Crear usuario"}
                                </h2>
                                <p className="mb-0 mt-1 text-sm text-slate-500">Completa los datos de la cuenta del sistema.</p>
                            </div>
                            <button type="button" onClick={closeModal} disabled={saving} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50">
                                <i className="bi bi-x-lg" aria-hidden="true" />
                            </button>
                        </div>

                        <form onSubmit={saveUser} className="space-y-5 p-6">
                            {error && (
                                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
                            )}
                            {loadingDetails ? (
                                <p role="status" className="py-8 text-center text-sm text-slate-500">Cargando datos del usuario...</p>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <label className={labelClass}>Primer nombre
                                            <input className={`${fieldClass} mt-2`} name="first_name" value={form.first_name} onChange={handleChange} required />
                                        </label>
                                        <label className={labelClass}>Segundo nombre (opcional)
                                            <input className={`${fieldClass} mt-2`} name="middle_name" value={form.middle_name} onChange={handleChange} />
                                        </label>
                                        <label className={labelClass}>Primer apellido
                                            <input className={`${fieldClass} mt-2`} name="last_name" value={form.last_name} onChange={handleChange} required />
                                        </label>
                                        <label className={labelClass}>Segundo apellido (opcional)
                                            <input className={`${fieldClass} mt-2`} name="second_last_name" value={form.second_last_name} onChange={handleChange} />
                                        </label>
                                        <label className={labelClass}>Tipo de documento
                                            <select className={`${fieldClass} mt-2`} name="document_type" value={form.document_type} onChange={handleChange} required>
                                                <option value="" disabled>Selecciona un tipo</option>
                                                <option value="CC">Cédula de ciudadanía</option>
                                                <option value="TI">Tarjeta de identidad</option>
                                                <option value="CE">Cédula de extranjería</option>
                                                <option value="RC">Registro civil</option>
                                                <option value="PP">Pasaporte</option>
                                            </select>
                                        </label>
                                        <label className={labelClass}>Número de documento
                                            <input className={`${fieldClass} mt-2`} name="document" value={form.document} onChange={handleChange} required />
                                        </label>
                                        <label className={labelClass}>Teléfono
                                            <input className={`${fieldClass} mt-2`} type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                                        </label>
                                        <label className={labelClass}>Correo electrónico
                                            <input className={`${fieldClass} mt-2`} type="email" name="email" value={form.email} onChange={handleChange} required />
                                        </label>
                                        <label className={labelClass}>Nombre de usuario
                                            <input className={`${fieldClass} mt-2`} name="username" value={form.username} onChange={handleChange} required />
                                        </label>
                                        <label className={labelClass}>Rol
                                            <select className={`${fieldClass} mt-2`} name="rol_id" value={form.rol_id} onChange={handleChange}>
                                                <option value="">Sin rol</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.id}>{role.name_role || role.name || `Rol ${role.id}`}</option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className={labelClass}>Institución
                                            <select className={`${fieldClass} mt-2`} name="institution_id" value={form.institution_id} onChange={handleChange}>
                                                <option value="">Sin institución</option>
                                                {institutions.map((institution) => (
                                                    <option key={institution.id} value={institution.id}>
                                                        {institution.name_institution || institution.name || `Institución ${institution.id}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className={labelClass}>Estado
                                            <select className={`${fieldClass} mt-2`} name="status" value={form.status} onChange={handleChange} required>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>
                                            </select>
                                        </label>
                                        <label className={labelClass}>Contraseña {editingUser ? "(opcional)" : ""}
                                            <input
                                                className={`${fieldClass} mt-2`}
                                                type="password"
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                                minLength="8"
                                                required={!editingUser}
                                            />
                                        </label>
                                        <label className={labelClass}>Confirmar contraseña
                                            <input
                                                className={`${fieldClass} mt-2`}
                                                type="password"
                                                name="password_confirmation"
                                                value={form.password_confirmation}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                                minLength="8"
                                                required={!editingUser || Boolean(form.password)}
                                            />
                                        </label>
                                        <label className={`${labelClass} sm:col-span-2`}>Foto de perfil (opcional)
                                            <input className={`${fieldClass} mt-2`} type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
                                            {form.photo_url && <span className="mt-2 block text-xs font-normal text-slate-500">Se conservará la foto actual si no seleccionas otra.</span>}
                                        </label>
                                    </div>
                                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                                        <button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                                            Cancelar
                                        </button>
                                        <button type="submit" disabled={saving} className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60">
                                            {saving ? "Guardando..." : editingUser ? "Guardar cambios" : "Crear usuario"}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </section>
                </div>
            )}

            {userToDelete && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget && deletingId == null) {
                            setUserToDelete(null);
                            setError("");
                        }
                    }}
                >
                    <section
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-user-title"
                        aria-describedby="delete-user-description"
                        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl text-rose-600">
                            <i className="bi bi-trash3" aria-hidden="true" />
                        </div>
                        <h2 id="delete-user-title" className="mb-0 mt-4 text-xl font-bold text-slate-900">
                            ¿Eliminar usuario?
                        </h2>
                        <p id="delete-user-description" className="mb-0 mt-2 text-sm leading-6 text-slate-600">
                            ¿Eliminar este usuario? También se borrarán sus datos de estudiante o docente.
                        </p>
                        {error && (
                            <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    if (deletingId != null) return;
                                    setUserToDelete(null);
                                    setError("");
                                }}
                                disabled={deletingId != null}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => deleteUser(userToDelete)}
                                disabled={deletingId != null}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deletingId != null && <i className="bi bi-arrow-repeat animate-spin" aria-hidden="true" />}
                                {deletingId != null ? "Eliminando..." : "Sí, eliminar"}
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
};

export default Usuarios;
