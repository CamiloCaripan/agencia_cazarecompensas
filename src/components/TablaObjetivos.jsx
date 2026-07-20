import React from 'react';
import FilaObjetivo from './FilaObjetivo';

// Recibimos la lista completa de "objetivos" a través de las props
const TablaObjetivos = ({ objetivos }) => {
  
  // Si no hay objetivos registrados, mostramos un mensaje amigable
  if (objetivos.length === 0) {
    return (
      <div className="alert alert-info text-center mt-4">
        🛸 No hay misiones registradas actualmente. La galaxia está en paz.
      </div>
    );
  }

  return (
    <div className="table-responsive mt-3">
      <table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Alias del Objetivo</th>
            <th>Recompensa</th>
            <th>Nivel de Peligro</th>
            <th>Último Planeta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Recorremos el arreglo de objetivos y por cada uno renderizamos el componente FilaObjetivo */}
          {objetivos.map((objetivo) => (
            <FilaObjetivo key={objetivo.id} objetivo={objetivo} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaObjetivos;