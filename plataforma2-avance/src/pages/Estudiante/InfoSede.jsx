//import React from 'react'
import { Link } from "react-router-dom"
import "./Menu.css"
import "./InfoSede.css"
import logoblanco from '../../assets/LogoBlanco.png'
const InfoSede = () => {
    return (
        <div >
            {/* Menú lateral principal */}
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                {/* Opciones de navegación del estudiante */}
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
                        <Link to="/MatriculasE">
                            <i className="bi bi-journal-bookmark"></i>
                            <span>Mis Matrículas</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/ModulosAcademicos">
                            <i className="bi bi-folder2-open"></i> 
                            <span>Catálogos</span>
                        </Link>
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
            <main className="contenido-principal3">
                <header className="bienvenida-sede">
                    <div className="overlay-texto">
                        <h1>Institución Educativa Técnica Industrial</h1>
                        <p><i className="bi bi-geo-alt"></i> Popayán, Cauca — Sede Central</p>
                    </div>
                </header>

                <div className="grid-informacion-limpia">

                <div className="bloque-lectura">
                        {/* Información general de la sede */}
                        <section className="tarjeta-blanca">
                            <h2><i className="bi bi-info-circle-fill"></i> Acerca de nuestra Sede</h2>
                            <p>Nuestra institución se destaca por ofrecer un ambiente educativo moderno, enfocado en el desarrollo integral y técnico de los estudiantes en la región. Contamos con instalaciones adecuadas para el aprendizaje práctico y teórico, asegurando una formación de alta calidad.</p>
                            <div className="mini-grid-servicios">
                            <div className="servicio-tag"><i className="bi bi-wifi"></i> Zona WiFi</div>
                            <div className="servicio-tag"><i className="bi bi-bus-front"></i> Transporte</div>
                            <div className="servicio-tag"><i className="bi bi-book"></i> Biblioteca</div>
                            <div className="servicio-tag"><i className="bi bi-cup-hot"></i> Comedor</div>
                            </div>
                        </section>
                        <section className="tarjeta-blanca">
                            <h2><i className="bi bi-geo-alt-fill"></i> Ubicación de la Sede</h2>
                            <div className="mapa-contenedor">
                            <iframe
                                title="Ubicación de la Sede"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.113009581831!2d-76.6085121!3d2.4419213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMjYnMzAuOSJOIDc2wrAzNicyNC42Ilc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                                className="mapa-iframe"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            </div>
                        </section>
                        {/* Documentos importantes de la institución */}
                        <section className="tarjeta-blanca">
                            <h2><i className="bi bi-file-earmark-text-fill"></i> Documentos Institucionales</h2>
                            <div className="lista-descargas">
                            <div className="archivo-item">
                                <span className="icono-pdf"><i className="bi bi-filetype-pdf"></i></span>
                                <div className="archivo-info">
                                <strong>Manual de Convivencia</strong>
                                <small>Versión 2026 actualizada</small>
                                </div>
                                <button className="btn-circular-ver"><i className="bi bi-eye"></i></button>
                            </div>
                            <div className="archivo-item">
                                <span className="icono-pdf"><i className="bi bi-filetype-pdf"></i></span>
                                <div className="archivo-info">
                                <strong>Proyecto Educativo (PEI)</strong>
                                <small>Modelo de formación integral</small>
                                </div>
                                <button className="btn-circular-ver"><i className="bi bi-eye"></i></button>
                            </div>
                            </div>
                        </section>
                    </div>

                    <aside className="bloque-lateral-accion">
                         {/* Tarjeta para iniciar matrícula */}
                        <div className="tarjeta-accion-matricula">
                            <h3>Inicia tu Proceso</h3>
                            <p>Asegura tu cupo de manera fácil y 100% digital a través de nuestra plataforma.</p>

                            <div className="requisitos-resumen">
                                <h4>Requisitos:</h4>
                                <ul>
                                    <li><i className="bi bi-check2"></i> Identidad del estudiante</li>
                                    <li><i className="bi bi-check2"></i> Certificados de notas</li>
                                    <li><i className="bi bi-check2"></i> Seguro estudiantil</li>
                                </ul>
                            </div>

                            <Link to="/Formulario" className="btn-iniciar-matricula">
                                <span>INICIAR MATRÍCULA</span>
                                <i className="bi bi-rocket-takeoff-fill"></i>
                            </Link>

                            <div className="pie-ayuda">
                                <Link to="/Contacto"><i className="bi bi-whatsapp"></i> ¿Necesitas soporte?</Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    )
}

export default InfoSede