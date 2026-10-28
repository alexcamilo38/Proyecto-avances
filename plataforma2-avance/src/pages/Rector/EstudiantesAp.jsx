import { useMemo, useState } from "react";
import { useRectorData } from "./rectorStore";

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10";
const grades = ["Preescolar", "1°", "2°", "3°", "4°", "5°", "6°", "7°", "8°", "9°", "10°", "11°"];

const EstudiantesAp = () => {
  const { data, error, updateData } = useRectorData();
  const [query, setQuery] = useState("");
  const [studentEditing, setStudentEditing] = useState(null);
  const [draft, setDraft] = useState(null);
  const [actionError, setActionError] = useState("");

  const students = useMemo(() => data.students.filter((student) => (
    `${student.name} ${student.username} ${student.enrollmentId} ${student.grade}`
      .toLowerCase()
      .includes(query.toLowerCase())
  )), [data.students, query]);

  const startEditing = (student) => {
    setStudentEditing(student);
    setDraft({ ...student });
    setActionError("");
  };

  const saveStudent = (event) => {
    event.preventDefault();
    const saved = updateData((current) => ({
      ...current,
      students: current.students.map((student) => (
        student.applicationId === studentEditing.applicationId ? draft : student
      )),
    }));
    if (saved) {
      setStudentEditing(null);
      setDraft(null);
    } else {
      setActionError("No se pudieron guardar los cambios del estudiante.");
    }
  };

  const deleteStudent = (student) => {
    if (!window.confirm(`¿Eliminar a ${student.name} de la lista de matriculados?`)) return;
    setActionError("");
    const saved = updateData((current) => ({
      ...current,
      students: current.students.filter(({ applicationId }) => applicationId !== student.applicationId),
    }));
    if (!saved) setActionError("No se pudo eliminar al estudiante.");
  };

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
              <i className="bi bi-people" aria-hidden="true" />
              Comunidad educativa
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Estudiantes aprobados</h1>
            <p className="mb-0 mt-2 text-sm text-slate-500">Gestiona el listado de estudiantes matriculados en tu institución.</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-3 shadow-sm">
            <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">Total matriculados</span>
            <strong className="mt-1 block text-2xl text-slate-900">{data.students.length}</strong>
          </div>
        </header>

        {(error || actionError) && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError || error}
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="m-0 text-lg font-semibold text-slate-900">Lista de matriculados</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">Los estudiantes aparecen al aprobar su postulación.</p>
            </div>
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">Buscar estudiante</span>
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10" placeholder="Buscar por nombre, usuario o grado" />
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Nombre / usuario</th>
                  <th className="px-5 py-4">ID matrícula</th>
                  <th className="px-5 py-4">Grado</th>
                  <th className="px-5 py-4">Edad</th>
                  <th className="px-5 py-4">Género</th>
                  <th className="px-5 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.applicationId} className="transition hover:bg-violet-50/40">
                    <td className="px-5 py-4">
                      <strong className="block text-sm font-semibold text-slate-800">{student.name}</strong>
                      <span className="mt-1 block text-xs text-slate-500">@{student.username}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-600">{student.enrollmentId}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{student.grade}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{student.age} años</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{student.gender}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => startEditing(student)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/20">
                          <i className="bi bi-pencil" aria-hidden="true" /> Editar
                        </button>
                        <button type="button" onClick={() => deleteStudent(student)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-500/20">
                          <i className="bi bi-trash3" aria-hidden="true" /> Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center">
                      <i className="bi bi-person-plus mb-3 block text-3xl text-slate-300" aria-hidden="true" />
                      <span className="block text-sm font-semibold text-slate-700">
                        {data.students.length === 0 ? "Aún no hay estudiantes aprobados" : "No se encontraron estudiantes"}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">
                        {data.students.length === 0 ? "Aprueba una postulación para agregarla a esta lista." : "Prueba con otro nombre, usuario o grado."}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {studentEditing && draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form onSubmit={saveStudent} role="dialog" aria-modal="true" aria-labelledby="edit-student-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-700">
                  <i className="bi bi-person-gear" aria-hidden="true" />
                </span>
                <h2 id="edit-student-title" className="m-0 text-xl font-bold text-slate-900">Editar estudiante</h2>
                <p className="mb-0 mt-1 text-sm text-slate-500">Actualiza los datos de matrícula.</p>
              </div>
              <button type="button" aria-label="Cerrar" onClick={() => setStudentEditing(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
            {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Nombre completo
                <input className={`${fieldClass} mt-2`} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Nombre de usuario
                <input className={`${fieldClass} mt-2`} value={draft.username} onChange={(event) => setDraft({ ...draft, username: event.target.value })} required />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                ID de matrícula
                <input className={`${fieldClass} mt-2`} value={draft.enrollmentId} onChange={(event) => setDraft({ ...draft, enrollmentId: event.target.value })} required />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Grado
                <select className={`${fieldClass} mt-2`} value={draft.grade} onChange={(event) => setDraft({ ...draft, grade: event.target.value })}>
                  {grades.map((grade) => <option key={grade} value={grade}>{grade}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Edad
                <input className={`${fieldClass} mt-2`} type="number" min="3" max="25" value={draft.age} onChange={(event) => setDraft({ ...draft, age: Number(event.target.value) })} required />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Género
                <select className={`${fieldClass} mt-2`} value={draft.gender} onChange={(event) => setDraft({ ...draft, gender: event.target.value })} required>
                  <option>Femenino</option>
                  <option>Masculino</option>
                  <option>Otro</option>
                  <option>Prefiero no decirlo</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <button type="button" onClick={() => setStudentEditing(null)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancelar</button>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/30">
                <i className="bi bi-check2" aria-hidden="true" /> Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EstudiantesAp;