//import React from 'react'


import catalogo from '../../assets/Catalo_perfil.png';

const NotasCa = () => {
  return (
    <div>
        {/* Menú lateral de navegación */}

            <div className={"contenido-principal-notas [margin-left:260px] [padding:40px]"}>
        <header className="header-seccion-notas">
            <h1>Panel de Catálogos y Notas</h1>
            <p>Gestiona los documentos institucionales y el rendimiento académico de los estudiantes.</p>
        </header>
         {/* Sección de catálogos */}
        <section className="seccion-catalogos-notas">
            <div className={"grid-catalogos02 [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:25px] [margin-bottom:50px]"}>
                <div className={"card-catalogo02 [background:var(--blanco)] [padding:25px_80px] [border-radius:20px] [text-align:center] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease] [&:hover]:[transform:translateY(-5px)]"}>
                    <div className={"icono-doc [font-size:1.5rem] [color:var(--cyan-em)] [text-align:right]"}><i className="bi bi-file-pdf"></i></div>
                    <img src="imagenes/Catalogo.png" alt="Documento" className={"img-doc [margin:15px_0] [opacity:0.8] [.perfil-estudiante_&]:[width:60px] [.perfil-estudiante_&]:[height:60px] [.perfil-estudiante_&]:[border-radius:50%] [.perfil-estudiante_&]:[object-fit:cover]"}/>
                    <h3 className={"[.estudiante-info_&]:[font-size:1.1rem] [.estudiante-info_&]:[color:var(--azul-navy)] [.estudiante-info_&]:[margin:0]"}>Manual de Convivencia</h3>
                    <button className={"btn-ver [width:100%] [padding:10px] [border-radius:12px] [border:none] [background:#f1f5f9] [color:var(--azul-navy)] [font-weight:700] [cursor:pointer] [&:hover]:[background:var(--azul-navy)] [&:hover]:[color:white]"}><i className="bi bi-eye"></i> Ver Documento</button>
                </div>
                <div className={"card-catalogo02 [background:var(--blanco)] [padding:25px_80px] [border-radius:20px] [text-align:center] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease] [&:hover]:[transform:translateY(-5px)]"}>
                    <div className={"icono-doc [font-size:1.5rem] [color:var(--cyan-em)] [text-align:right]"}><i className="bi bi-file-earmark-text"></i></div>
                    <img src="imagenes/Catalogo.png" alt="Documento" className={"img-doc [margin:15px_0] [opacity:0.8] [.perfil-estudiante_&]:[width:60px] [.perfil-estudiante_&]:[height:60px] [.perfil-estudiante_&]:[border-radius:50%] [.perfil-estudiante_&]:[object-fit:cover]"}/>
                    <h3 className={"[.estudiante-info_&]:[font-size:1.1rem] [.estudiante-info_&]:[color:var(--azul-navy)] [.estudiante-info_&]:[margin:0]"}>Oferta Académica 2026</h3>
                    <button className={"btn-ver [width:100%] [padding:10px] [border-radius:12px] [border:none] [background:#f1f5f9] [color:var(--azul-navy)] [font-weight:700] [cursor:pointer] [&:hover]:[background:var(--azul-navy)] [&:hover]:[color:white]"}><i className="bi bi-eye"></i> Ver Documento</button>
                </div>
                <div className={"card-catalogo02 [background:var(--blanco)] [padding:25px_80px] [border-radius:20px] [text-align:center] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [border:1px_solid_#f1f5f9] [transition:transform_0.3s_ease] [&:hover]:[transform:translateY(-5px)]"}>
                    <div className={"icono-doc [font-size:1.5rem] [color:var(--cyan-em)] [text-align:right]"}><i className="bi bi-file-ppt"></i></div>
                    <img src="imagenes/Catalogo.png" alt="Documento" className={"img-doc [margin:15px_0] [opacity:0.8] [.perfil-estudiante_&]:[width:60px] [.perfil-estudiante_&]:[height:60px] [.perfil-estudiante_&]:[border-radius:50%] [.perfil-estudiante_&]:[object-fit:cover]"}/>
                    <h3 className={"[.estudiante-info_&]:[font-size:1.1rem] [.estudiante-info_&]:[color:var(--azul-navy)] [.estudiante-info_&]:[margin:0]"}>Proyectos Transversales</h3>
                    <button className={"btn-ver [width:100%] [padding:10px] [border-radius:12px] [border:none] [background:#f1f5f9] [color:var(--azul-navy)] [font-weight:700] [cursor:pointer] [&:hover]:[background:var(--azul-navy)] [&:hover]:[color:white]"}><i className="bi bi-eye"></i> Ver Documento</button>
                </div>
            </div>
        </section>
         {/* Sección de notas académicas */}
        <section className="seccion-notas">
            <div className={"grid-notas02 [display:grid] [grid-template-columns:1fr_1fr] [gap:30px]"}>

                <div className={"tarjeta-nota02 [background:var(--blanco)] [border-radius:25px] [padding:25px] [box-shadow:0_10px_30px_rgba(0,0,0,0.05)]"}>
                    <div className={"perfil-estudiante [display:flex] [align-items:center] [gap:15px] [margin-bottom:20px]"}>
                        <img className={"[.perfil-estudiante_&]:[width:60px] [.perfil-estudiante_&]:[height:60px] [.perfil-estudiante_&]:[border-radius:50%] [.perfil-estudiante_&]:[object-fit:cover]"} src="https://img.freepik.com/vector-gratis/mujer-sonriente-cabello-largo_1308-174705.jpg" alt="Ana"/>
                        <div className="estudiante-info">
                            <h3 className={"[.estudiante-info_&]:[font-size:1.1rem] [.estudiante-info_&]:[color:var(--azul-navy)] [.estudiante-info_&]:[margin:0]"}>Ana Rodriguez Sandoval</h3>
                            <span className={"[.estudiante-info_&]:[font-size:0.8rem] [.estudiante-info_&]:[color:#94a3b8]"}>Grado 11° - Jornada Mañana</span>
                        </div>
                        <button className={"btn-plus [margin-left:auto] [background:none] [border:none] [color:var(--cyan-em)] [font-size:1.5rem] [cursor:pointer]"}><i className="bi bi-plus-circle-fill"></i></button>
                    </div>
                     {/* Tabla de notas */}
                    <table className={"tabla-notas-em [width:100%] [border-collapse:collapse] [font-size:0.9rem]"}>
                        <thead>
                            <tr>
                                <th className={"[.tabla-notas-em_&]:[text-align:left] [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[color:#94a3b8] [.tabla-notas-em_&]:[font-weight:600] [.tabla-notas-em_&]:[border-bottom:2px_solid_var(--gris-fondo)]"}>Módulo</th>
                                <th className={"[.tabla-notas-em_&]:[text-align:left] [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[color:#94a3b8] [.tabla-notas-em_&]:[font-weight:600] [.tabla-notas-em_&]:[border-bottom:2px_solid_var(--gris-fondo)]"}>Evaluación</th>
                                <th className={"[.tabla-notas-em_&]:[text-align:left] [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[color:#94a3b8] [.tabla-notas-em_&]:[font-weight:600] [.tabla-notas-em_&]:[border-bottom:2px_solid_var(--gris-fondo)]"}>Recuperación</th>
                            </tr>
                        </thead>
                        <tbody>
                             {/* Datos académicos */}
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Artes</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>9.0</td><td className={"nota-alta [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] ![color:var(--verde-exito)] ![font-weight:700] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td></tr>
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Inglés</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>8.0</td></tr>
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Historia</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td></tr>
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Ciencias Naturales</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>7.0</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>9.0</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className={"tarjeta-nota02 [background:var(--blanco)] [border-radius:25px] [padding:25px] [box-shadow:0_10px_30px_rgba(0,0,0,0.05)]"}>
                    <div className={"perfil-estudiante [display:flex] [align-items:center] [gap:15px] [margin-bottom:20px]"}>
                        <img className={"[.perfil-estudiante_&]:[width:60px] [.perfil-estudiante_&]:[height:60px] [.perfil-estudiante_&]:[border-radius:50%] [.perfil-estudiante_&]:[object-fit:cover]"} src={catalogo} alt="Andres"/>
                        <div className="estudiante-info">
                            <h3 className={"[.estudiante-info_&]:[font-size:1.1rem] [.estudiante-info_&]:[color:var(--azul-navy)] [.estudiante-info_&]:[margin:0]"}>Andres Camilo Dominguez</h3>
                            <span className={"[.estudiante-info_&]:[font-size:0.8rem] [.estudiante-info_&]:[color:#94a3b8]"}>Grado 11° - Jornada Mañana</span>
                        </div>
                        <button className={"btn-plus [margin-left:auto] [background:none] [border:none] [color:var(--cyan-em)] [font-size:1.5rem] [cursor:pointer]"}><i className="bi bi-plus-circle-fill"></i></button>
                    </div>
                    {/* Tabla de notas */}
                    <table className={"tabla-notas-em [width:100%] [border-collapse:collapse] [font-size:0.9rem]"}>
                        <thead>
                            <tr>
                                <th className={"[.tabla-notas-em_&]:[text-align:left] [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[color:#94a3b8] [.tabla-notas-em_&]:[font-weight:600] [.tabla-notas-em_&]:[border-bottom:2px_solid_var(--gris-fondo)]"}>Módulo</th>
                                <th className={"[.tabla-notas-em_&]:[text-align:left] [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[color:#94a3b8] [.tabla-notas-em_&]:[font-weight:600] [.tabla-notas-em_&]:[border-bottom:2px_solid_var(--gris-fondo)]"}>Evaluación</th>
                                <th className={"[.tabla-notas-em_&]:[text-align:left] [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[color:#94a3b8] [.tabla-notas-em_&]:[font-weight:600] [.tabla-notas-em_&]:[border-bottom:2px_solid_var(--gris-fondo)]"}>Recuperación</th>
                            </tr>
                        </thead>
                        <tbody>
                             {/* Datos académicos */}
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Artes</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>9.0</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td></tr>
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Inglés</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>8.0</td></tr>
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Ciencias Sociales</td><td className={"nota-baja [.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] ![color:var(--rojo-alerta)] ![font-weight:700] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>5.0</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>10</td></tr>
                            <tr><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>Física</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>7.0</td><td className={"[.tabla-notas-em_&]:[padding:12px] [.tabla-notas-em_&]:[border-bottom:1px_solid_#f1f5f9] [.tabla-notas-em_&]:[color:var(--azul-navy)] [.tabla-notas-em_&]:[font-weight:500] [.tabla-notas-em_tr:last-child_&]:[border-bottom:none]"}>8.0</td></tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    </div>

    </div>
  )
}

export default NotasCa
