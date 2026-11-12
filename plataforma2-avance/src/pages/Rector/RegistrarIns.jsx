import { useEffect, useRef, useState } from "react";
import api from "../../Config/env";

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";
const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const emptyForm = {
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

const normalizeInstitution = (institution) => ({
  ...institution,
  name: institution.name_institution || institution.name || "",
  email: institution.email_institution || institution.email || "",
  phone: institution.phone_institution || institution.phone || "",
  address: institution.address_institution || institution.address || "",
  description: institution.description_institution || institution.description || "",
  city: institution.city || "",
  nit: institution.nit || "",
  imagen_url: institution.imagen_url || "",
  class_start_date: institution.class_start_date || "",
  class_end_date: institution.class_end_date || "",
});

const getInstitutions = (responseData) => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.institutions)) return responseData.institutions;
  if (responseData?.data && typeof responseData.data === "object") return [responseData.data];
  if (responseData?.institution) return [responseData.institution];

  throw new Error("El servidor devolvió una respuesta inesperada al consultar las instituciones.");
};

const requestInstitution = async () => {
  const response = await api.get("/institutions/list");
  const institutions = getInstitutions(response.data);
  return institutions[0] ? normalizeInstitution(institutions[0]) : null;
};

const getErrorMessage = (error, fallback) => {
  const validationErrors = error.response?.data?.errors;
  const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

  return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const RegistrarIns = () => {
  const [institution, setInstitution] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const logoPreviewUrl = useRef("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (logoPreviewUrl.current) URL.revokeObjectURL(logoPreviewUrl.current);
    };
  }, []);

  const loadInstitution = async () => {
    setLoading(true);
    setError("");

    try {
      setInstitution(await requestInstitution());
    } catch (loadError) {
      console.error("Error al consultar las instituciones:", loadError);
      setError(getErrorMessage(loadError, "No se pudieron cargar las instituciones."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    requestInstitution()
      .then((loadedInstitution) => {
        if (!ignore) setInstitution(loadedInstitution);
      })
      .catch((loadError) => {
        console.error("Error al consultar las instituciones:", loadError);
        if (!ignore) setError(getErrorMessage(loadError, "No se pudieron cargar las instituciones."));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleLogoChange = (event) => {
    const selectedLogo = event.target.files?.[0] || null;
    if (logoPreviewUrl.current) URL.revokeObjectURL(logoPreviewUrl.current);
    logoPreviewUrl.current = selectedLogo ? URL.createObjectURL(selectedLogo) : "";
    setLogo(selectedLogo);
    setLogoPreview(logoPreviewUrl.current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
      setError("Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET para subir el logo.");
      return;
    }

    if (!logo) {
      setError("Selecciona el logo de la institución.");
      return;
    }

    setSubmitting(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", logo);
      uploadData.append("upload_preset", cloudinaryUploadPreset);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudinaryCloudName)}/image/upload`,
        { method: "POST", body: uploadData },
      );
      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.secure_url || !uploadResult.public_id) {
        throw new Error(uploadResult.error?.message || "Cloudinary no pudo subir el logo.");
      }

      const payload = {
        ...form,
        imagen_url: uploadResult.secure_url,
        imagen_public_id: uploadResult.public_id,
      };
      const response = await api.post("/institutions/store", payload);
      const createdInstitution = response.data?.institution || response.data?.data || payload;

      setInstitution(normalizeInstitution(createdInstitution));
    } catch (submitError) {
      console.error("Error al registrar la institución:", submitError);
      setError(getErrorMessage(submitError, "No se pudo registrar la institución."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
            <i className="bi bi-building" aria-hidden="true" />
            Portal del rector
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {institution ? "Mi institución" : "Registrar institución"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {institution
              ? "La institución asociada a tu cuenta y sus datos registrados."
              : "Registra una sola institución para habilitar la gestión de matrículas y estudiantes."}
          </p>
        </header>

        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div role="status" className="rounded-3xl border border-slate-100 bg-white p-8 text-sm text-slate-500 shadow-sm">
            Cargando información de instituciones...
          </div>
        ) : error && !institution ? (
          <button type="button" onClick={loadInstitution} className="rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white hover:bg-violet-800">
            Reintentar consulta
          </button>
        ) : institution ? (
          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
            <div className="bg-gradient-to-r from-violet-700 to-indigo-800 p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <i className="bi bi-patch-check-fill" aria-hidden="true" />
                Institución registrada
              </span>
              <div className="mt-4 flex items-center gap-4">
                {institution.imagen_url && (
                  <img src={institution.imagen_url} alt={`Logo de ${institution.name}`} className="h-16 w-16 rounded-full border-2 border-white/50 object-cover" />
                )}
                <h2 className="m-0 text-2xl font-bold sm:text-3xl">{institution.name}</h2>
              </div>
              <p className="mb-0 mt-3 flex items-center gap-2 text-sm text-violet-100">
                <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                {institution.address}{institution.city ? `, ${institution.city}` : ""}
              </p>
            </div>
            <dl className="m-0 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8">
              {[
                ["NIT", institution.nit],
                ["Teléfono", institution.phone],
                ["Correo institucional", institution.email],
                ["Descripción", institution.description],
                ["Inicio de clases", institution.class_start_date],
                ["Fin de clases", institution.class_end_date],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <dt className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                  <dd className="m-0 break-words text-sm font-semibold leading-6 text-slate-700">{value || "—"}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-700">
                <i className="bi bi-building-add" aria-hidden="true" />
              </span>
              <div>
                <h2 className="m-0 text-lg font-semibold text-slate-900">Datos institucionales</h2>
                <p className="mb-0 mt-1 text-sm text-slate-500">Completa la información oficial de tu institución.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="institution-name">Nombre de la institución</label>
                <input id="institution-name" className={fieldClass} name="name_institution" value={form.name_institution} onChange={handleChange} placeholder="Institución Educativa" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-nit">NIT</label>
                <input id="institution-nit" className={fieldClass} name="nit" value={form.nit} onChange={handleChange} placeholder="900.123.456-7" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-email">Correo institucional</label>
                <input id="institution-email" className={fieldClass} type="email" name="email_institution" value={form.email_institution} onChange={handleChange} placeholder="contacto@institucion.edu.co" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-phone">Teléfono</label>
                <input id="institution-phone" className={fieldClass} type="tel" name="phone_institution" value={form.phone_institution} onChange={handleChange} placeholder="602 000 0000" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-city">Ciudad</label>
                <input id="institution-city" className={fieldClass} name="city" value={form.city} onChange={handleChange} placeholder="Ciudad" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-address">Dirección</label>
                <input id="institution-address" className={fieldClass} name="address_institution" value={form.address_institution} onChange={handleChange} placeholder="Dirección de la institución" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="class-start-date">Fecha de inicio de clases</label>
                <input id="class-start-date" className={fieldClass} type="date" name="class_start_date" value={form.class_start_date} onChange={handleChange} required />
              </div>
              <div>
                <label className={labelClass} htmlFor="class-end-date">Fecha de fin de clases</label>
                <input id="class-end-date" className={fieldClass} type="date" name="class_end_date" value={form.class_end_date} onChange={handleChange} min={form.class_start_date || undefined} required />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="institution-description">Descripción institucional</label>
                <textarea id="institution-description" className={`${fieldClass} min-h-28 resize-y`} name="description_institution" value={form.description_institution} onChange={handleChange} placeholder="Reseña, enfoque educativo y niveles ofrecidos" required />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="institution-logo">Logo de la institución</label>
                <input
                  id="institution-logo"
                  className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-violet-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-violet-800`}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  required
                />
                {logoPreview && <img src={logoPreview} alt="Vista previa del logo" className="mt-3 h-24 w-24 rounded-xl border border-slate-200 object-cover" />}
              </div>
            </div>
            <div className="mt-7 flex flex-col-reverse justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
              <p className="m-0 max-w-lg text-xs leading-5 text-slate-500">
                El logo se subirá a Cloudinary y los datos de la institución se guardarán en Laravel.
              </p>
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60">
                <i className={`bi ${submitting ? "bi-arrow-repeat animate-spin" : "bi-check2-circle"}`} aria-hidden="true" />
                {submitting ? "Subiendo y registrando..." : "Registrar institución"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarIns;
