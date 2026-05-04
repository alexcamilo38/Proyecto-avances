//import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
  return (
    <header class="header">
      <div class="logo">
        <img src="/img/logo.png" alt="EasyMatric" />
      </div>

      <nav class="nav">
        <Link to="/">Inicio</Link>
        <Link to="/Nosotros">Nosotros</Link>
        <Link to="/Servicios">Servicios</Link>
        <Link to="/Preguntas">Preguntas</Link>
        <Link to="/Contacto">Contacto</Link>
      </nav>
      <div class="boton-acceder">
            <Link to="login" class="boton-primero">Acceder</Link>
        </div>

    </header>

  )
}

export default Navbar
