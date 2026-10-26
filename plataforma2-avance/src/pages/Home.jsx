//import React from 'react'

import matricula from '../assets/img02.png';
const Home = () => {
  return (
        <section className={"seccion-inicio [padding:70px_8%]"}>
        <div className={"inicio-contenedor [display:flex] [justify-content:space-between] [align-items:center] [gap:50px]"}>
            <div className={"principal-texto02 [flex:1]"}>
                <h1 className={"titulo2-principal02 [font-size:95px] [color:#0f172a] [font-weight:650] [line-height:0.95] [margin-bottom:20px]"}>Transformamos <br />la matrícula <br />estudiantil</h1>
                <p className={"descripcion-inicio [font-size:18px] [color:#475569] [margin-bottom:30px]"}>
                    <br />
                    EasyMatric es una plataforma digital diseñada para modernizar el proceso
                    de matrícula en instituciones públicas, permitiendo que estudiantes 
                    y administradores gestionen todo de manera rápida,
                    organizada y desde cualquier lugar.
                </p>

            </div>

            <div className="imagen-inicio">
                <img className={"[.imagen-inicio_&]:[width:500px]"} src={matricula} alt="Matrícula Digital"/>
            </div>
        </div>
    </section>
      
  )
}

export default Home
