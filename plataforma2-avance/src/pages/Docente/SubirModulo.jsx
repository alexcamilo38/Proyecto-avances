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

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

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
    const grade = group.grade_level?.name || group.gradeLevel?.name || `Grado #${group.grade_level_id}`;
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

    return (
        <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] md:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="mb-1 mt-0 flex items-center gap-3 text-3xl font-bold text-slate-900">
                            <i className={`bi ${isEditing ? "bi-pencil-square" : "bi-cloud-arrow-up-fill"} text-sky-500`} aria-hidden="true" />
                            {isEditing ? "Editar módulo" : "Configuración y Carga de Módulos"}
                        </h1>
                        <p className="mb-0 font-semibold text-sky-600">
                            {isEditing ? "Actualiza los datos de tu módulo" : "Oferta Académica e Inscripciones"}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {isEditing && (
                            <Link
                                to="/DocenteMo"
                                className="rounded-xl border border-slate-200 px-5 py-3 text-center font-semibold text-slate-700 no-underline transition hover:bg-slate-50"
                            >
                                Cancelar
                            </Link>
                        )}
                        <button
                            type="submit"
                            form="form-subir-modulo"
                            disabled={saving || catalogLoading || moduleLoading || Boolean(moduleLoadError)}
                            className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <i className={`bi ${isEditing ? "bi-check-lg" : "bi-plus-circle"} mr-2`} aria-hidden="true" />
                            {saving ? (isEditing ? "Guardando..." : "Publicando...") : (isEditing ? "Guardar cambios" : "Publicar módulo")}
                        </button>
                    </div>
                </header>

                {catalogError && (
                    <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
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
                {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                {success && <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>}

                <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[2fr_1fr]">
                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-6 mt-0 flex items-center gap-2 text-xl font-semibold text-slate-900">
                            <i className="bi bi-sliders text-sky-500" aria-hidden="true" />
                            Parámetros de la Asignatura
                        </h2>

                        {catalogLoading || moduleLoading ? (
                            <p role="status" className="mb-0 text-sm text-slate-600">
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
                            <form id="form-subir-modulo" onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                                <div>
                                    <label className={labelClass} htmlFor="asignatura">Asignatura</label>
                                    <select className={fieldClass} id="asignatura" name="subject_id" value={form.subject_id} onChange={handleChange} required>
                                        <option value="">Selecciona una asignatura...</option>
                                        {catalogs.subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>{subject.name_subject}</option>
                                        ))}
                                    </select>
                                </div>
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
                                <div>
                                    <label className={labelClass} htmlFor="fechaApertura">Fecha de apertura</label>
                                    <input className={fieldClass} id="fechaApertura" name="enrollment_opens_at" type="date" value={form.enrollment_opens_at} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="fechaCierre">Fecha límite / cierre</label>
                                    <input className={fieldClass} id="fechaCierre" name="enrollment_closes_at" type="date" value={form.enrollment_closes_at} onChange={handleChange} required />
                                </div>
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
                                                    className="inline-flex rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-sky-700 no-underline hover:bg-sky-50"
                                                >
                                                    <i className="bi bi-file-earmark-image mr-2" aria-hidden="true" />
                                                    Ver syllabus actual
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
                                            <label className={labelClass} htmlFor="documento">Syllabus / guía curricular (JPG, PNG o WEBP; máximo 5 MB)</label>
                                            <input
                                                className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:font-semibold file:text-sky-700`}
                                                id="documento"
                                                ref={syllabusInputRef}
                                                type="file"
                                                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                                onChange={handleSyllabusChange}
                                                required
                                            />
                                            {syllabus && <p className="mb-0 mt-2 text-xs text-slate-500">{syllabus.name}</p>}
                                        </>
                                    )}
                                </div>
                                <label className="flex items-center gap-3 text-sm font-medium text-slate-700 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        name="allow_self_enrollment"
                                        checked={form.allow_self_enrollment}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                    />
                                    Permitir auto-inscripción del alumnado
                                </label>
                            </form>
                        )}
                    </section>

                    <aside className="flex flex-col gap-6">
                        <section className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 mt-0 flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <i className="bi bi-info-circle text-sky-500" aria-hidden="true" />
                                Estado de oferta
                            </h2>
                            <p className="mb-5 leading-7 text-slate-600">
                                {isEditing
                                    ? "Al guardar, se actualizarán los datos del módulo y se conservará el syllabus actual."
                                    : "Al publicar, el módulo queda disponible para el proceso de selección de asignaturas del alumnado."}
                            </p>
                            <div className="flex items-center gap-3 border-t border-slate-100 pt-4 text-sm text-slate-700">
                                <i className="bi bi-check-circle-fill text-emerald-500" aria-hidden="true" />
                                {isEditing ? "Se conservará el estado de publicación actual." : "Se publicará al enviar el formulario."}
                            </div>
                        </section>

                        <section className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 mt-0 flex items-center gap-2 text-xl font-semibold text-slate-900">
                                <i className="bi bi-lightbulb text-sky-500" aria-hidden="true" />
                                Consejos útiles
                            </h2>
                            <ul className="mb-0 space-y-3 pl-5 leading-7 text-slate-600">
                                <li>Establece los cupos de acuerdo con la capacidad del grupo.</li>
                                <li>Verifica las fechas de apertura y cierre de inscripciones.</li>
                                <li>El grupo y el periodo deben pertenecer al mismo año lectivo.</li>
                            </ul>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default SubirModulo;
