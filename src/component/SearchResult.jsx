import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchMovies } from "../hook/useFetchMovies";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const { movies, loading } = useFetchMovies(query, 10);

  useEffect(() => {
    if (!loading && movies.length > 0) {
      setSearchResults(movies);
    }
  }, [movies, loading]);

  return (
    <div className="container my-5">
      {loading ? (
        <p>Cargando...</p>
      ) : searchResults.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        searchResults.map((movie) => (
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
        ))
      )}
    </div>
  );
};

export default SearchResults;
