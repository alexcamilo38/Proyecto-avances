//import React from 'react'
import { Link } from "react-router-dom"
import "./RegistroAd.css"

const RegistroAd = () => {
    return (
       <div class="pantalla-fondo">
        <div class="cuadro-registro-admin">
            
            <div class="registro-header">
                <img src="img/logo.png" alt="EasyMatric" class="logo-easymatric"/>
                <div class="badge-admin">PERFIL ADMINISTRATIVO</div>
                <h1>Crear Cuenta Admin</h1>
                <p>Ingresa los datos para gestionar tu institución</p>
            </div>

            <form action="procesar_admin.php" method="POST">
                <div class="fila-input">
                    <div class="grupo-input">
                        <i class="bi bi-person-gear"></i>
                        <input type="text" name="nombre_admin" placeholder="Nombre Completo" required/>
                    </div>
                </div>

                <div class="fila-input">
                    <div class="grupo-input" style={{ flex: 1.2 }}>
                        <i class="bi bi-building"></i>
                        <input type="text" name="institucion" placeholder="Nombre de la Institución" required/>
                    </div>
                    <div class="grupo-input"  style={{ flex: 0.8 }}>
                        <select class="select-input" name="cargo" required>
                            <option value="" disabled selected>Cargo</option>
                            <option value="Rector">Rector</option>
                            <option value="Secretario">Administrador</option>
                            <option value="Coordinador">Coordinador</option>
                        </select>
                    </div>
                </div>

                <div class="fila-input">
                    <div class="grupo-input">
                        <i class="bi bi-card-checklist"></i>
                        <input type="text" name="n_documento" placeholder="Número de Documento" required/>
                    </div>
                    <div class="grupo-input">
                        <i class="bi bi-telephone-plus"></i>
                        <input type="tel" name="telefono" placeholder="Teléfono Oficina" required/>
                    </div>
                </div>

                <div class="grupo-input">
                    <i class="bi bi-envelope-check"></i>
                    <input type="email" name="correo" placeholder="Correo Institucional" required/>
                </div>

                <div class="grupo-input">
                    <i class="bi bi-shield-lock-fill"></i>
                    <input type="password" name="pass" placeholder="Contraseña de Seguridad" required/>
                </div>

                <div class="contenedor-boton">
                        <a href="RegistrarSede.html" class="btn-registrar">INICIAR SESIÓN</a>
                </div>

            </form>

            <div class="pie-cuadro">
                <div class="botones-inferiores">
                    <Link to="/SelecionRol" class="btn-mini"><i class="bi bi-arrow-left"></i> Cambiar Rol</Link>
                    <Link to="/" class="btn-mini"><i class="bi bi-house"></i> Inicio</Link>
                </div>
            </div>

        </div>
    </div>
    )
}

export default RegistroAd

