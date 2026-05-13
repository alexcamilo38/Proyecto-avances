//import React from 'react'
import { Link } from "react-router-dom"
import "./Matriculas.css"
const Matriculados = () => {
    return (
        <div className="dashboard-container-matriculas">
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src="img/LogoBlanco.png" alt="EasyMatric" className="logo-img" />
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

            <main className="panel-estudiantes">
                <header className="encabezado-panel">
                    <div className="bloque-titulo">
                        <h1>Lista de Estudiantes</h1>
                        <p>Visualiza y gestiona la información de todos los alumnos matriculados.</p>
                    </div>

                    <div className="acciones-panel">
                        <button className="btn-crear">
                            <i className="bi bi-person-plus"></i> Nuevo Registro
                        </button>
                    </div>
                </header>

                <section className="tarjeta-tabla-matriculados">
                    <div className="barra-superior">

                        <div className="buscador">
                            <i className="bi bi-search"></i>
                            <input type="text" placeholder="Buscar por nombre, ID o grado..." />
                        </div>
                        <div>
                            <select className="btn-filtro" name="Filtra por grado" required>
                                <option value="">Filtra por grado</option>
                                <option value="6">Prescolar</option>
                                <option value="7">Primaria</option>
                                <option value="8">Secundaria</option>
                            </select>

                        </div>

                    </div>

                    <div className="contenedor-scroll">
                        <table className="tabla-estudiantes-matriculados">
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
                                    <td className="col-nombre">Ana Rodriguez Sandoval</td>
                                    <td><span className="tag-id">19AB3</span></td>
                                    <td><span className="tag-grado">6°</span></td>
                                    <td>12</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>02</td>
                                    <td className="col-nombre">Breiner Andres Perez</td>
                                    <td><span className="tag-id">29AB5</span></td>
                                    <td><span className="tag-grado">6°</span></td>
                                    <td>14</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>03</td>
                                    <td className="col-nombre">Andres Camilo Dominguez</td>
                                    <td><span className="tag-id">39AG2</span></td>
                                    <td><span className="tag-grado">6°</span></td>
                                    <td>15</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>04</td>
                                    <td className="col-nombre">Carla Maria Sanchez</td>
                                    <td><span className="tag-id">39JB9</span></td>
                                    <td><span className="tag-grado">7°</span></td>
                                    <td>17</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>05</td>
                                    <td className="col-nombre">Jorge Enrique Rivera</td>
                                    <td><span className="tag-id">40JB1</span></td>
                                    <td><span className="tag-grado">8°</span></td>
                                    <td>16</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>06</td>
                                    <td className="col-nombre">Juan Pablo Gómez</td>
                                    <td><span className="tag-id">40JB9</span></td>
                                    <td><span className="tag-grado">8°</span></td>
                                    <td>17</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>07</td>
                                    <td className="col-nombre">Luisa Valentina Rodriguez</td>
                                    <td><span className="tag-id">38KB9</span></td>
                                    <td><span className="tag-grado">9°</span></td>
                                    <td>18</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>08</td>
                                    <td className="col-nombre">Sebastián Ramírez López</td>
                                    <td><span className="tag-id">39HB5</span></td>
                                    <td><span className="tag-grado">9°</span></td>
                                    <td>15</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>09</td>
                                    <td className="col-nombre">Daniela Rodríguez Cruz</td>
                                    <td><span className="tag-id">37AB1</span></td>
                                    <td><span className="tag-grado">10°</span></td>
                                    <td>16</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>10</td>
                                    <td className="col-nombre">Kevin Santiago López</td>
                                    <td><span className="tag-id">40LB7</span></td>
                                    <td><span className="tag-grado">10°</span></td>
                                    <td>18</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>11</td>
                                    <td className="col-nombre">Natalia Andrea Pardo</td>
                                    <td><span className="tag-id">39OM2</span></td>
                                    <td><span className="tag-grado">11°</span></td>
                                    <td>19</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>12</td>
                                    <td className="col-nombre">Cristian Camilo Sánchez</td>
                                    <td><span className="tag-id">37WT3</span></td>
                                    <td><span className="tag-grado">11°</span></td>
                                    <td>18</td>
                                    <td>Masculino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>13</td>
                                    <td className="col-nombre">Laura Vanessa Rincón</td>
                                    <td><span className="tag-id">39JP4</span></td>
                                    <td><span className="tag-grado">11°</span></td>
                                    <td>17</td>
                                    <td>Femenino</td>
                                    <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                                </tr>

                                <tr>
                                    <td>14</td>
                                    <td className="col-nombre">Mateo Alexander Ortiz</td>
                                    <td><span className="tag-id">41XZ9</span></td>
                                    <td><span className="tag-grado">6°</span></td>
                                    <td>12</td>
                                    <td>Masculino</td>
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

export default Matriculados
