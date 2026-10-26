import { Link } from "react-router-dom";
import colegioSanVicente from "../assets/cole1.jpg";
import colegioComuner from "../assets/cole2.jpg";
import colegioTecnico from "../assets/cole3.jpg";

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

const SectionCard = ({ title, action, children, className = "" }) => (
  <section className={`rounded-2xl bg-white p-5 shadow-sm ${className}`}>
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="m-0 text-base font-semibold text-slate-800">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

const AdminDashboard = () => {
  const metrics = [
    { icon: "bi-bank", label: "Instituciones", value: "12", tone: "bg-sky-100 text-sky-600" },
    { icon: "bi-journal-check", label: "Matrículas", value: "248", tone: "bg-emerald-100 text-emerald-600" },
    { icon: "bi-hourglass-split", label: "Pendientes", value: "17", tone: "bg-amber-100 text-amber-600" },
    { icon: "bi-person-check", label: "Activos", value: "190", tone: "bg-violet-100 text-violet-600" },
  ];
  const applications = [
    { initials: "JE", name: "Juan Estrada", status: "Aprobada", tone: "bg-emerald-100 text-emerald-700" },
    { initials: "MR", name: "María Ruiz", status: "Pendiente", tone: "bg-amber-100 text-amber-700" },
    { initials: "LM", name: "Luis Mora", status: "En revisión", tone: "bg-sky-100 text-sky-700" },
  ];
  const recentActivity = [
    { icon: "bi-check-circle", title: "Matrícula aprobada", detail: "Juan Estrada · Institución San Vicente", time: "Hace 10 min", tone: "bg-emerald-100 text-emerald-600" },
    { icon: "bi-person-plus", title: "Nueva solicitud de matrícula", detail: "María Ruiz · Pendiente de revisión", time: "Hace 35 min", tone: "bg-amber-100 text-amber-600" },
    { icon: "bi-file-earmark-check", title: "Documentos enviados", detail: "Luis Mora · En revisión", time: "Hace 1 hora", tone: "bg-sky-100 text-sky-600" },
    { icon: "bi-building-add", title: "Institución registrada", detail: "La información está lista para revisión", time: "Ayer", tone: "bg-violet-100 text-violet-600" },
  ];
  const chart = [
    { month: "May", height: "42%" },
    { month: "Jun", height: "58%" },
    { month: "Jul", height: "48%" },
    { month: "Ago", height: "76%" },
    { month: "Sep", height: "94%" },
    { month: "Oct", height: "66%" },
  ];

  return (
    <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
      <section className="flex min-h-28 items-center justify-between gap-5 rounded-2xl bg-[#111629] px-6 py-5 text-white">
        <div>
          <p className="mb-1 text-sm text-slate-400">Así va la plataforma hoy.</p>
          <h1 className="m-0 text-2xl font-semibold max-sm:text-xl">Hola, Administrador</h1>
          <Link to="/RegistrarSede" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-[#111629] no-underline transition hover:bg-sky-300">
            <i className="bi bi-plus-lg" aria-hidden="true" />
            Registrar institución
          </Link>
        </div>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-3xl text-sky-300 max-sm:hidden">
          <i className="bi bi-mortarboard" aria-hidden="true" />
        </span>
      </section>

      <section aria-label="Resumen de la plataforma" className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-[520px]:grid-cols-1">
        {metrics.map((metric) => <Metric key={metric.label} {...metric} />)}
      </section>

      <div className="grid grid-cols-[1.2fr_1fr] gap-4 max-[760px]:grid-cols-1">
        <SectionCard title="Matrículas por mes" action={<span className="text-xs font-semibold text-sky-600">2026</span>}>
          <div className="flex h-36 items-end justify-around gap-3 border-b border-slate-100 px-2">
            {chart.map(({ month, height }) => (
              <div key={month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span
                  className={`w-full max-w-8 rounded-t-md ${month === "Sep" ? "bg-sky-500" : "bg-sky-200"}`}
                  style={{ height }}
                  aria-label={`${month}: ${height}`}
                />
                <span className="pb-2 text-[11px] text-slate-400">{month}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Últimas matrículas"
          action={<Link to="/RevicionD" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver todas</Link>}
        >
          <ul className="m-0 list-none divide-y divide-slate-100 p-0">
            {applications.map(({ initials, name, status, tone }) => (
              <li key={name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">{initials}</span>
                <span className="flex-1 text-sm text-slate-700">{name}</span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${tone}`}>{status}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Actividad reciente">
        <ul className="m-0 list-none divide-y divide-slate-100 p-0">
          {recentActivity.map(({ icon, title, detail, time, tone }) => (
            <li key={title} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base ${tone}`}>
                <i className={`bi ${icon}`} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-sm font-semibold text-slate-700">{title}</p>
                <p className="m-0 truncate text-xs text-slate-500">{detail}</p>
              </div>
              <time className="shrink-0 text-[11px] text-slate-400 sm:text-xs">{time}</time>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
};

const TeacherDashboard = () => {
  const modules = [
    { name: "Lengua Castellana I", progress: 80 },
    { name: "Literatura", progress: 55 },
    { name: "Comprensión lectora", progress: 30 },
  ];
  const notices = [
    { icon: "bi-people", label: "4 alumnos nuevos", status: "Nuevo", tone: "bg-sky-100 text-sky-700" },
    { icon: "bi-calendar-event", label: "Cierre en 12 días", status: "Pronto", tone: "bg-amber-100 text-amber-700" },
    { icon: "bi-cloud-upload", label: "Módulo 3 sin subir", status: "Pendiente", tone: "bg-violet-100 text-violet-700" },
  ];

  return (
    <div className="ml-64 space-y-4 p-7 max-sm:ml-[72px] max-sm:space-y-3 max-sm:p-4">
      <section className="flex min-h-28 items-center justify-between gap-5 rounded-2xl bg-[#111629] px-6 py-5 text-white">
        <div>
          <p className="mb-1 text-sm text-slate-400">Docente de planta · Humanidades</p>
          <h1 className="m-0 text-2xl font-semibold max-sm:text-xl">Hola, Carlos Alberto</h1>
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
        <Metric icon="bi-journal-bookmark" label="Mis módulos" value="6" tone="bg-sky-100 text-sky-600" />
        <Metric icon="bi-people" label="Alumnos nuevos" value="4" tone="bg-emerald-100 text-emerald-600" />
        <Metric icon="bi-calendar-event" label="Cierre en" value="12 días" tone="bg-amber-100 text-amber-600" />
      </section>

      <div className="grid grid-cols-[1.2fr_1fr] gap-4 max-[760px]:grid-cols-1">
        <SectionCard
          title="Mis módulos"
          action={<Link to="/DocenteMo" className="text-xs font-semibold text-sky-600 no-underline hover:text-sky-800">Ver todos</Link>}
        >
          <ul className="m-0 list-none space-y-4 p-0">
            {modules.map(({ name, progress }) => (
              <li key={name}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span className="text-xs text-slate-500">{progress}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label={`Avance de ${name}`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={progress}
                >
                  <div className="h-full rounded-full bg-sky-400" style={{ width: `${progress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Avisos">
          <ul className="m-0 list-none divide-y divide-slate-100 p-0">
            {notices.map(({ icon, label, status, tone }) => (
              <li key={label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <i className={`bi ${icon}`} aria-hidden="true" />
                </span>
                <span className="flex-1 text-sm text-slate-700">{label}</span>
                <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${tone}`}>{status}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
};

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

const Dashboard = ({ role }) => {
  const RoleDashboard = dashboards[role];
  return <RoleDashboard />;
};

export default Dashboard;
