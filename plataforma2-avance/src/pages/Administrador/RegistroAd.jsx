//import React from 'react'
import { Link } from "react-router-dom"
import "./RegistroAd.css"

const RegistroAd = () => {
    return (
       <div className="pantalla-fondo">
        <div className="cuadro-registro-admin">
            
            <div className="registro-header2">
                <img src="img/logo.png" alt="EasyMatric" className="logo-easymatric"/>
                <div className="badge-admin">PERFIL ADMINISTRATIVO</div>
                <h1>Crear Cuenta Admin</h1>
                <p>Ingresa los datos para gestionar tu institución</p>
            </div>

            <form className="form2" action="procesar_admin.php" method="POST">
                <div className="fila-input">
                    <div className="grupo-input">
                        <i className="bi bi-person-gear"></i>
                        <input type="text" name="nombre_admin" placeholder="Nombre Completo" required/>
                    </div>
                </div>

                <div className="fila-input">
                    <div className="grupo-input" style={{ flex: 1.2 }}>
                        <i className="bi bi-building"></i>
                        <input type="text" name="institucion" placeholder="Nombre de la Institución" required/>
                    </div>
                    <div className="grupo-input"  style={{ flex: 0.8 }}>
                        <select className="select-input" name="cargo" required>
                            <option value="" disabled selected>Cargo</option>
                            <option value="Rector">Rector</option>
                            <option value="Secretario">Administrador</option>
                            <option value="Coordinador">Coordinador</option>
                        </select>
                    </div>
                </div>

                <div className="fila-input">
                    <div className="grupo-input">
                        <i className="bi bi-card-checklist"></i>
                        <input type="text" name="n_documento" placeholder="Número de Documento" required/>
                    </div>
                    <div className="grupo-input">
                        <i className="bi bi-telephone-plus"></i>
                        <input type="tel" name="telefono" placeholder="Teléfono Oficina" required/>
                    </div>
                </div>

                <div className="grupo-input">
                    <i className="bi bi-envelope-check"></i>
                    <input type="email" name="correo" placeholder="Correo Institucional" required/>
                </div>

                <div className="grupo-input">
                    <i className="bi bi-shield-lock-fill"></i>
                    <input type="password" name="pass" placeholder="Contraseña de Seguridad" required/>
                </div>

                <div className="contenedor-boton">
                        <a href="RegistrarSede.html" className="btn-registrar">INICIAR SESIÓN</a>
                </div>

            </form>

            <div className="pie-cuadro">
                <div className="botones-inferiores">
                    <Link to="/SelecionRol" className="btn-mini"><i className="bi bi-arrow-left"></i> Cambiar Rol</Link>
                    <Link to="/" className="btn-mini"><i className="bi bi-house"></i> Inicio</Link>
                </div>
            </div>

        </div>
    </div>
    )
}

export default RegistroAd

