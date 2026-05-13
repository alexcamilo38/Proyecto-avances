//import React from 'react'
import { Link } from "react-router-dom"
import "./Menu.css"
import "./MatriculasE.css"
const MatriculasE = () => {
    return (
        <div className="dashboard-container4">
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src="img/LogoBlanco.png" alt="EasyMatric" className="logo-img" />
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
            <main className="contenido-principal4">
                <div className="header-matriculas4">
                    <h1>Seguimiento de Matrículas</h1>
                    <br />
                    <p>Monitorea el estado de tus inscripciones y descarga tus comprobantes oficiales.</p>
                </div>
                <br />
      
                <div className="contenedor-historial">

                    <div className="tarjeta-matricula4">
                        <div className="matricula-encabezado4">
                            <div className="inst-info">
                                <div className="icono-inst"><i className="bi bi-building"></i></div>
                                <div>
                                    <h2>I.E. San Vicente</h2>
                                    <span className="id-proceso">ID Proceso: #EM-2026-882</span>
                                </div>
                            </div>
                            <div className="estado-badge aprobado">Aprobado</div>
                        </div>

                        <div className="matricula-cuerpo7">
                            <div className="seccion-modulos7">
                                <h3><i className="bi bi-layers"></i> Módulos Inscritos:</h3>
                                <div className="grid-modulos7">
                                    <span className="modulos7-item">Ciencias Naturales</span>
                                    <span className="modulos7-item">Matemáticas Avanzadas</span>
                                    <span className="modulos7-item">Inglés Técnico</span>
                                    <span className="modulos7-item">Lenguaje y Comunicación</span>
                                </div>
                            </div>

                            <div className="seccion-progreso">
                                <h3><i className="bi bi-activity"></i> Estado del Proceso:</h3>
                                <div className="linea-progreso">
                                    <div className="paso completado"><span>1</span><p>Solicitud</p></div>
                                    <div className="paso completado"><span>2</span><p>Documentación</p></div>
                                    <div className="paso completado"><span>3</span><p>Revisión</p></div>
                                    <div className="paso activo"><span>4</span><p>Finalizado</p></div>
                                </div>
                            </div>
                        </div>

                        <div className="matricula-acciones">
                            <button className="btn-accion secundario"><i className="bi bi-eye"></i> Detalles</button>
                            <button className="btn-accion primario"><i className="bi bi-file-earmark-pdf"></i> Descargar Comprobante</button>
                        </div>
                    </div>

                    <div className="tarjeta-matricula4">
                        <div className="matricula-encabezado4">
                            <div className="inst-info">
                                <div className="icono-inst"><i className="bi bi-building"></i></div>
                                <div>
                                    <h2>Colegio Mayor de Cauca</h2>
                                    <span className="id-proceso">ID Proceso: #EM-2026-915</span>
                                </div>
                            </div>
                            <div className="estado-badge pendiente">En Revisión</div>
                        </div>

                        <div className="matricula-cuerpo">
                            <p className="nota-espera">Tu documentación está siendo validada por la secretaría de la institución. Este proceso puede tardar hasta 48 horas.</p>
                        </div>

                        <div className="matricula-acciones">
                            <button className="btn-accion disabled" disabled><i className="bi bi-file-earmark-lock"></i> Comprobante no disponible</button>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}

export default MatriculasE
