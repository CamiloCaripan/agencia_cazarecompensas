import { useState, useEffect } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import TablaObjetivos from './components/TablaObjetivos'
import GaleriaCriminales from './components/GaleriaCriminales'

function App() {
  const [objetivos, setObjetivos] = useState(() => {
    const misionesGuardadas = localStorage.getItem('misionesAgencia');
    return misionesGuardadas ? JSON.parse(misionesGuardadas) : [];
  });

  const [formData, setFormData] = useState({
    alias: '', recompensa: '', nivelPeligro: '', ultimoPlaneta: ''
  });

  const [editandoId, setEditandoId] = useState(null);
  const [vistaActiva, setVistaActiva] = useState('crud'); 

  // <-- NUEVO: Estado para el Tema (leemos si ya había elegido uno antes, sino por defecto "light")
  const [tema, setTema] = useState(() => localStorage.getItem('agenciaTema') || 'light');

  // Guardar datos
  useEffect(() => {
    localStorage.setItem('misionesAgencia', JSON.stringify(objetivos));
  }, [objetivos]);

  // <-- NUEVO: Aplicar el tema al HTML cada vez que cambie
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('agenciaTema', tema);
  }, [tema]);

  // Función para alternar el tema
  const toggleTema = () => {
    setTema(tema === 'light' ? 'dark' : 'light');
  };

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
    setVistaActiva('crud');
  };

  // <-- NUEVO: Función puente entre la API y el Formulario
  const prepararMisionDesdeAPI = (personaje) => {
    // Rellenamos el formulario con los datos que sabemos, y dejamos vacíos los que faltan
    setFormData({
      alias: personaje.name,
      recompensa: '', // El usuario lo llenará
      nivelPeligro: '', // El usuario lo llenará
      ultimoPlaneta: personaje.origin.name === 'unknown' ? 'Desconocido' : personaje.origin.name
    });
    setEditandoId(null); // Nos aseguramos de estar en modo "Crear" y no "Editar"
    setVistaActiva('crud'); // Cambiamos a la pestaña del formulario automáticamente
    
    // Hacemos un scroll suave hacia arriba para que el usuario vea el formulario listo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* <-- NUEVO: Botón de tema y Portada estilo Notion --> */}
      <button className="theme-toggle-btn shadow-sm" onClick={toggleTema}>
        {tema === 'light' ? <><i className="bi bi-moon-stars-fill text-dark me-2"></i>Modo Oscuro</> : <><i className="bi bi-sun-fill text-warning me-2"></i>Modo Claro</>}
      </button>
      
      <div className="notion-cover"></div>

      <div className="notion-container">
        <header className="notion-header mb-4">
          {/* Cambiamos 'title-glow' por 'title-notion' */}
          <h1 className="display-5 title-notion">Agencia de Cazarrecompensas</h1>
          <p className="text-notion-muted fs-5">Sistema central de registro y captura espacial.</p>
        </header>

        <div className="d-flex justify-content-start mb-5 border-bottom pb-3">
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${vistaActiva === 'crud' ? 'btn-dark' : 'btn-outline-secondary border-0'}`}
              onClick={() => setVistaActiva('crud')}
            >
              <i className="bi bi-card-checklist me-2"></i> Operaciones
            </button>
            <button 
              type="button" 
              className={`btn ${vistaActiva === 'api' ? 'btn-dark' : 'btn-outline-secondary border-0'}`}
              onClick={() => setVistaActiva('api')}
            >
              <i className="bi bi-hdd-network me-2"></i> Base de Datos (API)
            </button>
          </div>
        </div>

        {vistaActiva === 'crud' ? (
          <main className="row">
            {/* <-- NUEVO: Cambiamos col-md-4 a col-12 para apilar arriba --> */}
            <section className="col-12 mb-5">
              <div className="notion-card">
                <h4 className="mb-4 fw-bold">
                  {editandoId ? 'Actualizar Objetivo' : 'Registrar Nuevo Objetivo'}
                </h4>
                <Formulario 
                  formData={formData} setFormData={setFormData} onAgregarObjetivo={handleAgregarObjetivo} editandoId={editandoId} 
                />
              </div>
            </section>

            {/* <-- NUEVO: Cambiamos col-md-8 a col-12 para apilar abajo --> */}
            <section className="col-12">
              <div className="notion-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">Panel de Capturas</h4>
                  <span className="badge bg-secondary rounded-pill px-3 py-2">{objetivos.length} Misiones</span>
                </div>
                <TablaObjetivos 
                  objetivos={objetivos} onEliminar={eliminarObjetivo} onEditar={editarObjetivo} 
                />
              </div>
            </section>
          </main>
        ) : (
          <GaleriaCriminales onSeleccionarCriminal={prepararMisionDesdeAPI} />
        )}
      </div>
    </>
  )
}

export default App