//import React from 'react'
import { Link } from "react-router-dom"


const GrupoModulo = () => {
    return (
        <div>
            {/* Menú lateral de navegación */}

            <div className={"contenido-principal-docentes-modulos [margin-left:260px] [width:calc(100%_-_260px)] [min-height:100vh] [background:#f6f6f6] [padding:40px] [width:82vw]"}>

                <header className={"header-tabla-docentes-modulos [display:flex] [justify-content:space-between] [align-items:center] [gap:20px] [margin-bottom:25px]"}>

                    <div className="titulo-area-docentes-modulos">

                        <div className={"titulo-flex-docentes-modulos [display:flex] [align-items:center] [gap:10px]"}>

                            <Link
                                to="/DocenteMo"
                                className={"btn-volver-docentes-modulos [color:#64748b] [font-size:38px] [text-decoration:none] [display:flex] [align-items:center]"}
                            >
                                <i className={"bi bi-arrow-left-short [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                            </Link>

                            <h1 className={"[.titulo-area-docentes-modulos_&]:[font-size:34px] [.titulo-area-docentes-modulos_&]:[color:#0d1b3d] [.titulo-area-docentes-modulos_&]:[margin:0]"}>Estudiantes e Historial de Notas</h1>

                        </div>

                        <p className={"[.titulo-area-docentes-modulos_&]:[margin-top:8px] [.titulo-area-docentes-modulos_&]:[color:#64748b] [.titulo-area-docentes-modulos_&]:[font-size:15px]"}>
                            Módulo:
                            <strong>
                                {" "}Comprensión Lectora y Redacción (3° Primaria)
                            </strong>
                        </p>

                    </div>

                    <button className={"btn-primario-docentes-modulos [background:#4da3ff] [color:white] [border:none] [padding:14px_22px] [border-radius:12px] [font-size:15px] [font-weight:600] [cursor:pointer] [display:flex] [align-items:center] [gap:10px] [transition:0.3s] [&:hover]:[background:#318cff]"}>
                        <i className={"bi bi-save [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                        Guardar Todas las Notas
                    </button>

                </header>

                <section className={"contenedor-tabla-soft-docentes-modulos [background:white] [border-radius:22px] [padding:25px]"}>

                    <div className={"tabla-scroll-docentes-modulos [overflow-x:auto]"}>

                        <table className={"tabla-matriculados-docentes-modulos [width:100%] [border-collapse:collapse]"}>

                            <thead className={"[.tabla-matriculados-docentes-modulos_&]:[background:#f5f7fb]"}>
                                <tr>
                                    <th className={"[.tabla-matriculados-docentes-modulos_&]:[padding:16px] [.tabla-matriculados-docentes-modulos_&]:[text-align:left] [.tabla-matriculados-docentes-modulos_&]:[color:#0d1b3d] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [.tabla-matriculados-docentes-modulos_&]:[font-weight:700]"}>N°</th>
                                    <th className={"[.tabla-matriculados-docentes-modulos_&]:[padding:16px] [.tabla-matriculados-docentes-modulos_&]:[text-align:left] [.tabla-matriculados-docentes-modulos_&]:[color:#0d1b3d] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [.tabla-matriculados-docentes-modulos_&]:[font-weight:700]"}>Nombre Completo</th>
                                    <th className={"[.tabla-matriculados-docentes-modulos_&]:[padding:16px] [.tabla-matriculados-docentes-modulos_&]:[text-align:left] [.tabla-matriculados-docentes-modulos_&]:[color:#0d1b3d] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [.tabla-matriculados-docentes-modulos_&]:[font-weight:700]"}>ID Matrícula</th>
                                    <th className={"[.tabla-matriculados-docentes-modulos_&]:[padding:16px] [.tabla-matriculados-docentes-modulos_&]:[text-align:left] [.tabla-matriculados-docentes-modulos_&]:[color:#0d1b3d] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [.tabla-matriculados-docentes-modulos_&]:[font-weight:700]"}>Género</th>
                                    <th className={"[.tabla-matriculados-docentes-modulos_&]:[padding:16px] [.tabla-matriculados-docentes-modulos_&]:[text-align:left] [.tabla-matriculados-docentes-modulos_&]:[color:#0d1b3d] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [.tabla-matriculados-docentes-modulos_&]:[font-weight:700]"}>Nota Final</th>
                                    <th className={"[.tabla-matriculados-docentes-modulos_&]:[padding:16px] [.tabla-matriculados-docentes-modulos_&]:[text-align:left] [.tabla-matriculados-docentes-modulos_&]:[color:#0d1b3d] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [.tabla-matriculados-docentes-modulos_&]:[font-weight:700]"}>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>01</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Nicolás Mateo Salazar
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI01
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Masculino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="4.5"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual" >
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>02</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Salome Catalina López
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI02
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Femenino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>03</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Ginna Gabriela Goyes
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI03
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Femenino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>04</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Alex Santiago Gomez Ayala
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI04
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Masculino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>

                                </tr>
                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>05</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Jhosntin Fabian Castillo
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI05
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Masculino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual" >
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>06</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Yeraldin Fernanda España
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI06
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Femenino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>07</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        María Alejandra Gomez Gomez
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI07
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Femenino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>08</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Yannin Ayala
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI08
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Femenino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>09</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Yuneidi Rincon
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI09
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Femenino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>10</td>

                                    <td className={"nombre-est-docentes-modulos [.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px] [font-weight:600] [color:#0d1b3d]"}>
                                        Cristian Alejandro Guerrero
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <span className={"badge-id-docentes-modulos [background:#e8f1ff] [color:#2563eb] [padding:7px_12px] [border-radius:30px] [font-size:13px] [font-weight:600]"}>
                                            PRI10
                                        </span>
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>Masculino</td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            defaultValue="3.8"
                                            className={"input-nota-docentes-modulos [width:80px] [padding:8px] [border:1px_solid_#dbe2ea] [border-radius:10px] [text-align:center] [font-weight:bold] [background:#f8fafc] [outline:none]"}
                                        />
                                    </td>

                                    <td className={"[.tabla-matriculados-docentes-modulos_&]:[padding:18px_16px] [.tabla-matriculados-docentes-modulos_&]:[border-bottom:1px_solid_#edf1f5] [.tabla-matriculados-docentes-modulos_&]:[color:#44506b] [.tabla-matriculados-docentes-modulos_&]:[font-size:14px]"}>
                                        <button className={"btn-tabla-docentes-modulos [width:40px] [height:40px] [border:none] [border-radius:10px] [background:#ecfdf5] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [transition:0.3s] [&:hover]:[background:#d1fae5]"} title="Guardar Nota Individual">
                                            <i className={"bi bi-check-lg [.btn-tabla-docentes-modulos_&]:[color:#10b981] [.btn-tabla-docentes-modulos_&]:[font-size:18px]"}></i>
                                        </button>
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

export default GrupoModulo
