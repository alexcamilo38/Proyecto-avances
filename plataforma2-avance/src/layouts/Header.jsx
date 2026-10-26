import { Link } from "react-router-dom";

const roleDetails = {
  admin: { title: "Administración", search: "Buscar institución o estudiante", initials: "AD", profile: "/PerfilAd" },
  teacher: { title: "Docencia", search: "Buscar módulo o alumno", initials: "CM", profile: "/PerfilDocente" },
  student: { title: "Estudiante", search: "Buscar institución", initials: "JE", profile: "/PerfilUsuario" },
};

const Header = ({ role }) => {
  const { title, search, initials, profile } = roleDetails[role];

  return (
    <header className="ml-64 flex min-h-[76px] items-center gap-5 border-b border-slate-200 bg-[#f1f5f9] px-8 max-sm:ml-[72px] max-sm:gap-3 max-sm:px-4">
      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-slate-100 bg-white px-4 py-3 text-slate-400 shadow-sm">
        <i className="bi bi-search shrink-0" aria-hidden="true" />
        <span className="sr-only">{search}</span>
        <input
          type="search"
          placeholder={search}
          className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>
      <Link
        to={profile}
        aria-label={`Ver perfil de ${title}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111629] text-xs font-semibold text-white no-underline"
      >
        {initials}
      </Link>
    </header>
  );
};

export default Header;
