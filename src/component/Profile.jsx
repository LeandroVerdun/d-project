import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";
import "../css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(
          "http://localhost:5000/api/users/me",
          config
        );

        setUserData({
          name: data.name || "",
          email: data.email || "",
          password: "",
          isAdmin: data.isAdmin || false,
        });
      } catch (err) {
        console.error(err);
        setError("Error al cargar perfil. Por favor inicia sesión nuevamente.");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = async () => {
    const { name, email, password } = userData;

    if (!name || !email) {
      setError("El nombre y email son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Obtener id usuario del token decodificado (o de localStorage si guardas)
      const userId = JSON.parse(localStorage.getItem("user"))?.id || null;
      if (!userId) {
        setError("Usuario no encontrado en sesión.");
        return;
      }

      const updateData = { name, email };
      if (password.trim()) updateData.password = password;

      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        updateData,
        config
      );
      alert("Perfil actualizado correctamente");
      setUserData((prev) => ({ ...prev, password: "" }));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al actualizar perfil.");
    }
  };

  return (
    <div className="container p-0 d-flex flex-wrap justify-content-between text-white p-md-5 m-0">
      <div className="profile-image col-lg-6 col-md-12 d-flex justify-content-between p-3 bg-dark border border-white d-none img-container-2">
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-start">
          <img
            src={ChisatoZone}
            alt="logo_chisato_zone"
            className="img-fluid mb-3"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img
            src={chisatoAvatar}
            alt="chisato_profile"
            className="img-fluid rounded"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div className="profile-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Editar perfil</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="email@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Nueva Contraseña (Opcional)
            </label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Dejar vacío para no cambiar"
            />
          </div>

          {userData.isAdmin && (
            <div className="mb-3">
              <label className="form-label">Eres Administrador</label>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
        </form>
      </div>

      <div className="profile-image col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center border border-white p-3 bg-dark img-container-1">
        <img
          src={ChisatoZone}
          alt="logo_chisato_zone"
          className="mb-3"
          style={{ width: "200px", height: "auto" }}
        />
        <img
          src={chisatoAvatar}
          alt="chisato_profile"
          className="img-fluid rounded"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Profile;
