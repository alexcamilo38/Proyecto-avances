//import React from 'react'
import { Link } from "react-router-dom"
import "./GradoSecundaria.css"
import logoblanco from '../../../assets/LogoBlanco.png'
const GradoSecundaria = () => {
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
                </ul>
                <div className="menu-pie">
                    <Link to="/" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ADMINISTRADOR</span>
                    </div>
                </div>
            </nav>
            <main className="panel-estudiantes-secundaria ">
                <header className="encabezado-panel-secundaria ">
                    <div className="bloque-titulo-secundaria ">
                        <h1>Lista de Estudiantes de Secundaria</h1>
                        <p>Visualiza y gestiona la información de todos los alumnos matriculados.</p>
                    </div>
                </header>
                {/* Tarjeta principal de estudiantes */}
                <section className="tarjeta-tabla-matriculados-secundaria ">
                     {/* Barra superior con buscador */}
                    <div className="barra-superior-secundaria ">

                        <div className="buscador-secundaria ">
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Buscar por nombre, ID o grado..." />
                        </div>

                    </div>

                    <div className="contenedor-scroll">
                        {/* Tabla de estudiantes */}
                        <table className="tabla-estudiantes-matriculados-secundaria ">
                            {/* Encabezados de la tabla */}
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
                                    <td className="col-nombre">Kevin Andrés Pardo</td>
                                    <td><span className="tag-id">SEC01</span></td>
                                    <td><span className="tag-grado">6° Secundaria</span></td>
                                    <td>12</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>02</td>
                                    <td className="col-nombre">Isabella Luna Castro</td>
                                    <td><span className="tag-id">SEC02</span></td>
                                    <td><span className="tag-grado">6° Secundaria</span></td>
                                    <td>12</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>03</td>
                                    <td className="col-nombre">Santiago Reyes Ruiz</td>
                                    <td><span className="tag-id">SEC03</span></td>
                                    <td><span className="tag-grado">7° Secundaria</span></td>
                                    <td>13</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>04</td>
                                    <td className="col-nombre">Camila Andrea Torres</td>
                                    <td><span className="tag-id">SEC04</span></td>
                                    <td><span className="tag-grado">8° Secundaria</span></td>
                                    <td>14</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>05</td>
                                    <td className="col-nombre">Mateo Alexander Ortiz</td>
                                    <td><span className="tag-id">SEC05</span></td>
                                    <td><span className="tag-grado">8° Secundaria</span></td>
                                    <td>14</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>06</td>
                                    <td className="col-nombre">Valeria Sofía Herrera</td>
                                    <td><span className="tag-id">SEC06</span></td>
                                    <td><span className="tag-grado">9° Secundaria</span></td>
                                    <td>15</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>07</td>
                                    <td className="col-nombre">Juan David Espitia</td>
                                    <td><span className="tag-id">SEC07</span></td>
                                    <td><span className="tag-grado">9° Secundaria</span></td>
                                    <td>15</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>08</td>
                                    <td className="col-nombre">Mariana Lucía Gómez</td>
                                    <td><span className="tag-id">SEC08</span></td>
                                    <td><span className="tag-grado">10° Secundaria</span></td>
                                    <td>16</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>09</td>
                                    <td className="col-nombre">Daniel Felipe Vargas</td>
                                    <td><span className="tag-id">SEC09</span></td>
                                    <td><span className="tag-grado">11° Secundaria</span></td>
                                    <td>17</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>10</td>
                                    <td className="col-nombre">Natalia Andrea Ríos</td>
                                    <td><span className="tag-id">SEC10</span></td>
                                    <td><span className="tag-grado">11° Secundaria</span></td>
                                    <td>18</td>
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

export default GradoSecundaria
