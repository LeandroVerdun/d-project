import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MovieSlider.css";

const VISIBLE_COUNT = 5;

const MovieSlider = ({ category, movies }) => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Comprueba si hay un usuario en localStorage al montar el componente
    const storedUser = localStorage.getItem("user");
    setIsUserLoggedIn(!!storedUser); // !! convierte un valor truthy/falsy a booleano
  }, []);

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

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < movies.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleMovies = movies.slice(startIndex, startIndex + VISIBLE_COUNT);

  const goToCategoryPage = () => {
    navigate(`/categories?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="mb-4 px-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2 className="mb-0 text-start">{category}</h2>
        <button
          className="btn btn-link text-decoration-none text-warning d-flex align-items-center"
          onClick={goToCategoryPage}
        >
          <span className="me-1">See more</span>
          <i className="bi bi-arrow-right-circle fs-5"></i>
        </button>
      </div>

      <hr style={{ borderTop: "3px solid #FFD700", width: "100%" }} />
      <br />

      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary btn-sm me-2"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          Anterior
        </button>
        <div
          className="d-flex overflow-hidden"
          style={{ maxWidth: `calc(160px * ${VISIBLE_COUNT})` }}
        >
          {visibleMovies.map((movie) => (
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
              {/* Título eliminado */}

              <div className="overlay-description p-2">
                <h6 className="overlay-title text-center fw-bold mb-2">
                  {movie.Title}
                </h6>
                <p className="synopsis-text mb-0">
                  {movie.Plot || "No description available."}
                </p>
              </div>

              {isUserLoggedIn && ( // Renderiza los botones solo si isUserLoggedIn es true
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
              )}
            </div>
          ))}
        </div>
        <button
          className="btn btn-outline-secondary btn-sm ms-2"
          onClick={handleNext}
          disabled={startIndex + VISIBLE_COUNT >= movies.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
