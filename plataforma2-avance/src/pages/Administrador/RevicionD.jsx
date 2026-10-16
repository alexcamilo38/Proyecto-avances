import { useState } from 'react';
import { Link } from "react-router-dom";
import "./RevicionD.css";
import logoblanco from '../../assets/LogoBlanco.png';

const RevicionD = () => {
    // ----------------------------------------------------
    // ESTADO INICIAL DE SOLICITUDES DE REVISIÓN
    // ----------------------------------------------------
    const [solicitudes, setSolicitudes] = useState([
        { id: 1, usuario: "Ana Rodríguez", documento: "ver_documento.pdf", fecha: "27/04/2026", estado: "Pendiente", grado: "Preescolar" },
        { id: 2, usuario: "Breiner Pérez", documento: "Ver_Documento.pdf", fecha: "26/04/2026", estado: "Pendiente", grado: "Primaria" },
        { id: 3, usuario: "Valentina Ospina", documento: "ver_documento.pdf", fecha: "26/04/2026", estado: "Pendiente", grado: "Secundaria" },
        { id: 4, usuario: "Carlos Andrés Mendoza", documento: "ver_documento.pdf", fecha: "27/04/2026", estado: "Pendiente", grado: "Primaria" },
        { id: 5, usuario: "Angie Marcela Ortiz", documento: "ver_documento.pdf", fecha: "27/04/2026", estado: "Pendiente", grado: "Preescolar" },
        { id: 6, usuario: "Mariana Lucía Torres", documento: "ver_documento.pdf", fecha: "02/04/2026", estado: "Pendiente", grado: "Secundaria" },
        { id: 7, usuario: "Sofía Elena Gómez", documento: "ver_documento.pdf", fecha: "21/02/2026", estado: "Pendiente", grado: "Preescolar" },
        { id: 8, usuario: "Samuel David Quintero", documento: "ver_documento.pdf", fecha: "27/03/2026", estado: "Pendiente", grado: "Primaria" },
        { id: 9, usuario: "Isabella Caicedo", documento: "ver_documento.pdf", fecha: "03/04/2026", estado: "Pendiente", grado: "Secundaria" },
        { id: 10, usuario: "Mateo Holguín", documento: "ver_documento.pdf", fecha: "17/04/2026", estado: "Pendiente", grado: "Primaria" }
    ]);

    // Estado para gestionar el filtro seleccionado
    const [filtroGrado, setFiltroGrado] = useState("Todos");

    // Función para cambiar el estado (Aprobado / Rechazado)
    const cambiarEstado = (id, nuevoEstado) => {
        setSolicitudes(prev =>
            prev.map(item =>
                item.id === id ? { ...item, estado: nuevoEstado } : item
            )
        );
    };

    // Filtrado de la lista según la opción seleccionada
    const solicitudesFiltradas = filtroGrado === "Todos"
        ? solicitudes
        : solicitudes.filter(item => item.grado === filtroGrado);

    return (
        <div>
            {/* Menú lateral de navegación */}
            <nav className="menu-lateral">
                <div className="menu-logo">
                    <img src={logoblanco} alt="EasyMatric" className="logo-img" />
                </div>
                <ul className="menu-lista">
                    <li><Link to="/"><i className="bi bi-house-door"></i> <span>Inicio</span></Link></li>
                    <li><Link to="/RegistrarSede"><i className="bi bi-bank"></i> <span>Instituciones</span></Link></li>
                    <li><Link to="/RevicionD"><i className="bi bi-journal-bookmark"></i> <span>Matrículas</span></Link></li>
                    <li><Link to="/Matriculados"><i className="bi bi-people"></i> <span>Estudiantes</span></Link></li>
                    <li><Link to="/Roles"><i className="bi bi-shield-lock"></i> <span>Roles</span></Link></li>
                    <li><Link to="/NotasCa"><i className="bi bi-folder2-open"></i> <span>Catálogos</span></Link></li>
                    <li><Link to="/PerfilAd"><i className="bi bi-person-badge"></i><span>Mi Perfil</span></Link></li>
                </ul>
                <div className="menu-pie">
                    <Link to="/" className="enlace-salir"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link>
                    <div className="perfil-usuario-info">
                        <i className="bi bi-person-circle"></i>
                        <span>ADMINISTRADOR</span>
                    </div>
                </div>
            </nav>

            <div className="contenido-revicion">
                <div className="header02">
                    <h2>Revisión de Documentación</h2>
                </div>

                <div className="tabla-box02">
                    {/* Filtro por grado */}
                    <div className="acciones-header02">
                        <select
                            className="btn-primario08"
                            value={filtroGrado}
                            onChange={(e) => setFiltroGrado(e.target.value)}
                        >
                            <option value="Todos">Todos los grados</option>
                            <option value="Preescolar">Preescolar</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                        </select>
                    </div>

                    {/* Tabla de revisiones */}
                    <section className="contenedor-tabla-revisar">
                        <div className="barra-herramientas">
                            <table className="tabla-revision">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Grado / Nivel</th>
                                        <th>Documento</th>
                                        <th>Fecha Envío</th>
                                        <th>Estado Actual</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitudesFiltradas.length > 0 ? (
                                        solicitudesFiltradas.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.usuario}</td>
                                                <td>{item.grado}</td>
                                                <td>
                                                    <a href={`#${item.documento}`} className="btn-link">
                                                        {item.documento}
                                                    </a>
                                                </td>
                                                <td>{item.fecha}</td>
                                                <td>
                                                    <span className={`badge-estado ${item.estado.toLowerCase()}`}>
                                                        {item.estado}
                                                    </span>
                                                </td>
                                                <td className="acciones-validacion">
                                                    <button
                                                        className={`btn-accion btn-aprobar ${item.estado === "Aprobado" ? "seleccionado" : ""}`}
                                                        onClick={() => cambiarEstado(item.id, "Aprobado")}
                                                        title="Aprobar solicitud"
                                                    >
                                                        <i className="bi bi-check-circle"></i> Aprobar
                                                    </button>
                                                    <button
                                                        className={`btn-accion btn-rechazar ${item.estado === "Rechazado" ? "seleccionado" : ""}`}
                                                        onClick={() => cambiarEstado(item.id, "Rechazado")}
                                                        title="Rechazar solicitud"
                                                    >
                                                        <i className="bi bi-x-circle"></i> Rechazar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                                                No hay solicitudes registradas para este nivel.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RevicionD;