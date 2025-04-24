import React, { useEffect, useState } from "react";
import { useFetchMovies } from "../hook/useFetchMovies";
import { useNavigate } from "react-router-dom";
import "../css/MainPage.css";

export const MovieCarousel = () => {
  const [searchTerm, setSearchTerm] = useState("popular");
  const { movies, loading } = useFetchMovies(searchTerm, 5);
  const navigate = useNavigate();

  if (loading) return <div>Cargando carrusel...</div>;
  if (!movies || movies.length === 0)
    return <div>No se encontraron películas para el carrusel.</div>;

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide w-75 mx-auto"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      style={{ marginBottom: "2rem", height: "400px" }}
    >
      <div
        className="carousel-inner h-100 d-flex"
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          overflowX: "hidden", // ← scroll horizontal desactivado
        }}
      >
        {movies.map((movie, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""} h-100`}
            key={movie.imdbID}
            style={{
              minWidth: "250px",
              marginRight: "1rem",
              flex: "0 0 auto",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/descripcion/${movie.imdbID}`)}
          >
            <div
              className="card bg-dark text-white h-100 overflow-hidden"
              style={{
                borderRadius: "10px",
                display: "flex",
                flexDirection: "row",
                overflow: "visible",
                height: "100%",
              }}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                className="card-img h-100"
                alt={movie.Title}
                style={{
                  objectFit: "contain",
                  width: "auto",
                  maxHeight: "100%",
                }}
              />
              <div
                className="d-flex flex-column justify-content-between p-3"
                style={{ flex: 1, textAlign: "left" }}
              >
                <h3 className="card-title" style={{ fontSize: "2rem" }}>
                  {movie.Title}
                </h3>
                <p
                  className="card-text"
                  style={{
                    fontSize: "1rem",
                    marginBottom: "10px",
                    maxHeight: "100px",
                    overflowY: "auto",
                  }}
                >
                  {movie.Plot}
                </p>
                <div className="movie-genres" style={{ marginTop: "10px" }}>
                  {movie.Genre.split(",").map((genre, idx) => (
                    <span
                      key={idx}
                      className="badge bg-primary"
                      style={{ marginRight: "5px" }}
                    >
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
