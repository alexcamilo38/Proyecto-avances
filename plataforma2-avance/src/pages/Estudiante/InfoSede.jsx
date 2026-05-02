//import React from 'react'
import { Link } from "react-router-dom"
import "./Menu.css"
const InfoSede = () => {
    return (
        <div >
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src="img/logo.png" alt="EasyMatric" className="logo-img" />
                </div>

                <ul className="menu-lista">
                    <li>
                        <Link to="/">
                            <i className="bi bi-house-door"></i>
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Colegios">
                            <i className="bi bi-bank"></i>
                            <span>Instituciones</span>
                        </Link>
                    </li>
                    <li>
                        <a href="MatriculasE.html">
                            <i className="bi bi-journal-bookmark"></i>
                            <span>Mis Matrículas</span>
                        </a>
                    </li>
                    <li>
                        <Link to="/PerfilUsuario" className="activo">
                            <i className="bi bi-person-badge"></i>
                            <span>Mi Perfil</span>
                        </Link>
                    </li>
                </ul>

                <div className="menu-pie">
                    <Link to="/" className="enlace-salir">
                        <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
                    </Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ESTUDIANTE</span>
                    </div>
                </div>
            </nav>
            <main class="contenido-principal">
                <header class="bienvenida-sede">
                    <div class="overlay-texto">
                        <h1>Institución Educativa Técnica Industrial</h1>
                        <p><i class="bi bi-geo-alt"></i> Popayán, Cauca — Sede Central</p>
                    </div>
                </header>

                <div class="grid-informacion-limpia">

                    <div class="bloque-lectura">
                        <section class="tarjeta-blanca">
                            <h2><i class="bi bi-info-circle-fill"></i> Acerca de nuestra Sede</h2>
                            <p>Nuestra institución se destaca por ofrecer un ambiente educativo moderno, enfocado en el desarrollo integral y técnico de los estudiantes en la región. Contamos con instalaciones adecuadas para el aprendizaje práctico y teórico, asegurando una formación de alta calidad.</p>
                            <div class="mini-grid-servicios">
                                <div class="servicio-tag"><i class="bi bi-wifi"></i> Zona WiFi</div>
                                <div class="servicio-tag"><i class="bi bi-bus-front"></i> Transporte</div>
                                <div class="servicio-tag"><i class="bi bi-book"></i> Biblioteca</div>
                                <div class="servicio-tag"><i class="bi bi-cup-hot"></i> Comedor</div>
                            </div>
                        </section>

                        <section class="tarjeta-blanca">
                            <h2><i class="bi bi-file-earmark-text-fill"></i> Documentos Institucionales</h2>
                            <div class="lista-descargas">
                                <div class="archivo-item">
                                    <span class="icono-pdf"><i class="bi bi-filetype-pdf"></i></span>
                                    <div class="archivo-info">
                                        <strong>Manual de Convivencia</strong>
                                        <small>Versión 2026 actualizada</small>
                                    </div>
                                    <button class="btn-circular-ver"><i class="bi bi-eye"></i></button>
                                </div>
                                <div class="archivo-item">
                                    <span class="icono-pdf"><i class="bi bi-filetype-pdf"></i></span>
                                    <div class="archivo-info">
                                        <strong>Proyecto Educativo (PEI)</strong>
                                        <small>Modelo de formación integral</small>
                                    </div>
                                    <button class="btn-circular-ver"><i class="bi bi-eye"></i></button>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside class="bloque-lateral-accion">
                        <div class="tarjeta-accion-matricula">
                            <h3>Inicia tu Proceso</h3>
                            <p>Asegura tu cupo de manera fácil y 100% digital a través de nuestra plataforma.</p>

                            <div class="requisitos-resumen">
                                <h4>Requisitos:</h4>
                                <ul>
                                    <li><i class="bi bi-check2"></i> Identidad del estudiante</li>
                                    <li><i class="bi bi-check2"></i> Certificados de notas</li>
                                    <li><i class="bi bi-check2"></i> Seguro estudiantil</li>
                                </ul>
                            </div>

                            <a href="Formulario.html" class="btn-iniciar-matricula">
                                <span>INICIAR MATRÍCULA</span>
                                <i class="bi bi-rocket-takeoff-fill"></i>
                            </a>

                            <div class="pie-ayuda">
                                <a href="#"><i class="bi bi-whatsapp"></i> ¿Necesitas soporte?</a>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    )
}

export default InfoSede
