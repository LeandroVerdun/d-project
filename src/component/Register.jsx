import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const defaultAvatars = [
  "/img/avatar1.png",
  "/img/avatar2.png",
  "/img/avatar3.png"
];

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
    avatar: defaultAvatars[0],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Verificar si el nombre de usuario ya existe en el localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUsernameTaken = existingUsers.some(user => user.username === formData.username);

    if (isUsernameTaken) {
      alert("Username is already taken. Please choose another one.");
      return;
    }

    // Guardar el nuevo usuario en el localStorage
    const newUser = { ...formData };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    console.log("Registration data:", formData);
    navigate("/login");
  };

  const formatExpirationDate = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4); // MM/YY format
    }
    e.target.value = value;
    handleChange(e); // Update state
  };

  return (
    <div className="container p-5 d-flex flex-wrap">
      <div className="registration-form col-md-6">
        <h1 className="fw-bold fs-1 text-start">Register</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label text-start d-block">
              First and Last Name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              name="firstName"
              placeholder="Chisato Nishikigi"
              maxLength="30"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label text-start d-block">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              placeholder="Chisato_123"
              maxLength="20"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-start d-block">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="email@gmail.com"
              maxLength="30"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-start d-block">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              maxLength="10"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-start d-block">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              maxLength="10"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label text-start d-block">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="form-control"
              name="cardNumber"
              placeholder="1234 5678 9876 5432"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="19"
              pattern="\d{4} \d{4} \d{4} \d{4}"
              required
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <div className="form-group">
              <label htmlFor="expirationDate" className="form-label text-start">
                Expiration Date (MM/YY)
              </label>
              <input
                type="text"
                className="form-control"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={formatExpirationDate}
                maxLength="5"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="securityCode" className="form-label text-start">
                Security Code
              </label>
              <input
                type="text"
                className="form-control"
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
            <p>Already have an account?</p>
            <a href="/login" className="text-lowercase fw-bolder">
              Login
            </a>
          </div>
        </form>
      </div>

      <div className="registration-image col-md-6 text-center">
        <img
          src="../multimedia/imagenes/chisato_registro.jpg"
          alt="chisato_registro"
          className="img-fluid rounded"
        />
      </div>
    </div>
  );
};

export default Register;
