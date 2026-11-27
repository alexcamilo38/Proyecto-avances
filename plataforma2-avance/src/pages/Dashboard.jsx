import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Config/env";
import { getAuthSession } from "../Config/auth";
import { getApiErrorMessage, getCollection, getCurrentUserId } from "./Auth/authUtils";
import TeacherSessionContext from "../Config/TeacherSessionContext";
import { getTeacherName } from "../Config/teacherProfile";

// Muestra una métrica resumida con icono, etiqueta, valor y color contextual.
const Metric = ({ icon, label, value, tone }) => (
  <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${tone}`}>
      <i className={`bi ${icon}`} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="m-0 text-xs text-slate-500">{label}</p>
      <p className="m-0 text-xl font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

// Estandariza el encabezado y el contenedor de una sección del dashboard.
const SectionCard = ({ title, action, children, className = "" }) => (
  <section className={`rounded-2xl bg-white p-5 shadow-sm ${className}`}>
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="m-0 text-base font-semibold text-slate-800">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

const loadAdminDashboardData = async () => {
  const [institutionsResponse, usersResponse, rolesResponse] = await Promise.all([
    api.get("/institutions/list"),
    api.get("/user-systems/list"),
    api.get("/rols/list"),
  ]);
  return {
    institutions: getCollection(institutionsResponse.data, "institutions"),
    users: getCollection(usersResponse.data, "user_systems"),
    roles: getCollection(rolesResponse.data, "roles"),
  };
};

const isUserActive = (status) => {
  const normalized = String(status).toLowerCase();
  return status === true || status === 1 || ["1", "true", "active", "activo", "enabled", "habilitado"].includes(normalized);
};

const getUserName = (user) => [
  user.first_name,
  user.middle_name,
  user.last_name,
  user.second_last_name,
].filter(Boolean).join(" ") || user.username || "Usuario sin nombre";

const formatDate = (value) => {
  if (!value) return "Fecha no disponible";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Fecha no disponible"
    : new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(date);
};

// Resume las cuentas, instituciones y roles existentes en la plataforma.
const AdminDashboard = () => {
  const [data, setData] = useState({ institutions: [], users: [], roles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await loadAdminDashboardData());
    } catch (loadError) {
      console.error("Error al cargar los datos del dashboard administrativo:", loadError);
      setError(getApiErrorMessage(loadError, "No se pudieron cargar los datos del dashboard."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    loadAdminDashboardData()
      .then((loadedData) => {
        if (!ignore) setData(loadedData);
      })
      .catch((loadError) => {
        console.error("Error al cargar los datos del dashboard administrativo:", loadError);
        if (!ignore) setError(getApiErrorMessage(loadError, "No se pudieron cargar los datos del dashboard."));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const activeUsers = data.users.filter((user) => isUserActive(user.status)).length;
  const recentUsers = [...data.users]
    .sort((a, b) => (
      (Date.parse(b.created_at || "") || 0) - (Date.parse(a.created_at || "") || 0)
      || Number(b.id || 0) - Number(a.id || 0)
    ))
    .slice(0, 5);
  const recentInstitutions = [...data.institutions]
    .sort((a, b) => (
      (Date.parse(b.created_at || "") || 0) - (Date.parse(a.created_at || "") || 0)
      || Number(b.id || 0) - Number(a.id || 0)
    ))
    .slice(0, 4);
  const metrics = [
    { icon: "bi-bank", label: "Instituciones", value: data.institutions.length, href: "/RegistrarSede", tone: "bg-sky-100 text-sky-600" },
    { icon: "bi-people", label: "Usuarios", value: data.users.length, href: "/Usuarios", tone: "bg-violet-100 text-violet-600" },
    { icon: "bi-person-check", label: "Usuarios activos", value: activeUsers, href: "/Usuarios", tone: "bg-emerald-100 text-emerald-600" },
    { icon: "bi-shield-lock", label: "Roles", value: data.roles.length, href: "/Roles", tone: "bg-amber-100 text-amber-600" },
  ];

  return (
    <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
      <section className="flex min-h-28 items-center justify-between gap-5 rounded-2xl bg-[#111629] px-6 py-5 text-white">
        <div>
          <p className="mb-1 text-sm text-slate-400">Resumen de la información registrada en la plataforma.</p>
          <h1 className="m-0 text-2xl font-semibold max-sm:text-xl">Hola, Administrador</h1>
          <Link to="/Usuarios" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-[#111629] no-underline transition hover:bg-sky-300">
            <i className="bi bi-plus-lg" aria-hidden="true" />
            Administrar usuarios
          </Link>
        </div>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-3xl text-sky-300 max-sm:hidden">
          <i className="bi bi-mortarboard" aria-hidden="true" />
        </span>
      </section>

      {error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button type="button" onClick={loadDashboard} disabled={loading} className="font-bold underline disabled:opacity-50">
            {loading ? "Cargando..." : "Reintentar"}
          </button>
        </div>
      )}

      <section aria-label="Resumen de la plataforma" className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-[520px]:grid-cols-1">
        {metrics.map((metric) => (
          <Link key={metric.label} to={metric.href} className="rounded-2xl text-inherit no-underline transition hover:-translate-y-0.5">
            <Metric {...metric} value={loading ? "…" : error ? "—" : metric.value.toLocaleString("es-CO")} />
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-[1.2fr_1fr] gap-4 max-[760px]:grid-cols-1">
        <SectionCard
          title="Usuarios registrados"
          action={<Link to="/Usuarios" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver todas</Link>}
        >
          {loading ? (
            <p role="status" className="m-0 py-8 text-center text-sm text-slate-500">Cargando usuarios...</p>
          ) : recentUsers.length ? (
            <ul className="m-0 list-none divide-y divide-slate-100 p-0">
              {recentUsers.map((user) => {
                const role = user.rol?.name_role
                  || user.role?.name_role
                  || data.roles.find((item) => String(item.id) === String(user.rol_id))?.name_role
                  || "Sin rol";
                return (
                  <li key={user.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                      {getUserName(user).charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm font-medium text-slate-700">{getUserName(user)}</strong>
                      <small className="block truncate text-xs text-slate-500">@{user.username || user.email || "Sin usuario"}</small>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-xs font-medium text-slate-600">{role}</span>
                      <time className="text-[11px] text-slate-400">{formatDate(user.created_at)}</time>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="m-0 py-8 text-center text-sm text-slate-500">
              {error ? "No se pudieron cargar los usuarios." : "Aún no hay usuarios registrados."}
            </p>
          )}
        </SectionCard>

        <SectionCard
          title="Instituciones registradas"
          action={<Link to="/RegistrarSede" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Administrar</Link>}
        >
          {loading ? (
            <p role="status" className="m-0 py-8 text-center text-sm text-slate-500">Cargando instituciones...</p>
          ) : recentInstitutions.length ? (
            <ul className="m-0 list-none divide-y divide-slate-100 p-0">
              {recentInstitutions.map((institution) => (
                <li key={institution.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <i className="bi bi-bank" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm font-medium text-slate-700">{institution.name_institution || "Institución sin nombre"}</strong>
                    <small className="block truncate text-xs text-slate-500">{institution.city || institution.address_institution || "Ubicación no registrada"}</small>
                  </span>
                  <time className="shrink-0 text-[11px] text-slate-400">{formatDate(institution.created_at)}</time>
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0 py-8 text-center text-sm text-slate-500">
              {error ? "No se pudieron cargar las instituciones." : "Aún no hay instituciones registradas."}
            </p>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Accesos de administración">
        <div className="grid grid-cols-3 gap-3 max-[650px]:grid-cols-1">
          {[
            { to: "/RegistrarSede", icon: "bi-bank", title: "Instituciones", detail: "Gestionar sedes e instituciones", tone: "bg-sky-100 text-sky-600" },
            { to: "/Usuarios", icon: "bi-people", title: "Usuarios", detail: "Administrar cuentas del sistema", tone: "bg-violet-100 text-violet-600" },
            { to: "/Roles", icon: "bi-shield-lock", title: "Roles", detail: "Configurar perfiles de acceso", tone: "bg-amber-100 text-amber-600" },
          ].map(({ to, icon, title, detail, tone }) => (
            <Link key={to} to={to} className="flex items-center gap-3 rounded-xl border border-slate-100 p-4 text-slate-800 no-underline transition hover:border-sky-200 hover:bg-slate-50">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <i className={`bi ${icon}`} aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm">{title}</strong>
                <small className="text-xs text-slate-500">{detail}</small>
              </span>
              <i className="bi bi-arrow-right ml-auto text-slate-400" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

const isPublished = (module) => (
  module.is_published === true
  || module.is_published === 1
  || module.is_published === "1"
);

const getDaysUntil = (dateValue) => {
  if (!dateValue) return null;
  const date = new Date(`${String(dateValue).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((date.getTime() - today.getTime()) / 86400000);
};

const getStudentId = (enrollment) => enrollment.student_id ?? enrollment.student?.id;
const EMPTY_LIST = Object.freeze([]);

const getUserFromResponse = (responseData) => (
  responseData?.user_system
  || responseData?.data?.user_system
  || responseData?.data?.data
  || responseData?.data
  || responseData
);

const getStudentFromResponse = (responseData) => {
  let student = responseData?.data?.data ?? responseData?.data ?? responseData;

  for (let depth = 0; depth < 4; depth += 1) {
    if (Array.isArray(student)) {
      student = student[0] ?? null;
      continue;
    }
    if (!student || typeof student !== "object") return null;
    if (student.student) {
      student = student.student;
      continue;
    }
    if (student.data !== undefined) {
      student = student.data;
      continue;
    }
    return student;
  }

  return student;
};

const loadStudentDashboardData = async () => {
  const session = getAuthSession();
  const userId = getCurrentUserId() ?? session?.user?.id ?? session?.user?.user_system_id;
  if (userId == null) {
    throw new Error("No se encontró la sesión del estudiante. Cierra sesión e inicia nuevamente.");
  }

  const userResponse = await api.get(`/user-systems/${userId}`);
  const user = getUserFromResponse(userResponse.data);
  let student = user?.student?.id != null ? user.student : null;

  if (!student && user?.document) {
    try {
      const studentResponse = await api.get("/students/by-document", {
        params: {
          document: user.document,
          document_type: user.document_type || undefined,
        },
      });
      student = getStudentFromResponse(studentResponse.data);
    } catch (studentError) {
      console.error("Error al consultar el perfil académico del estudiante:", studentError);
      throw studentError;
    }
  }

  if (!student?.id) {
    throw new Error("No se encontró un perfil académico asociado a esta cuenta.");
  }

  const requests = [
    { key: "enrollments", url: "/enrollments/list", responseKey: "enrollments", params: { student_id: student.id } },
    { key: "moduleEnrollments", url: "/module-enrollments/list", responseKey: "module_enrollments", params: { student_id: student.id } },
    { key: "modules", url: "/modules/list", responseKey: "modules" },
    { key: "institutions", url: "/institutions/list", responseKey: "institutions" },
    { key: "campuses", url: "/campuses/list", responseKey: "campuses" },
  ];
  const results = await Promise.allSettled(
    requests.map(({ url, params }) => api.get(url, params ? { params } : {})),
  );
  const values = {
    enrollments: [],
    moduleEnrollments: [],
    modules: [],
    institutions: [],
    campuses: [],
  };
  const warnings = [];

  results.forEach((result, index) => {
    const { key, responseKey } = requests[index];
    if (result.status === "rejected") {
      console.error(`Error al cargar ${key} en el dashboard del estudiante:`, result.reason);
      warnings.push(getApiErrorMessage(result.reason, `No se pudieron cargar ${key}.`));
      return;
    }
    try {
      values[key] = getCollection(result.value.data, responseKey);
    } catch (parseError) {
      console.error(`Error al leer ${key} en el dashboard del estudiante:`, parseError);
      warnings.push(parseError.message);
    }
  });

  return {
    user,
    student,
    enrollments: values.enrollments.filter((enrollment) => String(getStudentId(enrollment)) === String(student.id)),
    moduleEnrollments: values.moduleEnrollments.filter((enrollment) => String(getStudentId(enrollment)) === String(student.id)),
    modules: values.modules,
    institutions: values.institutions,
    campuses: values.campuses,
    warning: warnings.join(" "),
  };
};

const normalizeStudentEnrollmentStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();
  if (["aprobado", "aprobada", "approved", "aceptado", "aceptada"].includes(value)) return "Aprobada";
  if (["rechazado", "rechazada", "rejected"].includes(value)) return "Rechazada";
  if (["en_revision", "en revisión", "revision", "revisión", "review", "in_review"].includes(value)) return "En revisión";
  if (["pendiente", "pending", "submitted"].includes(value)) return "Pendiente";
  return status || "Pendiente";
};

const getStudentEnrollmentStatusTone = (status) => {
  const normalized = normalizeStudentEnrollmentStatus(status);
  if (normalized === "Aprobada") return "bg-emerald-50 text-emerald-700";
  if (normalized === "Rechazada") return "bg-rose-50 text-rose-700";
  if (normalized === "En revisión") return "bg-sky-50 text-sky-700";
  return "bg-amber-50 text-amber-700";
};

const formatStudentDate = (value) => {
  if (!value) return "Fecha no disponible";
  const dateOnly = String(value).slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    const [year, month, day] = dateOnly.split("-").map(Number);
    return new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", year: "numeric" })
      .format(new Date(year, month - 1, day));
  }
  return formatDate(value);
};

// Presenta al docente sus módulos, indicadores y avisos de su sesión autenticada.
const TeacherDashboard = () => {
  const { profile, loading: profileLoading, error: profileError } = useContext(TeacherSessionContext);
  const [modules, setModules] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataOwnerId, setDataOwnerId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    if (!profile?.id) {
      return () => controller.abort();
    }

    Promise.all([
      api.get("/modules/list", { signal: controller.signal }),
      api.get("/module-enrollments/list", { signal: controller.signal }),
    ])
      .then(([modulesResponse, enrollmentsResponse]) => {
        const ownModules = getCollection(modulesResponse.data, "modules");
        const moduleIds = new Set(ownModules.map((module) => String(module.id)));
        const ownEnrollments = getCollection(enrollmentsResponse.data, "module_enrollments")
          .filter((enrollment) => moduleIds.has(String(enrollment.module_id ?? enrollment.module?.id)));
        if (active) {
          setModules(ownModules);
          setEnrollments(ownEnrollments);
          setDataOwnerId(String(profile.id));
          setError("");
          setLoading(false);
        }
      })
      .catch((requestError) => {
        if (!active || controller.signal.aborted) return;
        console.error("Error al cargar los datos del dashboard docente:", requestError);
        setModules([]);
        setEnrollments([]);
        setDataOwnerId(String(profile.id));
        setLoading(false);
        setError(
          requestError.response?.data?.message
          || requestError.message
          || "No se pudieron cargar los datos del docente.",
        );
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [profile?.id]);

  const dataIsCurrent = String(dataOwnerId) === String(profile?.id);
  const currentModules = dataIsCurrent ? modules : EMPTY_LIST;
  const currentEnrollments = dataIsCurrent ? enrollments : EMPTY_LIST;
  const dashboardError = dataIsCurrent ? error : "";
  const dashboardLoading = profileLoading
    || Boolean(profile?.id && (loading || !dataIsCurrent));

  const moduleSummaries = useMemo(() => currentModules.map((module) => {
    const moduleEnrollments = currentEnrollments.filter(
      (enrollment) => String(enrollment.module_id ?? enrollment.module?.id) === String(module.id),
    );
    const studentIds = new Set(
      moduleEnrollments.map(getStudentId)
        .filter((studentId) => studentId !== null && studentId !== undefined)
        .map(String),
    );
    const seats = Math.max(Number(module.seats) || 0, 0);
    const occupied = studentIds.size;

    return {
      ...module,
      occupied,
      seats,
      occupancy: seats ? Math.min(Math.round((occupied / seats) * 100), 100) : 0,
    };
  }), [currentModules, currentEnrollments]);

  const newStudents = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return new Set(
      currentEnrollments
        .filter((enrollment) => {
          const createdAt = new Date(enrollment.created_at);
          return getStudentId(enrollment) !== null
            && getStudentId(enrollment) !== undefined
            && !Number.isNaN(createdAt.getTime())
            && createdAt >= cutoff;
        })
        .map((enrollment) => String(getStudentId(enrollment))),
    ).size;
  }, [currentEnrollments]);

  const nextClosing = useMemo(() => moduleSummaries
    .map((module) => ({ module, days: getDaysUntil(module.enrollment_closes_at) }))
    .filter(({ days }) => days !== null && days >= 0)
    .sort((left, right) => left.days - right.days)[0] || null, [moduleSummaries]);

  const notices = useMemo(() => {
    const items = [];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    const recentByModule = new Map();

    currentEnrollments.forEach((enrollment) => {
      const createdAt = new Date(enrollment.created_at);
      const studentId = getStudentId(enrollment);
      if (studentId === null || studentId === undefined || Number.isNaN(createdAt.getTime()) || createdAt < cutoff) return;

      const moduleId = String(enrollment.module_id ?? enrollment.module?.id);
      const students = recentByModule.get(moduleId) || new Set();
      students.add(String(studentId));
      recentByModule.set(moduleId, students);
    });

    moduleSummaries.forEach((module) => {
      const recentCount = recentByModule.get(String(module.id))?.size || 0;
      if (recentCount) {
        items.push({
          key: `students-${module.id}`,
          icon: "bi-people",
          label: `${recentCount} alumno(s) nuevo(s) · ${module.name_module}`,
          status: "Nuevo",
          tone: "bg-sky-100 text-sky-700",
        });
      }

      const days = getDaysUntil(module.enrollment_closes_at);
      if (days !== null && days >= 0 && days <= 7) {
        items.push({
          key: `closing-${module.id}`,
          icon: "bi-calendar-event",
          label: days === 0 ? `La inscripción cierra hoy · ${module.name_module}` : `Cierre en ${days} día(s) · ${module.name_module}`,
          status: "Pronto",
          tone: "bg-amber-100 text-amber-700",
        });
      }

      if (!isPublished(module)) {
        items.push({
          key: `unpublished-${module.id}`,
          icon: "bi-cloud-upload",
          label: `${module.name_module}: pendiente de publicación`,
          status: "Pendiente",
          tone: "bg-violet-100 text-violet-700",
        });
      }
    });

    return items;
  }, [currentEnrollments, moduleSummaries]);

  if (dashboardLoading) {
    return (
      <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
        <section className="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm" role="status">
          Cargando los datos del docente...
        </section>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900" role="alert">
          {profileError}
        </section>
      </div>
    );
  }

  return (
    <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
      <section className="flex min-h-28 items-center justify-between gap-5 rounded-2xl bg-[#111629] px-6 py-5 text-white">
        <div>
          <p className="mb-1 text-sm text-slate-400">{profile.specialty || "Docente"}</p>
          <h1 className="m-0 text-2xl font-semibold max-sm:text-xl">Hola, {getTeacherName(profile)}</h1>
          <Link to="/SubirModulo" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-[#111629] no-underline transition hover:bg-emerald-300">
            <i className="bi bi-cloud-upload" aria-hidden="true" />
            Subir módulo
          </Link>
        </div>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-3xl text-emerald-300 max-sm:hidden">
          <i className="bi bi-journal-bookmark" aria-hidden="true" />
        </span>
      </section>

      <section aria-label="Resumen docente" className="grid grid-cols-3 gap-3 max-[650px]:grid-cols-1">
        <Metric icon="bi-journal-bookmark" label="Mis módulos" value={modules.length} tone="bg-sky-100 text-sky-600" />
        <Metric icon="bi-people" label="Alumnos nuevos (7 días)" value={newStudents} tone="bg-emerald-100 text-emerald-600" />
        <Metric
          icon="bi-calendar-event"
          label="Próximo cierre"
          value={!nextClosing ? "—" : nextClosing.days === 0 ? "Hoy" : `${nextClosing.days} días`}
          tone="bg-amber-100 text-amber-600"
        />
      </section>

      {dashboardError && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
          {dashboardError}
        </section>
      )}

      <div className="grid grid-cols-[1.2fr_1fr] gap-4 max-[760px]:grid-cols-1">
        <SectionCard
          title="Mis módulos"
          action={<Link to="/DocenteMo" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver todos</Link>}
        >
          {moduleSummaries.length === 0 ? (
            <p className="m-0 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              Aún no tienes módulos registrados.
            </p>
          ) : (
            <ul className="m-0 list-none space-y-4 p-0">
              {moduleSummaries.map((module) => (
              <li key={module.id}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{module.name_module}</span>
                  <span className="text-xs text-slate-500">{module.occupancy}% ocupado</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`Ocupación de ${module.name_module}`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={module.occupancy}
                >
                  <div className="h-full rounded-full bg-sky-400" style={{ width: `${module.occupancy}%` }} />
                </div>
                <p className="mb-0 mt-1 text-right text-xs text-slate-400">
                  {module.occupied} de {module.seats} cupos
                </p>
              </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Avisos">
          {notices.length === 0 ? (
            <p className="m-0 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              No tienes avisos pendientes.
            </p>
          ) : (
            <ul className="m-0 list-none divide-y divide-slate-100 p-0">
              {notices.map(({ key, icon, label, status, tone }) => (
                <li key={key} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <i className={`bi ${icon}`} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-sm text-slate-700">{label}</span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${tone}`}>{status}</span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

// Presenta al estudiante sus instituciones, matrículas y fechas desde la API.
const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    user: null,
    student: null,
    enrollments: [],
    moduleEnrollments: [],
    modules: [],
    institutions: [],
    campuses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const loadedData = await loadStudentDashboardData();
        if (!ignore) {
          setDashboardData(loadedData);
          setError(loadedData.warning);
        }
      } catch (loadError) {
        console.error("Error al cargar los datos del dashboard del estudiante:", loadError);
        if (!ignore) {
          setDashboardData({
            user: null,
            student: null,
            enrollments: [],
            moduleEnrollments: [],
            modules: [],
            institutions: [],
            campuses: [],
          });
          setError(getApiErrorMessage(loadError, "No se pudieron cargar los datos del dashboard."));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadDashboard();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const institutionById = useMemo(
    () => new Map(dashboardData.institutions.map((institution) => [String(institution.id), institution])),
    [dashboardData.institutions],
  );
  const campusById = useMemo(
    () => new Map(dashboardData.campuses.map((campus) => [String(campus.id), campus])),
    [dashboardData.campuses],
  );
  const featuredInstitutions = dashboardData.institutions.slice(0, 3);
  const recentEnrollments = useMemo(() => [...dashboardData.enrollments]
    .sort((first, second) => (
      (Date.parse(second.enrollment_date || second.created_at || "") || 0)
      - (Date.parse(first.enrollment_date || first.created_at || "") || 0)
    ))
    .slice(0, 4)
    .map((enrollment) => {
      const campusId = enrollment.campuse_id
        ?? enrollment.campus_id
        ?? enrollment.campuse?.id
        ?? enrollment.campus?.id;
      const campus = enrollment.campuse
        || enrollment.campus
        || campusById.get(String(campusId));
      const institutionId = enrollment.institution_id
        ?? enrollment.institution?.id
        ?? campus?.institution_id
        ?? campus?.institution?.id;
      const institution = enrollment.institution
        || campus?.institution
        || institutionById.get(String(institutionId));

      return {
        ...enrollment,
        dashboardInstitutionName: institution?.name_institution || "Institución no disponible",
        dashboardCampusName: campus?.name || "",
      };
    }), [campusById, dashboardData.enrollments, institutionById]);
  const upcomingClosings = useMemo(() => dashboardData.modules
    .filter((module) => isPublished(module))
    .map((module) => ({ module, days: getDaysUntil(module.enrollment_closes_at) }))
    .filter(({ days }) => days !== null && days >= 0)
    .sort((first, second) => first.days - second.days)
    .slice(0, 4), [dashboardData.modules]);
  const studentName = dashboardData.user
    ? getUserName(dashboardData.user)
    : "Estudiante";

  const retryLoad = () => {
    setLoading(true);
    setError("");
    setReloadKey((current) => current + 1);
  };

  return (
    <div className="ml-64 min-h-screen w-[calc(100%-16rem)] space-y-6 bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 p-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:space-y-4 max-sm:p-4">
      <header className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-8">
        <div className="pointer-events-none absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative flex items-center justify-between gap-5">
          <div className="min-w-0">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-100">
              <i className="bi bi-mortarboard-fill" aria-hidden="true" />
              Portal del estudiante
            </span>
            <h1 className="m-0 break-words text-2xl font-bold sm:text-3xl">
              Hola, {loading ? "..." : studentName}
            </h1>
            <p className="mb-0 mt-2 text-sm leading-6 text-slate-300">
              Consulta tus matrículas, explora instituciones y revisa las fechas de inscripción.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/Colegios" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-900 no-underline transition hover:bg-cyan-200">
                <i className="bi bi-buildings" aria-hidden="true" />
                Explorar instituciones
              </Link>
              <Link to="/ModulosAcademicos" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-white/15">
                <i className="bi bi-journal-bookmark" aria-hidden="true" />
                Ver módulos
              </Link>
            </div>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-3xl text-cyan-200 max-sm:hidden">
            <i className="bi bi-person-workspace" aria-hidden="true" />
          </span>
        </div>
      </header>

      {error && (
        <div role="alert" className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span className="flex flex-1 items-start gap-2">
            <i className="bi bi-exclamation-triangle-fill mt-0.5 shrink-0" aria-hidden="true" />
            {error}
          </span>
          <button type="button" onClick={retryLoad} disabled={loading} className="shrink-0 font-semibold underline underline-offset-2 disabled:opacity-50">
            {loading ? "Cargando..." : "Reintentar"}
          </button>
        </div>
      )}

      <section aria-label="Resumen del estudiante" className="grid grid-cols-3 gap-3 max-[760px]:grid-cols-1">
        <Metric icon="bi-journal-check" label="Matrículas registradas" value={loading ? "..." : dashboardData.enrollments.length} tone="bg-sky-100 text-sky-600" />
        <Metric icon="bi-book-half" label="Módulos inscritos" value={loading ? "..." : dashboardData.moduleEnrollments.length} tone="bg-violet-100 text-violet-600" />
        <Metric icon="bi-buildings" label="Instituciones disponibles" value={loading ? "..." : dashboardData.institutions.length} tone="bg-emerald-100 text-emerald-600" />
      </section>

      <section aria-label="Accesos rápidos" className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
        {[
          { to: "/Colegios", icon: "bi-buildings", title: "Instituciones", detail: "Encuentra una sede", tone: "bg-sky-50 text-sky-700" },
          { to: "/MatriculasE", icon: "bi-journal-check", title: "Mis matrículas", detail: "Consulta tus solicitudes", tone: "bg-emerald-50 text-emerald-700" },
          { to: "/ModulosAcademicos", icon: "bi-journal-bookmark", title: "Catálogo de módulos", detail: "Explora la oferta", tone: "bg-violet-50 text-violet-700" },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${item.tone}`}>
              <i className={`bi ${item.icon}`} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm">{item.title}</strong>
              <small className="text-xs text-slate-500">{item.detail}</small>
            </span>
            <i className="bi bi-arrow-up-right text-slate-300 transition group-hover:text-sky-600" aria-hidden="true" />
          </Link>
        ))}
      </section>

      <SectionCard
        title="Instituciones disponibles"
        action={<Link to="/Colegios" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver todas</Link>}
      >
        {loading ? (
          <div role="status" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((item) => <div key={item} className="h-48 animate-pulse rounded-xl bg-slate-100" />)}
          </div>
        ) : featuredInstitutions.length === 0 ? (
          <p className="m-0 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            {error ? "No se pudieron cargar las instituciones." : "Todavía no hay instituciones registradas."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {featuredInstitutions.map((institution) => {
              const campusCount = dashboardData.campuses.filter(
                (campus) => String(campus.institution_id ?? campus.institution?.id) === String(institution.id),
              ).length;
              const coverImage = institution.imagen_url || institution.logo_url;
              return (
                <Link
                  key={institution.id}
                  to={`/InfoSede?institutionId=${encodeURIComponent(institution.id)}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 text-slate-800 no-underline transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                >
                  <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 to-indigo-100">
                    {coverImage ? (
                      <img src={coverImage} alt={`Imagen de ${institution.name_institution}`} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                    ) : (
                      <i className="bi bi-buildings text-5xl text-sky-500/60" aria-hidden="true" />
                    )}
                    <span className="absolute bottom-2 left-2 rounded-full bg-slate-950/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      {institution.city || "Ubicación no especificada"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="m-0 line-clamp-1 text-sm font-bold text-slate-900">{institution.name_institution || "Institución educativa"}</h3>
                    <p className="mb-0 mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <i className="bi bi-geo-alt-fill text-sky-600" aria-hidden="true" />
                      {campusCount} {campusCount === 1 ? "sede disponible" : "sedes disponibles"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </SectionCard>

      <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
        <SectionCard
          title="Próximos cierres de inscripción"
          action={<Link to="/ModulosAcademicos" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver módulos</Link>}
        >
          {loading ? (
            <p role="status" className="m-0 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Cargando fechas...</p>
          ) : upcomingClosings.length === 0 ? (
            <p className="m-0 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
              {error ? "No se pudieron cargar las fechas de inscripción." : "No hay cierres de inscripción próximos."}
            </p>
          ) : (
            <ul className="m-0 list-none divide-y divide-slate-100 p-0">
              {upcomingClosings.map(({ module, days }) => (
                <li key={module.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${days <= 2 ? "bg-amber-50 text-amber-700" : "bg-sky-50 text-sky-700"}`}>
                    <i className="bi bi-calendar-event" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm font-semibold text-slate-800">{module.name_module || "Módulo académico"}</strong>
                    <small className="text-xs text-slate-500">Cierre: {formatStudentDate(module.enrollment_closes_at)}</small>
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${days <= 2 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                    {days === 0 ? "Hoy" : `${days} días`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard
          title="Mis matrículas recientes"
          action={<Link to="/MatriculasE" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver matrículas</Link>}
        >
          {loading ? (
            <p role="status" className="m-0 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Cargando matrículas...</p>
          ) : recentEnrollments.length === 0 ? (
            <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
              <p className="m-0 text-sm text-slate-500">
                {error ? "No se pudieron consultar tus matrículas." : "Aún no tienes matrículas registradas."}
              </p>
              {!error && <Link to="/Colegios" className="mt-3 inline-flex text-sm font-semibold text-sky-700 no-underline hover:text-sky-900">Explorar instituciones</Link>}
            </div>
          ) : (
            <ul className="m-0 list-none divide-y divide-slate-100 p-0">
              {recentEnrollments.map((enrollment) => {
                const status = normalizeStudentEnrollmentStatus(enrollment.status);
                return (
                  <li key={enrollment.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <i className="bi bi-journal-check" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm font-semibold text-slate-800">{enrollment.dashboardInstitutionName}</strong>
                      <small className="text-xs text-slate-500">
                        {enrollment.dashboardCampusName || formatStudentDate(enrollment.enrollment_date || enrollment.created_at)}
                      </small>
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStudentEnrollmentStatusTone(status)}`}>{status}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

const dashboards = {
  admin: AdminDashboard,
  teacher: TeacherDashboard,
  student: StudentDashboard,
};

// Selecciona el dashboard que corresponde al rol recibido.
const Dashboard = ({ role }) => {
  const RoleDashboard = dashboards[role];
  return <RoleDashboard />;
};

export default Dashboard;
