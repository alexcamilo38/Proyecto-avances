import './index.css'
// Inicializa React, carga los estilos globales y monta la aplicación en el DOM.
import React from 'react'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDom from 'react-dom/client'

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
)
