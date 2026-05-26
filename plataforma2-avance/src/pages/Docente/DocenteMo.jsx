//import React from 'react'
import { Link } from "react-router-dom"
import logoblanco from "../../assets/LogoBlanco.png"
import "./DocenteMo.css"
const DocenteMo = () => {
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
                    <li><Link to="/DocenteMo"><i class="bi bi-journal-bookmark"></i> <span>Mis Módulos</span></Link></li>
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
            <main className="contenido-principal-docentess04">

                <header className="header-tabla-docentess04">
                    <div className="titulo-area-docentess04">
                        <h1>Mis Módulos Asignados</h1>
                        <p>
                            Gestiona los contenidos, revisa los estudiantes inscritos y sube las calificaciones finales.
                        </p>
                    </div>

                    <Link to="/SubirModulo" className="btn-primario-docentess04">
                        <i className="bi bi-plus-lg"></i> Subir Nuevo Módulo
                    </Link>
                </header>

                <section className="contenedor-tabla-soft-docentess04">

                    <div className="barra-herramientas-docentess04">
                        <div className="caja-busqueda-docentess04">
                            <i className="bi bi-search"></i>

                            <input type="text" placeholder="Buscar módulo o grado..." />
                        </div>
                    </div>

                    <div className="tabla-scroll-docentess04">

                        <table className="tabla-matriculados-docentess04">

                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nombre del Módulo</th>
                                    <th>Grado / Curso</th>
                                    <th>Estudiantes Inscritos</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>01</td>

                                    <td className="nombre-est-docentess04">
                                        Comprensión Lectora y Redacción
                                    </td>

                                    <td>
                                        <span className="grado-tag-docentess04">
                                            3° Primaria
                                        </span>
                                    </td>

                                    <td>
                                        <strong>28 Alumnos</strong>
                                    </td>

                                    <td>
                                        <span className="badge-activo-docentess04"> Activo</span>
                                    </td>

                                    <td>
                                        <Link to="/GrupoModulo" className="btn-tabla-docentess04" title="Gestionar Estudiantes y Notas">
                                            <i className="bi bi-eye-fill"></i> Ver Grupo
                                        </Link>
                                    </td>
                                </tr>

                                <tr>
                                    <td>02</td>

                                    <td className="nombre-est-docentess04">
                                        Matemáticas Fundamentales
                                    </td>

                                    <td>
                                        <span className="grado-tag-docentess04">
                                            4° Primaria
                                        </span>
                                    </td>

                                    <td>
                                        <strong>25 Alumnos</strong>
                                    </td>

                                    <td>
                                        <span className="badge-activo-docentess04">
                                            Activo
                                        </span>
                                    </td>

                                    <td>
                                        <Link to="/GrupoModulo" className="btn-tabla-docentess04" title="Gestionar Estudiantes y Notas">
                                            <i className="bi bi-eye-fill"></i> Ver Grupo
                                        </Link>
                                    </td>
                                </tr>

                                <tr>
                                    <td>03</td>

                                    <td className="nombre-est-docentess04">
                                        Ciencias Naturales y Entorno
                                    </td>

                                    <td>
                                        <span className="grado-tag-docentess04">
                                            5° Primaria
                                        </span>
                                    </td>

                                    <td>
                                        <strong>30 Alumnos</strong>
                                    </td>

                                    <td>
                                        <span className="badge-pendiente-docentess04">
                                            Pendiente
                                        </span>
                                    </td>

                                    <td>
                                        <Link to="/GrupoModulo" className="btn-tabla-docentess04" title="Gestionar Estudiantes y Notas" >
                                            <i className="bi bi-eye-fill"></i> Ver Grupo
                                        </Link>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>

        </div>
    )
}

export default DocenteMo
