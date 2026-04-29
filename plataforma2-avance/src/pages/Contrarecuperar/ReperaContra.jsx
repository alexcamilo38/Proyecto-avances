//import React from 'react'
import { Link } from "react-router-dom"
import "./Recuperacontra.css"
const ReperaContra = () => {
  return (
     <div class="pantalla-fondo">
        <div class="cuadro-recuperar">
            
            <div class="recuperar-header">
                <Link to="./Login"><img src="img/logo.png" alt="EasyMatric" class="logo-easymatric"/></Link>
                <div class="icono-seguridad">
                    <i class="bi bi-shield-lock-fill"></i>
                </div>
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>Ingresa tu correo institucional o personal y te enviaremos las instrucciones para restablecerla.</p>
            </div>

            <form action="enviar_recuperacion.php" method="POST">
                <div class="grupo-input">
                    <i class="bi bi-envelope-at"></i>
                    <input type="email" name="correo" placeholder="Correo electrónico registrado" required/>
                </div>

                <button type="submit" class="btn-recuperar">ENVIAR INSTRUCCIONES</button>
            </form>

            <div class="pie-cuadro">
                <Link to="/" class="link-volver">
                    <i class="bi bi-arrow-left"></i> Volver al inicio de sesión
                </Link>
            </div>

        </div>
    </div>
  )
}

export default ReperaContra
