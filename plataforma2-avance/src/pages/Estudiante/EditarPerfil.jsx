import { Link } from "react-router-dom"
import logoblanco from '../../assets/LogoBlanco.png';
import "./EditarPerfil.css"
import "./Menu.css"

const EditarPerfil = () => {
  return (
    <div>
      <nav className="menu-lateral">
        <div className="menu-logo">
          <img src={logoblanco} alt="EasyMatric" className="logo-img" />
        </div>
        {/* Lista de navegación */}
        <ul className="menu-lista">
          <li>
            <Link to="/">
              <i className="bi bi-house-door"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/Colegios">
              <i className="bi bi-bank"></i>
              <span>Instituciones</span>
            </Link>
          </li>
          <li>
            <Link to="/MatriculasE">
              <i className="bi bi-journal-bookmark"></i>
              <span>Mis Matrículas</span>
            </Link>
          </li>
          <li>
            <Link to="/ModulosAcademicos">
              <i className="bi bi-folder2-open"></i>
              <span>Catálogos</span>
            </Link>
          </li>
          <li>
            <Link to="/PerfilUsuario" className="activo">
              <i className="bi bi-person-badge"></i>
              <span>Mi Perfil</span>
            </Link>
          </li>
        </ul>

        <div className="menu-pie">
          <Link to="/" className="enlace-salir">
            <i className="bi bi-box-arrow-left"></i> Cerrar Sesión
          </Link>
          <div className="perfil-usuario-info">
            <i className="bi bi-person-circle"></i>
            <span>ESTUDIANTE</span>
          </div>
        </div>
      </nav>
      <main className="perfil-container">

        <section className="card-formulario">

          <div className="encabezado-formulario">
            <h3>
              <i className="bi bi-person-vcard"></i>
              Información Personal
            </h3>
          </div>

          <form className="formulario-usuario">

            <div className="contenedor-fila">

              <div className="campo-formulario">
                <label htmlFor="primerNombre">Primer Nombre</label>
                <input
                  type="text"
                  id="primerNombre"
                  name="primerNombre"
                  defaultValue="Juan"
                />
              </div>

              <div className="campo-formulario">
                <label htmlFor="segundoNombre">Segundo Nombre</label>
                <input
                  type="text"
                  id="segundoNombre"
                  name="segundoNombre"
                  defaultValue="Andres"
                />
              </div>

            </div>

            <div className="contenedor-fila">

              <div className="campo-formulario">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <input
                  type="text"
                  id="primerApellido"
                  name="primerApellido"
                  defaultValue="Estrada"
                />
              </div>

              <div className="campo-formulario">
                <label htmlFor="segundoApellido">Segundo Apellido</label>
                <input
                  type="text"
                  id="segundoApellido"
                  name="segundoApellido"
                  defaultValue="Erazo"
                />
              </div>

            </div>

            <div className="contenedor-fila">

              <div className="campo-formulario">
                <label htmlFor="tipoDocumento">
                  Tipo de Documento
                </label>

                <select id="tipoDocumento" name="tipoDocumento">
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

              <div className="campo-formulario">
                <label htmlFor="numeroDocumento">
                  Número de Identificación
                </label>

                <input
                  type="text"
                  id="numeroDocumento"
                  name="numeroDocumento"
                  defaultValue="10058191"
                />
              </div>

            </div>

            <div className="separador-formulario"></div>

            <div className="encabezado-formulario">
              <h3>
                <i className="bi bi-telephone"></i>
                Datos de Contacto
              </h3>
            </div>

            <div className="contenedor-fila">

              <div className="campo-formulario">
                <label htmlFor="telefono">
                  Teléfono
                </label>

                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  defaultValue="3101234567"
                />
              </div>

              <div className="campo-formulario">
                <label htmlFor="correo">
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  id="correo"
                  name="correo"
                  defaultValue="juan@gmail.com"
                />
              </div>

            </div>

            <div className="fila-completa">

              <div className="campo-formulario">
                <label htmlFor="institucion">
                  Institución
                </label>

                <select id="institucion" name="institucion">
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

            <div className="acciones-formulario">

              <button type="button"className="boton-cancelar">
                Cancelar
              </button>
              

              <button type="submit" className="boton-guardar" >
    
                <i className="bi bi-check-circle" ></i>
                Guardar Cambios
              </button>

            </div>

          </form>
        </section>
      </main>
    </div>
  )
}

export default EditarPerfil


