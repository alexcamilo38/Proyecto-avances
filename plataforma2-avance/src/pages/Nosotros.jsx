//import React from 'react'
import "./Nosotros.css"
const Nosotros = () => {
    return (
        <section className="seccion-nosotros">
            <div className="container12">

                <div className="nosotros-info">
                    <span className="principal-nosotros">Sobre Nosotros</span>
                    <h2>Un equipo comprometido con la educación digital</h2>
                    <div className="line12"></div>
                </div>

                <div className="texto-nosotros">
                    <p>
                        Somos un equipo conformado por <strong>seis aprendices del SENA</strong>, unidos con el propósito de desarrollar soluciones tecnológicas que mejoren los procesos educativos en las instituciones públicas.
                    </p>
                    <p>
                        <strong>EasyMatric</strong> surge como una iniciativa orientada a resolver una necesidad real: la dificultad de gestionar procesos de matrícula de forma ordenada, rápida y transparente. Más que digitalizar formularios, buscamos transformar la relación entre la institución y el estudiante.
                    </p>
                </div>

                <div className="grid">
                    <div className="card">
                        <h3>Misión</h3>
                        <p>Facilitar procesos académicos mediante una plataforma segura que reduzca tiempos y mejore la atención institucional.</p>
                    </div>

                    <div className="card">
                        <h3>Visión</h3>
                        <p>Convertirnos en una referencia tecnológica para la modernización educativa en instituciones públicas y privadas.</p>
                    </div>

                    <div className="card">
                        <h3>Objetivo</h3>
                        <p>Automatizar el proceso de matrícula para disminuir errores y centralizar la información estudiantil.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Nosotros
