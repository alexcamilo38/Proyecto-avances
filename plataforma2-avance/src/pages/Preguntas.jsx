//import React from 'react'
import "./Preguntas.css"
const Preguntas = () => {
    return (
        <section  className="seccion-faq">
            <div className="container10">
                <h2>Preguntas Frecuentes</h2>
                <div className="line10"></div>
                 {/* Contenedor de preguntas */}
                <div className="faq-grid">
                    <div className="faq-item">
                        <h3><i className="bi bi-phone"></i> ¿Se puede usar desde celular?</h3>
                        <p>¡Totalmente! EasyMatric está diseñada bajo la filosofía "Mobile First". Puedes realizar inscripciones, subir documentos y consultar estados desde cualquier smartphone o tablet con acceso a internet.</p>
                    </div>

                    <div className="faq-item">
                        <h3><i className="bi bi-shield-check"></i> ¿Es segura la información?</h3>
                        <p>La seguridad es nuestra prioridad. Utilizamos cifrado de datos y protocolos seguros para garantizar que la información personal de estudiantes y acudientes esté protegida contra accesos no autorizados.</p>
                    </div>

                    <div className="faq-item">
                        <h3><i className="bi bi-building"></i> ¿Puede adaptarse a varias instituciones?</h3>
                        <p>Sí. Nuestra arquitectura permite parametrizar cupos, grados y requisitos específicos según las necesidades de cada institución educativa, ya sea pública o privada.</p>
                    </div>

                    <div className="faq-item">
                        <h3><i className="bi bi-cloud-arrow-up"></i> ¿Cómo se suben los documentos?</h3>
                        <p>El sistema permite cargar archivos en formato PDF o imagen directamente desde el formulario de matrícula, eliminando la necesidad de entregar carpetas físicas en la institución.</p>
                    </div>

                    <div className="faq-item">
                        <h3><i className="bi bi-clock-history"></i> ¿Cuánto tiempo toma el proceso?</h3>
                        <p>Un proceso que antes tomaba horas de fila ahora puede completarse en menos de 10 minutos desde la comodidad de tu hogar.</p>
                    </div>

                    <div className="faq-item">
                        <h3><i className="bi bi-headset"></i> ¿Qué pasa si cometo un error en el registro?</h3>
                        <p>EasyMatric cuenta con un módulo de soporte y edición donde el administrador o el usuario (según el rol) puede corregir datos antes de la validación final de la matrícula.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Preguntas
