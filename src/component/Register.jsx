import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";
<<<<<<< HEAD
<<<<<<< HEAD
import "../css/Profile.css"; 
=======
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4

import { registerUser } from "../services/api";

import "../css/Register.css";
<<<<<<< HEAD
>>>>>>> backup-local-cambios
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
      <div className="registration-image col-lg-6 col-md-12 d-flex justify-content-between p-3 bg-dark border border-white d-none img-container-2 m-0">
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-start">
          <img
            src={ChisatoZone}
            alt="logo_chisato_zone"
            className="img-fluid mb-3"
<<<<<<< HEAD
<<<<<<< HEAD
            style={{
              width: "100%",
              height: "auto",
            }}
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> backup-local-cambios
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          />
        </div>
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img
            src={chisatoAvatar}
            alt="chisato_register"
            className="img-fluid rounded"
<<<<<<< HEAD
<<<<<<< HEAD
            style={{
              width: "100%",
              height: "auto",
            }}
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> backup-local-cambios
=======
            style={{ width: "100%", height: "auto" }}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          />
        </div>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
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
<<<<<<< HEAD
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
=======
                className={`form-control ${errors[id] ? "is-invalid" : ""}`}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                id={id}
                name={id}
                placeholder={placeholder}
                maxLength={max}
                value={formData[id]}
                onChange={handleChange}
                required
              />
              {errors[id] && (
                <div className="invalid-feedback d-block">{errors[id]}</div>
              )}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
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
        </form>
      </div>

<<<<<<< HEAD


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
        </form>
      </div>

      {/* Imágenes para versión de escritorio */}
>>>>>>> backup-local-cambios
=======
      {/* Imágenes para versión de escritorio */}
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
<<<<<<< HEAD

      
=======
>>>>>>> backup-local-cambios
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    </div>
  );
};

export default Register;
