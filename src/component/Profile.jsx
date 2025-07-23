import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";
import "../css/Profile.css";
import { API_BASE_URL } from "../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
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

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        const isAdmin = user?.isAdmin;

        if (!userId) {
          setError("ID de usuario no encontrado en la sesión.");
          navigate("/login");
          return;
        }

        if (isAdmin) {
          setError("Los administradores gestionan su perfil desde el panel de administración.");
          navigate("/admin");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}`, config);

        // Separa el nombre completo en firstName y lastName
        const nameParts = (data.name || "").trim().split(" ");
        const firstName = nameParts.shift() || "";
        const lastName = nameParts.join(" ") || "";

        setUserData({
          firstName,
          lastName,
          email: data.email || "",
          password: "",
          isAdmin: data.isAdmin || false,
        });
      } catch (err) {
        console.error(err);
        setError("Error al cargar perfil.");
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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const userId = JSON.parse(localStorage.getItem("user"))?.id || null;
      if (!userId) {
        setError("Usuario no encontrado en sesión.");
        return;
      }

      // Unir firstName y lastName para enviar como name
      const fullName = (userData.firstName.trim() + " " + userData.lastName.trim()).trim();

      const updateData = {};
      if (fullName) updateData.name = fullName;
      if (userData.email.trim()) updateData.email = userData.email;
      if (userData.password.trim()) updateData.password = userData.password;

      await axios.put(`${API_BASE_URL}/api/users/${userId}`, updateData, config);
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
          <img src={ChisatoZone} alt="logo_chisato_zone" className="img-fluid mb-3" />
        </div>
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img src={chisatoAvatar} alt="chisato_profile" className="img-fluid rounded" />
        </div>
      </div>

      <div className="profile-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Editar perfil</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Tu apellido"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="password" className="form-label">Nueva Contraseña (opcional)</label>
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

          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Guardar Cambios
          </button>
        </form>
      </div>

      <div className="profile-image col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center border border-white p-3 bg-dark img-container-1">
        <img src={ChisatoZone} alt="logo_chisato_zone" className="mb-3" style={{ width: "200px" }} />
        <img src={chisatoAvatar} alt="chisato_profile" className="img-fluid rounded" />
      </div>
    </div>
  );
};

export default Profile;
