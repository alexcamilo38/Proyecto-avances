//import React from 'react'

import { Link } from "react-router-dom"
/* Importación de imágenes de colegios */
import cole1 from '../../assets/cole1.jpg';
import cole2 from '../../assets/cole2.jpg';
import cole3 from '../../assets/cole3.jpg';
import cole4 from '../../assets/cole.4.jpg';
import cole5 from '../../assets/cole.5.jpg';
import cole6 from '../../assets/cole.6.jpg';


const Colegios = () => {
    return (
        <div >
            {/* Menú lateral de navegación */}

            <div className={"contenido-principal2 [margin-left:260px] [padding:20px_15px] [width:calc(100%_-_260px)]"}>
                  {/* Encabezado principal */}
                <div className={"header-seccion2 [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:40px] [gap:20px] [width:100%]"}>
                    <div className="texto-header2">
                        <h1 className={"[.texto-header2_&]:[color:var(--azul-navy)] [.texto-header2_&]:[margin:0] [.texto-header2_&]:[font-size:2rem]"}>Instituciones Disponibles</h1>
                        <p className={"[.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0]"}>Explora y selecciona la sede donde deseas realizar tu matrícula</p>
                    </div>
                    <div className={"busqueda-contenedor2 [background:var(--blanco)] [display:flex] [align-items:center] [padding:12px_20px] [border-radius:15px] [width:100%] [max-width:400px] [box-shadow:var(--sombra)] [border:1px_solid_#e2e8f0]"}>
                        <i className={"bi bi-search [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i>
                        <input className={"[.busqueda-contenedor2_&]:[border:none] [.busqueda-contenedor2_&]:[outline:none] [.busqueda-contenedor2_&]:[width:100%] [.busqueda-contenedor2_&]:[font-weight:500]"} type="text" placeholder="Buscar sede o municipio..." />
                    </div>
                </div>
                {/* Contenedor de tarjetas de colegios */}
                <div className={"grid-sedes [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:25px]"}>

                    <div className={"tarjeta-sede [background:var(--blanco)] [border-radius:25px] [overflow:hidden] [box-shadow:var(--sombra)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-10px)] [&:hover]:[box-shadow:0_20px_40px_rgba(79,_172,_254,_0.15)]"}>
                        <div className={"imagen-sede [position:relative] [height:180px]"}>
                            <img className={"[.imagen-sede_&]:[width:100%] [.imagen-sede_&]:[height:100%] [.imagen-sede_&]:[object-fit:cover]"} src={cole1} alt="Institución" />
                            <span className={"etiqueta-cupos [position:absolute] [top:15px] [right:15px] [background:rgba(34,_197,_94,_0.9)] [color:white] [padding:5px_12px] [border-radius:10px] [font-size:0.75rem] [font-weight:700]"}>Cupos Disponibles</span>
                        </div>
                        <div className={"info-sede [padding:20px]"}>
                            <h3 className={"[.info-sede_&]:[color:var(--azul-navy)] [.info-sede_&]:[margin:0_0_10px] [.info-sede_&]:[font-size:1.2rem]"}>I.E. San Vicente</h3>
                            <p className={"ubicacion [.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0] [font-size:0.85rem] [color:var(--gris-texto)] [margin-bottom:15px]"}><i className={"bi bi-geo-alt [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Popayán - Comuna 2</p>
                            <div className={"detalles-mini [display:flex] [justify-content:space-between] [font-size:0.8rem] [color:var(--azul-navy)] [font-weight:600] [margin-bottom:20px] [padding-top:10px] [border-top:1px_solid_#f1f5f9]"}>
                                <span><i className={"bi bi-mortarboard [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> 6° a 11°</span>
                                <span><i className={"bi bi-clock [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Jornada Mañana</span>
                            </div>
                            <Link to="/InfoSede" className={"btn-ver-mas [display:block] [text-align:center] [background:#f1f5f9] [color:var(--azul-navy)] [text-decoration:none] [padding:12px] [border-radius:12px] [font-weight:700] [font-size:0.9rem] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white] [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)]"}>Ver más información</Link>
                        </div>
                    </div>

                    <div className={"tarjeta-sede [background:var(--blanco)] [border-radius:25px] [overflow:hidden] [box-shadow:var(--sombra)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-10px)] [&:hover]:[box-shadow:0_20px_40px_rgba(79,_172,_254,_0.15)]"}>
                        <div className={"imagen-sede [position:relative] [height:180px]"}>
                            <img className={"[.imagen-sede_&]:[width:100%] [.imagen-sede_&]:[height:100%] [.imagen-sede_&]:[object-fit:cover]"} src={cole2} alt="Institución" />
                            <span className={"etiqueta-cupos [position:absolute] [top:15px] [right:15px] [background:rgba(34,_197,_94,_0.9)] [color:white] [padding:5px_12px] [border-radius:10px] [font-size:0.75rem] [font-weight:700]"}>Cupos Disponibles</span>
                        </div>
                        <div className={"info-sede [padding:20px]"}>
                            <h3 className={"[.info-sede_&]:[color:var(--azul-navy)] [.info-sede_&]:[margin:0_0_10px] [.info-sede_&]:[font-size:1.2rem]"}>Colegio Mayor de Cauca</h3>
                            <p className={"ubicacion [.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0] [font-size:0.85rem] [color:var(--gris-texto)] [margin-bottom:15px]"}><i className={"bi bi-geo-alt [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Popayán - Centro</p>
                            <div className={"detalles-mini [display:flex] [justify-content:space-between] [font-size:0.8rem] [color:var(--azul-navy)] [font-weight:600] [margin-bottom:20px] [padding-top:10px] [border-top:1px_solid_#f1f5f9]"}>
                                <span><i className={"bi bi-mortarboard [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Transición a 11°</span>
                                <span><i className={"bi bi-clock [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Jornada Única</span>
                            </div>
                            <a href="#" className={"btn-ver-mas [display:block] [text-align:center] [background:#f1f5f9] [color:var(--azul-navy)] [text-decoration:none] [padding:12px] [border-radius:12px] [font-weight:700] [font-size:0.9rem] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white] [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)]"}>Ver más información</a>
                        </div>
                    </div>

                    <div className={"tarjeta-sede [background:var(--blanco)] [border-radius:25px] [overflow:hidden] [box-shadow:var(--sombra)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-10px)] [&:hover]:[box-shadow:0_20px_40px_rgba(79,_172,_254,_0.15)]"}>
                        <div className={"imagen-sede [position:relative] [height:180px]"}>
                            <img className={"[.imagen-sede_&]:[width:100%] [.imagen-sede_&]:[height:100%] [.imagen-sede_&]:[object-fit:cover]"} src={cole3} alt="Institución" />
                            <span className={"etiqueta-cupos [position:absolute] [top:15px] [right:15px] [background:rgba(34,_197,_94,_0.9)] [color:white] [padding:5px_12px] [border-radius:10px] [font-size:0.75rem] [font-weight:700]"}>Cupos Disponibles</span>
                        </div>
                        <div className={"info-sede [padding:20px]"}>
                            <h3 className={"[.info-sede_&]:[color:var(--azul-navy)] [.info-sede_&]:[margin:0_0_10px] [.info-sede_&]:[font-size:1.2rem]"}>I.E. La Sagrada Familia</h3>
                            <p className={"ubicacion [.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0] [font-size:0.85rem] [color:var(--gris-texto)] [margin-bottom:15px]"}><i className={"bi bi-geo-alt [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Popayán - Comuna 5</p>
                            <div className={"detalles-mini [display:flex] [justify-content:space-between] [font-size:0.8rem] [color:var(--azul-navy)] [font-weight:600] [margin-bottom:20px] [padding-top:10px] [border-top:1px_solid_#f1f5f9]"}>
                                <span><i className={"bi bi-mortarboard [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> 6° a 11°</span>
                                <span><i className={"bi bi-clock [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Jornada Tarde</span>
                            </div>
                            <a href="#" className={"btn-ver-mas [display:block] [text-align:center] [background:#f1f5f9] [color:var(--azul-navy)] [text-decoration:none] [padding:12px] [border-radius:12px] [font-weight:700] [font-size:0.9rem] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white] [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)]"}>Ver más información</a>
                        </div>
                    </div>

                    <div className={"tarjeta-sede [background:var(--blanco)] [border-radius:25px] [overflow:hidden] [box-shadow:var(--sombra)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-10px)] [&:hover]:[box-shadow:0_20px_40px_rgba(79,_172,_254,_0.15)]"}>
                        <div className={"imagen-sede [position:relative] [height:180px]"}>
                            <img className={"[.imagen-sede_&]:[width:100%] [.imagen-sede_&]:[height:100%] [.imagen-sede_&]:[object-fit:cover]"} src={cole4} alt="Institución" />
                            <span className={"etiqueta-cupos [position:absolute] [top:15px] [right:15px] [background:rgba(34,_197,_94,_0.9)] [color:white] [padding:5px_12px] [border-radius:10px] [font-size:0.75rem] [font-weight:700]"}>Cupos Disponibles</span>
                        </div>
                        <div className={"info-sede [padding:20px]"}>
                            <h3 className={"[.info-sede_&]:[color:var(--azul-navy)] [.info-sede_&]:[margin:0_0_10px] [.info-sede_&]:[font-size:1.2rem]"}>I.E. Don Bosco</h3>
                            <p className={"ubicacion [.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0] [font-size:0.85rem] [color:var(--gris-texto)] [margin-bottom:15px]"}><i className={"bi bi-geo-alt [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Popayán - Comuna 9</p>
                            <div className={"detalles-mini [display:flex] [justify-content:space-between] [font-size:0.8rem] [color:var(--azul-navy)] [font-weight:600] [margin-bottom:20px] [padding-top:10px] [border-top:1px_solid_#f1f5f9]"}>
                                <span><i className={"bi bi-mortarboard [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> 1° a 11°</span>
                                <span><i className={"bi bi-clock [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Jornada Única</span>
                            </div>
                            <Link to="/InfoSede" className={"btn-ver-mas [display:block] [text-align:center] [background:#f1f5f9] [color:var(--azul-navy)] [text-decoration:none] [padding:12px] [border-radius:12px] [font-weight:700] [font-size:0.9rem] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white] [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)]"}>Ver más información</Link>
                        </div>
                    </div>

                    <div className={"tarjeta-sede [background:var(--blanco)] [border-radius:25px] [overflow:hidden] [box-shadow:var(--sombra)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-10px)] [&:hover]:[box-shadow:0_20px_40px_rgba(79,_172,_254,_0.15)]"}>
                        <div className={"imagen-sede [position:relative] [height:180px]"}>
                            <img className={"[.imagen-sede_&]:[width:100%] [.imagen-sede_&]:[height:100%] [.imagen-sede_&]:[object-fit:cover]"} src={cole5} alt="Institución" />
                            <span className={"etiqueta-cupos-pocos [position:absolute] [top:15px] [right:15px] [background:rgba(245,_158,_11,_0.9)] [color:white] [padding:5px_12px] [border-radius:10px] [font-size:0.75rem] [font-weight:700]"} >Pocos Cupos</span>
                        </div>
                        <div className={"info-sede [padding:20px]"}>
                            <h3 className={"[.info-sede_&]:[color:var(--azul-navy)] [.info-sede_&]:[margin:0_0_10px] [.info-sede_&]:[font-size:1.2rem]"}>I.E. Francisco de Paula Santander</h3>
                            <p className={"ubicacion [.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0] [font-size:0.85rem] [color:var(--gris-texto)] [margin-bottom:15px]"}><i className={"bi bi-geo-alt [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Popayán - Comuna 6</p>
                            <div className={"detalles-mini [display:flex] [justify-content:space-between] [font-size:0.8rem] [color:var(--azul-navy)] [font-weight:600] [margin-bottom:20px] [padding-top:10px] [border-top:1px_solid_#f1f5f9]"}>
                                <span><i className={"bi bi-mortarboard [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> 6° a 11°</span>
                                <span><i className={"bi bi-clock [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Jornada Mañana</span>
                            </div>
                            <a href="#" className={"btn-ver-mas [display:block] [text-align:center] [background:#f1f5f9] [color:var(--azul-navy)] [text-decoration:none] [padding:12px] [border-radius:12px] [font-weight:700] [font-size:0.9rem] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white] [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)]"}>Ver más información</a>
                        </div>
                    </div>

                    <div className={"tarjeta-sede [background:var(--blanco)] [border-radius:25px] [overflow:hidden] [box-shadow:var(--sombra)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease,_box-shadow_0.3s_ease] [&:hover]:[transform:translateY(-10px)] [&:hover]:[box-shadow:0_20px_40px_rgba(79,_172,_254,_0.15)]"}>
                        <div className={"imagen-sede [position:relative] [height:180px]"}>
                            <img className={"[.imagen-sede_&]:[width:100%] [.imagen-sede_&]:[height:100%] [.imagen-sede_&]:[object-fit:cover]"} src={cole6} alt="Institución" />
                            <span className={"etiqueta-cupos-agotados [position:absolute] [top:15px] [right:15px] [background:rgba(245,_11,_11,_0.9)] [color:white] [padding:5px_12px] [border-radius:10px] [font-size:0.75rem] [font-weight:700]"}>Agotado</span>
                        </div>
                        <div className={"info-sede [padding:20px]"}>
                            <h3 className={"[.info-sede_&]:[color:var(--azul-navy)] [.info-sede_&]:[margin:0_0_10px] [.info-sede_&]:[font-size:1.2rem]"}>Colegio Nuestra Señora del Carmen</h3>
                            <p className={"ubicacion [.texto-header2_&]:[color:var(--gris-texto)] [.texto-header2_&]:[margin:5px_0_0] [font-size:0.85rem] [color:var(--gris-texto)] [margin-bottom:15px]"}><i className={"bi bi-geo-alt [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Popayán - Norte</p>
                            <div className={"detalles-mini [display:flex] [justify-content:space-between] [font-size:0.8rem] [color:var(--azul-navy)] [font-weight:600] [margin-bottom:20px] [padding-top:10px] [border-top:1px_solid_#f1f5f9]"}>
                                <span><i className={"bi bi-mortarboard [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Transición a 11°</span>
                                <span><i className={"bi bi-clock [.busqueda-contenedor2_&]:[color:var(--cyan-em)] [.busqueda-contenedor2_&]:[margin-right:10px] [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Jornada Tarde</span>
                            </div>
                            <a href="#" className={"btn-ver-mas [display:block] [text-align:center] [background:#f1f5f9] [color:var(--azul-navy)] [text-decoration:none] [padding:12px] [border-radius:12px] [font-weight:700] [font-size:0.9rem] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white] [.menu-lista_li_&]:[display:flex] [.menu-lista_li_&]:[align-items:center] [.menu-lista_li_&]:[gap:15px] [.menu-lista_li_&]:[padding:15px_30px] [.menu-lista_li_&]:[color:#94a3b8] [.menu-lista_li_&]:[text-decoration:none] [.menu-lista_li_&]:[transition:0.3s] [.menu-lista_li_&:hover]:[color:white] [.menu-lista_li_&:hover]:[background:rgba(79,_172,_254,_0.1)] [.menu-lista_li_&:hover]:[border-left:4px_solid_var(--cyan-em)]"}>Ver más información</a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Colegios
