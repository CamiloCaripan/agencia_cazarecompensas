import { useState, useEffect } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import TablaObjetivos from './components/TablaObjetivos'
import GaleriaCriminales from './components/GaleriaCriminales' // <-- NUEVO: Importamos el componente de la API

function App() {
  const [objetivos, setObjetivos] = useState(() => {
    const misionesGuardadas = localStorage.getItem('misionesAgencia');
    return misionesGuardadas ? JSON.parse(misionesGuardadas) : [];
  });

  const [formData, setFormData] = useState({
    alias: '', recompensa: '', nivelPeligro: '', ultimoPlaneta: ''
  });

  const [editandoId, setEditandoId] = useState(null);
  
  // <-- NUEVO: Estado para controlar qué pantalla estamos viendo
  const [vistaActiva, setVistaActiva] = useState('crud'); 

  useEffect(() => {
    localStorage.setItem('misionesAgencia', JSON.stringify(objetivos));
  }, [objetivos]);

  const handleAgregarObjetivo = (nuevaMision) => {
    if (editandoId) {
      const objetivosActualizados = objetivos.map(obj => 
        obj.id === editandoId ? { ...nuevaMision, id: editandoId } : obj
      );
      setObjetivos(objetivosActualizados);
      setEditandoId(null);
    } else {
      const misionConId = { ...nuevaMision, id: Date.now() }
      setObjetivos([...objetivos, misionConId])
    }
    setFormData({ alias: '', recompensa: '', nivelPeligro: '', ultimoPlaneta: '' });
  };

  const eliminarObjetivo = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta misión?')) {
      const nuevosObjetivos = objetivos.filter(obj => obj.id !== id);
      setObjetivos(nuevosObjetivos);
    }
  };

  const editarObjetivo = (objetivo) => {
    setFormData({
      alias: objetivo.alias, recompensa: objetivo.recompensa, nivelPeligro: objetivo.nivelPeligro, ultimoPlaneta: objetivo.ultimoPlaneta
    });
    setEditandoId(objetivo.id);
    setVistaActiva('crud'); // Si le da a editar, nos aseguramos de enviarlo a la vista del formulario
  };

  return (
    <div className="container mt-5 mb-5">
      <header className="text-center mb-4">
        <h1 className="display-4 fw-bold">Agencia de Cazarrecompensas</h1>
        <p className="text-muted lead">Sistema central de registro y captura de criminales espaciales</p>
      </header>

      {/* Menú de navegación tipo pestañas con iconos */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <button 
            type="button" 
            className={`btn ${vistaActiva === 'crud' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setVistaActiva('crud')}
          >
            <i className="bi bi-card-checklist me-2"></i> Operaciones (CRUD)
          </button>
          <button 
            type="button" 
            className={`btn ${vistaActiva === 'api' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setVistaActiva('api')}
          >
            <i className="bi bi-hdd-network me-2"></i> Base de Datos Federación (API)
          </button>
        </div>
      </div>

      {/* <-- NUEVO: Renderizado condicional de las vistas --> */}
      {vistaActiva === 'crud' ? (
        <main className="row">
          <section className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 bg-light">
              <div className="card-body">
                <h5 className="card-title mb-3 fw-bold text-primary">
                  {editandoId ? 'Actualizar Objetivo' : 'Registrar Nuevo Objetivo'}
                </h5>
                <Formulario 
                  formData={formData} setFormData={setFormData} onAgregarObjetivo={handleAgregarObjetivo} editandoId={editandoId} 
                />
              </div>
            </div>
          </section>

          <section className="col-md-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title mb-3 fw-bold">Panel de Capturas</h5>
                <p className="text-muted mb-0">Total de misiones activas: <span className="badge bg-secondary">{objetivos.length}</span></p>
                <TablaObjetivos 
                  objetivos={objetivos} onEliminar={eliminarObjetivo} onEditar={editarObjetivo} 
                />
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* Renderizamos el componente de la API si la vista activa es 'api' */
        <GaleriaCriminales />
      )}

    </div>
  )
}

export default App