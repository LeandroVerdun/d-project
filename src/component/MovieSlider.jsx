// components/MovieSlider.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // 🔄 para navegación
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MovieSlider.css";

const MovieSlider = ({ category, movies }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/descripcion/${id}`);
  };

  return (
    <div className="mb-4 px-3">
      <h2 className="mb-3">{category}</h2>
      <div className="d-flex overflow-auto">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="card movie-card me-3 text-white"
            style={{
              minWidth: "160px",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => handleCardClick(movie.imdbID)} // 🔄 Redirigir al hacer click
          >
            <img
              src={
                movie.Poster === "N/A"
                  ? "https://via.placeholder.com/150"
                  : movie.Poster
              }
              alt={movie.Title}
              className="img-fluid mb-2 rounded"
            />
            <p className="card-text small mb-2 text-truncate">{movie.Title}</p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => e.stopPropagation()} // Para que no redirija al hacer click en botón
              >
                Comprar
              </button>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={(e) => e.stopPropagation()}
              >
                Alquilar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
