import { useState } from 'react'
import './App.css'

function App() {
  // Estado para almacenar la lista de misiones/objetivos (Nuestro futuro LocalStorage)
  const [objetivos, setObjetivos] = useState([])

  
  const [formData, setFormData] = useState({
    alias: '',
    recompensa: '',
    nivelPeligro: '', 
    ultimoPlaneta: ''
  })

  return (
    <div className="container mt-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">Agencia de Cazarrecompensas</h1>
        <p className="text-muted lead">Sistema central de registro y captura de criminales espaciales</p>
      </header>

      <main className="row">
        {/* Columna izquierda: Aquí irá nuestro componente de Formulario */}
        <section className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Registrar Nuevo Objetivo</h5>
              <p>Aquí construiremos el formulario...</p>
            </div>
          </div>
        </section>

        {/* Columna derecha: Aquí irá nuestro componente de Tabla Dinámica */}
        <section className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Panel de Capturas</h5>
              <p>Aquí construiremos la tabla dinámica...</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App