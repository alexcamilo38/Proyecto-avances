import { Link } from "react-router-dom";
import logoazul from "../../assets/LogoAzul.png";

const RegistroRector = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-100 px-4 py-8 sm:px-6">
      <section className="w-full max-w-3xl rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-violet-950/10 sm:p-9 lg:p-11">
        <header className="mb-8 text-center">
          <img src={logoazul} alt="EasyMatric" className="mx-auto mb-5 h-11 w-auto" />
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-800">
            <i className="bi bi-building-fill-check" aria-hidden="true" />
            Perfil rector
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Crear cuenta de rector
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Registra tus datos para continuar con la configuración de tu institución.
          </p>
        </header>

        <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2" htmlFor="rector-name">
              Nombre completo
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <i className="bi bi-person text-violet-600" aria-hidden="true" />
                <input id="rector-name" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400" name="fullName" placeholder="Nombres y apellidos" autoComplete="name" required />
              </span>
            </label>

            <label className="text-sm font-semibold text-slate-700" htmlFor="rector-document">
              Número de identificación
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <i className="bi bi-card-text text-violet-600" aria-hidden="true" />
                <input id="rector-document" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400" name="document" placeholder="Número de documento" autoComplete="off" required />
              </span>
            </label>

            <label className="text-sm font-semibold text-slate-700" htmlFor="rector-phone">
              Teléfono de contacto
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <i className="bi bi-telephone text-violet-600" aria-hidden="true" />
                <input id="rector-phone" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400" type="tel" name="phone" placeholder="300 000 0000" autoComplete="tel" required />
              </span>
            </label>

            <label className="text-sm font-semibold text-slate-700 sm:col-span-2" htmlFor="rector-email">
              Correo electrónico
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <i className="bi bi-envelope text-violet-600" aria-hidden="true" />
                <input id="rector-email" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400" type="email" name="email" placeholder="rector@institucion.edu.co" autoComplete="email" required />
              </span>
            </label>

            <label className="text-sm font-semibold text-slate-700" htmlFor="rector-password">
              Contraseña
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <i className="bi bi-lock text-violet-600" aria-hidden="true" />
                <input id="rector-password" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400" type="password" name="password" placeholder="Crea una contraseña" autoComplete="new-password" minLength="6" required />
              </span>
            </label>

            <label className="text-sm font-semibold text-slate-700" htmlFor="rector-confirm-password">
              Confirmar contraseña
              <span className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <i className="bi bi-shield-check text-violet-600" aria-hidden="true" />
                <input id="rector-confirm-password" className="min-w-0 flex-1 bg-transparent py-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400" type="password" name="confirmPassword" placeholder="Repite tu contraseña" autoComplete="new-password" minLength="6" required />
              </span>
            </label>
          </div>

          <label className="flex items-start gap-3 text-sm leading-5 text-slate-600">
            <input className="mt-1 h-4 w-4 rounded border-slate-300 accent-violet-700 focus:ring-violet-500" type="checkbox" name="termsAccepted" required />
            <span>Acepto el tratamiento de mis datos personales y los términos del servicio.</span>
          </label>

          <Link to="/rector" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:bg-violet-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-500/30">
            Ir al panel rector
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </form>

        <footer className="mt-6 flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-5">
          <Link to="/SelecionRol" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/20">
            <i className="bi bi-arrow-left" aria-hidden="true" />
            Cambiar perfil
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-500/20">
            <i className="bi bi-house" aria-hidden="true" />
            Inicio
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default RegistroRector;
