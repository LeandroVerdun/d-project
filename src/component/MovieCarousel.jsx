import React, { useEffect, useState } from "react";
import { useFetchMovies } from "../hook/useFetchMovies";
import { useNavigate } from "react-router-dom";
import "../css/MainPage.css";

export const MovieCarousel = () => {
  const [searchTerm, setSearchTerm] = useState("popular");
  const { movies, loading } = useFetchMovies(searchTerm, 5);
  const navigate = useNavigate();

  if (loading) return <div className="text-center">Cargando carrusel...</div>;
  if (!movies || movies.length === 0)
    return <div className="text-center">No se encontraron películas para el carrusel.</div>;

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide w-80"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      style={{ maxWidth: "1200px", margin: "0 auto", height: "auto" }}
    >
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={movie.imdbID}
            onClick={() => navigate(`/descripcion/${movie.imdbID}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card bg-dark text-white mx-auto" style={{ borderRadius: "15px", overflow: "hidden" }}>
              <div className="row g-0 align-items-center">
                <div className="col-12 col-md-5 text-center">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
                    className="img-fluid p-3"
                    alt={movie.Title}
                    style={{
                      objectFit: "contain",
                      maxHeight: "400px",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="col-12 col-md-7 p-4 d-flex flex-column justify-content-center d-none d-md-block">
                  <h3 className="card-title mb-3" style={{ fontSize: "2rem" }}>
                    {movie.Title}
                  </h3>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "1rem",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    {movie.Plot}
                  </p>
                  <div className="mt-3">
                    {movie.Genre.split(",").map((genre, idx) => (
                      <span key={idx} className="badge bg-primary me-2">
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de control */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};
