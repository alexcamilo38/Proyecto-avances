import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoazul from "../assets/LogoAzul.png";



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
      navigate("/admin");
    } else if (email === "estudiante@easymatric.com" && password === "123456") {
      navigate("/student");
    } else if (email === "docente@easymatric.com" && password === "123456") {
      navigate("/teacher");
    } else {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-5 max-[900px]:items-start max-[900px]:p-3">
      <div className={"login-container [display:flex] [width:100%] [max-width:1100px] [height:700px] [background-color:var(--color-secundario)] [border-radius:40px] [overflow:hidden] [box-shadow:0_25px_50px_rgba(0,_0,_0,_0.15)] [position:relative] max-[900px]:[flex-direction:column] max-[900px]:[height:auto]"}>
        <div className={"login-left [flex:1.2] [background-color:var(--blanco)] [padding:40px] [display:flex] [flex-direction:column] [justify-content:space-between] [border-radius:0_100px_350px_0] [z-index:2] max-[900px]:[border-radius:0_0_50px_50px] max-[900px]:[padding:50px_20px]"}>
          {/* Botón para regresar al inicio */}
          <Link to="/" className={"volver [color:var(--texto-secundario)] [font-weight:600] [font-size:0.9rem] [display:flex] [align-items:center] [gap:5px] [transition:0.3s] [&:hover]:[color:var(--color-primario)] [.extra_&]:[color:var(--color-acento)] [.extra_&]:[font-weight:700] [.extra_&]:[margin-left:5px]"}>
            <i className="bi bi-arrow-left-short"></i> Volver al inicio
          </Link>

          <div className={"brand-container [display:flex] [flex-direction:column] [align-items:center] [justify-content:center] [gap:12px] [width:100%] [margin-bottom:20px]"}>
            <img src={logoazul} alt="EasyMatric" className={"logo-img1 [width:200px] [height:auto] [display:block] [margin:0_auto]"} />
          </div>

          <div className={"welcome-content [text-align:center]"}>
            <h1 className={"[.welcome-content_&]:[font-size:2rem] [.welcome-content_&]:[color:var(--texto-principal)] [.welcome-content_&]:[margin-bottom:10px]"}>Bienvenido a EasyMatric</h1>
            <p>
              Accede a tu cuenta para gestionar tu proceso de matrícula de forma
              rápida y segura.
            </p>
            {/* SVG remoto funcional y confiable */}
            <img
              src="../src/assets/ilustracion estudiando.jpg"
              alt="Ilustración Estudiando"
              className={"main-illustration [max-width:250px] [margin-top:20px]"}
            />
          </div>

          <div className={"footer-copy [font-size:0.7rem] [color:var(--texto-secundario)]"}>
            <p>&copy; 2026 EasyMatric - Gestión Educativa Eficiente</p>
          </div>
        </div>

        <div className={"login-right [flex:0.8] [display:flex] [align-items:center] [justify-content:center] [padding:40px]"}>
          {/* Formulario de inicio de sesión */}
          <form className={"login-form [width:100%] [max-width:320px] [color:var(--blanco)]"} onSubmit={handleLogin}>
            <h2 className={"[.login-form_&]:[font-size:2.2rem] [.login-form_&]:[margin-bottom:5px]"}>Iniciar Sesión</h2>
            <p className={"form-subtitle [font-size:0.9rem] [opacity:0.7] [margin-bottom:30px]"}>
              Ingresa tus credenciales para continuar
            </p>

            {/* Mensaje de error dinámico */}
            {error && <div className="alert-error" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

            <div className={"input-group [margin-bottom:20px]"}>
              <label className={"[.input-group_&]:[display:block] [.input-group_&]:[margin-bottom:8px] [.input-group_&]:[font-size:0.85rem] [.input-group_&]:[color:rgba(255,_255,_255,_0.9)]"}>
                <i className="bi bi-envelope"></i> Correo electrónico
              </label>
              <input className={"[.input-group_&]:[width:100%] [.input-group_&]:[padding:14px_20px] [.input-group_&]:[border-radius:50px] [.input-group_&]:[border:1px_solid_rgba(255,_255,_255,_0.2)] [.input-group_&]:[background:rgba(0,_0,_0,_0.1)] [.input-group_&]:[color:var(--blanco)] [.input-group_&]:[outline:none]"}
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={"input-group [margin-bottom:20px]"}>
              <label className={"[.input-group_&]:[display:block] [.input-group_&]:[margin-bottom:8px] [.input-group_&]:[font-size:0.85rem] [.input-group_&]:[color:rgba(255,_255,_255,_0.9)]"}>
                <i className="bi bi-lock"></i> Contraseña
              </label>
              <input className={"[.input-group_&]:[width:100%] [.input-group_&]:[padding:14px_20px] [.input-group_&]:[border-radius:50px] [.input-group_&]:[border:1px_solid_rgba(255,_255,_255,_0.2)] [.input-group_&]:[background:rgba(0,_0,_0,_0.1)] [.input-group_&]:[color:var(--blanco)] [.input-group_&]:[outline:none]"}
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link to="/ReperaContra" className={"forgot-link [display:block] [text-align:right] [font-size:0.75rem] [margin-top:8px] [color:var(--color-acento)] [.extra_&]:[color:var(--color-acento)] [.extra_&]:[font-weight:700] [.extra_&]:[margin-left:5px]"}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button type="submit" className={"btn-submit [width:100%] [padding:15px] [border-radius:50px] [border:none] [background-color:#2b67c6] [color:var(--blanco)] [font-weight:700] [font-size:1rem] [cursor:pointer] [transition:0.3s] [margin-top:10px] [&:hover]:[background-color:#556994] [&:hover]:[transform:translateY(-2px)]"}>
              Ingresar
            </button>

            <div className={"extra [text-align:center] [margin-top:25px] [font-size:0.9rem]"}>
              <span>¿No tienes cuenta?</span>
              <Link className={"[.extra_&]:[color:var(--color-acento)] [.extra_&]:[font-weight:700] [.extra_&]:[margin-left:5px]"} to="/SelecionRol">Regístrate aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;