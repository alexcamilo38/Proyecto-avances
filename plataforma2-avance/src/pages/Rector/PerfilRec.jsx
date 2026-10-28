import { useState } from "react";
import { Link } from "react-router-dom";
import admin from "../../assets/iconLE.png";
import { useRectorData } from "./rectorStore";

const ProfilePreference = ({ label, enabled, onToggle }) => (
  <div className="flex items-center justify-between gap-4 border-t border-slate-100 py-4 first:border-0 first:pt-0 last:pb-0">
    <span className="text-sm leading-5 text-slate-600">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${enabled ? "bg-violet-600" : "bg-slate-300"}`}
    >
      <span className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  </div>
);

const DetailSection = ({ title, description, icon, details, id }) => (
  <section id={id} className="scroll-mt-6 rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
    <div className="mb-6 flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
        <i className={`bi ${icon}`} aria-hidden="true" />
      </span>
      <div>
        <h2 className="m-0 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mb-0 mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
    <dl className="m-0 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {details.map(({ label, value, wide }) => (
        <div
          key={label}
          className={`min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 ${wide ? "sm:col-span-2" : ""}`}
        >
          <dt className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
          <dd className="m-0 break-words text-sm font-semibold leading-6 text-slate-700">{value || "No registrado"}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const PerfilRec = () => {
  const { data, error } = useRectorData();
  const [applicationAlerts, setApplicationAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const institution = data.institution;
  const approvedApplications = data.applications.filter(({ status }) => status === "Aprobada").length;
  const pendingApplications = data.applications.filter(({ status }) => status === "Pendiente").length;

  const rectorDetails = [
    { label: "Nombre del rector", value: "No registrado" },
    { label: "Cargo", value: "Rector institucional" },
    { label: "Documento de identidad", value: "No registrado" },
    { label: "Correo de contacto", value: institution?.email },
    { label: "Teléfono de contacto", value: institution?.phone },
  ];

  const institutionDetails = [
    { label: "Institución educativa", value: institution?.name, wide: true },
    { label: "NIT institucional", value: institution?.nit },
    { label: "Teléfono de oficina", value: institution?.phone },
    { label: "Correo institucional", value: institution?.email, wide: true },
    { label: "Dirección", value: institution?.address, wide: true },
  ];

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-6xl space-y-6">
        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        <header className="grid overflow-hidden rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(220px,0.8fr)_1.2fr]">
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-slate-100 to-indigo-100 p-8 md:min-h-72">
            <span className="absolute inset-0 bg-gradient-to-t from-violet-950/20 via-transparent to-transparent md:bg-gradient-to-r" />
            <img
              src={admin}
              alt="Representación gráfica del perfil rector"
              className="relative h-36 w-36 rounded-full border-4 border-white/80 bg-white object-contain p-3 shadow-xl sm:h-40 sm:w-40"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Cuenta activa
            </span>
          </div>

          <div className="flex flex-col justify-center gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="min-w-0">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                <i className="bi bi-building-fill-check" aria-hidden="true" />
                Perfil rector
              </span>
              <h1 className="m-0 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Rector institucional
              </h1>
              <p className="mb-2 mt-3 font-semibold text-violet-700">
                {institution?.name || "Institución sin registrar"}
              </p>
              <p className="m-0 flex items-center gap-2 text-sm text-slate-500">
                <i className="bi bi-geo-alt-fill text-violet-500" aria-hidden="true" />
                {institution?.address || "Dirección pendiente"}
              </p>
            </div>
            <a
              href="#datos-rector"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white no-underline shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/30 lg:self-center"
            >
              <i className="bi bi-person-vcard" aria-hidden="true" />
              Ver mis datos
            </a>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
          <div className="space-y-6">
            <DetailSection
              id="datos-rector"
              title="Datos del rector"
              description="Información de contacto y cargo asociada a esta cuenta."
              icon="bi-person-vcard"
              details={rectorDetails}
            />
            <DetailSection
              title="Institución vinculada"
              description="Datos institucionales registrados para tu gestión."
              icon="bi-building"
              details={institutionDetails}
            />
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
                  <i className="bi bi-graph-up" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="m-0 text-lg font-semibold text-slate-900">Mi actividad</h2>
                  <p className="mb-0 mt-1 text-sm text-slate-500">Resumen de la gestión de matrículas.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <span className="text-sm text-slate-600">Matrículas pendientes</span>
                  <strong className="text-lg font-bold text-slate-900">{pendingApplications}</strong>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <span className="text-sm text-slate-600">Matrículas aprobadas</span>
                  <strong className="text-lg font-bold text-slate-900">{approvedApplications}</strong>
                </div>
                <Link
                  to="/RevisarMa"
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 no-underline transition hover:bg-violet-100"
                >
                  Revisar solicitudes
                  <i className="bi bi-arrow-up-right" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
                  <i className="bi bi-shield-check" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="m-0 text-lg font-semibold text-slate-900">Seguridad</h2>
                  <p className="mb-0 mt-1 text-sm text-slate-500">Mantén protegida tu cuenta.</p>
                </div>
              </div>
              <Link
                to="/ReperaContra"
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 no-underline transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                Cambiar contraseña
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
              <div className="mb-5 flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg text-amber-600">
                  <i className="bi bi-sliders" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="m-0 text-lg font-semibold text-slate-900">Preferencias</h2>
                  <p className="mb-0 mt-1 text-sm text-slate-500">Configura tus avisos de gestión.</p>
                </div>
              </div>
              <ProfilePreference
                label="Alertas de nuevas postulaciones"
                enabled={applicationAlerts}
                onToggle={() => setApplicationAlerts((enabled) => !enabled)}
              />
              <ProfilePreference
                label="Resumen semanal"
                enabled={weeklyReports}
                onToggle={() => setWeeklyReports((enabled) => !enabled)}
              />
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PerfilRec;