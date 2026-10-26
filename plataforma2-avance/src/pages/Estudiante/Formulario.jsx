//import React from 'react'



//importamos la imagen de el logo

const Formulario = () => {
    return (
        <div className={"cuerpo-dashboard5 [display:flex] [margin:0] [background-color:#f8fafc] [font-family:'Segoe_UI',_sans-serif]"}>
            {/* Menú lateral principal */}


            <div className={"contenido-principal5 [margin-left:260px] [width:calc(100%_-_260px)] [padding:40px] [min-height:100vh] [width:70vw]"}>
                 {/* Contenedor general del formulario */}
                <section className={"contenedor-formulario-soft5 [max-width:1800px] [margin:0_auto]"}>
                    <div className={"header-pasos5 [margin-bottom:30px] [border-left:5px_solid_#4facfe] [padding-left:20px]"}>
                        <h2 className={"[.header-pasos5_&]:[color:#1a1c2d] [.header-pasos5_&]:[font-size:1.8rem] [.header-pasos5_&]:[margin:0]"}><i className={"bi bi-person-plus-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.file-item_&]:[font-size:1.8rem] [.file-item_&]:[color:#4facfe]"}></i> Proceso de Matrícula Institucional</h2>
                        <p className={"[.header-pasos5_&]:[color:#64748b] [.header-pasos5_&]:[font-size:1rem]"}>Asegúrate de que toda la información coincida con tus documentos físicos.</p>
                    </div>
                     {/* Formulario principal */}
                    <form action="#" className={"form-matricula5 [width:100%] [max-width:1400px] [margin:0_auto] [display:flex] [flex-direction:column] [gap:30px] [padding-bottom:50px]"}>

                        <div className={"card-blanca5 [background:#ffffff] [padding:30px] [border-radius:20px] [margin-bottom:25px] [box-shadow:0_10px_25px_rgba(0,_0,_0,_0.02)] [border:1px_solid_#f1f5f9]"}>
                            <div className={"card-header5 [display:flex] [align-items:center] [gap:15px] [margin-bottom:25px] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:15px]"}>
                                <span className={"paso-numero [background:#1a1c2d] [color:#4facfe] [width:35px] [height:35px] [display:flex] [align-items:center] [justify-content:center] [border-radius:50%] [font-weight:800]"}>01</span>
                                <h3>Información Básica del Estudiante</h3>
                            </div>
                            <div className={"grid-inputs5 [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:20px]"}>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Nombres Completos</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="text" placeholder="Ej: Eduardo Silva" required />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Apellidos Completos</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="text" placeholder="Ej: Castro Pérez" required />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Tipo de Documento</label>
                                    <select className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [&:focus]:[outline:none] [&:focus]:[border-color:#4facfe] [&:focus]:[background:#ffffff] [&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)]"} required>
                                        <option value="">Seleccione...</option>
                                        <option value="ti">Tarjeta de Identidad</option>
                                        <option value="cc">Cédula de Ciudadanía</option>
                                        <option value="ce">Cédula de Extranjería</option>
                                    </select>
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Número de Documento</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="number" placeholder="123456789" required />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Fecha de Nacimiento</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="date" required />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Género</label>
                                    <select className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [&:focus]:[outline:none] [&:focus]:[border-color:#4facfe] [&:focus]:[background:#ffffff] [&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)]"} required>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                        <option value="O">Otro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={"card-blanca5 [background:#ffffff] [padding:30px] [border-radius:20px] [margin-bottom:25px] [box-shadow:0_10px_25px_rgba(0,_0,_0,_0.02)] [border:1px_solid_#f1f5f9]"}>
                            <div className="card-header">
                                <span className={"paso-numero [background:#1a1c2d] [color:#4facfe] [width:35px] [height:35px] [display:flex] [align-items:center] [justify-content:center] [border-radius:50%] [font-weight:800]"}>02</span>
                                <h3>Ubicación y Contacto</h3>
                            </div>
                            <div className={"grid-inputs5 [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:20px]"}>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Dirección de Residencia</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="text" placeholder="Calle 1 # 2-3 Barrio..." required />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Estrato Socioeconómico</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="number" min="1" max="6" placeholder="1" />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Teléfono Celular</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="tel" placeholder="300 000 0000" required />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Correo Electrónico</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="email" placeholder="usuario@correo.com" required />
                                </div>
                            </div>
                        </div>

                        <div className={"card-blanca5 [background:#ffffff] [padding:30px] [border-radius:20px] [margin-bottom:25px] [box-shadow:0_10px_25px_rgba(0,_0,_0,_0.02)] [border:1px_solid_#f1f5f9]"}>
                            <div className={"card-header5 [display:flex] [align-items:center] [gap:15px] [margin-bottom:25px] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:15px]"}>
                                <span className={"paso-numero [background:#1a1c2d] [color:#4facfe] [width:35px] [height:35px] [display:flex] [align-items:center] [justify-content:center] [border-radius:50%] [font-weight:800]"}>03</span>
                                <h3>Información del Acudiente</h3>
                            </div>
                            <div className={"grid-inputs5 [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:20px]"}>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Nombre del Acudiente</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="text" placeholder="Padre, madre o tutor legal" />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Parentesco</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="text" placeholder="Ej: Madre" />
                                </div>
                                <div className={"grupo-input5 [display:flex] [flex-direction:column] [gap:8px]"}>
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>Teléfono de Emergencia</label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="tel" placeholder="300 000 0000" />
                                </div>
                            </div>
                        </div>

                        <div className={"card-blanca5 [background:#ffffff] [padding:30px] [border-radius:20px] [margin-bottom:25px] [box-shadow:0_10px_25px_rgba(0,_0,_0,_0.02)] [border:1px_solid_#f1f5f9]"}>
                            <div className={"card-header5 [display:flex] [align-items:center] [gap:15px] [margin-bottom:25px] [border-bottom:1px_solid_#f1f5f9] [padding-bottom:15px]"}>
                                <span className={"paso-numero [background:#1a1c2d] [color:#4facfe] [width:35px] [height:35px] [display:flex] [align-items:center] [justify-content:center] [border-radius:50%] [font-weight:800]"}>04</span>
                                <h3>Documentación Digital</h3>
                            </div>
                            <div className={"upload-area [display:grid] [grid-template-columns:repeat(auto-fit,_minmax(200px,_1fr))] [gap:15px]"}>
                                <div className="file-item">
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"} for="doc-identidad">
                                        <i className={"bi bi-person-vcard [.menu-lista_li_a_&]:[font-size:1.2rem] [.file-item_&]:[font-size:1.8rem] [.file-item_&]:[color:#4facfe]"}></i>
                                        <span>Documento de Identidad (PDF/JPG)</span>
                                    </label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="file" id="doc-identidad" accept=".pdf, .jpg, .png" />
                                </div>
                                <div className="file-item">
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"} for="doc-notas">
                                        <i className={"bi bi-file-earmark-medical [.menu-lista_li_a_&]:[font-size:1.2rem] [.file-item_&]:[font-size:1.8rem] [.file-item_&]:[color:#4facfe]"}></i>
                                        <span>Certificado Médico / Notas</span>
                                    </label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="file" id="doc-notas" accept=".pdf" />
                                </div>
                                <div className="file-item">
                                    <label className={"[.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"} for="doc-foto">
                                        <i className={"bi bi-camera [.menu-lista_li_a_&]:[font-size:1.2rem] [.file-item_&]:[font-size:1.8rem] [.file-item_&]:[color:#4facfe]"}></i>
                                        <span>Foto Tipo Documento</span>
                                    </label>
                                    <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="file" id="doc-foto" accept="image/*" />
                                </div>
                            </div>
                        </div>

                        <div className="footer-form">
                            <label className={"check-terminos [.grupo-input5_&]:[font-weight:600] [.grupo-input5_&]:[color:#475569] [.grupo-input5_&]:[font-size:0.9rem] [.file-item_&]:[background:#f8fafc] [.file-item_&]:[border:2px_dashed_#cbd5e1] [.file-item_&]:[padding:25px_15px] [.file-item_&]:[border-radius:15px] [.file-item_&]:[display:flex] [.file-item_&]:[flex-direction:column] [.file-item_&]:[align-items:center] [.file-item_&]:[gap:10px] [.file-item_&]:[cursor:pointer] [.file-item_&]:[transition:0.3s] [.file-item_&:hover]:[border-color:#4facfe] [.file-item_&:hover]:[background:#f0f9ff]"}>
                                <input className={"[.grupo-input5_&]:[padding:12px_15px] [.grupo-input5_&]:[border:1.5px_solid_#e2e8f0] [.grupo-input5_&]:[border-radius:12px] [.grupo-input5_&]:[background:#f8fafc] [.grupo-input5_&]:[color:#1e293b] [.grupo-input5_&]:[font-size:1rem] [.grupo-input5_&]:[transition:all_0.3s_ease] [.grupo-input5_&:focus]:[outline:none] [.grupo-input5_&:focus]:[border-color:#4facfe] [.grupo-input5_&:focus]:[background:#ffffff] [.grupo-input5_&:focus]:[box-shadow:0_0_0_4px_rgba(79,_172,_254,_0.1)] [.file-item_&[type='file']]:[display:none]"} type="checkbox" required />
                                Certifico que la información ingresada es verídica.
                            </label>
                            <button type="submit" className={"btn-primario-grande [width:100%] [padding:18px] [background:linear-gradient(135deg,_#1a1c2d,_#2a2d45)] [color:white] [border:none] [border-radius:15px] [font-size:1.1rem] [font-weight:700] [cursor:pointer] [transition:0.4s] [&:hover]:[transform:translateY(-3px)] [&:hover]:[box-shadow:0_10px_20px_rgba(0,0,0,0.1)]"}>
                                Finalizar y Enviar Solicitud <i className={"bi bi-send-fill [.menu-lista_li_a_&]:[font-size:1.2rem] [.file-item_&]:[font-size:1.8rem] [.file-item_&]:[color:#4facfe]"}></i>
                            </button>
                        </div>
                    </form>
                </section>
            </div>

        </div>
    )
}

export default Formulario
