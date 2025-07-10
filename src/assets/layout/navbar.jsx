// src/assets/layout/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import "../../css/Navbar.css";
import logoImg from "../../assets/img/home.png";

export const Navbar = () => {
  const [busqueda, setBusqueda] = useState("");
  const [dispararBusqueda, setDispararBusqueda] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    setEstaLogueado(!!usuario);
    setUsuarioActual(usuario);
  }, [location]);

  const manejarCambioInput = (e) => {
    setBusqueda(e.target.value);
    setDispararBusqueda(false);
    setDropdownVisible(false);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/search/books/${encodeURIComponent(busqueda)}`);
    } else {
      navigate("/404");
    }
  };

  const manejarClickCarrito = () => {
    navigate("/cart");
  };

  const manejarLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setEstaLogueado(false);
    setUsuarioActual(null);
    navigate("/login");
  };

  useEffect(() => {
    const manejarClickFuera = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", manejarClickFuera);
    return () => document.removeEventListener("click", manejarClickFuera);
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
          aria-label="Alternar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">
                Inicio
              </Link>
            </li>
          </ul>

          <form
            className="d-flex align-items-center position-relative me-3"
            role="search"
            onSubmit={manejarSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar libro"
              value={busqueda}
              onChange={manejarCambioInput}
              aria-label="Buscar"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center me-3">
            {!estaLogueado ? (
              <>
                <Link to="/register" className="btn btn-outline-primary me-2">
                  Registrarse
                </Link>
                <Link to="/login" className="btn btn-outline-success me-2">
                  Iniciar Sesión
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
                    {usuarioActual?.username ||
                      usuarioActual?.email ||
                      "Mi Cuenta"}{" "}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-user"
                    aria-labelledby="dropdownAccount"
                  >
                    {!usuarioActual?.isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Perfil
                        </Link>
                      </li>
                    )}
                    {!usuarioActual?.isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/mypurchases">
                          Mis Compras
                        </Link>
                      </li>
                    )}
                    {usuarioActual?.isAdmin && (
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
                      <button className="dropdown-item" onClick={manejarLogout}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-outline-warning"
                  onClick={manejarClickCarrito}
                  title="Carrito"
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
