//import React from 'react'
// Importación de React Router


// Importación de imágenes
import admin from '../../../assets/iconLE.png';

const PerfilAd = () => {
    return (
        <div>
            {/* Menú lateral de navegación */}

            <div className={"contenido-perfilad02 [margin-left:260px] [padding:40px] [width:80vw]"}>
                <div className={"perfil-contenedorad02 [max-width:1100px] [margin:0_auto]"}>

                    <header className={"perfil-headerad02 [background:var(--blanco)] [padding:30px] [border-radius:25px] [display:flex] [justify-content:space-between] [align-items:center] [box-shadow:var(--sombra)] [margin-bottom:30px]"}>
                        <div className={"perfil-info-basica-ad02 [display:flex] [align-items:center] [gap:25px]"}>
                            <div className={"avatar-zona-ad02 [position:relative]"}>
                                <img src={admin} alt="Foto de Perfil" className={"avatarad02-img [width:100px] [height:100px] [border-radius:50%] [object-fit:cover] [border:3px_solid_var(--cyan-em)]"} />
                                <button className={"btn-cambiar-foto [position:absolute] [bottom:0] [right:0] [background:var(--azul-navy)] [color:white] [border:none] [width:35px] [height:35px] [border-radius:50%] [cursor:pointer]"}><i className={"bi bi-camera [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i></button>
                            </div>
                            {/* Información básica */}
                            <div className="texto-usuario-ad02">
                                <h1 className={"[.texto-usuario-ad02_&]:[margin:0] [.texto-usuario-ad02_&]:[font-size:1.8rem] [.texto-usuario-ad02_&]:[color:var(--azul-navy)]"}>Gustavo Adolfo Mejía</h1>
                                <span className="badge-rol-admin">Rector Institucional</span>
                            </div>
                        </div>
                        <button className={"boton-accion-principal-ad02 [background:var(--cyan-em)] [color:white] [border:none] [padding:12px_25px] [border-radius:12px] [font-weight:600] [cursor:pointer] [transition:0.3s] [&:hover]:[background:var(--azul-navy)]"}><i className={"bi bi-pencil-square [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i> Editar Perfil</button>
                    </header>
                    <div className={"perfil-grid-contenido-ad02 [display:grid] [grid-template-columns:2fr_1fr] [gap:30px]"}>
                         {/* Sección de datos */}
                        <section className="seccion-datos">
                            <div className={"tarjeta-blanca-ad02 [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca-ad02_&]:[margin-top:0] [.tarjeta-blanca-ad02_&]:[font-size:1.1rem] [.tarjeta-blanca-ad02_&]:[display:flex] [.tarjeta-blanca-ad02_&]:[align-items:center] [.tarjeta-blanca-ad02_&]:[gap:10px] [.tarjeta-blanca-ad02_&]:[color:var(--azul-navy)]"}><i className={"bi bi-person-vcard [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i> Datos de Identificación</h3>
                                <br />
                                <div className={"los-datos-grid-ad02 [display:grid] [grid-template-columns:1fr_1fr] [gap:20px]"}>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Número de Cédula</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>10058191</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Cargo Oficial</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Rector Académico</div>
                                    </div>
                                    <div className={"dato-item-ancho [grid-column:span_2]"}>
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Correo Institucional</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>gustavo.mejia@easymatric.edu.co</div>
                                    </div>
                                </div>
                            </div>

                            <div className={"tarjeta-blanca-ad02 [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca-ad02_&]:[margin-top:0] [.tarjeta-blanca-ad02_&]:[font-size:1.1rem] [.tarjeta-blanca-ad02_&]:[display:flex] [.tarjeta-blanca-ad02_&]:[align-items:center] [.tarjeta-blanca-ad02_&]:[gap:10px] [.tarjeta-blanca-ad02_&]:[color:var(--azul-navy)]"}><i className={"bi bi-building-check [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i> Entidad Vinculada</h3>
                                <br />
                                <div className="los-datos-grid">
                                    <div className={"dato-item-ancho [grid-column:span_2]"}>
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Institución Educativa</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Institución Educación San Vicente</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>NIT Institucional</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>800.123.456-1</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Teléfono Oficina</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>602 823 4567</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Barra lateral */}
                        <aside className="columna-lateral">
                            {/* Estadísticas */}
                            <div className={"tarjeta-blanca-ad02 estadisticas-admin [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca-ad02_&]:[margin-top:0] [.tarjeta-blanca-ad02_&]:[font-size:1.1rem] [.tarjeta-blanca-ad02_&]:[display:flex] [.tarjeta-blanca-ad02_&]:[align-items:center] [.tarjeta-blanca-ad02_&]:[gap:10px] [.tarjeta-blanca-ad02_&]:[color:var(--azul-navy)]"}><i className={"bi bi-graph-up [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i> Mi Actividad</h3>
                                <br />
                                <div className="mini-stat">
                                    <span>Matrículas revisadas</span>
                                    <strong>124</strong>
                                </div>
                                <div className="mini-stat">
                                    <span>Sedes a cargo</span>
                                    <strong>02</strong>
                                </div>
                            </div>

                            <div className={"tarjeta-blanca-ad02 [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca-ad02_&]:[margin-top:0] [.tarjeta-blanca-ad02_&]:[font-size:1.1rem] [.tarjeta-blanca-ad02_&]:[display:flex] [.tarjeta-blanca-ad02_&]:[align-items:center] [.tarjeta-blanca-ad02_&]:[gap:10px] [.tarjeta-blanca-ad02_&]:[color:var(--azul-navy)]"}><i className={"bi bi-shield-check [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i> Seguridad</h3>
                                <br />
                                <p>Control de acceso y credenciales.</p>
                                <br />
                                <button className={"btn-seguridad [width:100%] [background:var(--gris-fondo)] [color:var(--azul-navy)] [border:1px_solid_var(--borde)] [padding:10px] [border-radius:10px] [cursor:pointer] [font-weight:600]"}><a href="ReperaContra.html">Cambiar mi clave</a></button>
                            </div>

                            <div className={"tarjeta-blanca-ad02 [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca-ad02_&]:[margin-top:0] [.tarjeta-blanca-ad02_&]:[font-size:1.1rem] [.tarjeta-blanca-ad02_&]:[display:flex] [.tarjeta-blanca-ad02_&]:[align-items:center] [.tarjeta-blanca-ad02_&]:[gap:10px] [.tarjeta-blanca-ad02_&]:[color:var(--azul-navy)]"}><i className={"bi bi-gear [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i> Sistema</h3>
                                <div className={"control-switch-ad02 [display:flex] [justify-content:space-between] [align-items:center] [margin-top:15px] [font-size:0.9rem]"}>
                                    <span>Alertas de Cupos</span>
                                    <i className={"bi bi-toggle-on [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i>
                                </div>
                                <div className={"control-switch-ad02 [display:flex] [justify-content:space-between] [align-items:center] [margin-top:15px] [font-size:0.9rem]"}>
                                    <span>Modo Reporte Semanal</span>
                                    <i className={"bi bi-toggle-off [.tarjeta-blanca-ad02_h3_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[font-size:1.5rem] [.control-switch-ad02_&]:[color:var(--cyan-em)] [.control-switch-ad02_&]:[cursor:pointer]"}></i>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PerfilAd
