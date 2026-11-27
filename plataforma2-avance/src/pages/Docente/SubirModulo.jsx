import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../Config/env";
import { getAuthSession } from "../../Config/auth";

const emptyForm = {
    name_module: "",
    description_module: "",
    subject_id: "",
    class_group_id: "",
    academic_period_id: "",
    teacher_id: "",
    schedule: "",
    duration: "",
    seats: "",
    weekly_hours: "",
    enrollment_opens_at: "",
    enrollment_closes_at: "",
    allow_self_enrollment: true,
};

const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10";
const labelClass = "block text-sm font-semibold text-slate-700";

const FormSectionHeading = ({ number, title, description, icon }) => (
    <div className="flex items-start gap-3 border-b border-slate-100 pb-4 md:col-span-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <i className={`bi ${icon}`} aria-hidden="true" />
        </span>
        <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-600">Paso {number}</p>
            <h3 className="m-0 text-base font-semibold text-slate-900">{title}</h3>
            <p className="mb-0 mt-1 text-sm text-slate-500">{description}</p>
        </div>
    </div>
);

const getCollection = (responseData, key) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    if (Array.isArray(responseData?.[key])) return responseData[key];
    if (Array.isArray(responseData?.data?.data)) return responseData.data.data;

    throw new Error(`El servidor devolvió una respuesta inesperada al consultar ${key}.`);
};

const getErrorMessage = (error, fallback) => {
    const validationErrors = error.response?.data?.errors;
    const firstValidationError = validationErrors && Object.values(validationErrors).flat()[0];

    return firstValidationError || error.response?.data?.message || error.message || fallback;
};

const getTeacherName = (teacher) => {
    const user = teacher.user_system || teacher.userSystem || {};
    const name = [
        user.first_name || teacher.first_name,
        user.middle_name || teacher.middle_name,
        user.last_name || teacher.last_name,
        user.second_last_name || teacher.second_last_name,
    ].map((part) => part?.trim()).filter(Boolean).join(" ");

    return name || "Nombre no disponible";
};

const getClassGroupName = (group) => {
    const gradeId = group.grade_level_id ?? group.gradeLevel?.id ?? group.grade_level?.id;
    const grade = group.grade_level?.name
        || group.gradeLevel?.name
        || (gradeId != null ? `Grado #${gradeId}` : "Grupo");
    const campus = group.campus?.name || group.campuse?.name;
    return [
        `${grade}${group.section ? ` ${group.section}` : ""}`,
        group.shift,
        campus,
    ].filter(Boolean).join(" · ");
};

const SubirModulo = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(moduleId);
    const authSession = getAuthSession();
    const currentUser = authSession?.user || {};
    const currentRole = String(
        currentUser.rol?.slug
        || currentUser.rol?.name_role
        || (typeof currentUser.rol === "string" ? currentUser.rol : "")
        || currentUser.role?.slug
        || currentUser.role?.name
        || (typeof currentUser.role === "string" ? currentUser.role : "")
        || "",
    ).toLowerCase();
    const isTeacher = ["teacher", "docente", "profesor", "profesora"].includes(currentRole);
    const isAdmin = ["admin", "administrador", "administrator"].includes(currentRole);
    const currentTeacherId = currentUser.teacher_id ?? currentUser.teacher?.id;
    const [catalogs, setCatalogs] = useState({
        classGroups: [],
        periods: [],
        subjects: [],
        teachers: [],
    });
    const [catalogLoading, setCatalogLoading] = useState(true);
    const [catalogError, setCatalogError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);
    const [editLoadState, setEditLoadState] = useState({ moduleId: null, error: "" });
    const [currentSyllabusUrl, setCurrentSyllabusUrl] = useState("");
    const [form, setForm] = useState(() => ({
        ...emptyForm,
        teacher_id: isTeacher && currentTeacherId ? String(currentTeacherId) : "",
    }));
    const [syllabus, setSyllabus] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const syllabusInputRef = useRef(null);

    useEffect(() => {
        let ignore = false;
        const requests = [
            ["classGroups", "/class-groups/list", "class_groups"],
            ["periods", "/academic-periods/list", "academic_periods"],
            ["subjects", "/subjects/list", "subjects"],
            ["teachers", "/teachers/list", "teachers"],
        ];

        Promise.allSettled(requests.map(([, url]) => api.get(url))).then((results) => {
            if (ignore) return;

            const nextCatalogs = { classGroups: [], periods: [], subjects: [], teachers: [] };
            const errors = [];
            results.forEach((result, index) => {
                const [key, , responseKey] = requests[index];
                if (result.status === "fulfilled") {
                    try {
                        nextCatalogs[key] = getCollection(result.value.data, responseKey);
                    } catch (parseError) {
                        console.error(`Error al leer ${key}:`, parseError);
                        errors.push(parseError.message);
                    }
                } else {
                    console.error(`Error al cargar ${key}:`, result.reason);
                    errors.push(getErrorMessage(result.reason, `No se pudo cargar ${key}.`));
                }
            });

            setCatalogs(nextCatalogs);
            setCatalogError(errors.join(" "));
            setCatalogLoading(false);
        });

        return () => {
            ignore = true;
        };
    }, [reloadKey]);

    useEffect(() => {
        if (!moduleId) return undefined;

        let ignore = false;
        api.get(`/modules/${encodeURIComponent(moduleId)}`)
            .then((response) => {
                const module = response.data?.module || response.data?.data || response.data;
                if (!module?.id) {
                    throw new Error("El servidor no devolvió los datos del módulo.");
                }

                if (ignore) return;
                setForm({
                    name_module: module.name_module || "",
                    description_module: module.description_module || "",
                    subject_id: module.subject_id ? String(module.subject_id) : "",
                    class_group_id: module.class_group_id ? String(module.class_group_id) : "",
                    academic_period_id: String(module.academic__period_id ?? module.academic_period_id ?? ""),
                    teacher_id: String(module.teacher_id ?? ""),
                    schedule: module.schedule || "",
                    duration: module.duration || "",
                    seats: String(module.seats ?? ""),
                    weekly_hours: String(module.weekly_hours ?? ""),
                    enrollment_opens_at: String(module.enrollment_opens_at || "").slice(0, 10),
                    enrollment_closes_at: String(module.enrollment_closes_at || "").slice(0, 10),
                    allow_self_enrollment: module.allow_self_enrollment === true
                        || module.allow_self_enrollment === 1
                        || module.allow_self_enrollment === "1",
                });
                setCurrentSyllabusUrl(module.syllabus_url || "");
                setEditLoadState({ moduleId, error: "" });
            })
            .catch((loadError) => {
                if (ignore) return;
                console.error("Error al cargar el módulo para editar:", loadError);
                setEditLoadState({
                    moduleId,
                    error: getErrorMessage(loadError, "No se pudo cargar el módulo."),
                });
            });

        return () => {
            ignore = true;
        };
    }, [moduleId]);

    const moduleLoading = isEditing && editLoadState.moduleId !== moduleId;
    const moduleLoadError = editLoadState.moduleId === moduleId ? editLoadState.error : "";

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSyllabusChange = (event) => {
        const selectedFile = event.target.files?.[0] || null;
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
            setSyllabus(null);
            setError("El syllabus debe ser una imagen JPG, PNG o WEBP.");
            event.target.value = "";
            return;
        }
        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
            setSyllabus(null);
            setError("El syllabus no puede superar los 5 MB.");
            event.target.value = "";
            return;
        }

        setError("");
        setSyllabus(selectedFile);
    };

    const retryCatalogs = () => {
        setCatalogLoading(true);
        setCatalogError("");
        setReloadKey((current) => current + 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!isEditing && !syllabus) {
            setError("Adjunta el syllabus o guía curricular del módulo.");
            return;
        }
        if (!isTeacher && !isAdmin) {
            setError("Solo un docente o administrador puede publicar módulos.");
            return;
        }
        if (isTeacher && !currentTeacherId) {
            setError("La cuenta no tiene un perfil docente asociado. Contacta al administrador.");
            return;
        }
        if (isAdmin && !form.teacher_id) {
            setError("Selecciona el docente responsable del módulo.");
            return;
        }
        if (new Date(form.enrollment_opens_at) >= new Date(form.enrollment_closes_at)) {
            setError("La fecha de cierre debe ser posterior a la fecha de apertura.");
            return;
        }

        setSaving(true);
        try {
            const moduleData = {
                name_module: form.name_module.trim(),
                description_module: form.description_module.trim(),
                subject_id: form.subject_id,
                class_group_id: form.class_group_id,
                academic__period_id: form.academic_period_id,
                schedule: form.schedule.trim(),
                duration: form.duration.trim(),
                seats: form.seats,
                weekly_hours: form.weekly_hours,
                enrollment_opens_at: form.enrollment_opens_at,
                enrollment_closes_at: form.enrollment_closes_at,
                allow_self_enrollment: form.allow_self_enrollment,
            };

            if (isEditing) {
                if (isAdmin) moduleData.teacher_id = form.teacher_id;
                await api.put(`/modules/${encodeURIComponent(moduleId)}`, moduleData);
                setSuccess("Los cambios del módulo se guardaron correctamente.");
                navigate(-1);
            } else {
                const payload = new FormData();
                Object.entries(moduleData).forEach(([key, value]) => {
                    const formValue = key === "allow_self_enrollment"
                        ? (value ? "1" : "0")
                        : String(value);
                    payload.append(key, formValue);
                });
                if (isAdmin) payload.append("teacher_id", form.teacher_id);
                payload.append("is_published", "1");
                payload.append("syllabus", syllabus);

                await api.post("/modules/store", payload, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                setSuccess("El módulo se publicó correctamente.");
                setForm(emptyForm);
                setSyllabus(null);
                if (syllabusInputRef.current) syllabusInputRef.current.value = "";
            }
        } catch (submitError) {
            console.error(isEditing ? "Error al actualizar el módulo:" : "Error al publicar el módulo:", submitError);
            setError(getErrorMessage(
                submitError,
                isEditing ? "No se pudo actualizar el módulo." : "No se pudo publicar el módulo.",
            ));
        } finally {
            setSaving(false);
        }
    };

    const completedSteps = [
        Boolean(form.name_module.trim() && form.subject_id),
        Boolean((isTeacher ? currentTeacherId : form.teacher_id) && form.class_group_id && form.academic_period_id),
        Boolean(form.schedule.trim() && form.duration.trim() && form.seats && form.weekly_hours),
        Boolean(form.enrollment_opens_at && form.enrollment_closes_at),
        Boolean(form.description_module.trim() && (isEditing || syllabus)),
    ].filter(Boolean).length;
    const progressPercentage = Math.round((completedSteps / 5) * 100);
    const selectedSubject = catalogs.subjects.find((subject) => String(subject.id) === String(form.subject_id));
    const selectedGroup = catalogs.classGroups.find((group) => String(group.id) === String(form.class_group_id));
    const selectedPeriod = catalogs.periods.find((period) => String(period.id) === String(form.academic_period_id));

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="max-w-2xl">
                            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
                                <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                                Espacio docente
                            </span>
                            <h1 className="mb-0 mt-0 text-2xl font-bold tracking-tight sm:text-3xl">
                                {isEditing ? "Editar módulo" : "Publica un nuevo módulo"}
                            </h1>
                            <p className="mb-0 mt-2 max-w-xl text-sm leading-6 text-slate-300">
                                {isEditing
                                    ? "Actualiza la información y conserva el syllabus actual."
                                    : "Completa la información académica para ofrecer el módulo a tus estudiantes."}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                        {isEditing && (
                            <Link
                                to="/DocenteMo"
                                className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white no-underline transition hover:bg-white/10"
                            >
                                Cancelar
                            </Link>
                        )}
                        <button
                            type="submit"
                            form="form-subir-modulo"
                            disabled={saving || catalogLoading || moduleLoading || Boolean(moduleLoadError)}
                            className="inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-950/20 transition hover:bg-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-200/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <i className={`bi ${isEditing ? "bi-check-lg" : "bi-cloud-arrow-up-fill"}`} aria-hidden="true" />
                            {saving ? (isEditing ? "Guardando..." : "Publicando...") : (isEditing ? "Guardar cambios" : "Publicar módulo")}
                        </button>
                        </div>
                    </div>
                </header>

                {catalogError && (
                    <div role="alert" className="flex items-start justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                        <span>{catalogError}</span>
                        <button
                            type="button"
                            onClick={retryCatalogs}
                            className="shrink-0 font-semibold underline"
                        >
                            Reintentar
                        </button>
                    </div>
                )}
                {error && <p role="alert" className="m-0 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">{error}</p>}
                {success && <p role="status" className="m-0 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">{success}</p>}

                <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(290px,0.8fr)]">
                    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.07)] sm:p-8">
                        <div className="mb-7 flex items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-600">
                                <i className="bi bi-sliders" aria-hidden="true" />
                            </span>
                            <div>
                                <h2 className="m-0 text-xl font-semibold text-slate-900">Información del módulo</h2>
                                <p className="mb-0 mt-1 text-sm leading-5 text-slate-500">Completa los pasos para configurar la oferta académica.</p>
                            </div>
                        </div>

                        {catalogLoading || moduleLoading ? (
                            <p role="status" className="mb-0 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                                {moduleLoading ? "Cargando los datos del módulo..." : "Cargando cursos, periodos, asignaturas y docentes..."}
                            </p>
                        ) : moduleLoadError ? (
                            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                <p className="mb-3">{moduleLoadError}</p>
                                <Link to="/DocenteMo" className="font-semibold text-red-800 underline">
                                    Volver a Mis módulos
                                </Link>
                            </div>
                        ) : (
                            <form id="form-subir-modulo" onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
                                <FormSectionHeading number="1" title="Datos principales" description="Define el nombre y la asignatura del módulo." icon="bi-book" />
                                <div className="md:col-span-2">
                                    <label className={labelClass} htmlFor="nombreModulo">Nombre del módulo</label>
                                    <input
                                        className={fieldClass}
                                        id="nombreModulo"
                                        name="name_module"
                                        type="text"
                                        value={form.name_module}
                                        onChange={handleChange}
                                        placeholder="Ej. Lengua Castellana y Comprensión Crítica"
                                        maxLength="255"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelClass} htmlFor="asignatura">Asignatura</label>
                                    <select className={fieldClass} id="asignatura" name="subject_id" value={form.subject_id} onChange={handleChange} required>
                                        <option value="">Selecciona una asignatura...</option>
                                        {catalogs.subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>{subject.name_subject}</option>
                                        ))}
                                    </select>
                                </div>
                                <FormSectionHeading number="2" title="Asignación académica" description="Vincula el módulo con el responsable, grupo y periodo." icon="bi-diagram-3" />
                                <div>
                                    <label className={labelClass} htmlFor="docente">Docente responsable</label>
                                    <select
                                        className={fieldClass}
                                        id="docente"
                                        name="teacher_id"
                                        value={isTeacher ? String(currentTeacherId || "") : form.teacher_id}
                                        onChange={handleChange}
                                        disabled={isTeacher}
                                        required
                                    >
                                        {!isTeacher && <option value="">Selecciona un docente...</option>}
                                        {isTeacher
                                            && currentTeacherId
                                            && !catalogs.teachers.some((teacher) => String(teacher.id) === String(currentTeacherId))
                                            && <option value={String(currentTeacherId)}>Docente #{currentTeacherId}</option>}
                                        {catalogs.teachers
                                            .filter((teacher) => !isTeacher || String(teacher.id) === String(currentTeacherId))
                                            .map((teacher) => (
                                                <option key={teacher.id} value={teacher.id}>{getTeacherName(teacher)}</option>
                                            ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="grupo">Grado / Curso destino</label>
                                    <select className={fieldClass} id="grupo" name="class_group_id" value={form.class_group_id} onChange={handleChange} required>
                                        <option value="">Selecciona un grupo...</option>
                                        {catalogs.classGroups.map((group) => (
                                            <option key={group.id} value={group.id}>{getClassGroupName(group)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="periodo">Periodo escolar</label>
                                    <select className={fieldClass} id="periodo" name="academic_period_id" value={form.academic_period_id} onChange={handleChange} required>
                                        <option value="">Selecciona un periodo...</option>
                                        {catalogs.periods.map((period) => (
                                            <option key={period.id} value={period.id}>
                                                {period.name}{period.academic_year?.name ? ` · ${period.academic_year.name}` : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <FormSectionHeading number="3" title="Organización del módulo" description="Indica horarios, duración y capacidad del grupo." icon="bi-calendar2-week" />
                                <div>
                                    <label className={labelClass} htmlFor="schedule">Horario</label>
                                    <input className={fieldClass} id="schedule" name="schedule" type="text" maxLength="255" value={form.schedule} onChange={handleChange} placeholder="Ej. Lunes y miércoles, 8:00 a. m." required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="duration">Duración</label>
                                    <input className={fieldClass} id="duration" name="duration" type="text" maxLength="255" value={form.duration} onChange={handleChange} placeholder="Ej. 12 semanas" required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="cupos">Límite de cupos disponibles</label>
                                    <input className={fieldClass} id="cupos" name="seats" type="number" min="1" value={form.seats} onChange={handleChange} placeholder="Ej. 35" required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="horas">Horas semanales</label>
                                    <input className={fieldClass} id="horas" name="weekly_hours" type="number" min="1" max="60" value={form.weekly_hours} onChange={handleChange} placeholder="Ej. 4" required />
                                </div>
                                <FormSectionHeading number="4" title="Periodo de inscripción" description="Establece cuándo podrán inscribirse los estudiantes." icon="bi-calendar-check" />
                                <div>
                                    <label className={labelClass} htmlFor="fechaApertura">Fecha de apertura</label>
                                    <input className={fieldClass} id="fechaApertura" name="enrollment_opens_at" type="date" value={form.enrollment_opens_at} onChange={handleChange} max={form.enrollment_closes_at || undefined} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="fechaCierre">Fecha límite / cierre</label>
                                    <input className={fieldClass} id="fechaCierre" name="enrollment_closes_at" type="date" value={form.enrollment_closes_at} onChange={handleChange} min={form.enrollment_opens_at || undefined} required />
                                </div>
                                <FormSectionHeading number="5" title="Descripción y material" description="Explica el contenido y adjunta la guía curricular." icon="bi-file-earmark-text" />
                                <div className="md:col-span-2">
                                    <label className={labelClass} htmlFor="descripcion">Descripción del módulo y competencias</label>
                                    <textarea
                                        className={`${fieldClass} min-h-32 resize-y`}
                                        id="descripcion"
                                        name="description_module"
                                        rows="4"
                                        value={form.description_module}
                                        onChange={handleChange}
                                        placeholder="Escribe los objetivos principales y temas que se abordarán..."
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    {isEditing ? (
                                        <>
                                            <span className={labelClass}>Syllabus / guía curricular</span>
                                            {currentSyllabusUrl ? (
                                                <a
                                                    href={currentSyllabusUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-sky-700 no-underline transition hover:border-sky-200 hover:bg-sky-50"
                                                >
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg text-sky-600 shadow-sm">
                                                        <i className="bi bi-file-earmark-image" aria-hidden="true" />
                                                    </span>
                                                    <span>Ver syllabus actual</span>
                                                    <i className="bi bi-box-arrow-up-right ml-auto" aria-hidden="true" />
                                                </a>
                                            ) : (
                                                <p className="mb-0 text-sm text-slate-500">Este módulo no tiene un syllabus adjunto.</p>
                                            )}
                                            <p className="mb-0 mt-2 text-xs text-slate-500">
                                                El archivo actual se conservará al guardar los cambios.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <span className={labelClass}>Syllabus / guía curricular</span>
                                            <label htmlFor="documento" className="relative mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 px-5 py-6 text-center transition hover:border-sky-400 hover:bg-sky-50/70">
                                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-sky-600 shadow-sm">
                                                    <i className="bi bi-cloud-arrow-up" aria-hidden="true" />
                                                </span>
                                                <span className="text-sm font-semibold text-slate-800">
                                                    {syllabus ? "Cambiar archivo seleccionado" : "Selecciona la guía curricular"}
                                                </span>
                                                <span className="text-xs text-slate-500">JPG, PNG o WEBP · máximo 5 MB</span>
                                                <input
                                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                    id="documento"
                                                    ref={syllabusInputRef}
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                                    onChange={handleSyllabusChange}
                                                    required
                                                />
                                            </label>
                                            {syllabus && (
                                                <p className="mb-0 mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                                                    <i className="bi bi-check-circle-fill" aria-hidden="true" />
                                                    {syllabus.name}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <label className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-sm text-slate-700 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        name="allow_self_enrollment"
                                        checked={form.allow_self_enrollment}
                                        onChange={handleChange}
                                        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                    />
                                    <span>
                                        <span className="block font-semibold text-slate-800">Permitir auto-inscripción</span>
                                        <span className="mt-1 block text-xs leading-5 text-slate-500">Los estudiantes podrán inscribirse al módulo durante las fechas establecidas.</span>
                                    </span>
                                </label>
                                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
                                    <p className="m-0 text-xs text-slate-500">Completa los campos obligatorios para continuar.</p>
                                    <button
                                        type="submit"
                                        disabled={saving || catalogLoading || moduleLoading || Boolean(moduleLoadError)}
                                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <i className={`bi ${isEditing ? "bi-check-lg" : "bi-cloud-arrow-up-fill"}`} aria-hidden="true" />
                                        {saving ? (isEditing ? "Guardando..." : "Publicando...") : (isEditing ? "Guardar cambios" : "Publicar módulo")}
                                    </button>
                                </div>
                            </form>
                        )}
                    </section>

                    <aside className="flex flex-col gap-6 xl:sticky xl:top-6">
                        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.07)]">
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="m-0 text-lg font-semibold text-slate-900">Resumen del módulo</h2>
                                    <p className="mb-0 mt-1 text-sm text-slate-500">Avance de la configuración.</p>
                                </div>
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                    <i className="bi bi-clipboard2-check" aria-hidden="true" />
                                </span>
                            </div>
                            <div className="mb-5">
                                <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                                    <span className="text-slate-600">{completedSteps} de 5 pasos</span>
                                    <span className="text-sky-700">{progressPercentage}%</span>
                                </div>
                                <div
                                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                                    role="progressbar"
                                    aria-label="Progreso de configuración del módulo"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={progressPercentage}
                                >
                                    <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all" style={{ width: `${progressPercentage}%` }} />
                                </div>
                            </div>
                            <dl className="m-0 space-y-3 border-t border-slate-100 pt-4">
                                {[
                                    ["Nombre", form.name_module || "Por definir"],
                                    ["Asignatura", selectedSubject?.name_subject || "Por seleccionar"],
                                    ["Grupo", selectedGroup ? getClassGroupName(selectedGroup) : "Por seleccionar"],
                                    ["Periodo", selectedPeriod?.name || "Por seleccionar"],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex items-start justify-between gap-3 text-sm">
                                        <dt className="shrink-0 text-slate-500">{label}</dt>
                                        <dd className="m-0 break-words text-right font-semibold text-slate-800">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>

                        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.07)]">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                    <i className="bi bi-lightbulb" aria-hidden="true" />
                                </span>
                                <h2 className="m-0 text-lg font-semibold text-slate-900">Consejos útiles</h2>
                            </div>
                            <ul className="mb-0 space-y-3 pl-5 text-sm leading-6 text-slate-600 marker:text-sky-500">
                                <li>Establece los cupos de acuerdo con la capacidad del grupo.</li>
                                <li>Verifica que las fechas de inscripción sean correctas.</li>
                                <li>El grupo y el periodo deben pertenecer al mismo año lectivo.</li>
                            </ul>
                            <div className="mt-5 flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-xs leading-5 text-sky-800">
                                <i className="bi bi-info-circle mt-0.5 shrink-0" aria-hidden="true" />
                                {isEditing
                                    ? "Al guardar, se actualizarán los datos y se conservará el syllabus actual."
                                    : "Al publicar, el módulo quedará disponible para los estudiantes."}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default SubirModulo;
