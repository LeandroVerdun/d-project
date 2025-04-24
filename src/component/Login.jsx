import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chisato from "../assets/img/Loging.jpg"; // Asegúrate de poner la ruta correcta de tu imagen

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find a user that matches the email and password
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Save the logged-in user to localStorage
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Redirect to the home page
      navigate("/");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Login</h2>
      {/* Image below the form */}
      <div className="mt-4 d-flex justify-content-center pb-3">
        <img
          src={Chisato}
          alt="Sample"
          className="rounded-circle"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
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
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>

      {/* Forgot password link */}
      <div className="mt-3">
        <p>
          <a href="/forgot-password" className="text-primary">
            Forgot your password?
          </a>
        </p>
      </div>

      {/* Link to the registration page */}
      <div className="mt-3">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-primary">
            Register
          </a>
        </p>
      </div>

      
    </div>
  );
};

export default Login;
