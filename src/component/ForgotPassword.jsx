import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotPasswordImg from "../assets/img/forgot.jpg"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
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
        <button type="submit" className="btn btn-primary">
          Send Instructions
        </button>
      </form>

      <div className="mt-3">
        <p>
          Remembered your password?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
