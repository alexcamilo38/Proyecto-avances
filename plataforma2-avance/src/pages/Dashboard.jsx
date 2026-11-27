import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Config/env";
import colegioSanVicente from "../assets/cole1.jpg";
import colegioComuner from "../assets/cole2.jpg";
import colegioTecnico from "../assets/cole3.jpg";
import { getApiErrorMessage, getCollection } from "./Auth/authUtils";
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

// Ofrece al estudiante accesos a instituciones, matrícula y fechas relevantes.
const StudentDashboard = () => {
  const schools = [
    { name: "I.E. San Vicente", location: "Popayán · Sede Principal", image: colegioSanVicente, availability: "Cupos abiertos", tone: "bg-emerald-100 text-emerald-700" },
    { name: "I.E. Los Comuneros", location: "Popayán · Norte", image: colegioComuner, availability: "Pocos cupos", tone: "bg-amber-100 text-amber-700" },
    { name: "I.E. Técnica Industrial", location: "Popayán · Centro", image: colegioTecnico, availability: "Cupos abiertos", tone: "bg-emerald-100 text-emerald-700" },
  ];
  const dates = [
    { day: "28", month: "OCT", title: "Cierre de inscripciones", detail: "Última fecha para postularte" },
    { day: "04", month: "NOV", title: "Revisión de documentos", detail: "Secretaría académica" },
    { day: "15", month: "NOV", title: "Publicación de resultados", detail: "Lo verás en Mis Matrículas" },
  ];
  const tasks = ["Datos personales", "Documentos subidos", "Confirmar institución"];

  return (
    <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
      <section className="flex min-h-40 items-center justify-between gap-5 rounded-2xl bg-[#111629] px-6 py-5 text-white">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm text-slate-400">Encuentra tu institución y empieza tu matrícula.</p>
          <h1 className="m-0 text-2xl font-semibold max-sm:text-xl">Hola, Juan Andrés</h1>
          <div className="mt-4 flex max-w-md items-center gap-2 rounded-xl bg-white p-1.5">
            <i className="bi bi-search pl-3 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              aria-label="Buscar institución"
              placeholder="Busca por nombre o ciudad"
              className="min-w-0 flex-1 px-1 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <Link to="/Colegios" className="rounded-lg bg-orange-400 px-4 py-2.5 text-sm font-semibold text-[#111629] no-underline hover:bg-orange-300">Buscar</Link>
          </div>
        </div>
        <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-orange-400/15 text-3xl text-orange-300 max-sm:hidden">
          <i className="bi bi-mortarboard" aria-hidden="true" />
        </span>
      </section>

      <section aria-label="Accesos rápidos" className="grid grid-cols-3 gap-3 max-[650px]:grid-cols-1">
        <Link to="/Colegios" className="flex items-center gap-3 rounded-2xl bg-white p-4 text-slate-800 no-underline shadow-sm transition hover:-translate-y-0.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600"><i className="bi bi-buildings" aria-hidden="true" /></span>
          <span><strong className="block text-sm">Explorar instituciones</strong><small className="text-xs text-slate-500">Conoce las sedes</small></span>
        </Link>
        <Link to="/MatriculasE" className="flex items-center gap-3 rounded-2xl bg-white p-4 text-slate-800 no-underline shadow-sm transition hover:-translate-y-0.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"><i className="bi bi-journal-check" aria-hidden="true" /></span>
          <span><strong className="block text-sm">Iniciar matrícula</strong><small className="text-xs text-slate-500">Empieza en minutos</small></span>
        </Link>
        <Link to="/ModulosAcademicos" className="flex items-center gap-3 rounded-2xl bg-white p-4 text-slate-800 no-underline shadow-sm transition hover:-translate-y-0.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600"><i className="bi bi-folder2-open" aria-hidden="true" /></span>
          <span><strong className="block text-sm">Ver catálogos</strong><small className="text-xs text-slate-500">Programas y niveles</small></span>
        </Link>
      </section>

      <SectionCard
        title="Instituciones destacadas"
        action={<Link to="/Colegios" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver todas</Link>}
      >
        <div className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
          {schools.map(({ name, location, image, availability, tone }) => (
            <Link key={name} to="/InfoSede" className="overflow-hidden rounded-xl border border-slate-200 text-slate-800 no-underline transition hover:border-sky-300">
              <img src={image} alt="" className="h-24 w-full object-cover" />
              <div className="p-3">
                <h3 className="m-0 text-sm font-semibold">{name}</h3>
                <p className="mb-2 mt-1 text-xs text-slate-500">{location}</p>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tone}`}>{availability}</span>
              </div>
            </Link>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4 max-[760px]:grid-cols-1">
        <SectionCard title="Fechas importantes">
          <ul className="m-0 list-none divide-y divide-slate-100 p-0">
            {dates.map(({ day, month, title, detail }) => (
              <li key={title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <strong className="text-sm leading-4">{day}</strong><small className="text-[9px] text-slate-500">{month}</small>
                </span>
                <span><strong className="block text-sm font-medium text-slate-700">{title}</strong><small className="text-xs text-slate-500">{detail}</small></span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Estado de tu matrícula" action={<span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-medium text-sky-700">En revisión</span>}>
          <ol aria-label="Progreso de matrícula" className="m-0 flex list-none items-start p-0">
            {["Datos", "Documentos", "Revisión", "Confirmada"].map((step, index) => (
              <li key={step} className="relative flex flex-1 flex-col items-center gap-2 text-center text-[11px] text-slate-500">
                {index > 0 && <span className={`absolute right-1/2 top-3 h-0.5 w-full ${index < 3 ? "bg-emerald-400" : "bg-slate-200"}`} aria-hidden="true" />}
                <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white ${index < 2 ? "bg-emerald-400" : index === 2 ? "bg-sky-400" : "bg-slate-200"}`}>
                  {index < 2 ? <i className="bi bi-check" aria-hidden="true" /> : index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <ul className="mt-5 list-none divide-y divide-slate-100 p-0">
            {tasks.map((task, index) => (
              <li key={task} className="flex items-center gap-3 py-2.5 text-sm text-slate-600">
                <i className={`bi ${index < 2 ? "bi-check-square-fill text-emerald-500" : "bi-square text-slate-300"}`} aria-hidden="true" />
                {task}
              </li>
            ))}
          </ul>
          <Link to="/MatriculasE" className="mt-3 inline-flex text-sm font-semibold text-sky-600 no-underline hover:text-sky-800">Ver mi matrícula <i className="bi bi-arrow-right ml-2" aria-hidden="true" /></Link>
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
