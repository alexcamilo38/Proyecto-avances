//import React from 'react'
import { Link } from "react-router-dom"
// Importación del logo

import logoazul from '../../assets/LogoAzul.png';
const RegistroDo = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-100 px-4 py-8 sm:px-6 [--cyan-em:#10b981] [--azul-admin:#065f46]">
            {/* Contenedor principal del formulario */}
            <div className="w-full max-w-3xl rounded-[2rem] border border-white/80 bg-white p-5 shadow-2xl shadow-emerald-950/10 sm:p-9 lg:p-11">

                <div className="mb-8 text-center">
                    <img src={logoazul} alt="EasyMatric" className="mx-auto mb-5 h-11 w-auto" />
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                        <i className="bi bi-easel2" aria-hidden="true" />
                        Perfil docente
                    </span>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Crear cuenta docente</h1>
                    <p className="mt-2 text-sm text-slate-500 sm:text-base">Ingresa los datos de tu perfil institucional.</p>
                </div>
                {/* Formulario principal */}
                <form className="flex flex-col gap-4" onSubmit={(event) => event.preventDefault()}>

                    {/* Nombre */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-person-gear [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="text"
                                name="nombre_admin"
                                placeholder="Nombre Completo"
                                required
                            />
                        </div>
                    </div>

                    {/* Institución y NIT */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <div className={"grupo-input-docente grupo-institucion [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-building [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="text"
                                name="institucion"
                                placeholder="Nombre de la Institución"
                                required
                            />
                        </div>

                        <div className={"grupo-input-docente grupo-nit [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-hash [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="text"
                                name="nit"
                                placeholder="NIT / Código"
                                required
                            />
                        </div>

                    </div>

                    {/* Documento y Cargo */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-card-checklist [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="text"
                                name="n_documento"
                                placeholder="Número de Documento"
                                required
                            />
                        </div>

                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>

                            <select
                                className={"select-input [border:none] [background:transparent] [outline:none] [width:100%] [color:var(--azul-admin)] [font-weight:500]"}
                                name="cargo"
                                required
                            >
                                <option value="" disabled>
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
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-telephone-plus [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono Oficina"
                                required
                            />
                        </div>

                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-envelope-check [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="email"
                                name="correo"
                                placeholder="Correo Institucional"
                                required
                            />
                        </div>

                    </div>

                    {/* Contraseñas */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-shield-lock-fill [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="password"
                                name="pass"
                                placeholder="Contraseña de Seguridad"
                                required
                            />
                        </div>

                        <div className={"grupo-input-docente [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:12px_15px] [display:flex] [align-items:center] [gap:10px] [flex:1] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_10px_rgba(79,_172,_254,_0.1)]"}>
                            <i className={"bi bi-shield-check [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="password"
                                name="pass_confirm"
                                placeholder="Confirmar Contraseña"
                                required
                            />
                        </div>

                    </div>

                    {/* Términos */}
                    <div className={"contenedor-terminos-docente [margin:20px_0] [font-size:0.8rem] [color:#64748b]"}>

                        <label className={"label-terminos-docente [display:flex] [align-items:flex-start] [gap:8px] [cursor:pointer]"}>

                            <input className={"[.grupo-input-docente_&]:[border:none] [.grupo-input-docente_&]:[background:transparent] [.grupo-input-docente_&]:[outline:none] [.grupo-input-docente_&]:[width:100%] [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-weight:500]"}
                                type="checkbox"
                                name="terminos"
                                required
                            />

                            <span className={"[.label-terminos-docente_&]:[color:#64748b] [.label-terminos-docente_&]:[line-height:1.4]"}>
                                Acepto el tratamiento de datos personales y los{" "}

                                <a href="#" className={"link-terminos-docente [color:#60a5fa] [text-decoration:none]"}>
                                    Términos de Servicio
                                </a>

                            </span>

                        </label>

                    </div>

                    {/* Botón */}
                    <div className="flex w-full justify-center pt-2">

                        <Link
                            to="/teacher"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/30 sm:w-auto sm:min-w-56"
                        >
                            <i className={"bi bi-person-plus [.grupo-input-docente_&]:[color:var(--azul-admin)] [.grupo-input-docente_&]:[font-size:1.1rem]"}></i>
                            Ir al panel docente
                        </Link>

                    </div>

                </form>

                <div className="mt-6 border-t border-slate-100 pt-5">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link to="/SelecionRol" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"><i className="bi bi-arrow-left" aria-hidden="true" /> Cambiar rol</Link>
                        <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"><i className="bi bi-house" aria-hidden="true" /> Inicio</Link>
                    </div>
                </div>

            </div>
        </main>
  )
}

export default RegistroDo
