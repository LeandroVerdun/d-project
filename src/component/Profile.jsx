// src/component/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";
import "../css/Profile.css";
import { API_BASE_URL } from "../services/api";
import MessageModal from "./MessageModal"; // <-- Importamos el MessageModal

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Contraseña vacía por seguridad, se llena solo si se va a cambiar
    isAdmin: false,
  });
  // const [error, setError] = useState(""); // Ya no usaremos este para mostrar el error directamente

  // --- Nuevo estado para el modal genérico ---
  const [messageModal, setMessageModal] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
    onModalCloseRedirect: null, // Para redireccionar al cerrar el modal
  });
  // ------------------------------------------

  // --- Función para mostrar el modal de mensaje genérico ---
  const showMessage = (
    type,
    title,
    message,
    onConfirm = null,
    onModalCloseRedirect = null
  ) => {
    setMessageModal({
      show: true,
      type,
      title,
      message,
      onConfirm,
      onModalCloseRedirect,
    });
  };

  const handleCloseMessageModal = () => {
    if (messageModal.onModalCloseRedirect) {
      messageModal.onModalCloseRedirect();
    }
    setMessageModal({ ...messageModal, show: false });
  };
  // --------------------------------------------------------

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Si no hay token, redirige y muestra un modal informativo
          showMessage(
            "info",
            "Sesión Expirada",
            "Tu sesión ha expirado o no has iniciado sesión. Por favor, inicia sesión.",
            null,
            () => navigate("/login")
          );
          return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        const isAdmin = user?.isAdmin;

        if (!userId) {
          showMessage(
            "error",
            "Error de Usuario",
            "ID de usuario no encontrado en la sesión. Por favor, inicia sesión de nuevo.",
            null,
            () => navigate("/login")
          );
          return;
        }

        if (isAdmin) {
          showMessage(
            "warning",
            "Acceso Restringido",
            "Los administradores gestionan su perfil desde el panel de administración. Redirigiendo...",
            null,
            () => navigate("/admin")
          );
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get(
          `${API_BASE_URL}/api/users/${userId}`,
          config
        );

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
        console.error("Error al cargar perfil:", err);
        showMessage(
          "error",
          "Error de Carga",
          "Error al cargar el perfil del usuario. Por favor, inténtalo de nuevo más tarde."
        );
      }
    };

    fetchUser();
  }, [navigate]); // Añadimos navigate a las dependencias del useEffect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    // Si había un error previo, lo limpiamos al cambiar un campo
    // setError(""); // Ya no necesario, el modal se oculta automáticamente
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showMessage(
          "info",
          "Sesión Expirada",
          "Tu sesión ha expirado. Por favor, inicia sesión.",
          null,
          () => navigate("/login")
        );
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const userId = JSON.parse(localStorage.getItem("user"))?.id || null;
      if (!userId) {
        showMessage(
          "error",
          "Error de Usuario",
          "Usuario no encontrado en sesión. Intenta iniciar sesión de nuevo."
        );
        return;
      }

      const fullName = (
        userData.firstName.trim() +
        " " +
        userData.lastName.trim()
      ).trim();

      const updateData = {};
      // Solo incluye campos si tienen un valor válido para actualizar
      if (fullName) updateData.name = fullName;
      if (userData.email.trim()) updateData.email = userData.email;
      if (userData.password.trim()) {
        // Validación básica de contraseña si se va a cambiar
        if (userData.password.length < 6) {
          showMessage(
            "warning",
            "Contraseña Inválida",
            "La nueva contraseña debe tener al menos 6 caracteres."
          );
          return;
        }
        updateData.password = userData.password;
      }

      // Si no hay datos para actualizar, informamos al usuario
      if (Object.keys(updateData).length === 0) {
        showMessage(
          "info",
          "Sin Cambios",
          "No hay cambios para guardar en el perfil."
        );
        return;
      }

      await axios.put(
        `${API_BASE_URL}/api/users/${userId}`,
        updateData,
        config
      );

      showMessage(
        "success",
        "¡Actualización Exitosa!",
        "Tu perfil ha sido actualizado correctamente."
      );
      setUserData((prev) => ({ ...prev, password: "" })); // Limpiar campo de contraseña
      // setError(""); // Ya no necesario
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error al actualizar el perfil. Por favor, inténtalo de nuevo.";
      showMessage("error", "Error de Actualización", errorMessage);
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
          />
        </div>
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img
            src={chisatoAvatar}
            alt="chisato_profile"
            className="img-fluid rounded"
          />
        </div>
      </div>

      <div className="profile-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Editar perfil</h1>

        {/* El error ahora se muestra a través del MessageModal */}
        {/* {error && <div className="alert alert-danger">{error}</div>} */}

        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Nombre
            </label>
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
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
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
              Nueva Contraseña (opcional)
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
          style={{ width: "200px" }}
        />
        <img
          src={chisatoAvatar}
          alt="chisato_profile"
          className="img-fluid rounded"
        />
      </div>

      {/* --- Renderizar el MessageModal --- */}
      <MessageModal
        show={messageModal.show}
        handleClose={handleCloseMessageModal}
        type={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        onConfirm={messageModal.onConfirm}
      />
      {/* ---------------------------------- */}
    </div>
  );
};

export default Profile;
