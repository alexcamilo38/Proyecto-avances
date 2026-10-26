//import React from 'react'
import { Link } from "react-router-dom"

// Importación del logo
import logoazul from '../../assets/LogoAzul.png';

const RegistroAd = () => {
    return (
        <div className={"pantalla-fondo [min-height:100vh] [display:flex] [justify-content:center] [align-items:center] [padding:20px]"}>
             {/* Contenedor principal del formulario */}
            <div className={"cuadro-registro-admin [background:var(--blanco)] [width:100%] [max-width:650px] [padding:60px] [margin-top:220px] [border-radius:30px] [box-shadow:var(--sombra)] [border:1px_solid_var(--gris-borde)]"}>

                <div className={"registro-header2 [text-align:center] [margin-bottom:25px]"}>
                    <img src={logoazul} alt="EasyMatric" className={"logo-easymatric [height:45px] [display:block] [margin:0_auto_10px]"} />
                    <div className={"badge-admin [background:#e0f2fe] [color:var(--cyan-em)] [font-size:0.7rem] [font-weight:800] [padding:5px_12px] [border-radius:20px] [display:inline-block] [letter-spacing:1px] [margin-bottom:10px] [text-align:center]"}>PERFIL ADMINISTRATIVO</div>
                    <h1 className={"[.registro-header2_&]:[color:var(--azul-admin)] [.registro-header2_&]:[font-size:1.8rem] [.registro-header2_&]:[margin:5px_0]"}>Crear Cuenta Admin</h1>
                    <p className={"[.registro-header2_&]:[color:#64748b] [.registro-header2_&]:[font-size:0.9rem]"}>Ingresa los datos para gestionar tu institución</p>
                </div>
                {/* Formulario principal */}
                <form className={"form2 [display:flex] [flex-direction:column] [gap:15px]"} action="procesar_admin.php" method="POST">

                    {/* Nombre */}
                    <div className={"fila-input [display:flex] [gap:15px]"}>
                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-person-gear [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="text"
                                name="nombre_admin"
                                placeholder="Nombre Completo"
                                required
                            />
                        </div>
                    </div>

                    {/* Institución y NIT */}
                    <div className={"fila-input [display:flex] [gap:15px]"}>

                        <div className={"grupo-input grupo-institucion [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-building [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="text"
                                name="institucion"
                                placeholder="Nombre de la Institución"
                                required
                            />
                        </div>

                        <div className={"grupo-input grupo-nit [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-hash [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="text"
                                name="nit"
                                placeholder="NIT / Código"
                                required
                            />
                        </div>

                    </div>

                    {/* Documento y Cargo */}
                    <div className={"fila-input [display:flex] [gap:15px]"}>

                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-card-checklist [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="text"
                                name="n_documento"
                                placeholder="Número de Documento"
                                required
                            />
                        </div>

                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>

                            <select
                                className={"select-input [border:none] [background:transparent] [outline:none] [width:100%] [color:var(--azul-admin)] [font-weight:500]"}
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
                    <div className={"fila-input [display:flex] [gap:15px]"}>

                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-telephone-plus [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono Oficina"
                                required
                            />
                        </div>

                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-envelope-check [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="email"
                                name="correo"
                                placeholder="Correo Institucional"
                                required
                            />
                        </div>

                    </div>

                    {/* Contraseñas */}
                    <div className={"fila-input [display:flex] [gap:15px]"}>

                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-shield-lock-fill [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="password"
                                name="pass"
                                placeholder="Contraseña de Seguridad"
                                required
                            />
                        </div>

                        <div className={"grupo-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-shield-check [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="password"
                                name="pass_confirm"
                                placeholder="Confirmar Contraseña"
                                required
                            />
                        </div>

                    </div>

                    {/* Términos */}
                    <div className={"contenedor-terminos [margin:20px_0] [font-size:0.8rem] [color:#64748b]"}>

                        <label className={"label-terminos [display:flex] [align-items:flex-start] [gap:8px] [cursor:pointer]"}>

                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-weight:500]"}
                                type="checkbox"
                                name="terminos"
                                required
                            />

                            <span className={"[.label-terminos_&]:[color:#64748b] [.label-terminos_&]:[line-height:1.4]"}>
                                Acepto el tratamiento de datos personales y los{" "}

                                <a href="#" className={"link-terminos [color:#60a5fa] [text-decoration:none]"}>
                                    Términos de Servicio
                                </a>

                            </span>

                        </label>

                    </div>

                    {/* Botón */}
                    <div className={"contenedor-boton [display:flex] [justify-content:center] [align-items:center] [padding:20px] [width:100%]"}>

                        <Link
                            to="/RegistrarSede"
                            className={"btn-registrar [text-decoration:none] [padding:12px_30px] [background-color:#1a1c2d] [color:#4facfe] [border-radius:12px] [font-weight:bold] [transition:0.3s] [border:1px_solid_rgba(79,_172,_254,_0.3)] [&:hover]:[background-color:#4facfe] [&:hover]:[color:#3641a6] [&:hover]:[transform:translateY(-3px)]"}
                        >
                            <i className={"bi bi-person-plus [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i>
                            Crear Cuenta
                        </Link>

                    </div>

                </form>

                <div className={"pie-cuadro [margin-top:25px] [text-align:center]"}>
                    <div className={"botones-inferiores [display:flex] [justify-content:center] [gap:10px]"}>
                        <Link to="/SelecionRol" className={"btn-mini [background:#f1f5f9] [color:#64748b] [padding:10px_15px] [border-radius:10px] [font-size:0.8rem] [text-decoration:none] [display:center] [align-items:center] [gap:5px] [font-weight:600] [transition:0.3s] [&:hover]:[background:var(--azul-admin)] [&:hover]:[color:white]"}><i className={"bi bi-arrow-left [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i> Cambiar Rol</Link>
                        <Link to="/" className={"btn-mini [background:#f1f5f9] [color:#64748b] [padding:10px_15px] [border-radius:10px] [font-size:0.8rem] [text-decoration:none] [display:center] [align-items:center] [gap:5px] [font-weight:600] [transition:0.3s] [&:hover]:[background:var(--azul-admin)] [&:hover]:[color:white]"}><i className={"bi bi-house [.grupo-input_&]:[color:var(--azul-admin)] [.grupo-input_&]:[font-size:1.1rem]"}></i> Inicio</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegistroAd

