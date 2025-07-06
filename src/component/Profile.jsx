import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> backup-local-cambios
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";
import "../css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
<<<<<<< HEAD
    username: "",
    email: "",
    password: "",
    firstName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
=======
    name: "",
    email: "",
    password: "",
    isAdmin: false,
>>>>>>> backup-local-cambios
  });
  const [error, setError] = useState("");

  useEffect(() => {
<<<<<<< HEAD
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        username: storedUser.username || "",
        email: storedUser.email || "",
        password: storedUser.password || "",
        firstName: storedUser.firstName || "",
        cardNumber: storedUser.cardNumber || "",
        expirationDate: storedUser.expirationDate || "",
        securityCode: storedUser.securityCode || "",
      });
    } else {
      navigate("/login");
    }
=======
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
>>>>>>> backup-local-cambios
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD

    if (name === "cardNumber") {
      let formattedValue = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setUserData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "expirationDate") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 4);
      }
      setUserData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSave = () => {
    const {
      username, email, password, firstName, cardNumber, expirationDate, securityCode,
    } = userData;

    if (!username || !email || !password || !firstName || !cardNumber || !expirationDate || !securityCode) {
      setError("All fields are required.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));
    setError("");
    alert("Profile updated successfully!");
=======
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
>>>>>>> backup-local-cambios
  };

  return (
    <div className="container p-0 d-flex flex-wrap justify-content-between text-white p-md-5 m-0">
<<<<<<< HEAD
      {/* Segunda versión de las imágenes */}
=======
>>>>>>> backup-local-cambios
      <div className="profile-image col-lg-6 col-md-12 d-flex justify-content-between p-3 bg-dark border border-white d-none img-container-2">
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-start">
          <img
            src={ChisatoZone}
            alt="logo_chisato_zone"
            className="img-fluid mb-3"
<<<<<<< HEAD
            style={{
              width: "100%", // Asegura que la imagen ocupe el 100% del contenedor
              height: "auto", // Mantiene la proporción de la imagen
            }}
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> backup-local-cambios
          />
        </div>
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img
            src={chisatoAvatar}
            alt="chisato_profile"
            className="img-fluid rounded"
<<<<<<< HEAD
            style={{
              width: "100%", // Ajusta la imagen para ocupar el 100% del contenedor
              height: "auto", // Mantiene la proporción de la imagen
            }}
          />
        </div>
      </div>
      <div className="profile-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Edit Profile</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        

        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First and Last Name
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="firstName"
              name="firstName"
              placeholder="Chisato Nishikigi"
              value={userData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="username"
              name="username"
              placeholder="Chisato_123"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
=======
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
<<<<<<< HEAD
              placeholder="email@gmail.com"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
=======
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
<<<<<<< HEAD
              placeholder="********"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              Card Number
            </label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9876 5432"
              value={userData.cardNumber}
              onChange={handleChange}
              maxLength="19"
              pattern="\d{4} \d{4} \d{4} \d{4}"
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <div className="w-50 me-2">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date (MM/YY)
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                id="expirationDate"
                name="expirationDate"
                placeholder="MM/YY"
                maxLength="5"
                value={userData.expirationDate}
                onChange={handleChange}
              />
            </div>
            <div className="w-50 ms-2">
              <label htmlFor="securityCode" className="form-label">
                Security Code
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                id="securityCode"
                name="securityCode"
                placeholder="123"
                maxLength="3"
                value={userData.securityCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save Changes
=======
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
>>>>>>> backup-local-cambios
          </button>
        </form>
      </div>

<<<<<<< HEAD
      {/* Primera versión de las imágenes */}
=======
>>>>>>> backup-local-cambios
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
<<<<<<< HEAD
          style={{
            maxWidth: "100%",  
            height: "auto",  
          }}
        />
      </div>

      

=======
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
>>>>>>> backup-local-cambios
    </div>
  );
};

export default Profile;
