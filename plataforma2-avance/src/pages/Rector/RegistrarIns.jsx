import { useEffect, useRef, useState } from "react";
import api from "../../Config/env";
import { getAuthSession, saveAuthSession } from "../../Config/auth";
import { getCurrentUserId } from "../Auth/authUtils";
import CampusManager from "../Administrador/CampusManager";

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
  logo_url: institution.logo_url || "",
  logo_public_id: institution.logo_public_id || "",
  imagen_url: institution.imagen_url || "",
  imagen_public_id: institution.imagen_public_id || "",
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

const getUser = (responseData) => {
  const user = responseData?.user_system
    || responseData?.user
    || responseData?.data?.user_system
    || responseData?.data?.user
    || responseData?.data?.data
    || responseData?.data
    || responseData;

  if (!user || typeof user !== "object" || Array.isArray(user)) {
    throw new Error("El servidor devolvió una respuesta inesperada al consultar el usuario.");
  }
  return user;
};

const requestInstitution = async () => {
  const session = getAuthSession();
  const userId = getCurrentUserId()
    ?? session?.user?.id
    ?? session?.user?.user_system_id;
  if (userId == null) {
    throw new Error("No se encontró la sesión del rector para consultar su institución.");
  }

  const userResponse = await api.get(`/user-systems/${userId}`);
  const user = getUser(userResponse.data);
  const institutionId = user.institution_id ?? user.institution?.id;
  if (session) {
    saveAuthSession({ ...session, user: { ...session.user, ...user } });
  }
  if (institutionId == null) return null;

  const response = await api.get("/institutions/list");
  const institutions = getInstitutions(response.data);
  const institution = institutions.find((item) => String(item.id) === String(institutionId));
  if (institution) return normalizeInstitution(institution);
  return user.institution?.id != null ? normalizeInstitution(user.institution) : null;
};

const getErrorMessage = (error, fallback) => {
  const validationErrors = error.response?.data?.errors;
  const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

  return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const getCreatedInstitution = async (responseData, nit) => {
  const responseInstitution = responseData?.institution
    || responseData?.data?.institution
    || responseData?.data
    || responseData;

  if (responseInstitution?.id != null) return normalizeInstitution(responseInstitution);

  const institutionsResponse = await api.get("/institutions/list");
  const institutions = getInstitutions(institutionsResponse.data);
  const createdInstitution = institutions.find((institution) => String(institution.nit) === String(nit));
  return createdInstitution ? normalizeInstitution(createdInstitution) : null;
};

const assignInstitutionToCurrentUser = async (institution) => {
  const session = getAuthSession();
  const userId = getCurrentUserId()
    ?? session?.user?.id
    ?? session?.user?.user_system_id;
  if (userId == null) {
    throw new Error("No se encontró la sesión del rector para asociar la institución.");
  }

  const response = await api.get(`/user-systems/${userId}`);
  const user = getUser(response.data);
  const roleId = user.rol_id ?? user.rol?.id ?? user.role?.id;
  const payload = {
    first_name: user.first_name,
    middle_name: user.middle_name || null,
    last_name: user.last_name,
    second_last_name: user.second_last_name || null,
    document: user.document,
    document_type: user.document_type,
    phone: user.phone,
    email: user.email,
    username: user.username,
    status: user.status ?? true,
    institution_id: Number(institution.id),
    ...(roleId == null ? {} : { rol_id: Number(roleId) }),
    photo_url: user.photo_url || "",
    photo_public_id: user.photo_public_id || "",
  };

  await api.put(`/user-systems/${userId}`, payload);
  if (session) {
    saveAuthSession({
      ...session,
      user: {
        ...session.user,
        ...user,
        institution_id: Number(institution.id),
        institution,
      },
    });
  }
};

const uploadInstitutionImage = async (file, label) => {
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
    throw new Error(result.error?.message || `Cloudinary no pudo subir ${label}.`);
  }

  return { url: result.secure_url, publicId: result.public_id };
};

const RegistrarIns = () => {
  const [institution, setInstitution] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [institutionImage, setInstitutionImage] = useState(null);
  const [institutionImagePreview, setInstitutionImagePreview] = useState("");
  const previewUrls = useRef({ logo: "", institutionImage: "" });
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const urls = previewUrls.current;
    return () => {
      Object.values(urls).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const loadInstitution = async () => {
    setLoading(true);
    setLoadFailed(false);
    setError("");

    try {
      setInstitution(await requestInstitution());
    } catch (loadError) {
      console.error("Error al consultar las instituciones:", loadError);
      setLoadFailed(true);
      setError(getErrorMessage(loadError, "No se pudieron cargar las instituciones."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    requestInstitution()
      .then((loadedInstitution) => {
        if (!ignore) {
          setInstitution(loadedInstitution);
          setLoadFailed(false);
        }
      })
      .catch((loadError) => {
        console.error("Error al consultar las instituciones:", loadError);
        if (!ignore) {
          setLoadFailed(true);
          setError(getErrorMessage(loadError, "No se pudieron cargar las instituciones."));
        }
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

  const clearImagePreviews = () => {
    Object.entries(previewUrls.current).forEach(([key, url]) => {
      if (url) URL.revokeObjectURL(url);
      previewUrls.current[key] = "";
    });
    setLogoPreview("");
    setInstitutionImagePreview("");
  };

  const handleImageChange = (event, imageType) => {
    const selectedImage = event.target.files?.[0] || null;
    const currentPreviewUrl = previewUrls.current[imageType];
    if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);

    const previewUrl = selectedImage ? URL.createObjectURL(selectedImage) : "";
    previewUrls.current[imageType] = previewUrl;
    if (imageType === "logo") {
      setLogo(selectedImage);
      setLogoPreview(previewUrl);
    } else {
      setInstitutionImage(selectedImage);
      setInstitutionImagePreview(previewUrl);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setLogo(null);
    setInstitutionImage(null);
    clearImagePreviews();
  };

  const startEditing = () => {
    setError("");
    setNotice("");
    setForm({
      name_institution: institution.name_institution || "",
      email_institution: institution.email_institution || "",
      phone_institution: institution.phone_institution || "",
      address_institution: institution.address_institution || "",
      description_institution: institution.description_institution || "",
      nit: institution.nit || "",
      city: institution.city || "",
      class_start_date: institution.class_start_date?.slice(0, 10) || "",
      class_end_date: institution.class_end_date?.slice(0, 10) || "",
    });
    setLogo(null);
    setInstitutionImage(null);
    clearImagePreviews();
    setIsEditing(true);
  };

  const cancelEditing = () => {
    resetForm();
    setIsEditing(false);
    setError("");
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar la institución "${institution.name}"? Esta acción no se puede deshacer.`)) return;

    setDeleting(true);
    setError("");
    setNotice("");

    try {
      await api.delete(`/institutions/${institution.id}`);
      setInstitution(null);
      setIsEditing(false);
      resetForm();
      setNotice("La institución se eliminó correctamente.");
    } catch (deleteError) {
      console.error("Error al eliminar la institución:", deleteError);
      setError(getErrorMessage(deleteError, "No se pudo eliminar la institución."));
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if ((!logo && !institution?.logo_url) || (!institutionImage && !institution?.imagen_url)) {
      setError("Selecciona el logo y la imagen representativa de la institución.");
      return;
    }

    setSubmitting(true);

    try {
      const [logoData, imageData] = await Promise.all([
        logo
          ? uploadInstitutionImage(logo, "el logo")
          : Promise.resolve({
            url: institution?.logo_url || "",
            publicId: institution?.logo_public_id || "",
          }),
        institutionImage
          ? uploadInstitutionImage(institutionImage, "la imagen representativa")
          : Promise.resolve({
            url: institution?.imagen_url || "",
            publicId: institution?.imagen_public_id || "",
          }),
      ]);

      const payload = {
        ...form,
        logo_url: logoData.url,
        logo_public_id: logoData.publicId,
        imagen_url: imageData.url,
        imagen_public_id: imageData.publicId,
      };

      if (institution) {
        const response = await api.put(`/institutions/${institution.id}`, payload);
        const updatedInstitution = response.data?.institution || response.data?.data || {
        ...institution,
        ...payload,
        };
        setInstitution(normalizeInstitution(updatedInstitution));
        setNotice("Los datos de la institución se actualizaron correctamente.");
      } else {
        const response = await api.post("/institutions/store", payload);
        const normalizedInstitution = await getCreatedInstitution(response.data, payload.nit);
        if (!normalizedInstitution?.id) {
          throw new Error("La institución se creó, pero no se pudo identificar para asociarla a tu cuenta.");
        }
        try {
          await assignInstitutionToCurrentUser(normalizedInstitution);
        } catch (assignmentError) {
          throw new Error(
            `La institución se creó, pero no se pudo asociar a tu cuenta: ${getErrorMessage(assignmentError, "error desconocido")}`,
            { cause: assignmentError },
          );
        }
        setInstitution(normalizedInstitution);
        setNotice("La institución se registró correctamente.");
      }

      resetForm();
      setIsEditing(false);
    } catch (submitError) {
      console.error("Error al guardar la institución:", submitError);
      setError(getErrorMessage(submitError, "No se pudieron guardar los datos de la institución."));
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
              ? isEditing
                ? "Actualiza la información de tu institución y sus imágenes."
                : "La institución asociada a tu cuenta y sus datos registrados."
              : "Registra una sola institución para habilitar la gestión de matrículas y estudiantes."}
          </p>
        </header>

        {notice && (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {notice}
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div role="status" className="rounded-3xl border border-slate-100 bg-white p-8 text-sm text-slate-500 shadow-sm">
            Cargando información de instituciones...
          </div>
        ) : loadFailed && !institution ? (
          <button type="button" onClick={loadInstitution} className="rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white hover:bg-violet-800">
            Reintentar consulta
          </button>
        ) : institution && !isEditing ? (
          <>
          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
            <div className="bg-gradient-to-r from-violet-700 to-indigo-800 p-6 text-white sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    <i className="bi bi-patch-check-fill" aria-hidden="true" />
                    Institución registrada
                  </span>
                  <div className="mt-4 flex items-center gap-4">
                    {institution.logo_url && (
                      <img src={institution.logo_url} alt={`Logo de ${institution.name}`} className="h-16 w-16 rounded-full border-2 border-white/50 bg-white object-cover" />
                    )}
                    <h2 className="m-0 text-2xl font-bold sm:text-3xl">{institution.name}</h2>
                  </div>
                  <p className="mb-0 mt-3 flex items-center gap-2 text-sm text-violet-100">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                    {institution.address}{institution.city ? `, ${institution.city}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={startEditing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    <i className="bi bi-pencil" aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200/40 bg-red-500/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <i className={`bi ${deleting ? "bi-arrow-repeat animate-spin" : "bi-trash3"}`} aria-hidden="true" />
                    {deleting ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
            {institution.imagen_url && (
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <img
                  src={institution.imagen_url}
                  alt={`Imagen representativa de ${institution.name}`}
                  className="max-h-80 w-full rounded-2xl border border-slate-100 object-cover"
                />
              </div>
            )}
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
          {institution.id && (
            <CampusManager
              institutions={[institution]}
              uploadImage={uploadInstitutionImage}
              restrictToInstitutions
              accent="violet"
            />
          )}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-700">
                <i className="bi bi-building-add" aria-hidden="true" />
              </span>
              <div>
                <h2 className="m-0 text-lg font-semibold text-slate-900">
                  {isEditing ? "Editar institución" : "Datos institucionales"}
                </h2>
                <p className="mb-0 mt-1 text-sm text-slate-500">
                  {isEditing ? "Actualiza los datos oficiales de tu institución." : "Completa la información oficial de tu institución."}
                </p>
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
              <div>
                <label className={labelClass} htmlFor="institution-logo">
                  {isEditing ? "Cambiar logo (opcional)" : "Logo de la institución"}
                </label>
                <input
                  id="institution-logo"
                  className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-violet-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-violet-800`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, "logo")}
                  required={!institution?.logo_url}
                />
                {(logoPreview || (isEditing && institution?.logo_url)) && (
                  <img
                    src={logoPreview || institution.logo_url}
                    alt="Vista previa del logo"
                    className="mt-3 h-24 w-24 rounded-xl border border-slate-200 object-cover"
                  />
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-reference-image">
                  {isEditing ? "Cambiar imagen representativa (opcional)" : "Imagen representativa"}
                </label>
                <input
                  id="institution-reference-image"
                  className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-violet-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-violet-800`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, "institutionImage")}
                  required={!institution?.imagen_url}
                />
                {(institutionImagePreview || (isEditing && institution?.imagen_url)) && (
                  <img
                    src={institutionImagePreview || institution.imagen_url}
                    alt="Vista previa de la imagen representativa"
                    className="mt-3 h-24 w-full rounded-xl border border-slate-200 object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mt-7 flex flex-col-reverse justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
              <p className="m-0 max-w-lg text-xs leading-5 text-slate-500">
                Las imágenes se subirán a Cloudinary y los datos se guardarán en Laravel.
              </p>
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                )}
                <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60">
                  <i className={`bi ${submitting ? "bi-arrow-repeat animate-spin" : "bi-check2-circle"}`} aria-hidden="true" />
                  {submitting ? "Subiendo y guardando..." : isEditing ? "Guardar cambios" : "Registrar institución"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarIns;
