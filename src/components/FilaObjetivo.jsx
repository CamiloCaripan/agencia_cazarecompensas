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
        {/* Botones actualizados con iconos */}
        <button 
          className="btn btn-sm btn-outline-primary me-2" 
          title="Editar"
          onClick={() => onEditar(objetivo)}
        >
          <i className="bi bi-pencil-square me-1"></i> Editar
        </button>
        <button 
          className="btn btn-sm btn-outline-danger" 
          title="Eliminar"
          onClick={() => onEliminar(objetivo.id)}
        >
          <i className="bi bi-trash-fill me-1"></i> Eliminar
        </button>
      </td>
    </tr>
  );
};

export default FilaObjetivo;