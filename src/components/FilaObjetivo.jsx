import React from 'react';

// Recibimos un "objetivo" individual a través de las props
const FilaObjetivo = ({ objetivo }) => {
  
  // Pequeña lógica para darle colores a la etiqueta de peligro usando Bootstrap
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
        {/* Dejamos los botones listos con iconos para la Fase 4 (Editar y Eliminar) */}
        <button className="btn btn-sm btn-outline-primary me-2" title="Editar">
          Editar
        </button>
        <button className="btn btn-sm btn-outline-danger" title="Eliminar">
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default FilaObjetivo;