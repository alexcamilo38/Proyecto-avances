//import React from 'react'

const Nosotros = () => {
    return (
        <section className={"seccion-nosotros [width:100%] [padding:100px_8%] [background-color:white] [font-family:'Segoe_UI',_sans-serif]"}>
             {/* Contenedor general */}
            <div className={"container12 [width:100%] [text-align:center]"}>

                <div className={"nosotros-info [margin-bottom:20px]"}>
                    <span className={"principal-nosotros [text-align:left] [color:#2563eb] [font-weight:700] [text-transform:uppercase] [font-size:0.85rem] [letter-spacing:1.5px]"}>Sobre Nosotros</span>
                    <h2 className={"[.container12_&]:[font-size:2.8rem] [.container12_&]:[color:#2c3e50] [.container12_&]:[margin:15px_0] [.container12_&]:[line-height:1.2] max-[768px]:[.container12_&]:[font-size:2rem]"}>Un equipo comprometido con la educación digital</h2>
                    <div className={"line12 [width:60px] [height:4px] [background:#22298b] [margin:20px_auto_40px] [border-radius:5px]"}></div>
                </div>

                <div className={"texto-nosotros [max-width:800px] [margin:0_auto_70px] [text-align:center] max-[768px]:[margin-bottom:40px]"}>
                    <p className={"[.texto-nosotros_&]:[font-size:1.1rem] [.texto-nosotros_&]:[color:#555] [.texto-nosotros_&]:[line-height:1.8] [.texto-nosotros_&]:[margin-bottom:20px] [.card_&]:[color:#666] [.card_&]:[font-size:0.95rem]"}>
                        Somos un equipo conformado por <strong>seis aprendices del SENA</strong>, unidos con el propósito de desarrollar soluciones tecnológicas que mejoren los procesos educativos en las instituciones públicas.
                    </p>
                    <p className={"[.texto-nosotros_&]:[font-size:1.1rem] [.texto-nosotros_&]:[color:#555] [.texto-nosotros_&]:[line-height:1.8] [.texto-nosotros_&]:[margin-bottom:20px] [.card_&]:[color:#666] [.card_&]:[font-size:0.95rem]"}>
                        <strong>EasyMatric</strong> surge como una iniciativa orientada a resolver una necesidad real: la dificultad de gestionar procesos de matrícula de forma ordenada, rápida y transparente. Más que digitalizar formularios, buscamos transformar la relación entre la institución y el estudiante.
                    </p>
                </div>
                {/* DESCRIPCIÓN DEL PROYECTO*/}
                <div className={"grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:30px] [background:#ffffff1d] max-[992px]:[grid-template-columns:repeat(2,_1fr)] max-[768px]:[grid-template-columns:1fr]"}>
                    <div className={"card [background:#ffffff1d] [padding:40px_30px] [border-radius:15px] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [text-align:center] [border-bottom:4px_solid_#3498db] [transition:all_0.3s_ease] [&:hover]:[transform:translateY(-8px)] [&:hover]:[box-shadow:0_15px_35px_rgba(0,0,0,0.1)] [&:nth-child(1)]:[border-color:#3498db] [&:nth-child(2)]:[border-color:#22c55e] [&:nth-child(3)]:[border-color:#f59e0b]"}>
                        <h3 className={"[.card_&]:[color:#2c3e50] [.card_&]:[font-size:1.4rem] [.card_&]:[margin-bottom:15px]"}>Misión</h3>
                        <p className={"[.texto-nosotros_&]:[font-size:1.1rem] [.texto-nosotros_&]:[color:#555] [.texto-nosotros_&]:[line-height:1.8] [.texto-nosotros_&]:[margin-bottom:20px] [.card_&]:[color:#666] [.card_&]:[font-size:0.95rem]"}>Facilitar procesos académicos mediante una plataforma segura que reduzca tiempos y mejore la atención institucional.</p>
                    </div>

                    <div className={"card [background:#ffffff1d] [padding:40px_30px] [border-radius:15px] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [text-align:center] [border-bottom:4px_solid_#3498db] [transition:all_0.3s_ease] [&:hover]:[transform:translateY(-8px)] [&:hover]:[box-shadow:0_15px_35px_rgba(0,0,0,0.1)] [&:nth-child(1)]:[border-color:#3498db] [&:nth-child(2)]:[border-color:#22c55e] [&:nth-child(3)]:[border-color:#f59e0b]"}>
                        <h3 className={"[.card_&]:[color:#2c3e50] [.card_&]:[font-size:1.4rem] [.card_&]:[margin-bottom:15px]"}>Visión</h3>
                        <p className={"[.texto-nosotros_&]:[font-size:1.1rem] [.texto-nosotros_&]:[color:#555] [.texto-nosotros_&]:[line-height:1.8] [.texto-nosotros_&]:[margin-bottom:20px] [.card_&]:[color:#666] [.card_&]:[font-size:0.95rem]"}>Convertirnos en una referencia tecnológica para la modernización educativa en instituciones públicas y privadas.</p>
                    </div>

                    <div className={"card [background:#ffffff1d] [padding:40px_30px] [border-radius:15px] [box-shadow:0_10px_25px_rgba(0,0,0,0.05)] [text-align:center] [border-bottom:4px_solid_#3498db] [transition:all_0.3s_ease] [&:hover]:[transform:translateY(-8px)] [&:hover]:[box-shadow:0_15px_35px_rgba(0,0,0,0.1)] [&:nth-child(1)]:[border-color:#3498db] [&:nth-child(2)]:[border-color:#22c55e] [&:nth-child(3)]:[border-color:#f59e0b]"}>
                        <h3 className={"[.card_&]:[color:#2c3e50] [.card_&]:[font-size:1.4rem] [.card_&]:[margin-bottom:15px]"}>Objetivo</h3>
                        <p className={"[.texto-nosotros_&]:[font-size:1.1rem] [.texto-nosotros_&]:[color:#555] [.texto-nosotros_&]:[line-height:1.8] [.texto-nosotros_&]:[margin-bottom:20px] [.card_&]:[color:#666] [.card_&]:[font-size:0.95rem]"}>Automatizar el proceso de matrícula para disminuir errores y centralizar la información estudiantil.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Nosotros
