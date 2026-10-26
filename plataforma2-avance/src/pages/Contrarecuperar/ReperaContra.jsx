//import React from 'react'
import { Link } from "react-router-dom"
import logoazul from '../../assets/LogoAzul.png';

const ReperaContra = () => {
  return (
     <div className={"pantalla-fondo2 [height:100vh] [display:flex] [justify-content:center] [align-items:center] [padding:20px]"}>
        <div className={"cuadro-recuperar2 [background:var(--blanco)] [width:100%] [max-width:450px] [padding:40px] [border-radius:30px] [box-shadow:var(--sombra)] [border:1px_solid_var(--gris-borde)] [text-align:center]"}>
            
            <div className="recuperar-header3">
                <Link to="/Login"><img src={logoazul} alt="EasyMatric" className={"logo-easymatric [height:40px] [margin-bottom:25px]"}/></Link>
                <div className={"icono-seguridad [width:70px] [height:70px] [background:#f0f9ff] [color:var(--cyan-em)] [font-size:2rem] [border-radius:50%] [display:flex] [justify-content:center] [align-items:center] [margin:0_auto_20px]"}>
                    <i className={"bi bi-shield-lock-fill [.grupo1-input_&]:[color:var(--cyan-em)]"}></i>
                </div>
                <h1 className={"[.recuperar-header3_&]:[color:var(--azul-dark)] [.recuperar-header3_&]:[font-size:1.5rem] [.recuperar-header3_&]:[margin-bottom:10px]"}>¿Olvidaste tu contraseña?</h1>
                <p className={"[.recuperar-header3_&]:[color:var(--texto-muted)] [.recuperar-header3_&]:[font-size:0.9rem] [.recuperar-header3_&]:[line-height:1.5] [.recuperar-header3_&]:[margin-bottom:30px]"}>Ingresa tu correo institucional o personal y te enviaremos las instrucciones para restablecerla.</p>
            </div>
             {/* Formulario de recuperación */}
            <form action="enviar_recuperacion.php" method="POST">
                <div className={"grupo1-input [background:#f8fafc] [border:1.5px_solid_var(--gris-borde)] [border-radius:12px] [padding:14px_18px] [display:flex] [align-items:center] [gap:12px] [margin-bottom:20px] [transition:0.3s] [&:focus-within]:[border-color:var(--cyan-em)] [&:focus-within]:[background:white] [&:focus-within]:[box-shadow:0_0_12px_rgba(79,_172,_254,_0.1)]"}>
                    <i className={"bi bi-envelope-at [.grupo1-input_&]:[color:var(--cyan-em)]"}></i>
                    <input className={"[.grupo1-input_&]:[border:none] [.grupo1-input_&]:[background:transparent] [.grupo1-input_&]:[outline:none] [.grupo1-input_&]:[width:100%] [.grupo1-input_&]:[font-size:0.95rem] [.grupo1-input_&]:[color:var(--azul-dark)]"} type="email" name="correo" placeholder="Correo electrónico registrado" required/>
                </div>

                <button type="submit" className={"btn-recuperar [width:100%] [background:var(--azul-dark)] [color:white] [border:none] [padding:16px] [border-radius:12px] [font-weight:700] [cursor:pointer] [transition:0.3s] [margin-bottom:20px] [&:hover]:[background:var(--cyan-em)] [&:hover]:[box-shadow:0_10px_20px_rgba(79,_172,_254,_0.2)]"}>ENVIAR INSTRUCCIONES</button>
            </form>
            {/* Enlace para volver al login */}
            <div className="pie-cuadro">
                <Link to="/" className={"link-volver [text-decoration:none] [color:var(--texto-muted)] [font-size:0.85rem] [font-weight:600] [display:inline-flex] [align-items:center] [gap:5px] [transition:0.3s] [&:hover]:[color:var(--azul-dark)]"}>
                    <i className={"bi bi-arrow-left [.grupo1-input_&]:[color:var(--cyan-em)]"}></i> Volver al inicio de sesión
                </Link>
            </div>

        </div>
    </div>
  )
}

export default ReperaContra
