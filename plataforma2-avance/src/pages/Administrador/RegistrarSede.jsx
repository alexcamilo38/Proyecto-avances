//import React from 'react'
import "./RegistrarSede.css"
import { Link } from "react-router-dom"
const RegistrarSede = () => {
    return (
        <div>
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src="img/logo.png" alt="EasyMatric" className="logo-img" />
                </div>
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/RegistrarSede"><i className="bi bi-bank"></i> <span>Instituciones</span></Link></li>
                    <li><Link href="matriculas.html"><i className="bi bi-journal-bookmark"></i> <span>Matrículas</span></Link></li>
                    <li><Link to="/Matriculados"><i className="bi bi-people"></i> <span>Estudiantes</span></Link></li>
                    <li><Link to="/Roles" ><i className="bi bi-shield-lock"></i> <span>Roles</span></Link></li>
                    <li><Link to="/NotasCa"><i className="bi bi-folder2-open"></i> <span>Catálogos</span></Link></li>
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
                            <h3><i className="bi bi-images"></i> Galería y Registro</h3>
                            <div className="grid-fotos">
                                <div className="caja-foto vacia"><span>Logo</span></div>
                                <div className="caja-foto vacia"><span>Fachada</span></div>
                                <div className="caja-foto agregar"><i className="bi bi-plus-lg"></i></div>
                                <div className="caja-foto agregar"><i className="bi bi-plus-lg"></i></div>
                            </div>
                            <button className="btn-guardar-todo">Guardar y Continuar</button>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default RegistrarSede
