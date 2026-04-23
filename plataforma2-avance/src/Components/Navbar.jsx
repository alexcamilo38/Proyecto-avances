//import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
  return (
    <header class="header">
        <div class="logo">
            <img src="/img/logo.png" alt="EasyMatric"/>
        </div>

        <nav class="nav">
            <Link to="/">Inicio</Link>
            <a href="#Nosotros">Nosotros</a>
            <a href="#Servicios">Servicios</a>
            <a href="#preguntas">Preguntas</a>
            <a href="#contacto">Contacto</a>
           
        </nav>
        <div class="boton-primero">
           <Link to="/Login">Acceder</Link>  
        </div>
    </header>
    
  )
}

export default Navbar
