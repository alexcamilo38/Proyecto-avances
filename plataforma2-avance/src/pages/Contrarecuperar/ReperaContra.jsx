//import React from 'react'
import { Link } from "react-router-dom"
import logoazul from '../../assets/LogoAzul.png';
import "./Recuperacontra.css"
const ReperaContra = () => {
  return (
     <div className="pantalla-fondo2">
        <div className="cuadro-recuperar2">
            
            <div className="recuperar-header3">
                <Link to="./Login"><img src={logoazul} alt="EasyMatric" className="logo-easymatric"/></Link>
                <div className="icono-seguridad">
                    <i className="bi bi-shield-lock-fill"></i>
                </div>
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>Ingresa tu correo institucional o personal y te enviaremos las instrucciones para restablecerla.</p>
            </div>

            <form action="enviar_recuperacion.php" method="POST">
                <div className="grupo1-input">
                    <i className="bi bi-envelope-at"></i>
                    <input type="email" name="correo" placeholder="Correo electrónico registrado" required/>
                </div>

                <button type="submit" className="btn-recuperar">ENVIAR INSTRUCCIONES</button>
            </form>

            <div className="pie-cuadro">
                <Link to="/" className="link-volver">
                    <i className="bi bi-arrow-left"></i> Volver al inicio de sesión
                </Link>
            </div>

        </div>
    </div>
  )
}

export default ReperaContra
