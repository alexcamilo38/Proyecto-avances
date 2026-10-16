//import React from 'react';
import './Footer.css';
import logoblanco from '../assets/LogoBlanco.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* COLUMNA 1: LOGO Y DESCRIPCIÓN */}
          <div className="footer-col brand-col">
            <img src={logoblanco} alt="EasyMatric" className="logo-footer" />
            <p className="footer-parrafo">
              Plataforma digital para optimizar y agilizar el proceso de matrícula
              en instituciones educativas públicas.
            </p>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
          <div className="footer-col">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              <li><a href="inicio">Inicio</a></li>
              <li><a href="nosotros">Nosotros</a></li>
              <li><a href="servicios">Servicios</a></li>
              <li><a href="preguntas">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO Y SOPORTE */}
          <div className="footer-col">
            <h4 className="footer-title">Soporte</h4>
            <ul className="footer-contact">
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span>easymatric76@gmail.com</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <li><a href="contacto">3216172893</a></li>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: REDES SOCIALES */}
          <div className="footer-col">
            <h4 className="footer-title">Síguenos</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        {/* COPYRIGHT */}
        <div className="footer-copyright">
          <span>© 2026 EASYMATRIC | Todos los derechos reservados</span>
          <div className="legal-links">
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#terminos">Términos del Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;