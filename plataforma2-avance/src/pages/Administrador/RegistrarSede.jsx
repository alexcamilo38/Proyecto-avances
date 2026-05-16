//import React from 'react'
import "./RegistrarSede.css"
// Importación de rutas de React Router
import { Link } from "react-router-dom"
// Importación del logo institucional
import logoblanco from '../../assets/LogoBlanco.png'
const RegistrarSede = () => {
    return (
        <div>
            {/* Menú lateral de navegación */}
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                {/* Lista de enlaces del menú */}
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/RegistrarSede"><i className="bi bi-bank"></i> <span>Instituciones</span></Link></li>
                    <li><Link to="/RevicionD"><i className="bi bi-journal-bookmark"></i> <span>Matrículas</span></Link></li>
                    <li><Link to="/Matriculados"><i className="bi bi-people"></i> <span>Estudiantes</span></Link></li>
                    <li><Link to="/Roles" ><i className="bi bi-shield-lock"></i> <span>Roles</span></Link></li>
                    <li><Link to="/NotasCa"><i className="bi bi-folder2-open"></i> <span>Catálogos</span></Link></li>
                    <li><Link to="/PerfilAd" ><i className="bi bi-person-badge"></i><span>Mi Perfil</span></Link></li>
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
                {/* Sección principal del formulario */}
                <section className="seccion-pasos">
                    <div className="grid-cartas-top">
                        <div className="carta-soft">
                            <div className="icono-flotante"><i className="bi bi-building-add"></i></div>
                            <h3>Datos de Institución</h3>
                            <input type="text" placeholder="Nombre de la Institución" className="input-soft" />
                            <button className="btn-subir"><i className="bi bi-cloud-arrow-up"></i> Logo Institucional</button>
                        </div>

                        <div className="carta-soft description">
                            <h3>Descripción General</h3>
                            <textarea placeholder="Describe la visión, misión y valores..."></textarea>
                        </div>

                        <div className="carta-soft">
                            <div className="icono-flotante"><i className="bi bi-person-workspace"></i></div>
                            <h3>Datos del Rector</h3>
                            <input type="text" placeholder="Nombre completo" className="input-soft" />
                            <button className="btn-subir"><i className="bi bi-camera"></i> Foto del Rector</button>
                        </div>
                    </div>

                    <div className="bloque-inferior">
                        <div className="formulario-detalles">
                            <h3><i className="bi bi-info-circle"></i> Información de Contacto</h3>
                            <div className="grid-inputs">
                                {/* Inputs de contacto */}
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

                        <div className="galeria-registro">
                            <h3><i className="bi bi-images"></i> Galería e Institución</h3>
                            <p className="instruccion-galeria">Sube fotos de la fachada y documentos de requisitos legales.</p>

                            <div className="grid-fotos">
                                <div className="file-item">
                                    <input type="file" id="file-requisitos" accept="image/*" className="input-oculto" />
                                    <label for="file-requisitos" className="caja-subida">
                                        <i className="bi bi-file-earmark-arrow-up"></i>
                                        <span>Requisitos de Matrícula</span>
                                        <small>Formatos: JPG, PNG</small>
                                    </label>
                                </div>

                                <div className="file-item">
                                    <div className="caja-foto fachada">
                                        <div className="overlay-foto">
                                            <i className="bi bi-pencil"></i>
                                            <span>Cambiar Fachada</span>
                                        </div>
                                        <span className="label-flotante">Fachada Principal</span>
                                    </div>
                                </div>
                                {/* Subir documentos extra */}
                                <div className="file-item">
                                    <input type="file" id="file-adicional" accept="image/*" className="input-oculto" />
                                    <label for="file-adicional" className="caja-subida">
                                        <i className="bi bi-file-earmark-arrow-up"></i>
                                        <span>Documentos Extra</span>
                                        <small>Formatos: JPG, PNG</small>
                                    </label>
                                </div>

                                <div className="file-item">
                                    <div className="caja-foto agregar">
                                        <i className="bi bi-plus-circle-dotted"></i>
                                        <span>Añadir Campo</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-guardar-todo">
                                <i className="bi bi-cloud-check"></i> Guardar y Finalizar
                            </button>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default RegistrarSede
