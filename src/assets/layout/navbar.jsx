import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFetchMovies } from "../../hook/useFetchMovies"; // Considera si sigues usando 'movies' para libros
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

  const { movies, loading } = useFetchMovies(query, 10);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    setCurrentUser(user);
  }, [location]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setTriggerSearch(false);
    setDropdownVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Ajusta la ruta si la búsqueda es para libros, por ejemplo: '/search/books/${encodeURIComponent(query)}'
      navigate(`/search/${encodeURIComponent(query)}`);
    } else {
      navigate("/404"); // O a una página de resultados vacía
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token JWT
    localStorage.removeItem("user"); // Eliminar el objeto de usuario
    setIsLoggedIn(false); // Actualizar estado de login
    setCurrentUser(null); // Limpiar usuario actual
    navigate("/login"); // Redirigir a la página de login
  };

  useEffect(() => {
    // Detecta clics fuera del dropdown de búsqueda para cerrarlo
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    // Cierra el dropdown de búsqueda al cambiar de ruta
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
                  "action",
                  "biography",
                  "comedy",
                  "crime",
                  "drama",
                  "family",
                  "fantasy",
                  "history",
                  "horror",
                  "music",
                  "musical",
                  "mystery",
                  "romance",
                  "sci-fi",
                  "short",
                  "sport",
                  "thriller",
                  "western",
                ].map((genre) => (
                  <li key={genre}>
                    <Link
                      className="dropdown-item"
                      to={`/categories?category=${genre}`}
                    >
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
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
              placeholder="Search movie" // Considera cambiar a "Search book"
              value={query}
              onChange={handleInputChange}
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="bi bi-search"></i>
            </button>

            {query &&
              !triggerSearch &&
              !loading &&
              movies.length > 0 && // Si usas libros, cambiar a 'books.length > 0'
              dropdownVisible && (
                <div ref={dropdownRef} className="search-dropdown">
                  {movies.slice(0, 10).map(
                    (
                      movie // Si usas libros, cambiar a 'books.map'
                    ) => (
                      <div
                        key={movie.imdbID} // Si usas libros, cambiar a 'book.id' o un ID de libro
                        className="movie-result-item"
                        onClick={() => navigate(`/descripcion/${movie.imdbID}`)} // Si usas libros, cambiar a '/book/${book.id}'
                      >
                        <img
                          src={movie.Poster} // Si usas libros, cambiar a 'book.coverUrl' o similar
                          alt={movie.Title} // Si usas libros, cambiar a 'book.title'
                          className="movie-poster me-3"
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{movie.Title}</h6>{" "}
                          {/* Si usas libros, cambiar a 'book.title' */}
                          <div className="mb-2">
                            {movie.Genre?.split(",") // Si usas libros, cambiar a 'book.genre' o 'book.category'
                              .slice(0, 2)
                              .map((genre, index) => (
                                <span
                                  key={index}
                                  className="badge bg-secondary me-1"
                                >
                                  {genre.trim()}
                                </span>
                              ))}
                          </div>
                          <div>
                            <button className="btn btn-sm btn-primary me-2">
                              Rent
                            </button>
                            <button className="btn btn-sm btn-success">
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </form>

          <div className="d-flex align-items-center me-3">
            {!isLoggedIn ? (
              // Mostrar botones de Registro y Login si el usuario NO está logueado
              <>
                <Link to="/register" className="btn btn-outline-primary me-2">
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-success me-2">
                  Login
                </Link>
              </>
            ) : (
              // Mostrar menú de usuario y botón de carrito si el usuario SÍ está logueado
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
                    {/* Muestra username, sino email, sino "My Account" */}
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
                    {/* MODIFICADO: "Mis Compras" es para usuarios LOGUEADOS y NO administradores */}
                    {!currentUser?.isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/mypurchases">
                          Mis Compras
                        </Link>
                      </li>
                    )}
                    {/* Condicional para mostrar enlaces de administrador, basado en `isAdmin` del token */}
                    {currentUser?.isAdmin && (
                      <>
                        <li>
                          <hr className="dropdown-divider" />{" "}
                          {/* Separador visual */}
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/admin">
                            Panel Administrador
                          </Link>
                        </li>
                        {/* Si tienes una página separada para administrar usuarios: */}
                        {/* <li>
                          <Link className="dropdown-item" to="/useradmin">
                            Administrar Usuarios
                          </Link>
                        </li> */}
                      </>
                    )}
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
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
