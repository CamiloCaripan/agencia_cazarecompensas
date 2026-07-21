import React from 'react';
import FilaObjetivo from './FilaObjetivo';

const TablaObjetivos = ({ objetivos, onEliminar, onEditar }) => {
  
  if (objetivos.length === 0) {
    return (
      <div className="alert alert-info text-center mt-4">
        No hay misiones registradas actualmente. La galaxia está en paz.
      </div>
    );
  }

  return (
    <div className="table-responsive mt-3">
      <table className="table table-dark table-hover table-striped align-middle">
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
          {objetivos.map((objetivo) => (
            <FilaObjetivo 
              key={objetivo.id} 
              objetivo={objetivo} 
              onEliminar={onEliminar}
              onEditar={onEditar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaObjetivos;