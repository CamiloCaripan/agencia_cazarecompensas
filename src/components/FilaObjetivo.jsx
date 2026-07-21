import React from 'react';

const FilaObjetivo = ({ objetivo, onEliminar, onEditar }) => {
  
  const colorPeligro = 
    objetivo.nivelPeligro === 'Alto' ? 'bg-danger text-white' : 
    objetivo.nivelPeligro === 'Medio' ? 'bg-warning text-dark' : 'bg-success text-white';

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
        {/* BOTONES ACTUALIZADOS: Con un contenedor flex y clase de tamaño uniforme */}
        <div className="d-flex gap-2">
          <button 
            className="btn btn-sm btn-outline-primary btn-table-action" 
            title="Editar"
            onClick={() => onEditar(objetivo)}
          >
            <i className="bi bi-pencil-square me-1"></i> Editar
          </button>
          
          <button 
            className="btn btn-sm btn-outline-danger btn-table-action" 
            title="Eliminar"
            onClick={() => onEliminar(objetivo.id)}
          >
            <i className="bi bi-trash-fill me-1"></i> Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FilaObjetivo;