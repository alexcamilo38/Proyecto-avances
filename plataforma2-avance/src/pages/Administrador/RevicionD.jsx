//import React from 'react'
import { Link } from "react-router-dom"
import "./RevicionD.css"
import logoblanco from '../../assets/LogoBlanco.png'
const RevicionD = () => {
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
            <div className="contenido-revicion">
                <div className="header02">
                    <h2>Revisión de Documentación</h2>
                </div>
                {/* Filtro por grado */}
                <div className="tabla-box02">
                    <div className="acciones-header02">
                        <select className="btn-primario08" name="Filtra por grado" required>
                            <option value="">Filtra por grado</option>
                            <option value="6">Prescolar</option>
                            <option value="7">Primaria</option>
                            <option value="8">Secundaria</option>
                        </select>

                    </div>
                     {/* Sección tabla */}
                    <section className="contenedor-tabla-revisar">
                        <div className="barra-herramientas">
                            {/* Tabla de revisión */}
                            <table className="tabla-revision ">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                         <th>Documento</th>
                                        <th>Fecha Envío</th>
                                        <th>Estado Actual</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ana Rodríguez</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>27/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">

                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Breiner Pérez</td>
                                        <td><a href="#" className="btn-link">Ver_Documento.pdf</a></td>
                                        <td>26/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Valentina Ospina</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>26/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Carlos Andrés Mendoza</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>27/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Angie Marcela Ortiz</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>27/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mariana Lucía Torres</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>02/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sofía Elena Gómez</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>21/02/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Samuel David Quintero</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>27/03/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Isabella Caicedo</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>03/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mateo Holguín</td>
                                        <td><a href="#" className="btn-link">ver_documento.pdf</a></td>
                                        <td>17/04/2026</td>
                                        <td><span className="badge pendiente">Pendiente</span></td>
                                        <td className="acciones-validacion">
                                            <button className="btn-aprobar">Aprobar</button>
                                            <button className="btn-rechazar">Rechazar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default RevicionD
