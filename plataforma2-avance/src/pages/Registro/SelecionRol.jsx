//import React from 'react'
import "./SelecionRol.css"
import logoazul from '../../assets/LogoAzul.png';
// Importación de navegación entre páginas
import { Link } from "react-router-dom"

const SelecionRol = () => {
  return (
     <div className="pantalla-fondo">
        <div className="cuadro-seleccion-principal">
            
            <div className="registro-header">
                <img src={logoazul} alt="EasyMatric" className="logo-easymatric"/>
                <h1>Bienvenido a EasyMatric</h1>
                <p>Selecciona tu perfil para continuar con el registro</p>
            </div>
                {/* Opciones de roles */}
            <div className="contenedor-roles">
                <Link to="/RegistroAd" className="opcion-rol">
                    <div className="icono-box">
                        <i className="bi bi-shield-lock"></i>
                    </div>
                    <div className="texto-rol">
                        <span className="titulo-rol">Administrador</span>
                        <span className="desc-rol">Gestión institucional y control</span>
                    </div>
                    <i className="bi bi-chevron-right flecha"></i>
                </Link>
                {/* Rol docente*/}
                <Link to="/RegistroDo" className="opcion-rol">
                    <div className="icono-box">
                        <i className="bi bi-folder2-open"></i>
                    </div>
                    <div className="texto-rol">
                        <span className="titulo-rol">Docente</span>
                        <span className="desc-rol">Gestión de módulos y evaluación</span>
                    </div>
                    <i className="bi bi-chevron-right flecha"></i>
                </Link>
                {/* Rol estudiante */}
                <Link to="/RegistroU" className="opcion-rol">
                    <div className="icono-box">
                        <i className="bi bi-mortarboard"></i>
                    </div>
                    <div className="texto-rol">
                        <span className="titulo-rol">Estudiante / Aspirante</span>
                        <span className="desc-rol">Proceso de matrícula y consultas</span>
                    </div>
                    <i className="bi bi-chevron-right flecha"></i>
                </Link>
            </div>

            <div className="pie-cuadro">
                {/* Link para iniciar sesión */}
                <p>¿Ya tienes cuenta? <Link to="/Login" >Inicia sesión</Link></p>
                <div className="botones-inferiores">
                    <Link to="/" className="btn-mini"><i className="bi bi-house"></i> Inicio</Link>
                    <Link to="/Contacto" className="btn-mini"><i className="bi bi-headset"></i> Soporte</Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SelecionRol
