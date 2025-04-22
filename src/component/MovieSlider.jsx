import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MovieSlider.css";

const MovieSlider = ({ category, movies }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/descripcion/${id}`);
  };

  const addToCart = (movie, isRental) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item.imdbID === movie.imdbID && item.isRental === isRental
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      const itemToAdd = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        size: "Default",
        quantity: 1,
        isRental: isRental,
      };
      cart.push(itemToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="mb-4 px-3">
      <h2 className="mb-3">{category}</h2>
      <div className="d-flex overflow-auto">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="card movie-card me-3 text-white position-relative"
            style={{ minWidth: "160px", cursor: "pointer" }}
            onClick={() => handleCardClick(movie.imdbID)}
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

            {/* Overlay con título y sinopsis */}
            <div className="overlay-description p-2">
              <h6 className="overlay-title text-center fw-bold mb-2">
                {movie.Title}
              </h6>
              <p className="synopsis-text mb-0">
                {movie.Plot || "No description available."}
              </p>
            </div>

            <div className="d-flex justify-content-between z-2 position-relative mb-2 px-1">
              <button
                className="btn btn-primary btn-sm flex-grow-1 me-1"
                style={{ minWidth: "70px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(movie, false);
                }}
              >
                Buy
              </button>
              <button
                className="btn btn-outline-light btn-sm flex-grow-1 ms-1"
                style={{ minWidth: "70px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(movie, true);
                }}
              >
                Rent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
