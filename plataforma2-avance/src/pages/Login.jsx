//import React from 'react'
 import { Link } from "react-router-dom";
import "./Login.css"
const Login = () => {
  return (
<div>
    <div class="login-container">
        <div class="login-left">
            <Link to="/" className="volver">
            <i className="bi bi-arrow-left-short"></i> Volver al inicio
            </Link>

            <div class="brand-container">
                <img src="img/logo.png" alt="EasyMatric" class="logo-img"/>
                <br/>
                <div class="brand-text">
                    <span class="brand-name">EasyMatric</span>
                    <span class="brand-tagline">Gestión Educativa</span>
                </div>
            </div>

            <div class="welcome-content">
                <h1>Bienvenido a EasyMatric</h1>
                <p>
                    Accede a tu cuenta para gestionar tu proceso
                    de matrícula de forma rápida y segura.
                </p>
                <img src="https://illustrations.popsy.co/blue/studying.svg" alt="Ilustración" class="main-illustration"/>
            </div>

            <div class="footer-copy">
                <p>&copy; 2026 EasyMatric - Gestión Educativa Eficiente</p>
            </div>
        </div>

        <div class="login-right">
            <form class="login-form">
                <h2>Iniciar Sesión</h2>
                <p class="form-subtitle">Ingresa tus credenciales para continuar</p>

                <div class="input-group">
                    <label><i class="bi bi-envelope"></i> Correo electrónico</label>
                    <input type="email" placeholder="ejemplo@correo.com" required/>
                </div>

                <div class="input-group">
                    <label><i class="bi bi-lock"></i> Contraseña</label>
                    <input type="password" placeholder="Tu contraseña" required/>
                    <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
                </div>

                <button type="submit" class="btn-submit">Ingresar</button>

                <div class="extra">
                    <span>¿No tienes cuenta?</span>
                    <a href="RegistroPaso01.html">Regístrate aquí</a>
                </div>
            </form>
        </div>
    </div>
</div>

  )
}

export default Login
