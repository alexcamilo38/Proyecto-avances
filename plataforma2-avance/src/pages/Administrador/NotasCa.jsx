//import React from 'react'
import { Link } from "react-router-dom"
import "./NotasCa.css"
const NotasCa = () => {
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
            <main className="contenido-principal-notas">
        <header className="header-seccion-notas">
            <h1>Panel de Catálogos y Notas</h1>
            <p>Gestiona los documentos institucionales y el rendimiento académico de los estudiantes.</p>
        </header>

        <section className="seccion-catalogos-notas">
            <div className="grid-catalogos02">
                <div className="card-catalogo02">
                    <div className="icono-doc"><i className="bi bi-file-pdf"></i></div>
                    <img src="imagenes/Catalogo.png" alt="Documento" className="img-doc"/>
                    <h3>Manual de Convivencia</h3>
                    <button className="btn-ver"><i className="bi bi-eye"></i> Ver Documento</button>
                </div>
                <div className="card-catalogo02">
                    <div className="icono-doc"><i className="bi bi-file-earmark-text"></i></div>
                    <img src="imagenes/Catalogo.png" alt="Documento" className="img-doc"/>
                    <h3>Oferta Académica 2026</h3>
                    <button className="btn-ver"><i className="bi bi-eye"></i> Ver Documento</button>
                </div>
                <div className="card-catalogo02">
                    <div className="icono-doc"><i className="bi bi-file-ppt"></i></div>
                    <img src="imagenes/Catalogo.png" alt="Documento" className="img-doc"/>
                    <h3>Proyectos Transversales</h3>
                    <button className="btn-ver"><i className="bi bi-eye"></i> Ver Documento</button>
                </div>
            </div>
        </section>

        <section className="seccion-notas">
            <div className="grid-notas02">
                
                <div className="tarjeta-nota02">
                    <div className="perfil-estudiante">
                        <img src="https://img.freepik.com/vector-gratis/mujer-sonriente-cabello-largo_1308-174705.jpg" alt="Ana"/>
                        <div className="estudiante-info">
                            <h3>Ana Rodriguez Sandoval</h3>
                            <span>Grado 11° - Jornada Mañana</span>
                        </div>
                        <button className="btn-plus"><i className="bi bi-plus-circle-fill"></i></button>
                    </div>

                    <table className="tabla-notas-em">
                        <thead>
                            <tr>
                                <th>Módulo</th>
                                <th>Evaluación</th>
                                <th>Recuperación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Artes</td><td>9.0</td><td className="nota-alta">10</td></tr>
                            <tr><td>Inglés</td><td>10</td><td>8.0</td></tr>
                            <tr><td>Historia</td><td>10</td><td>10</td></tr>
                            <tr><td>Ciencias Naturales</td><td>7.0</td><td>9.0</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="tarjeta-nota02">
                    <div className="perfil-estudiante">
                        <img src="/img/Catalo_perfil.png" alt="Andres"/>
                        <div className="estudiante-info">
                            <h3>Andres Camilo Dominguez</h3>
                            <span>Grado 11° - Jornada Mañana</span>
                        </div>
                        <button className="btn-plus"><i className="bi bi-plus-circle-fill"></i></button>
                    </div>

                    <table className="tabla-notas-em">
                        <thead>
                            <tr>
                                <th>Módulo</th>
                                <th>Evaluación</th>
                                <th>Recuperación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Artes</td><td>9.0</td><td>10</td></tr>
                            <tr><td>Inglés</td><td>10</td><td>8.0</td></tr>
                            <tr><td>Ciencias Sociales</td><td className="nota-baja">5.0</td><td>10</td></tr>
                            <tr><td>Física</td><td>7.0</td><td>8.0</td></tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    </main>
      
    </div>
  )
}

export default NotasCa
