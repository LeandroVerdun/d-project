import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useFetchMovies } from '../../hook/useFetchMovies';

export const Navbar = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const { movies, loading } = useFetchMovies(search, 10); // Mostramos más resultados

  // 🔁 Actualizamos el término de búsqueda con un retraso de 500ms cada vez que el usuario escribe
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        setSearch(query.trim());  // Solo actualiza la búsqueda si hay algo que buscar
      } else {
        setSearch('');  // Si no hay texto, se limpia la búsqueda
      }
    }, 500);

    // Limpiamos el timeout si el componente se actualiza antes de que transcurran los 500ms
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
                <a className="nav-link active" aria-current="page" href="#">Categoria</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Popular</a>
              </li>
            </ul>

            {/* 🔍 Barra de búsqueda reactiva */}
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
                  onChange={(e) => setQuery(e.target.value)}  // Cada vez que cambia el valor, se actualiza 'query'
                />
              </div>

              {/* 📽 Resultados en vivo con overflow */}
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
                <a className="nav-link active" href="#">Registrar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">Login</a>
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
