import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';

function DatosEnvioForm() {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get state from previous navigation
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    direccion: '',
    ciudad: '',
    telefono: '',
  });

  const items = location.state?.items || [];

  useEffect(() => {
    if (items.length === 0) {
      console.warn("No items found in cart state. Redirecting to store.");
      navigate('/elementStore');
    }
  }, [items, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/resumen', { state: { items: items, buyerInfo: formData } });
  };

  return (
    <div className="form-container">
      <h1>Completa tus datos de envío</h1>
      <form onSubmit={handleSubmit} className="shipping-form">
        <div className="form-group">
          <label htmlFor="nombreCompleto">Nombre Completo:</label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad:</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel" // Use type="tel" for phone numbers
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Finalizar Compra</button>
      </form>
    </div>
  );
}

export default DatosEnvioForm;
