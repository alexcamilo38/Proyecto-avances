import { useState } from "react";
import { Link } from "react-router-dom";
import { useRectorData } from "./rectorStore";

const statusClass = {
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Aprobada: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rechazada: "bg-red-50 text-red-700 ring-red-600/20",
};

const RevisarMa = () => {
  const { data, error, updateData } = useRectorData();
  const [gradeFilter, setGradeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [documentToView, setDocumentToView] = useState(null);
  const [actionError, setActionError] = useState("");

  const applications = data.applications.filter((application) => (
    (gradeFilter === "Todos" || application.grade === gradeFilter)
    && (statusFilter === "Todos" || application.status === statusFilter)
  ));
  const grades = [...new Set(data.applications.map(({ grade }) => grade))];

  const handleDecision = (application, status) => {
    setActionError("");
    const saved = updateData((current) => {
      const currentApplication = current.applications.find(({ id }) => id === application.id);
      if (!currentApplication || currentApplication.status !== "Pendiente") {
        return current;
      }

      const nextData = {
        ...current,
        applications: current.applications.map((item) => (
          item.id === application.id ? { ...item, status } : item
        )),
      };

      if (status === "Aprobada" && !current.students.some(({ applicationId }) => applicationId === application.id)) {
        const studentNumber = String(current.students.length + 1).padStart(3, "0");
        nextData.students = [
          ...current.students,
          {
            applicationId: application.id,
            username: application.user,
            name: application.name,
            enrollmentId: `MAT-2026-${studentNumber}`,
            grade: application.grade,
            age: application.age,
            gender: application.gender,
          },
        ];
      }
      return nextData;
    });
    if (!saved) setActionError("No se pudo guardar la decisión. Inténtalo de nuevo.");
  };

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
              <i className="bi bi-clipboard-check" aria-hidden="true" />
              Gestión académica
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Revisar matrículas</h1>
            <p className="mb-0 mt-2 text-sm text-slate-500">Revisa documentos y decide sobre las solicitudes de ingreso.</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-3 shadow-sm">
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">Solicitudes visibles</span>
            <strong className="mt-1 block text-2xl text-slate-900">{applications.length}</strong>
          </div>
        </header>

        {(error || actionError) && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError || error}
          </div>
        )}

        {!data.institution && (
          <div className="flex flex-col gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-900 sm:flex-row sm:items-center sm:justify-between">
            <span>Registra primero la institución para asociar estas solicitudes a una sede.</span>
            <Link to="/RegistrarIns" className="font-bold text-violet-800 hover:text-violet-950">Registrar institución</Link>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="m-0 text-lg font-semibold text-slate-900">Postulaciones recibidas</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">Las decisiones aprobadas se agregan a estudiantes matriculados.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="sr-only" htmlFor="filter-grade">Filtrar por grado</label>
              <select id="filter-grade" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" value={gradeFilter} onChange={(event) => setGradeFilter(event.target.value)}>
                <option value="Todos">Todos los grados</option>
                {grades.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
              </select>
              <label className="sr-only" htmlFor="filter-status">Filtrar por estado</label>
              <select id="filter-status" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="Todos">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Usuario postulante</th>
                  <th className="px-5 py-4">Grado / nivel</th>
                  <th className="px-5 py-4">Documento</th>
                  <th className="px-5 py-4">Fecha de envío</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((application) => (
                  <tr key={application.id} className="transition hover:bg-violet-50/40">
                    <td className="px-5 py-4">
                      <strong className="block text-sm font-semibold text-slate-800">{application.name}</strong>
                      <span className="mt-1 block text-xs text-slate-500">@{application.user}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{application.grade}</td>
                    <td className="px-5 py-4">
                      <button type="button" onClick={() => setDocumentToView(application)} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 focus:outline-none focus:underline">
                        <i className="bi bi-file-earmark-pdf" aria-hidden="true" />
                        Ver documento
                      </button>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{new Date(`${application.submittedAt}T12:00:00`).toLocaleDateString("es-CO")}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusClass[application.status]}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {application.status === "Pendiente" ? (
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => handleDecision(application, "Aprobada")} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20">
                            <i className="bi bi-check-lg" aria-hidden="true" /> Aprobar
                          </button>
                          <button type="button" onClick={() => handleDecision(application, "Rechazada")} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-500/20">
                            <i className="bi bi-x-lg" aria-hidden="true" /> Rechazar
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Decisión registrada</span>
                      )}
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr><td colSpan="6" className="px-5 py-12 text-center text-sm text-slate-500">No hay postulaciones para los filtros seleccionados.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {documentToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setDocumentToView(null);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="document-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-700">
                  <i className="bi bi-file-earmark-pdf" aria-hidden="true" />
                </span>
                <h2 id="document-title" className="m-0 text-lg font-bold text-slate-900">Documento de postulación</h2>
              </div>
              <button type="button" aria-label="Cerrar" onClick={() => setDocumentToView(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm text-slate-600"><strong>Postulante:</strong> {documentToView.name}</p>
            <p className="text-sm text-slate-600"><strong>Archivo:</strong> {documentToView.document}</p>
            <p className="mb-0 rounded-xl bg-amber-50 p-3 text-sm leading-5 text-amber-800">
              Este registro de demostración no incluye el archivo PDF real.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default RevisarMa;