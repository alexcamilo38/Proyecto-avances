//import React from 'react'
import "./Home.css"
const Home = () => {
  return (
        <section className="seccion-inicio">
        <div className="inicio-contenedor">
            <div className="principal-texto02">
                <h1 className="titulo2-principal02">Transformamos <br />la matrícula <br />estudiantil</h1> 
                <p className="descripcion-inicio">
                    <br />
                    EasyMatric es una plataforma digital diseñada para modernizar el proceso
                    de matrícula en instituciones públicas, permitiendo que estudiantes 
                    y administradores gestionen todo de manera rápida,
                    organizada y desde cualquier lugar.
                </p>

            </div>

            <div className="imagen-inicio">
                <img src="img/animacion.jpeg" alt="Matrícula Digital"/>
            </div>
        </div>
    </section>
      
  )
}

export default Home
