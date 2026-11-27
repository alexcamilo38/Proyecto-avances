import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Config/env";
import { getApiErrorMessage, getCollection, getCurrentUserId } from "../Auth/authUtils";
import { getAuthSession } from "../../Config/auth";

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
};

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10";
const labelClass = "text-sm font-semibold text-slate-700";
const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const getUserFromResponse = (responseData) => {
  const user = responseData?.user_system
    || responseData?.data?.user_system
    || responseData?.data?.data
    || responseData?.data
    || responseData;

  if (!user || typeof user !== "object" || Array.isArray(user)) {
    throw new Error("El servidor devolvió una respuesta inesperada al consultar el perfil.");
  }
  return user;
};

const normalizeInstitution = (institution) => {
  if (!institution) return null;

  return {
    ...institution,
    name: institution.name_institution || institution.name || "",
    email: institution.email_institution || institution.email || "",
    phone: institution.phone_institution || institution.phone || "",
    address: institution.address_institution || institution.address || "",
  };
};

const getFormFromUser = (user) => ({
  ...emptyForm,
  first_name: user?.first_name || "",
  middle_name: user?.middle_name || "",
  last_name: user?.last_name || "",
  second_last_name: user?.second_last_name || "",
  document: user?.document || "",
  document_type: user?.document_type || "",
  phone: user?.phone || "",
  email: user?.email || "",
  username: user?.username || "",
});

const getFullName = (user) => [
  user?.first_name,
  user?.middle_name,
  user?.last_name,
  user?.second_last_name,
].filter(Boolean).join(" ") || user?.username || "Rector";

const isUserActive = (status) => {
  const normalized = String(status).toLowerCase();
  return status === true || status === 1 || ["1", "true", "active", "activo", "enabled", "habilitado"].includes(normalized);
};

const normalizeEnrollmentStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();
  if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobada";
  if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazada";
  if (["en_revision", "en revisión", "revision", "revisión", "review", "in_review"].includes(value)) return "En revisión";
  return "Pendiente";
};

const ProfileSection = ({ title, description, icon, details }) => (
  <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
    <div className="mb-6 flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
        <i className={`bi ${icon}`} aria-hidden="true" />
      </span>
      <div>
        <h2 className="m-0 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mb-0 mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
    <dl className="m-0 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {details.map(({ label, value, wide }) => (
        <div key={label} className={`min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 ${wide ? "sm:col-span-2" : ""}`}>
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
          <dd className="m-0 break-words text-sm font-semibold leading-6 text-slate-700">{value || "No registrado"}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const PerfilRec = () => {
  const [user, setUser] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [notice, setNotice] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      setLoading(true);
      setError("");
      setWarning("");

      try {
        const session = getAuthSession();
        const userId = getCurrentUserId() ?? session?.user?.id ?? session?.user?.user_system_id;
        if (userId == null) {
          throw new Error("No se encontró la sesión del rector. Cierra sesión e inicia nuevamente.");
        }

        const userResponse = await api.get(`/user-systems/${userId}`);
        const loadedUser = getUserFromResponse(userResponse.data);
        const institutionId = loadedUser.institution_id ?? loadedUser.institution?.id;
        const [institutionsResult, enrollmentsResult] = await Promise.allSettled([
          api.get("/institutions/list"),
          api.get("/enrollments/list"),
        ]);
        let loadedInstitution = normalizeInstitution(loadedUser.institution);
        let loadedApplications = [];
        const warnings = [];

        if (institutionsResult.status === "fulfilled") {
          try {
            const institutions = getCollection(institutionsResult.value.data, "institutions");
            loadedInstitution = normalizeInstitution(
              institutions.find((item) => String(item.id) === String(institutionId))
              || loadedInstitution,
            );
          } catch (parseError) {
            console.error("Error al leer las instituciones:", parseError);
            warnings.push("No se pudieron leer los datos institucionales completos.");
          }
        } else {
          console.error("Error al consultar las instituciones:", institutionsResult.reason);
          warnings.push("No se pudo consultar la información institucional.");
        }

        if (enrollmentsResult.status === "fulfilled") {
          try {
            const enrollments = getCollection(enrollmentsResult.value.data, "enrollments");
            loadedApplications = institutionId == null
              ? []
              : enrollments.filter((enrollment) => (
                String(enrollment.institution_id ?? enrollment.institution?.id) === String(institutionId)
              ));
          } catch (parseError) {
            console.error("Error al leer las matrículas:", parseError);
            warnings.push("No se pudo cargar el resumen de matrículas.");
          }
        } else {
          console.error("Error al consultar las matrículas:", enrollmentsResult.reason);
          warnings.push("No se pudo cargar el resumen de matrículas.");
        }

        if (!ignore) {
          setUser(loadedUser);
          setForm(getFormFromUser(loadedUser));
          setInstitution(loadedInstitution);
          setApplications(loadedApplications);
          setWarning(warnings.join(" "));
        }
      } catch (loadError) {
        console.error("Error al cargar el perfil del rector:", loadError);
        if (!ignore) setError(getApiErrorMessage(loadError, "No se pudo cargar el perfil."));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProfile();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const startEditing = () => {
    setForm(getFormFromUser(user));
    setPhoto(null);
    setError("");
    setNotice("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setForm(getFormFromUser(user));
    setPhoto(null);
    setError("");
    setNotice("");
    setEditing(false);
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

  const saveProfile = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (form.password && form.password !== form.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);
    try {
      const uploadedPhoto = photo ? await uploadPhoto(photo) : null;
      const institutionId = user.institution_id ?? user.institution?.id;
      const roleId = user.rol_id ?? user.rol?.id ?? user.role?.id;
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
        status: isUserActive(user.status),
        institution_id: institutionId == null ? null : Number(institutionId),
        rol_id: roleId == null ? null : Number(roleId),
        photo_url: uploadedPhoto?.url || user.photo_url || "",
        photo_public_id: uploadedPhoto?.publicId || user.photo_public_id || "",
      };
      const requestPayload = { ...payload };
      if (form.password) {
        requestPayload.password = form.password;
        requestPayload.password_confirmation = form.password_confirmation;
      }

      await api.put(`/user-systems/${user.id}`, requestPayload);
      const updatedUser = { ...user, ...payload };
      setUser(updatedUser);
      setForm(getFormFromUser(updatedUser));
      setPhoto(null);
      setEditing(false);
      setNotice("Tus datos se actualizaron correctamente.");
    } catch (saveError) {
      console.error("Error al actualizar el perfil del rector:", saveError);
      setError(getApiErrorMessage(saveError, "No se pudieron actualizar tus datos."));
    } finally {
      setSaving(false);
    }
  };

  const fullName = user ? getFullName(user) : "";
  const roleName = user?.rol?.name_role || user?.role?.name_role || (user?.rol_id ? `Rol ${user.rol_id}` : "Rector");
  const institutionName = institution?.name_institution
    || institution?.name
    || (user?.institution_id ? `Institución ${user.institution_id}` : "Sin institución asignada");
  const summary = {
    pending: applications.filter(({ status }) => normalizeEnrollmentStatus(status) === "Pendiente").length,
    inReview: applications.filter(({ status }) => normalizeEnrollmentStatus(status) === "En revisión").length,
    approved: applications.filter(({ status }) => normalizeEnrollmentStatus(status) === "Aprobada").length,
  };
  const userDetails = [
    { label: "Nombre completo", value: fullName, wide: true },
    { label: "Tipo de documento", value: user?.document_type },
    { label: "Número de documento", value: user?.document },
    { label: "Teléfono", value: user?.phone },
    { label: "Correo electrónico", value: user?.email },
    { label: "Nombre de usuario", value: user?.username },
    { label: "Cargo", value: roleName },
  ];
  const institutionDetails = [
    { label: "Institución", value: institutionName, wide: true },
    { label: "NIT", value: institution?.nit },
    { label: "Teléfono", value: institution?.phone },
    { label: "Correo institucional", value: institution?.email, wide: true },
    { label: "Dirección", value: institution?.address, wide: true },
  ];

  return (
    <main className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] bg-slate-50 px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-6xl space-y-6">
        {error && user && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {warning && <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{warning}</div>}
        {notice && <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}

        <header className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
          {loading ? (
            <p role="status" className="m-0 py-5 text-center text-sm text-slate-500">Cargando perfil...</p>
          ) : user ? (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {user.photo_url ? (
                <img src={user.photo_url} alt={`Foto de ${fullName}`} className="h-24 w-24 rounded-2xl object-cover" />
              ) : (
                <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-3xl font-bold text-violet-700">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                  <i className="bi bi-building-fill-check" aria-hidden="true" />
                  Perfil rector
                </span>
                <h1 className="m-0 break-words text-3xl font-semibold tracking-tight text-slate-900">{fullName}</h1>
                <p className="mb-0 mt-2 text-sm text-slate-500">{user.email} · @{user.username}</p>
                <p className="mb-0 mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <i className="bi bi-building text-violet-500" aria-hidden="true" />
                  {institutionName}
                </p>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${isUserActive(user.status) ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                <span className={`h-2 w-2 rounded-full ${isUserActive(user.status) ? "bg-emerald-500" : "bg-slate-400"}`} />
                {isUserActive(user.status) ? "Cuenta activa" : "Cuenta inactiva"}
              </span>
              {!editing && (
                <button type="button" onClick={startEditing} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/30">
                  <i className="bi bi-pencil" aria-hidden="true" />
                  Actualizar datos
                </button>
              )}
            </div>
          ) : (
            <div role="alert" className="text-sm text-red-700">
              <p className="mb-3">{error || "No se pudo cargar el perfil."}</p>
              <div className="flex flex-wrap gap-4">
                <button type="button" onClick={() => setReloadKey((key) => key + 1)} className="font-semibold underline">Reintentar</button>
                <Link to="/login" className="font-semibold text-violet-700 underline">Ir al inicio de sesión</Link>
              </div>
            </div>
          )}
        </header>

        {user && (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
            {editing ? (
              <form onSubmit={saveProfile} className="space-y-6">
                <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
                  <div className="mb-6 flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600"><i className="bi bi-person-vcard" aria-hidden="true" /></span>
                    <div><h2 className="m-0 text-lg font-semibold text-slate-900">Datos de la cuenta</h2><p className="mb-0 mt-1 text-sm text-slate-500">Actualiza tu información personal y de contacto.</p></div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className={labelClass}>Primer nombre<input className={fieldClass} name="first_name" value={form.first_name} onChange={handleChange} autoComplete="given-name" required /></label>
                    <label className={labelClass}>Segundo nombre<input className={fieldClass} name="middle_name" value={form.middle_name} onChange={handleChange} autoComplete="additional-name" /></label>
                    <label className={labelClass}>Primer apellido<input className={fieldClass} name="last_name" value={form.last_name} onChange={handleChange} autoComplete="family-name" required /></label>
                    <label className={labelClass}>Segundo apellido<input className={fieldClass} name="second_last_name" value={form.second_last_name} onChange={handleChange} /></label>
                    <label className={labelClass}>Tipo de documento
                      <select className={fieldClass} name="document_type" value={form.document_type} onChange={handleChange} required>
                        <option value="" disabled>Selecciona un tipo</option>
                        <option value="CC">Cédula de ciudadanía</option><option value="TI">Tarjeta de identidad</option><option value="CE">Cédula de extranjería</option><option value="RC">Registro civil</option><option value="PP">Pasaporte</option>
                      </select>
                    </label>
                    <label className={labelClass}>Número de documento<input className={fieldClass} name="document" value={form.document} onChange={handleChange} required /></label>
                    <label className={labelClass}>Teléfono<input className={fieldClass} type="tel" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" required /></label>
                    <label className={labelClass}>Correo electrónico<input className={fieldClass} type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" required /></label>
                    <label className={labelClass}>Nombre de usuario<input className={fieldClass} name="username" value={form.username} onChange={handleChange} autoComplete="username" required /></label>
                    <label className={`${labelClass} sm:col-span-2`}>Foto de perfil
                      <input className={fieldClass} type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
                      <span className="mt-1 block text-xs font-normal text-slate-500">Opcional. Si no seleccionas una imagen, se conservará la foto actual.</span>
                    </label>
                  </div>
                </section>
                <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
                  <div className="mb-6 flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600"><i className="bi bi-shield-check" aria-hidden="true" /></span>
                    <div><h2 className="m-0 text-lg font-semibold text-slate-900">Seguridad</h2><p className="mb-0 mt-1 text-sm text-slate-500">Deja estos campos vacíos para conservar tu contraseña actual.</p></div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className={labelClass}>Nueva contraseña<input className={fieldClass} type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" minLength="8" /></label>
                    <label className={labelClass}>Confirmar nueva contraseña<input className={fieldClass} type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} autoComplete="new-password" minLength="8" required={Boolean(form.password)} /></label>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
                    <button type="button" onClick={cancelEditing} disabled={saving} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">Cancelar</button>
                    <button type="submit" disabled={saving} className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Guardando..." : "Guardar cambios"}</button>
                  </div>
                </section>
              </form>
            ) : (
              <div className="space-y-6">
                <ProfileSection title="Datos registrados" description="Información personal y de contacto asociada a tu cuenta." icon="bi-person-vcard" details={userDetails} />
                <ProfileSection title="Institución vinculada" description="Datos institucionales registrados para tu gestión." icon="bi-building" details={institutionDetails} />
              </div>
            )}

            <aside className="space-y-6">
              <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                <div className="mb-5 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600"><i className="bi bi-graph-up" aria-hidden="true" /></span>
                  <div><h2 className="m-0 text-lg font-semibold text-slate-900">Mi actividad</h2><p className="mb-0 mt-1 text-sm text-slate-500">Resumen de matrículas de tu institución.</p></div>
                </div>
                <dl className="m-0 space-y-3">
                  {[["Pendientes", summary.pending], ["En revisión", summary.inReview], ["Aprobadas", summary.approved]].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                      <dt className="text-sm text-slate-600">{label}</dt><dd className="m-0 text-lg font-bold text-slate-900">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link to="/RevisarMa" className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 no-underline transition hover:bg-violet-100">Revisar solicitudes<i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
              </section>
              <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                <div className="mb-5 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600"><i className="bi bi-shield-check" aria-hidden="true" /></span>
                  <div><h2 className="m-0 text-lg font-semibold text-slate-900">Acceso y seguridad</h2><p className="mb-0 mt-1 text-sm text-slate-500">Rol e institución asociados a tu cuenta.</p></div>
                </div>
                <dl className="m-0 space-y-3">
                  <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Cargo</dt><dd className="mb-0 mt-1 text-sm font-semibold text-slate-700">{roleName}</dd></div>
                  <div className="rounded-xl bg-slate-50 p-4"><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Institución</dt><dd className="mb-0 mt-1 text-sm font-semibold text-slate-700">{institutionName}</dd></div>
                </dl>
                <Link to="/ReperaContra" className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 no-underline transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700">Cambiar contraseña<i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default PerfilRec;
