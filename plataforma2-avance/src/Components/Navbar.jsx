//import React from 'react'
import logoazul from '../assets/LogoAzul.png';
import { Link, NavLink } from "react-router-dom"

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/Nosotros', label: 'Nosotros' },
  { to: '/Servicios', label: 'Servicios' },
  { to: '/Preguntas', label: 'Preguntas' },
  { to: '/Contacto', label: 'Contacto' },
];

const Navbar = () => {
  return (
    <header className="header flex justify-between items-center px-[60px] py-[40px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-[100]">
      <div className="logo">
        <Link to="/"><img className={"[.logo_&]:[width:140px]"} src={logoazul} alt="EasyMatric" /></Link>
      </div>

      <nav className="nav" aria-label="Navegación principal">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
            to={to}
            end
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="boton-acceder">
        <Link to="/login" className="boton-primero px-6 py-3 bg-blue-600 text-white no-underline rounded-[30px] font-bold transition-colors duration-300 [&:hover]:bg-blue-700">Acceder</Link>
      </div>

    </header>

  )
}

export default Navbar
