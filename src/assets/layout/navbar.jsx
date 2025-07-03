// navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { BsCart } from "react-icons/bs";
import "../../css/Navbar.css"; // Asegúrate que esta ruta es correcta
import logoImg from "../../assets/img/home.png"; // Asegúrate que esta ruta es correcta

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    setCurrentUser(user);
  }, [location]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setTriggerSearch(false);
    setDropdownVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/books/${encodeURIComponent(query)}`);
    } else {
      navigate("/404");
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navega a la ruta del carrito
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownVisible(false);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark w-100 position-relative navbar-01">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logoImg} alt="Logo" className="Logo-home" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu genre-scroll">
                {[
                  "fiction",
                  "non-fiction",
                  "fantasy",
                  "science fiction",
                  "thriller",
                  "romance",
                  "biography",
                  "history",
                  "poetry",
                  "mystery",
                  "horror",
                  "young adult",
                  "children",
                  "cookbooks",
                  "self-help",
                ].map((category) => (
                  <li key={category}>
                    <Link
                      className="dropdown-item"
                      to={`/categories?category=${category}`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <form
            className="d-flex align-items-center position-relative me-3"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search book"
              value={query}
              onChange={handleInputChange}
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center me-3">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="btn btn-outline-primary me-2">
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-success me-2">
                  Login
                </Link>
              </>
            ) : (
              <>
                <div className="dropdown me-2">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle text-white"
                    type="button"
                    id="dropdownAccount"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currentUser?.username ||
                      currentUser?.email ||
                      "My Account"}{" "}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-user"
                    aria-labelledby="dropdownAccount"
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    {!currentUser?.isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/mypurchases">
                          Mis Compras
                        </Link>
                      </li>
                    )}
                    {currentUser?.isAdmin && (
                      <>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/admin">
                            Panel Administrador
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Botón del Carrito (¡Ya lo tenías, solo confirmo su posición!) */}
                <button
                  className="btn btn-outline-warning"
                  onClick={handleCartClick}
                  title="Cart"
                >
                  <BsCart size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
