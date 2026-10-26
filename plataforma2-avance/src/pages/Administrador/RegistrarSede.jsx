import { useState, useRef } from 'react';




const RegistrarSede = () => {

    const [logo, setLogo] = useState(null);
    const [fotoRector, setFotoRector] = useState(null);
    const [fotoFachada, setFotoFachada] = useState(null);
    const [docRequisitos, setDocRequisitos] = useState(null);
    const [docAdicional, setDocAdicional] = useState(null);

    // Estado para añadir campos de archivos dinámicamente
    const [camposExtra, setCamposExtra] = useState([]);

    const logoInputRef = useRef(null);
    const rectorInputRef = useRef(null);
    const fachadaInputRef = useRef(null);
    const requisitosInputRef = useRef(null);
    const adicionalInputRef = useRef(null);

    const handleFileSelect = (e, setFileState) => {
        const file = e.target.files[0];
        if (file) {
            // Si es imagen, crea URL de previsualización. Si es otro archivo, guarda el nombre.
            if (file.type.startsWith("image/")) {
                setFileState({
                    preview: URL.createObjectURL(file),
                    name: file.name
                });
            } else {
                setFileState({
                    preview: null,
                    name: file.name
                });
            }
        }
    };

    // Función para añadir dinámicamente una nueva caja de carga
    const handleAgregarCampo = () => {
        const nuevoId = Date.now();
        setCamposExtra(prev => [
            ...prev,
            { id: nuevoId, nombre: `Documento Extra ${prev.length + 1}`, archivo: null }
        ]);
    };

    // Subir archivo a un campo dinámico
    const handleFileExtraChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setCamposExtra(prev =>
                prev.map(item =>
                    item.id === id
                        ? {
                            ...item,
                            archivo: {
                                preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
                                name: file.name
                            }
                        }
                        : item
                )
            );
        }
    };

    // Guardar o procesar todo el formulario
    const handleGuardarTodo = (e) => {
        e.preventDefault();
        alert("¡Datos e imágenes listos para ser procesados/guardados!");
    };

    return (
        <div>
            {/* Menú lateral de navegación */}


            <div className={"contenido-principal-sede1 [margin-left:260px] [padding:40px] [background-color:var(--gris-fondo)] [min-height:100vh]"}>
                <header className="header-registro-sede1">
                    <h1 className={"[.header-registro-sede1_&]:[color:var(--azul-navy)] [.header-registro-sede1_&]:[font-size:2rem] [.header-registro-sede1_&]:[margin:0]"}>Registra tu Institución</h1>
                    <p className={"[.header-registro-sede1_&]:[color:#64748b] [.header-registro-sede1_&]:[margin-bottom:30px]"}>Configura los detalles básicos para comenzar a recibir matrículas.</p>
                </header>

                <section className="seccion-pasos">
                    <div className={"grid-cartas-top [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:25px] [margin-bottom:30px]"}>
                        {/* 1. Datos de Institución */}
                        <div className={"carta-soft [background:var(--blanco)] [padding:30px] [border-radius:20px] [box-shadow:var(--sombra-suave)] [text-align:center] [position:relative] [border:1px_solid_#f1f5f9]"}>
                            <div className={"icono-flotante [font-size:2rem] [color:var(--cyan-em)] [margin-bottom:15px]"}><i className={"bi bi-building-add [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i></div>
                            <h3 className={"[.carta-soft_&]:[font-size:1.1rem] [.carta-soft_&]:[color:var(--azul-navy)] [.carta-soft_&]:[margin-bottom:15px] [.galeria-registro_&]:[color:#1a1c2d] [.galeria-registro_&]:[margin-bottom:5px] [.galeria-registro_&]:[display:flex] [.galeria-registro_&]:[align-items:center] [.galeria-registro_&]:[gap:10px]"}>Datos de Institución</h3>
                            <input type="text" placeholder="Nombre de la Institución" className={"input-soft [width:100%] [padding:12px] [border-radius:10px] [border:1px_solid_#e2e8f0] [background:#f8fafc] [margin-bottom:15px] [outline:none] [.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} />

                            <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"}
                                type="file"
                                accept="image/*"
                                ref={logoInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileSelect(e, setLogo)}
                            />

                            {logo && logo.preview && (
                                <img src={logo.preview} alt="Logo Prev" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', margin: '8px auto' }} />
                            )}

                            <button type="button" className={"btn-subir [background:#f1f5f9] [border:none] [padding:10px_15px] [border-radius:10px] [color:var(--azul-navy)] [font-weight:600] [cursor:pointer] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white]"} onClick={() => logoInputRef.current.click()}>
                                <i className={"bi bi-cloud-arrow-up [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i> {logo ? logo.name : "Logo Institucional"}
                            </button>
                        </div>

                        {/* 2. Descripción General */}
                        <div className={"carta-soft description [background:var(--blanco)] [padding:30px] [border-radius:20px] [box-shadow:var(--sombra-suave)] [text-align:center] [position:relative] [border:1px_solid_#f1f5f9]"}>
                            <h3 className={"[.carta-soft_&]:[font-size:1.1rem] [.carta-soft_&]:[color:var(--azul-navy)] [.carta-soft_&]:[margin-bottom:15px] [.galeria-registro_&]:[color:#1a1c2d] [.galeria-registro_&]:[margin-bottom:5px] [.galeria-registro_&]:[display:flex] [.galeria-registro_&]:[align-items:center] [.galeria-registro_&]:[gap:10px]"}>Descripción General</h3>
                            <textarea className={"[width:100%] [padding:12px] [border-radius:10px] [border:1px_solid_#e2e8f0] [background:#f8fafc] [margin-bottom:15px] [outline:none] [height:100px] [resize:none]"} placeholder="Describe la visión, misión y valores..."></textarea>
                        </div>

                        {/* 3. Datos del Rector */}
                        <div className={"carta-soft [background:var(--blanco)] [padding:30px] [border-radius:20px] [box-shadow:var(--sombra-suave)] [text-align:center] [position:relative] [border:1px_solid_#f1f5f9]"}>
                            <div className={"icono-flotante [font-size:2rem] [color:var(--cyan-em)] [margin-bottom:15px]"}><i className={"bi bi-person-workspace [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i></div>
                            <h3 className={"[.carta-soft_&]:[font-size:1.1rem] [.carta-soft_&]:[color:var(--azul-navy)] [.carta-soft_&]:[margin-bottom:15px] [.galeria-registro_&]:[color:#1a1c2d] [.galeria-registro_&]:[margin-bottom:5px] [.galeria-registro_&]:[display:flex] [.galeria-registro_&]:[align-items:center] [.galeria-registro_&]:[gap:10px]"}>Datos del Rector</h3>
                            <input type="text" placeholder="Nombre completo" className={"input-soft [width:100%] [padding:12px] [border-radius:10px] [border:1px_solid_#e2e8f0] [background:#f8fafc] [margin-bottom:15px] [outline:none] [.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} />

                            <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"}
                                type="file"
                                accept="image/*"
                                ref={rectorInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileSelect(e, setFotoRector)}
                            />

                            {fotoRector && fotoRector.preview && (
                                <img src={fotoRector.preview} alt="Rector Prev" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', margin: '8px auto' }} />
                            )}

                            <button type="button" className={"btn-subir [background:#f1f5f9] [border:none] [padding:10px_15px] [border-radius:10px] [color:var(--azul-navy)] [font-weight:600] [cursor:pointer] [transition:0.3s] [&:hover]:[background:var(--cyan-em)] [&:hover]:[color:white]"} onClick={() => rectorInputRef.current.click()}>
                                <i className={"bi bi-camera [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i> {fotoRector ? fotoRector.name : "Foto del Rector"}
                            </button>
                        </div>
                    </div>

                    <div className={"bloque-inferior [display:grid] [grid-template-columns:1.5fr_1fr] [gap:30px]"}>
                        {/* Información de Contacto */}
                        <div className={"formulario-detalles [background:white] [padding:30px] [border-radius:25px] [box-shadow:var(--sombra-suave)]"}>
                            <h3 className={"[.carta-soft_&]:[font-size:1.1rem] [.carta-soft_&]:[color:var(--azul-navy)] [.carta-soft_&]:[margin-bottom:15px] [.galeria-registro_&]:[color:#1a1c2d] [.galeria-registro_&]:[margin-bottom:5px] [.galeria-registro_&]:[display:flex] [.galeria-registro_&]:[align-items:center] [.galeria-registro_&]:[gap:10px]"}><i className={"bi bi-info-circle [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i> Información de Contacto</h3>
                            <div className={"grid-inputs [display:grid] [grid-template-columns:1fr_1fr] [gap:15px] [margin:20px_0]"}>
                                <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} type="text" placeholder="Dirección" />
                                <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} type="text" placeholder="Teléfono" />
                                <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} type="email" placeholder="Correo Electrónico" />
                                <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} type="text" placeholder="Ciudad / Municipio" />
                            </div>

                            <div className={"fechas-calendario [display:flex] [gap:20px] [margin-top:20px]"}>
                                <div className={"fecha-box [flex:1]"}>
                                    <label className={"[.fecha-box_&]:[display:block] [.fecha-box_&]:[font-size:0.85rem] [.fecha-box_&]:[color:#64748b] [.fecha-box_&]:[margin-bottom:5px]"}>Inicio de Clases</label>
                                    <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} type="date" />
                                </div>
                                <div className={"fecha-box [flex:1]"}>
                                    <label className={"[.fecha-box_&]:[display:block] [.fecha-box_&]:[font-size:0.85rem] [.fecha-box_&]:[color:#64748b] [.fecha-box_&]:[margin-bottom:5px]"}>Fin de Clases</label>
                                    <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"} type="date" />
                                </div>
                            </div>
                        </div>

                        {/* Galería e Institución */}
                        <div className={"galeria-registro [background:white] [padding:30px] [border-radius:25px] [box-shadow:var(--sombra-suave)] [border-radius:20px] [box-shadow:0_10px_30px_rgba(0,0,0,0.05)]"}>
                            <h3 className={"[.carta-soft_&]:[font-size:1.1rem] [.carta-soft_&]:[color:var(--azul-navy)] [.carta-soft_&]:[margin-bottom:15px] [.galeria-registro_&]:[color:#1a1c2d] [.galeria-registro_&]:[margin-bottom:5px] [.galeria-registro_&]:[display:flex] [.galeria-registro_&]:[align-items:center] [.galeria-registro_&]:[gap:10px]"}><i className={"bi bi-images [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i> Galería e Institución</h3>
                            <p className={"instruccion-galeria [.header-registro-sede1_&]:[color:#64748b] [.header-registro-sede1_&]:[margin-bottom:30px] [font-size:0.9rem] [color:#64748b] [margin-bottom:25px]"}>Sube fotos de la fachada y documentos de requisitos legales.</p>

                            <div className={"grid-fotos [display:grid] [grid-template-columns:repeat(auto-fill,_minmax(180px,_1fr))] [gap:20px] [margin-bottom:30px]"}>
                                {/* Requisitos de Matrícula */}
                                <div className="file-item">
                                    <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"}
                                        type="file"
                                        accept="image/*,application/pdf"
                                        ref={requisitosInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileSelect(e, setDocRequisitos)}
                                    />
                                    <div className={"caja-subida [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [height:150px] [border:2px_dashed_#cbd5e1] [border-radius:15px] [cursor:pointer] [transition:all_0.3s_ease] [text-align:center] [padding:15px] [&:hover]:[border-color:#4facfe] [&:hover]:[background:#f0f9ff] [&:hover]:[color:#4facfe]"} onClick={() => requisitosInputRef.current.click()} style={{ cursor: 'pointer' }}>
                                        <i className={"bi bi-file-earmark-arrow-up [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i>
                                        <span className={"[.caja-subida_&]:[font-weight:600] [.caja-subida_&]:[font-size:0.85rem]"}>{docRequisitos ? docRequisitos.name : "Requisitos de Matrícula"}</span>
                                        <small className={"[.caja-subida_&]:[font-size:0.7rem] [.caja-subida_&]:[opacity:0.7]"}>{docRequisitos ? "Archivo subido" : "Formatos: JPG, PNG, PDF"}</small>
                                    </div>
                                </div>

                                {/* Fachada Principal */}
                                <div className="file-item">
                                    <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"}
                                        type="file"
                                        accept="image/*"
                                        ref={fachadaInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileSelect(e, setFotoFachada)}
                                    />
                                    <div
                                        className={"caja-foto fachada [position:relative] [height:150px] [border-radius:15px] [overflow:hidden] [background:#f1f5f9] [display:flex] [align-items:center] [justify-content:center] [background-image:url('../../assets/cole.5.jpg')] [background-size:cover] [background-position:center]"}
                                        onClick={() => fachadaInputRef.current.click()}
                                        style={{
                                            backgroundImage: fotoFachada && fotoFachada.preview ? `url(${fotoFachada.preview})` : undefined,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div className={"overlay-foto [position:absolute] [inset:0] [background:rgba(26,_28,_45,_0.6)] [color:white] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [opacity:0] [transition:0.3s] [cursor:pointer] [.caja-foto:hover_&]:[opacity:1]"}>
                                            <i className={"bi bi-pencil [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i>
                                            <span className={"[.caja-subida_&]:[font-weight:600] [.caja-subida_&]:[font-size:0.85rem]"}>{fotoFachada ? "Cambiar Fachada" : "Subir Fachada"}</span>
                                        </div>
                                        <span className={"label-flotante [.caja-subida_&]:[font-weight:600] [.caja-subida_&]:[font-size:0.85rem] [position:absolute] [bottom:10px] [left:10px] [background:white] [padding:2px_8px] [border-radius:5px] [font-size:0.7rem] [font-weight:700] [color:#1a1c2d]"}>Fachada Principal</span>
                                    </div>
                                </div>

                                {/* Documentos Extra */}
                                <div className="file-item">
                                    <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"}
                                        type="file"
                                        accept="image/*,application/pdf"
                                        ref={adicionalInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileSelect(e, setDocAdicional)}
                                    />
                                    <div className={"caja-subida [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [height:150px] [border:2px_dashed_#cbd5e1] [border-radius:15px] [cursor:pointer] [transition:all_0.3s_ease] [text-align:center] [padding:15px] [&:hover]:[border-color:#4facfe] [&:hover]:[background:#f0f9ff] [&:hover]:[color:#4facfe]"} onClick={() => adicionalInputRef.current.click()} style={{ cursor: 'pointer' }}>
                                        <i className={"bi bi-file-earmark-arrow-up [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i>
                                        <span className={"[.caja-subida_&]:[font-weight:600] [.caja-subida_&]:[font-size:0.85rem]"}>{docAdicional ? docAdicional.name : "Documentos Extra"}</span>
                                        <small className={"[.caja-subida_&]:[font-size:0.7rem] [.caja-subida_&]:[opacity:0.7]"}>{docAdicional ? "Archivo subido" : "Formatos: JPG, PNG, PDF"}</small>
                                    </div>
                                </div>

                                {/* Campos dinámicos agregados por el usuario */}
                                {camposExtra.map((campo) => (
                                    <div className="file-item" key={campo.id}>
                                        <input className={"[.grid-inputs_&]:[padding:12px] [.grid-inputs_&]:[border-radius:10px] [.grid-inputs_&]:[border:1px_solid_#e2e8f0] [.fecha-box_&]:[width:100%] [.fecha-box_&]:[padding:10px] [.fecha-box_&]:[border-radius:10px] [.fecha-box_&]:[border:1px_solid_#e2e8f0]"}
                                            type="file"
                                            accept="image/*,application/pdf"
                                            id={`file-extra-${campo.id}`}
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileExtraChange(campo.id, e)}
                                        />
                                        <label htmlFor={`file-extra-${campo.id}`} className={"caja-subida [.fecha-box_&]:[display:block] [.fecha-box_&]:[font-size:0.85rem] [.fecha-box_&]:[color:#64748b] [.fecha-box_&]:[margin-bottom:5px] [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [height:150px] [border:2px_dashed_#cbd5e1] [border-radius:15px] [cursor:pointer] [transition:all_0.3s_ease] [text-align:center] [padding:15px] [&:hover]:[border-color:#4facfe] [&:hover]:[background:#f0f9ff] [&:hover]:[color:#4facfe]"} style={{ cursor: 'pointer' }}>
                                            <i className={"bi bi-file-earmark-arrow-up [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i>
                                            <span className={"[.caja-subida_&]:[font-weight:600] [.caja-subida_&]:[font-size:0.85rem]"}>{campo.archivo ? campo.archivo.name : campo.nombre}</span>
                                            <small className={"[.caja-subida_&]:[font-size:0.7rem] [.caja-subida_&]:[opacity:0.7]"}>{campo.archivo ? "Archivo cargado" : "Click para subir"}</small>
                                        </label>
                                    </div>
                                ))}

                                {/* Botón para Añadir Más Campos */}
                                <div className="file-item">
                                    <div className={"caja-foto agregar [position:relative] [height:150px] [border-radius:15px] [overflow:hidden] [background:#f1f5f9] [display:flex] [align-items:center] [justify-content:center] [border:2px_solid_#d6e3ef] [color:#94a3b8] [flex-direction:column] [gap:10px] [cursor:pointer] [&:hover]:[background:#f1f5f9] [&:hover]:[color:#4facfe]"} onClick={handleAgregarCampo} style={{ cursor: 'pointer' }}>
                                        <i className={"bi bi-plus-circle-dotted [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i>
                                        <span className={"[.caja-subida_&]:[font-weight:600] [.caja-subida_&]:[font-size:0.85rem]"}>Añadir Campo</span>
                                    </div>
                                </div>
                            </div>

                            <button className={"btn-guardar-todo [width:100%] [background:linear-gradient(135deg,_#1a1c2d_0%,_#334155_100%)] [color:#4facfe] [border:none] [padding:15px] [border-radius:12px] [font-weight:700] [cursor:pointer] [display:flex] [align-items:center] [justify-content:center] [gap:10px] [transition:0.3s] [&:hover]:[transform:translateY(-3px)] [&:hover]:[box-shadow:0_5px_15px_rgba(0,0,0,0.2)] [&:hover]:[filter:brightness(1.2)]"} onClick={handleGuardarTodo}>
                                <i className={"bi bi-cloud-check [.caja-subida_&]:[font-size:2rem] [.caja-subida_&]:[margin-bottom:10px]"}></i> Guardar y Finalizar
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RegistrarSede;