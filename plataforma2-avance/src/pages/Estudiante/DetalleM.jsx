import { useLocation, useNavigate, Link } from "react-router-dom";

const DetalleM = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const modulo = state?.modulo ?? null;

  const esVirtual = String(modulo?.modalidad ?? "").toLowerCase() === "virtual";
  const iniciales = modulo?.docente
    ? modulo.docente.trim().split(/\s+/).map((parte) => parte[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] bg-slate-100 px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto w-full max-w-[1100px] pb-10">
        {!modulo ? (
          <section className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[0_10px_25px_rgba(0,0,0,0.03)]">
            <i className="bi bi-journal-x text-5xl text-slate-400" aria-hidden="true" />
            <h1 className="mb-2 mt-3 text-2xl font-bold text-[#1a1c2d]">No se encontró el módulo</h1>
            <p className="mx-auto mb-6 mt-0 max-w-lg text-slate-600">
              Entra desde el catálogo y pulsa "Más Detalles" en el módulo que quieras ver.
            </p>
            <Link
              to="/ModulosAcademicos"
              className="inline-flex items-center justify-center rounded-xl bg-[#1a1c2d] px-6 py-3 font-bold text-[#4facfe] no-underline transition hover:bg-[#2a2d45]"
            >
              Ir a Módulos Académicos
            </Link>
          </section>
        ) : (
          <>
            <section className="relative mb-7 overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_90%_0%,rgba(79,172,254,0.35),transparent_45%),linear-gradient(135deg,#1a1c2d,#2a2d45)] p-6 text-white shadow-[0_18px_40px_rgba(26,28,45,0.25)] sm:p-9">
              <div className="mb-4 flex flex-wrap items-center gap-3.5">
                <span className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide ${esVirtual ? "bg-[#f3e8ff] text-[#7e22ce]" : "bg-[#e0f2fe] text-[#0369a1]"}`}>
                  {modulo.modalidad || "Presencial"}
                </span>
                {modulo.cupos !== undefined && (
                  <span className="ml-auto rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold">
                    <i className="bi bi-people-fill mr-1.5" aria-hidden="true" />
                    {modulo.cupos} cupos libres
                  </span>
                )}
              </div>

              <h1 className="mb-6 mt-0 break-words text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {modulo.nombre}
              </h1>

              <div className="mb-7 flex items-center gap-3.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4facfe] font-extrabold text-[#1a1c2d]">
                  {iniciales}
                </span>
                <div className="flex min-w-0 flex-col">
                  <small className="text-xs text-slate-400">Docente a cargo</small>
                  <strong className="break-words text-lg">{modulo.docente || "Por asignar"}</strong>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3.5 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 sm:px-4">
                  <i className="bi bi-calendar-week shrink-0 text-xl text-[#4facfe]" aria-hidden="true" />
                  <div className="min-w-0">
                    <small className="block text-xs text-slate-400">Días</small>
                    <span className="break-words text-sm font-semibold">{modulo.dias || "Por definir"}</span>
                  </div>
                </div>
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 sm:px-4">
                  <i className="bi bi-clock shrink-0 text-xl text-[#4facfe]" aria-hidden="true" />
                  <div className="min-w-0">
                    <small className="block text-xs text-slate-400">Horario</small>
                    <span className="break-words text-sm font-semibold">{modulo.horario || "Por definir"}</span>
                  </div>
                </div>
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 sm:px-4">
                  <i className={`bi ${esVirtual ? "bi-laptop" : "bi-geo-alt"} shrink-0 text-xl text-[#4facfe]`} aria-hidden="true" />
                  <div className="min-w-0">
                    <small className="block text-xs text-slate-400">{esVirtual ? "Plataforma" : "Lugar"}</small>
                    <span className="break-words text-sm font-semibold">{modulo.lugar || "Por definir"}</span>
                  </div>
                </div>
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 sm:px-4">
                  <i className="bi bi-hourglass-split shrink-0 text-xl text-[#4facfe]" aria-hidden="true" />
                  <div className="min-w-0">
                    <small className="block text-xs text-slate-400">Duración</small>
                    <span className="break-words text-sm font-semibold">{modulo.duracion || "Por definir"}</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid items-start gap-3 [grid-template-columns:minmax(0,1fr)_320px] max-[950px]:grid-cols-1">
              <div className="flex min-w-0 flex-col gap-3">
                {modulo.descripcion && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h2 className="mb-2.5 flex items-center gap-2 border-b border-slate-200 pb-2.5 text-sm font-semibold text-[#1a1c2d]">
                      <i className="bi bi-info-circle text-xs text-[#4facfe]" aria-hidden="true" />
                      Acerca del módulo
                    </h2>
                    <p className="m-0 text-xs leading-5 text-slate-600 sm:text-sm">{modulo.descripcion}</p>
                  </section>
                )}

                {modulo.temario?.length > 0 && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h2 className="mb-2.5 flex items-center gap-2 border-b border-slate-200 pb-2.5 text-sm font-semibold text-[#1a1c2d]">
                      <i className="bi bi-list-check text-xs text-[#4facfe]" aria-hidden="true" />
                      Contenido del módulo
                    </h2>
                    <ol className="m-0 flex list-none flex-col gap-2 p-0">
                      {modulo.temario.map((tema, index) => (
                        <li key={`${tema}-${index}`} className="flex min-w-0 items-center gap-2.5 rounded-xl bg-slate-50 px-2.5 py-2 text-xs text-slate-700 sm:text-sm">
                          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#1a1c2d] text-[10px] font-extrabold text-[#4facfe]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="break-words">{tema}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {modulo.requisitos?.length > 0 && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h2 className="mb-2.5 flex items-center gap-2 border-b border-slate-200 pb-2.5 text-sm font-semibold text-[#1a1c2d]">
                      <i className="bi bi-patch-check text-xs text-[#4facfe]" aria-hidden="true" />
                      Requisitos obligatorios
                    </h2>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {modulo.requisitos.map((requisito, index) => (
                        <li key={`${requisito}-${index}`} className="flex items-start gap-2 text-xs text-slate-600 sm:text-sm">
                          <i className="bi bi-check-circle-fill mt-0.5 shrink-0 text-[11px] text-emerald-500" aria-hidden="true" />
                          <span className="break-words leading-5">{requisito}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="sticky top-6 max-[950px]:static">
                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h2 className="mb-3 border-b border-slate-200 pb-2.5 text-sm font-semibold text-[#1a1c2d]">Resumen</h2>
                  <dl className="mb-4 mt-0">
                    <div className="flex justify-between gap-3 border-b border-dashed border-slate-200 py-2">
                      <dt className="text-xs text-slate-400">Modalidad</dt>
                      <dd className="m-0 text-right text-xs font-semibold text-slate-800">{modulo.modalidad || "Presencial"}</dd>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-dashed border-slate-200 py-2">
                      <dt className="text-xs text-slate-400">Días</dt>
                      <dd className="m-0 text-right text-xs font-semibold text-slate-800">{modulo.dias || "Por definir"}</dd>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-dashed border-slate-200 py-2">
                      <dt className="text-xs text-slate-400">Horario</dt>
                      <dd className="m-0 text-right text-xs font-semibold text-slate-800">{modulo.horario || "Por definir"}</dd>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-dashed border-slate-200 py-2">
                      <dt className="text-xs text-slate-400">{esVirtual ? "Plataforma" : "Lugar"}</dt>
                      <dd className="m-0 max-w-[60%] break-words text-right text-xs font-semibold text-slate-800">{modulo.lugar || "Por definir"}</dd>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-dashed border-slate-200 py-2">
                      <dt className="text-xs text-slate-400">Duración</dt>
                      <dd className="m-0 text-right text-xs font-semibold text-slate-800">{modulo.duracion || "Por definir"}</dd>
                    </div>
                    <div className="flex justify-between gap-3 py-2">
                      <dt className="text-xs text-slate-400">Cupos libres</dt>
                      <dd className="m-0 text-right text-sm font-bold text-[#0369a1]">{modulo.cupos ?? "—"}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1a1c2d] to-[#2a2d45] p-2.5 text-xs font-bold text-[#4facfe] transition hover:-translate-y-0.5 hover:shadow-lg"
                    onClick={() => navigate("/FormMod", { state: { modulo } })}
                  >
                    Postularme <i className="bi bi-send-fill" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 p-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200"
                    onClick={() => navigate(-1)}
                  >
                    Volver al catálogo
                  </button>
                </section>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetalleM;