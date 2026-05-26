//import React from 'react'
import { Link } from "react-router-dom"
// Importación del logo
import "./RegistroDo.css"
import logoazul from '../../assets/LogoAzul.png';
const RegistroDo = () => {
  return (
    <div className="pantalla-fondo-docente">
            {/* Contenedor principal del formulario */}
            <div className="cuadro-registro-docente">

                <div className="registro-header-docente">
                    <img src={logoazul} alt="EasyMatric" className="logo-easymatric" />
                    <div className="badge-docente">PERFIL Docente</div>
                    <h1>Crear Cuenta Docente</h1>
                    <p>Ingresa los datos para gestionar tu institución</p>
                </div>
                {/* Formulario principal */}
                <form className="form-docente" action="procesar_admin.php" method="POST">

                    {/* Nombre */}
                    <div className="fila-input-docente">
                        <div className="grupo-input-docente">
                            <i className="bi bi-person-gear"></i>

                            <input
                                type="text"
                                name="nombre_admin"
                                placeholder="Nombre Completo"
                                required
                            />
                        </div>
                    </div>

                    {/* Institución y NIT */}
                    <div className="fila-input">

                        <div className="grupo-input-docente grupo-institucion">
                            <i className="bi bi-building"></i>

                            <input
                                type="text"
                                name="institucion"
                                placeholder="Nombre de la Institución"
                                required
                            />
                        </div>

                        <div className="grupo-input-docente grupo-nit">
                            <i className="bi bi-hash"></i>

                            <input
                                type="text"
                                name="nit"
                                placeholder="NIT / Código"
                                required
                            />
                        </div>

                    </div>

                    {/* Documento y Cargo */}
                    <div className="fila-input-docente">

                        <div className="grupo-input-docente">
                            <i className="bi bi-card-checklist"></i>

                            <input
                                type="text"
                                name="n_documento"
                                placeholder="Número de Documento"
                                required
                            />
                        </div>

                        <div className="grupo-input-docente">

                            <select
                                className="select-input"
                                name="cargo"
                                required
                            >
                                <option value="" disabled selected>
                                    Selecciona tu Cargo
                                </option>

                                <option value="Docente Preescolar">
                                    Docente Preescolar
                                </option>

                                <option value="Docente Primaria">
                                    Docente Primaria
                                </option>

                                <option value="Docente secundaria">
                                    Docente secundaria
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* Teléfono y Correo */}
                    <div className="fila-input-docente">

                        <div className="grupo-input-docente">
                            <i className="bi bi-telephone-plus"></i>

                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono Oficina"
                                required
                            />
                        </div>

                        <div className="grupo-input-docente">
                            <i className="bi bi-envelope-check"></i>

                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo Institucional"
                                required
                            />
                        </div>

                    </div>

                    {/* Contraseñas */}
                    <div className="fila-input-docente">

                        <div className="grupo-input-docente">
                            <i className="bi bi-shield-lock-fill"></i>

                            <input
                                type="password"
                                name="pass"
                                placeholder="Contraseña de Seguridad"
                                required
                            />
                        </div>

                        <div className="grupo-input-docente">
                            <i className="bi bi-shield-check"></i>

                            <input
                                type="password"
                                name="pass_confirm"
                                placeholder="Confirmar Contraseña"
                                required
                            />
                        </div>

                    </div>

                    {/* Términos */}
                    <div className="contenedor-terminos-docente">

                        <label className="label-terminos-docente">

                            <input
                                type="checkbox"
                                name="terminos"
                                required
                            />

                            <span>
                                Acepto el tratamiento de datos personales y los{" "}

                                <a href="#" className="link-terminos-docente">
                                    Términos de Servicio
                                </a>

                            </span>

                        </label>

                    </div>

                    {/* Botón */}
                    <div className="contenedor-boton">

                        <Link
                            to="/PerfilDocente"
                            className="btn-registrar-docente"
                        >
                            <i className="bi bi-person-plus"></i>
                            Crear Cuenta
                        </Link>

                    </div>

                </form>

                <div className="pie-cuadro-docente">
                    <div className="botones-inferiores-docente">
                        <Link to="/SelecionRol" className="btn-mini"><i className="bi bi-arrow-left"></i> Cambiar Rol</Link>
                        <Link to="/" className="btn-mini"><i className="bi bi-house"></i> Inicio</Link>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default RegistroDo
