import { useState } from "react";
import { useLocation } from "react-router-dom";

const MAX_MOTIVO = 300;

const controlClass =
  "w-full rounded-xl border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] px-[15px] py-3 text-base text-[#1e293b] outline-none transition placeholder:text-slate-400 focus:border-[#4facfe] focus:bg-white focus:shadow-[0_0_0_4px_rgba(79,172,254,0.1)]";

const Field = ({ label, name, children, className = "" }) => (
  <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
    <label htmlFor={name} className="text-sm font-semibold text-slate-600">
      {label} <span className="font-bold text-red-500" aria-hidden="true">*</span>
    </label>
    {children}
  </div>
);

const StepHeader = ({ number, title }) => (
  <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4 sm:mb-6">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1c2d] text-sm font-extrabold text-[#4facfe]">
      {number}
    </span>
    <h2 className="m-0 text-base font-bold text-[#1a1c2d] sm:text-lg">{title}</h2>
  </div>
);

const PostularmeM = () => {
  const { state } = useLocation();
  const moduloRecibido = state?.modulo;
  const nombreModulo = typeof moduloRecibido === "string"
    ? moduloRecibido
    : moduloRecibido?.nombre ?? "";

  const [formulario, setFormulario] = useState(() => ({
    nombres: "",
    apellidos: "",
    tipoDoc: "",
    numeroDoc: "",
    telefono: "",
    correo: "",
    modulo: nombreModulo,
    jornada: "",
    nivel: "",
    motivo: "",
    r1: false,
    r2: false,
    veraz: false,
    datos: false,
  }));
  const [archivo, setArchivo] = useState(null);

  const modulos = [
    "Programación Orientada a Objetos (Java)",
    "Desarrollo Web con PHP y Laravel",
    "Agroindustria",
  ];

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (event) => {
    setArchivo(event.target.files?.[0] ?? null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const checks = [
    { name: "r1", label: "Adjunto una copia legible de mi documento de identidad." },
    { name: "r2", label: "Cumplo con los requisitos académicos del módulo." },
    { name: "veraz", label: "Confirmo que la información suministrada es veraz." },
    { name: "datos", label: "Autorizo el tratamiento de mis datos personales." },
  ];

  return (
    <div className="ml-64 min-h-[calc(100vh-76px)] w-[calc(100%-16rem)] bg-slate-100 px-7 py-8 max-sm:ml-[72px] max-sm:w-[calc(100%-72px)] max-sm:px-4 max-sm:py-5">
      <div className="mx-auto w-full max-w-6xl pb-10">
        <header className="mb-7 border-l-[5px] border-[#4facfe] pl-4 sm:mb-8 sm:pl-5">
          <h1 className="m-0 flex items-center gap-3 text-2xl font-bold text-[#1a1c2d] sm:text-3xl">
            <i className="bi bi-mortarboard-fill text-[#4facfe]" aria-hidden="true" />
            Postulación al Módulo
          </h1>
          <p className="mb-0 mt-2 text-sm text-slate-600 sm:text-base">
            Los campos con <span className="font-bold text-red-500">*</span> son obligatorios.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] sm:rounded-3xl sm:p-7">
            <StepHeader number="01" title="Datos del Postulante" />
            <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 sm:gap-5">
              <Field label="Nombres" name="nombres">
                <input id="nombres" name="nombres" type="text" autoComplete="given-name" placeholder="Escribe tus nombres" className={controlClass} value={formulario.nombres} onChange={handleChange} required />
              </Field>
              <Field label="Apellidos" name="apellidos">
                <input id="apellidos" name="apellidos" type="text" autoComplete="family-name" placeholder="Escribe tus apellidos" className={controlClass} value={formulario.apellidos} onChange={handleChange} required />
              </Field>
              <Field label="Tipo de documento" name="tipoDoc">
                <div className="relative">
                  <select id="tipoDoc" name="tipoDoc" className={`${controlClass} appearance-none pr-11 ${formulario.tipoDoc ? "" : "text-slate-400"}`} value={formulario.tipoDoc} onChange={handleChange} required>
                    <option value="" disabled>Seleccione…</option>
                    <option value="ti">Tarjeta de Identidad</option>
                    <option value="cc">Cédula de Ciudadanía</option>
                    <option value="ce">Cédula de Extranjería</option>
                  </select>
                  <i className="bi bi-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500" aria-hidden="true" />
                </div>
              </Field>
              <Field label="Número de documento" name="numeroDoc">
                <input id="numeroDoc" name="numeroDoc" type="text" inputMode="numeric" autoComplete="off" placeholder="Número de documento" className={controlClass} value={formulario.numeroDoc} onChange={handleChange} required />
              </Field>
              <Field label="Teléfono celular" name="telefono">
                <div className="flex min-w-0">
                  <span className="flex shrink-0 items-center rounded-l-xl border-[1.5px] border-r-0 border-[#e2e8f0] bg-[#eef2f7] px-3 font-semibold text-slate-600 sm:px-3.5">+57</span>
                  <input id="telefono" name="telefono" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} pattern="[0-9]{10}" title="Ingresa 10 dígitos" placeholder="3001234567" className={`${controlClass} min-w-0 rounded-l-none`} value={formulario.telefono} onChange={handleChange} required />
                </div>
              </Field>
              <Field label="Correo electrónico" name="correo">
                <input id="correo" name="correo" type="email" autoComplete="email" placeholder="usuario@correo.com" className={controlClass} value={formulario.correo} onChange={handleChange} required />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] sm:rounded-3xl sm:p-7">
            <StepHeader number="02" title="Módulo y Perfil" />
            <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 sm:gap-5">
              <Field label="Módulo" name="modulo">
                <div className="relative">
                  <select id="modulo" name="modulo" className={`${controlClass} appearance-none pr-11 ${formulario.modulo ? "" : "text-slate-400"}`} value={formulario.modulo} onChange={handleChange} required>
                    <option value="" disabled>Seleccione…</option>
                    {nombreModulo && !modulos.includes(nombreModulo) && <option value={nombreModulo}>{nombreModulo}</option>}
                    {modulos.map((nombre) => <option key={nombre} value={nombre}>{nombre}</option>)}
                  </select>
                  <i className="bi bi-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500" aria-hidden="true" />
                </div>
              </Field>
              <Field label="Jornada" name="jornada">
                <div className="relative">
                  <select id="jornada" name="jornada" className={`${controlClass} appearance-none pr-11 ${formulario.jornada ? "" : "text-slate-400"}`} value={formulario.jornada} onChange={handleChange} required>
                    <option value="" disabled>Seleccione…</option>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                    <option value="única">Única</option>
                  </select>
                  <i className="bi bi-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500" aria-hidden="true" />
                </div>
              </Field>
              <Field label="Nivel académico" name="nivel">
                <div className="relative">
                  <select id="nivel" name="nivel" className={`${controlClass} appearance-none pr-11 ${formulario.nivel ? "" : "text-slate-400"}`} value={formulario.nivel} onChange={handleChange} required>
                    <option value="" disabled>Seleccione…</option>
                    <option value="primaria">Básica primaria</option>
                    <option value="secundaria">Básica secundaria</option>
                    <option value="media">Educación media</option>
                    <option value="tecnico">Técnico</option>
                  </select>
                  <i className="bi bi-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500" aria-hidden="true" />
                </div>
              </Field>
              <Field label="¿Por qué quieres tomar este módulo?" name="motivo" className="col-span-full">
                <textarea id="motivo" name="motivo" rows={4} maxLength={MAX_MOTIVO} placeholder="Cuéntanos tu motivación…" className={`${controlClass} resize-none`} value={formulario.motivo} onChange={handleChange} required />
                <span className="self-end text-xs text-slate-400">{formulario.motivo.length}/{MAX_MOTIVO}</span>
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] sm:rounded-3xl sm:p-7">
            <StepHeader number="03" title="Documentos y Requisitos" />

            <div className="mb-6">
              <label htmlFor="documento" className="mb-2 block text-sm font-semibold text-slate-600">
                Documento de identidad <span className="font-bold text-red-500" aria-hidden="true">*</span>
              </label>
              <label htmlFor="documento" className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-[#f8fafc] px-4 py-6 text-center transition hover:border-[#4facfe] hover:bg-sky-50">
                <input id="documento" name="documento" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" onChange={handleFile} required />
                <i className="bi bi-cloud-arrow-up text-3xl text-[#4facfe]" aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-700">{archivo ? archivo.name : "Selecciona o arrastra tu documento"}</span>
                <span className="text-xs text-slate-400">PDF, JPG o PNG</span>
              </label>
            </div>

            <h3 className="mb-3 text-sm font-bold text-[#1a1c2d]">Confirma los siguientes requisitos</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[700px]:grid-cols-1">
              {checks.map(({ name, label }) => (
                <label key={name} htmlFor={name} className="flex cursor-pointer items-start gap-3 rounded-xl border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] p-3.5 text-sm text-slate-700 transition hover:border-[#4facfe] hover:bg-sky-50 sm:p-4">
                  <input id={name} name={name} type="checkbox" className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#2e5bd8]" checked={formulario[name]} onChange={handleChange} required />
                  <span className="leading-5">{label} <span className="font-bold text-red-500" aria-hidden="true">*</span></span>
                </label>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3">
            <button type="submit" className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1a1c2d] px-5 py-4 font-bold text-[#4facfe] shadow-sm transition hover:bg-[#2a2d45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4facfe]">
              Inscribirse al módulo <i className="bi bi-send-fill" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => window.history.back()} className="w-full rounded-xl bg-slate-100 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400">
              Volver al catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostularmeM;