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


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Servicios" element={<Servicios />} />
        <Route path="/Preguntas" element={<Preguntas />} />
        <Route path="/Contacto" element={<Contacto />} />

        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
