//import React from 'react'
import "./Roles.css"
import { Link } from "react-router-dom"
import logoblanco from '../../assets/LogoBlanco.png'

const Roles = () => {
    return (
        <div >
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
            <main className="contenido-principal-roles">
                <header className="header-tabla-roles">
                    <div className="titulo-area">
                        <h1>Gestión de Roles y Accesos</h1>
                        <p>Configura los niveles de seguridad y permisos para los usuarios de la plataforma.</p>
                    </div>
                </header>

                <section className="contenedor-roles">
                    <div className="card-informativa-soft">
                        <div className="info-texto-roles">
                            <i className="bi bi-shield-check"></i>
                            <div>
                                <strong>Seguridad del Sitio</strong>
                                <p>Actualmente tienes 1 página con acceso restringido para niveles directivos.</p>
                            </div>
                        </div>
                        <button className="btn-secundario">Ver Permisos <i className="bi bi-arrow-right"></i></button>
                    </div>

                    <div className="contenedor-tabla-soft">
                        <div className="barra-herramientas">
                            <div className="titulo-tabla-interna">
                                <h2>Listado de Roles</h2>
                            </div>
                            <div className="acciones">
                                <div className="busqueda-contenedor">
                                    <i className="bi bi-search"></i>
                                    <input type="text" className="input-busqueda-simple" placeholder="Buscar rol..." />
                                </div>
                                <button className="btn-primario"><i className="bi bi-plus-lg"></i> Nuevo Rol</button>
                            </div>
                        </div>

                        <table className="tabla-matriculados">
                            <thead>
                                <tr>
                                    <th>Nombre del Rol</th>
                                    <th>Usuarios</th>
                                    <th>Permisos</th>
                                    <th>Última Edición</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className="rol-tag admin">ADMINISTRADOR</span></td>
                                    <td>2 usuarios</td>
                                    <td><span className="permisos-count">Acceso Total</span></td>
                                    <td>10 Abr, 2026</td>
                                    <td><button className="btn-tabla"><i className="bi bi-three-dots-vertical"></i></button></td>
                                </tr>
                                <tr>
                                    <td><span className="rol-tag rector">RECTOR</span></td>
                                    <td>1 usuario</td>
                                    <td><span className="permisos-count">3 niveles</span></td>
                                    <td>02 Mar, 2026</td>
                                    <td><button className="btn-tabla"><i className="bi bi-three-dots-vertical"></i></button></td>
                                </tr>
                                <tr>
                                    <td><span className="rol-tag staff">COORDINADOR</span></td>
                                    <td>1 usuario</td>
                                    <td><span className="permisos-count">3 niveles</span></td>
                                    <td>21 Abr, 2026</td>
                                    <td><button className="btn-tabla"><i className="bi bi-three-dots-vertical"></i></button></td>
                                </tr>
                                <tr>
                                    <td><span className="rol-tag staff">DOCENTE</span></td>
                                    <td>5 usuarios</td>
                                    <td><span className="permisos-count">2 niveles</span></td>
                                    <td>15 Abr, 2026</td>
                                    <td><button className="btn-tabla"><i className="bi bi-three-dots-vertical"></i></button></td>
                                </tr>
                                <tr>
                                    <td><span className="rol-tag user">ESTUDIANTE</span></td>
                                    <td>320 usuarios</td>
                                    <td><span className="permisos-count">Solo Lectura</span></td>
                                    <td>20 Abr, 2026</td>
                                    <td><button className="btn-tabla"><i className="bi bi-three-dots-vertical"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default Roles
