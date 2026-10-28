import { Routes, Route } from 'react-router-dom';

{/* Componentes globales */}
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

{/* Pages de inicio */}
import Home from "./pages/Home";
import Login from "./pages/Login";

import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Preguntas from './pages/Preguntas';
import Contacto from './pages/Contacto';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import RectorLayout from './layouts/RectorLayout';

{/* Pages de Autenticación y Estudiantes */}
import SelecionRol from './pages/Registro/SelecionRol';
import ReperaContra from './pages/Contrarecuperar/ReperaContra';
import RegistroU from './pages/Estudiante/RegistroU';
import PerfilUsuario from './pages/Estudiante/PerfilUsuario';
import Colegios from './pages/Estudiante/Colegios';
import InfoSede from './pages/Estudiante/InfoSede';
import MatriculasE from './pages/Estudiante/MatriculasE';
import Formulario from './pages/Estudiante/Formulario';
import ModulosAcademicos from './pages/Estudiante/ModulosAcademicos';
import EditarPerfil from './pages/Estudiante/EditarPerfil';

{/* Pages de Administrador */}
import RegistroAd from './pages/Administrador/RegistroAd';
import RegistrarSede from './pages/Administrador/RegistrarSede';
import Roles from './pages/Administrador/Roles';
import Matriculados from './pages/Administrador/Matriculados';
import NotasCa from './pages/Administrador/NotasCa';
import RevicionD from './pages/Administrador/RevicionD';
import GradoPrescolar from './pages/Administrador/Grados/GradoPrescolar';
import GradoPrimaria from './pages/Administrador/Grados/GradoPrimaria';
import GradoSecundaria from './pages/Administrador/Grados/GradoSecundaria';
import PerfilAd from './pages/Administrador/Perfil/PerfilAd';

{/* Pages de Rector */}
import RegistrarIns from './pages/Rector/RegistrarIns';
import RevisarMa from './pages/Rector/RevisarMa';
import EstudiantesAp from './pages/Rector/EstudiantesAp';
import CatalogoMa from './pages/Rector/CatalogoMa';
import RectorDashboard from './pages/Rector/RectorDashboard';
import RegistroRector from './pages/Rector/RegistroRector';
import PerfilRec from './pages/Rector/PerfilRec';
import Dashboard from './pages/Dashboard';

{/* Pages de Docente */}
import RegistroDo from './pages/Docente/RegistroDo';
import PerfilDocente from './pages/Docente/PerfilDocente';
import SubirModulo from './pages/Docente/SubirModulo';
import DocenteMo from './pages/Docente/DocenteMo';
import GrupoModulo from './pages/Docente/GrupoModulo';

const App = () => {
  return (
    <>
      <Routes>
        {/* Páginas públicas con Navbar y Footer */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/Nosotros" 
          element={
            <>
              <Navbar />
              <Nosotros />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/Servicios" 
          element={
            <>
              <Navbar />
              <Servicios />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/Preguntas" 
          element={
            <>
              <Navbar />
              <Preguntas />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/Contacto" 
          element={
            <>
              <Navbar />
              <Contacto />
              <Footer />
            </>
          } 
        />

        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/SelecionRol" element={<SelecionRol />} />
        <Route path="/ReperaContra" element={<ReperaContra />} />

        {/* Rutas de Estudiante */}
        <Route path="/RegistroU" element={<RegistroU />} />
        <Route element={<StudentLayout />}>
          <Route path="/student" element={<Dashboard role="student" />} />
          <Route path="/PerfilUsuario" element={<PerfilUsuario />} />
          <Route path="/Colegios" element={<Colegios />} />
          <Route path="/InfoSede" element={<InfoSede />} />
          <Route path="/MatriculasE" element={<MatriculasE />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/ModulosAcademicos" element={<ModulosAcademicos />} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
        </Route>

        {/* Rutas de Administrador */}
        <Route path="/RegistroAd" element={<RegistroAd />} />
        <Route path="/RegistroRector" element={<RegistroRector />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard role="admin" />} />
          <Route path="/RegistrarSede" element={<RegistrarSede />} />
          <Route path="/Roles" element={<Roles />} />
          <Route path="/Matriculados" element={<Matriculados />} />
          <Route path="/NotasCa" element={<NotasCa />} />
          <Route path="/RevicionD" element={<RevicionD />} />
          <Route path="/PerfilAd" element={<PerfilAd />} />
          <Route path="/Matriculados/GradoPrescolar" element={<GradoPrescolar />} />
          <Route path="/Matriculados/GradoPrimaria" element={<GradoPrimaria />} />
          <Route path="/Matriculados/GradoSecundaria" element={<GradoSecundaria />} />
        </Route>

        {/* Rutas de Docente */}
        <Route path="/RegistroDo" element={<RegistroDo />} />
        <Route element={<TeacherLayout />}>
          <Route path="/teacher" element={<Dashboard role="teacher" />} />
          <Route path="/PerfilDocente" element={<PerfilDocente />} />
          <Route path="/SubirModulo" element={<SubirModulo />} />
          <Route path="/DocenteMo" element={<DocenteMo />} />
          <Route path="/GrupoModulo" element={<GrupoModulo />} />
        </Route>

        {/* Rutas de Rector */}
        <Route element={<RectorLayout />}>
          <Route path="/rector" element={<RectorDashboard />} />
          <Route path="/PerfilRec" element={<PerfilRec />} />
          <Route path="/RegistrarIns" element={<RegistrarIns />} />
          <Route path="/RevisarMa" element={<RevisarMa />} />
          <Route path="/EstudiantesAp" element={<EstudiantesAp />} />
          <Route path="/CatalogoMa" element={<CatalogoMa />} />
        </Route>

        {/* Control de Ruta no encontrada (Evita pantalla en blanco) */}
        <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </>
  );
};

export default App;