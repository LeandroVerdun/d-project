import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
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
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
  };

  return (
    <div className="container my-5 text-white">
      <h2 className="mb-4">Edit Profile</h2>
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
          <input
            type="email"
            className="form-control bg-dark text-white border-secondary"
            id="email"
            name="email"
            placeholder="email@gmail.com"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control bg-dark text-white border-secondary"
            id="password"
            name="password"
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
        </button>
      </form>
    </div>
  );
};

export default Profile;
