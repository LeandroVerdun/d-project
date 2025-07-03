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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    setCurrentUser(user);
  }, [location]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setTriggerSearch(false);
    // Ya que no tendremos un dropdown de sugerencias en tiempo real,
    // puedes decidir si aún quieres controlar la visibilidad del dropdown aquí,
    // pero si el bloque JSX del dropdown se elimina, esta línea no tendrá efecto.
    setDropdownVisible(false); // O simplemente puedes eliminar esta línea si no hay dropdown
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Ajusta la ruta si la búsqueda es para libros, por ejemplo: '/search/books/${encodeURIComponent(query)}'
      navigate(`/search/books/${encodeURIComponent(query)}`); // Ruta ajustada para libros
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
    // Si no hay dropdown de búsqueda, esta parte del useEffect ya no es estrictamente necesaria.
    // Sin embargo, si 'dropdownVisible' se usa para otra cosa, podrías mantenerla.
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
    // Similar al useEffect anterior, si el dropdown se elimina, esta línea puede no ser necesaria.
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
                  "fiction", // Ejemplos de categorías de libros
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
                ].map(
                  (
                    category // Cambiado de genre a category
                  ) => (
                    <li key={category}>
                      <Link
                        className="dropdown-item"
                        to={`/categories?category=${category}`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Link>
                    </li>
                  )
                )}
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
              placeholder="Search book" // Cambiado de "Search movie"
              value={query}
              onChange={handleInputChange}
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="bi bi-search"></i>
            </button>
            {/* EL BLOQUE DE SUGERENCIAS DE BÚSQUEDA HA SIDO ELIMINADO AQUÍ */}
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
