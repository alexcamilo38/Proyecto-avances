import { Link, useLocation, useNavigate } from "react-router-dom";

const isTrue = (value) => value === true || value === 1 || value === "1";

const getDateOnly = (value) => {
  const date = String(value ?? "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
};

const getLocalDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const formatDate = (value) => {
  const date = getDateOnly(value);
  if (!date) return null;

  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

const DetalleM = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const modulo = state?.modulo ?? null;

  const iniciales = modulo?.docente
    ? modulo.docente.trim().split(/\s+/).map((parte) => parte[0]).slice(0, 2).join("").toUpperCase()
    : "?";
  const cuposAgotados = modulo?.cupos !== null
    && modulo?.cupos !== undefined
    && Number(modulo.cupos) <= 0;
  const fechaApertura = getDateOnly(modulo?.enrollment_opens_at);
  const fechaCierre = getDateOnly(modulo?.enrollment_closes_at);
  const fechaActual = getLocalDate();
  const periodoNoAbierto = fechaApertura && fechaApertura > fechaActual;
  const periodoCerrado = fechaCierre && fechaCierre < fechaActual;
  const publicado = isTrue(modulo?.is_published);
  const permiteAutoinscripcion = isTrue(modulo?.allow_self_enrollment);
  const puedePostularse = publicado
    && permiteAutoinscripcion
    && !cuposAgotados
    && !periodoNoAbierto
    && !periodoCerrado;

  let estadoInscripcion = "Inscripciones abiertas";
  if (!publicado) estadoInscripcion = "Módulo no publicado";
  else if (!permiteAutoinscripcion) estadoInscripcion = "Inscripción no disponible";
  else if (cuposAgotados) estadoInscripcion = "Sin cupos disponibles";
  else if (periodoNoAbierto) estadoInscripcion = "Inscripciones aún no abiertas";
  else if (periodoCerrado) estadoInscripcion = "Periodo de inscripción finalizado";

  const periodoInscripcion = `${formatDate(modulo?.enrollment_opens_at) || "Sin apertura"} – ${formatDate(modulo?.enrollment_closes_at) || "Sin cierre"}`;
  const detalles = [
    { label: "Días", value: modulo?.dias || "Por definir", icon: "bi-calendar-week" },
    { label: "Horario", value: modulo?.horario || "Por definir", icon: "bi-clock-fill" },
    { label: "Lugar", value: modulo?.lugar || "Por definir", icon: "bi-geo-alt-fill" },
    { label: "Duración", value: modulo?.duracion || "Por definir", icon: "bi-hourglass-split" },
  ];

  return (
    <main className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-slate-50 via-sky-50/40 to-slate-100 px-5 py-7 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6 pb-10">
        {!modulo ? (
          <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-lg shadow-slate-900/5 sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-3xl text-sky-600">
              <i className="bi bi-journal-x" aria-hidden="true" />
            </span>
            <h1 className="mb-0 mt-5 text-2xl font-bold text-slate-900">No se encontró el módulo</h1>
            <p className="mx-auto mb-0 mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Entra desde el catálogo y selecciona “Ver detalles” en el módulo que quieres consultar.
            </p>
            <Link
              to="/ModulosAcademicos"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white no-underline transition hover:bg-sky-700"
            >
              <i className="bi bi-arrow-left" aria-hidden="true" />
              Ir al catálogo
            </Link>
          </section>
        ) : (
          <>
            <Link
              to="/ModulosAcademicos"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 no-underline shadow-sm transition hover:border-sky-200 hover:text-sky-700"
            >
              <i className="bi bi-arrow-left" aria-hidden="true" />
              Volver al catálogo
            </Link>

            <header className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-14 -top-20 -z-10 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-40 w-40 rounded-full bg-indigo-400/15 blur-3xl" />
              <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800">
                    <i className="bi bi-journal-bookmark-fill" aria-hidden="true" />
                    Detalle del módulo
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${puedePostularse ? "bg-emerald-400/15 text-emerald-100" : "bg-white/10 text-slate-200"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${puedePostularse ? "bg-emerald-400" : "bg-slate-400"}`} />
                    {estadoInscripcion}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-100 sm:ml-auto">
                    <i className="bi bi-people-fill" aria-hidden="true" />
                    {modulo.cupos === null || modulo.cupos === undefined
                      ? "Cupos no definidos"
                      : cuposAgotados
                        ? "Sin cupos"
                        : `${modulo.cupos} ${Number(modulo.cupos) === 1 ? "cupo libre" : "cupos libres"}`}
                  </span>
                </div>

                <h1 className="mb-0 mt-0 max-w-4xl break-words text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {modulo.nombre || "Módulo académico"}
                </h1>

                <div className="mt-7 flex items-center gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 font-bold text-slate-900 shadow-lg shadow-slate-950/20">
                    {iniciales}
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-xs font-medium text-slate-300">Docente a cargo</p>
                    <p className="m-0 mt-0.5 break-words text-base font-semibold text-white sm:text-lg">
                      {modulo.docente || "Por asignar"}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <section aria-label="Detalles del módulo" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {detalles.map((detalle) => (
                <article key={detalle.label} className="flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-lg text-sky-700">
                    <i className={`bi ${detalle.icon}`} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-xs font-medium uppercase tracking-wide text-slate-400">{detalle.label}</p>
                    <p className="m-0 mt-1 break-words text-sm font-semibold text-slate-800">{detalle.value}</p>
                  </div>
                </article>
              ))}
            </section>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="flex min-w-0 flex-col gap-5">
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-7">
                  <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <i className="bi bi-info-circle-fill" aria-hidden="true" />
                    </span>
                    Acerca del módulo
                  </h2>
                  <p className="mb-0 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {modulo.descripcion || "Todavía no se ha agregado una descripción para este módulo."}
                  </p>
                </section>

                {modulo.temario?.length > 0 && (
                  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-7">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                        <i className="bi bi-list-check" aria-hidden="true" />
                      </span>
                      Contenido del módulo
                    </h2>
                    <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
                      {modulo.temario.map((tema, index) => (
                        <li key={`${tema}-${index}`} className="flex min-w-0 items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-cyan-300">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="break-words">{tema}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {modulo.requisitos?.length > 0 && (
                  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5 sm:p-7">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <i className="bi bi-patch-check-fill" aria-hidden="true" />
                      </span>
                      Requisitos
                    </h2>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {modulo.requisitos.map((requisito, index) => (
                        <li key={`${requisito}-${index}`} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                          <i className="bi bi-check-circle-fill mt-1 shrink-0 text-emerald-500" aria-hidden="true" />
                          <span className="break-words">{requisito}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="lg:sticky lg:top-6">
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
                  <div className="bg-gradient-to-r from-slate-900 to-sky-950 px-4 py-3 text-white">
                    <h2 className="m-0 flex items-center gap-2 text-sm font-bold">
                      <i className="bi bi-clipboard2-check-fill text-cyan-300" aria-hidden="true" />
                      Inscripción
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className={`mb-3 flex items-start gap-2.5 rounded-xl p-3 ${puedePostularse ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                      <i className={`bi ${puedePostularse ? "bi-check-circle-fill" : "bi-exclamation-circle-fill"} mt-0.5 shrink-0`} aria-hidden="true" />
                      <div>
                        <p className="m-0 text-xs font-bold leading-5">{estadoInscripcion}</p>
                        <p className="mb-0 mt-0.5 text-[11px] leading-4 opacity-80">
                          {puedePostularse
                            ? "Puedes iniciar tu postulación desde aquí."
                            : "Por ahora no es posible postularse a este módulo."}
                        </p>
                      </div>
                    </div>

                    <dl className="mb-4 mt-0 divide-y divide-dashed divide-slate-200">
                      <div className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="text-xs text-slate-500">Cupos libres</dt>
                        <dd className="m-0 text-right text-xs font-bold text-slate-900">{modulo.cupos ?? "No definidos"}</dd>
                      </div>
                      <div className="flex items-start justify-between gap-3 py-2.5">
                        <dt className="shrink-0 text-xs text-slate-500">Período</dt>
                        <dd className="m-0 max-w-[70%] text-right text-xs font-semibold leading-5 text-slate-800">{periodoInscripcion}</dd>
                      </div>
                    </dl>

                    {puedePostularse ? (
                      <button
                        type="button"
                        className="mb-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100"
                        onClick={() => navigate("/FormMod", { state: { modulo } })}
                      >
                        Postularme
                        <i className="bi bi-arrow-right" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="mb-2.5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                      >
                        Postulación no disponible
                        <i className="bi bi-lock-fill" aria-hidden="true" />
                      </button>
                    )}
                    <Link
                      to="/ModulosAcademicos"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 no-underline transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                    >
                      <i className="bi bi-arrow-left" aria-hidden="true" />
                      Volver al catálogo
                    </Link>
                  </div>
                </section>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DetalleM;
