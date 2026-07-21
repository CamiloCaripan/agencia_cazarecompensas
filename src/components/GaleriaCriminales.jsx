import React, { useState, useEffect } from 'react';

// <-- NUEVO: Recibimos la función por props
const GaleriaCriminales = ({ onSeleccionarCriminal }) => {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const respuesta = await fetch('https://rickandmortyapi.com/api/character');
        if (!respuesta.ok) {
          throw new Error('Error al acceder a la base de datos de la Federación');
        }
        const datos = await respuesta.json();
        setPersonajes(datos.results.slice(0, 12));
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };
    fetchPersonajes();
  }, []);

  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-secondary" role="status"></div>
        <h5 className="mt-3 text-notion-muted">Interceptando señales intergalácticas...</h5>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4 notion-card border-danger">
        🚨 <strong>¡Alerta Roja!</strong> {error}
      </div>
    );
  }

  return (
    <div className="mt-4 pb-5">
      <h4 className="mb-2 fw-bold">Base de Datos de la Federación</h4>
      <p className="text-notion-muted mb-4">
        Selecciona un sujeto de interés para transferirlo a la mesa de operaciones y asignarle una recompensa.
      </p>
      
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {personajes.map((personaje) => (
          <div className="col" key={personaje.id}>
            {/* Usamos notion-card pero ajustamos el padding (p-3) */}
            <div className="notion-card h-100 d-flex flex-column p-3">
              <img 
                src={personaje.image} 
                className="card-img-top rounded mb-3" 
                alt={personaje.name} 
                style={{ height: '220px', objectFit: 'cover' }} 
              />
              <div className="flex-grow-1">
                <h5 className="fw-bold mb-3">{personaje.name}</h5>
                <p className="small mb-1 text-notion-muted">
                  <strong>Especie:</strong> {personaje.species}
                </p>
                <p className="small mb-1 text-notion-muted">
                  <strong>Estado:</strong> {personaje.status === 'Alive' ? '🟢 Vivo' : personaje.status === 'Dead' ? '🔴 Muerto' : '⚪ Desconocido'}
                </p>
                <p className="small mb-3 text-notion-muted">
                  <strong>Origen:</strong> {personaje.origin.name}
                </p>
              </div>
              
              {/* <-- NUEVO: Botón para enviar datos al formulario --> */}
              <button 
                className="btn w-100 btn-submit-notion btn-create-mode mt-auto"
                onClick={() => onSeleccionarCriminal(personaje)}
              >
                <i className="bi bi-crosshair me-2"></i>Fichar Objetivo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaCriminales;