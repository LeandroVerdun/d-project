// src/assets/layout/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Footer.css"; // Importa el archivo CSS

export const Footer = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const handleProfileLink = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/404");
    }
  };

  const handleFollowUsLink = (e) => {
    e.preventDefault();
    navigate("/404");
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Navigation */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Navigation</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Help</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/about-us"
                  className="text-light text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-light text-decoration-none"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Account</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/profile"
                  className="text-light text-decoration-none"
                  onClick={handleProfileLink}
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-light text-decoration-none"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div className="social-icons-container">
              {" "}
              {/* Usa la clase del CSS */}
              <a
                href="#"
                className="text-light fs-5"
                onClick={handleFollowUsLink}
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-light fs-5"
                onClick={handleFollowUsLink}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-light fs-5"
                onClick={handleFollowUsLink}
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="bg-secondary" />
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
