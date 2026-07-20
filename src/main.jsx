import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Tu importación anterior
import 'bootstrap-icons/font/bootstrap-icons.css' // <-- NUEVO: Importamos los iconos
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)