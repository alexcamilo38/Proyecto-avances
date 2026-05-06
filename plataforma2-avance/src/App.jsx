//import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./App.css"
import Nosotros from './pages/Nosotros'
import Servicios from './pages/Servicios'
import Preguntas from './pages/Preguntas'
import Contacto from './pages/Contacto'
import SelecionRol from './pages/Registro/SelecionRol'
import ReperaContra from './pages/Contrarecuperar/ReperaContra'
import RegistroAd from './pages/Administrador/RegistroAd'
import RegistroU from './pages/Estudiante/RegistroU'
import PerfilUsuario from './pages/Estudiante/PerfilUsuario'
import Colegios from './pages/Estudiante/Colegios'
import InfoSede from './pages/Estudiante/InfoSede'
import MatriculasE from './pages/Estudiante/MatriculasE'
import Formulario from './pages/Estudiante/Formulario'
import RegistrarSede from './pages/Administrador/RegistrarSede'
import Roles from './pages/Administrador/Roles'
import Matriculados from './pages/Administrador/Matriculados'
import NotasCa from './pages/Administrador/NotasCa'


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
      </Routes>
    </>
  )
}

export default App
