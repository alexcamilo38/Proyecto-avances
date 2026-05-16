//import React from 'react'
import "./Contacto.css"
const Contacto = () => {
    return (
        <main className="contenido-contacto">
            <section id="contacto" className="seccion-contacto">


                <div className="layout-contacto">

                    <div className="canales-soporte">
                        <div className="tarjeta-blanca">
                            <h1>Centro de Contacto y Soporte</h1>
                            <p>¿Tienes dudas con el proceso de matrícula? Estamos aquí para ayudarte.</p>
                            <br />
                            <br />
                            <i className="bi bi-telephone-fill color-cian"></i>
                            <h3>Línea Telefónica</h3>
                            <p>(602) 820 0000 - Ext 102</p>
                            <br />
                            <i className="bi bi-envelope-at-fill color-cian"></i>
                            <h3>Correo Electrónico</h3>
                            <p>secretaria@easymatric.edu.co</p>
                            <br />

                            <i className="bi bi-clock-fill color-cian"></i>
                            <h3>Horario de Atención</h3>
                            <p>Lunes a Viernes: 7:00 AM - 4:00 PM</p>
                        </div>
                    </div>

                    <div className="formulario-contacto tarjeta-blanca">
                        <h2>Envíanos un mensaje</h2>
                        {/* formulario sobre las dudas*/}
                        <form>
                            <div className="input-grupo">
                                <label>Nombre Completo</label>
                                <input type="text" placeholder="Ej. Juan Pérez" required />
                            </div>
                            <div className="input-grupo">
                                <label>Correo Electrónico</label>
                                <input type="email" placeholder="correo@ejemplo.com" required />
                            </div>
                            <div className="input-grupo">
                                <label>Mensaje</label>
                                <textarea placeholder="Cuéntanos tu duda..." required></textarea>
                            </div>
                            <div className="contenedor-boton-form">
                                <button type="submit" className="btn-registrar">ENVIAR CONSULTA</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contacto
