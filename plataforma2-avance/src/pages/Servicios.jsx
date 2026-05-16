//import React from 'react'
import "./Servicios.css"
const Servicios = () => {
    return (
        <div>
            {/* Sección de funcionalidades principales */}
            <section className="seccion-modulos">
                <div className="container-centrado">
                    <div className="cabecera-modulos">
                        <span className="etiqueta-superior">Funcionalidades</span>
                        <h2>Ecosistema Digital EasyMatric</h2>
                        <p>Una plataforma diseñada para conectar a toda la comunidad educativa de manera eficiente.</p>
                    </div>
                    {/* Tarjetas de módulos */}
                    <div className="modulos-grid">
                        <div className="modulo-item">
                            <div className="modulo-header">
                                <div className="icono-wrap">
                                    <i className="bi bi-people-fill"></i>
                                </div>
                                <h3>Estudiantes y Acudientes</h3>
                            </div>
                            <div className="modulo-body">
                                <p>Autogestión total desde cualquier lugar para facilitar el acceso a la educación.</p>
                                {/* Lista de funcionalidades */}
                                <ul className="lista-cheque">
                                    <li><i className="bi bi-check-circle-fill"></i> Pre-registro y Matrícula 24/7</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Carga digital de documentos</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Notificaciones de estado en tiempo real</li>
                                </ul>
                            </div>
                        </div>
                        {/* Módulo administrativo */}
                        <div className="modulo-item destacado">
                            <div className="modulo-header">
                                <div className="icono-wrap">
                                    <i className="bi bi-pc-display-horizontal"></i>
                                </div>
                                <h3>Gestión Administrativa</h3>
                            </div>
                            <div className="modulo-body">
                                <p>Herramientas avanzadas para el control total del proceso institucional.</p>
                                <ul className="lista-cheque">
                                    <li><i className="bi bi-check-circle-fill"></i> Panel de control de cupos</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Validación automatizada de archivos</li>
                                    <li><i className="bi bi-check-circle-fill"></i> Generación de informes y analíticas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="Ruta" className="seccion-ruta">
                <div className="container12">
                    <div className="cabecera-ruta">
                        <span className="etiqueta-viva">Tu Camino al Éxito</span>
                        <h2>Ruta de Gestión Educativa</h2>
                        <p>Sigue estos pasos para completar tu proceso en tiempo récord.</p>
                    </div>

                    <div className="timeline-container">
                        <div className="timeline-step">
                            <div className="step-number">01</div>
                            <div className="step-content">
                                <h4>Registro Digital</h4>
                                <p>Crea tu perfil único en la plataforma para centralizar tu información.</p>
                            </div>
                            <div className="step-icon"><i className="bi bi-person-plus"></i></div>
                        </div>

                        <div className="timeline-step">
                            <div className="step-number">02</div>
                            <div className="step-content">
                                <h4>Selección Institucional</h4>
                                <p>Explora y elige la institución académica que mejor se adapte a tus metas.</p>
                            </div>
                            <div className="step-icon"><i className="bi bi-search"></i></div>
                        </div>

                        <div className="timeline-step">
                            <div className="step-number">03</div>
                            <div className="step-content">
                                <h4>Carga de Documentación</h4>
                                <p>Digitaliza y sube tus archivos de forma segura. Adiós al papel.</p>
                            </div>
                            <div className="step-icon"><i className="bi bi-cloud-arrow-up"></i></div>
                        </div>

                        <div className="timeline-step">
                            <div className="step-number">04</div>
                            <div className="step-content">
                                <h4>Validación y Respuesta</h4>
                                <p>Nuestro sistema y la institución validan tu información rápidamente.</p>
                            </div>
                            <div className="step-icon"><i className="bi bi-patch-check"></i></div>
                        </div>

                        <div className="timeline-step">
                            <div className="step-number">05</div>
                            <div className="step-content">
                                <h4>Control de Estado</h4>
                                <p>Monitorea tu avance y descarga tu comprobante de matrícula oficial.</p>
                            </div>
                            <div className="step-icon"><i className="bi bi-bar-chart-steps"></i></div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Servicios
