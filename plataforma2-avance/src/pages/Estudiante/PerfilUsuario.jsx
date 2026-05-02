//import React from 'react'
import "./PerfilUsuario.css"
import "./Menu.css"
import { Link } from "react-router-dom"
const PerfilUsuario = () => {
    return (
        <div className="cuerpo-dashboard">
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
                        <Link  to="MatriculasE">
                            <i className="bi bi-journal-bookmark"></i>
                            <span>Mis Matrículas</span>
                        </Link>
                    </li>
                    <li>
                        <a href="perfilUsuario.html" className="activo">
                            <i className="bi bi-person-badge"></i>
                            <span>Mi Perfil</span>
                        </a>
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

            <main className="contenido-principal4">
                <div className="perfil-contenedor">

                    <header className="perfil-header">
                        <div className="perfil-info-basica">
                            <div className="avatar-zona">
                                <img src="imagenes/negro.jpg" alt="Foto de Perfil" className="avatar-img" />
                                <button className="btn-cambiar-foto"><i className="bi bi-camera"></i></button>
                            </div>
                            <div className="texto-usuario">
                                <h1>Juan Andres Estrada Erazo</h1>
                                <span className="etiqueta-rol">Aspirante - Ciclo Lectivo 2026</span>
                                <p><i className="bi bi-geo-alt"></i> Popayán, Colombia</p>
                            </div>
                        </div>
                        <button className="boton-accion-principal"><i className="bi bi-pencil-square"></i> Actualizar Datos</button>
                    </header>

                    <div className="perfil-grid-contenido">
                        <section className="seccion-datos">
                            <div className="tarjeta-blanca">
                                <h3><i className="bi bi-person-lines-fill"></i> Información Personal</h3>

                                <div className="los-datos-grid">
                                    <div className="dato-item">
                                        <label>Primer Nombre</label>
                                        <div className="caja-dato">Juan</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Segundo Nombre</label>
                                        <div className="caja-dato">Andres</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Primer Apellido</label>
                                        <div className="caja-dato">Estrada</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Segundo Apellido</label>
                                        <div className="caja-dato">Erazo</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Tipo de Documento</label>
                                        <div className="caja-dato">C.C.</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Número de Identificación</label>
                                        <div className="caja-dato">10058191</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Teléfono Movil</label>
                                        <div className="caja-dato">310 123 4567</div>
                                    </div>
                                    <div className="dato-item-ancho">
                                        <label>Correo Institucional</label>
                                        <div className="caja-dato">juanestrada@soysena.edu.co</div>
                                    </div>
                                    <div className="dato-item-ancho">
                                        <label>Institución Educativa de Interés</label>
                                        <div className="caja-dato">Institución Educación San Vicente</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="columna-lateral">
                            <div className="tarjeta-blanca">
                                <h3><i className="bi bi-activity"></i> Estado de Matrícula</h3>
                                <div className="indicador-progreso">
                                    <div className="barra-externa">
                                        <div className="barra-interna" style={{ width: "85%" }}></div>
                                    </div>
                                    <span>85% Completado</span>
                                </div>
                                <p className="nota-ayuda">Tu proceso está en revisión por la secretaría académica.</p>
                            </div>

                            <div className="tarjeta-blanca">
                                <h3><i className="bi bi-shield-check"></i> Seguridad</h3>
                                <p>Protege tu información personal.</p>
                                <button className="btn-seguridad">Cambiar Contraseña</button>
                            </div>

                            <div className="tarjeta-blanca">
                                <h3><i className="bi bi-gear"></i> Preferencias</h3>
                                <div className="control-switch">
                                    <span>Notificaciones por Correo</span>
                                    <i className="bi bi-toggle-on"></i>
                                </div>
                                <div className="control-switch">
                                    <span>Modo Accesibilidad</span>
                                    <i className="bi bi-toggle-off"></i>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default PerfilUsuario
