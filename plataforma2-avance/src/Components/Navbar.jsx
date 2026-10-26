//import React from 'react'
import logoazul from '../assets/LogoAzul.png';
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className={"header flex justify-between items-center px-[60px] py-[40px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-[100]"}>
      <div className="logo">
        <img className={"[.logo_&]:[width:140px]"} src={logoazul} alt="EasyMatric" />
      </div>

      <nav className={"nav flex gap-[30px]"}>
        <Link className={"[.nav_&]:[text-decoration:none] [.nav_&]:[color:#334155] [.nav_&]:[font-weight:600] [.nav_&]:[transition:.3s] [.nav_&:hover]:[color:#2563eb]"} to="/">Inicio</Link>
        <Link className={"[.nav_&]:[text-decoration:none] [.nav_&]:[color:#334155] [.nav_&]:[font-weight:600] [.nav_&]:[transition:.3s] [.nav_&:hover]:[color:#2563eb]"} to="/Nosotros">Nosotros</Link>
        <Link className={"[.nav_&]:[text-decoration:none] [.nav_&]:[color:#334155] [.nav_&]:[font-weight:600] [.nav_&]:[transition:.3s] [.nav_&:hover]:[color:#2563eb]"} to="/Servicios">Servicios</Link>
        <Link className={"[.nav_&]:[text-decoration:none] [.nav_&]:[color:#334155] [.nav_&]:[font-weight:600] [.nav_&]:[transition:.3s] [.nav_&:hover]:[color:#2563eb]"} to="/Preguntas">Preguntas</Link>
        <Link className={"[.nav_&]:[text-decoration:none] [.nav_&]:[color:#334155] [.nav_&]:[font-weight:600] [.nav_&]:[transition:.3s] [.nav_&:hover]:[color:#2563eb]"} to="/Contacto">Contacto</Link>
      </nav>
      <div className="boton-acceder">
        <Link to="/login" className={"boton-primero [.nav_&]:no-underline [.nav_&]:text-[#334155] [.nav_&]:font-semibold [.nav_&]:transition-[color] [.nav_&]:duration-300 [.nav_&:hover]:text-blue-600 px-6 py-3 bg-blue-600 text-white no-underline rounded-[30px] font-bold transition-colors duration-300 [&:hover]:bg-blue-700"}>Acceder</Link>
      </div>

    </header>

  )
}

export default Navbar
