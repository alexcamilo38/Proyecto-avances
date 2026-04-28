//import React from 'react'
import { Link } from "react-router-dom"
import "./Home.css"
const Home = () => {
  return (
        <section className="seccion-inicio">
        <div className="inicio-contenedor">
            <div className="inicio-texto">
                <h1>Transformamos la matrícula estudiantil</h1> 
                <p className="descripcion-inicio">
                    EasyMatric es una plataforma digital diseñada para modernizar el proceso
                    de matrícula en instituciones públicas, permitiendo que estudiantes 
                    y administradores gestionen todo de manera rápida,
                    organizada y desde cualquier lugar.
                </p>

                <div className="inicio-botones">
                    <Link to="/Login" className="btn-hero-primary">Iniciar Sesión</Link>
                    <a href="registro.html" className="btn-hero-secondary">Registrarse</a>
                </div>
            </div>

            <div className="imagen-inicio">
                <img src="img/matricula.png" alt="Matrícula Digital"/>
            </div>
        </div>
    </section>
      
  )
}

export default Home
