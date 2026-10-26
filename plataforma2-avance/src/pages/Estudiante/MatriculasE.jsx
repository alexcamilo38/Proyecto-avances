//import React from 'react'




const MatriculasE = () => {
    return (
        <div className="dashboard-container4">
            {/* Menú lateral principal */}

            <div className={"contenido-principal4 [margin-left:260px] [width:calc(100%_-_260px)] [padding:40px] [min-height:100vh] [width:80vw]"}>
                <div className="header-matriculas4">
                    <h1 className={"[.header-matriculas4_&]:[color:#153051] [.header-matriculas4_&]:[margin-bottom:5px]"}>Seguimiento de Matrículas</h1>
                    <br />
                    <p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Monitorea el estado de tus inscripciones y descarga tus comprobantes oficiales.</p>
                </div>
                <br />

                <div className={"contenedor-historial [width:100%]"}>

                    <div className={"tarjeta-matricula4 [background:#ffffff] [border-radius:25px] [padding:30px] [box-shadow:0_10px_30px_rgba(0,_0,_0,_0.08)] [margin-bottom:30px] [border:1px_solid_#f1f5f9]"}>
                        <div className={"matricula-encabezado4 [display:flex] [justify-content:space-between] [align-items:center] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:20px] [margin-bottom:20px]"}>
                            {/* Información básica */}
                            <div className={"inst-info [display:flex] [align-items:center] [gap:15px]"}>
                                <div className={"icono-inst [width:50px] [height:50px] [background:#f8fafc] [border-radius:15px] [display:flex] [justify-content:center] [align-items:center] [font-size:1.5rem] [color:#4facfe]"}><i className={"bi bi-building [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i></div>
                                <div>
                                    <h2 className={"[.inst-info_&]:[font-size:1.3rem] [.inst-info_&]:[margin:0] [.inst-info_&]:[color:#153051]"}>I.E. San Vicente</h2>
                                    <span className={"id-proceso [font-size:0.8rem] [color:#94a3b8] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>ID Proceso: #EM-2026-882</span>
                                </div>
                            </div>
                            <div className={"estado-badge aprobado [padding:6px_15px] [border-radius:10px] [font-size:0.8rem] [font-weight:700] [background:#dcfce7] [color:#22c55e]"}>Aprobado</div>
                        </div>

                        <div className="matricula-cuerpo7">
                             {/* Módulos inscritos */}
                            <div className={"seccion-modulos7 [margin-bottom:25px]"}>
                                <h3 className={"[.seccion-modulos7_&]:[display:flex] [.seccion-modulos7_&]:[align-items:center] [.seccion-modulos7_&]:[gap:8px] [.seccion-modulos7_&]:[font-size:1.05rem] [.seccion-modulos7_&]:[color:#153051] [.seccion-modulos7_&]:[margin-bottom:15px] [.seccion-progreso_&]:[font-size:1rem] [.seccion-progreso_&]:[margin-bottom:20px]"}><i className={"bi bi-layers [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Módulos Inscritos:</h3>
                                <div className={"grid-modulos7 [display:flex] [flex-wrap:wrap] [gap:12px]"}>
                                    <span className={"modulos7-item [background:#f1f5f9] [padding:10px_18px] [border-radius:12px] [font-size:0.9rem] [color:#153051] [font-weight:600] [border:1px_solid_#e2e8f0] [transition:all_0.2s_ease] [&:hover]:[background:#e2e8f0] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>Ciencias Naturales</span>
                                    <span className={"modulos7-item [background:#f1f5f9] [padding:10px_18px] [border-radius:12px] [font-size:0.9rem] [color:#153051] [font-weight:600] [border:1px_solid_#e2e8f0] [transition:all_0.2s_ease] [&:hover]:[background:#e2e8f0] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>Matemáticas Avanzadas</span>
                                    <span className={"modulos7-item [background:#f1f5f9] [padding:10px_18px] [border-radius:12px] [font-size:0.9rem] [color:#153051] [font-weight:600] [border:1px_solid_#e2e8f0] [transition:all_0.2s_ease] [&:hover]:[background:#e2e8f0] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>Inglés Técnico</span>
                                    <span className={"modulos7-item [background:#f1f5f9] [padding:10px_18px] [border-radius:12px] [font-size:0.9rem] [color:#153051] [font-weight:600] [border:1px_solid_#e2e8f0] [transition:all_0.2s_ease] [&:hover]:[background:#e2e8f0] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>Lenguaje y Comunicación</span>
                                </div>
                            </div>
                            {/* Barra de progreso */}
                            <div className="seccion-progreso">
                                <h3 className={"[.seccion-modulos7_&]:[display:flex] [.seccion-modulos7_&]:[align-items:center] [.seccion-modulos7_&]:[gap:8px] [.seccion-modulos7_&]:[font-size:1.05rem] [.seccion-modulos7_&]:[color:#153051] [.seccion-modulos7_&]:[margin-bottom:15px] [.seccion-progreso_&]:[font-size:1rem] [.seccion-progreso_&]:[margin-bottom:20px]"}><i className={"bi bi-activity [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Estado del Proceso:</h3>
                                <div className={"linea-progreso [display:flex] [justify-content:space-between] [position:relative] [max-width:600px] [margin:0_auto_30px]"}>
                                    <div className={"paso completado [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>1</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Solicitud</p></div>
                                    <div className={"paso completado [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>2</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Documentación</p></div>
                                    <div className={"paso completado [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>3</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Revisión</p></div>
                                    <div className={"paso activo [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>4</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Finalizado</p></div>
                                </div>
                            </div>
                        </div>
                        {/* Botones de acciones */}
                        <div className={"matricula-acciones [display:flex] [justify-content:flex-end] [gap:15px] [border-top:1px_solid_#f1f5f9] [padding-top:20px]"}>
                            <button className={"btn-accion secundario [padding:12px_20px] [border-radius:12px] [border:none] [font-weight:700] [cursor:pointer] [transition:0.3s] [display:flex] [align-items:center] [gap:8px] [background:#f8fafc] [color:#153051]"}><i className={"bi bi-eye [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Detalles</button>
                            <button className={"btn-accion primario [padding:12px_20px] [border-radius:12px] [border:none] [font-weight:700] [cursor:pointer] [transition:0.3s] [display:flex] [align-items:center] [gap:8px] [background:#153051] [color:white] [&:hover]:[background:#4facfe] [&:hover]:[transform:translateY(-3px)]"}><i className={"bi bi-file-earmark-pdf [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Descargar Comprobante</button>
                        </div>
                    </div>

                    <div className={"tarjeta-matricula4 [background:#ffffff] [border-radius:25px] [padding:30px] [box-shadow:0_10px_30px_rgba(0,_0,_0,_0.08)] [margin-bottom:30px] [border:1px_solid_#f1f5f9]"}>
                        <div className={"matricula-encabezado4 [display:flex] [justify-content:space-between] [align-items:center] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:20px] [margin-bottom:20px]"}>
                              {/* Información básica */}
                            <div className={"inst-info [display:flex] [align-items:center] [gap:15px]"}>
                                <div className={"icono-inst [width:50px] [height:50px] [background:#f8fafc] [border-radius:15px] [display:flex] [justify-content:center] [align-items:center] [font-size:1.5rem] [color:#4facfe]"}><i className={"bi bi-building [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i></div>
                                <div>
                                    <h2 className={"[.inst-info_&]:[font-size:1.3rem] [.inst-info_&]:[margin:0] [.inst-info_&]:[color:#153051]"}>Colegio Mayor de Cauca</h2>
                                    <span className={"id-proceso [font-size:0.8rem] [color:#94a3b8] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>ID Proceso: #EM-2026-915</span>
                                </div>
                            </div>
                            <div className={"estado-badge pendiente [padding:6px_15px] [border-radius:10px] [font-size:0.8rem] [font-weight:700] [background:#fef3c7] [color:#f59e0b]"}>En Revisión</div>
                        </div>
                        {/* Información del estado */}
                        <div className="matricula-cuerpo">
                            <p className={"nota-espera [.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Tu documentación está siendo validada por la secretaría de la institución. Este proceso puede tardar hasta 48 horas.</p>
                        </div>
                        {/* Acciones disponibles */}
                        <div className={"matricula-acciones [display:flex] [justify-content:flex-end] [gap:15px] [border-top:1px_solid_#f1f5f9] [padding-top:20px]"}>
                            <button className={"btn-accion disabled [padding:12px_20px] [border-radius:12px] [border:none] [font-weight:700] [cursor:pointer] [transition:0.3s] [display:flex] [align-items:center] [gap:8px] [background:#f1f5f9] [color:#cbd5e1] [cursor:not-allowed]"} disabled><i className={"bi bi-file-earmark-lock [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Comprobante no disponible</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default MatriculasE
