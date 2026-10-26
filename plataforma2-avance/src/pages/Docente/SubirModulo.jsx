//import React from 'react'



const SubirModulo = () => {
  return (
    <div>
         {/* Menú lateral de navegación */}

        <div className={"contenido-principal-docente02 [margin-left:260px] [width:calc(100%_-_260px)] [min-height:100vh] [background:#eef1f5] [padding:25px]"}>
        <div className={"perfil-contenedor-docente02 [width:100%]"}>

            <header className={"perfil-header-docente02 [background:#fff] [border-radius:20px] [padding:25px_30px] [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:25px]"} >
                <div className="perfil-info-basica-docente02">
                    <div className="texto-usuario-docente02">
                        <h1 className={"[.perfil-header-docente02_&]:[font-size:35px] [.perfil-header-docente02_&]:[font-weight:700] [.perfil-header-docente02_&]:[color:#0d1b3d] [.perfil-header-docente02_&]:[display:flex] [.perfil-header-docente02_&]:[align-items:center] [.perfil-header-docente02_&]:[gap:12px]"}>
                            <i className={"bi bi-cloud-arrow-up-fill [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"} ></i>
                            Configuración y Carga de Módulos
                        </h1>
                        <span className={"etiqueta-rol-docente02 [color:#4da3ff] [font-size:15px] [font-weight:600]"}>Oferta Académica e Inscripciones</span>
                    </div>
                </div>
                <button type="submit" form="form-subir-modulo" className={"boton-accion-principal-docente02 [background:#4da3ff] [border:none] [color:white] [padding:12px_22px] [border-radius:12px] [font-size:15px] [font-weight:600] [cursor:pointer] [transition:0.3s] [&:hover]:[background:#318cff]"}>
                    <i className={"bi bi-plus-circle [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"}></i> Publicar Módulo
                </button>
            </header>

            <div className={"perfil-grid-contenido-docente02 [display:grid] [grid-template-columns:2fr_1fr] [gap:25px]"}>

                <section className="seccion-datos-docente02">
                    <div className={"tarjeta-blanca-docentes02 [background:#fff] [border-radius:20px] [padding:25px]"}>
                        <h3 className={"[.tarjeta-blanca-docentes02_&]:[font-size:22px] [.tarjeta-blanca-docentes02_&]:[color:#0d1b3d] [.tarjeta-blanca-docentes02_&]:[margin-bottom:25px] [.tarjeta-blanca-docentes02_&]:[display:flex] [.tarjeta-blanca-docentes02_&]:[align-items:center] [.tarjeta-blanca-docentes02_&]:[gap:10px]"}><i className={"bi bi-sliders [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"}></i> Parámetros de la Asignatura</h3>

                        <form id="form-subir-modulo" action="#" method="POST" encType="multipart/form-data" >
                            <div className={"los-datos-grid-docente02 [display:grid] [grid-template-columns:repeat(2,1fr)] [gap:20px]"}>

                                <div className={"dato-item-ancho-docente02 [display:flex] [flex-direction:column] [grid-column:span_2]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="nombreModulo">Nombre del Módulo / Asignatura</label>
                                    <input className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none]"} id="nombreModulo" type="text" placeholder="Ej. Lengua Castellana y Comprensión Crítica" required />
                                </div>

                                <div className={"dato-item-docente02 [display:flex] [flex-direction:column]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="gradoDestino">Grado / Curso Destino</label>
                                    <select className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none]"} id="gradoDestino" defaultValue="" required>
                                        <option value="">Seleccione un grado...</option>
                                        <option value="9a">Grado 9° A</option>
                                        <option value="9b">Grado 9° B</option>
                                        <option value="10a">Grado 10° A</option>
                                        <option value="10b">Grado 10° B</option>
                                        <option value="11a">Grado 11° A</option>
                                    </select>
                                </div>

                                <div className={"dato-item-docente02 [display:flex] [flex-direction:column]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="cupos">Límite de Cupos Disponibles</label>
                                    <input className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none]"} id="cupos" type="number" min="1" max="50" placeholder="Ej. 35" required />
                                </div>

                                <div className={"dato-item-docente02 [display:flex] [flex-direction:column]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="horas">Horas Semanales (Intensidad)</label>
                                    <input className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none]"} id="horas" type="number" min="1" max="10" placeholder="Ej. 4" required />
                                </div>

                                <div className={"dato-item-docente02 [display:flex] [flex-direction:column]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="periodo">Periodo Escolar</label>
                                    <select className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none]"} id="periodo" defaultValue="p1" required>
                                        <option value="p1">Primer Periodo (Vigente)</option>
                                        <option value="p2">Segundo Periodo</option>
                                        <option value="p3">Tercer Periodo</option>
                                    </select>
                                </div>

                                <div className={"dato-item-docente02 [display:flex] [flex-direction:column]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="fechaApertura">Fecha Apertura de Inscripción</label>
                                    <input className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none]"} id="fechaApertura" type="date" required />
                                </div>

                                <div className={"dato-item-docente02 [display:flex] [flex-direction:column]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="fechaCierre">Fecha Límite / Cierre</label>
                                    <input className={"[.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none]"} id="fechaCierre" type="date" required />
                                </div>

                                <div className={"dato-item-ancho-docente02 [display:flex] [flex-direction:column] [grid-column:span_2]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="descripcion">Descripción del Módulo y Competencias</label>
                                    <textarea className={"[.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[resize:none] [.dato-item-ancho-docente02_&]:[min-height:130px]"} id="descripcion" rows="4" placeholder="Escriba los objetivos principales y temas clave que se abordarán en este módulo..." required></textarea>
                                </div>

                                <div className={"dato-item-ancho-docente02 [display:flex] [flex-direction:column] [grid-column:span_2]"}>
                                    <label className={"[.dato-item-docente02_&]:[margin-bottom:8px] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[font-weight:600] [.dato-item-docente02_&]:[color:#23304d] [.dato-item-ancho-docente02_&]:[margin-bottom:8px] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[font-weight:600] [.dato-item-ancho-docente02_&]:[color:#23304d]"} htmlFor="documento">Documento Técnico del Módulo (Syllabus / Guía Curricular)</label>
                                    <div className={"zona-carga-archivo-docente02 [border:2px_dashed_#56b4ff] [border-radius:16px] [padding:50px_20px] [text-align:center] [background:#f8fbff] [position:relative] [cursor:pointer]"}>
                                        <i className={"bi bi-file-earmark-pdf [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"}></i>
                                        <p className={"[.zona-carga-archivo-docente02_&]:[color:#0d1b3d] [.zona-carga-archivo-docente02_&]:[font-size:16px]"}>Arrastra el archivo del Módulo aquí o haz clic para examinar</p>
                                        <p className={"texto-secundario-docente02 [.zona-carga-archivo-docente02_&]:[color:#0d1b3d] [.zona-carga-archivo-docente02_&]:[font-size:16px] [color:#7c879b] [margin-top:8px] [font-size:13px]"}>Formatos admitidos: PDF, DOCX (Máx. 10MB)</p>
                                        <input id="documento" type="file" className={"input-file-oculto-docente02 [.dato-item-docente02_&]:[width:100%] [.dato-item-docente02_&]:[padding:14px] [.dato-item-docente02_&]:[border-radius:12px] [.dato-item-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-docente02_&]:[background:#f5f7fa] [.dato-item-docente02_&]:[font-size:14px] [.dato-item-docente02_&]:[outline:none] [.dato-item-ancho-docente02_&]:[width:100%] [.dato-item-ancho-docente02_&]:[padding:14px] [.dato-item-ancho-docente02_&]:[border-radius:12px] [.dato-item-ancho-docente02_&]:[border:1px_solid_#d7dce4] [.dato-item-ancho-docente02_&]:[background:#f5f7fa] [.dato-item-ancho-docente02_&]:[font-size:14px] [.dato-item-ancho-docente02_&]:[outline:none] [opacity:0] [position:absolute] [width:100%] [height:100%] [inset:0] [cursor:pointer]"} required />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </section>

                <aside className={"columna-lateral-docente02 [display:flex] [flex-direction:column] [gap:25px]"}>

                    <div className={"tarjeta-blanca-docentes02 [background:#fff] [border-radius:20px] [padding:25px]"}>
                        <h3 className={"[.tarjeta-blanca-docentes02_&]:[font-size:22px] [.tarjeta-blanca-docentes02_&]:[color:#0d1b3d] [.tarjeta-blanca-docentes02_&]:[margin-bottom:25px] [.tarjeta-blanca-docentes02_&]:[display:flex] [.tarjeta-blanca-docentes02_&]:[align-items:center] [.tarjeta-blanca-docentes02_&]:[gap:10px]"}><i className={"bi bi-info-circle [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"}></i> Estado de Oferta</h3>
                        <p className={"nota-ayuda-docente02 [.zona-carga-archivo-docente02_&]:[color:#0d1b3d] [.zona-carga-archivo-docente02_&]:[font-size:16px] [color:#44506b] [line-height:1.6] [margin-bottom:25px]"} >
                            Los módulos publicados quedan inmediatamente visibles para el proceso de selección de asignaturas por parte del alumnado.
                        </p>
                        <div className={"control-switch-docente02 [display:flex] [justify-content:space-between] [align-items:center] [border-top:1px_solid_#e5e8ee] [padding-top:20px]"} >
                            <span>Permitir auto-inscripción</span>
                            <i className={"bi bi-toggle-on [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"}></i>
                        </div>
                    </div>

                    <div className={"tarjeta-blanca-docentes02 [background:#fff] [border-radius:20px] [padding:25px]"}>
                        <h3 className={"[.tarjeta-blanca-docentes02_&]:[font-size:22px] [.tarjeta-blanca-docentes02_&]:[color:#0d1b3d] [.tarjeta-blanca-docentes02_&]:[margin-bottom:25px] [.tarjeta-blanca-docentes02_&]:[display:flex] [.tarjeta-blanca-docentes02_&]:[align-items:center] [.tarjeta-blanca-docentes02_&]:[gap:10px]"}><i className={"bi bi-lightbulb [.perfil-header-docente02_h1_&]:[color:#4da3ff] [.tarjeta-blanca-docentes02_h3_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[font-size:55px] [.zona-carga-archivo-docente02_&]:[color:#4da3ff] [.zona-carga-archivo-docente02_&]:[margin-bottom:15px] [.control-switch-docente02_&]:[font-size:35px] [.control-switch-docente02_&]:[color:#4da3ff]"}></i> Consejos Útiles</h3>
                        <ul className={"[.tarjeta-blanca-docentes02_&]:[padding-left:18px]"}>
                            <li className={"[.tarjeta-blanca-docentes02_&]:[margin-bottom:15px] [.tarjeta-blanca-docentes02_&]:[color:#44506b] [.tarjeta-blanca-docentes02_&]:[line-height:1.6]"}>Establece el <strong>límite de cupos</strong> basado en la capacidad física del aula asignada por la institución.</li>
                            <li className={"[.tarjeta-blanca-docentes02_&]:[margin-bottom:15px] [.tarjeta-blanca-docentes02_&]:[color:#44506b] [.tarjeta-blanca-docentes02_&]:[line-height:1.6]"}>Verifica con precisión las <strong>fechas límites</strong> para evitar problemas con el calendario de cierres del sistema central.</li>
                        </ul>
                    </div>

                </aside>
            </div>
        </div>
    </div>

    </div>
  )
}

export default SubirModulo
