import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logoblanco from "../assets/LogoBlanco.png";
import { clearAuthSession } from "../Config/auth";
import api from "../Config/env";

const navigation = {
  admin: [
    { to: "/RegistrarSede", label: "Instituciones", icon: "bi-bank" },
    { to: "/Usuarios", label: "Usuarios", icon: "bi-people" },
    { to: "/Roles", label: "Roles", icon: "bi-shield-lock" },
    { to: "/PerfilAd", label: "Mi perfil", icon: "bi-person-badge" },
  ],
  teacher: [
    { to: "/DocenteMo", label: "Mis módulos", icon: "bi-journal-bookmark" },
    { to: "/SubirModulo", label: "Subir módulo", icon: "bi-cloud-upload" },
    { to: "/PerfilDocente", label: "Mi perfil", icon: "bi-person-badge" },
  ],
  student: [
    { to: "/Colegios", label: "Instituciones", icon: "bi-bank" },
    { to: "/MatriculasE", label: "Mis matrículas", icon: "bi-journal-bookmark" },
    { to: "/ModulosAcademicos", label: "Catálogos", icon: "bi-folder2-open" },
    { to: "/PerfilEst", label: "Mi perfil", icon: "bi-person-badge" },
  ],
  rector: [
    { to: "/RegistrarIns", label: "Institución", icon: "bi-building-add" },
    { to: "/RevisarMa", label: "Revisar matrículas", icon: "bi-clipboard-check" },
    { to: "/EstudiantesAp", label: "Estudiantes", icon: "bi-people" },
    { to: "/ProfesorAc", label: "Profesores", icon: "bi-person-video3" },
    { to: "/CatalogoMa", label: "Catálogo académico", icon: "bi-journal-bookmark" },
    { to: "/PerfilRec", label: "Mi perfil", icon: "bi-person-badge" },
  ],
};

const dashboardPaths = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
  rector: "/rector",
};

const roleLabels = {
  admin: "ADMINISTRADOR",
  teacher: "DOCENTE",
  student: "ESTUDIANTE",
  rector: "RECTOR",
};

const roleStyles = {
  admin: {
    link: "hover:border-sky-400 hover:bg-sky-400/10",
    active: "border-sky-400 bg-sky-400/10",
    icon: "bg-sky-400",
    text: "text-sky-300",
  },
  teacher: {
    link: "hover:border-emerald-400 hover:bg-emerald-400/10",
    active: "border-emerald-400 bg-emerald-400/10",
    icon: "bg-emerald-400",
    text: "text-emerald-300",
  },
  student: {
    link: "hover:border-orange-400 hover:bg-orange-400/10",
    active: "border-orange-400 bg-orange-400/10",
    icon: "bg-orange-400",
    text: "text-orange-300",
  },
  rector: {
    link: "hover:border-violet-400 hover:bg-violet-400/10",
    active: "border-violet-400 bg-violet-400/10",
    icon: "bg-violet-500",
    text: "text-violet-300",
  },
};

// Construye el menú lateral según el rol y resalta la ruta activa.
const Aside = ({ role }) => {
  const styles = roleStyles[role];
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => setLogoutDialogOpen(true);
  const confirmLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("No se pudo invalidar el token de sesión en el servidor:", error);
    }
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!logoutDialogOpen || loggingOut) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLogoutDialogOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [loggingOut, logoutDialogOpen]);

  return (
    <>
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-[#111629] py-7 text-white max-sm:w-[72px]">
    <Link to={dashboardPaths[role]} className="mb-8 flex justify-center px-6 max-sm:px-2" aria-label="EasyMatric, inicio">
      <img src={logoblanco} alt="EasyMatric" className="h-[42px] w-auto max-sm:hidden" />
      <span className={`hidden h-10 w-10 items-center justify-center rounded-xl text-lg max-sm:flex ${styles.icon}`} aria-hidden="true">
        <i className={`bi ${role === "rector" ? "bi-building-fill-check" : "bi-mortarboard-fill"}`} />
      </span>
    </Link>

    <nav aria-label={`Navegación de ${roleLabels[role].toLowerCase()}`} className="min-w-0">
      <p className="mb-3 px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 max-sm:px-0 max-sm:text-center">
        <span className="max-sm:hidden">Menú</span>
        <span className="hidden max-sm:inline" aria-hidden="true">•••</span>
      </p>
      <ul className="m-0 list-none p-0">
        <li>
          <NavLink
            to={dashboardPaths[role]}
            end
            className={({ isActive }) =>
              `mx-3 flex items-center gap-4 rounded-xl border-l-4 border-transparent px-4 py-3.5 text-slate-300 no-underline transition-colors max-sm:mx-2 max-sm:justify-center max-sm:px-0 ${styles.link}${isActive ? ` ${styles.active} text-white` : ""}`
            }
            title="Inicio"
          >
            <i className="bi bi-house-door text-lg" aria-hidden="true" />
            <span className="max-sm:hidden">Inicio</span>
          </NavLink>
        </li>
        {navigation[role].map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `mx-3 flex items-center gap-4 rounded-xl border-l-4 border-transparent px-4 py-3.5 text-slate-300 no-underline transition-colors max-sm:mx-2 max-sm:justify-center max-sm:px-0 ${styles.link}${isActive ? ` ${styles.active} text-white` : ""}`
              }
              title={label}
            >
              <i className={`bi ${icon} text-lg`} aria-hidden="true" />
              <span className="max-sm:hidden">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>

    <div className="mt-auto border-t border-white/10 px-6 pt-5 max-sm:px-2">
      <button
        type="button"
        onClick={handleLogout}
        className="mb-4 flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-red-400 no-underline transition-colors hover:text-red-300 max-sm:justify-center"
        title="Cerrar sesión"
      >
        <i className="bi bi-box-arrow-left" aria-hidden="true" />
        <span className="max-sm:hidden">Cerrar sesión</span>
      </button>
      <div className={`flex items-center gap-3 text-xs font-semibold tracking-wide max-sm:justify-center ${styles.text}`}>
        <i className="bi bi-person-circle text-lg" aria-hidden="true" />
        <span className="max-sm:hidden">{roleLabels[role]}</span>
      </div>
    </div>
    </aside>

    {logoutDialogOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !loggingOut) setLogoutDialogOpen(false);
        }}
      >
        <section
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
          className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl text-rose-600">
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
          </div>
          <h2 id="logout-dialog-title" className="mb-0 mt-4 text-xl font-bold text-slate-900">
            ¿Cerrar sesión?
          </h2>
          <p id="logout-dialog-description" className="mb-0 mt-2 text-sm leading-6 text-slate-600">
            Saldrás de tu cuenta y tendrás que iniciar sesión nuevamente para volver a ingresar.
          </p>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setLogoutDialogOpen(false)}
              disabled={loggingOut}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              disabled={loggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut && <i className="bi bi-arrow-repeat animate-spin" aria-hidden="true" />}
              {loggingOut ? "Cerrando sesión..." : "Sí, cerrar sesión"}
            </button>
          </div>
        </section>
      </div>
    )}
    </>
  );
};

export default Aside;