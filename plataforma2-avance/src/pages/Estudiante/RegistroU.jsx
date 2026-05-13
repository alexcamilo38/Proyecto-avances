//import React from 'react'
import { Link } from "react-router-dom"
import "./RegistroU.css"
const RegistroU = () => {
    return (
        <div className="contenido-derecho">
            <div className="registro-header3">
                <img src="img/LogoAzul.png" alt="EasyMatric" className="logo-easymatric" />
                <h1>Crear Cuenta</h1>
                <p>Completa tus datos para la matrícula</p>
            </div>

            <form className="form3" action="procesar_registro.php" method="POST">
                <div className="fila-input">
                    <div className="grupo-input">
                        <i className="bi bi-person"></i>
                        <input type="text" name="p_nombre" placeholder="Primer Nombre" required />
                    </div>
                    <div className="grupo-input">
                        <i className="bi bi-person"></i>
                        <input type="text" name="s_nombre" placeholder="Segundo Nombre" />
                    </div>
                </div>

                <div className="fila-input">
                    <div className="grupo-input">
                        <i className="bi bi-person-vcard"></i>
                        <input type="text" name="p_apellido" placeholder="Primer Apellido" required />
                    </div>
                    <div className="grupo-input">
                        <i className="bi bi-person-vcard"></i>
                        <input type="text" name="s_apellido" placeholder="Segundo Apellido" />
                    </div>
                </div>

                <div className="fila-input">
                    <div className="grupo-input" >
                        <select className="select-input" name="tipo_doc" required>
                            <option value="" disabled selected>Tipo</option>
                            <option value="TI">T.I.</option>
                            <option value="CC">C.C.</option>
                            <option value="RC">R.C.</option>
                        </select>
                    </div>
                    <div className="grupo-input">
                        <i className="bi bi-card-text"></i>
                        <input type="text" name="n_documento" placeholder="Número de Documento" required />
                    </div>
                </div>

                <div className="fila-input">
                    <div className="grupo-input">
                        <i className="bi bi-telephone"></i>
                        <input type="tel" name="telefono" placeholder="Teléfono / Celular" required />
                    </div>
                    <div className="grupo-input">
                        <i className="bi bi-mortarboard"></i>
                        <select className="select-input" name="grado" required>
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

                <div className="grupo-input">
                    <i className="bi bi-envelope-at"></i>
                    <input type="email" name="correo" placeholder="Correo Electrónico" required />
                </div>

                <div className="grupo-input">
                    <i className="bi bi-shield-lock"></i>
                    <input type="password" name="pass" placeholder="Crear Contraseña" required />
                </div>

                <div className="contenedor-boton">
                    <Link to="/PerfilUsuario" className="btn-registrar">INICIAR SESIÓN</Link>
                </div>
            
                <div className="pie-cuadro">
                    <div className="botones-inferiores">
                        <Link to="/SelecionRol" className="btn-mini"><i className="bi bi-arrow-left"></i> Cambiar Rol</Link>
                        <Link to="/" className="btn-mini"><i className="bi bi-house"></i> Inicio</Link>
                    </div>
                </div>
            </form>

        </div>

    )
}

export default RegistroU
