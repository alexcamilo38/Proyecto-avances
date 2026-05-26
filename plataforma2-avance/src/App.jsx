//import React from 'react'
import { Routes, Route } from 'react-router-dom'
 {/* Conponentes globales */}
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
 {/* pages de inicio*/}
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./App.css"
import Nosotros from './pages/Nosotros'
import Servicios from './pages/Servicios'
import Preguntas from './pages/Preguntas'
import Contacto from './pages/Contacto'
 {/* pages tanto de Estuante */}
import SelecionRol from './pages/Registro/SelecionRol'
import ReperaContra from './pages/Contrarecuperar/ReperaContra'
import RegistroAd from './pages/Administrador/RegistroAd'
import RegistroU from './pages/Estudiante/RegistroU'
import PerfilUsuario from './pages/Estudiante/PerfilUsuario'
import Colegios from './pages/Estudiante/Colegios'
import InfoSede from './pages/Estudiante/InfoSede'
import MatriculasE from './pages/Estudiante/MatriculasE'
import Formulario from './pages/Estudiante/Formulario'
 {/* pages tanto de Administrador */}
import RegistrarSede from './pages/Administrador/RegistrarSede'
import Roles from './pages/Administrador/Roles'
import Matriculados from './pages/Administrador/Matriculados'
import NotasCa from './pages/Administrador/NotasCa'
import ModulosAcademicos from './pages/Estudiante/ModulosAcademicos'
import RevicionD from './pages/Administrador/RevicionD'
import GradoPrescolar from './pages/Administrador/Grados/GradoPrescolar'
import GradoPrimaria from './pages/Administrador/Grados/GradoPrimaria'
import GradoSecundaria from './pages/Administrador/Grados/GradoSecundaria'
import PerfilAd from './pages/Administrador/Perfil/PerfilAd'
import EditarPerfil from './pages/Estudiante/EditarPerfil'
import PerfilDocente from './pages/Docente/PerfilDocente'
import RegistroDo from './pages/Docente/RegistroDo'
import SubirModulo from './pages/Docente/SubirModulo'
import DocenteMo from './pages/Docente/DocenteMo'
import GrupoModulo from './pages/Docente/GrupoModulo'

const App = () => {
  return (
    <>
      <Routes>
        {/* Página principal con Navbar y Footer */}
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

        <Route path="/login" element={<Login />} />
        <Route path="/SelecionRol" element={<SelecionRol />} />
        <Route path="/ReperaContra" element={<ReperaContra />} />
        <Route path="/RegistroAd" element={<RegistroAd />} />
        <Route path="/RegistroU" element={<RegistroU />} />
        <Route path="/PerfilUsuario" element={<PerfilUsuario />} />
        <Route path="/Colegios" element={<Colegios />} />
        <Route path="/InfoSede" element={<InfoSede />} />
        <Route path="/MatriculasE" element={<MatriculasE />} />
        <Route path='/Formulario' element={<Formulario/>}/>
        <Route path="/RegistrarSede" element={<RegistrarSede />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/Matriculados" element={<Matriculados />} />
        <Route path="/NotasCa" element={<NotasCa />} />
        <Route path="/ModulosAcademicos" element={<ModulosAcademicos />} />
        <Route path="/RevicionD" element={<RevicionD />} />

        <Route path="/Matriculados/GradoPrescolar" element={<GradoPrescolar />} />
        <Route path="/Matriculados/GradoPrimaria" element={<GradoPrimaria/>} />
        <Route path="/Matriculados/GradoSecundaria" element={<GradoSecundaria/>} />

        <Route path="/PerfilAd" element={<PerfilAd />} />
        <Route path="/EditarPerfil" element={<EditarPerfil />} />

        <Route path="/RegistroDo" element={<RegistroDo />} />
        <Route path="/PerfilDocente" element={<PerfilDocente />} />
        <Route path="/SubirModulo" element={<SubirModulo />} />
        <Route path="/DocenteMo" element={<DocenteMo />} />
        <Route path="/GrupoModulo" element={<GrupoModulo />} />
      </Routes>
    </>
  )
}

export default App
