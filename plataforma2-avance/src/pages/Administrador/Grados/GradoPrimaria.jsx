//import React from 'react'
import { Link } from "react-router-dom"
import "./GradoPrimaria.css"
import logoblanco from '../../../assets/LogoBlanco.png'
const GradoPrimaria = () => {
    return (
        <div>
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/RegistrarSede"><i className="bi bi-bank"></i> <span>Instituciones</span></Link></li>
                    <li><Link to="/RevicionD"><i className="bi bi-journal-bookmark"></i> <span>Matrículas</span></Link></li>
                    <li><Link to="/Matriculados"><i className="bi bi-people"></i> <span>Estudiantes</span></Link></li>
                    <li><Link to="/Roles" ><i className="bi bi-shield-lock"></i> <span>Roles</span></Link></li>
                    <li><Link to="/NotasCa"><i className="bi bi-folder2-open"></i> <span>Catálogos</span></Link></li>
                </ul>
                <div className="menu-pie">
                    <a href="index.html" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</a>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ADMINISTRADOR</span>
                    </div>
                </div>
            </nav>
            <main className="panel-estudiantes-primaria">
                <header className="encabezado-panel-primaria">
                    <div className="bloque-titulo-primaria">
                        <h1>Lista de Estudiantes de Primaria</h1>
                        <p>Visualiza y gestiona la información de todos los alumnos matriculados.</p>
                    </div>
                </header>

                <section className="tarjeta-tabla-matriculados-primaria">
                    <div className="barra-superior-primaria">

                        <div className="buscador-primaria">
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Buscar por nombre, ID o grado..." />
                        </div>

                    </div>

                    <div className="contenedor-scroll">
                        <table className="tabla-estudiantes-matriculados-primaria">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Nombre Completo</th>
                                    <th>ID Matrícula</th>
                                    <th>Grado</th>
                                    <th>Edad</th>
                                    <th>Género</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td className="col-nombre">Nicolás Mateo Salazar</td>
                                    <td><span className="tag-id">PRI01</span></td>
                                    <td><span className="tag-grado">1° Primaria</span></td>
                                    <td>6</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>02</td>
                                    <td className="col-nombre">Salomé Cristina Vargas</td>
                                    <td><span className="tag-id">PRI02</span></td>
                                    <td><span className="tag-grado">1° Primaria</span></td>
                                    <td>7</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>03</td>
                                    <td className="col-nombre">Jerónimo Andrés Holguín</td>
                                    <td><span className="tag-id">PRI03</span></td>
                                    <td><span className="tag-grado">2° Primaria</span></td>
                                    <td>7</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>04</td>
                                    <td className="col-nombre">Valery Estefanía Rojas</td>
                                    <td><span className="tag-id">PRI04</span></td>
                                    <td><span className="tag-grado">2° Primaria</span></td>
                                    <td>8</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>05</td>
                                    <td className="col-nombre">Emanuel Santiago López</td>
                                    <td><span className="tag-id">PRI05</span></td>
                                    <td><span className="tag-grado">3° Primaria</span></td>
                                    <td>8</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>06</td>
                                    <td className="col-nombre">Danna Michell Cardona</td>
                                    <td><span className="tag-id">PRI06</span></td>
                                    <td><span className="tag-grado">3° Primaria</span></td>
                                    <td>9</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>07</td>
                                    <td className="col-nombre">Miguel Ángel Quintero</td>
                                    <td><span className="tag-id">PRI07</span></td>
                                    <td><span className="tag-grado">4° Primaria</span></td>
                                    <td>9</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>08</td>
                                    <td className="col-nombre">Sara Sofía Bermúdez</td>
                                    <td><span className="tag-id">PRI08</span></td>
                                    <td><span className="tag-grado">4° Primaria</span></td>
                                    <td>10</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>09</td>
                                    <td className="col-nombre">Juan Esteban Restrepo</td>
                                    <td><span className="tag-id">PRI09</span></td>
                                    <td><span className="tag-grado">5° Primaria</span></td>
                                    <td>10</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>10</td>
                                    <td className="col-nombre">Victoria Eugenia Blanco</td>
                                    <td><span className="tag-id">PRI10</span></td>
                                    <td><span className="tag-grado">5° Primaria</span></td>
                                    <td>11</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default GradoPrimaria
