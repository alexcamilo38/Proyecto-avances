import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoazul from "../../assets/LogoAzul.png";
import api from "../../Config/env";
import { findRole, getApiErrorMessage, getCollection, slugify } from "./authUtils";

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const rolesConfig = {
  admin: { title: "administrador", color: "sky", icon: "bi-shield-lock" },
  rector: { title: "rector", color: "violet", icon: "bi-building-fill-check" },
  teacher: { title: "docente", color: "emerald", icon: "bi-easel2" },
  student: { title: "estudiante", color: "orange", icon: "bi-mortarboard" },
};

const initialForm = {
  first_name: "",
  middle_name: "",
  last_name: "",
  second_last_name: "",
  document: "",
  document_type: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
  username: "",
  institution_id: "",
  specialty: "",
};

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";
const labelClass = "text-sm font-semibold text-slate-700";

const RegisterUserSystem = ({ roleKey }) => {
  const navigate = useNavigate();
  const config = rolesConfig[roleKey];
  const [form, setForm] = useState(initialForm);
  const [roles, setRoles] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [usernameEdited, setUsernameEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedRole = useMemo(() => findRole(roles, roleKey), [roles, roleKey]);

  useEffect(() => {
    let ignore = false;

    const loadFormOptions = async () => {
      setLoading(true);
      setError("");

      try {
        const [rolesResponse, institutionsResponse] = await Promise.all([
          api.get("/rols/list"),
          roleKey === "student" ? Promise.resolve(null) : api.get("/institutions/list"),
        ]);
        const loadedRoles = getCollection(rolesResponse.data, "roles");
        const loadedInstitutions = institutionsResponse
          ? getCollection(institutionsResponse.data, "institutions")
          : [];

        if (!ignore) {
          setRoles(loadedRoles);
          setInstitutions(loadedInstitutions);
          if (!findRole(loadedRoles, roleKey)) {
            setError(`No se encontró el rol de ${config.title}. Verifica que exista en el catálogo de roles.`);
          }
        }
      } catch (loadError) {
        console.error("Error al cargar opciones de registro:", loadError);
        if (!ignore) setError(getApiErrorMessage(loadError, "No se pudieron cargar los datos para el registro."));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadFormOptions();
    return () => {
      ignore = true;
    };
  }, [config.title, roleKey]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (!usernameEdited && (name === "first_name" || name === "last_name")) {
        next.username = slugify(`${next.first_name} ${next.last_name}`);
      }
      return next;
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!selectedRole) {
      setError(`No se encontró el rol de ${config.title}.`);
      return;
    }
    if (roleKey !== "student" && !institutions.some((institution) => String(institution.id) === form.institution_id)) {
      setError("Selecciona una institución válida.");
      return;
    }

    setSaving(true);
    try {
      const photoData = photo
        ? await uploadPhoto(photo)
        : { url: null, publicId: null };
      const payload = {
        first_name: form.first_name.trim(),
        middle_name: form.middle_name.trim() || null,
        last_name: form.last_name.trim(),
        second_last_name: form.second_last_name.trim() || null,
        document: form.document.trim(),
        document_type: form.document_type,
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.password_confirmation,
        photo_url: photoData.url,
        photo_public_id: photoData.publicId,
        username: form.username.trim() || slugify(`${form.first_name} ${form.last_name}`),
        status: true,
        institution_id: form.institution_id ? Number(form.institution_id) : null,
        rol_id: Number(selectedRole.id),
        ...(roleKey === "teacher" ? { specialty: form.specialty.trim() } : {}),
      };

      await api.post("/user-systems/store", payload);
      navigate("/login", {
        replace: true,
        state: { notice: "Tu cuenta fue creada. Inicia sesión para continuar." },
      });
    } catch (saveError) {
      console.error("Error al registrar usuario:", saveError);
      setError(getApiErrorMessage(saveError, "No se pudo crear la cuenta."));
    } finally {
      setSaving(false);
    }
  };

  if (!config) return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 px-4 py-8 sm:px-6">
      <section className="w-full max-w-3xl rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-blue-950/10 sm:p-9 lg:p-11">
        <header className="mb-8 text-center">
          <img src={logoazul} alt="EasyMatric" className="mx-auto mb-5 h-11 w-auto" />
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            <i className={`bi ${config.icon}`} aria-hidden="true" />
            Perfil {config.title}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Crear cuenta de {config.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Completa tus datos para registrar tu cuenta.
          </p>
        </header>

        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p role="status" className="py-8 text-center text-sm text-slate-500">Cargando roles e instituciones...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Primer nombre
                <input className={fieldClass} name="first_name" value={form.first_name} onChange={handleChange} autoComplete="given-name" required />
              </label>
              <label className={labelClass}>
                Segundo nombre (opcional)
                <input className={fieldClass} name="middle_name" value={form.middle_name} onChange={handleChange} autoComplete="additional-name" />
              </label>
              <label className={labelClass}>
                Primer apellido
                <input className={fieldClass} name="last_name" value={form.last_name} onChange={handleChange} autoComplete="family-name" required />
              </label>
              <label className={labelClass}>
                Segundo apellido (opcional)
                <input className={fieldClass} name="second_last_name" value={form.second_last_name} onChange={handleChange} />
              </label>
              <label className={labelClass}>
                Tipo de documento
                <select className={fieldClass} name="document_type" value={form.document_type} onChange={handleChange} required>
                  <option value="" disabled>Selecciona un tipo</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="CE">Cédula de extranjería</option>
                  <option value="RC">Registro civil</option>
                  <option value="PP">Pasaporte</option>
                </select>
              </label>
              <label className={labelClass}>
                Número de documento
                <input className={fieldClass} name="document" value={form.document} onChange={handleChange} autoComplete="off" required />
              </label>
              <label className={labelClass}>
                Teléfono
                <input className={fieldClass} type="tel" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" required />
              </label>
              <label className={labelClass}>
                Correo electrónico
                <input className={fieldClass} type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" required />
              </label>
              <label className={labelClass}>
                Nombre de usuario
                <input
                  className={fieldClass}
                  name="username"
                  value={form.username}
                  onChange={(event) => {
                    setUsernameEdited(true);
                    handleChange(event);
                  }}
                  autoComplete="username"
                  required
                />
              </label>
              {roleKey !== "student" && (
                <label className={labelClass}>
                  Institución
                  <select className={fieldClass} name="institution_id" value={form.institution_id} onChange={handleChange} required>
                    <option value="" disabled>Selecciona una institución</option>
                    {institutions.map((institution) => (
                      <option key={institution.id} value={institution.id}>
                        {institution.name_institution || institution.name || `Institución ${institution.id}`}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {roleKey === "teacher" && (
                <label className={labelClass}>
                  Especialidad
                  <input className={fieldClass} name="specialty" value={form.specialty} onChange={handleChange} required maxLength="255" />
                </label>
              )}
              <label className={labelClass}>
                Foto de perfil (opcional)
                <input className={fieldClass} type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] || null)} />
              </label>
              <label className={labelClass}>
                Contraseña
                <input className={fieldClass} type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" minLength="8" required />
              </label>
              <label className={labelClass}>
                Confirmar contraseña
                <input className={fieldClass} type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} autoComplete="new-password" minLength="8" required />
              </label>
            </div>

            <button type="submit" disabled={saving || !selectedRole} className="w-full rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        )}

        <footer className="mt-6 flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-5">
          <Link to="/SelecionRol" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Cambiar rol
          </Link>
          <Link to="/login" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Ya tengo cuenta
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default RegisterUserSystem;
