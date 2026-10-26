import { useState } from 'react';




const RevicionD = () => {
    // ----------------------------------------------------
    // ESTADO INICIAL DE SOLICITUDES DE REVISIÓN
    // ----------------------------------------------------
    const [solicitudes, setSolicitudes] = useState([
        { id: 1, usuario: "Ana Rodríguez", documento: "ver_documento.pdf", fecha: "27/04/2026", estado: "Pendiente", grado: "Preescolar" },
        { id: 2, usuario: "Breiner Pérez", documento: "Ver_Documento.pdf", fecha: "26/04/2026", estado: "Pendiente", grado: "Primaria" },
        { id: 3, usuario: "Valentina Ospina", documento: "ver_documento.pdf", fecha: "26/04/2026", estado: "Pendiente", grado: "Secundaria" },
        { id: 4, usuario: "Carlos Andrés Mendoza", documento: "ver_documento.pdf", fecha: "27/04/2026", estado: "Pendiente", grado: "Primaria" },
        { id: 5, usuario: "Angie Marcela Ortiz", documento: "ver_documento.pdf", fecha: "27/04/2026", estado: "Pendiente", grado: "Preescolar" },
        { id: 6, usuario: "Mariana Lucía Torres", documento: "ver_documento.pdf", fecha: "02/04/2026", estado: "Pendiente", grado: "Secundaria" },
        { id: 7, usuario: "Sofía Elena Gómez", documento: "ver_documento.pdf", fecha: "21/02/2026", estado: "Pendiente", grado: "Preescolar" },
        { id: 8, usuario: "Samuel David Quintero", documento: "ver_documento.pdf", fecha: "27/03/2026", estado: "Pendiente", grado: "Primaria" },
        { id: 9, usuario: "Isabella Caicedo", documento: "ver_documento.pdf", fecha: "03/04/2026", estado: "Pendiente", grado: "Secundaria" },
        { id: 10, usuario: "Mateo Holguín", documento: "ver_documento.pdf", fecha: "17/04/2026", estado: "Pendiente", grado: "Primaria" }
    ]);

    // Estado para gestionar el filtro seleccionado
    const [filtroGrado, setFiltroGrado] = useState("Todos");

    // Función para cambiar el estado (Aprobado / Rechazado)
    const cambiarEstado = (id, nuevoEstado) => {
        setSolicitudes(prev =>
            prev.map(item =>
                item.id === id ? { ...item, estado: nuevoEstado } : item
            )
        );
    };

    // Filtrado de la lista según la opción seleccionada
    const solicitudesFiltradas = filtroGrado === "Todos"
        ? solicitudes
        : solicitudes.filter(item => item.grado === filtroGrado);

    return (
        <div>
            {/* Menú lateral de navegación */}


            <div className={"contenido-revicion [margin-left:260px] [width:calc(100%_-_260px)] [padding:40px] [min-height:100vh] [width:80vw]"}>
                <div className="header02">
                    <h2 className={"[.header02_&]:[font-size:2.1rem] [.header02_&]:[font-weight:bold] [.header02_&]:[color:#000] [.header02_&]:[margin-bottom:25px]"}>Revisión de Documentación</h2>
                </div>

                <div className={"tabla-box02 [background:#ffffff] [border-radius:10px] [padding:25px] [box-shadow:0_2px_10px_rgba(0,_0,_0,_0.05)]"}>
                    {/* Filtro por grado */}
                    <div className={"acciones-header02 [display:flex] [align-items:center] [margin-bottom:25px]"}>
                        <select
                            className={"btn-primario08 [background:#4da3ff] [border:none] [padding:12px_18px] [border-radius:12px] [font-weight:600] [cursor:pointer] [box-shadow:0_6px_18px_rgba(79,_172,_254,_0.4)] [transition:0.2s] [&:hover]:[background:#3391f5]"}
                            value={filtroGrado}
                            onChange={(e) => setFiltroGrado(e.target.value)}
                        >
                            <option className={"[.btn-primario08_&]:[background:#5aa7f0] [.btn-primario08_&]:[color:white]"} value="Todos">Todos los grados</option>
                            <option className={"[.btn-primario08_&]:[background:#5aa7f0] [.btn-primario08_&]:[color:white]"} value="Preescolar">Preescolar</option>
                            <option className={"[.btn-primario08_&]:[background:#5aa7f0] [.btn-primario08_&]:[color:white]"} value="Primaria">Primaria</option>
                            <option className={"[.btn-primario08_&]:[background:#5aa7f0] [.btn-primario08_&]:[color:white]"} value="Secundaria">Secundaria</option>
                        </select>
                    </div>

                    {/* Tabla de revisiones */}
                    <section className={"contenedor-tabla-revisar [width:100%]"}>
                        <div className={"barra-herramientas [width:100%]"}>
                            <table className={"tabla-revision [width:100%] [border-collapse:collapse]"}>
                                <thead>
                                    <tr className={"[.tabla-revision_thead_&]:[border-bottom:2px_solid_#dbe3ea] [.tabla-revision_tbody_&]:[border-bottom:1px_solid_#e5e7eb]"}>
                                        <th className={"[.tabla-revision_thead_&]:[text-align:left] [.tabla-revision_thead_&]:[padding:18px_20px] [.tabla-revision_thead_&]:[font-size:16px] [.tabla-revision_thead_&]:[font-weight:bold] [.tabla-revision_thead_&]:[color:#0f172a]"}>Usuario</th>
                                        <th className={"[.tabla-revision_thead_&]:[text-align:left] [.tabla-revision_thead_&]:[padding:18px_20px] [.tabla-revision_thead_&]:[font-size:16px] [.tabla-revision_thead_&]:[font-weight:bold] [.tabla-revision_thead_&]:[color:#0f172a]"}>Grado / Nivel</th>
                                        <th className={"[.tabla-revision_thead_&]:[text-align:left] [.tabla-revision_thead_&]:[padding:18px_20px] [.tabla-revision_thead_&]:[font-size:16px] [.tabla-revision_thead_&]:[font-weight:bold] [.tabla-revision_thead_&]:[color:#0f172a]"}>Documento</th>
                                        <th className={"[.tabla-revision_thead_&]:[text-align:left] [.tabla-revision_thead_&]:[padding:18px_20px] [.tabla-revision_thead_&]:[font-size:16px] [.tabla-revision_thead_&]:[font-weight:bold] [.tabla-revision_thead_&]:[color:#0f172a]"}>Fecha Envío</th>
                                        <th className={"[.tabla-revision_thead_&]:[text-align:left] [.tabla-revision_thead_&]:[padding:18px_20px] [.tabla-revision_thead_&]:[font-size:16px] [.tabla-revision_thead_&]:[font-weight:bold] [.tabla-revision_thead_&]:[color:#0f172a]"}>Estado Actual</th>
                                        <th className={"[.tabla-revision_thead_&]:[text-align:left] [.tabla-revision_thead_&]:[padding:18px_20px] [.tabla-revision_thead_&]:[font-size:16px] [.tabla-revision_thead_&]:[font-weight:bold] [.tabla-revision_thead_&]:[color:#0f172a]"}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitudesFiltradas.length > 0 ? (
                                        solicitudesFiltradas.map((item) => (
                                            <tr className={"[.tabla-revision_thead_&]:[border-bottom:2px_solid_#dbe3ea] [.tabla-revision_tbody_&]:[border-bottom:1px_solid_#e5e7eb]"} key={item.id}>
                                                <td className={"[.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827]"}>{item.usuario}</td>
                                                <td className={"[.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827]"}>{item.grado}</td>
                                                <td className={"[.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827]"}>
                                                    <a href={`#${item.documento}`} className={"btn-link [color:#2563eb] [text-decoration:underline] [font-weight:500]"}>
                                                        {item.documento}
                                                    </a>
                                                </td>
                                                <td className={"[.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827]"}>{item.fecha}</td>
                                                <td className={"[.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827]"}>
                                                    <span className={`badge-estado ${item.estado.toLowerCase()} ${item.estado === "Aprobado" ? "[background-color:#dcfce7] [color:#15803d]" : item.estado === "Rechazado" ? "[background-color:#fee2e2] [color:#b91c1c]" : "[background-color:#fef3c7] [color:#b45309]"} [padding:6px_12px] [border-radius:20px] [font-size:0.82rem] [font-weight:600] [display:inline-block] [text-align:center]`}>
                                                        {item.estado}
                                                    </span>
                                                </td>
                                                <td className={"acciones-validacion [.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827] [display:flex] [gap:12px] [gap:8px] [align-items:center]"}>
                                                    <button
                                                        className={`btn-accion btn-aprobar ${item.estado === "Aprobado" ? "seleccionado [background-color:#22c55e] [color:#ffffff] [border-color:#16a34a] [box-shadow:0_2px_4px_rgba(34,_197,_94,_0.2)]" : ""} [background:#22c55e] [color:white] [border:none] [border-radius:8px] [padding:10px_18px] [font-size:15px] [cursor:pointer] [transition:0.2s] [&:hover]:[background:#16a34a] [display:inline-flex] [align-items:center] [gap:5px] [padding:6px_12px] [border-radius:6px] [font-size:0.85rem] [font-weight:500] [background-color:#f8fafc] [border:1px_solid_#cbd5e1] [color:#475569] [transition:all_0.2s_ease-in-out] [&:hover]:[background-color:#f1f5f9]`}
                                                        onClick={() => cambiarEstado(item.id, "Aprobado")}
                                                        title="Aprobar solicitud"
                                                    >
                                                        <i className="bi bi-check-circle"></i> Aprobar
                                                    </button>
                                                    <button
                                                        className={`btn-accion btn-rechazar ${item.estado === "Rechazado" ? "seleccionado [background-color:#ef4444] [color:#ffffff] [border-color:#dc2626] [box-shadow:0_2px_4px_rgba(239,_68,_68,_0.2)]" : ""} [background:#ef4444] [color:white] [border:none] [border-radius:8px] [padding:10px_18px] [font-size:15px] [cursor:pointer] [transition:0.2s] [&:hover]:[background:#dc2626] [display:inline-flex] [align-items:center] [gap:5px] [padding:6px_12px] [border-radius:6px] [font-size:0.85rem] [font-weight:500] [background-color:#f8fafc] [border:1px_solid_#cbd5e1] [color:#475569] [transition:all_0.2s_ease-in-out] [&:hover]:[background-color:#f1f5f9]`}
                                                        onClick={() => cambiarEstado(item.id, "Rechazado")}
                                                        title="Rechazar solicitud"
                                                    >
                                                        <i className="bi bi-x-circle"></i> Rechazar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className={"[.tabla-revision_thead_&]:[border-bottom:2px_solid_#dbe3ea] [.tabla-revision_tbody_&]:[border-bottom:1px_solid_#e5e7eb]"}>
                                            <td className={"[.tabla-revision_tbody_&]:[padding:20px] [.tabla-revision_tbody_&]:[font-size:16px] [.tabla-revision_tbody_&]:[color:#111827]"} colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                                                No hay solicitudes registradas para este nivel.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RevicionD;