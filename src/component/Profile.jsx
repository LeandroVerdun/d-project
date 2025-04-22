import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Para mostrar errores si los campos son inválidos

  useEffect(() => {
    // Obtener los datos del usuario desde el localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        username: storedUser.username || "",
        email: storedUser.email || "",
        password: storedUser.password || "",
      });
    } else {
      navigate("/login"); // Redirigir si no hay usuario en el localStorage
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Validar que todos los campos estén completos
    if (!userData.username || !userData.email || !userData.password) {
      setError("All fields are required.");
      return;
    }

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setError(""); // Limpiar el error si todo está bien
    alert("Profile updated successfully!");
  };

  return (
    <div className="container my-5">
      <h2>Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error si hay */}
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
