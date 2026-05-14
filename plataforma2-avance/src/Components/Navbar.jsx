//import React from 'react'
import logoazul from '../assets/LogoAzul.png';
import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoazul} alt="EasyMatric" />
      </div>

      <nav className="nav">
        <Link to="/">Inicio</Link>
        <Link to="/Nosotros">Nosotros</Link>
        <Link to="/Servicios">Servicios</Link>
        <Link to="/Preguntas">Preguntas</Link>
        <Link to="/Contacto">Contacto</Link>
      </nav>
      <div className="boton-acceder">
            <Link to="/login" className="boton-primero">Acceder</Link>
        </div>

    </header>

  )
}

export default Navbar
