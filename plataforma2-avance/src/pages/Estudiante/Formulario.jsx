//import React from 'react'
import { Link } from "react-router-dom"
import "./Menu.css"
import "./Formulario.css"
const Formulario = () => {
    return (
        <div className="cuerpo-dashboard5">
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src="img/logo.png" alt="EasyMatric" className="logo-img" />
                </div>

                <ul className="menu-lista">
                    <li>
                        <Link to="/">
                            <i className="bi bi-house-door"></i>
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Colegios">
                            <i className="bi bi-bank"></i>
                            <span>Instituciones</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/MatriculasE">
                            <i className="bi bi-journal-bookmark"></i>
                            <span>Mis Matrículas</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/PerfilUsuario" className="activo">
                            <i className="bi bi-person-badge"></i>
                            <span>Mi Perfil</span>
                        </Link>
                    </li>
                </ul>

                <div className="menu-pie">
                    <Link to="/" className="enlace-salir">
                        <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
                    </Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ESTUDIANTE</span>
                    </div>
                </div>
            </nav>

            <main className="contenido-principal5">
                <section className="contenedor-formulario-soft5">
                    <div className="header-pasos5">
                        <h2><i className="bi bi-person-plus-fill"></i> Proceso de Matrícula Institucional</h2>
                        <p>Asegúrate de que toda la información coincida con tus documentos físicos.</p>
                    </div>

                    <form action="#" className="form-matricula5">

                        <div className="card-blanca5">
                            <div className="card-header5">
                                <span className="paso-numero">01</span>
                                <h3>Información Básica del Estudiante</h3>
                            </div>
                            <div className="grid-inputs5">
                                <div className="grupo-input5">
                                    <label>Nombres Completos</label>
                                    <input type="text" placeholder="Ej: Eduardo Silva" required />
                                </div>
                                <div className="grupo-input5">
                                    <label>Apellidos Completos</label>
                                    <input type="text" placeholder="Ej: Castro Pérez" required />
                                </div>
                                <div className="grupo-input5">
                                    <label>Tipo de Documento</label>
                                    <select required>
                                        <option value="">Seleccione...</option>
                                        <option value="ti">Tarjeta de Identidad</option>
                                        <option value="cc">Cédula de Ciudadanía</option>
                                        <option value="ce">Cédula de Extranjería</option>
                                    </select>
                                </div>
                                <div className="grupo-input5">
                                    <label>Número de Documento</label>
                                    <input type="number" placeholder="123456789" required />
                                </div>
                                <div className="grupo-input5">
                                    <label>Fecha de Nacimiento</label>
                                    <input type="date" required />
                                </div>
                                <div className="grupo-input5">
                                    <label>Género</label>
                                    <select required>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                        <option value="O">Otro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card-blanca5">
                            <div className="card-header">
                                <span className="paso-numero">02</span>
                                <h3>Ubicación y Contacto</h3>
                            </div>
                            <div className="grid-inputs5">
                                <div className="grupo-input5">
                                    <label>Dirección de Residencia</label>
                                    <input type="text" placeholder="Calle 1 # 2-3 Barrio..." required />
                                </div>
                                <div className="grupo-input5">
                                    <label>Estrato Socioeconómico</label>
                                    <input type="number" min="1" max="6" placeholder="1" />
                                </div>
                                <div className="grupo-input5">
                                    <label>Teléfono Celular</label>
                                    <input type="tel" placeholder="300 000 0000" required />
                                </div>
                                <div className="grupo-input5">
                                    <label>Correo Electrónico</label>
                                    <input type="email" placeholder="usuario@correo.com" required />
                                </div>
                            </div>
                        </div>

                        <div className="card-blanca5">
                            <div className="card-header5">
                                <span className="paso-numero">03</span>
                                <h3>Información del Acudiente</h3>
                            </div>
                            <div className="grid-inputs5">
                                <div className="grupo-input5">
                                    <label>Nombre del Acudiente</label>
                                    <input type="text" placeholder="Padre, madre o tutor legal" />
                                </div>
                                <div className="grupo-input5">
                                    <label>Parentesco</label>
                                    <input type="text" placeholder="Ej: Madre" />
                                </div>
                                <div className="grupo-input5">
                                    <label>Teléfono de Emergencia</label>
                                    <input type="tel" placeholder="300 000 0000" />
                                </div>
                            </div>
                        </div>

                        <div className="card-blanca5">
                            <div className="card-header5">
                                <span className="paso-numero">04</span>
                                <h3>Documentación Digital</h3>
                            </div>
                            <div className="upload-area">
                                <div className="file-item">
                                    <label for="doc-identidad">
                                        <i className="bi bi-person-vcard"></i>
                                        <span>Documento de Identidad (PDF/JPG)</span>
                                    </label>
                                    <input type="file" id="doc-identidad" accept=".pdf, .jpg, .png" />
                                </div>
                                <div className="file-item">
                                    <label for="doc-notas">
                                        <i className="bi bi-file-earmark-medical"></i>
                                        <span>Certificado Médico / Notas</span>
                                    </label>
                                    <input type="file" id="doc-notas" accept=".pdf" />
                                </div>
                                <div className="file-item">
                                    <label for="doc-foto">
                                        <i className="bi bi-camera"></i>
                                        <span>Foto Tipo Documento</span>
                                    </label>
                                    <input type="file" id="doc-foto" accept="image/*" />
                                </div>
                            </div>
                        </div>

                        <div className="footer-form">
                            <label className="check-terminos">
                                <input type="checkbox" required />
                                Certifico que la información ingresada es verídica.
                            </label>
                            <button type="submit" className="btn-primario-grande">
                                Finalizar y Enviar Solicitud <i className="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </form>
                </section>
            </main>

        </div>
    )
}

export default Formulario
