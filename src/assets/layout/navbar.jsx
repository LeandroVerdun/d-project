import React from 'react';

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Logo</a>
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
                <a className="nav-link active" aria-current="page" href="#">Categoria</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Popular</a>
              </li>
              <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Registrar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Login</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cuenta
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Favorito</a></li>
                  <li><a className="dropdown-item" href="#">Carrito</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Opciones</a></li>
                  <li><a className="dropdown-item" href="#">Desconectar</a></li>
                </ul>
              </li>             
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
};
