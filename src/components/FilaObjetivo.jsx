import React from 'react';

const FilaObjetivo = ({ objetivo, onEliminar, onEditar }) => {
  
  const colorPeligro = 
    objetivo.nivelPeligro === 'Alto' ? 'bg-danger' : 
    objetivo.nivelPeligro === 'Medio' ? 'bg-warning text-dark' : 'bg-success';

  return (
    <tr>
      <td className="fw-bold">{objetivo.alias}</td>
      <td>{objetivo.recompensa} 💰</td>
      <td>
        <span className={`badge ${colorPeligro}`}>
          {objetivo.nivelPeligro}
        </span>
      </td>
      <td>{objetivo.ultimoPlaneta}</td>
      <td>
        {/* Conectamos la función onEditar pasando el objeto completo */}
        <button 
          className="btn btn-sm btn-outline-primary me-2" 
          title="Editar"
          onClick={() => onEditar(objetivo)}
        >
          Editar
        </button>
        {/* Conectamos la función onEliminar pasando solo el ID */}
        <button 
          className="btn btn-sm btn-outline-danger" 
          title="Eliminar"
          onClick={() => onEliminar(objetivo.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default FilaObjetivo;