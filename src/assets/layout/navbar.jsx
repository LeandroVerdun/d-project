<<<<<<< HEAD
<<<<<<< HEAD
=======
// navbar.jsx
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { BsCart } from "react-icons/bs";
<<<<<<< HEAD
import "../../css/Navbar.css";
import logoImg from "../../assets/img/home.png";
=======
// navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { BsCart } from "react-icons/bs";
import "../../css/Navbar.css";
import logoImg from "../../assets/img/home.png";

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

<<<<<<< HEAD
<<<<<<< HEAD
  const { movies, loading } = useFetchMovies(query, 10);

=======
>>>>>>> backup-local-cambios
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    setCurrentUser(user);
  }, [location]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setTriggerSearch(false);
<<<<<<< HEAD
<<<<<<< HEAD
    setDropdownVisible(true);
=======
    setDropdownVisible(false);
>>>>>>> backup-local-cambios
=======
    setDropdownVisible(false);
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
<<<<<<< HEAD
<<<<<<< HEAD
      navigate(`/search/${encodeURIComponent(query)}`);
=======
      navigate(`/search/books/${encodeURIComponent(query)}`);
>>>>>>> backup-local-cambios
=======
      navigate(`/search/books/${encodeURIComponent(query)}`);
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    } else {
      navigate("/404");
    }
  };

  const handleCartClick = () => {
<<<<<<< HEAD
<<<<<<< HEAD
    navigate("/cart");
  };

  const handleLogout = () => {
=======
    navigate("/cart"); // Navega a la ruta del carrito
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
>>>>>>> backup-local-cambios
=======
    navigate("/cart"); // Navega a la ruta del carrito
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
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
<<<<<<< HEAD
<<<<<<< HEAD
              <Link className="nav-link active text-white" to="/">Home</Link>
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
                  "action", "biography", "comedy", "crime", "drama", "family", "fantasy",
                  "history", "horror", "music", "musical", "mystery", "romance", "sci-fi",
                  "short", "sport", "thriller", "western"
                ].map((genre) => (
                  <li key={genre}>
                    <Link className="dropdown-item" to={`/categories?category=${genre}`}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
=======
              <Link className="nav-link active text-white" to="/">
                Home
              </Link>
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
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
<<<<<<< HEAD
              placeholder="Search movie"
=======
              <Link className="nav-link active text-white" to="/">
                Home
              </Link>
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
>>>>>>> backup-local-cambios
=======
              placeholder="Search book"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
              value={query}
              onChange={handleInputChange}
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="bi bi-search"></i>
            </button>
<<<<<<< HEAD
<<<<<<< HEAD

            {query && !triggerSearch && !loading && movies.length > 0 && dropdownVisible && (
              <div ref={dropdownRef} className="search-dropdown">
                {movies.slice(0, 10).map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="movie-result-item"
                    onClick={() => navigate(`/descripcion/${movie.imdbID}`)}
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="movie-poster me-3"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{movie.Title}</h6>
                      <div className="mb-2">
                        {movie.Genre?.split(",").slice(0, 2).map((genre, index) => (
                          <span key={index} className="badge bg-secondary me-1">
                            {genre.trim()}
                          </span>
                        ))}
                      </div>
                      <div>
                        <button className="btn btn-sm btn-primary me-2">Rent</button>
                        <button className="btn btn-sm btn-success">Buy</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
=======
>>>>>>> backup-local-cambios
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
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
<<<<<<< HEAD
<<<<<<< HEAD
                    {currentUser?.username || "My Account"}
=======
                    {currentUser?.username ||
                      currentUser?.email ||
                      "My Account"}{" "}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
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
<<<<<<< HEAD
=======
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
                {/* Botón del Carrito */}
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

export default Navbar;
>>>>>>> backup-local-cambios
=======

export default Navbar;
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
