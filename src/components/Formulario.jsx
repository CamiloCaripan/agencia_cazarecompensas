import React from 'react';

const Formulario = ({ formData, setFormData, onAgregarObjetivo, editandoId }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!formData.alias || !formData.recompensa || !formData.nivelPeligro || !formData.ultimoPlaneta) {
      alert('Por favor, completa todos los campos para registrar la misión.');
      return;
    }

    onAgregarObjetivo(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-bold small">Alias del Objetivo</label>
        <input type="text" className="form-control" name="alias" value={formData.alias} onChange={handleChange} placeholder="Ej. Rey Flippy Nips" />
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold small">Recompensa (Flurbos)</label>
        <input type="number" className="form-control" name="recompensa" value={formData.recompensa} onChange={handleChange} placeholder="Ej. 5000" />
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold small">Nivel de Peligro</label>
        <select className="form-select" name="nivelPeligro" value={formData.nivelPeligro} onChange={handleChange}>
          <option value="">Selecciona un nivel...</option>
          <option value="Bajo">Bajo (Inofensivo)</option>
          <option value="Medio">Medio (Armado y peligroso)</option>
          <option value="Alto">Alto (Letal)</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold small">Último Planeta Visto</label>
        <input type="text" className="form-control" name="ultimoPlaneta" value={formData.ultimoPlaneta} onChange={handleChange} placeholder="Ej. Plutón" />
      </div>
      
      {/* BOTÓN ACTUALIZADO: Ahora resalta por completo y no se confunde con los inputs */}
      <button 
        type="submit" 
        className={`btn w-100 btn-submit-notion mt-2 shadow-sm ${editandoId ? 'btn-edit-mode' : 'btn-create-mode'}`}
      >
         {editandoId ? (
           <><i className="bi bi-arrow-clockwise me-2"></i>Actualizar Misión</>
         ) : (
           <><i className="bi bi-plus-circle me-2"></i>Registrar Misión</>
         )}
      </button>
    </form>
  );
};

export default Formulario;