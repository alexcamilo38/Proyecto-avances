//import React from 'react'
import "./Colegios.css"
import { Link } from "react-router-dom"
import "./Menu.css"
const Colegios = () => {
    return (
        <div >
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src="img/LogoBlanco.png" alt="EasyMatric" className="logo-img" />
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
                        <Link to="/ModulosAcademicos">
                            <i className="bi bi-folder2-open"></i> 
                            <span>Catálogos</span>
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
            <main className="contenido-principal2">
                <div className="header-seccion2">
                    <div className="texto-header2">
                        <h1>Instituciones Disponibles</h1>
                        <p>Explora y selecciona la sede donde deseas realizar tu matrícula</p>
                    </div>
                    <div className="busqueda-contenedor2">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Buscar sede o municipio..." />
                    </div>
                </div>

                <div className="grid-sedes">

                    <div className="tarjeta-sede">
                        <div className="imagen-sede">
                            <img src="img/cole1.jpg" alt="Institución" />
                            <span className="etiqueta-cupos">Cupos Disponibles</span>
                        </div>
                        <div className="info-sede">
                            <h3>I.E. San Vicente</h3>
                            <p className="ubicacion"><i className="bi bi-geo-alt"></i> Popayán - Comuna 2</p>
                            <div className="detalles-mini">
                                <span><i className="bi bi-mortarboard"></i> 6° a 11°</span>
                                <span><i className="bi bi-clock"></i> Jornada Mañana</span>
                            </div>
                            <Link to="/InfoSede" className="btn-ver-mas">Ver más información</Link>
                        </div>
                    </div>

                    <div className="tarjeta-sede">
                        <div className="imagen-sede">
                            <img src="img/cole2.jpg" alt="Institución" />
                            <span className="etiqueta-cupos">Cupos Disponibles</span>
                        </div>
                        <div className="info-sede">
                            <h3>Colegio Mayor de Cauca</h3>
                            <p className="ubicacion"><i className="bi bi-geo-alt"></i> Popayán - Centro</p>
                            <div className="detalles-mini">
                                <span><i className="bi bi-mortarboard"></i> Transición a 11°</span>
                                <span><i className="bi bi-clock"></i> Jornada Única</span>
                            </div>
                            <a href="#" className="btn-ver-mas">Ver más información</a>
                        </div>
                    </div>

                    <div className="tarjeta-sede">
                        <div className="imagen-sede">
                            <img src="img/cole3.jpg" alt="Institución" />
                            <span className="etiqueta-cupos">Cupos Disponibles</span>
                        </div>
                        <div className="info-sede">
                            <h3>I.E. La Sagrada Familia</h3>
                            <p className="ubicacion"><i className="bi bi-geo-alt"></i> Popayán - Comuna 5</p>
                            <div className="detalles-mini">
                                <span><i className="bi bi-mortarboard"></i> 6° a 11°</span>
                                <span><i className="bi bi-clock"></i> Jornada Tarde</span>
                            </div>
                            <a href="#" className="btn-ver-mas">Ver más información</a>
                        </div>
                    </div>

                    <div className="tarjeta-sede">
                        <div className="imagen-sede">
                            <img src="img/cole.4.jpg" alt="Institución" />
                            <span className="etiqueta-cupos">Cupos Disponibles</span>
                        </div>
                        <div className="info-sede">
                            <h3>I.E. Don Bosco</h3>
                            <p className="ubicacion"><i className="bi bi-geo-alt"></i> Popayán - Comuna 9</p>
                            <div className="detalles-mini">
                                <span><i className="bi bi-mortarboard"></i> 1° a 11°</span>
                                <span><i className="bi bi-clock"></i> Jornada Única</span>
                            </div>
                            <Link to="/InfoSede" className="btn-ver-mas">Ver más información</Link>
                        </div>
                    </div>

                    <div className="tarjeta-sede">
                        <div className="imagen-sede">
                            <img src="img/cole.5.jpg" alt="Institución" />
                            <span className="etiqueta-cupos-pocos" >Pocos Cupos</span>
                        </div>
                        <div className="info-sede">
                            <h3>I.E. Francisco de Paula Santander</h3>
                            <p className="ubicacion"><i className="bi bi-geo-alt"></i> Popayán - Comuna 6</p>
                            <div className="detalles-mini">
                                <span><i className="bi bi-mortarboard"></i> 6° a 11°</span>
                                <span><i className="bi bi-clock"></i> Jornada Mañana</span>
                            </div>
                            <a href="#" className="btn-ver-mas">Ver más información</a>
                        </div>
                    </div>

                    <div className="tarjeta-sede">
                        <div className="imagen-sede">
                            <img src="img/cole.6.jpg" alt="Institución" />
                            <span className="etiqueta-cupos-agotados">Agotado</span>
                        </div>
                        <div className="info-sede">
                            <h3>Colegio Nuestra Señora del Carmen</h3>
                            <p className="ubicacion"><i className="bi bi-geo-alt"></i> Popayán - Norte</p>
                            <div className="detalles-mini">
                                <span><i className="bi bi-mortarboard"></i> Transición a 11°</span>
                                <span><i className="bi bi-clock"></i> Jornada Tarde</span>
                            </div>
                            <a href="#" className="btn-ver-mas">Ver más información</a>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}

export default Colegios
