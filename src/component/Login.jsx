import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chisato from "../assets/img/Loging.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Guarda en el localstorage
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Redirige al home
      navigate("/");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Login</h2>
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

      {/* link de olvidaste la contrase;a */}
      <div className="mt-3">
        <p>
          <a href="/forgot-password" className="text-primary">
            Forgot your password?
          </a>
        </p>
      </div>

      {/* Link de logearse */}
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
