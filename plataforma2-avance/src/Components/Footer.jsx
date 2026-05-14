//import React from 'react'
import "./Footer.css"
import logoblanco from '../assets/LogoBlanco.png'
const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-grid">
            <div className="footer-principal">
                <img className="logofo" src={logoblanco} alt="EasyMatric" className="logo-footer"/>
                <p className="footer-parrafo">
                    Plataforma digital para optimizar el proceso de matrícula
                    en instituciones públicas.
                </p>
            </div>
        </div>

        <div className="footer-copyright">
            <span>© 2026 EASYMATRIC | Plataforma Educativa</span>
        </div>
    </footer>
    
    
  )
}

export default Footer
