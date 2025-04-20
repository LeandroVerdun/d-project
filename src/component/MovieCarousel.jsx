import React, { useEffect, useState } from "react";
import { useFetchMovies } from "../hook/useFetchMovies";
import { useNavigate } from "react-router-dom"; // para redirigir al hacer clic
import "../css/MainPage.css";

export const MovieCarousel = () => {
  const [searchTerm, setSearchTerm] = useState("popular");
  const { movies, loading } = useFetchMovies(searchTerm, 5);
  const navigate = useNavigate(); // hook de navegación

  if (loading) return <div>Cargando carrusel...</div>;
  if (!movies || movies.length === 0)
    return <div>No se encontraron películas para el carrusel.</div>;

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide w-100"
      data-bs-ride="carousel"
      data-bs-interval="5000"
      style={{ height: "400px", marginBottom: "2rem" }}
    >
      <div
        className="carousel-inner h-100 d-flex"
        style={{
          overflowX: "auto",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {movies.map((movie, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""} h-100`}
            key={movie.imdbID}
            style={{ minWidth: "300px", marginRight: "1rem", flex: "0 0 auto", cursor: "pointer" }}
            onClick={() => navigate(`/descripcion/${movie.imdbID}`)} // navegación al hacer clic
          >
            <div
              className="card bg-dark text-white h-100 overflow-hidden"
              style={{ borderRadius: "10px" }}
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
              <div className="card-img-overlay d-flex flex-column justify-content-end p-3">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text small">
                  {movie.Plot && movie.Plot.substring(0, 100)}...
                </p>
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
