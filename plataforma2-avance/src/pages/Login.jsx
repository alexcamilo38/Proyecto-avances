import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoazul from "../assets/LogoAzul.png";
import ilustracion from "../assets/ilustracion estudiando.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (email === "admin@easymatric.com" && password === "123456") {
      navigate("/admin");
    } else if (email === "estudiante@easymatric.com" && password === "123456") {
      navigate("/student");
    } else if (email === "docente@easymatric.com" && password === "123456") {
      navigate("/teacher");
    } else if (email === "rector@easymatric.com" && password === "123456") {
      navigate("/rector");
    } else {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-blue-950/10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-7 text-white sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[36px] border-white/5" />
          <Link
            to="/"
            className="relative inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            <i className="bi bi-arrow-left" aria-hidden="true" />
            Volver al inicio
          </Link>

          <div className="relative my-10 text-center lg:my-8">
            <img
              src={logoazul}
              alt="EasyMatric"
              className="mx-auto mb-8 w-48 rounded-2xl bg-white p-3"
            />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
              Educación, más sencilla
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Tu comunidad educativa, en un solo lugar
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-blue-100 sm:text-base">
              Gestiona tu proceso de matrícula de forma rápida y segura.
            </p>
            <img
              src={ilustracion}
              alt="Estudiantes aprendiendo juntos"
              className="mx-auto mt-7 max-h-48 w-full max-w-xs rounded-2xl object-contain"
            />
          </div>

          <p className="relative text-center text-xs text-blue-200">
            &copy; 2026 EasyMatric · Gestión Educativa Eficiente
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            <div className="mb-8">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-700">
                <i className="bi bi-person-lock" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Iniciar sesión
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ingresa tus credenciales para continuar.
              </p>
            </div>

            {error && (
              <div
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                <i className="bi bi-exclamation-circle mt-0.5" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Correo electrónico
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                <i className="bi bi-envelope text-blue-600" aria-hidden="true" />
                <input
                  id="login-email"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Contraseña
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                <i className="bi bi-lock text-blue-600" aria-hidden="true" />
                <input
                  id="login-password"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  type="password"
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Link
                to="/ReperaContra"
                className="mt-2 block text-right text-sm font-semibold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              Ingresar
              <i className="bi bi-arrow-right ml-2" aria-hidden="true" />
            </button>

            <p className="mt-7 text-center text-sm text-slate-500">
              ¿No tienes cuenta?{" "}
              <Link
                className="font-bold text-blue-700 transition hover:text-blue-900 focus:outline-none focus:underline"
                to="/SelecionRol"
              >
                Regístrate aquí
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
