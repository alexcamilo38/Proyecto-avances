//import React from 'react'
import { Link } from "react-router-dom"


// Consulta la oferta de módulos, programas y niveles académicos.
const ModulosAcademicos = () => {
    return (
        <div>
            {/* Menú lateral principal */}

            <div className={"contenido-modulosacademicos [margin-left:260px] [padding:40px]"}>
                <header className={"header-admin03 [display:flex] [justify-content:space-between] [align-items:flex-start] [margin-bottom:40px]"}>
                    <div className="titulo-grupo03">
                        <h1 className={"[.header-admin03_&]:[font-size:1.8rem] [.header-admin03_&]:[color:#1a1c2d] [.header-admin03_&]:[margin:0]"}>Módulos Académicos Disponibles</h1>
                        <p className={"[.header-admin03_&]:[color:#64748b] [.header-admin03_&]:[margin-top:5px]"}>Explora los cursos, horarios y requisitos para tu formación técnica.</p>
                    </div>
                    {/* Barra de búsqueda y filtros */}
                    <div className={"busqueda-filtro03 [display:flex] [gap:15px]"}>
                        {/* Filtro por modalidad */}
                        <select className={"select-filtro03 [padding:12px_15px] [border-radius:12px] [border:1px_solid_#e2e8f0] [outline:none] [font-size:0.9rem]"}>
                            <option value="">Todas las modalidades</option>
                            <option value="presencial">Presencial</option>
                            <option value="virtual">Virtual</option>
                        </select>
                        <input type="text" placeholder="Buscar módulo por nombre..." className={"input-busqueda03 [padding:12px_15px] [border-radius:12px] [border:1px_solid_#e2e8f0] [outline:none] [font-size:0.9rem] [width:250px]"} />
                    </div>
                </header>


                <section className={"grid-modulos03 [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:30px]"}>
                    {/* MÓDULO 1 */}
                    <article className={"tarjeta-modulo03 [background:white] [border-radius:24px] [padding:25px] [box-shadow:0_10px_25px_rgba(0,0,0,0.03)] [border:1px_solid_#f1f5f9] [display:flex] [flex-direction:column] [transition:all_0.3s_ease] [&:hover]:[transform:translateY(-8px)] [&:hover]:[box-shadow:0_20px_40px_rgba(0,0,0,0.08)]"}>
                        <div className={"modulo-header03 [display:flex] [justify-content:space-between] [margin-bottom:20px]"}>
                            <span className={"tag-modalidad presencial [padding:6px_12px] [border-radius:8px] [font-size:0.7rem] [font-weight:800] [text-transform:uppercase] [background:#e0f2fe] [color:#0369a1]"}>Presencial</span>
                            <div className={"cupos-disponibles [font-size:0.85rem] [color:#64748b] [font-weight:600]"}>
                                <i className={"bi bi-people-fill [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> 15 Cupos libres
                            </div>
                        </div>

                        <div className="modulo-cuerpo03">
                            <h2 className={"[.modulo-cuerpo03_&]:[font-size:1.3rem] [.modulo-cuerpo03_&]:[color:#1a1c2d] [.modulo-cuerpo03_&]:[margin-bottom:12px]"}>Programación Orientada a Objetos (Java)</h2>
                            <p className={"docente-asignado [.header-admin03_&]:[color:#64748b] [.header-admin03_&]:[margin-top:5px] [font-size:0.9rem] [color:#64748b] [margin-bottom:20px] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-person-badge [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Docente: <strong>Jorge Betancourth</strong></p>

                            <div className={"detalles-rapidos [background:#f8fafc] [padding:15px] [border-radius:15px] [display:flex] [flex-direction:column] [gap:12px] [margin-bottom:20px]"}>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-calendar3 [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>Lunes y Miércoles</span>
                                </div>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-clock [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>07:00 AM - 10:00 AM</span>
                                </div>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-geo-alt [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>Laboratorio de Software 2</span>
                                </div>
                            </div>

                            <div className="requisitos-modulo">
                                <h4 className={"[.requisitos-modulo_&]:[font-size:0.9rem] [.requisitos-modulo_&]:[margin-bottom:10px] [.requisitos-modulo_&]:[color:#1a1c2d]"}>Requisitos obligatorios:</h4>
                                <ul className={"[.requisitos-modulo_&]:[padding:0] [.requisitos-modulo_&]:[margin:0] [.requisitos-modulo_&]:[list-style:none]"}>
                                    <li className={"[.requisitos-modulo_&]:[font-size:0.8rem] [.requisitos-modulo_&]:[color:#64748b] [.requisitos-modulo_&]:[display:flex] [.requisitos-modulo_&]:[align-items:center] [.requisitos-modulo_&]:[gap:8px] [.requisitos-modulo_&]:[margin-bottom:6px]"}><i className={"bi bi-check-circle [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Algoritmos básicos aprobados</li>
                                    <li className={"[.requisitos-modulo_&]:[font-size:0.8rem] [.requisitos-modulo_&]:[color:#64748b] [.requisitos-modulo_&]:[display:flex] [.requisitos-modulo_&]:[align-items:center] [.requisitos-modulo_&]:[gap:8px] [.requisitos-modulo_&]:[margin-bottom:6px]"}><i className={"bi bi-check-circle [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Computador portátil propio</li>
                                </ul>
                            </div>
                        </div>

                        <div className={"modulo-pie03 [margin-top:25px] [display:grid] [grid-template-columns:1fr_1fr] [gap:12px]"}>
                            <Link
                                to="/DetalleM"
                                state={{
                                    modulo: {
                                        nombre: "Programación Orientada a Objetos (Java)",
                                        modalidad: "Presencial",
                                        cupos: 15,
                                        docente: "Jorge Betancourth",
                                        duracion: "40 horas",
                                        dias: "Lunes y Miércoles",
                                        horario: "07:00 AM - 10:00 AM",
                                        lugar: "Laboratorio de Software 2",
                                        descripcion: "Aprenderás los fundamentos de la programación orientada a objetos con Java mediante ejercicios prácticos.",
                                        temario: ["Variables, tipos de datos y operadores", "Clases, objetos y métodos", "Herencia y proyecto final"],
                                        requisitos: ["Algoritmos básicos aprobados", "Computador portátil propio"],
                                    },
                                }}
                                className="btn-ver-mas03 inline-block [padding:12px] [border-radius:12px] [font-weight:700] cursor-pointer duration-200 [font-size:0.85rem] [text-align:center] [border:none] [background:#f1f5f9] [color:#64748b] no-underline transition-all hover:-translate-y-0.5 hover:bg-sky-100 hover:text-[#0369a1] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4facfe]/50 focus-visible:ring-offset-2"
                            >
                                Más detalles
                            </Link>
                            <Link to="/FormMod" state={{ modulo: { nombre: "Programación Orientada a Objetos (Java)" } }} className="btn-inscribirse-modulo flex items-center justify-center [padding:12px] [border-radius:12px] [font-weight:700] [cursor:pointer] [transition:0.3s] [font-size:0.85rem] [text-align:center] [border:none] [background:#1a1c2d] [color:#4facfe] [&:hover]:[background:#4facfe] [&:hover]:[color:#1a1c2d] no-underline">Postularme</Link>
                        </div>
                    </article>

                    {/* MÓDULO 2 */}
                    <article className={"tarjeta-modulo03 [background:white] [border-radius:24px] [padding:25px] [box-shadow:0_10px_25px_rgba(0,0,0,0.03)] [border:1px_solid_#f1f5f9] [display:flex] [flex-direction:column] [transition:all_0.3s_ease] [&:hover]:[transform:translateY(-8px)] [&:hover]:[box-shadow:0_20px_40px_rgba(0,0,0,0.08)]"}>
                        <div className={"modulo-header03 [display:flex] [justify-content:space-between] [margin-bottom:20px]"}>
                            <span className={"tag-modalidad virtual [padding:6px_12px] [border-radius:8px] [font-size:0.7rem] [font-weight:800] [text-transform:uppercase] [background:#f3e8ff] [color:#7e22ce]"}>Virtual</span>
                            <div className={"cupos-disponibles [font-size:0.85rem] [color:#64748b] [font-weight:600]"}>
                                <i className={"bi bi-people-fill [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> 30 Cupos libres
                            </div>
                        </div>

                        <div className="modulo-cuerpo">
                            <h2 className={"[.modulo-cuerpo03_&]:[font-size:1.3rem] [.modulo-cuerpo03_&]:[color:#1a1c2d] [.modulo-cuerpo03_&]:[margin-bottom:12px]"}>Desarrollo Web con PHP y Laravel</h2>
                            <p className={"docente-asignado [.header-admin03_&]:[color:#64748b] [.header-admin03_&]:[margin-top:5px] [font-size:0.9rem] [color:#64748b] [margin-bottom:20px] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-person-badge [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Docente: <strong>Instructor Juan Pablo</strong></p>

                            <div className={"detalles-rapidos [background:#f8fafc] [padding:15px] [border-radius:15px] [display:flex] [flex-direction:column] [gap:12px] [margin-bottom:20px]"}>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-calendar3 [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>Martes y Jueves</span>
                                </div>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-clock [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>06:00 PM - 08:00 PM</span>
                                </div>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-laptop [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>Plataforma LMS SENA / Meet</span>
                                </div>
                            </div>

                            <div className="requisitos-modulo">
                                <h4 className={"[.requisitos-modulo_&]:[font-size:0.9rem] [.requisitos-modulo_&]:[margin-bottom:10px] [.requisitos-modulo_&]:[color:#1a1c2d]"}>Requisitos obligatorios:</h4>
                                <ul className={"[.requisitos-modulo_&]:[padding:0] [.requisitos-modulo_&]:[margin:0] [.requisitos-modulo_&]:[list-style:none]"}>
                                    <li className={"[.requisitos-modulo_&]:[font-size:0.8rem] [.requisitos-modulo_&]:[color:#64748b] [.requisitos-modulo_&]:[display:flex] [.requisitos-modulo_&]:[align-items:center] [.requisitos-modulo_&]:[gap:8px] [.requisitos-modulo_&]:[margin-bottom:6px]"}><i className={"bi bi-check-circle [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Conocimiento en HTML/CSS</li>
                                    <li className={"[.requisitos-modulo_&]:[font-size:0.8rem] [.requisitos-modulo_&]:[color:#64748b] [.requisitos-modulo_&]:[display:flex] [.requisitos-modulo_&]:[align-items:center] [.requisitos-modulo_&]:[gap:8px] [.requisitos-modulo_&]:[margin-bottom:6px]"}><i className={"bi bi-check-circle [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Conexión a internet estable</li>
                                </ul>
                            </div>
                        </div>

                        <div className={"modulo-pie03 [margin-top:25px] [display:grid] [grid-template-columns:1fr_1fr] [gap:12px]"}>
                            <Link
                                to="/DetalleM"
                                state={{
                                    modulo: {
                                        nombre: "Desarrollo Web con PHP y Laravel",
                                        modalidad: "Virtual",
                                        cupos: 30,
                                        docente: "Instructor Juan Pablo",
                                        duracion: "48 horas",
                                        dias: "Martes y Jueves",
                                        horario: "06:00 PM - 08:00 PM",
                                        lugar: "Plataforma LMS SENA / Meet",
                                        descripcion: "Construye aplicaciones web con PHP y Laravel a través de prácticas guiadas y un proyecto funcional.",
                                        temario: ["Fundamentos de PHP", "Rutas, controladores y vistas", "Persistencia de datos y proyecto web"],
                                        requisitos: ["Conocimiento en HTML/CSS", "Conexión a internet estable"],
                                    },
                                }}
                                className="btn-ver-mas03 inline-block [padding:12px] [border-radius:12px] [font-weight:700] cursor-pointer duration-200 [font-size:0.85rem] [text-align:center] [border:none] [background:#f1f5f9] [color:#64748b] no-underline transition-all hover:-translate-y-0.5 hover:bg-sky-100 hover:text-[#0369a1] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4facfe]/50 focus-visible:ring-offset-2"
                            >
                                Más detalles
                            </Link>
                            <Link to="/FormMod" state={{ modulo: { nombre: "Desarrollo Web con PHP y Laravel" } }} className="btn-inscribirse-modulo flex items-center justify-center [padding:12px] [border-radius:12px] [font-weight:700] [cursor:pointer] [transition:0.3s] [font-size:0.85rem] [text-align:center] [border:none] [background:#1a1c2d] [color:#4facfe] [&:hover]:[background:#4facfe] [&:hover]:[color:#1a1c2d] no-underline">Postularme</Link>
                        </div>
                    </article>
                    {/* MÓDULO 3 */}
                    <article className={"tarjeta-modulo03 [background:white] [border-radius:24px] [padding:25px] [box-shadow:0_10px_25px_rgba(0,0,0,0.03)] [border:1px_solid_#f1f5f9] [display:flex] [flex-direction:column] [transition:all_0.3s_ease] [&:hover]:[transform:translateY(-8px)] [&:hover]:[box-shadow:0_20px_40px_rgba(0,0,0,0.08)]"}>
                        <div className={"modulo-header03 [display:flex] [justify-content:space-between] [margin-bottom:20px]"}>
                            <span className={"tag-modalidad presencial [padding:6px_12px] [border-radius:8px] [font-size:0.7rem] [font-weight:800] [text-transform:uppercase] [background:#e0f2fe] [color:#0369a1]"}>Presencial</span>
                            <div className={"cupos-disponibles [font-size:0.85rem] [color:#64748b] [font-weight:600]"}>
                                <i className={"bi bi-people-fill [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> 10 Cupos libres
                            </div>
                        </div>

                        <div className="modulo-cuerpo03">
                            <h2 className={"[.modulo-cuerpo03_&]:[font-size:1.3rem] [.modulo-cuerpo03_&]:[color:#1a1c2d] [.modulo-cuerpo03_&]:[margin-bottom:12px]"}>Agroindustria</h2>
                            <p className={"docente-asignado [.header-admin03_&]:[color:#64748b] [.header-admin03_&]:[margin-top:5px] [font-size:0.9rem] [color:#64748b] [margin-bottom:20px] [display:flex] [align-items:center] [gap:8px]"}><i className={"bi bi-person-badge [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> Docente: <strong>Darwim ayala</strong></p>

                            <div className={"detalles-rapidos [background:#f8fafc] [padding:15px] [border-radius:15px] [display:flex] [flex-direction:column] [gap:12px] [margin-bottom:20px]"}>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-calendar3 [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>Lunes,MIércoles y Viernes</span>
                                </div>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-clock [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>1:00 AM - 4:00 AM</span>
                                </div>
                                <div className={"detalle-item [display:flex] [align-items:center] [gap:10px] [font-size:0.85rem] [color:#475569]"}>
                                    <i className={"bi bi-geo-alt [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>
                                    <span>aula 201</span>
                                </div>
                            </div>

                            <div className="requisitos-modulo">
                                <h4 className={"[.requisitos-modulo_&]:[font-size:0.9rem] [.requisitos-modulo_&]:[margin-bottom:10px] [.requisitos-modulo_&]:[color:#1a1c2d]"}>Requisitos obligatorios:</h4>
                                <ul className={"[.requisitos-modulo_&]:[padding:0] [.requisitos-modulo_&]:[margin:0] [.requisitos-modulo_&]:[list-style:none]"}>
                                    <li className={"[.requisitos-modulo_&]:[font-size:0.8rem] [.requisitos-modulo_&]:[color:#64748b] [.requisitos-modulo_&]:[display:flex] [.requisitos-modulo_&]:[align-items:center] [.requisitos-modulo_&]:[gap:8px] [.requisitos-modulo_&]:[margin-bottom:6px]"}><i className={"bi bi-check-circle [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i>ser mayor de edad</li>
                                    <li className={"[.requisitos-modulo_&]:[font-size:0.8rem] [.requisitos-modulo_&]:[color:#64748b] [.requisitos-modulo_&]:[display:flex] [.requisitos-modulo_&]:[align-items:center] [.requisitos-modulo_&]:[gap:8px] [.requisitos-modulo_&]:[margin-bottom:6px]"}><i className={"bi bi-check-circle [.detalle-item_&]:[color:#4facfe] [.detalle-item_&]:[font-size:1.1rem] [.requisitos-modulo_&]:[color:#10b981]"}></i> tener buen promedio académico</li>
                                </ul>
                            </div>
                        </div>

                        <div className={"modulo-pie03 [margin-top:25px] [display:grid] [grid-template-columns:1fr_1fr] [gap:12px]"}>
                            <Link
                                to="/DetalleM"
                                state={{
                                    modulo: {
                                        nombre: "Agroindustria",
                                        modalidad: "Presencial",
                                        cupos: 10,
                                        docente: "Darwim ayala",
                                        duracion: "40 horas",
                                        dias: "Lunes,MIércoles y Viernes",
                                        horario: "1:00 AM - 4:00 AM",
                                        lugar: "aula 201",
                                        descripcion: "Conoce procesos agroindustriales y buenas prácticas para transformar materias primas.",
                                        temario: ["Fundamentos de agroindustria", "Procesos de transformación", "Calidad y proyecto práctico"],
                                        requisitos: ["ser mayor de edad", "tener buen promedio académico"],
                                    },
                                }}
                                className="btn-ver-mas03 inline-block [padding:12px] [border-radius:12px] [font-weight:700] cursor-pointer duration-200 [font-size:0.85rem] [text-align:center] [border:none] [background:#f1f5f9] [color:#64748b] no-underline transition-all hover:-translate-y-0.5 hover:bg-sky-100 hover:text-[#0369a1] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4facfe]/50 focus-visible:ring-offset-2"
                            >
                                Más detalles
                            </Link>
                            <Link to="/FormMod" state={{ modulo: { nombre: "Agroindustria" } }} className="btn-inscribirse-modulo flex items-center justify-center [padding:12px] [border-radius:12px] [font-weight:700] [cursor:pointer] [transition:0.3s] [font-size:0.85rem] [text-align:center] [border:none] [background:#1a1c2d] [color:#4facfe] [&:hover]:[background:#4facfe] [&:hover]:[color:#1a1c2d] no-underline">Postularme</Link>
                        </div>
                    </article>

                </section>
            </div>

        </div>
    )
}

export default ModulosAcademicos
