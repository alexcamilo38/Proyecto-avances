//import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./App.css"


const App = () => {
  return (
    <>
       <Routes>
      <Route 
        path="/" 
        element={
          <>
            <Navbar />
            <Home />
            <Footer/>
          </>
        } 
      />

      <Route path="/login" element={<Login />} />
    </Routes>
      
    </>
  )
}

export default App
