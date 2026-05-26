//import React from 'react'
import { Link } from "react-router-dom"
import logoblanco from "../../assets/LogoBlanco.png"
import "./SubirModulo.css"
const SubirModulo = () => {
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
                    <li><Link to="/DocenteMo"><i class="bi bi-journal-bookmark"></i> <span>Mis Módulos</span></Link></li>
                    <li><Link to="/SubirModulo"><i class="bi bi-cloud-upload"></i> <span>Subir Módulo</span></Link></li>
                    <li><Link to="/PerfilDocente" ><i className="bi bi-person-badge"></i><span>Mi Perfil</span></Link></li>
                </ul>
                <div className="menu-pie">
                    <Link to="/" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>DOCENTE</span>
                    </div>
                </div>
            </nav>
        <main className="contenido-principal-docente02">
        <div className="perfil-contenedor-docente02">
            
            <header className="perfil-header-docente02" >
                <div className="perfil-info-basica-docente02">
                    <div className="texto-usuario-docente02">
                        <h1>
                            <i className="bi bi-cloud-arrow-up-fill" ></i>
                            Configuración y Carga de Módulos
                        </h1>
                        <span className="etiqueta-rol-docente02">Oferta Académica e Inscripciones</span>
                    </div>
                </div>
                <button type="submit" form="form-subir-modulo" className="boton-accion-principal-docente02">
                    <i className="bi bi-plus-circle"></i> Publicar Módulo
                </button>
            </header>

            <div className="perfil-grid-contenido-docente02">
                
                <section className="seccion-datos-docente02">
                    <div className="tarjeta-blanca-docentes02">
                        <h3><i className="bi bi-sliders"></i> Parámetros de la Asignatura</h3>
                        
                        <form id="form-subir-modulo" action="#" method="POST" encType="multipart/form-data" >
                            <div className="los-datos-grid-docente02">
                                
                                <div className="dato-item-ancho-docente02">
                                    <label htmlFor="nombreModulo">Nombre del Módulo / Asignatura</label>
                                    <input id="nombreModulo" type="text" placeholder="Ej. Lengua Castellana y Comprensión Crítica" required />
                                </div>

                                <div className="dato-item-docente02">
                                    <label htmlFor="gradoDestino">Grado / Curso Destino</label>
                                    <select id="gradoDestino" defaultValue="" required>
                                        <option value="">Seleccione un grado...</option>
                                        <option value="9a">Grado 9° A</option>
                                        <option value="9b">Grado 9° B</option>
                                        <option value="10a">Grado 10° A</option>
                                        <option value="10b">Grado 10° B</option>
                                        <option value="11a">Grado 11° A</option>
                                    </select>
                                </div>

                                <div className="dato-item-docente02">
                                    <label htmlFor="cupos">Límite de Cupos Disponibles</label>
                                    <input id="cupos" type="number" min="1" max="50" placeholder="Ej. 35" required />
                                </div>

                                <div className="dato-item-docente02">
                                    <label htmlFor="horas">Horas Semanales (Intensidad)</label>
                                    <input id="horas" type="number" min="1" max="10" placeholder="Ej. 4" required />
                                </div>

                                <div className="dato-item-docente02">
                                    <label htmlFor="periodo">Periodo Escolar</label>
                                    <select id="periodo" defaultValue="p1" required>
                                        <option value="p1">Primer Periodo (Vigente)</option>
                                        <option value="p2">Segundo Periodo</option>
                                        <option value="p3">Tercer Periodo</option>
                                    </select>
                                </div>

                                <div className="dato-item-docente02">
                                    <label htmlFor="fechaApertura">Fecha Apertura de Inscripción</label>
                                    <input id="fechaApertura" type="date" required />
                                </div>

                                <div className="dato-item-docente02">
                                    <label htmlFor="fechaCierre">Fecha Límite / Cierre</label>
                                    <input id="fechaCierre" type="date" required />
                                </div>

                                <div className="dato-item-ancho-docente02">
                                    <label htmlFor="descripcion">Descripción del Módulo y Competencias</label>
                                    <textarea id="descripcion" rows="4" placeholder="Escriba los objetivos principales y temas clave que se abordarán en este módulo..." required></textarea>
                                </div>

                                <div className="dato-item-ancho-docente02">
                                    <label htmlFor="documento">Documento Técnico del Módulo (Syllabus / Guía Curricular)</label>
                                    <div className="zona-carga-archivo-docente02">
                                        <i className="bi bi-file-earmark-pdf"></i>
                                        <p>Arrastra el archivo del Módulo aquí o haz clic para examinar</p>
                                        <p className="texto-secundario-docente02">Formatos admitidos: PDF, DOCX (Máx. 10MB)</p>
                                        <input id="documento" type="file" className="input-file-oculto-docente02" required />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </section>

                <aside className="columna-lateral-docente02">
                    
                    <div className="tarjeta-blanca-docentes02">
                        <h3><i className="bi bi-info-circle"></i> Estado de Oferta</h3>
                        <p className="nota-ayuda-docente02" >
                            Los módulos publicados quedan inmediatamente visibles para el proceso de selección de asignaturas por parte del alumnado.
                        </p>
                        <div className="control-switch-docente02" >
                            <span>Permitir auto-inscripción</span>
                            <i className="bi bi-toggle-on"></i>
                        </div>
                    </div>

                    <div className="tarjeta-blanca-docentes02">
                        <h3><i className="bi bi-lightbulb"></i> Consejos Útiles</h3>
                        <ul>
                            <li>Establece el <strong>límite de cupos</strong> basado en la capacidad física del aula asignada por la institución.</li>
                            <li>Verifica con precisión las <strong>fechas límites</strong> para evitar problemas con el calendario de cierres del sistema central.</li>
                        </ul>
                    </div>

                </aside>
            </div>
        </div>
    </main>
      
    </div>
  )
}

export default SubirModulo
