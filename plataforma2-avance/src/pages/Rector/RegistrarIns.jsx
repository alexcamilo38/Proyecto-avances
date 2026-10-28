import { useState } from "react";
import { useRectorData } from "./rectorStore";

const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10";
const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const RegistrarIns = () => {
  const { data, error, updateData } = useRectorData();
  const [form, setForm] = useState({
    name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const saved = updateData((current) => {
      if (current.institution) {
        throw new Error("Ya se registró una institución para esta cuenta de rector.");
      }
      return {
        ...current,
        institution: { ...form, createdAt: new Date().toISOString() },
      };
    });
    if (!saved) return;
  };

  const institution = data.institution;

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
            <i className="bi bi-building" aria-hidden="true" />
            Portal del rector
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {institution ? "Mi institución" : "Registrar institución"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {institution
              ? "La institución asociada a tu cuenta y sus datos registrados."
              : "Registra una sola institución para habilitar la gestión de matrículas y estudiantes."}
          </p>
        </header>

        {error && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {institution ? (
          <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
            <div className="bg-gradient-to-r from-violet-700 to-indigo-800 p-6 text-white sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                <i className="bi bi-patch-check-fill" aria-hidden="true" />
                Institución registrada
              </span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{institution.name}</h2>
              <p className="mb-0 mt-2 flex items-center gap-2 text-sm text-violet-100">
                <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                {institution.address}
              </p>
            </div>
            <dl className="m-0 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8">
              {[
                ["NIT", institution.nit],
                ["Teléfono", institution.phone],
                ["Correo institucional", institution.email],
                ["Descripción", institution.description],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <dt className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                  <dd className="m-0 break-words text-sm font-semibold leading-6 text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mx-6 mb-6 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-800 sm:mx-8 sm:mb-8">
              <i className="bi bi-info-circle mr-2" aria-hidden="true" />
              El registro es único para esta cuenta. La institución ya está disponible para su gestión.
            </p>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-700">
                <i className="bi bi-building-add" aria-hidden="true" />
              </span>
              <div>
                <h2 className="m-0 text-lg font-semibold text-slate-900">Datos institucionales</h2>
                <p className="mb-0 mt-1 text-sm text-slate-500">Completa la información oficial de tu institución.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="institution-name">Nombre de la institución</label>
                <input id="institution-name" className={fieldClass} name="name" value={form.name} onChange={handleChange} placeholder="Institución Educativa" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-nit">NIT</label>
                <input id="institution-nit" className={fieldClass} name="nit" value={form.nit} onChange={handleChange} placeholder="900.123.456-7" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-email">Correo institucional</label>
                <input id="institution-email" className={fieldClass} type="email" name="email" value={form.email} onChange={handleChange} placeholder="contacto@institucion.edu.co" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="institution-phone">Teléfono</label>
                <input id="institution-phone" className={fieldClass} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="602 000 0000" required />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="institution-address">Dirección y ciudad</label>
                <input id="institution-address" className={fieldClass} name="address" value={form.address} onChange={handleChange} placeholder="Dirección, ciudad y departamento" required />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="institution-description">Descripción institucional</label>
                <textarea id="institution-description" className={`${fieldClass} min-h-28 resize-y`} name="description" value={form.description} onChange={handleChange} placeholder="Reseña, enfoque educativo y niveles ofrecidos" required />
              </div>
            </div>
            <div className="mt-7 flex flex-col-reverse justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
              <p className="m-0 max-w-lg text-xs leading-5 text-slate-500">
                Revisa la información antes de guardar. Solo se permite un registro de institución por cuenta.
              </p>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/30">
                <i className="bi bi-check2-circle" aria-hidden="true" />
                Registrar institución
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarIns;