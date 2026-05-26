//import React from 'react'
import { Link } from "react-router-dom"
import logoblanco from "../../assets/LogoBlanco.png"
import Docente from "../../assets/docente.jpeg"
import "./PerfilDocente.css"
const PerfilDocente = () => {
  return (
     <div>
            {/* Menú lateral de navegación */}
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                {/* Lista de enlaces del menú */}
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/"><i class="bi bi-journal-bookmark"></i> <span>Mis Módulos</span></Link></li>
                    <li><Link to="/SubirModulo"><i class="bi bi-cloud-upload"></i> <span>Subir Módulo</span></Link></li>
                    <li><Link to="/PerfilDocente" ><i className="bi bi-person-badge"></i><span>Mi Perfil</span></Link></li>
                </ul>
                <div className="menu-pie">
                    <Link to="/" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>DOCENTE</span>
                    </div>
                </div>
            </nav>
            <main className="contenido-principal-docente">
                <div className="perfil-contenedor-docente">

                    <header className="perfil-header-docente">
                        <div className="perfil-info-basica-docente">
                            <div className="avatar-zona-docente">
                                <img src={Docente} alt="Foto de Perfil Docente" className="avatar-img" />
                                <button className="btn-cambiar-foto-docente"><i className="bi bi-camera"></i></button>
                            </div>
                            <div className="texto-usuario-docente">
                                <h1>Carlos Alberto Mendoza</h1>
                                <span className="etiqueta-rol-docente">Docente de Planta - Humanidades</span>
                                <p><i className="bi bi-geo-alt"></i> Popayán, Colombia</p>
                            </div>
                        </div>
                        <a href="EditarPerfilDocente.html" className="boton-accion-principal-docente"><i className="bi bi-pencil-square"></i> Actualizar Datos</a>
                    </header>

                    <div className="perfil-grid-contenido-docente">
                        <section className="seccion-datos-docente">
                            <div className="tarjeta-blanca-docente02">
                                <h3><i className="bi bi-person-lines-fill"></i> Información Profesional</h3>

                                <div className="los-datos-grid-docente">
                                    <div className="dato-item-docente">
                                        <label>Nombres</label>
                                        <div className="caja-dato-docente">Carlos Alberto</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Apellidos</label>
                                        <div className="caja-dato">Mendoza Ruíz</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Número de Identificación</label>
                                        <div className="caja-dato">10.452.963</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>ID Registro Docente</label>
                                        <div className="caja-dato">DOC-2026-88</div>
                                    </div>
                                    <div className="dato-item-ancho">
                                        <label>Especialidad Académica</label>
                                        <div className="caja-dato">Licenciatura en Lengua Castellana y Literatura</div>
                                    </div>
                                    <div className="dato-item-ancho">
                                        <label>Sede Educativa Asignada</label>
                                        <div className="caja-dato">Institución Educación San Vicente - Sede Principal</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Teléfono de Contacto</label>
                                        <div className="caja-dato">315 789 0123</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Correo Institucional</label>
                                        <div className="caja-dato">carlos.mendoza@easymatric.edu.co</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="columna-lateral">
                            <div className="tarjeta-blanca-docente02">
                                <h3><i className="bi bi-shield-check"></i> Seguridad</h3>
                                <p>Mantén tu cuenta protegida.</p>
                                <button className="btn-seguridad"><a href="RecuperaContra.html" >Cambiar contraseña</a></button>
                            </div>

                            <div className="tarjeta-blanca-docente02">
                                <h3><i className="bi bi-gear"></i> Preferencias</h3>
                                <div className="control-switch">
                                    <span>Avisos de Alumnos Nuevos</span>
                                    <i className="bi bi-toggle-on"></i>
                                </div>
                                <div className="control-switch">
                                    <span>Recordatorios de Cierre</span>
                                    <i className="bi bi-toggle-on"></i>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
  )
}

export default PerfilDocente
