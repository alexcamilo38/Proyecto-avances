//import React from 'react'
import { Link } from "react-router-dom"
import "./ModulosAcademicos.css"
import logoblanco from '../../assets/LogoBlanco.png'
const ModulosAcademicos = () => {
    return (
        <div>
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
            <main className="contenido-modulosacademicos">
                <header className="header-admin03">
                    <div className="titulo-grupo03">
                        <h1>Módulos Académicos Disponibles</h1>
                        <p>Explora los cursos, horarios y requisitos para tu formación técnica.</p>
                    </div>
                    {/* Barra de búsqueda y filtros */}
                    <div className="busqueda-filtro03">
                         {/* Filtro por modalidad */}
                        <select className="select-filtro03">
                            <option value="">Todas las modalidades</option>
                            <option value="presencial">Presencial</option>
                            <option value="virtual">Virtual</option>
                        </select>
                        <input type="text" placeholder="Buscar módulo por nombre..." className="input-busqueda03" />
                    </div>
                </header>


                <section className="grid-modulos03">
                     {/* MÓDULO 1 */}
                    <article className="tarjeta-modulo03">
                        <div className="modulo-header03">
                            <span className="tag-modalidad presencial">Presencial</span>
                            <div className="cupos-disponibles">
                                <i className="bi bi-people-fill"></i> 15 Cupos libres
                            </div>
                        </div>

                        <div className="modulo-cuerpo03">
                            <h2>Programación Orientada a Objetos (Java)</h2>
                            <p className="docente-asignado"><i className="bi bi-person-badge"></i> Docente: <strong>Jorge Betancourth</strong></p>

                            <div className="detalles-rapidos">
                                <div className="detalle-item">
                                    <i className="bi bi-calendar3"></i>
                                    <span>Lunes y Miércoles</span>
                                </div>
                                <div className="detalle-item">
                                    <i className="bi bi-clock"></i>
                                    <span>07:00 AM - 10:00 AM</span>
                                </div>
                                <div className="detalle-item">
                                    <i className="bi bi-geo-alt"></i>
                                    <span>Laboratorio de Software 2</span>
                                </div>
                            </div>

                            <div className="requisitos-modulo">
                                <h4>Requisitos obligatorios:</h4>
                                <ul>
                                    <li><i className="bi bi-check-circle"></i> Algoritmos básicos aprobados</li>
                                    <li><i className="bi bi-check-circle"></i> Computador portátil propio</li>
                                </ul>
                            </div>
                        </div>

                        <div className="modulo-pie03">
                            <button className="btn-ver-mas03">Más detalles</button>
                            <button className="btn-inscribirse-modulo">Postularme</button>
                        </div>
                    </article>

                    {/* MÓDULO 2 */}
                    <article className="tarjeta-modulo03">
                        <div className="modulo-header03">
                            <span className="tag-modalidad virtual">Virtual</span>
                            <div className="cupos-disponibles">
                                <i className="bi bi-people-fill"></i> 30 Cupos libres
                            </div>
                        </div>

                        <div className="modulo-cuerpo">
                            <h2>Desarrollo Web con PHP y Laravel</h2>
                            <p className="docente-asignado"><i className="bi bi-person-badge"></i> Docente: <strong>Instructor Juan Pablo</strong></p>

                            <div className="detalles-rapidos">
                                <div className="detalle-item">
                                    <i className="bi bi-calendar3"></i>
                                    <span>Martes y Jueves</span>
                                </div>
                                <div className="detalle-item">
                                    <i className="bi bi-clock"></i>
                                    <span>06:00 PM - 08:00 PM</span>
                                </div>
                                <div className="detalle-item">
                                    <i className="bi bi-laptop"></i>
                                    <span>Plataforma LMS SENA / Meet</span>
                                </div>
                            </div>

                            <div className="requisitos-modulo">
                                <h4>Requisitos obligatorios:</h4>
                                <ul>
                                    <li><i className="bi bi-check-circle"></i> Conocimiento en HTML/CSS</li>
                                    <li><i className="bi bi-check-circle"></i> Conexión a internet estable</li>
                                </ul>
                            </div>
                        </div>

                        <div className="modulo-pie03">
                            <button className="btn-ver-mas03">Más detalles</button>
                            <button className="btn-inscribirse-modulo">Postularme</button>
                        </div>
                    </article>
                     {/* MÓDULO 3 */}
                    <article className="tarjeta-modulo03">
                        <div className="modulo-header03">
                            <span className="tag-modalidad presencial">Presencial</span>
                            <div className="cupos-disponibles">
                                <i className="bi bi-people-fill"></i> 10 Cupos libres
                            </div>
                        </div>

                        <div className="modulo-cuerpo03">
                            <h2>Agroindustria</h2>
                            <p className="docente-asignado"><i className="bi bi-person-badge"></i> Docente: <strong>Darwim ayala</strong></p>

                            <div className="detalles-rapidos">
                                <div className="detalle-item">
                                    <i className="bi bi-calendar3"></i>
                                    <span>Lunes,MIércoles y Viernes</span>
                                </div>
                                <div className="detalle-item">
                                    <i className="bi bi-clock"></i>
                                    <span>1:00 AM - 4:00 AM</span>
                                </div>
                                <div className="detalle-item">
                                    <i className="bi bi-geo-alt"></i>
                                    <span>aula 201</span>
                                </div>
                            </div>

                            <div className="requisitos-modulo">
                                <h4>Requisitos obligatorios:</h4>
                                <ul>
                                    <li><i className="bi bi-check-circle"></i>ser mayor de edad</li>
                                    <li><i className="bi bi-check-circle"></i> tener buen promedio académico</li>
                                </ul>
                            </div>
                        </div>

                        <div className="modulo-pie03">
                            <button className="btn-ver-mas03">Más detalles</button>
                            <button className="btn-inscribirse-modulo">Postularme</button>
                        </div>
                    </article>

                </section>
            </main>

        </div>
    )
}

export default ModulosAcademicos
