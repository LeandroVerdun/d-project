import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import chisatoAvatar from "../assets/img/register.webp";
import ChisatoZone from "../assets/img/logo-chisato-zone.png";

import { registerUser } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    } // Prepara los datos para el backend

    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      isAdmin: false, // Por defecto, el usuario no es admin
    };

    try {
      // Llama a la función de la API en lugar de usar localStorage
      const registeredUser = await registerUser(newUser);
      console.log("User registered successfully:", registeredUser);
      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      // Maneja errores, por ejemplo, si el nombre de usuario ya existe
      alert(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="container p-0 d-flex flex-wrap justify-content-between text-white p-md-5 m-0">
      {/* Imágenes para móvil/tablet */}     {" "}
      <div className="registration-image col-lg-6 col-md-12 d-flex justify-content-between p-3 bg-dark border border-white d-none img-container-2 m-0">
        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-start">
          <img
            src={ChisatoZone}
            alt="logo_chisato_zone"
            className="img-fluid mb-3"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        <div className="profile-image-container col-6 col-md-3 d-flex flex-column justify-content-center align-items-end">
          <img
            src={chisatoAvatar}
            alt="chisato_register"
            className="img-fluid rounded"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      {/* Parte izquierda (formulario) */}     {" "}
      <div className="registration-form col-lg-6 col-md-12 border border-white p-4 rounded">
        <h1 className="fw-bold fs-1 text-start">Register</h1>       {" "}
        <form onSubmit={handleSubmit}>
          {[
            {
              id: "firstName",
              label: "First and Last Name",
              type: "text",
              placeholder: "Chisato Nishikigi",
              max: 30,
            },
            {
              id: "username",
              label: "Username",
              type: "text",
              placeholder: "Chisato_123",
              max: 20,
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "email@gmail.com",
              max: 30,
            },
            { id: "password", label: "Password", type: "password", max: 10 },
            {
              id: "confirmPassword",
              label: "Confirm Password",
              type: "password",
              max: 10,
            },
            {
              id: "cardNumber",
              label: "Card Number",
              type: "text",
              placeholder: "1234 5678 9876 5432",
              max: 19,
            },
          ].map(({ id, label, type, placeholder, max }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="form-label text-start d-block">
                {label}
              </label>

              <input
                type={type}
                className="form-control bg-dark text-white border-secondary"
                id={id}
                name={id}
                placeholder={placeholder}
                maxLength={max}
                value={formData[id]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-3 d-flex justify-content-between">
            <div className="form-group w-50 me-2">
              <label htmlFor="expirationDate" className="form-label text-start">
                Expiration Date (MM/YY)
              </label>

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
              <label htmlFor="securityCode" className="form-label text-start">
                Security Code
              </label>

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
            <input
              type="checkbox"
              className="form-check-input"
              id="checkRobot"
              required
            />

            <label className="form-check-label" htmlFor="checkRobot">
              I am not a robot
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2">
            Register
          </button>
          <div className="create-account d-flex gap-2 p-2">
            <p>Already have an account?</p>           {" "}
            <a href="/login" className="text-lowercase fw-bolder">
              Login
            </a>
          </div>
        </form>
      </div>
      {/* Imágenes para vesion de escritorio */}     {" "}
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
    </div>
  );
};

export default Register;
