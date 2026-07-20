import React, { useState, useEffect } from 'react';

const GaleriaCriminales = () => {
  // Estados para almacenar los datos, saber si está cargando, o si hubo un error
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asíncrona para consumir la API
    const fetchPersonajes = async () => {
      try {
        const respuesta = await fetch('https://rickandmortyapi.com/api/character');
        
        // Manejo de errores de red o de servidor
        if (!respuesta.ok) {
          throw new Error('Error al acceder a la base de datos de la Federación');
        }
        
        const datos = await respuesta.json();
        // Guardamos solo los primeros 12 personajes para no saturar la vista
        setPersonajes(datos.results.slice(0, 12));
        setCargando(false);
      } catch (err) {
        setError(err.message);
        setCargando(false);
      }
    };

    fetchPersonajes();
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  // Renderizado condicional si está cargando
  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status"></div>
        <h5 className="mt-3">Interceptando señales intergalácticas...</h5>
      </div>
    );
  }

  // Renderizado condicional si hubo un error
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-4">
        🚨 <strong>¡Alerta Roja!</strong> {error}
      </div>
    );
  }

  // Renderizado de la información (La "Tabla responsiva / Grid")
  return (
    <div className="mt-4">
      <h4 className="mb-4 fw-bold">Base de Datos de la Federación (API)</h4>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {personajes.map((personaje) => (
          <div className="col" key={personaje.id}>
            <div className="card h-100 shadow-sm border-dark bg-dark text-white">
              <img src={personaje.image} className="card-img-top" alt={personaje.name} />
              <div className="card-body">
                <h6 className="card-title fw-bold text-success">{personaje.name}</h6>
                <p className="card-text small mb-1">
                  <strong>Especie:</strong> {personaje.species}
                </p>
                <p className="card-text small mb-1">
                  <strong>Estado:</strong> {personaje.status === 'Alive' ? '🟢 Vivo' : personaje.status === 'Dead' ? '🔴 Muerto' : '⚪ Desconocido'}
                </p>
                <p className="card-text small">
                  <strong>Origen:</strong> {personaje.origin.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriaCriminales;