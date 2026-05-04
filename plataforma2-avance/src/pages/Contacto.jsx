//import React from 'react'
import "./Contacto.css"
const Contacto = () => {
    return (
        <main class="contenido-contacto">
            <section id="contacto" class="seccion-contacto">


                <div class="layout-contacto">

                    <div class="canales-soporte">
                        <div class="tarjeta-blanca">
                            <h1>Centro de Contacto y Soporte</h1>
                            <p>¿Tienes dudas con el proceso de matrícula? Estamos aquí para ayudarte.</p>
                            <br />
                            <br />
                            <i class="bi bi-telephone-fill color-cian"></i>
                            <h3>Línea Telefónica</h3>
                            <p>(602) 820 0000 - Ext 102</p>
                            <br />
                            <i class="bi bi-envelope-at-fill color-cian"></i>
                            <h3>Correo Electrónico</h3>
                            <p>secretaria@easymatric.edu.co</p>
                            <br />

                            <i class="bi bi-clock-fill color-cian"></i>
                            <h3>Horario de Atención</h3>
                            <p>Lunes a Viernes: 7:00 AM - 4:00 PM</p>
                        </div>
                    </div>

                    <div class="formulario-contacto tarjeta-blanca">
                        <h2>Envíanos un mensaje</h2>
                        <form>
                            <div class="input-grupo">
                                <label>Nombre Completo</label>
                                <input type="text" placeholder="Ej. Juan Pérez" required />
                            </div>
                            <div class="input-grupo">
                                <label>Correo Electrónico</label>
                                <input type="email" placeholder="correo@ejemplo.com" required />
                            </div>
                            <div class="input-grupo">
                                <label>Mensaje</label>
                                <textarea placeholder="Cuéntanos tu duda..." required></textarea>
                            </div>
                            <div class="contenedor-boton-form">
                                <button type="submit" class="btn-registrar">ENVIAR CONSULTA</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contacto
