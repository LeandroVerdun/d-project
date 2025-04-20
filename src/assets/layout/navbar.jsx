import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFetchMovies } from "../../hook/useFetchMovies";
import "../../css/Navbar.css";

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const { movies, loading } = useFetchMovies(query, 10);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setTriggerSearch(false);
    setDropdownVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    } else {
      navigate("/404");
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // <-- Navega a CartPage
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
    <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 position-relative">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Logo</Link>

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
              <Link className="nav-link active" to="/">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu genre-scroll">
                {[
                  "action", "adventure", "animation", "biography", "comedy", "crime", "drama", "family",
                  "fantasy", "film-noir", "history", "horror", "music", "musical", "mystery", "romance",
                  "sci-fi", "short", "sport", "thriller", "war", "western"
                ].map((genre) => (
                  <li key={genre}>
                    <Link className="dropdown-item" to={`/categories?category=${genre}`}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Administrar</Link>
            </li>
          </ul>

          {/* Formulario de búsqueda con lupa */}
          <form className="d-flex align-items-center position-relative me-3" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search movie"
              value={query}
              onChange={handleInputChange}
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="bi bi-search"></i>
            </button>

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
                        <button className="btn btn-sm btn-primary me-2">Alquilar</button>
                        <button className="btn btn-sm btn-success">Comprar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* Botón de carrito */}
          <button className="btn btn-outline-dark" onClick={handleCartClick}>
            <i className="bi bi-cart"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
