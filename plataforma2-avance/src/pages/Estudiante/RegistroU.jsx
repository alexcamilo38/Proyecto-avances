//import React from 'react'
import { Link } from "react-router-dom"
import "./RegistroU.css"
const RegistroU = () => {
    return (
        <div class="contenido-derecho">
            <div class="registro-header">
                <img src="img/logo.png" alt="EasyMatric" class="logo-easymatric" />
                <h1>Crear Cuenta</h1>
                <p>Completa tus datos para la matrícula</p>
            </div>

            <form action="procesar_registro.php" method="POST">
                <div class="fila-input">
                    <div class="grupo-input">
                        <i class="bi bi-person"></i>
                        <input type="text" name="p_nombre" placeholder="Primer Nombre" required />
                    </div>
                    <div class="grupo-input">
                        <i class="bi bi-person"></i>
                        <input type="text" name="s_nombre" placeholder="Segundo Nombre" />
                    </div>
                </div>

                <div class="fila-input">
                    <div class="grupo-input">
                        <i class="bi bi-person-vcard"></i>
                        <input type="text" name="p_apellido" placeholder="Primer Apellido" required />
                    </div>
                    <div class="grupo-input">
                        <i class="bi bi-person-vcard"></i>
                        <input type="text" name="s_apellido" placeholder="Segundo Apellido" />
                    </div>
                </div>

                <div class="fila-input">
                    <div class="grupo-input" >
                        <select class="select-input" name="tipo_doc" required>
                            <option value="" disabled selected>Tipo</option>
                            <option value="TI">T.I.</option>
                            <option value="CC">C.C.</option>
                            <option value="RC">R.C.</option>
                        </select>
                    </div>
                    <div class="grupo-input">
                        <i class="bi bi-card-text"></i>
                        <input type="text" name="n_documento" placeholder="Número de Documento" required />
                    </div>
                </div>

                <div class="fila-input">
                    <div class="grupo-input">
                        <i class="bi bi-telephone"></i>
                        <input type="tel" name="telefono" placeholder="Teléfono / Celular" required />
                    </div>
                    <div class="grupo-input">
                        <i class="bi bi-mortarboard"></i>
                        <select class="select-input" name="grado" required>
                            <option value="" disabled selected>Grado a ingresar</option>
                            <option value="6">Sexto</option>
                            <option value="7">Séptimo</option>
                            <option value="8">Octavo</option>
                            <option value="9">Noveno</option>
                            <option value="10">Décimo</option>
                            <option value="11">Once</option>
                        </select>
                    </div>
                </div>

                <div class="grupo-input">
                    <i class="bi bi-envelope-at"></i>
                    <input type="email" name="correo" placeholder="Correo Electrónico" required />
                </div>

                <div class="grupo-input">
                    <i class="bi bi-shield-lock"></i>
                    <input type="password" name="pass" placeholder="Crear Contraseña" required />
                </div>

                <div class="contenedor-boton">
                    <a href="perfilUsuario.html" class="btn-registrar">INICIAR SESIÓN</a>
                </div>
            
                <div class="pie-cuadro">
                    <div class="botones-inferiores">
                        <Link to="/SelecionRol" class="btn-mini"><i class="bi bi-arrow-left"></i> Cambiar Rol</Link>
                        <Link to="/" class="btn-mini"><i class="bi bi-house"></i> Inicio</Link>
                    </div>
                </div>
            </form>

        </div>

    )
}

export default RegistroU
