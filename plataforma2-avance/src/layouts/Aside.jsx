import { NavLink, Link } from "react-router-dom";
import logoblanco from "../assets/LogoBlanco.png";

const navigation = {
  admin: [
    { to: "/RegistrarSede", label: "Instituciones", icon: "bi-bank" },
    { to: "/RevicionD", label: "Matrículas", icon: "bi-journal-bookmark" },
    { to: "/Matriculados", label: "Estudiantes", icon: "bi-people" },
    { to: "/Roles", label: "Roles", icon: "bi-shield-lock" },
    { to: "/NotasCa", label: "Catálogos", icon: "bi-folder2-open" },
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
    { to: "/PerfilUsuario", label: "Mi perfil", icon: "bi-person-badge" },
  ],
};

const dashboardPaths = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

const roleLabels = {
  admin: "ADMINISTRADOR",
  teacher: "DOCENTE",
  student: "ESTUDIANTE",
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
};

const Aside = ({ role }) => {
  const styles = roleStyles[role];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-[#111629] py-7 text-white max-sm:w-[72px]">
    <Link to={dashboardPaths[role]} className="mb-8 flex justify-center px-6 max-sm:px-2" aria-label="EasyMatric, inicio">
      <img src={logoblanco} alt="EasyMatric" className="h-[42px] w-auto max-sm:hidden" />
      <span className={`hidden h-10 w-10 items-center justify-center rounded-xl text-lg max-sm:flex ${styles.icon}`} aria-hidden="true">
        <i className="bi bi-mortarboard-fill" />
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
      <Link
        to="/login"
        className="mb-4 flex items-center gap-3 text-red-400 no-underline transition-colors hover:text-red-300 max-sm:justify-center"
        title="Cerrar sesión"
      >
        <i className="bi bi-box-arrow-left" aria-hidden="true" />
        <span className="max-sm:hidden">Cerrar sesión</span>
      </Link>
      <div className={`flex items-center gap-3 text-xs font-semibold tracking-wide max-sm:justify-center ${styles.text}`}>
        <i className="bi bi-person-circle text-lg" aria-hidden="true" />
        <span className="max-sm:hidden">{roleLabels[role]}</span>
      </div>
    </div>
  </aside>
  );
};

export default Aside;