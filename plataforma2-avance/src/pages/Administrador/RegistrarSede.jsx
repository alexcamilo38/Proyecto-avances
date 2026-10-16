import { useState, useRef } from 'react';
import "./RegistrarSede.css";
import { Link } from "react-router-dom";
import logoblanco from '../../assets/LogoBlanco.png';

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
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/RegistrarSede"><i className="bi bi-bank"></i> <span>Instituciones</span></Link></li>
                    <li><Link to="/RevicionD"><i className="bi bi-journal-bookmark"></i> <span>Matrículas</span></Link></li>
                    <li><Link to="/Matriculados"><i className="bi bi-people"></i> <span>Estudiantes</span></Link></li>
                    <li><Link to="/Roles"><i className="bi bi-shield-lock"></i> <span>Roles</span></Link></li>
                    <li><Link to="/NotasCa"><i className="bi bi-folder2-open"></i> <span>Catálogos</span></Link></li>
                    <li><Link to="/PerfilAd"><i className="bi bi-person-badge"></i><span>Mi Perfil</span></Link></li>
                </ul>
                <div className="menu-pie">
                    <Link to="/" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ADMINISTRADOR</span>
                    </div>
                </div>
            </nav>

            <main className="contenido-principal-sede1">
                <header className="header-registro-sede1">
                    <h1>Registra tu Institución</h1>
                    <p>Configura los detalles básicos para comenzar a recibir matrículas.</p>
                </header>

                <section className="seccion-pasos">
                    <div className="grid-cartas-top">
                        {/* 1. Datos de Institución */}
                        <div className="carta-soft">
                            <div className="icono-flotante"><i className="bi bi-building-add"></i></div>
                            <h3>Datos de Institución</h3>
                            <input type="text" placeholder="Nombre de la Institución" className="input-soft" />

                            <input
                                type="file"
                                accept="image/*"
                                ref={logoInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileSelect(e, setLogo)}
                            />

                            {logo && logo.preview && (
                                <img src={logo.preview} alt="Logo Prev" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', margin: '8px auto' }} />
                            )}

                            <button type="button" className="btn-subir" onClick={() => logoInputRef.current.click()}>
                                <i className="bi bi-cloud-arrow-up"></i> {logo ? logo.name : "Logo Institucional"}
                            </button>
                        </div>

                        {/* 2. Descripción General */}
                        <div className="carta-soft description">
                            <h3>Descripción General</h3>
                            <textarea placeholder="Describe la visión, misión y valores..."></textarea>
                        </div>

                        {/* 3. Datos del Rector */}
                        <div className="carta-soft">
                            <div className="icono-flotante"><i className="bi bi-person-workspace"></i></div>
                            <h3>Datos del Rector</h3>
                            <input type="text" placeholder="Nombre completo" className="input-soft" />

                            <input
                                type="file"
                                accept="image/*"
                                ref={rectorInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileSelect(e, setFotoRector)}
                            />

                            {fotoRector && fotoRector.preview && (
                                <img src={fotoRector.preview} alt="Rector Prev" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', margin: '8px auto' }} />
                            )}

                            <button type="button" className="btn-subir" onClick={() => rectorInputRef.current.click()}>
                                <i className="bi bi-camera"></i> {fotoRector ? fotoRector.name : "Foto del Rector"}
                            </button>
                        </div>
                    </div>

                    <div className="bloque-inferior">
                        {/* Información de Contacto */}
                        <div className="formulario-detalles">
                            <h3><i className="bi bi-info-circle"></i> Información de Contacto</h3>
                            <div className="grid-inputs">
                                <input type="text" placeholder="Dirección" />
                                <input type="text" placeholder="Teléfono" />
                                <input type="email" placeholder="Correo Electrónico" />
                                <input type="text" placeholder="Ciudad / Municipio" />
                            </div>

                            <div className="fechas-calendario">
                                <div className="fecha-box">
                                    <label>Inicio de Clases</label>
                                    <input type="date" />
                                </div>
                                <div className="fecha-box">
                                    <label>Fin de Clases</label>
                                    <input type="date" />
                                </div>
                            </div>
                        </div>

                        {/* Galería e Institución */}
                        <div className="galeria-registro">
                            <h3><i className="bi bi-images"></i> Galería e Institución</h3>
                            <p className="instruccion-galeria">Sube fotos de la fachada y documentos de requisitos legales.</p>

                            <div className="grid-fotos">
                                {/* Requisitos de Matrícula */}
                                <div className="file-item">
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        ref={requisitosInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileSelect(e, setDocRequisitos)}
                                    />
                                    <div className="caja-subida" onClick={() => requisitosInputRef.current.click()} style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-file-earmark-arrow-up"></i>
                                        <span>{docRequisitos ? docRequisitos.name : "Requisitos de Matrícula"}</span>
                                        <small>{docRequisitos ? "Archivo subido" : "Formatos: JPG, PNG, PDF"}</small>
                                    </div>
                                </div>

                                {/* Fachada Principal */}
                                <div className="file-item">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fachadaInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileSelect(e, setFotoFachada)}
                                    />
                                    <div
                                        className="caja-foto fachada"
                                        onClick={() => fachadaInputRef.current.click()}
                                        style={{
                                            backgroundImage: fotoFachada && fotoFachada.preview ? `url(${fotoFachada.preview})` : undefined,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div className="overlay-foto">
                                            <i className="bi bi-pencil"></i>
                                            <span>{fotoFachada ? "Cambiar Fachada" : "Subir Fachada"}</span>
                                        </div>
                                        <span className="label-flotante">Fachada Principal</span>
                                    </div>
                                </div>

                                {/* Documentos Extra */}
                                <div className="file-item">
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        ref={adicionalInputRef}
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileSelect(e, setDocAdicional)}
                                    />
                                    <div className="caja-subida" onClick={() => adicionalInputRef.current.click()} style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-file-earmark-arrow-up"></i>
                                        <span>{docAdicional ? docAdicional.name : "Documentos Extra"}</span>
                                        <small>{docAdicional ? "Archivo subido" : "Formatos: JPG, PNG, PDF"}</small>
                                    </div>
                                </div>

                                {/* Campos dinámicos agregados por el usuario */}
                                {camposExtra.map((campo) => (
                                    <div className="file-item" key={campo.id}>
                                        <input
                                            type="file"
                                            accept="image/*,application/pdf"
                                            id={`file-extra-${campo.id}`}
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileExtraChange(campo.id, e)}
                                        />
                                        <label htmlFor={`file-extra-${campo.id}`} className="caja-subida" style={{ cursor: 'pointer' }}>
                                            <i className="bi bi-file-earmark-arrow-up"></i>
                                            <span>{campo.archivo ? campo.archivo.name : campo.nombre}</span>
                                            <small>{campo.archivo ? "Archivo cargado" : "Click para subir"}</small>
                                        </label>
                                    </div>
                                ))}

                                {/* Botón para Añadir Más Campos */}
                                <div className="file-item">
                                    <div className="caja-foto agregar" onClick={handleAgregarCampo} style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-plus-circle-dotted"></i>
                                        <span>Añadir Campo</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-guardar-todo" onClick={handleGuardarTodo}>
                                <i className="bi bi-cloud-check"></i> Guardar y Finalizar
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default RegistrarSede;