//import React from 'react'
import "./Contacto.css"
const Contacto = () => {
    return (
        <section class="seccion-contacto">
            <div class="contenedor-contacto">

                <div class="contacto-col-izquierda">
                    <span class="tag-contacto">CONTACTO</span>
                    <h2>Estamos para <br /> <span class="resaltado-azul">Ayudarte</span></h2>
                    <p class="descripcion">Resuelve tus inquietudes sobre EasyMatric de forma directa.</p>
                </div>

                <div class="contacto-col-derecha">
                    <div class="info-grid-compacto">
                        <div class="info-item">
                            <span class="label">CORREO</span>
                            <p class="valor">soporte@easymatric.com</p>
                        </div>
                        <div class="info-item">
                            <span class="label">UBICACIÓN</span>
                            <p class="valor">Popayán, Colombia</p>
                        </div>
                        <div class="info-item">
                            <span class="label">HORARIO</span>
                            <p class="valor">Lun - Vie: 8am - 6pm</p>
                        </div>
                        <div class="info-item">
                            <span class="label">SOPORTE</span>
                            <p class="valor">Respuesta en 24h</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Contacto
