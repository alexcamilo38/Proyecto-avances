//import React from 'react'

const Servicios = () => {
    return (
        <div>
            {/* Sección de funcionalidades principales */}
            <section className={"seccion-modulos [all:unset] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [width:100vw] [min-height:100vh] [background-color:#f8fafc] [padding:60px_20px] [box-sizing:border-box]"}>
                <div className={"container-centrado [width:100%] [max-width:1100px] [margin:0_auto] [display:block]"}>
                    <div className={"cabecera-modulos [text-align:center] [margin-bottom:40px]"}>
                        <span className={"etiqueta-superior [display:inline-block] [background:rgba(37,_99,_235,_0.1)] [color:#2563eb] [padding:8px_20px] [border-radius:50px] [font-size:0.8rem] [font-weight:700] [letter-spacing:1px] [margin-bottom:15px]"}>Funcionalidades</span>
                        <h2 className={"[.cabecera-modulos_&]:[font-size:2.8rem] [.cabecera-modulos_&]:[color:#1e293b] [.cabecera-modulos_&]:[font-weight:700] [.cabecera-modulos_&]:[margin:15px_0]"}>Ecosistema Digital EasyMatric</h2>
                        <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Una plataforma diseñada para conectar a toda la comunidad educativa de manera eficiente.</p>
                    </div>
                    {/* Tarjetas de módulos */}
                    <div className={"modulos-grid [display:grid] [grid-template-columns:repeat(2,_1fr)] [gap:30px] [width:100%] max-[850px]:[grid-template-columns:1fr]"}>
                        <div className={"modulo-item [background:#ffffff] [border-radius:24px] [padding:40px] [text-align:left] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [border-top:6px_solid_#60a5fa] [display:flex] [flex-direction:column]"}>
                            <div className={"modulo-header [display:flex] [align-items:center] [gap:15px] [margin-bottom:20px]"}>
                                <div className={"icono-wrap [width:60px] [height:60px] [background:#eff6ff] [display:flex] [align-items:center] [justify-content:center] [border-radius:15px] [font-size:1.6rem] [color:#2563eb]"}>
                                    <i className="bi bi-people-fill"></i>
                                </div>
                                <h3>Estudiantes y Acudientes</h3>
                            </div>
                            <div className="modulo-body">
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Autogestión total desde cualquier lugar para facilitar el acceso a la educación.</p>
                                {/* Lista de funcionalidades */}
                                <ul className={"lista-cheque [list-style:none] [padding:0] [margin:0]"}>
                                    <li className={"[.lista-cheque_&]:[display:flex] [.lista-cheque_&]:[align-items:center] [.lista-cheque_&]:[gap:10px] [.lista-cheque_&]:[margin-bottom:12px] [.lista-cheque_&]:[color:#475569]"}><i className={"bi bi-check-circle-fill [color:#22c55e] [font-size:1.1rem]"}></i> Pre-registro y Matrícula 24/7</li>
                                    <li className={"[.lista-cheque_&]:[display:flex] [.lista-cheque_&]:[align-items:center] [.lista-cheque_&]:[gap:10px] [.lista-cheque_&]:[margin-bottom:12px] [.lista-cheque_&]:[color:#475569]"}><i className={"bi bi-check-circle-fill [color:#22c55e] [font-size:1.1rem]"}></i> Carga digital de documentos</li>
                                    <li className={"[.lista-cheque_&]:[display:flex] [.lista-cheque_&]:[align-items:center] [.lista-cheque_&]:[gap:10px] [.lista-cheque_&]:[margin-bottom:12px] [.lista-cheque_&]:[color:#475569]"}><i className={"bi bi-check-circle-fill [color:#22c55e] [font-size:1.1rem]"}></i> Notificaciones de estado en tiempo real</li>
                                </ul>
                            </div>
                        </div>
                        {/* Módulo administrativo */}
                        <div className={"modulo-item destacado [background:#ffffff] [border-radius:24px] [padding:40px] [text-align:left] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [border-top:6px_solid_#60a5fa] [display:flex] [flex-direction:column] [border-top:6px_solid_#2563eb]"}>
                            <div className={"modulo-header [display:flex] [align-items:center] [gap:15px] [margin-bottom:20px]"}>
                                <div className={"icono-wrap [width:60px] [height:60px] [background:#eff6ff] [display:flex] [align-items:center] [justify-content:center] [border-radius:15px] [font-size:1.6rem] [color:#2563eb]"}>
                                    <i className="bi bi-pc-display-horizontal"></i>
                                </div>
                                <h3>Gestión Administrativa</h3>
                            </div>
                            <div className="modulo-body">
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Herramientas avanzadas para el control total del proceso institucional.</p>
                                <ul className={"lista-cheque [list-style:none] [padding:0] [margin:0]"}>
                                    <li className={"[.lista-cheque_&]:[display:flex] [.lista-cheque_&]:[align-items:center] [.lista-cheque_&]:[gap:10px] [.lista-cheque_&]:[margin-bottom:12px] [.lista-cheque_&]:[color:#475569]"}><i className={"bi bi-check-circle-fill [color:#22c55e] [font-size:1.1rem]"}></i> Panel de control de cupos</li>
                                    <li className={"[.lista-cheque_&]:[display:flex] [.lista-cheque_&]:[align-items:center] [.lista-cheque_&]:[gap:10px] [.lista-cheque_&]:[margin-bottom:12px] [.lista-cheque_&]:[color:#475569]"}><i className={"bi bi-check-circle-fill [color:#22c55e] [font-size:1.1rem]"}></i> Validación automatizada de archivos</li>
                                    <li className={"[.lista-cheque_&]:[display:flex] [.lista-cheque_&]:[align-items:center] [.lista-cheque_&]:[gap:10px] [.lista-cheque_&]:[margin-bottom:12px] [.lista-cheque_&]:[color:#475569]"}><i className={"bi bi-check-circle-fill [color:#22c55e] [font-size:1.1rem]"}></i> Generación de informes y analíticas</li>
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
                        <h2 className={"[.cabecera-modulos_&]:[font-size:2.8rem] [.cabecera-modulos_&]:[color:#1e293b] [.cabecera-modulos_&]:[font-weight:700] [.cabecera-modulos_&]:[margin:15px_0]"}>Ruta de Gestión Educativa</h2>
                        <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Sigue estos pasos para completar tu proceso en tiempo récord.</p>
                    </div>

                    <div className={"timeline-container [position:relative] [width:100%] [max-width:900px] [margin:0_auto] [padding:20px_0] [&::before]:[content:''] [&::before]:[position:absolute] [&::before]:[left:50%] [&::before]:[width:3px] [&::before]:[height:calc(100%_-_60px)] [&::before]:[background:#2563eb] [&::before]:[transform:translateX(-50%)] [&::before]:[border-radius:2px] [&::before]:[top:50px] [&::before]:[z-index:1]"}>
                        <div className={"timeline-step [position:relative] [width:100%] [margin-bottom:70px] [display:flex] [justify-content:space-between] [align-items:center] [z-index:2] [&:nth-child(even)]:[flex-direction:row-reverse]"}>
                            <div className={"step-number [position:absolute] [left:50%] [transform:translate(-50%,_-50%)] [top:50%] [background:#2563eb] [color:#ffffff] [width:50px] [height:50px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-weight:700] [font-size:1.1rem] [z-index:10] [box-shadow:0_0_0_10px_#ffffff]"}>01</div>
                            <div className={"step-content [width:44%] [background:#ffffff] [border-radius:24px] [padding:35px_40px] [box-shadow:0_10px_35px_rgba(0,0,0,0.04)] [border:1px_solid_#e2e8f0] [text-align:left] [display:flex] [flex-direction:column] [gap:10px] [.timeline-step:nth-child(even)_&]:[text-align:right]"}>
                                <h4 className={"[.step-content_&]:[font-size:1.3rem] [.step-content_&]:[font-weight:700] [.step-content_&]:[color:#1e293b] [.step-content_&]:[margin:0]"}>Registro Digital</h4>
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Crea tu perfil único en la plataforma para centralizar tu información.</p>
                            </div>
                            <div className={"step-icon [width:44%] [display:flex] [justify-content:center] [font-size:3rem] [color:#2563eb] [opacity:0.1] [.timeline-step:nth-child(even)_&]:[justify-content:flex-start] [.timeline-step:nth-child(odd)_&]:[justify-content:flex-end]"}><i className="bi bi-person-plus"></i></div>
                        </div>

                        <div className={"timeline-step [position:relative] [width:100%] [margin-bottom:70px] [display:flex] [justify-content:space-between] [align-items:center] [z-index:2] [&:nth-child(even)]:[flex-direction:row-reverse]"}>
                            <div className={"step-number [position:absolute] [left:50%] [transform:translate(-50%,_-50%)] [top:50%] [background:#2563eb] [color:#ffffff] [width:50px] [height:50px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-weight:700] [font-size:1.1rem] [z-index:10] [box-shadow:0_0_0_10px_#ffffff]"}>02</div>
                            <div className={"step-content [width:44%] [background:#ffffff] [border-radius:24px] [padding:35px_40px] [box-shadow:0_10px_35px_rgba(0,0,0,0.04)] [border:1px_solid_#e2e8f0] [text-align:left] [display:flex] [flex-direction:column] [gap:10px] [.timeline-step:nth-child(even)_&]:[text-align:right]"}>
                                <h4 className={"[.step-content_&]:[font-size:1.3rem] [.step-content_&]:[font-weight:700] [.step-content_&]:[color:#1e293b] [.step-content_&]:[margin:0]"}>Selección Institucional</h4>
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Explora y elige la institución académica que mejor se adapte a tus metas.</p>
                            </div>
                            <div className={"step-icon [width:44%] [display:flex] [justify-content:center] [font-size:3rem] [color:#2563eb] [opacity:0.1] [.timeline-step:nth-child(even)_&]:[justify-content:flex-start] [.timeline-step:nth-child(odd)_&]:[justify-content:flex-end]"}><i className="bi bi-search"></i></div>
                        </div>

                        <div className={"timeline-step [position:relative] [width:100%] [margin-bottom:70px] [display:flex] [justify-content:space-between] [align-items:center] [z-index:2] [&:nth-child(even)]:[flex-direction:row-reverse]"}>
                            <div className={"step-number [position:absolute] [left:50%] [transform:translate(-50%,_-50%)] [top:50%] [background:#2563eb] [color:#ffffff] [width:50px] [height:50px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-weight:700] [font-size:1.1rem] [z-index:10] [box-shadow:0_0_0_10px_#ffffff]"}>03</div>
                            <div className={"step-content [width:44%] [background:#ffffff] [border-radius:24px] [padding:35px_40px] [box-shadow:0_10px_35px_rgba(0,0,0,0.04)] [border:1px_solid_#e2e8f0] [text-align:left] [display:flex] [flex-direction:column] [gap:10px] [.timeline-step:nth-child(even)_&]:[text-align:right]"}>
                                <h4 className={"[.step-content_&]:[font-size:1.3rem] [.step-content_&]:[font-weight:700] [.step-content_&]:[color:#1e293b] [.step-content_&]:[margin:0]"}>Carga de Documentación</h4>
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Digitaliza y sube tus archivos de forma segura. Adiós al papel.</p>
                            </div>
                            <div className={"step-icon [width:44%] [display:flex] [justify-content:center] [font-size:3rem] [color:#2563eb] [opacity:0.1] [.timeline-step:nth-child(even)_&]:[justify-content:flex-start] [.timeline-step:nth-child(odd)_&]:[justify-content:flex-end]"}><i className="bi bi-cloud-arrow-up"></i></div>
                        </div>

                        <div className={"timeline-step [position:relative] [width:100%] [margin-bottom:70px] [display:flex] [justify-content:space-between] [align-items:center] [z-index:2] [&:nth-child(even)]:[flex-direction:row-reverse]"}>
                            <div className={"step-number [position:absolute] [left:50%] [transform:translate(-50%,_-50%)] [top:50%] [background:#2563eb] [color:#ffffff] [width:50px] [height:50px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-weight:700] [font-size:1.1rem] [z-index:10] [box-shadow:0_0_0_10px_#ffffff]"}>04</div>
                            <div className={"step-content [width:44%] [background:#ffffff] [border-radius:24px] [padding:35px_40px] [box-shadow:0_10px_35px_rgba(0,0,0,0.04)] [border:1px_solid_#e2e8f0] [text-align:left] [display:flex] [flex-direction:column] [gap:10px] [.timeline-step:nth-child(even)_&]:[text-align:right]"}>
                                <h4 className={"[.step-content_&]:[font-size:1.3rem] [.step-content_&]:[font-weight:700] [.step-content_&]:[color:#1e293b] [.step-content_&]:[margin:0]"}>Validación y Respuesta</h4>
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Nuestro sistema y la institución validan tu información rápidamente.</p>
                            </div>
                            <div className={"step-icon [width:44%] [display:flex] [justify-content:center] [font-size:3rem] [color:#2563eb] [opacity:0.1] [.timeline-step:nth-child(even)_&]:[justify-content:flex-start] [.timeline-step:nth-child(odd)_&]:[justify-content:flex-end]"}><i className="bi bi-patch-check"></i></div>
                        </div>

                        <div className={"timeline-step [position:relative] [width:100%] [margin-bottom:70px] [display:flex] [justify-content:space-between] [align-items:center] [z-index:2] [&:nth-child(even)]:[flex-direction:row-reverse]"}>
                            <div className={"step-number [position:absolute] [left:50%] [transform:translate(-50%,_-50%)] [top:50%] [background:#2563eb] [color:#ffffff] [width:50px] [height:50px] [border-radius:50%] [display:flex] [align-items:center] [justify-content:center] [font-weight:700] [font-size:1.1rem] [z-index:10] [box-shadow:0_0_0_10px_#ffffff]"}>05</div>
                            <div className={"step-content [width:44%] [background:#ffffff] [border-radius:24px] [padding:35px_40px] [box-shadow:0_10px_35px_rgba(0,0,0,0.04)] [border:1px_solid_#e2e8f0] [text-align:left] [display:flex] [flex-direction:column] [gap:10px] [.timeline-step:nth-child(even)_&]:[text-align:right]"}>
                                <h4 className={"[.step-content_&]:[font-size:1.3rem] [.step-content_&]:[font-weight:700] [.step-content_&]:[color:#1e293b] [.step-content_&]:[margin:0]"}>Control de Estado</h4>
                                <p className={"[.step-content_&]:[font-size:0.95rem] [.step-content_&]:[color:#64748b] [.step-content_&]:[line-height:1.6] [.step-content_&]:[margin:0]"}>Monitorea tu avance y descarga tu comprobante de matrícula oficial.</p>
                            </div>
                            <div className={"step-icon [width:44%] [display:flex] [justify-content:center] [font-size:3rem] [color:#2563eb] [opacity:0.1] [.timeline-step:nth-child(even)_&]:[justify-content:flex-start] [.timeline-step:nth-child(odd)_&]:[justify-content:flex-end]"}><i className="bi bi-bar-chart-steps"></i></div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Servicios
