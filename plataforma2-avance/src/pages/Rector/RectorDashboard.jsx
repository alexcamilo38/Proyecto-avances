import { Link } from "react-router-dom";
import { useRectorData } from "./rectorStore";

const RectorDashboard = () => {
  const { data, error } = useRectorData();
  const pending = data.applications.filter(({ status }) => status === "Pendiente").length;
  const approved = data.applications.filter(({ status }) => status === "Aprobada").length;
  const rejected = data.applications.filter(({ status }) => status === "Rechazada").length;
  const metrics = [
    { label: "Pendientes de revisión", value: pending, icon: "bi-hourglass-split", tone: "bg-amber-50 text-amber-700" },
    { label: "Matrículas aprobadas", value: approved, icon: "bi-person-check", tone: "bg-emerald-50 text-emerald-700" },
    { label: "Solicitudes rechazadas", value: rejected, icon: "bi-person-x", tone: "bg-red-50 text-red-700" },
    { label: "Grados con asignaturas", value: data.catalog.length, icon: "bi-journal-bookmark", tone: "bg-violet-50 text-violet-700" },
  ];

  return (
    <div className="ml-64 space-y-6 p-7 max-sm:ml-[72px] max-sm:p-4">
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-800 via-violet-900 to-indigo-950 px-6 py-7 text-white shadow-lg shadow-violet-950/10 sm:px-9 sm:py-9">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
              <i className="bi bi-building-fill-check" aria-hidden="true" />
              Portal del rector
            </span>
            <h1 className="mb-0 mt-4 text-2xl font-bold sm:text-3xl">
              {data.institution ? `Bienvenido, ${data.institution.name}` : "Gestiona tu institución educativa"}
            </h1>
            <p className="mb-0 mt-2 text-sm leading-6 text-violet-100">
              Administra postulaciones, estudiantes matriculados y oferta académica desde un solo lugar.
            </p>
            {!data.institution && (
              <Link to="/RegistrarIns" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-800 no-underline transition hover:bg-violet-50 focus:outline-none focus:ring-4 focus:ring-white/30">
                <i className="bi bi-building-add" aria-hidden="true" />
                Registrar institución
              </Link>
            )}
          </div>
          <span className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-4xl text-violet-100 sm:flex">
            <i className="bi bi-mortarboard" aria-hidden="true" />
          </span>
        </div>
      </section>

      <section aria-label="Resumen de gestión" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${metric.tone}`}>
              <i className={`bi ${metric.icon}`} aria-hidden="true" />
            </span>
            <div>
              <p className="m-0 text-xs text-slate-500">{metric.label}</p>
              <p className="m-0 mt-1 text-2xl font-bold text-slate-900">{metric.value}</p>
            </div>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-4">
          <h2 className="m-0 text-xl font-bold text-slate-900">Accesos rápidos</h2>
          <p className="mb-0 mt-1 text-sm text-slate-500">Continúa con la gestión de tu comunidad educativa.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { to: "/RegistrarIns", title: data.institution ? "Ver institución" : "Registrar institución", description: "Consulta la información institucional.", icon: "bi-building", tone: "bg-violet-50 text-violet-700" },
            { to: "/RevisarMa", title: "Revisar matrículas", description: "Aprueba o rechaza postulaciones.", icon: "bi-clipboard-check", tone: "bg-amber-50 text-amber-700" },
            { to: "/EstudiantesAp", title: "Estudiantes", description: "Administra a los estudiantes aprobados.", icon: "bi-people", tone: "bg-emerald-50 text-emerald-700" },
            { to: "/CatalogoMa", title: "Catálogo académico", description: "Organiza asignaturas por grado.", icon: "bi-journal-bookmark", tone: "bg-blue-50 text-blue-700" },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="group rounded-2xl border border-slate-100 bg-white p-5 no-underline shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-violet-500/20">
              <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg ${item.tone}`}>
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </span>
              <h3 className="m-0 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mb-0 mt-2 text-sm leading-5 text-slate-500">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                Abrir <i className="bi bi-arrow-right transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RectorDashboard;
