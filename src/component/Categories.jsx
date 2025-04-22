import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFetchMovies } from "../hook/useFetchMovies";

function Categories() {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  // Usamos el hook de fetching con categoría
  const { movies: fetchedMovies, loading } = useFetchMovies(category, 10); // Limitamos a 10 películas

  useEffect(() => {
    if (fetchedMovies.length > 0) {
      // Filtrar las películas basadas en el género elegido
      const filteredMovies = fetchedMovies.filter((movie) =>
        movie.Genre?.toLowerCase().split(",").map((g) => g.trim()).includes(category?.toLowerCase())
      );

      // Mezclar las películas de manera aleatoria
      const shuffledMovies = filteredMovies.sort(() => 0.5 - Math.random());
      setMovies(shuffledMovies); // Guardar las películas filtradas y mezcladas
    }
  }, [fetchedMovies, category]); // Se vuelve a ejecutar cuando cambiamos el `category` o `fetchedMovies`

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container my-5">
      {/* Título de la categoría */}
      <h2 className="text-center mb-4">{category ? `Películas de ${category}` : "Películas por categoría"}</h2>

      {movies.length === 0 ? (
        <p>No se encontraron películas en esta categoría.</p>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="card mb-3 text-white"
              style={{
                maxWidth: "100%",
                cursor: "pointer",
                backgroundColor: "#1c1c1c",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => navigate(`/descripcion/${movie.imdbID}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#001f3f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1c1c1c";
              }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={movie.Poster === "N/A" ? "https://via.placeholder.com/150" : movie.Poster}
                    className="img-fluid rounded-start"
                    alt={movie.Title}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-text">{movie.Plot}</p>

                    <div className="d-flex flex-wrap mb-3">
                      {movie.Genre.split(", ").map((genre, index) => (
                        <span key={index} className="badge bg-info me-2 mb-1">
                          {genre}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/buy/${movie.imdbID}`);
                        }}
                      >
                        Comprar
                      </button>
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/rent/${movie.imdbID}`);
                        }}
                      >
                        Alquilar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
