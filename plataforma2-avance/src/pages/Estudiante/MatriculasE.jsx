import { useState } from "react";

const matriculaAprobada = {
    institucion: "I.E. San Vicente",
    id: "EM-2026-882",
    estado: "Aprobado",
    modulos: ["Ciencias Naturales", "Matemáticas Avanzadas", "Inglés Técnico", "Lenguaje y Comunicación"],
};

const descargarComprobante = async (matricula) => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    const anchoPagina = pdf.internal.pageSize.getWidth();

    pdf.setFillColor(21, 48, 81);
    pdf.rect(0, 0, anchoPagina, 42, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("EasyMatric", 18, 18);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text("Comprobante de matrícula", 18, 30);

    pdf.setTextColor(21, 48, 81);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Información del proceso", 18, 56);
    pdf.setDrawColor(226, 232, 240);
    pdf.line(18, 60, anchoPagina - 18, 60);

    const datos = [
        ["Institución", matricula.institucion],
        ["ID del proceso", `#${matricula.id}`],
        ["Estado", matricula.estado],
        ["Fecha de emisión", new Date().toLocaleDateString("es-CO")],
    ];
    let posicionY = 72;

    datos.forEach(([etiqueta, valor]) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(etiqueta, 18, posicionY);
        pdf.setFont("helvetica", "normal");
        const lineasValor = pdf.splitTextToSize(valor, anchoPagina - 82);
        pdf.text(lineasValor, 68, posicionY);
        posicionY += Math.max(9, lineasValor.length * 6);
    });

    posicionY += 7;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Módulos inscritos", 18, posicionY);
    pdf.setDrawColor(226, 232, 240);
    pdf.line(18, posicionY + 4, anchoPagina - 18, posicionY + 4);
    posicionY += 14;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    matricula.modulos.forEach((modulo) => {
        pdf.text(`- ${modulo}`, 22, posicionY);
        posicionY += 8;
    });

    posicionY += 8;
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text("Documento generado desde la plataforma EasyMatric.", 18, posicionY);

    pdf.save(`comprobante-${matricula.id}.pdf`);
};

// Permite al estudiante consultar el estado de sus solicitudes de matrícula.
const MatriculasE = () => {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [errorComprobante, setErrorComprobante] = useState("");

    const manejarDescarga = async () => {
        setErrorComprobante("");
        try {
            await descargarComprobante(matriculaAprobada);
        } catch (error) {
            console.error("No se pudo generar el comprobante PDF.", error);
            setErrorComprobante("No se pudo generar el comprobante. Inténtalo nuevamente.");
        }
    };

    return (
        <div className="dashboard-container4">
            {/* Menú lateral principal */}

            <div className={"contenido-principal4 [margin-left:260px] [width:calc(100%_-_260px)] [padding:40px] [min-height:100vh] [width:80vw]"}>
                <div className="header-matriculas4">
                    <h1 className={"[.header-matriculas4_&]:[color:#153051] [.header-matriculas4_&]:[margin-bottom:5px]"}>Seguimiento de Matrículas</h1>
                    <br />
                    <p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Monitorea el estado de tus inscripciones y descarga tus comprobantes oficiales.</p>
                </div>
                <br />

                <div className={"contenedor-historial [width:100%]"}>

                    <div className={"tarjeta-matricula4 [background:#ffffff] [border-radius:25px] [padding:30px] [box-shadow:0_10px_30px_rgba(0,_0,_0,_0.08)] [margin-bottom:30px] [border:1px_solid_#f1f5f9]"}>
                        <div className={"matricula-encabezado4 [display:flex] [justify-content:space-between] [align-items:center] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:20px] [margin-bottom:20px]"}>
                            {/* Información básica */}
                            <div className={"inst-info [display:flex] [align-items:center] [gap:15px]"}>
                                <div className={"icono-inst [width:50px] [height:50px] [background:#f8fafc] [border-radius:15px] [display:flex] [justify-content:center] [align-items:center] [font-size:1.5rem] [color:#4facfe]"}><i className={"bi bi-building [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i></div>
                                <div>
                                    <h2 className={"[.inst-info_&]:[font-size:1.3rem] [.inst-info_&]:[margin:0] [.inst-info_&]:[color:#153051]"}>I.E. San Vicente</h2>
                                    <span className={"id-proceso [font-size:0.8rem] [color:#94a3b8] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>ID Proceso: #EM-2026-882</span>
                                </div>
                            </div>
                            <div className={"estado-badge aprobado [padding:6px_15px] [border-radius:10px] [font-size:0.8rem] [font-weight:700] [background:#dcfce7] [color:#22c55e]"}>Aprobado</div>
                        </div>

                        <div className="matricula-cuerpo7">
                             {/* Módulos inscritos */}
                            <div className={"seccion-modulos7 [margin-bottom:25px]"}>
                                <h3 className={"[.seccion-modulos7_&]:[display:flex] [.seccion-modulos7_&]:[align-items:center] [.seccion-modulos7_&]:[gap:8px] [.seccion-modulos7_&]:[font-size:1.05rem] [.seccion-modulos7_&]:[color:#153051] [.seccion-modulos7_&]:[margin-bottom:15px] [.seccion-progreso_&]:[font-size:1rem] [.seccion-progreso_&]:[margin-bottom:20px]"}><i className={"bi bi-layers [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Módulos Inscritos:</h3>
                                <div className={"grid-modulos7 [display:flex] [flex-wrap:wrap] [gap:12px]"}>
                                    {matriculaAprobada.modulos.map((modulo) => (
                                        <span key={modulo} className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-[#153051]">
                                            {modulo}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Barra de progreso */}
                            <div className="seccion-progreso">
                                <h3 className={"[.seccion-modulos7_&]:[display:flex] [.seccion-modulos7_&]:[align-items:center] [.seccion-modulos7_&]:[gap:8px] [.seccion-modulos7_&]:[font-size:1.05rem] [.seccion-modulos7_&]:[color:#153051] [.seccion-modulos7_&]:[margin-bottom:15px] [.seccion-progreso_&]:[font-size:1rem] [.seccion-progreso_&]:[margin-bottom:20px]"}><i className={"bi bi-activity [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Estado del Proceso:</h3>
                                <div className={"linea-progreso [display:flex] [justify-content:space-between] [position:relative] [max-width:600px] [margin:0_auto_30px]"}>
                                    <div className={"paso completado [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>1</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Solicitud</p></div>
                                    <div className={"paso completado [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>2</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Documentación</p></div>
                                    <div className={"paso completado [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>3</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Revisión</p></div>
                                    <div className={"paso activo [text-align:center] [position:relative] [z-index:1]"}><span className={"[.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>4</span><p className={"[.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Finalizado</p></div>
                                </div>
                            </div>
                        </div>
                        {/* Botones de acciones */}
                        <div className={"matricula-acciones [display:flex] [justify-content:flex-end] [gap:15px] [border-top:1px_solid_#f1f5f9] [padding-top:20px] flex-wrap"}>
                            <button type="button" onClick={() => setMostrarDetalles(true)} className={"btn-accion secundario [padding:12px_20px] [border-radius:12px] [border:none] [font-weight:700] [cursor:pointer] [transition:0.3s] [display:flex] [align-items:center] [gap:8px] [background:#f8fafc] [color:#153051] [&:hover]:[background:#e2e8f0]"}><i className={"bi bi-eye [.menu-lista_li_a_&]:[font-size:1.2rem]"} aria-hidden="true"></i> Detalles</button>
                            <button type="button" onClick={manejarDescarga} className={"btn-accion primario [padding:12px_20px] [border-radius:12px] [border:none] [font-weight:700] [cursor:pointer] [transition:0.3s] [display:flex] [align-items:center] [gap:8px] [background:#153051] [color:white] [&:hover]:[background:#4facfe] [&:hover]:[transform:translateY(-3px)]"}><i className={"bi bi-file-earmark-pdf [.menu-lista_li_a_&]:[font-size:1.2rem]"} aria-hidden="true"></i> Descargar Comprobante</button>
                            {errorComprobante && <p role="alert" className="basis-full text-right text-sm text-red-600">{errorComprobante}</p>}
                            {mostrarDetalles && (
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                                    onClick={(event) => {
                                        if (event.target === event.currentTarget) setMostrarDetalles(false);
                                    }}
                                >
                                    <section role="dialog" aria-modal="true" aria-labelledby="matricula-detalle-titulo" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                                        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                                            <div>
                                                <h2 id="matricula-detalle-titulo" className="m-0 text-xl font-bold text-[#153051]">Detalle de matrícula</h2>
                                                <p className="mb-0 mt-1 text-sm text-slate-500">{matriculaAprobada.institucion}</p>
                                            </div>
                                            <button type="button" onClick={() => setMostrarDetalles(false)} aria-label="Cerrar detalles" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200">
                                                <i className="bi bi-x-lg" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <dl className="m-0 grid grid-cols-2 gap-4">
                                            <div className="rounded-xl bg-slate-50 p-3">
                                                <dt className="text-xs text-slate-500">ID del proceso</dt>
                                                <dd className="mb-0 mt-1 font-semibold text-slate-800">#{matriculaAprobada.id}</dd>
                                            </div>
                                            <div className="rounded-xl bg-emerald-50 p-3">
                                                <dt className="text-xs text-slate-500">Estado</dt>
                                                <dd className="mb-0 mt-1 font-semibold text-emerald-700">{matriculaAprobada.estado}</dd>
                                            </div>
                                        </dl>
                                        <h3 className="mb-3 mt-6 text-sm font-bold text-[#153051]">Módulos inscritos</h3>
                                        <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                            {matriculaAprobada.modulos.map((modulo) => (
                                                <li key={modulo} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                                                    <i className="bi bi-journal-check text-[#4facfe]" aria-hidden="true" />
                                                    {modulo}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="mb-0 mt-5 text-sm leading-6 text-slate-600">
                                            Tu matrícula fue aprobada y el comprobante ya está disponible para descargar.
                                        </p>
                                    </section>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={"tarjeta-matricula4 [background:#ffffff] [border-radius:25px] [padding:30px] [box-shadow:0_10px_30px_rgba(0,_0,_0,_0.08)] [margin-bottom:30px] [border:1px_solid_#f1f5f9]"}>
                        <div className={"matricula-encabezado4 [display:flex] [justify-content:space-between] [align-items:center] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:20px] [margin-bottom:20px]"}>
                              {/* Información básica */}
                            <div className={"inst-info [display:flex] [align-items:center] [gap:15px]"}>
                                <div className={"icono-inst [width:50px] [height:50px] [background:#f8fafc] [border-radius:15px] [display:flex] [justify-content:center] [align-items:center] [font-size:1.5rem] [color:#4facfe]"}><i className={"bi bi-building [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i></div>
                                <div>
                                    <h2 className={"[.inst-info_&]:[font-size:1.3rem] [.inst-info_&]:[margin:0] [.inst-info_&]:[color:#153051]"}>Colegio Mayor de Cauca</h2>
                                    <span className={"id-proceso [font-size:0.8rem] [color:#94a3b8] [.paso_&]:[width:30px] [.paso_&]:[height:30px] [.paso_&]:[background:#e2e8f0] [.paso_&]:[border-radius:50%] [.paso_&]:[display:flex] [.paso_&]:[justify-content:center] [.paso_&]:[align-items:center] [.paso_&]:[margin:0_auto_10px] [.paso_&]:[font-weight:700] [.paso_&]:[color:#94a3b8] [.paso.completado_&]:[background:#22c55e] [.paso.completado_&]:[color:white] [.paso.activo_&]:[background:#4facfe] [.paso.activo_&]:[color:white] [.paso.activo_&]:[box-shadow:0_0_15px_rgba(79,_172,_254,_0.4)]"}>ID Proceso: #EM-2026-915</span>
                                </div>
                            </div>
                            <div className={"estado-badge pendiente [padding:6px_15px] [border-radius:10px] [font-size:0.8rem] [font-weight:700] [background:#fef3c7] [color:#f59e0b]"}>En Revisión</div>
                        </div>
                        {/* Información del estado */}
                        <div className="matricula-cuerpo">
                            <p className={"nota-espera [.header-matriculas4_&]:[color:#64748b] [.header-matriculas4_&]:[margin-bottom:30px] [.paso_&]:[font-size:0.75rem] [.paso_&]:[color:#64748b] [.paso_&]:[font-weight:600]"}>Tu documentación está siendo validada por la secretaría de la institución. Este proceso puede tardar hasta 48 horas.</p>
                        </div>
                        {/* Acciones disponibles */}
                        <div className={"matricula-acciones [display:flex] [justify-content:flex-end] [gap:15px] [border-top:1px_solid_#f1f5f9] [padding-top:20px]"}>
                            <button className={"btn-accion disabled [padding:12px_20px] [border-radius:12px] [border:none] [font-weight:700] [cursor:pointer] [transition:0.3s] [display:flex] [align-items:center] [gap:8px] [background:#f1f5f9] [color:#cbd5e1] [cursor:not-allowed]"} disabled><i className={"bi bi-file-earmark-lock [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i> Comprobante no disponible</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default MatriculasE
