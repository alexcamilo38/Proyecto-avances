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
  birth_date: "",
  gender: "",
  address: "",
  socieconomic_stratum: "",
  password: "",
  password_confirmation: "",
};

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";
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

const getEntity = (responseData, key) => {
  const data = responseData?.data?.data ?? responseData?.data ?? responseData;
  if (Array.isArray(data)) return data[0] ?? null;
  return data && Object.prototype.hasOwnProperty.call(data, key) ? data[key] : data;
};

const getFullName = (user) => [
  user?.first_name,
  user?.middle_name,
  user?.last_name,
  user?.second_last_name,
].filter(Boolean).join(" ") || user?.username || "Estudiante";

const getSocioeconomicStratum = (student) => (
  student?.socieconomic_stratum ?? student?.socioeconomic_stratum
);

const mergeStudentRecords = (primaryStudent, listedStudent) => {
  if (!primaryStudent) return listedStudent;
  if (!listedStudent) return primaryStudent;

  const mergedStudent = { ...primaryStudent, ...listedStudent };
  [
    "birth_date",
    "gender",
    "address",
    "socieconomic_stratum",
    "socioeconomic_stratum",
    "guardian_id",
    "guardian",
    "user_system",
    "userSystem",
  ].forEach((key) => {
    if (
      (mergedStudent[key] === null || mergedStudent[key] === undefined || mergedStudent[key] === "")
      && primaryStudent[key] !== null
      && primaryStudent[key] !== undefined
      && primaryStudent[key] !== ""
    ) {
      mergedStudent[key] = primaryStudent[key];
    }
  });

  return mergedStudent;
};

const getFormFromProfile = (user, student) => ({
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
  birth_date: String(student?.birth_date || "").slice(0, 10),
  gender: student?.gender || "",
  address: student?.address || "",
  socieconomic_stratum: getSocioeconomicStratum(student) == null ? "" : String(getSocioeconomicStratum(student)),
});

const isUserActive = (status) => {
  const normalized = String(status).toLowerCase();
  return status === true || status === 1 || ["1", "true", "active", "activo", "enabled", "habilitado"].includes(normalized);
};

const normalizeEnrollmentStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();
  if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobada";
  if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazada";
  if (["en_revision", "en revisión", "revision", "revisión", "review", "in_review"].includes(value)) return "En revisión";
  if (["pendiente", "pending", "submitted"].includes(value)) return "Pendiente";
  return status || "Sin matrícula";
};

const getStudentId = (enrollment) => enrollment.student_id ?? enrollment.student?.id;

const getInstitutionId = (enrollment) => enrollment.institution_id ?? enrollment.institution?.id;

const getGradeLevelId = (enrollment) => (
  enrollment.grade_level_id ?? enrollment.grade_level?.id ?? enrollment.gradeLevel?.id
);

const getCampusId = (enrollment) => (
  enrollment.campuse_id
  ?? enrollment.campus_id
  ?? enrollment.campuse?.id
  ?? enrollment.campus?.id
);

const getGuardianForStudent = (student, studentGuardians, guardians) => {
  if (!student) return null;

  const links = studentGuardians.filter((link) => (
    String(link.student_id ?? link.student?.id) === String(student.id)
  ));
  const link = links.find((item) => (
    item.is_primary === true
    || item.is_primary === 1
    || item.is_primary === "1"
    || item.pivot?.is_primary === true
    || item.pivot?.is_primary === 1
    || item.pivot?.is_primary === "1"
  )) || links[0];
  const guardianId = student.guardian_id
    ?? student.guardian?.id
    ?? link?.guardian_id
    ?? link?.guardian?.id;

  return guardians.find((guardian) => String(guardian.id) === String(guardianId))
    || link?.guardian
    || student.guardian
    || null;
};

const getGuardianName = (guardian) => {
  if (!guardian) return "Acudiente no registrado";

  return [
    guardian.first_name,
    guardian.middle_name,
    guardian.last_name,
    guardian.second_last_name,
  ].filter(Boolean).join(" ") || guardian.name || "Acudiente no registrado";
};

const formatDate = (value) => {
  if (!value) return "No registrado";
  const rawDate = String(value).slice(0, 10);
  const parts = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) return String(value);
  const date = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
};

const ProfileSection = ({ title, description, icon, details }) => (
  <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
    <div className="mb-6 flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
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

const PerfilEst = () => {
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [institution, setInstitution] = useState(null);
  const [grade, setGrade] = useState(null);
  const [campus, setCampus] = useState(null);
  const [guardian, setGuardian] = useState(null);
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
          throw new Error("No se encontró la sesión del estudiante. Cierra sesión e inicia nuevamente.");
        }

        const userResponse = await api.get(`/user-systems/${userId}`);
        const loadedUser = getUserFromResponse(userResponse.data);
        const warnings = [];
        let loadedStudent = loadedUser.student?.id != null ? loadedUser.student : null;

        if (!loadedStudent && loadedUser.document && loadedUser.document_type) {
          try {
            const studentResponse = await api.get("/students/by-document", {
              params: {
                document: loadedUser.document,
                document_type: loadedUser.document_type,
              },
            });
            loadedStudent = getEntity(studentResponse.data, "student");
          } catch (studentError) {
            if (studentError.response?.status !== 404) {
              console.error("Error al consultar el estudiante por documento:", studentError);
              warnings.push(getApiErrorMessage(studentError, "No se pudieron cargar los datos académicos del estudiante."));
            }
          }
        }

        const [studentsResult, enrollmentsResult, guardiansResult, linksResult, institutionsResult, gradesResult, campusesResult] = await Promise.allSettled([
          api.get("/students/list"),
          api.get("/enrollments/list"),
          api.get("/guardians/list"),
          api.get("/student-guardians/list"),
          api.get("/institutions/list"),
          api.get("/grade-levels/list"),
          api.get("/campuses/list"),
        ]);
        let loadedStudents = [];
        let enrollments = [];
        let guardians = [];
        let studentGuardians = [];
        let institutions = [];
        let grades = [];
        let campuses = [];
        const parseOptionalCollection = (result, key, label, onLoad) => {
          if (result.status !== "fulfilled") {
            console.error(`Error al consultar ${label}:`, result.reason);
            warnings.push(`No se pudo consultar ${label}.`);
            return;
          }
          try {
            onLoad(getCollection(result.value.data, key));
          } catch (parseError) {
            console.error(`Error al leer ${label}:`, parseError);
            warnings.push(`No se pudo leer ${label}.`);
          }
        };

        parseOptionalCollection(studentsResult, "students", "estudiantes", (value) => { loadedStudents = value; });
        parseOptionalCollection(enrollmentsResult, "enrollments", "matrículas", (value) => { enrollments = value; });
        parseOptionalCollection(guardiansResult, "guardians", "acudientes", (value) => { guardians = value; });
        parseOptionalCollection(linksResult, "student_guardians", "relaciones estudiante-acudiente", (value) => { studentGuardians = value; });
        parseOptionalCollection(institutionsResult, "institutions", "instituciones", (value) => { institutions = value; });
        parseOptionalCollection(gradesResult, "grade_levels", "grados", (value) => { grades = value; });
        parseOptionalCollection(campusesResult, "campuses", "sedes", (value) => { campuses = value; });

        const listedStudent = loadedStudents.find((item) => (
          (loadedStudent?.id != null && String(item.id) === String(loadedStudent.id))
          || (
            loadedUser.id != null
            && String(item.user_system_id ?? item.user_system?.id ?? item.userSystem?.id) === String(loadedUser.id)
          )
        ));
        loadedStudent = mergeStudentRecords(loadedStudent, listedStudent);

        const studentId = loadedStudent?.id;
        const studentEnrollments = studentId == null
          ? []
          : enrollments.filter((item) => String(getStudentId(item)) === String(studentId));
        studentEnrollments.sort((first, second) => (
          String(second.enrollment_date || "").localeCompare(String(first.enrollment_date || ""))
        ));
        const latestEnrollment = studentEnrollments[0] || null;
        const institutionId = latestEnrollment
          ? getInstitutionId(latestEnrollment)
          : loadedUser.institution_id ?? loadedUser.institution?.id;
        const gradeId = latestEnrollment ? getGradeLevelId(latestEnrollment) : loadedStudent?.grade_level_id;
        const campusId = latestEnrollment ? getCampusId(latestEnrollment) : null;
        const loadedInstitution = latestEnrollment?.institution
          || loadedUser.institution
          || institutions.find((item) => String(item.id) === String(institutionId))
          || null;
        const loadedGrade = latestEnrollment?.grade_level
          || latestEnrollment?.gradeLevel
          || grades.find((item) => String(item.id) === String(gradeId))
          || null;
        const loadedCampus = latestEnrollment?.campuse
          || latestEnrollment?.campus
          || campuses.find((item) => String(item.id) === String(campusId))
          || null;
        const loadedGuardian = getGuardianForStudent(loadedStudent, studentGuardians, guardians);

        if (!ignore) {
          setUser(loadedUser);
          setStudent(loadedStudent);
          setEnrollment(latestEnrollment);
          setInstitution(loadedInstitution);
          setGrade(loadedGrade);
          setCampus(loadedCampus);
          setGuardian(loadedGuardian);
          setForm(getFormFromProfile(loadedUser, loadedStudent));
          setWarning(warnings.join(" "));
        }
      } catch (loadError) {
        console.error("Error al cargar el perfil del estudiante:", loadError);
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
    setForm(getFormFromProfile(user, student));
    setPhoto(null);
    setError("");
    setNotice("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setForm(getFormFromProfile(user, student));
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
      const userPayload = {
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
      const userRequestPayload = { ...userPayload };
      if (form.password) {
        userRequestPayload.password = form.password;
        userRequestPayload.password_confirmation = form.password_confirmation;
      }

      const requests = [
        { key: "account", promise: api.put(`/user-systems/${user.id}`, userRequestPayload) },
      ];
      const studentPayload = student ? {
        birth_date: form.birth_date,
        gender: form.gender.trim(),
        address: form.address.trim(),
        socieconomic_stratum: Number(form.socieconomic_stratum),
        user_system_id: Number(student.user_system_id ?? student.user_system?.id ?? student.userSystem?.id ?? user.id),
        institution_id: student.institution_id ?? student.institution?.id ?? null,
        grade_level_id: student.grade_level_id ?? student.grade_level?.id ?? null,
        class__group_id: student.class__group_id
          ?? student.class__group?.id
          ?? student.class_group?.id
          ?? student.classGroup?.id
          ?? null,
        guardian_id: student.guardian_id ?? student.guardian?.id ?? null,
      } : null;
      if (student) {
        requests.push({ key: "student", promise: api.put(`/students/${student.id}`, studentPayload) });
      }

      const results = await Promise.allSettled(requests.map(({ promise }) => promise));
      const failedRequests = results.flatMap((result, index) => (
        result.status === "rejected" ? [{ key: requests[index].key, error: result.reason }] : []
      ));

      if (results[0].status === "fulfilled") setUser({ ...user, ...userPayload });
      if (student && results[1].status === "fulfilled") setStudent({ ...student, ...studentPayload });
      if (failedRequests.length) {
        const descriptions = failedRequests.map(({ key, error: requestError }) => (
          `${key === "account" ? "La cuenta" : "Los datos del estudiante"}: ${getApiErrorMessage(requestError, "no se pudieron actualizar.")}`
        ));
        setError(descriptions.join(" "));
        return;
      }

      const updatedUser = { ...user, ...userPayload };
      const updatedStudent = student ? { ...student, ...studentPayload } : null;
      setUser(updatedUser);
      if (updatedStudent) setStudent(updatedStudent);
      setForm(getFormFromProfile(updatedUser, updatedStudent));
      setPhoto(null);
      setEditing(false);
      setNotice("Tus datos se actualizaron correctamente.");
    } catch (saveError) {
      console.error("Error al actualizar el perfil del estudiante:", saveError);
      setError(getApiErrorMessage(saveError, "No se pudieron actualizar tus datos."));
    } finally {
      setSaving(false);
    }
  };

  const fullName = user ? getFullName(user) : "";
  const studentGender = student?.gender;
  const stratum = getSocioeconomicStratum(student);
  const enrollmentStatus = enrollment ? normalizeEnrollmentStatus(enrollment.status) : "Sin matrícula";
  const institutionName = institution?.name_institution || institution?.name || "Sin institución";
  const gradeName = grade?.name || (enrollment?.grade_level_id ? `Grado #${enrollment.grade_level_id}` : "Sin grado asignado");
  const campusName = campus?.name || campus?.name_campus || "Sin sede asignada";
  const studentDetails = [
    { label: "Fecha de nacimiento", value: formatDate(student?.birth_date) },
    { label: "Género", value: studentGender },
    { label: "Dirección", value: student?.address, wide: true },
    { label: "Estrato socioeconómico", value: stratum },
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
                <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-3xl font-bold text-blue-700">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                  Perfil estudiante
                </span>
                <h1 className="m-0 break-words text-3xl font-semibold tracking-tight text-slate-900">{fullName}</h1>
                <p className="mb-0 mt-2 text-sm text-slate-500">{user.email} · @{user.username}</p>
                <p className="mb-0 mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <i className="bi bi-building text-blue-500" aria-hidden="true" />
                  {institutionName}
                </p>
              </div>
              <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${isUserActive(user.status) ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                <span className={`h-2 w-2 rounded-full ${isUserActive(user.status) ? "bg-emerald-500" : "bg-slate-400"}`} />
                {isUserActive(user.status) ? "Cuenta activa" : "Cuenta inactiva"}
              </span>
              {!editing && (
                <button type="button" onClick={startEditing} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30">
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
                <Link to="/login" className="font-semibold text-blue-700 underline">Ir al inicio de sesión</Link>
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600"><i className="bi bi-person-vcard" aria-hidden="true" /></span>
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

                {student && (
                  <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="mb-6 flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-600"><i className="bi bi-person-lines-fill" aria-hidden="true" /></span>
                      <div><h2 className="m-0 text-lg font-semibold text-slate-900">Datos del estudiante</h2><p className="mb-0 mt-1 text-sm text-slate-500">Información personal que hace parte de tu registro académico.</p></div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className={labelClass}>Fecha de nacimiento<input className={fieldClass} type="date" name="birth_date" value={form.birth_date} onChange={handleChange} required /></label>
                      <label className={labelClass}>Género<input className={fieldClass} name="gender" value={form.gender} onChange={handleChange} required /></label>
                      <label className={`${labelClass} sm:col-span-2`}>Dirección de residencia<input className={fieldClass} name="address" value={form.address} onChange={handleChange} required /></label>
                      <label className={labelClass}>Estrato socioeconómico
                        <select className={fieldClass} name="socieconomic_stratum" value={form.socieconomic_stratum} onChange={handleChange} required>
                          <option value="" disabled>Selecciona...</option>
                          {[1, 2, 3, 4, 5, 6].map((value) => <option key={value} value={value}>{value}</option>)}
                        </select>
                      </label>
                    </div>
                  </section>
                )}

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
                    <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Guardando..." : "Guardar cambios"}</button>
                  </div>
                </section>
              </form>
            ) : (
              <div className="space-y-6">
                <ProfileSection title="Datos registrados" description="Información personal y de contacto asociada a tu cuenta." icon="bi-person-vcard" details={[
                  { label: "Nombre completo", value: fullName, wide: true },
                  { label: "Tipo de documento", value: user.document_type },
                  { label: "Número de documento", value: user.document },
                  { label: "Teléfono", value: user.phone },
                  { label: "Correo electrónico", value: user.email },
                  { label: "Nombre de usuario", value: user.username },
                ]} />
                {student ? (
                  <ProfileSection title="Información del estudiante" description="Datos personales registrados en tu expediente." icon="bi-person-lines-fill" details={studentDetails} />
                ) : (
                  <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Todavía no hay un registro de estudiante asociado a esta cuenta.</div>
                )}
              </div>
            )}

            <aside className="space-y-6">
              <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                <div className="mb-5 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg text-amber-600"><i className="bi bi-activity" aria-hidden="true" /></span>
                  <div><h2 className="m-0 text-lg font-semibold text-slate-900">Proceso de matrícula</h2><p className="mb-0 mt-1 text-sm text-slate-500">Resumen de tu solicitud más reciente.</p></div>
                </div>
                <dl className="m-0 space-y-3">
                  {[
                    ["Estado", enrollmentStatus],
                    ["Institución", institutionName],
                    ["Grado", gradeName],
                    ["Sede", campusName],
                    ["Código", enrollment?.enrollment_code],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-4">
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                      <dd className="mb-0 mt-1 break-words text-sm font-semibold text-slate-700">{value || "No registrado"}</dd>
                    </div>
                  ))}
                </dl>
                <Link to="/MatriculasE" className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800 no-underline transition hover:bg-blue-100">Consultar mis matrículas<i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                <div className="mb-5 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600"><i className="bi bi-people" aria-hidden="true" /></span>
                  <div><h2 className="m-0 text-lg font-semibold text-slate-900">Acudiente</h2><p className="mb-0 mt-1 text-sm text-slate-500">Contacto asociado a tu registro.</p></div>
                </div>
                <p className="m-0 text-sm font-semibold text-slate-800">{getGuardianName(guardian)}</p>
                {guardian && (
                  <dl className="mb-0 mt-3 space-y-2 text-sm">
                    <div><dt className="inline text-slate-400">Documento: </dt><dd className="inline font-medium text-slate-700">{guardian.document || "No registrado"}</dd></div>
                    <div><dt className="inline text-slate-400">Teléfono: </dt><dd className="inline font-medium text-slate-700">{guardian.phone || "No registrado"}</dd></div>
                    <div><dt className="inline text-slate-400">Correo: </dt><dd className="inline break-all font-medium text-slate-700">{guardian.email || "No registrado"}</dd></div>
                  </dl>
                )}
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                <div className="mb-5 flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600"><i className="bi bi-shield-check" aria-hidden="true" /></span>
                  <div><h2 className="m-0 text-lg font-semibold text-slate-900">Seguridad</h2><p className="mb-0 mt-1 text-sm text-slate-500">Protege tu información personal.</p></div>
                </div>
                <Link to="/ReperaContra" className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 no-underline transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">Cambiar contraseña<i className="bi bi-arrow-up-right" aria-hidden="true" /></Link>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default PerfilEst;
