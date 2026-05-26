//import React from 'react'
import { Link } from "react-router-dom"
import logoblanco from "../../assets/LogoBlanco.png"
import "./GrupoModulo.css"
const GrupoModulo = () => {
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
            <main className="contenido-principal-docentes-modulos">

                <header className="header-tabla-docentes-modulos">

                    <div className="titulo-area-docentes-modulos">

                        <div className="titulo-flex-docentes-modulos">

                            <Link
                                to="/DocenteMo"
                                className="btn-volver-docentes-modulos"
                            >
                                <i className="bi bi-arrow-left-short"></i>
                            </Link>

                            <h1>Estudiantes e Historial de Notas</h1>

                        </div>

                        <p>
                            Módulo:
                            <strong>
                                {" "}Comprensión Lectora y Redacción (3° Primaria)
                            </strong>
                        </p>

                    </div>

                    <button className="btn-primario-docentes-modulos">
                        <i className="bi bi-save"></i>
                        Guardar Todas las Notas
                    </button>

                </header>

                <section className="contenedor-tabla-soft-docentes-modulos">

                    <div className="tabla-scroll-docentes-modulos">

                        <table className="tabla-matriculados-docentes-modulos">

                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nombre Completo</th>
                                    <th>ID Matrícula</th>
                                    <th>Género</th>
                                    <th>Nota Final</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>01</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Nicolás Mateo Salazar
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI01
                                        </span>
                                    </td>

                                    <td>Masculino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="4.5"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual" >
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>02</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Salome Catalina López
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI02
                                        </span>
                                    </td>

                                    <td>Femenino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>03</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Ginna Gabriela Goyes
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI03
                                        </span>
                                    </td>

                                    <td>Femenino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>04</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Alex Santiago Gomez Ayala
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI04
                                        </span>
                                    </td>

                                    <td>Masculino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>

                                </tr>
                                <tr>
                                    <td>05</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Jhosntin Fabian Castillo
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI05
                                        </span>
                                    </td>

                                    <td>Masculino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual" >
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>06</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Yeraldin Fernanda España
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI06
                                        </span>
                                    </td>

                                    <td>Femenino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>07</td>

                                    <td className="nombre-est-docentes-modulos">
                                        María Alejandra Gomez Gomez
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI07
                                        </span>
                                    </td>

                                    <td>Femenino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>08</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Yannin Ayala
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI08
                                        </span>
                                    </td>

                                    <td>Femenino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>09</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Yuneidi Rincon
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI09
                                        </span>
                                    </td>

                                    <td>Femenino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>10</td>

                                    <td className="nombre-est-docentes-modulos">
                                        Cristian Alejandro Guerrero
                                    </td>

                                    <td>
                                        <span className="badge-id-docentes-modulos">
                                            PRI10
                                        </span>
                                    </td>

                                    <td>Masculino</td>

                                    <td>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className="input-nota-docentes-modulos"
                                        />
                                    </td>

                                    <td>
                                        <button className="btn-tabla-docentes-modulos" title="Guardar Nota Individual">
                                            <i className="bi bi-check-lg"></i>
                                        </button>
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

export default GrupoModulo
