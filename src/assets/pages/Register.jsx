import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    image: null,
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    creditCard: '',
    creditCardCVV: '',
    creditCardExpiry: '',
    creditCardHolderName: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.image || !formData.firstName || !formData.lastName || !formData.username || !formData.password || !formData.confirmPassword || !formData.creditCard || !formData.creditCardCVV || !formData.creditCardExpiry || !formData.creditCardHolderName) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setError('');

    // Crear un objeto con los datos
    const formToJson = {
      image: formData.image.name,
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
      creditCard: formData.creditCard,
      creditCardCVV: formData.creditCardCVV,
      creditCardExpiry: formData.creditCardExpiry,
      creditCardHolderName: formData.creditCardHolderName,
    };

    // Convertir a JSON
    const jsonStr = JSON.stringify(formToJson, null, 2);

    // Crear un Blob con el contenido de JSON
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga para el archivo .txt (simulando la carpeta "psudoDB")
    const link = document.createElement('a');
    link.href = url;
    link.download = 'psudoDB/DB.txt'; // Intentamos simular la carpeta "psudoDB"
    link.click();

    // Liberar el objeto URL después de la descarga
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <h2>Formulario de Registro</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Subir Imagen</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="creditCard" className="form-label">Número de Tarjeta de Crédito</label>
          <input
            type="text"
            className="form-control"
            id="creditCard"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="creditCardCVV" className="form-label">Código de Seguridad (CVV)</label>
          <input
            type="text"
            className="form-control"
            id="creditCardCVV"
            name="creditCardCVV"
            value={formData.creditCardCVV}
            onChange={handleChange}
            placeholder="123"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="creditCardExpiry" className="form-label">Fecha de Vencimiento</label>
          <input
            type="month"
            className="form-control"
            id="creditCardExpiry"
            name="creditCardExpiry"
            value={formData.creditCardExpiry}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="creditCardHolderName" className="form-label">Nombre del Propietario de la Tarjeta</label>
          <input
            type="text"
            className="form-control"
            id="creditCardHolderName"
            name="creditCardHolderName"
            value={formData.creditCardHolderName}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
}
