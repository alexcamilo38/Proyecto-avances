//import React from 'react'
import { Link } from "react-router-dom"
import "./Menu.css"
import "./MatriculasE.css"
const MatriculasE = () => {
    return (
        <div>
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
                        <Link to="/Matriculas">
                            <i className="bi bi-journal-bookmark"></i>
                            <span>Mis Matrículas</span>
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
            <main class="contenido-principal4">
                <div class="header-matriculas">
                    <h1>Seguimiento de Matrículas</h1>
                    <p>Monitorea el estado de tus inscripciones y descarga tus comprobantes oficiales.</p>
                </div>

                <div class="contenedor-historial">

                    <div class="tarjeta-matricula">
                        <div class="matricula-encabezado">
                            <div class="inst-info">
                                <div class="icono-inst"><i class="bi bi-building"></i></div>
                                <div>
                                    <h2>I.E. San Vicente</h2>
                                    <span class="id-proceso">ID Proceso: #EM-2026-882</span>
                                </div>
                            </div>
                            <div class="estado-badge aprobado">Aprobado</div>
                        </div>

                        <div class="matricula-cuerpo">
                            <div class="seccion-modulos">
                                <h3><i class="bi bi-layers"></i> Módulos Inscritos:</h3>
                                <div class="grid-modulos">
                                    <span class="modulo-item">Ciencias Naturales</span>
                                    <span class="modulo-item">Matemáticas Avanzadas</span>
                                    <span class="modulo-item">Inglés Técnico</span>
                                    <span class="modulo-item">Lenguaje y Comunicación</span>
                                </div>
                            </div>

                            <div class="seccion-progreso">
                                <h3><i class="bi bi-activity"></i> Estado del Proceso:</h3>
                                <div class="linea-progreso">
                                    <div class="paso completado"><span>1</span><p>Solicitud</p></div>
                                    <div class="paso completado"><span>2</span><p>Documentación</p></div>
                                    <div class="paso completado"><span>3</span><p>Revisión</p></div>
                                    <div class="paso activo"><span>4</span><p>Finalizado</p></div>
                                </div>
                            </div>
                        </div>

                        <div class="matricula-acciones">
                            <button class="btn-accion secundario"><i class="bi bi-eye"></i> Detalles</button>
                            <button class="btn-accion primario"><i class="bi bi-file-earmark-pdf"></i> Descargar Comprobante</button>
                        </div>
                    </div>

                    <div class="tarjeta-matricula">
                        <div class="matricula-encabezado">
                            <div class="inst-info">
                                <div class="icono-inst"><i class="bi bi-building"></i></div>
                                <div>
                                    <h2>Colegio Mayor de Cauca</h2>
                                    <span class="id-proceso">ID Proceso: #EM-2026-915</span>
                                </div>
                            </div>
                            <div class="estado-badge pendiente">En Revisión</div>
                        </div>

                        <div class="matricula-cuerpo">
                            <p class="nota-espera">Tu documentación está siendo validada por la secretaría de la institución. Este proceso puede tardar hasta 48 horas.</p>
                        </div>

                        <div class="matricula-acciones">
                            <button class="btn-accion disabled" disabled><i class="bi bi-file-earmark-lock"></i> Comprobante no disponible</button>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}

export default MatriculasE
