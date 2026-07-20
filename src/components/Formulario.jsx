import React from 'react';

const Formulario = ({ formData, setFormData, onAgregarObjetivo }) => {

  // Función que captura lo que el usuario escribe y actualiza el estado en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Función que se ejecuta al darle click al botón "Registrar Misión"
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    
    // Validación básica: que no hayan campos vacíos
    if (!formData.alias || !formData.recompensa || !formData.nivelPeligro || !formData.ultimoPlaneta) {
      alert('Por favor, completa todos los campos para registrar la misión.');
      return;
    }

    // Enviamos los datos al componente padre (App.jsx)
    onAgregarObjetivo(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-bold">Alias del Objetivo</label>
        <input type="text" className="form-control" name="alias" value={formData.alias} onChange={handleChange} placeholder="Ej. Rey Flippy Nips" />
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold">Recompensa (Flurbos)</label>
        <input type="number" className="form-control" name="recompensa" value={formData.recompensa} onChange={handleChange} placeholder="Ej. 5000" />
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold">Nivel de Peligro</label>
        <select className="form-select" name="nivelPeligro" value={formData.nivelPeligro} onChange={handleChange}>
          <option value="">Selecciona un nivel...</option>
          <option value="Bajo">Bajo (Inofensivo)</option>
          <option value="Medio">Medio (Armado y peligroso)</option>
          <option value="Alto">Alto (Letal)</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold">Último Planeta Visto</label>
        <input type="text" className="form-control" name="ultimoPlaneta" value={formData.ultimoPlaneta} onChange={handleChange} placeholder="Ej. Plutón" />
      </div>
      
      <button type="submit" className="btn btn-dark w-100 fw-bold">
         Registrar Misión
      </button>
    </form>
  );
};

export default Formulario;