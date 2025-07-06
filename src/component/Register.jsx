import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";
<<<<<<< HEAD
import "../css/Profile.css"; 
=======

import { registerUser } from "../services/api";

import "../css/Register.css";
>>>>>>> backup-local-cambios

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
<<<<<<< HEAD
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      let formattedValue = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatExpirationDate = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUsernameTaken = existingUsers.some(user => user.username === formData.username);

    if (isUsernameTaken) {
      alert("Username is already taken. Please choose another one.");
      return;
    }

    const newUser = { ...formData };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    navigate("/login");
  };

  return (
    <div className="container p-0 d-flex flex-wrap justify-content-between text-white p-md-5 m-0">

      {/* Imágenes para móvil/tablet */}
=======
    // Eliminamos los campos de tarjeta como habíamos acordado
    avatar: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "username":
      case "email":
      case "password":
      case "confirmPassword":
        if (!value.trim()) {
          error = "Este campo es obligatorio.";
        }
        break;
      default:
        break;
    }

    if (
      name === "email" &&
      value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      error = "Formato de email inválido.";
    }

    if (name === "password" && value.trim() && value.length < 6) {
      error = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (
      name === "confirmPassword" &&
      value.trim() &&
      value !== formData.password
    ) {
      error = "Las contraseñas no coinciden.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setIsLoading(true);

    const newErrors = {};
    // Valida todos los campos antes de enviar
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) newErrors[key] = errors[key];
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      isAdmin: false,
      // Considera añadir phone y avatar si son parte de tu modelo de usuario y son requeridos
      // phone: formData.phone,
      // avatar: formData.avatar,
    };

    try {
      const registeredUser = await registerUser(newUser);
      console.log("User registered successfully:", registeredUser);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setGeneralError(
        error.response?.data?.message ||
          error.message ||
          "Fallo el registro. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    {
      id: "firstName",
      label: "Nombre",
      type: "text",
      placeholder: "Tu nombre aquí",
      max: 30,
    },
    {
      id: "lastName",
      label: "Apellido",
      type: "text",
      placeholder: "Tu apellido aquí",
      max: 30,
    },
    {
      id: "username",
      label: "Nombre de Usuario",
      type: "text",
      placeholder: "Elige un nombre de usuario",
      max: 20,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "ejemplo@dominio.com",
      max: 30,
    },
    {
      id: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Mínimo 6 caracteres",
      max: 10,
    },
    {
      id: "confirmPassword",
      label: "Confirmar Contraseña",
      type: "password",
      placeholder: "Repite tu contraseña",
      max: 10,
    },
  ];

  return (
    <div className="container p-0 d-flex flex-wrap justify-content-between text-white p-md-5 m-0">
      {/* Imágenes para móvil/tablet - puedes mantenerlas o ajustar clases de Bootstrap */}
>>>>>>> backup-local-cambios
      <div className="registration-image col-lg-6 col-md-12 d-flex justify-content-between p-3 bg-dark border border-white d-none img-container-2 m-0">
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-start">
          <img
            src={ChisatoZone}
            alt="logo_chisato_zone"
            className="img-fluid mb-3"
<<<<<<< HEAD
            style={{
              width: "100%",
              height: "auto",
            }}
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> backup-local-cambios
          />
        </div>
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img
            src={chisatoAvatar}
            alt="chisato_register"
            className="img-fluid rounded"
<<<<<<< HEAD
            style={{
              width: "100%",
              height: "auto",
            }}
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> backup-local-cambios
          />
        </div>
      </div>

<<<<<<< HEAD

      {/* Parte izquierda (formulario) */}
      <div className="registration-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Register</h1>

        <form onSubmit={handleSubmit}>
          {[ 
            { id: "firstName", label: "First and Last Name", type: "text", placeholder: "Chisato Nishikigi", max: 30 },
            { id: "username", label: "Username", type: "text", placeholder: "Chisato_123", max: 20 },
            { id: "email", label: "Email", type: "email", placeholder: "email@gmail.com", max: 30 },
            { id: "password", label: "Password", type: "password", max: 10 },
            { id: "confirmPassword", label: "Confirm Password", type: "password", max: 10 },
            { id: "cardNumber", label: "Card Number", type: "text", placeholder: "1234 5678 9876 5432", max: 19 },
          ].map(({ id, label, type, placeholder, max }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="form-label text-start d-block">{label}</label>
              <input
                type={type}
                className="form-control bg-dark text-white border-secondary"
=======
      {/* Parte izquierda (formulario) */}
      <div className="registration-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Regístrate</h1>
        <form onSubmit={handleSubmit}>
          {formFields.map(({ id, label, type, placeholder, max }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="form-label text-start d-block">
                {label}
              </label>
              <input
                type={type}
                className={`form-control ${errors[id] ? "is-invalid" : ""}`}
>>>>>>> backup-local-cambios
                id={id}
                name={id}
                placeholder={placeholder}
                maxLength={max}
                value={formData[id]}
                onChange={handleChange}
                required
              />
<<<<<<< HEAD
            </div>
          ))}

          <div className="mb-3 d-flex justify-content-between">
            <div className="form-group w-50 me-2">
              <label htmlFor="expirationDate" className="form-label text-start">Expiration Date (MM/YY)</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={formatExpirationDate}
                maxLength="5"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group w-50 ms-2">
              <label htmlFor="securityCode" className="form-label text-start">Security Code</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                id="securityCode"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                maxLength="3"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="checkRobot" required />
            <label className="form-check-label" htmlFor="checkRobot">I am not a robot</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 p-2">Register</button>

          <div className="create-account d-flex gap-2 p-2">
            <p>Already have an account?</p>
            <a href="/login" className="text-lowercase fw-bolder">Login</a>
          </div>
        </form>
      </div>



      {/* Imágenes para vesion de escritorio */}
=======
              {errors[id] && (
                <div className="invalid-feedback d-block">{errors[id]}</div>
              )}
            </div>
          ))}

          {/* Campo de teléfono, si lo necesitas */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label text-start d-block">
              Teléfono (Opcional)
            </label>
            <input
              type="tel"
              className="form-control" // Aplica también tus estilos personalizados para form-control
              id="phone"
              name="phone"
              placeholder="Ej: +5491112345678"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="checkRobot"
              required
            />

            <label className="form-check-label" htmlFor="checkRobot">
              Confirmo que no soy un robot
            </label>
          </div>

          {generalError && (
            <div className="alert alert-danger text-center">{generalError}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-register"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>

          {/* Eliminamos la sección de "Iniciar Sesión" en el formulario de registro */}
          {/* <div className="create-account d-flex gap-2 p-2">
            <p>¿Ya tienes una cuenta?</p>
            <a href="/login" className="text-lowercase fw-bolder">
              Iniciar Sesión
            </a>
          </div> */}
        </form>
      </div>

      {/* Imágenes para versión de escritorio */}
>>>>>>> backup-local-cambios
      <div className="registration-image col-lg-6 col-md-12 d-flex flex-column justify-content-center align-items-center border border-white p-3 bg-dark img-container-1">
        <img
          src={ChisatoZone}
          alt="logo_chisato_zone"
          className="mb-3"
          style={{ width: "200px", height: "auto" }}
        />
        <img
          src={chisatoAvatar}
          alt="chisato_register"
          className="img-fluid rounded"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
<<<<<<< HEAD

      
=======
>>>>>>> backup-local-cambios
    </div>
  );
};

export default Register;
