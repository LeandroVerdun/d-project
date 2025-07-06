import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Footer.css";
import backgroundFooter from "../img/Footerimg.png";

export const Footer = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
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
    <footer
      className="footer-custom text-light pt-5 pb-4"
      style={{
        backgroundImage: `url(${backgroundFooter})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="row footer-grid">
          {/* Navigation */}
          <div className="col-6 col-md-3 mb-4">
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
          <div className="col-6 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Help</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-light text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-6 col-md-3 mb-4">
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
                <Link to="/register" className="text-light text-decoration-none">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-6 col-md-3 mb-4">
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <div className="social-icons-container">
              <a href="#" className="text-light fs-5" onClick={handleFollowUsLink}>
                <FaFacebookF />
              </a>
              <a href="#" className="text-light fs-5" onClick={handleFollowUsLink}>
                <FaTwitter />
              </a>
              <a href="#" className="text-light fs-5" onClick={handleFollowUsLink}>
                <FaInstagram />
              </a>
              <a href="#" className="text-light fs-5" onClick={handleFollowUsLink}>
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="bg-secondary" />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} BookApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
