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
      {/*  TARJETA DEL FORMULARIO  */}
      <div className="profile-card-editarperfil">
        {/* Encabezado del formulario */}
        <header className="editar">
          <h1>Editar Perfil</h1>
          <p>Actualiza tu información personal</p>
        </header>
        {/* Formulario de edición */}
        <form className="profile-editarperil">
          {/*  Fila de nombres a modificar*/}
          <div className="form-editarperfil">

            <div className="input-editarperfil">
              <i className="bi bi-person"></i>
              <input type="text" placeholder="Primer Nombre" />
            </div>

            <div className="input-editarperfil">
              <i className="bi bi-person"></i>
              <input type="text" placeholder="Segundo Nombre" />
            </div>

          </div>
          {/*  Fila de apellidos a modificar*/}
          <div className="form-editarperfil">

            <div className="input-editarperfil">
              <i className="bi bi-person-vcard"></i>
              <input type="text" placeholder="Primer Apellido" />
            </div>

            <div className="input-editarperfil">
              <i className="bi bi-person-vcard"></i>
              <input type="text" placeholder="Segundo Apellido" />
            </div>

          </div>
          {/*  DOCUMENTO */}
          <div className="form-editarperfil">

            <div className="input-editarperfil">
              <select className="form-select-editarperfil">
                <option>Tipo</option>
                <option>T.I.</option>
                <option>C.C.</option>
              </select>
            </div>

            <div className="input-editarperfil">
              <i className="bi bi-card-text"></i>
              <input type="text" placeholder="Número de Documento" />
            </div>

          </div>
          {/*  CONTACTO Y GRADO  */}
          <div className="form-editarperfil">

            <div className="input-editarperfil">
              <i className="bi bi-telephone"></i>
              <input type="tel" placeholder="Teléfono / Celular" />
            </div>

            <div className="input-editarperfil">
              <i className="bi bi-mortarboard"></i>

              <select className="form-select-editarperfil">
                <option>Grado a ingresar</option>
                <option>Sexto</option>
                <option>Séptimo</option>
                <option >Octavo</option>
                <option >Noveno</option>
                <option>Décimo</option>
                <option>Once</option>
              </select>

            </div>

          </div>
          {/*  CORREO  */}
          <div className="input-editarperfil full-editarperfil">
            <i className="bi bi-envelope-at"></i>
            <input type="email" placeholder="Correo Electrónico" />
          </div>
          {/*  BOTÓN GUARDAR  */}
          <div className="form-editarperfil">
            <Link to="/PerfilUsuario" className="btn-update">
              <i className="bi bi-check2-circle"></i>
              Guardar Cambios
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditarPerfil


