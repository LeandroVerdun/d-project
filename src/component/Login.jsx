import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener todos los usuarios registrados
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar un usuario que coincida con email y contraseña
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Guardar al usuario logueado en localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Redirigir a inicio
      navigate("/");
    } else {
      setError("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
