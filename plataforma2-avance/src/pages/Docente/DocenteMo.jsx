//import React from 'react'
import { Link } from "react-router-dom"


const DocenteMo = () => {
    return (
        <div>
            {/* Menú lateral de navegación */}

            <div className={"contenido-principal-docentess04 [margin-left:260px] [width:calc(100%_-_260px)] [min-height:100vh] [background:#f4f6fa] [padding:40px] [width:82vw]"}>

                <header className={"header-tabla-docentess04 [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:25px] [gap:20px]"}>
                    <div className="titulo-area-docentess04">
                        <h1 className={"[.titulo-area-docentess04_&]:[font-size:34px] [.titulo-area-docentess04_&]:[color:#0d1b3d] [.titulo-area-docentess04_&]:[margin-bottom:8px]"}>Mis Módulos Asignados</h1>
                        <p className={"[.titulo-area-docentess04_&]:[font-size:15px]"}>
                            Gestiona los contenidos, revisa los estudiantes inscritos y sube las calificaciones finales.
                        </p>
                    </div>

                    <Link to="/SubirModulo" className={"btn-primario-docentess04 [background:#4da3ff] [color:white] [padding:14px_22px] [border-radius:12px] [text-decoration:none] [display:inline-flex] [align-items:center] [gap:10px] [font-weight:600] [transition:0.3s] [&:hover]:[background:#318cff]"}>
                        <i className={"bi bi-plus-lg [.caja-busqueda-docentess04_&]:[color:#6b7280] [.caja-busqueda-docentess04_&]:[font-size:15px]"}></i> Subir Nuevo Módulo
                    </Link>
                </header>

                <section className={"contenedor-tabla-soft-docentess04 [background:white] [border-radius:22px] [padding:25px]"}>

                    <div className={"barra-herramientas-docentess04 [display:flex] [justify-content:space-between] [align-items:center] [margin-bottom:25px]"}>
                        <div className={"caja-busqueda-docentess04 [width:350px] [background:#f3f6fa] [border:1px_solid_#dbe2ea] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px]"}>
                            <i className={"bi bi-search [.caja-busqueda-docentess04_&]:[color:#6b7280] [.caja-busqueda-docentess04_&]:[font-size:15px]"}></i>

                            <input className={"[.caja-busqueda-docentess04_&]:[width:100%] [.caja-busqueda-docentess04_&]:[border:none] [.caja-busqueda-docentess04_&]:[background:transparent] [.caja-busqueda-docentess04_&]:[outline:none] [.caja-busqueda-docentess04_&]:[font-size:14px]"} type="text" placeholder="Buscar módulo o grado..." />
                        </div>
                    </div>

                    <div className={"tabla-scroll-docentess04 [overflow-x:auto]"}>

                        <table className={"tabla-matriculados-docentess04 [width:100%] [border-collapse:collapse]"}>

                            <thead className={"[.tabla-matriculados-docentess04_&]:[background:#f5f7fb]"}>
                                <tr>
                                    <th className={"[.tabla-matriculados-docentess04_&]:[padding:16px] [.tabla-matriculados-docentess04_&]:[text-align:left] [.tabla-matriculados-docentess04_&]:[color:#0d1b3d] [.tabla-matriculados-docentess04_&]:[font-size:14px] [.tabla-matriculados-docentess04_&]:[font-weight:700]"}>N°</th>
                                    <th className={"[.tabla-matriculados-docentess04_&]:[padding:16px] [.tabla-matriculados-docentess04_&]:[text-align:left] [.tabla-matriculados-docentess04_&]:[color:#0d1b3d] [.tabla-matriculados-docentess04_&]:[font-size:14px] [.tabla-matriculados-docentess04_&]:[font-weight:700]"}>Nombre del Módulo</th>
                                    <th className={"[.tabla-matriculados-docentess04_&]:[padding:16px] [.tabla-matriculados-docentess04_&]:[text-align:left] [.tabla-matriculados-docentess04_&]:[color:#0d1b3d] [.tabla-matriculados-docentess04_&]:[font-size:14px] [.tabla-matriculados-docentess04_&]:[font-weight:700]"}>Grado / Curso</th>
                                    <th className={"[.tabla-matriculados-docentess04_&]:[padding:16px] [.tabla-matriculados-docentess04_&]:[text-align:left] [.tabla-matriculados-docentess04_&]:[color:#0d1b3d] [.tabla-matriculados-docentess04_&]:[font-size:14px] [.tabla-matriculados-docentess04_&]:[font-weight:700]"}>Estudiantes Inscritos</th>
                                    <th className={"[.tabla-matriculados-docentess04_&]:[padding:16px] [.tabla-matriculados-docentess04_&]:[text-align:left] [.tabla-matriculados-docentess04_&]:[color:#0d1b3d] [.tabla-matriculados-docentess04_&]:[font-size:14px] [.tabla-matriculados-docentess04_&]:[font-weight:700]"}>Estado</th>
                                    <th className={"[.tabla-matriculados-docentess04_&]:[padding:16px] [.tabla-matriculados-docentess04_&]:[text-align:left] [.tabla-matriculados-docentess04_&]:[color:#0d1b3d] [.tabla-matriculados-docentess04_&]:[font-size:14px] [.tabla-matriculados-docentess04_&]:[font-weight:700]"}>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>01</td>

                                    <td className={"nombre-est-docentess04 [.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Comprensión Lectora y Redacción
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <span className={"grado-tag-docentess04 [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            3° Primaria
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <strong>28 Alumnos</strong>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <span className={"badge-activo-docentess04 [background:#e2f0d9] [color:#385723] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}> Activo</span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <Link to="/GrupoModulo" className={"btn-tabla-docentess04 [background:#4da3ff] [color:white] [padding:8px_14px] [border-radius:10px] [text-decoration:none] [display:inline-flex] [align-items:center] [gap:8px] [font-size:14px] [transition:0.3s] [&:hover]:[background:#318cff]"} title="Gestionar Estudiantes y Notas">
                                            <i className={"bi bi-eye-fill [.caja-busqueda-docentess04_&]:[color:#6b7280] [.caja-busqueda-docentess04_&]:[font-size:15px]"}></i> Ver Grupo
                                        </Link>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>02</td>

                                    <td className={"nombre-est-docentess04 [.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Matemáticas Fundamentales
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <span className={"grado-tag-docentess04 [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            4° Primaria
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <strong>25 Alumnos</strong>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <span className={"badge-activo-docentess04 [background:#e2f0d9] [color:#385723] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            Activo
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <Link to="/GrupoModulo" className={"btn-tabla-docentess04 [background:#4da3ff] [color:white] [padding:8px_14px] [border-radius:10px] [text-decoration:none] [display:inline-flex] [align-items:center] [gap:8px] [font-size:14px] [transition:0.3s] [&:hover]:[background:#318cff]"} title="Gestionar Estudiantes y Notas">
                                            <i className={"bi bi-eye-fill [.caja-busqueda-docentess04_&]:[color:#6b7280] [.caja-busqueda-docentess04_&]:[font-size:15px]"}></i> Ver Grupo
                                        </Link>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>03</td>

                                    <td className={"nombre-est-docentess04 [.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Ciencias Naturales y Entorno
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <span className={"grado-tag-docentess04 [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            5° Primaria
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <strong>30 Alumnos</strong>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <span className={"badge-pendiente-docentess04 [background:#fce4d6] [color:#c65911] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            Pendiente
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentess04_&]:[padding:18px_16px] [.tabla-matriculados-docentess04_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentess04_&]:[color:#44506b] [.tabla-matriculados-docentess04_&]:[font-size:14px]"}>
                                        <Link to="/GrupoModulo" className={"btn-tabla-docentess04 [background:#4da3ff] [color:white] [padding:8px_14px] [border-radius:10px] [text-decoration:none] [display:inline-flex] [align-items:center] [gap:8px] [font-size:14px] [transition:0.3s] [&:hover]:[background:#318cff]"} title="Gestionar Estudiantes y Notas" >
                                            <i className={"bi bi-eye-fill [.caja-busqueda-docentess04_&]:[color:#6b7280] [.caja-busqueda-docentess04_&]:[font-size:15px]"}></i> Ver Grupo
                                        </Link>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </section>

            </div>

        </div>
    )
}

export default DocenteMo
