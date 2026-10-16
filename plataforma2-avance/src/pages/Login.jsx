import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoazul from "../assets/LogoAzul.png";
import "./Login.css";


const Login = () => {
  const navigate = useNavigate();

  // Estados para capturar los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Manejador del inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@easymatric.com" && password === "123456") {
      navigate("/PerfilAd");
    } else if (email === "estudiante@easymatric.com" && password === "123456") {
      navigate("/PerfilUsuario");
    } else if (email === "docente@easymatric.com" && password === "123456") {
      navigate("/PerfilDocente");
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };
  return (
    <div>
      <div className="login-container">
        <div className="login-left">
          {/* Botón para regresar al inicio */}
          <Link to="/" className="volver">
            <i className="bi bi-arrow-left-short"></i> Volver al inicio
          </Link>

          <div className="brand-container">
            <img src={logoazul} alt="EasyMatric" className="logo-img1" />
          </div>

          <div className="welcome-content">
            <h1>Bienvenido a EasyMatric</h1>
            <p>
              Accede a tu cuenta para gestionar tu proceso de matrícula de forma
              rápida y segura.
            </p>
            {/* SVG remoto funcional y confiable */}
            <img
              src="../src/assets/ilustracion estudiando.jpg"
              alt="Ilustración Estudiando"
              className="main-illustration"
            />
          </div>

          <div className="footer-copy">
            <p>&copy; 2026 EasyMatric - Gestión Educativa Eficiente</p>
          </div>
        </div>

        <div className="login-right">
          {/* Formulario de inicio de sesión */}
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <p className="form-subtitle">
              Ingresa tus credenciales para continuar
            </p>

            {/* Mensaje de error dinámico */}
            {error && <div className="alert-error" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

            <div className="input-group">
              <label>
                <i className="bi bi-envelope"></i> Correo electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>
                <i className="bi bi-lock"></i> Contraseña
              </label>
              <input
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link to="/ReperaContra" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button type="submit" className="btn-submit">
              Ingresar
            </button>

            <div className="extra">
              <span>¿No tienes cuenta?</span>
              <Link to="/SelecionRol">Regístrate aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;