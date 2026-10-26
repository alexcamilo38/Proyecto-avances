//import React from 'react'

const Preguntas = () => {
    return (
        <section  className={"seccion-faq [all:unset] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [width:100vw] [min-height:100vh] [background-color:#f8fafc] [padding:60px_20px] [box-sizing:border-box]"}>
            <div className={"container10 [width:100%] [max-width:1200px] [margin:0_auto] [text-align:center]"}>
                <h2 className={"[.seccion-faq_&]:[font-size:2.8rem] [.seccion-faq_&]:[color:#1e293b] [.seccion-faq_&]:[margin-bottom:15px] [.seccion-faq_&]:[font-weight:700]"}>Preguntas Frecuentes</h2>
                <div className={"line10 [width:50px] [height:4px] [background:#24a92b] [margin:0_auto_50px] [border-radius:10px]"}></div>
                 {/* Contenedor de preguntas */}
                <div className={"faq-grid [display:grid] [grid-template-columns:repeat(2,_1fr)] [gap:30px] [width:100%] [text-align:left]"}>
                    <div className={"faq-item [background:#f8fafc] [padding:35px] [border-radius:20px] [border-left:6px_solid_#2563eb] [transition:all_0.3s_ease] [display:flex] [flex-direction:column] [justify-content:center] [min-height:180px] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(0,0,0,0.05)] [&:hover]:[background:#ffffff]"}>
                        <h3 className={"[.faq-item_&]:[font-size:1.2rem] [.faq-item_&]:[color:#1e293b] [.faq-item_&]:[margin-bottom:12px] [.faq-item_&]:[display:flex] [.faq-item_&]:[align-items:center] [.faq-item_&]:[gap:12px] [.faq-item_&]:[font-weight:700]"}><i className={"bi bi-phone [.faq-item_h3_&]:[color:#2563eb] [.faq-item_h3_&]:[font-size:1.4rem] [.faq-item_h3_&]:[flex-shrink:0]"}></i> ¿Se puede usar desde celular?</h3>
                        <p className={"[.faq-item_&]:[font-size:1rem] [.faq-item_&]:[color:#64748b] [.faq-item_&]:[line-height:1.6] [.faq-item_&]:[margin:0]"}>¡Totalmente! EasyMatric está diseñada bajo la filosofía "Mobile First". Puedes realizar inscripciones, subir documentos y consultar estados desde cualquier smartphone o tablet con acceso a internet.</p>
                    </div>

                    <div className={"faq-item [background:#f8fafc] [padding:35px] [border-radius:20px] [border-left:6px_solid_#2563eb] [transition:all_0.3s_ease] [display:flex] [flex-direction:column] [justify-content:center] [min-height:180px] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(0,0,0,0.05)] [&:hover]:[background:#ffffff]"}>
                        <h3 className={"[.faq-item_&]:[font-size:1.2rem] [.faq-item_&]:[color:#1e293b] [.faq-item_&]:[margin-bottom:12px] [.faq-item_&]:[display:flex] [.faq-item_&]:[align-items:center] [.faq-item_&]:[gap:12px] [.faq-item_&]:[font-weight:700]"}><i className={"bi bi-shield-check [.faq-item_h3_&]:[color:#2563eb] [.faq-item_h3_&]:[font-size:1.4rem] [.faq-item_h3_&]:[flex-shrink:0]"}></i> ¿Es segura la información?</h3>
                        <p className={"[.faq-item_&]:[font-size:1rem] [.faq-item_&]:[color:#64748b] [.faq-item_&]:[line-height:1.6] [.faq-item_&]:[margin:0]"}>La seguridad es nuestra prioridad. Utilizamos cifrado de datos y protocolos seguros para garantizar que la información personal de estudiantes y acudientes esté protegida contra accesos no autorizados.</p>
                    </div>

                    <div className={"faq-item [background:#f8fafc] [padding:35px] [border-radius:20px] [border-left:6px_solid_#2563eb] [transition:all_0.3s_ease] [display:flex] [flex-direction:column] [justify-content:center] [min-height:180px] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(0,0,0,0.05)] [&:hover]:[background:#ffffff]"}>
                        <h3 className={"[.faq-item_&]:[font-size:1.2rem] [.faq-item_&]:[color:#1e293b] [.faq-item_&]:[margin-bottom:12px] [.faq-item_&]:[display:flex] [.faq-item_&]:[align-items:center] [.faq-item_&]:[gap:12px] [.faq-item_&]:[font-weight:700]"}><i className={"bi bi-building [.faq-item_h3_&]:[color:#2563eb] [.faq-item_h3_&]:[font-size:1.4rem] [.faq-item_h3_&]:[flex-shrink:0]"}></i> ¿Puede adaptarse a varias instituciones?</h3>
                        <p className={"[.faq-item_&]:[font-size:1rem] [.faq-item_&]:[color:#64748b] [.faq-item_&]:[line-height:1.6] [.faq-item_&]:[margin:0]"}>Sí. Nuestra arquitectura permite parametrizar cupos, grados y requisitos específicos según las necesidades de cada institución educativa, ya sea pública o privada.</p>
                    </div>

                    <div className={"faq-item [background:#f8fafc] [padding:35px] [border-radius:20px] [border-left:6px_solid_#2563eb] [transition:all_0.3s_ease] [display:flex] [flex-direction:column] [justify-content:center] [min-height:180px] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(0,0,0,0.05)] [&:hover]:[background:#ffffff]"}>
                        <h3 className={"[.faq-item_&]:[font-size:1.2rem] [.faq-item_&]:[color:#1e293b] [.faq-item_&]:[margin-bottom:12px] [.faq-item_&]:[display:flex] [.faq-item_&]:[align-items:center] [.faq-item_&]:[gap:12px] [.faq-item_&]:[font-weight:700]"}><i className={"bi bi-cloud-arrow-up [.faq-item_h3_&]:[color:#2563eb] [.faq-item_h3_&]:[font-size:1.4rem] [.faq-item_h3_&]:[flex-shrink:0]"}></i> ¿Cómo se suben los documentos?</h3>
                        <p className={"[.faq-item_&]:[font-size:1rem] [.faq-item_&]:[color:#64748b] [.faq-item_&]:[line-height:1.6] [.faq-item_&]:[margin:0]"}>El sistema permite cargar archivos en formato PDF o imagen directamente desde el formulario de matrícula, eliminando la necesidad de entregar carpetas físicas en la institución.</p>
                    </div>

                    <div className={"faq-item [background:#f8fafc] [padding:35px] [border-radius:20px] [border-left:6px_solid_#2563eb] [transition:all_0.3s_ease] [display:flex] [flex-direction:column] [justify-content:center] [min-height:180px] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(0,0,0,0.05)] [&:hover]:[background:#ffffff]"}>
                        <h3 className={"[.faq-item_&]:[font-size:1.2rem] [.faq-item_&]:[color:#1e293b] [.faq-item_&]:[margin-bottom:12px] [.faq-item_&]:[display:flex] [.faq-item_&]:[align-items:center] [.faq-item_&]:[gap:12px] [.faq-item_&]:[font-weight:700]"}><i className={"bi bi-clock-history [.faq-item_h3_&]:[color:#2563eb] [.faq-item_h3_&]:[font-size:1.4rem] [.faq-item_h3_&]:[flex-shrink:0]"}></i> ¿Cuánto tiempo toma el proceso?</h3>
                        <p className={"[.faq-item_&]:[font-size:1rem] [.faq-item_&]:[color:#64748b] [.faq-item_&]:[line-height:1.6] [.faq-item_&]:[margin:0]"}>Un proceso que antes tomaba horas de fila ahora puede completarse en menos de 10 minutos desde la comodidad de tu hogar.</p>
                    </div>

                    <div className={"faq-item [background:#f8fafc] [padding:35px] [border-radius:20px] [border-left:6px_solid_#2563eb] [transition:all_0.3s_ease] [display:flex] [flex-direction:column] [justify-content:center] [min-height:180px] [&:hover]:[transform:translateY(-5px)] [&:hover]:[box-shadow:0_15px_30px_rgba(0,0,0,0.05)] [&:hover]:[background:#ffffff]"}>
                        <h3 className={"[.faq-item_&]:[font-size:1.2rem] [.faq-item_&]:[color:#1e293b] [.faq-item_&]:[margin-bottom:12px] [.faq-item_&]:[display:flex] [.faq-item_&]:[align-items:center] [.faq-item_&]:[gap:12px] [.faq-item_&]:[font-weight:700]"}><i className={"bi bi-headset [.faq-item_h3_&]:[color:#2563eb] [.faq-item_h3_&]:[font-size:1.4rem] [.faq-item_h3_&]:[flex-shrink:0]"}></i> ¿Qué pasa si cometo un error en el registro?</h3>
                        <p className={"[.faq-item_&]:[font-size:1rem] [.faq-item_&]:[color:#64748b] [.faq-item_&]:[line-height:1.6] [.faq-item_&]:[margin:0]"}>EasyMatric cuenta con un módulo de soporte y edición donde el administrador o el usuario (según el rol) puede corregir datos antes de la validación final de la matrícula.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Preguntas
