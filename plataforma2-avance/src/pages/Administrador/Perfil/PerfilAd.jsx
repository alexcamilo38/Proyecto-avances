//import React from 'react'
import { Link } from 'react-router-dom'
import "./PerfilAd.css"
import admin from '../../../assets/iconLE.png';
import logoblanco from '../../../assets/LogoBlanco.png'
const PerfilAd = () => {
    return (
        <div>
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/RegistrarSede"><i className="bi bi-bank"></i> <span>Instituciones</span></Link></li>
                    <li><Link to="/RevicionD"><i className="bi bi-journal-bookmark"></i> <span>Matrículas</span></Link></li>
                    <li><Link to="/Matriculados"><i className="bi bi-people"></i> <span>Estudiantes</span></Link></li>
                    <li><Link to="/Roles" ><i className="bi bi-shield-lock"></i> <span>Roles</span></Link></li>
                    <li><Link to="/NotasCa"><i className="bi bi-folder2-open"></i> <span>Catálogos</span></Link></li>
                    <li><Link to="/PerfilAd" ><i className="bi bi-person-badge"></i><span>Mi Perfil</span></Link></li>
                </ul>
                <div className="menu-pie">
                    <Link to="/" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ADMINISTRADOR</span>
                    </div>
                </div>
            </nav>
            <main className="contenido-perfilad02">
                <div className="perfil-contenedorad02">

                    <header className="perfil-headerad02">
                        <div className="perfil-info-basica-ad02">
                            <div className="avatar-zona-ad02">
                                <img src={admin} alt="Foto de Perfil" className="avatarad02-img" />
                                <button className="btn-cambiar-foto"><i className="bi bi-camera"></i></button>
                            </div>
                            <div className="texto-usuario-ad02">
                                <h1>Gustavo Adolfo Mejía</h1>
                                <span className="badge-rol-admin">Rector Institucional</span>
                            </div>
                        </div>
                        <button className="boton-accion-principal-ad02"><i className="bi bi-pencil-square"></i> Editar Perfil</button>
                    </header>

                    <div className="perfil-grid-contenido-ad02">
                        <section className="seccion-datos">
                            <div className="tarjeta-blanca-ad02">
                                <h3><i className="bi bi-person-vcard"></i> Datos de Identificación</h3>
                                <br />
                                <div className="los-datos-grid-ad02">
                                    <div className="dato-item">
                                        <label>Número de Cédula</label>
                                        <div className="caja-dato">10058191</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Cargo Oficial</label>
                                        <div className="caja-dato">Rector Académico</div>
                                    </div>
                                    <div className="dato-item-ancho">
                                        <label>Correo Institucional</label>
                                        <div className="caja-dato">gustavo.mejia@easymatric.edu.co</div>
                                    </div>
                                </div>
                            </div>

                            <div className="tarjeta-blanca-ad02">
                                <h3><i className="bi bi-building-check"></i> Entidad Vinculada</h3>
                                <br />
                                <div className="los-datos-grid">
                                    <div className="dato-item-ancho">
                                        <label>Institución Educativa</label>
                                        <div className="caja-dato">Institución Educación San Vicente</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>NIT Institucional</label>
                                        <div className="caja-dato">800.123.456-1</div>
                                    </div>
                                    <div className="dato-item">
                                        <label>Teléfono Oficina</label>
                                        <div className="caja-dato">602 823 4567</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="columna-lateral">
                            <div className="tarjeta-blanca-ad02 estadisticas-admin">
                                <h3><i className="bi bi-graph-up"></i> Mi Actividad</h3>
                                <br />
                                <div className="mini-stat">
                                    <span>Matrículas revisadas</span>
                                    <strong>124</strong>
                                </div>
                                <div className="mini-stat">
                                    <span>Sedes a cargo</span>
                                    <strong>02</strong>
                                </div>
                            </div>

                            <div className="tarjeta-blanca-ad02">
                                <h3><i className="bi bi-shield-check"></i> Seguridad</h3>
                                <br />
                                <p>Control de acceso y credenciales.</p>
                                <br />
                                <button className="btn-seguridad"><a href="ReperaContra.html">Cambiar mi clave</a></button>
                            </div>

                            <div className="tarjeta-blanca-ad02">
                                <h3><i className="bi bi-gear"></i> Sistema</h3>
                                <div className="control-switch-ad02">
                                    <span>Alertas de Cupos</span>
                                    <i className="bi bi-toggle-on"></i>
                                </div>
                                <div className="control-switch-ad02">
                                    <span>Modo Reporte Semanal</span>
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

export default PerfilAd
