import { useState } from "react";
import { Link } from "react-router-dom";
import { schoolGrades, useRectorData } from "./rectorStore";

const CatalogoMa = () => {
  const { data, error, updateData } = useRectorData();
  const [grade, setGrade] = useState("");
  const [subjectsText, setSubjectsText] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const addSubjects = (event) => {
    event.preventDefault();
    setFormError("");
    setNotice("");
    const subjects = [...new Set(subjectsText.split(/[\n,;]+/).map((subject) => subject.trim()).filter(Boolean))];
    if (subjects.length === 0) {
      setFormError("Escribe al menos una asignatura para agregar al grado.");
      return;
    }

    const saved = updateData((current) => {
      const existing = current.catalog.find((card) => card.grade === grade);
      const catalog = existing
        ? current.catalog.map((card) => (
          card.grade === grade
            ? { ...card, subjects: [...new Set([...card.subjects, ...subjects])] }
            : card
        ))
        : [...current.catalog, { id: `${grade}-${Date.now()}`, grade, subjects }];
      return { ...current, catalog };
    });

    if (saved) {
      setNotice(`Asignaturas agregadas al grado ${grade}.`);
      setSubjectsText("");
    } else {
      setFormError("No se pudieron guardar las asignaturas.");
    }
  };

  const deleteCard = (card) => {
    if (!window.confirm(`¿Eliminar el catálogo de ${card.grade}?`)) return;
    updateData((current) => ({
      ...current,
      catalog: current.catalog.filter(({ id }) => id !== card.id),
    }));
  };

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
            <i className="bi bi-journal-bookmark" aria-hidden="true" />
            Oferta educativa
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo académico</h1>
          <p className="mt-2 text-sm text-slate-500">Organiza las asignaturas que se enseñan en cada grado de tu institución.</p>
        </header>

        {(error || formError) && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError || error}</div>
        )}
        {notice && (
          <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</div>
        )}
        {!data.institution && (
          <div className="flex flex-col gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm text-violet-900 sm:flex-row sm:items-center sm:justify-between">
            <span>Registra primero la institución para asociar el catálogo académico.</span>
            <Link to="/RegistrarIns" className="font-bold text-violet-800 hover:text-violet-950">Registrar institución</Link>
          </div>
        )}

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-700">
              <i className="bi bi-plus-square" aria-hidden="true" />
            </span>
            <div>
              <h2 className="m-0 text-lg font-semibold text-slate-900">Crear o completar tarjeta por grado</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">Escribe una o varias asignaturas; sepáralas por coma o en líneas diferentes.</p>
            </div>
          </div>
          <form onSubmit={addSubjects} className="grid grid-cols-1 items-end gap-4 md:grid-cols-[minmax(160px,0.7fr)_minmax(0,2fr)_auto]">
            <label className="text-sm font-semibold text-slate-700">
              Grado
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" value={grade} onChange={(event) => setGrade(event.target.value)} required>
                <option value="" disabled>Selecciona un grado</option>
                {schoolGrades.map((schoolGrade) => <option key={schoolGrade} value={schoolGrade}>{schoolGrade}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Asignaturas
              <textarea className="mt-2 min-h-[50px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10" value={subjectsText} onChange={(event) => setSubjectsText(event.target.value)} placeholder="Matemáticas, Ciencias, Lenguaje..." required />
            </label>
            <button type="submit" className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/30">
              <i className="bi bi-plus-lg" aria-hidden="true" />
              Agregar
            </button>
          </form>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="m-0 text-xl font-bold text-slate-900">Asignaturas por grado</h2>
              <p className="mb-0 mt-1 text-sm text-slate-500">Cada tarjeta agrupa la oferta académica del grado.</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">{data.catalog.length} grados</span>
          </div>
          {data.catalog.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[...data.catalog].sort((a, b) => schoolGrades.indexOf(a.grade) - schoolGrades.indexOf(b.grade)).map((card) => (
                <article key={card.id} className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-xl text-violet-700">
                      <i className="bi bi-journal-text" aria-hidden="true" />
                    </span>
                    <button type="button" onClick={() => deleteCard(card)} aria-label={`Eliminar catálogo de ${card.grade}`} className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/20">
                      <i className="bi bi-trash3" aria-hidden="true" />
                    </button>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-700">Oferta académica</span>
                  <h3 className="mb-4 mt-1 text-2xl font-bold text-slate-900">Grado {card.grade}</h3>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {card.subjects.map((subject) => (
                      <li key={subject} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">{subject}</li>
                    ))}
                  </ul>
                  <p className="mb-0 mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    {card.subjects.length} {card.subjects.length === 1 ? "asignatura" : "asignaturas"}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <i className="bi bi-journal-plus text-4xl text-violet-300" aria-hidden="true" />
              <h3 className="mb-0 mt-4 text-lg font-semibold text-slate-800">Todavía no hay tarjetas</h3>
              <p className="mb-0 mt-2 text-sm text-slate-500">Elige un grado y agrega las asignaturas que se enseñan allí.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CatalogoMa;