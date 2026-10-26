//import React from 'react'


import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import usuario from '../../assets/Usuario.jpg'

function PerfilUsuario() {
    const navigate = useNavigate();

const irEditarperfil = () => {
    navigate("/EditarPerfil");
}
    return (
        <div className={"cuerpo-dashboard [background-color:var(--gris-fondo)] [margin:auto] [display:flex] [font-family:'Segoe_UI',_sans-serif]"}>
             {/* Menú lateral de navegación */}


            <div className={"contenido-principal1 [margin-left:260px] [width:calc(100%_-_260px)] [padding:40px]"}>
                <div className={"perfil-contenedor [max-width:1100px] [margin:auto]"}>

                    <header className={"perfil-header [background:var(--blanco)] [padding:30px] [border-radius:25px] [display:flex] [justify-content:space-between] [align-items:center] [box-shadow:var(--sombra)] [margin-bottom:30px]"}>
                        <div className={"perfil-info-basica [display:flex] [align-items:center] [gap:25px]"}>
                            <div className={"avatar-zona [position:relative]"}>
                                <img src={usuario} alt="Foto de Perfil" className={"avatar-img [width:100px] [height:100px] [border-radius:50%] [object-fit:cover] [border:3px_solid_var(--cyan-em)]"} />
                                <button className={"btn-cambiar-foto [position:absolute] [bottom:0] [right:0] [background:var(--azul-navy)] [color:white] [border:none] [width:35px] [height:35px] [border-radius:50%] [cursor:pointer]"}><i className={"bi bi-camera [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i></button>
                            </div>
                            {/* Información básica */}
                            <div className="texto-usuario">
                                <h1 className={"[.texto-usuario_&]:[margin:0] [.texto-usuario_&]:[font-size:1.8rem] [.texto-usuario_&]:[color:var(--azul-navy)]"}>Juan Andres Estrada Erazo</h1>
                                <span className={"etiqueta-rol [color:var(--cyan-em)] [font-weight:700] [font-size:0.9rem]"}>Aspirante - Ciclo Lectivo 2026</span>
                                <p><i className={"bi bi-geo-alt [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i> Popayán, Colombia</p>
                            </div>
                        </div>
                       <button className={"boton-accion-principal [background:var(--cyan-em)] [color:white] [border:none] [padding:12px_25px] [border-radius:12px] [font-weight:600] [cursor:pointer] [transition:0.3s] [&:hover]:[background:var(--azul-navy)]"} onClick={irEditarperfil}>
                            <i className={"bi bi-pencil-square [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i> Actualizar Datos
                        </button>
                    </header>

                    <div className={"perfil-grid-contenido [display:grid] [grid-template-columns:2fr_1fr] [gap:30px]"}>
                        <section className="seccion-datos">
                            <div className={"tarjeta-blanca [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                 {/* Información personal */}
                                <h3 className={"[.tarjeta-blanca_&]:[margin-top:0] [.tarjeta-blanca_&]:[font-size:1.1rem] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:10px] [.tarjeta-blanca_&]:[color:var(--azul-navy)]"}><i className={"bi bi-person-lines-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i> Información Personal</h3>

                                <div className={"los-datos-grid [display:grid] [grid-template-columns:1fr_1fr] [gap:20px]"}>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Primer Nombre</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Juan</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Segundo Nombre</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Andres</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Primer Apellido</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Estrada</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Segundo Apellido</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Erazo</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Tipo de Documento</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>C.C.</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Número de Identificación</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>10058191</div>
                                    </div>
                                    <div className="dato-item">
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Teléfono Movil</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>310 123 4567</div>
                                    </div>
                                    <div className={"dato-item-ancho [grid-column:span_2]"}>
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Correo Institucional</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>juanestrada@soysena.edu.co</div>
                                    </div>
                                    <div className={"dato-item-ancho [grid-column:span_2]"}>
                                        <label className={"[.dato-item_&]:[display:block] [.dato-item_&]:[font-size:0.8rem] [.dato-item_&]:[color:var(--gris-texto)] [.dato-item_&]:[margin-bottom:5px]"}>Institución Educativa de Interés</label>
                                        <div className={"caja-dato [background:var(--gris-fondo)] [padding:12px] [border-radius:10px] [font-weight:600] [color:var(--azul-navy)]"}>Institución Educación San Vicente</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="columna-lateral">
                            {/* Estado de matrícula */}
                            <div className={"tarjeta-blanca [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca_&]:[margin-top:0] [.tarjeta-blanca_&]:[font-size:1.1rem] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:10px] [.tarjeta-blanca_&]:[color:var(--azul-navy)]"}><i className={"bi bi-activity [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i> Estado de Matrícula</h3>
                                {/* Mensaje informativo */}
                                <div className={"indicador-progreso [margin:20px_0]"}>
                                    <div className={"barra-externa [background:var(--gris-fondo)] [height:10px] [border-radius:10px] [margin-bottom:8px]"}>
                                        <div className={"barra-interna [background:linear-gradient(to_right,_var(--cyan-em),_var(--cyan-glow))] [height:100%] [border-radius:10px]"} style={{ width: "85%" }}></div>
                                    </div>
                                    <span>85% Completado</span>
                                </div>
                                <p className="nota-ayuda">Tu proceso está en revisión por la secretaría académica.</p>
                            </div>

                            <div className={"tarjeta-blanca [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca_&]:[margin-top:0] [.tarjeta-blanca_&]:[font-size:1.1rem] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:10px] [.tarjeta-blanca_&]:[color:var(--azul-navy)]"}><i className={"bi bi-shield-check [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i> Seguridad</h3>
                                <p>Protege tu información personal.</p>
                                <br />
                                <button className={"btn-seguridad [width:100%] [background:var(--gris-fondo)] [color:var(--azul-navy)] [border:1px_solid_var(--borde)] [padding:10px] [border-radius:10px] [cursor:pointer] [font-weight:600]"}><Link className={"[.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)] [.menu-lista_li_&]:[color:white] [.menu-lista_li_&]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&]:[border-left:4px_solid_var(--cyan-em)]"} to="/ReperaContra">Cambiar contraseña</Link></button>
                            </div>

                            <div className={"tarjeta-blanca [background:var(--blanco)] [padding:25px] [border-radius:20px] [box-shadow:var(--sombra)] [margin-bottom:20px]"}>
                                <h3 className={"[.tarjeta-blanca_&]:[margin-top:0] [.tarjeta-blanca_&]:[font-size:1.1rem] [.tarjeta-blanca_&]:[display:flex] [.tarjeta-blanca_&]:[align-items:center] [.tarjeta-blanca_&]:[gap:10px] [.tarjeta-blanca_&]:[color:var(--azul-navy)]"}><i className={"bi bi-gear [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i> Preferencias</h3>
                                <div className={"control-switch [display:flex] [justify-content:space-between] [align-items:center] [margin-top:15px] [font-size:0.9rem]"}>
                                    <span>Notificaciones por Correo</span>
                                    <i className={"bi bi-toggle-on [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i>
                                </div>
                                <div className={"control-switch [display:flex] [justify-content:space-between] [align-items:center] [margin-top:15px] [font-size:0.9rem]"}>
                                    <span>Modo Accesibilidad</span>
                                    <i className={"bi bi-toggle-off [.menu-lista_li_a_&]:[font-size:1.2rem] [.tarjeta-blanca_h3_&]:[color:var(--cyan-em)] [.control-switch_&]:[font-size:1.5rem] [.control-switch_&]:[color:var(--cyan-em)] [.control-switch_&]:[cursor:pointer]"}></i>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PerfilUsuario
