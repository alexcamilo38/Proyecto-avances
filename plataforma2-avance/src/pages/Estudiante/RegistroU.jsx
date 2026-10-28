import { Link } from "react-router-dom"

import logoazul from '../../assets/LogoAzul.png';
const RegistroU = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-slate-50 to-amber-100 px-4 py-8 sm:px-6 [--cyan-primario:#f97316]">
            <div className="w-full max-w-3xl rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-orange-950/10 sm:p-9 lg:p-11">
                <div className="mb-8 text-center">
                    <img src={logoazul} alt="EasyMatric" className="mx-auto mb-5 h-11 w-auto" />
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700">
                        <i className="bi bi-mortarboard" aria-hidden="true" />
                        Perfil estudiante
                    </span>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Crear cuenta de estudiante</h1>
                    <p className="mt-2 text-sm text-slate-500 sm:text-base">Completa tus datos para iniciar el proceso de matrícula.</p>
                </div>
                {/* Formulario de registro */}
                <form className="flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="p_nombre" placeholder="Primer Nombre" required />
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="s_nombre" placeholder="Segundo Nombre" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person-vcard [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="p_apellido" placeholder="Primer Apellido" required />
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-person-vcard [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="text" name="s_apellido" placeholder="Segundo Apellido" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <select className={"select-input [border:none] [background:transparent] [outline:none] [width:100%] [color:var(--texto-principal)] [font-weight:500]"} name="tipo_doc" defaultValue="" required>
                                <option value="" disabled>Tipo</option>
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

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-telephone [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="tel" name="telefono" placeholder="Teléfono / Celular" required />
                        </div>
                        <div className={"grupo-input [background:var(--gris-suave)] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:12px] [flex:1] [transition:all_0.3s_ease] [&:focus-within]:[border-color:var(--cyan-primario)] [&:focus-within]:[background:var(--blanco-fondo)] [&:focus-within]:[box-shadow:0_0_8px_rgba(79,_172,_254,_0.15)]"}>
                            <i className={"bi bi-mortarboard [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                            <select className={"select-input [border:none] [background:transparent] [outline:none] [width:100%] [color:var(--texto-principal)] [font-weight:500]"} name="grado" defaultValue="" required>
                                <option value="" disabled>Grado a ingresar</option>
                                <option value="6">Sexto</option>
                                <option value="7">Séptimo</option>
                                <option value="8">Octavo</option>
                                <option value="9">Noveno</option>
                                <option value="10">Décimo</option>
                                <option value="11">Once</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-orange-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10">
                        <i className={"bi bi-envelope-at [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                        <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="email" name="correo" placeholder="Correo Electrónico" required />
                    </div>

                    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-orange-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10">
                        <i className={"bi bi-shield-lock [.grupo-input_&]:[color:var(--cyan-primario)] [.grupo-input_&]:[font-size:1.1rem] [.link-irInicio_&]:[font-size:1rem]"}></i>
                        <input className={"[.grupo-input_&]:[border:none] [.grupo-input_&]:[background:transparent] [.grupo-input_&]:[outline:none] [.grupo-input_&]:[width:100%] [.grupo-input_&]:[color:var(--texto-principal)] [.grupo-input_&]:[font-weight:500]"} type="password" name="pass" placeholder="Crear Contraseña" required />
                    </div>

                    <div className="flex w-full justify-center pt-2">
                        <Link to="/student" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-700/20 transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/30 sm:w-auto sm:min-w-56">
                            Ir al panel de estudiante
                            <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="pie-cuadro mt-4 text-center">
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                to="/SelecionRol"
                                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                            >
                                <i className="bi bi-arrow-left text-orange-500" aria-hidden="true"></i>
                                Cambiar rol
                            </Link>
                            <Link
                                to="/"
                                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-100 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                            >
                                <i className="bi bi-house text-orange-600" aria-hidden="true"></i>
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
