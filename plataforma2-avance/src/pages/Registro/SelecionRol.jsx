//import React from 'react'

import logoazul from '../../assets/LogoAzul.png';
// Importación de navegación entre páginas
import { Link } from "react-router-dom"

const SelecionRol = () => {
  return (
     <div className={"pantalla-fondo [background-color:var(--gris-fondo)] [height:100vh] [display:flex] [justify-content:center] [align-items:center]"}>
        <div className={"cuadro-seleccion-principal [background:var(--blanco)] [width:100vh] [max-width:500px] [padding:45px] [border-radius:30px] [box-shadow:var(--sombra)] [border:1px_solid_var(--gris-borde)] [text-align:center]"}>
            
            <div className="registro-header">
                <img src={logoazul} alt="EasyMatric" className={"logo-easymatric [height:55px] [display:block] [margin:0_auto_15px]"}/>
                <h1 className={"[.registro-header_&]:[color:var(--azul-dark)] [.registro-header_&]:[font-size:1.8rem] [.registro-header_&]:[margin:0]"}>Bienvenido a EasyMatric</h1>
                <p className={"[.registro-header_&]:[color:#94a3b8] [.registro-header_&]:[font-size:0.9rem] [.registro-header_&]:[margin-bottom:35px] [.pie-cuadro_&]:[font-size:0.85rem] [.pie-cuadro_&]:[color:#64748b]"}>Selecciona tu perfil para continuar con el registro</p>
            </div>
                {/* Opciones de roles */}
            <div className={"contenedor-roles [display:flex] [flex-direction:column] [gap:15px]"}>
                <Link to="/RegistroAd" className={"opcion-rol [display:flex] [align-items:center] [padding:20px] [background:var(--gris-fondo)] [border:2px_solid_transparent] [border-radius:20px] [text-decoration:none] [transition:all_0.3s_ease] [&:hover]:[border-color:var(--cyan-em)] [&:hover]:[background:var(--blanco)] [&:hover]:[transform:scale(1.02)] [&:hover]:[box-shadow:0_10px_20px_rgba(79,_172,_254,_0.1)] [.pie-cuadro_&]:[color:var(--cyan-em)] [.pie-cuadro_&]:[text-decoration:none] [.pie-cuadro_&]:[font-weight:700]"}>
                    <div className={"icono-box [width:50px] [height:50px] [background:var(--blanco)] [border-radius:12px] [display:flex] [justify-content:center] [align-items:center] [margin-right:15px] [box-shadow:0_4px_10px_rgba(0,0,0,0.05)]"}>
                        <i className={"bi bi-shield-lock [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)]"}></i>
                    </div>
                    <div className={"texto-rol [text-align:left] [flex-grow:1]"}>
                        <span className={"titulo-rol [display:block] [font-weight:700] [color:var(--azul-dark)] [font-size:1.1rem]"}>Administrador</span>
                        <span className={"desc-rol [font-size:0.8rem] [color:#64748b]"}>Gestión institucional y control</span>
                    </div>
                    <i className={"bi bi-chevron-right flecha [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)] [color:#cbd5e1] [transition:0.3s] [.opcion-rol:hover_&]:[color:var(--cyan-em)] [.opcion-rol:hover_&]:[transform:translateX(5px)]"}></i>
                </Link>
                {/* Rol docente*/}
                <Link to="/RegistroDo" className={"opcion-rol [display:flex] [align-items:center] [padding:20px] [background:var(--gris-fondo)] [border:2px_solid_transparent] [border-radius:20px] [text-decoration:none] [transition:all_0.3s_ease] [&:hover]:[border-color:var(--cyan-em)] [&:hover]:[background:var(--blanco)] [&:hover]:[transform:scale(1.02)] [&:hover]:[box-shadow:0_10px_20px_rgba(79,_172,_254,_0.1)] [.pie-cuadro_&]:[color:var(--cyan-em)] [.pie-cuadro_&]:[text-decoration:none] [.pie-cuadro_&]:[font-weight:700]"}>
                    <div className={"icono-box [width:50px] [height:50px] [background:var(--blanco)] [border-radius:12px] [display:flex] [justify-content:center] [align-items:center] [margin-right:15px] [box-shadow:0_4px_10px_rgba(0,0,0,0.05)]"}>
                        <i className={"bi bi-folder2-open [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)]"}></i>
                    </div>
                    <div className={"texto-rol [text-align:left] [flex-grow:1]"}>
                        <span className={"titulo-rol [display:block] [font-weight:700] [color:var(--azul-dark)] [font-size:1.1rem]"}>Docente</span>
                        <span className={"desc-rol [font-size:0.8rem] [color:#64748b]"}>Gestión de módulos y evaluación</span>
                    </div>
                    <i className={"bi bi-chevron-right flecha [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)] [color:#cbd5e1] [transition:0.3s] [.opcion-rol:hover_&]:[color:var(--cyan-em)] [.opcion-rol:hover_&]:[transform:translateX(5px)]"}></i>
                </Link>
                {/* Rol estudiante */}
                <Link to="/RegistroU" className={"opcion-rol [display:flex] [align-items:center] [padding:20px] [background:var(--gris-fondo)] [border:2px_solid_transparent] [border-radius:20px] [text-decoration:none] [transition:all_0.3s_ease] [&:hover]:[border-color:var(--cyan-em)] [&:hover]:[background:var(--blanco)] [&:hover]:[transform:scale(1.02)] [&:hover]:[box-shadow:0_10px_20px_rgba(79,_172,_254,_0.1)] [.pie-cuadro_&]:[color:var(--cyan-em)] [.pie-cuadro_&]:[text-decoration:none] [.pie-cuadro_&]:[font-weight:700]"}>
                    <div className={"icono-box [width:50px] [height:50px] [background:var(--blanco)] [border-radius:12px] [display:flex] [justify-content:center] [align-items:center] [margin-right:15px] [box-shadow:0_4px_10px_rgba(0,0,0,0.05)]"}>
                        <i className={"bi bi-mortarboard [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)]"}></i>
                    </div>
                    <div className={"texto-rol [text-align:left] [flex-grow:1]"}>
                        <span className={"titulo-rol [display:block] [font-weight:700] [color:var(--azul-dark)] [font-size:1.1rem]"}>Estudiante / Aspirante</span>
                        <span className={"desc-rol [font-size:0.8rem] [color:#64748b]"}>Proceso de matrícula y consultas</span>
                    </div>
                    <i className={"bi bi-chevron-right flecha [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)] [color:#cbd5e1] [transition:0.3s] [.opcion-rol:hover_&]:[color:var(--cyan-em)] [.opcion-rol:hover_&]:[transform:translateX(5px)]"}></i>
                </Link>
            </div>

            <div className={"pie-cuadro [margin-top:30px]"}>
                {/* Link para iniciar sesión */}
                <p className={"[.registro-header_&]:[color:#94a3b8] [.registro-header_&]:[font-size:0.9rem] [.registro-header_&]:[margin-bottom:35px] [.pie-cuadro_&]:[font-size:0.85rem] [.pie-cuadro_&]:[color:#64748b]"}>¿Ya tienes cuenta? <Link className={"[.pie-cuadro_&]:[color:var(--cyan-em)] [.pie-cuadro_&]:[text-decoration:none] [.pie-cuadro_&]:[font-weight:700]"} to="/Login" >Inicia sesión</Link></p>
                <div className={"botones-inferiores [display:flex] [justify-content:center] [gap:10px] [margin-top:20px]"}>
                    <Link to="/" className={"btn-mini [.pie-cuadro_&]:[color:var(--cyan-em)] [.pie-cuadro_&]:[text-decoration:none] [.pie-cuadro_&]:[font-weight:700] [background:var(--azul-dark)] [color:white] [padding:8px_15px] [border-radius:10px] [font-size:0.75rem] [text-decoration:none] [display:flex] [align-items:center] [gap:5px] [transition:0.3s] [&:hover]:[background:var(--cyan-em)]"}><i className={"bi bi-house [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)]"}></i> Inicio</Link>
                    <Link to="/Contacto" className={"btn-mini [.pie-cuadro_&]:[color:var(--cyan-em)] [.pie-cuadro_&]:[text-decoration:none] [.pie-cuadro_&]:[font-weight:700] [background:var(--azul-dark)] [color:white] [padding:8px_15px] [border-radius:10px] [font-size:0.75rem] [text-decoration:none] [display:flex] [align-items:center] [gap:5px] [transition:0.3s] [&:hover]:[background:var(--cyan-em)]"}><i className={"bi bi-headset [.icono-box_&]:[font-size:1.5rem] [.icono-box_&]:[color:var(--cyan-em)]"}></i> Soporte</Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default SelecionRol
