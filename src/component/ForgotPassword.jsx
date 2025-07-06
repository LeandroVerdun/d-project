import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import forgotPasswordImg from "../assets/img/forgot.jpg"; 
=======
import axios from "axios";
import forgotPasswordImg from "../assets/img/forgot.jpg";
>>>>>>> backup-local-cambios

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();

 
    const users = JSON.parse(localStorage.getItem("users")) || [];


    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {

      setSuccessMessage("Password reset instructions have been sent to your email.");
      setEmail(""); 
      setError("");
    } else {
      setError("Email not found. Please check your email and try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Forgot Password</h2>
      
      {/* Imagen redonda debajo del título */}
      <div className="d-flex justify-content-center mb-4">
        <img
          src={forgotPasswordImg}
          alt="Forgot Password"
          className="img-fluid rounded-circle"
          style={{ width: "150px", height: "150px" }} 
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/users/forgot-password", { email });

      if (response.status === 200) {
        setSuccessMessage(response.data.message || "Se enviaron las instrucciones a tu correo.");
        setEmail("");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("El correo o usuario no fue encontrado.");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Ocurrió un error. Intenta nuevamente.");
      }
    }
  };

return (
  <div
    className="container d-flex justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
  >
    <div
      className="text-white border border-white p-4 rounded"
      style={{ width: "40%", minWidth: "300px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <h2 className="text-center">Olvidé mi contraseña</h2>

      <div className="d-flex justify-content-center mb-4">
        <img
          src={forgotPasswordImg}
          alt="Olvidé mi contraseña"
          className="img-fluid rounded-circle"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
>>>>>>> backup-local-cambios
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
<<<<<<< HEAD
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
=======

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Correo electrónico</label>
>>>>>>> backup-local-cambios
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
<<<<<<< HEAD
        <button type="submit" className="btn btn-primary">
          Send Instructions
        </button>
      </form>

      <div className="mt-3">
        <p>
          Remembered your password?{" "}
          <a href="/login" className="text-primary">
            Login
=======
        <button type="submit" className="btn btn-primary w-100">
          Enviar instrucciones
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          ¿Recordaste tu contraseña?{" "}
          <a href="/login" className="text-primary">
            Iniciar sesión
>>>>>>> backup-local-cambios
          </a>
        </p>
      </div>
    </div>
<<<<<<< HEAD
  );
=======
  </div>
);


>>>>>>> backup-local-cambios
};

export default ForgotPassword;
