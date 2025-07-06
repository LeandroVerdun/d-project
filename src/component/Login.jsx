// src/component/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Chisato from "../assets/img/Loging.jpg";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await loginUser({ email, password });

      if (userData && userData.token) {
        localStorage.setItem("token", userData.token);
        const decodedToken = jwtDecode(userData.token);

        // Asegúrate de que el token decodificado contiene isAdmin
        const user = {
          id: decodedToken.id,
          isAdmin: decodedToken.isAdmin, // <-- Esto es lo que ProtectedUserAdmin lee
          username: decodedToken.username || email, // Preferiblemente usa el username del token si existe, sino el email
        };
        localStorage.setItem("user", JSON.stringify(user));

        // Redirige según el rol del usuario
        if (user.isAdmin) {
          navigate("/admin"); // Si es administrador, ir a la página de administración
        } else {
          navigate("/"); // Si no es administrador, ir a la página principal o a donde desees
        }
      } else {
        throw new Error(
          "Invalid response from server. Missing token or user data."
        );
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      // err.message ahora directamente contendrá lo que lanzó tu api.js
      setError(
        err.message ||
          "Credenciales inválidas. Por favor, verifica tu email y contraseña."
      );
    }
  };
  return (
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <div
      className="text-white border border-white p-4 rounded"
      style={{ width: "30%", minWidth: "300px", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <h2 className="text-center">Login</h2>

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

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          <Link to="/forgot-password" className="text-primary">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
        <p>
          No tienes cuenta?{" "}
          <Link to="/register" className="text-primary">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;
