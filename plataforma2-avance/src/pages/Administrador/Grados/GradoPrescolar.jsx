//import React from 'react'
// Importación de React Router
import { Link } from "react-router-dom"
import "./GradoPrescolar.css"
// Importación del logo institucional
import logoblanco from '../../../assets/LogoBlanco.png'
const GradoPrescolar = () => {
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
      <main className="panel-estudiantes-prescolar">
        <header className="encabezado-panel-prescolar">
          <div className="bloque-titulo-prescolar">
            <h1>Lista de Estudiantes de Preescolar</h1>
            <p>Visualiza y gestiona la información de todos los alumnos matriculados.</p>
          </div>
        </header>
        {/* Contenedor de tabla */}
        <section className="tarjeta-tabla-matriculados-prescolar">
          {/* Barra superior */}
          <div className="barra-superior-prescolar">

            <div className="buscador-prescolar">
              <i className="bi bi-search"></i>
              <input type="text" placeholder="Buscar por nombre, ID o grado..." />
            </div>

          </div>

          <div className="contenedor-scroll">
            {/* Tabla principal */}
            <table className="tabla-estudiantes-matriculados-prescolar">
              {/* Encabezados */}
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
                  <td className="col-nombre">Liam Sebastián Castro</td>
                  <td><span className="tag-id">PRE01</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
                  <td>Masculino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>02</td>
                  <td className="col-nombre">Emma Valentina Duarte</td>
                  <td><span className="tag-id">PRE02</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>4</td>
                  <td>Femenino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>03</td>
                  <td className="col-nombre">Thiago José Montiel</td>
                  <td><span className="tag-id">PRE03</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
                  <td>Masculino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>04</td>
                  <td className="col-nombre">Luciana Sofía Méndez</td>
                  <td><span className="tag-id">PRE04</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
                  <td>Femenino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>05</td>
                  <td className="col-nombre">Matías Alejandro Rivas</td>
                  <td><span className="tag-id">PRE05</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>4</td>
                  <td>Masculino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>06</td>
                  <td className="col-nombre">Antonella Victoria Gil</td>
                  <td><span className="tag-id">PRE06</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
                  <td>Femenino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>07</td>
                  <td className="col-nombre">Samuel David Guevara</td>
                  <td><span className="tag-id">PRE07</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
                  <td>Masculino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>08</td>
                  <td className="col-nombre">Isabella del Mar Ortiz</td>
                  <td><span className="tag-id">PRE08</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>4</td>
                  <td>Femenino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>09</td>
                  <td className="col-nombre">Iker Andrés Peña</td>
                  <td><span className="tag-id">PRE09</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
                  <td>Masculino</td>
                  <td><button className="btn-opciones"><i className="bi bi-three-dots"></i></button></td>
                </tr>

                <tr>
                  <td>10</td>
                  <td className="col-nombre">Mariana Isabel Ruiz</td>
                  <td><span className="tag-id">PRE10</span></td>
                  <td><span className="tag-grado">Preescolar</span></td>
                  <td>5</td>
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

export default GradoPrescolar
