import { Link } from "react-router-dom";
import logoazul from "../../assets/LogoAzul.png";

const roles = [
  {
    name: "Administrador",
    description: "Gestión institucional y control",
    icon: "bi-shield-lock",
    to: "/RegistroAd",
  },
  {
    name: "Rector",
    description: "Administra tu institución, matrículas y estudiantes",
    icon: "bi-building-fill-check",
    to: "/RegistroRector",
  },
  {
    name: "Docente",
    description: "Gestión de módulos y evaluación",
    icon: "bi-easel2",
    to: "/RegistroDo",
  },
  {
    name: "Estudiante / Aspirante",
    description: "Proceso de matrícula y consultas",
    icon: "bi-mortarboard",
    to: "/RegistroU",
  },
];

const SelecionRol = () => (
  <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-4 sm:p-8">
    <section className="w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white p-6 shadow-2xl shadow-blue-950/10 sm:p-10">
      <header className="mb-8 text-center">
        <img
          src={logoazul}
          alt="EasyMatric"
          className="mx-auto mb-6 h-12 w-auto"
        />
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
          <i className="bi bi-person-plus" aria-hidden="true" />
          Crear una cuenta
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Elige tu perfil
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          Selecciona el rol que mejor describe cómo usarás EasyMatric.
        </p>
      </header>

      <div className="space-y-3">
        {roles.map((role) => (
          <Link
            key={role.to}
            to={role.to}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:p-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-blue-700 shadow-sm ring-1 ring-slate-100 transition group-hover:bg-blue-700 group-hover:text-white sm:h-14 sm:w-14">
              <i className={`bi ${role.icon}`} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-slate-900">
                {role.name}
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                {role.description}
              </span>
            </span>
            <i
              className="bi bi-arrow-right text-lg text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      <footer className="mt-8 border-t border-slate-100 pt-6 text-center">
        <p className="text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            className="font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:underline"
            to="/Login"
          >
            Inicia sesión
          </Link>
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            <i className="bi bi-house" aria-hidden="true" />
            Inicio
          </Link>
          <Link
            to="/Contacto"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            <i className="bi bi-headset" aria-hidden="true" />
            Soporte
          </Link>
        </div>
      </footer>
    </section>
  </main>
);

export default SelecionRol;
