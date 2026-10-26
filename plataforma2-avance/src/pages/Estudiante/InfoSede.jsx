//import React from 'react'
import { Link } from "react-router-dom"



const InfoSede = () => {
    return (
        <div >
            {/* Menú lateral principal */}

            <div className={"contenido-principal3 [margin-left:260px] [padding:40px]"}>
                <header className={"bienvenida-sede [height:250px] [background:#1a1c2d_url('imagenes/fondo-sede.jpg')] [background-size:cover] [background-position:center] [border-radius:20px] [display:flex] [align-items:flex-end] [padding:30px] [margin-bottom:30px] [color:white]"}>
                    <div className="overlay-texto">
                        <h1>Institución Educativa Técnica Industrial</h1>
                        <p><i className={"bi bi-geo-alt [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Popayán, Cauca — Sede Central</p>
                    </div>
                </header>

                <div className={"grid-informacion-limpia [display:grid] [grid-template-columns:1fr_340px] [gap:30px]"}>

                <div className="bloque-lectura">
                        {/* Información general de la sede */}
                        <section className={"tarjeta-blanca [background-color:#ffffff] [border:1px_solid_#e2e8f0] [border-radius:12px] [padding:24px] [box-shadow:0_4px_6px_rgba(0,_0,_0,_0.05)] [background:white] [padding:25px] [border-radius:20px] [box-shadow:0_10px_25px_rgba(0,0,0,0.03)] [margin-bottom:25px]"}>
                            <h2 className={"[.tarjeta-blanca_&]:[color:#1e3a8a] [.tarjeta-blanca_&]:[font-size:1.25rem] [.tarjeta-blanca_&]:[font-weight:600] [.tarjeta-blanca_&]:[margin-bottom:16px] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:8px] [.tarjeta-blanca_&]:[font-size:1.2rem] [.tarjeta-blanca_&]:[color:#1a1c2d] [.tarjeta-blanca_&]:[margin-bottom:15px] [.tarjeta-blanca_&]:[gap:10px]"}><i className={"bi bi-info-circle-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Acerca de nuestra Sede</h2>
                            <p>Nuestra institución se destaca por ofrecer un ambiente educativo moderno, enfocado en el desarrollo integral y técnico de los estudiantes en la región. Contamos con instalaciones adecuadas para el aprendizaje práctico y teórico, asegurando una formación de alta calidad.</p>
                            <div className={"mini-grid-servicios [display:flex] [flex-wrap:wrap] [gap:10px] [margin-top:20px]"}>
                            <div className={"servicio-tag [background:#f1f5f9] [padding:8px_15px] [border-radius:50px] [font-size:0.85rem] [color:#475569] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-wifi [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Zona WiFi</div>
                            <div className={"servicio-tag [background:#f1f5f9] [padding:8px_15px] [border-radius:50px] [font-size:0.85rem] [color:#475569] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-bus-front [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Transporte</div>
                            <div className={"servicio-tag [background:#f1f5f9] [padding:8px_15px] [border-radius:50px] [font-size:0.85rem] [color:#475569] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-book [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Biblioteca</div>
                            <div className={"servicio-tag [background:#f1f5f9] [padding:8px_15px] [border-radius:50px] [font-size:0.85rem] [color:#475569] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-cup-hot [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Comedor</div>
                            </div>
                        </section>
                        <section className={"tarjeta-blanca [background-color:#ffffff] [border:1px_solid_#e2e8f0] [border-radius:12px] [padding:24px] [box-shadow:0_4px_6px_rgba(0,_0,_0,_0.05)] [background:white] [padding:25px] [border-radius:20px] [box-shadow:0_10px_25px_rgba(0,0,0,0.03)] [margin-bottom:25px]"}>
                            <h2 className={"[.tarjeta-blanca_&]:[color:#1e3a8a] [.tarjeta-blanca_&]:[font-size:1.25rem] [.tarjeta-blanca_&]:[font-weight:600] [.tarjeta-blanca_&]:[margin-bottom:16px] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:8px] [.tarjeta-blanca_&]:[font-size:1.2rem] [.tarjeta-blanca_&]:[color:#1a1c2d] [.tarjeta-blanca_&]:[margin-bottom:15px] [.tarjeta-blanca_&]:[gap:10px]"}><i className={"bi bi-geo-alt-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Ubicación de la Sede</h2>
                            <div className={"mapa-contenedor [width:100%] [height:280px] [border-radius:10px] [overflow:hidden] [border:2px_solid_#3b82f6] [box-shadow:0_8px_20px_rgba(59,_130,_246,_0.3)] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-3px)] [&:hover]:[box-shadow:0_12px_28px_rgba(29,_78,_216,_0.45)]"}>
                            <iframe
                                title="Ubicación de la Sede"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.113009581831!2d-76.6085121!3d2.4419213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMjYnMzAuOSJOIDc2wrAzNicyNC42Ilc!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                                className={"mapa-iframe [width:100%] [height:100%] [border:0]"}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            </div>
                        </section>
                        {/* Documentos importantes de la institución */}
                        <section className={"tarjeta-blanca [background-color:#ffffff] [border:1px_solid_#e2e8f0] [border-radius:12px] [padding:24px] [box-shadow:0_4px_6px_rgba(0,_0,_0,_0.05)] [background:white] [padding:25px] [border-radius:20px] [box-shadow:0_10px_25px_rgba(0,0,0,0.03)] [margin-bottom:25px]"}>
                            <h2 className={"[.tarjeta-blanca_&]:[color:#1e3a8a] [.tarjeta-blanca_&]:[font-size:1.25rem] [.tarjeta-blanca_&]:[font-weight:600] [.tarjeta-blanca_&]:[margin-bottom:16px] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:8px] [.tarjeta-blanca_&]:[font-size:1.2rem] [.tarjeta-blanca_&]:[color:#1a1c2d] [.tarjeta-blanca_&]:[margin-bottom:15px] [.tarjeta-blanca_&]:[gap:10px]"}><i className={"bi bi-file-earmark-text-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Documentos Institucionales</h2>
                            <div className="lista-descargas">
                            <div className={"archivo-item [display:flex] [align-items:center] [padding:15px] [background:#f8fafc] [border-radius:15px] [margin-top:10px] [gap:15px]"}>
                                <span className={"icono-pdf [color:#ef4444] [font-size:1.8rem]"}><i className={"bi bi-filetype-pdf [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i></span>
                                <div className="archivo-info">
                                <strong className={"[.archivo-info_&]:[display:block] [.archivo-info_&]:[font-size:0.95rem]"}>Manual de Convivencia</strong>
                                <small className={"[.archivo-info_&]:[color:#64748b] [.archivo-info_&]:[font-size:0.8rem]"}>Versión 2026 actualizada</small>
                                </div>
                                <button className="btn-circular-ver"><i className={"bi bi-eye [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i></button>
                            </div>
                            <div className={"archivo-item [display:flex] [align-items:center] [padding:15px] [background:#f8fafc] [border-radius:15px] [margin-top:10px] [gap:15px]"}>
                                <span className={"icono-pdf [color:#ef4444] [font-size:1.8rem]"}><i className={"bi bi-filetype-pdf [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i></span>
                                <div className="archivo-info">
                                <strong className={"[.archivo-info_&]:[display:block] [.archivo-info_&]:[font-size:0.95rem]"}>Proyecto Educativo (PEI)</strong>
                                <small className={"[.archivo-info_&]:[color:#64748b] [.archivo-info_&]:[font-size:0.8rem]"}>Modelo de formación integral</small>
                                </div>
                                <button className="btn-circular-ver"><i className={"bi bi-eye [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i></button>
                            </div>
                            </div>
                        </section>
                    </div>

                    <aside className="bloque-lateral-accion">
                         {/* Tarjeta para iniciar matrícula */}
                        <div className={"tarjeta-accion-matricula [background:white] [padding:30px] [border-radius:25px] [border:1px_solid_#e2e8f0] [position:sticky] [top:30px]"}>
                            <h3>Inicia tu Proceso</h3>
                            <p>Asegura tu cupo de manera fácil y 100% digital a través de nuestra plataforma.</p>

                            <div className="requisitos-resumen">
                                <h4>Requisitos:</h4>
                                <ul className={"[.requisitos-resumen_&]:[list-style:none] [.requisitos-resumen_&]:[padding:0] [.requisitos-resumen_&]:[margin:15px_0]"}>
                                    <li className={"[.requisitos-resumen_&]:[font-size:0.85rem] [.requisitos-resumen_&]:[margin-bottom:8px] [.requisitos-resumen_&]:[color:#475569]"}><i className={"bi bi-check2 [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Identidad del estudiante</li>
                                    <li className={"[.requisitos-resumen_&]:[font-size:0.85rem] [.requisitos-resumen_&]:[margin-bottom:8px] [.requisitos-resumen_&]:[color:#475569]"}><i className={"bi bi-check2 [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Certificados de notas</li>
                                    <li className={"[.requisitos-resumen_&]:[font-size:0.85rem] [.requisitos-resumen_&]:[margin-bottom:8px] [.requisitos-resumen_&]:[color:#475569]"}><i className={"bi bi-check2 [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> Seguro estudiantil</li>
                                </ul>
                            </div>

                            <Link to="/Formulario" className={"btn-iniciar-matricula [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)] [display:flex] [justify-content:space-between] [align-items:center] [background:#1a1c2d] ![color:#4facfe] [text-decoration:none] [padding:18px_25px] [border-radius:15px] [font-weight:800] [font-size:0.9rem] [letter-spacing:1px] [transition:0.4s_ease] [margin-top:20px] [border:1px_solid_rgba(79,_172,_254,_0.3)] [&:hover]:[background:#4facfe] [&:hover]:![color:#1a1c2d] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(79,_172,_254,_0.4)]"}>
                                <span>INICIAR MATRÍCULA</span>
                                <i className={"bi bi-rocket-takeoff-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i>
                            </Link>

                            <div className={"pie-ayuda [color:#10b981]"}>
                                <Link className={"[.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)] [.menu-lista_li_&]:[color:white] [.menu-lista_li_&]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&]:[border-left:4px_solid_var(--cyan-em)]"} to="/Contacto"><i className={"bi bi-whatsapp [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h2_&]:[color:#2563eb] [.requisitos-resumen_&]:[color:#10b981]"}></i> ¿Necesitas soporte?</Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    )
}

export default InfoSede