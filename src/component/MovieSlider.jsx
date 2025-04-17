// components/MovieSlider.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap CSS

const MovieSlider = ({ category, movies }) => {
  console.log(`MovieSlider for ${category} received movies:`, movies);
  return (
    <div className="mb-4">
      <h2>{category}</h2>
      <div className="d-flex overflow-auto">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="card card-body me-3"
            style={{ minWidth: "150px" }}
          >
            <img
              src={
                movie.Poster === "N/A"
                  ? "https://via.placeholder.com/150"
                  : movie.Poster
              }
              alt={movie.Title}
              className="img-fluid mb-2"
            />
            <p className="card-text small">{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
