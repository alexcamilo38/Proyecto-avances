//import React from 'react'
 import { Link } from "react-router-dom";
import "./Login.css"
const Login = () => {
  return (
<div>
    <div className="login-container">
        <div className="login-left">
            <Link to="/" className="volver">
            <i className="bi bi-arrow-left-short"></i> Volver al inicio
            </Link>

            <div className="brand-container">
                <img src="img/LogoAzul.png" alt="EasyMatric" className="logo-img1"/>
            </div>

            <div className="welcome-content">
                <h1>Bienvenido a EasyMatric</h1>
                <p>
                    Accede a tu cuenta para gestionar tu proceso
                    de matrícula de forma rápida y segura.
                </p>
                <img src="https://illustrations.popsy.co/blue/studying.svg" alt="Ilustración" className="main-illustration"/>
            </div>

            <div className="footer-copy">
                <p>&copy; 2026 EasyMatric - Gestión Educativa Eficiente</p>
            </div>
        </div>

        <div className="login-right">
            <form className="login-form">
                <h2>Iniciar Sesión</h2>
                <p className="form-subtitle">Ingresa tus credenciales para continuar</p>

                <div className="input-group">
                    <label><i className="bi bi-envelope"></i> Correo electrónico</label>
                    <input type="email" placeholder="ejemplo@correo.com" required/>
                </div>

                <div className="input-group">
                    <label><i className="bi bi-lock"></i> Contraseña</label>
                    <input type="password" placeholder="Tu contraseña" required/>
                    <Link to="/ReperaContra" className="forgot-link">¿Olvidaste tu contraseña?</Link>
                </div>

                <button type="submit" className="btn-submit">Ingresar</button>

                <div className="extra">
                    <span>¿No tienes cuenta?</span>
                    <Link to="/SelecionRol">Regístrate aquí</Link>
                </div>
            </form>
        </div>
    </div>
</div>

  )
}

export default Login
