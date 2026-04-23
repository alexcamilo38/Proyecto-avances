//import React from 'react'
import "./Home.css"
const Home = () => {
  return (
    <div>
        <section id="Inicio" class="seccion-inicio">
        <div class="inicio-contenedor">
            <div class="inicio-texto">
                <h1>Transformamos la matrícula estudiantil</h1> 
                <p class="descripcion-inicio">
                    EasyMatric es una plataforma digital diseñada para modernizar el proceso
                    de matrícula en instituciones públicas, permitiendo que estudiantes 
                    y administradores gestionen todo de manera rápida,
                    organizada y desde cualquier lugar.
                </p>

                <div class="inicio-botones">
                    <a href="Login.html" class="btn-hero-primary">Iniciar Sesión</a>
                    <a href="registro.html" class="btn-hero-secondary">Registrarse</a>
                </div>
            </div>

            <div class="imagen-inicio">
                <img src="img/matricula.png" alt="Matrícula Digital"/>
            </div>
        </div>
    </section>

<section id="Nosotros" class="seccion-nosotros">
    <div class="container12">
        <div class="nosotros-info">
            <span class="principal-nosotros">Sobre Nosotros</span>
            <h2>Un equipo comprometido con la educación digital</h2>
            <div class="line12"></div>
        </div>

        <div class="texto-nosotros">
            <p>
                Somos un equipo conformado por <strong>seis aprendices del SENA</strong>, unidos con el propósito de desarrollar soluciones tecnológicas que mejoren los procesos educativos en las instituciones públicas.
            </p>
            <p>
                <strong>EasyMatric</strong> surge como una iniciativa orientada a resolver una necesidad real: la dificultad de gestionar procesos de matrícula de forma ordenada, rápida y transparente. Más que digitalizar formularios, buscamos transformar la relación entre la institución y el estudiante.
            </p>
        </div>

        <div class="grid">
            <div class="card">
                <h3>Misión</h3>
                <p>Facilitar procesos académicos mediante una plataforma segura que reduzca tiempos y mejore la atención institucional.</p>
            </div>
            <div class="card">
                <h3>Visión</h3>
                <p>Convertirnos en una referencia tecnológica para la modernización educativa en instituciones públicas y privadas.</p>
            </div>
            <div class="card">
                <h3>Objetivo</h3>
                <p>Automatizar el proceso de matrícula para disminuir errores y centralizar la información estudiantil.</p>
            </div>
        </div>
    </div>
</section>

<section id="Servicios" class="seccion-modulos">
    <div class="container-centrado">
        <div class="cabecera-modulos">
            <span class="etiqueta-superior">Funcionalidades</span>
            <h2>Ecosistema Digital EasyMatric</h2>
            <p>Una plataforma diseñada para conectar a toda la comunidad educativa de manera eficiente.</p>
        </div>

        <div class="modulos-grid">
            <div class="modulo-item">
                <div class="modulo-header">
                    <div class="icono-wrap">
                        <i class="bi bi-people-fill"></i>
                    </div>
                    <h3>Estudiantes y Acudientes</h3>
                </div>
                <div class="modulo-body">
                    <p>Autogestión total desde cualquier lugar para facilitar el acceso a la educación.</p>
                    <ul class="lista-cheque">
                        <li><i class="bi bi-check-circle-fill"></i> Pre-registro y Matrícula 24/7</li>
                        <li><i class="bi bi-check-circle-fill"></i> Carga digital de documentos</li>
                        <li><i class="bi bi-check-circle-fill"></i> Notificaciones de estado en tiempo real</li>
                    </ul>
                </div>
            </div>

            <div class="modulo-item destacado">
                <div class="modulo-header">
                    <div class="icono-wrap">
                        <i class="bi bi-pc-display-horizontal"></i>
                    </div>
                    <h3>Gestión Administrativa</h3>
                </div>
                <div class="modulo-body">
                    <p>Herramientas avanzadas para el control total del proceso institucional.</p>
                    <ul class="lista-cheque">
                        <li><i class="bi bi-check-circle-fill"></i> Panel de control de cupos</li>
                        <li><i class="bi bi-check-circle-fill"></i> Validación automatizada de archivos</li>
                        <li><i class="bi bi-check-circle-fill"></i> Generación de informes y analíticas</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

    <section id="Ruta" class="seccion-ruta">
    <div class="container12">
        <div class="cabecera-ruta">
            <span class="etiqueta-viva">Tu Camino al Éxito</span>
            <h2>Ruta de Gestión Educativa</h2>
            <p>Sigue estos pasos para completar tu proceso en tiempo récord.</p>
        </div>

        <div class="timeline-container">
            <div class="timeline-step">
                <div class="step-number">01</div>
                <div class="step-content">
                    <h4>Registro Digital</h4>
                    <p>Crea tu perfil único en la plataforma para centralizar tu información.</p>
                </div>
                <div class="step-icon"><i class="bi bi-person-plus"></i></div>
            </div>

            <div class="timeline-step">
                <div class="step-number">02</div>
                <div class="step-content">
                    <h4>Selección Institucional</h4>
                    <p>Explora y elige la institución académica que mejor se adapte a tus metas.</p>
                </div>
                <div class="step-icon"><i class="bi bi-search"></i></div>
            </div>

            <div class="timeline-step">
                <div class="step-number">03</div>
                <div class="step-content">
                    <h4>Carga de Documentación</h4>
                    <p>Digitaliza y sube tus archivos de forma segura. Adiós al papel.</p>
                </div>
                <div class="step-icon"><i class="bi bi-cloud-arrow-up"></i></div>
            </div>

            <div class="timeline-step">
                <div class="step-number">04</div>
                <div class="step-content">
                    <h4>Validación y Respuesta</h4>
                    <p>Nuestro sistema y la institución validan tu información rápidamente.</p>
                </div>
                <div class="step-icon"><i class="bi bi-patch-check"></i></div>
            </div>

            <div class="timeline-step">
                <div class="step-number">05</div>
                <div class="step-content">
                    <h4>Control de Estado</h4>
                    <p>Monitorea tu avance y descarga tu comprobante de matrícula oficial.</p>
                </div>
                <div class="step-icon"><i class="bi bi-bar-chart-steps"></i></div>
            </div>
        </div>
    </div>
</section>

    <section id="preguntas" class="seccion-faq">
    <div class="container12">
        <h2>Preguntas Frecuentes</h2>
        <div class="line12"></div>
        
        <div class="faq-grid">
            <div class="faq-item">
                <h3><i class="bi bi-phone"></i> ¿Se puede usar desde celular?</h3>
                <p>¡Totalmente! EasyMatric está diseñada bajo la filosofía "Mobile First". Puedes realizar inscripciones, subir documentos y consultar estados desde cualquier smartphone o tablet con acceso a internet.</p>
            </div>

            <div class="faq-item">
                <h3><i class="bi bi-shield-check"></i> ¿Es segura la información?</h3>
                <p>La seguridad es nuestra prioridad. Utilizamos cifrado de datos y protocolos seguros para garantizar que la información personal de estudiantes y acudientes esté protegida contra accesos no autorizados.</p>
            </div>

            <div class="faq-item">
                <h3><i class="bi bi-building"></i> ¿Puede adaptarse a varias instituciones?</h3>
                <p>Sí. Nuestra arquitectura permite parametrizar cupos, grados y requisitos específicos según las necesidades de cada institución educativa, ya sea pública o privada.</p>
            </div>

            <div class="faq-item">
                <h3><i class="bi bi-cloud-arrow-up"></i> ¿Cómo se suben los documentos?</h3>
                <p>El sistema permite cargar archivos en formato PDF o imagen directamente desde el formulario de matrícula, eliminando la necesidad de entregar carpetas físicas en la institución.</p>
            </div>

            <div class="faq-item">
                <h3><i class="bi bi-clock-history"></i> ¿Cuánto tiempo toma el proceso?</h3>
                <p>Un proceso que antes tomaba horas de fila ahora puede completarse en menos de 10 minutos desde la comodidad de tu hogar.</p>
            </div>

            <div class="faq-item">
                <h3><i class="bi bi-headset"></i> ¿Qué pasa si cometo un error en el registro?</h3>
                <p>EasyMatric cuenta con un módulo de soporte y edición donde el administrador o el usuario (según el rol) puede corregir datos antes de la validación final de la matrícula.</p>
            </div>
        </div>
    </div>
</section>

<section id="contacto" class="seccion-contacto">
    <div class="contenedor-contacto">
        
        <div class="contacto-col-izquierda">
            <span class="tag-contacto">CONTACTO</span>
            <h2>Estamos para <br/> <span class="resaltado-azul">Ayudarte</span></h2>
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
      
    </div>
  )
}

export default Home
