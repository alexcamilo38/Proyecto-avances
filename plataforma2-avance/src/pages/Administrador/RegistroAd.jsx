//import React from 'react'
import { Link } from "react-router-dom"
import "./RegistroAd.css"
// Importación del logo
import logoazul from '../../assets/LogoAzul.png';

const RegistroAd = () => {
    return (
        <div className="pantalla-fondo">
             {/* Contenedor principal del formulario */}
            <div className="cuadro-registro-admin">

                <div className="registro-header2">
                    <img src={logoazul} alt="EasyMatric" className="logo-easymatric" />
                    <div className="badge-admin">PERFIL ADMINISTRATIVO</div>
                    <h1>Crear Cuenta Admin</h1>
                    <p>Ingresa los datos para gestionar tu institución</p>
                </div>
                {/* Formulario principal */}
                <form className="form2" action="procesar_admin.php" method="POST">

                    {/* Nombre */}
                    <div className="fila-input">
                        <div className="grupo-input">
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

                        <div className="grupo-input grupo-institucion">
                            <i className="bi bi-building"></i>

                            <input
                                type="text"
                                name="institucion"
                                placeholder="Nombre de la Institución"
                                required
                            />
                        </div>

                        <div className="grupo-input grupo-nit">
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
                    <div className="fila-input">

                        <div className="grupo-input">
                            <i className="bi bi-card-checklist"></i>

                            <input
                                type="text"
                                name="n_documento"
                                placeholder="Número de Documento"
                                required
                            />
                        </div>

                        <div className="grupo-input">

                            <select
                                className="select-input"
                                name="cargo"
                                required
                            >
                                <option value="" disabled selected>
                                    Selecciona tu Cargo
                                </option>

                                <option value="Rector">
                                    Rector
                                </option>

                                <option value="Administrador">
                                    Administrador
                                </option>

                                <option value="Coordinador">
                                    Coordinador
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* Teléfono y Correo */}
                    <div className="fila-input">

                        <div className="grupo-input">
                            <i className="bi bi-telephone-plus"></i>

                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono Oficina"
                                required
                            />
                        </div>

                        <div className="grupo-input">
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
                    <div className="fila-input">

                        <div className="grupo-input">
                            <i className="bi bi-shield-lock-fill"></i>

                            <input
                                type="password"
                                name="pass"
                                placeholder="Contraseña de Seguridad"
                                required
                            />
                        </div>

                        <div className="grupo-input">
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
                    <div className="contenedor-terminos">

                        <label className="label-terminos">

                            <input
                                type="checkbox"
                                name="terminos"
                                required
                            />

                            <span>
                                Acepto el tratamiento de datos personales y los{" "}

                                <a href="#" className="link-terminos">
                                    Términos de Servicio
                                </a>

                            </span>

                        </label>

                    </div>

                    {/* Botón */}
                    <div className="contenedor-boton">

                        <Link
                            to="/RegistrarSede"
                            className="btn-registrar"
                        >
                            <i className="bi bi-person-plus"></i>
                            Crear Cuenta
                        </Link>

                    </div>

                </form>

                <div className="pie-cuadro">
                    <div className="botones-inferiores">
                        <Link to="/SelecionRol" className="btn-mini"><i className="bi bi-arrow-left"></i> Cambiar Rol</Link>
                        <Link to="/" className="btn-mini"><i className="bi bi-house"></i> Inicio</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegistroAd

