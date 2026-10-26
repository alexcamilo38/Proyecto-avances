import { Link } from "react-router-dom"

import logoazul from '../../assets/LogoAzul.png';
const RegistroU = () => {
    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className={"contenido-derecho [background:var(--blanco-fondo)] [width:100%] [height:100%] [max-width:650px] [padding:40px] [border-radius:30px] [box-shadow:var(--sombra-soft)] [border:1px_solid_var(--gris-borde)] [--azul-oscuro:#1a1c2d] [--cyan-primario:#4facfe] [--cyan-brillante:#2a399c] [--blanco-fondo:#ffffff] [--gris-suave:#f8fafc] [--gris-borde:#e2e8f0] [--texto-principal:#334155] [--texto-muted:#94a3b8] [--sombra-soft:0_15px_35px_rgba(0,_0,_0,_0.05)]"}>
                <div className={"registro-header3 [text-align:center] [margin-bottom:30px] [margin:0_auto]"}>
                    <img src={logoazul} alt="EasyMatric" className={"logo-easymatric [display:block] [margin-left:auto] [margin-right:auto] [height:50px] [margin-bottom:15px]"} />
                    <h1 className={"[.registro-header3_&]:[color:var(--azul-oscuro)] [.registro-header3_&]:[font-size:2rem] [.registro-header3_&]:[margin:0]"}>Crear Cuenta</h1>
                    <p className={"[.registro-header3_&]:[color:var(--texto-muted)] [.registro-header3_&]:[font-size:0.95rem] [.registro-header3_&]:[margin-top:5px]"}>Completa tus datos para la matrícula</p>
                </div>
                {/* Formulario de registro */}
                <form className={"form3 [display:flex] [flex-direction:column] [gap:15px]"} action="procesar_registro.php" method="POST">
                    <div className={"fila-input [display:flex] [gap:15px]"}>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="p_nombre" placeholder="Primer Nombre" required />
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="s_nombre" placeholder="Segundo Nombre" />
                        </div>
                    </div>

                    <div className={"fila-input [display:flex] [gap:15px]"}>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person-vcard [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="p_apellido" placeholder="Primer Apellido" required />
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person-vcard [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="s_apellido" placeholder="Segundo Apellido" />
                        </div>
                    </div>

                    <div className={"fila-input [display:flex] [gap:15px]"}>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <select className={"select-input [border:none] [background:transparent] [outline:none] [width:100%] [color:var(--texto-principal)] [font-weight:500]"} name="tipo_doc" required>
                                <option value="" disabled selected>Tipo</option>
                                <option value="TI">T.I.</option>
                                <option value="CC">C.C.</option>
                                <option value="RC">R.C.</option>
                            </select>
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-card-text [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="n_documento" placeholder="Número de Documento" required />
                        </div>
                    </div>

                    <div className={"fila-input [display:flex] [gap:15px]"}>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-telephone [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="tel" name="telefono" placeholder="Teléfono / Celular" required />
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-mortarboard [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <select className={"select-input [border:none] [background:transparent] [outline:none] [width:100%] [color:var(--texto-principal)] [font-weight:500]"} name="grado" required>
                                <option value="" disabled selected>Grado a ingresar</option>
                                <option value="6">Sexto</option>
                                <option value="7">Séptimo</option>
                                <option value="8">Octavo</option>
                                <option value="9">Noveno</option>
                                <option value="10">Décimo</option>
                                <option value="11">Once</option>
                            </select>
                        </div>
                    </div>

                    <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                        <i className={"bi bi-envelope-at [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                        <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="email" name="correo" placeholder="Correo Electrónico" required />
                    </div>

                    <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                        <i className={"bi bi-shield-lock [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                        <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="password" name="pass" placeholder="Crear Contraseña" required />
                    </div>

                    <div className={"contenedor-boton [display:flex] [justify-content:center] [align-items:center] [padding:20px] [width:100%]"}>
                        <Link to="/PerfilUsuario" className={"btn-registrar [background:linear-gradient(135deg,_var(--cyan-primario)_0%,_var(--cyan-brillante)_100%)] [color:rgba(255,_255,_255,_0.889)] [border:none] [padding:16px] [border-radius:12px] [font-weight:700] [font-size:1rem] [cursor:pointer] [margin-top:10px] [box-shadow:0_8px_20px_rgba(79,_172,_254,_0.3)] [transition:0.3s] [&:hover]:[transform:translateY(-2px)] [&:hover]:[box-shadow:0_12px_25px_rgba(79,_172,_254,_0.4)] [text-decoration:none] [padding:12px_30px] [background-color:#1a1c2d] [color:#4facfe] [font-weight:bold] [border:1px_solid_rgba(79,_172,_254,_0.3)] [&:hover]:[background-color:#4facfe] [&:hover]:[color:#1a1c2d] [&:hover]:[transform:translateY(-3px)]"}>INICIAR SESIÓN</Link>
                    </div>

                    <div className="pie-cuadro mt-4 text-center">
                        <div className="botones-inferiores flex flex-wrap justify-center gap-3">
                            <Link
                                to="/SelecionRol"
                                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                            >
                                <i className="bi bi-arrow-left text-blue-500" aria-hidden="true"></i>
                                Cambiar rol
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-100 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                            >
                                <i className="bi bi-house text-blue-600" aria-hidden="true"></i>
                                Inicio
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default RegistroU
