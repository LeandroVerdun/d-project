import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useFetchMovies } from '../../hook/useFetchMovies';
import { Link } from 'react-router-dom'; // Importa Link
export const Navbar = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const { movies, loading } = useFetchMovies(search, 10); 

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        setSearch(query.trim());  
      } else {
        setSearch('');  
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100 position-relative">
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
                <Link className="nav-link active" to="/categoria">Categoria</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/popular">Popular</Link> 
              </li>
            </ul>

            {/* Barra de búsqueda */}
            <div className="d-flex position-relative" role="search">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  className="form-control border-start-0"
                  type="search"
                  placeholder="Buscar película..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)} 
                />
              </div>

              {/*  Resultados */}
              {query && !loading && movies.length > 0 && (
                <div
                  className="position-absolute top-100 start-0 bg-white border rounded shadow p-3 mt-2"
                  style={{ width: '300px', zIndex: 999, maxHeight: '300px', overflowY: 'auto' }}
                >
                  {movies.filter(movie => movie.Title.toLowerCase().includes(query.toLowerCase())).map((movie) => (
                    <div key={movie.imdbID} className="d-flex mb-2">
                      <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/60x90'}
                        alt={movie.Title}
                        className="me-2"
                        style={{ width: '60px', height: '90px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="mb-1">{movie.Title}</h6>
                        <small className="text-muted">{movie.Year}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Indicador de carga */}
              {query && loading && (
                <div
                  className="position-absolute top-100 start-0 bg-white border rounded shadow p-3 mt-2"
                  style={{ width: '300px', zIndex: 999 }}
                >
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-muted" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ul className="navbar-nav ms-3 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/Register">Registrar</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Login">Login</Link> 
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cuenta
                </a>
                <ul className="dropdown-menu">
                 {/* <li><Link className="dropdown-item" to="/favorito">Favorito</Link></li> */}
                 <Link className="dropdown-item" to="/cart">Carrito</Link>
                 {/* <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/opciones">Opciones</Link></li> {/* Usamos Link en vez de a */}
                  {/*<li><Link className="dropdown-item" to="/desconectar">Desconectar</Link></li> {/* Usamos Link en vez de a */}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
