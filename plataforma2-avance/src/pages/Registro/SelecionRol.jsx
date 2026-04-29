//2import React from 'react'
import "./SelecionRol.css"
import { Link } from "react-router-dom"

const SelecionRol = () => {
  return (
     <div class="pantalla-fondo">
        <div class="cuadro-seleccion-principal">
            
            <div class="registro-header">
                <img src="img/logo.png" alt="EasyMatric" class="logo-easymatric"/>
                <h1>Bienvenido a EasyMatric</h1>
                <p>Selecciona tu perfil para continuar con el registro</p>
            </div>

            <div class="contenedor-roles">
                <Link to="/RegistroAd" class="opcion-rol">
                    <div class="icono-box">
                        <i class="bi bi-shield-lock"></i>
                    </div>
                    <div class="texto-rol">
                        <span class="titulo-rol">Administrador</span>
                        <span class="desc-rol">Gestión institucional y control</span>
                    </div>
                    <i class="bi bi-chevron-right flecha"></i>
                </Link>

                <Link to="/RegistroU" class="opcion-rol">
                    <div class="icono-box">
                        <i class="bi bi-mortarboard"></i>
                    </div>
                    <div class="texto-rol">
                        <span class="titulo-rol">Estudiante / Aspirante</span>
                        <span class="desc-rol">Proceso de matrícula y consultas</span>
                    </div>
                    <i class="bi bi-chevron-right flecha"></i>
                </Link>
            </div>

            <div class="pie-cuadro">
                <p>¿Ya tienes cuenta? <Link to="/Login" >Inicia sesión</Link></p>
                <div class="botones-inferiores">
                    <Link to="/" class="btn-mini"><i class="bi bi-house"></i> Inicio</Link>
                    <a href="#contacto" class="btn-mini"><i class="bi bi-headset"></i> Soporte</a>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SelecionRol
