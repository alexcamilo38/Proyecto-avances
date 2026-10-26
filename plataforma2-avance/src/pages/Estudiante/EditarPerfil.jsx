




const EditarPerfil = () => {
  return (
    <div>

      <div className={"perfil-container [width:100%] [min-height:100vh] [padding:40px] [display:flex] [justify-content:center] [align-items:center] max-[768px]:[padding:20px]"}>

        <section className={"card-formulario [width:80vw] [margin-left:260px] [background:#fff] [padding:45px] [border-radius:20px] [box-shadow:0_4px_15px_rgba(0,0,0,0.1)]"}>

          <div className={"encabezado-formulario [margin-bottom:25px]"}>
            <h3 className={"[.encabezado-formulario_&]:[color:#1e293b] [.encabezado-formulario_&]:[font-size:24px] [.encabezado-formulario_&]:[display:flex] [.encabezado-formulario_&]:[align-items:center] [.encabezado-formulario_&]:[gap:10px]"}>
              <i className={"bi bi-person-vcard [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i>
              Información Personal
            </h3>
          </div>

          <form className={"formulario-usuario [width:100%]"}>

            <div className={"contenedor-fila [display:flex] [gap:20px] [margin-bottom:20px] max-[768px]:[flex-direction:column]"}>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="primerNombre">Primer Nombre</label>
                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  defaultValue="Juan"
                />
              </div>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="segundoNombre">Segundo Nombre</label>
                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  defaultValue="Andres"
                />
              </div>

            </div>

            <div className={"contenedor-fila [display:flex] [gap:20px] [margin-bottom:20px] max-[768px]:[flex-direction:column]"}>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="primerApellido">Primer Apellido</label>
                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  defaultValue="Estrada"
                />
              </div>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="segundoApellido">Segundo Apellido</label>
                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  defaultValue="Erazo"
                />
              </div>

            </div>

            <div className={"contenedor-fila [display:flex] [gap:20px] [margin-bottom:20px] max-[768px]:[flex-direction:column]"}>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="tipoDocumento">
                  Tipo de Documento
                </label>

                <select className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"} id="tipoDocumento" name="tipoDocumento">
                  <option value="C.C.">
                    C.C. (Cédula de Ciudadanía)
                  </option>

                  <option value="T.I.">
                    T.I. (Tarjeta de Identidad)
                  </option>
                  <option value="R.C.">R.C. (Registro Civil)</option>
                  <option value="C.E.">C.E. (Cédula de Extranjería)</option>
                </select>
              </div>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="numeroDocumento">
                  Número de Identificación
                </label>

                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="text"
                  id="numeroDocumento"
                  name="numeroDocumento"
                  defaultValue="10058191"
                />
              </div>

            </div>

            <div className={"separador-formulario [width:100%] [height:1px] [background:#e2e8f0] [margin:30px_0]"}></div>

            <div className={"encabezado-formulario [margin-bottom:25px]"}>
              <h3 className={"[.encabezado-formulario_&]:[color:#1e293b] [.encabezado-formulario_&]:[font-size:24px] [.encabezado-formulario_&]:[display:flex] [.encabezado-formulario_&]:[align-items:center] [.encabezado-formulario_&]:[gap:10px]"}>
                <i className={"bi bi-telephone [.menu-lista_li_a_&]:[font-size:1.2rem]"}></i>
                Datos de Contacto
              </h3>
            </div>

            <div className={"contenedor-fila [display:flex] [gap:20px] [margin-bottom:20px] max-[768px]:[flex-direction:column]"}>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="telefono">
                  Teléfono
                </label>

                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="tel"
                  id="telefono"
                  name="telefono"
                  defaultValue="3101234567"
                />
              </div>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="correo">
                  Correo Electrónico
                </label>

                <input className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"}
                  type="email"
                  id="correo"
                  name="correo"
                  defaultValue="juan@gmail.com"
                />
              </div>

            </div>

            <div className={"fila-completa [margin-bottom:25px]"}>

              <div className={"campo-formulario [width:100%] [display:flex] [flex-direction:column]"}>
                <label className={"[.campo-formulario_&]:[margin-bottom:8px] [.campo-formulario_&]:[font-weight:600] [.campo-formulario_&]:[color:#334155]"} htmlFor="institucion">
                  Institución
                </label>

                <select className={"[.campo-formulario_&]:[width:100%] [.campo-formulario_&]:[padding:14px] [.campo-formulario_&]:[border:1px_solid_#cbd5e1] [.campo-formulario_&]:[border-radius:12px] [.campo-formulario_&]:[outline:none] [.campo-formulario_&]:[font-size:15px] [.campo-formulario_&]:[transition:0.3s] [.campo-formulario_&:focus]:[border-color:#2563eb] [.campo-formulario_&:focus]:[box-shadow:0_0_5px_rgba(37,99,235,0.3)]"} id="institucion" name="institucion">
                  <option value="San Vicente">
                    Institución San Vicente
                  </option>

                  <option value="Inem">
                    INEM Francisco José de Caldas
                  </option>
                  <option value="Don Bosco">Colegio Don Bosco</option>
                </select>
              </div>

            </div>

            <div className={"acciones-formulario [display:flex] [justify-content:flex-end] [gap:15px] [margin-top:20px] max-[768px]:[flex-direction:column]"}>

              <button type="button"className={"boton-cancelar [background:#e2e8f0] [color:#1e293b] [border:none] [padding:12px_25px] [border-radius:10px] [cursor:pointer] [font-size:15px] [transition:0.3s] [&:hover]:[background:#cbd5e1] max-[768px]:[width:100%]"}>
                Cancelar
              </button>


              <button type="submit" className={"boton-guardar [background:#2563eb] [color:white] [border:none] [padding:12px_25px] [border-radius:10px] [cursor:pointer] [font-size:15px] [transition:0.3s] [&:hover]:[background:#1d4ed8] max-[768px]:[width:100%]"} >

                <i className={"bi bi-check-circle [.menu-lista_li_a_&]:[font-size:1.2rem]"} ></i>
                Guardar Cambios
              </button>

            </div>

          </form>
        </section>
      </div>
    </div>
  )
}

export default EditarPerfil


