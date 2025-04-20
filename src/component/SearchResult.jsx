import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchMovies } from "../hook/useFetchMovies";

const SearchResults = () => {
  const { query } = useParams(); // Obtenemos el término de búsqueda desde la URL
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  
  // Usamos el hook para buscar las películas basadas en la query
  const { movies, loading } = useFetchMovies(query, 10);

  useEffect(() => {
    if (!loading && movies.length > 0) {
      setSearchResults(movies); // Guardamos los resultados de la búsqueda
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
          <div key={movie.imdbID} className="card mb-3" style={{ maxWidth: "100%" }}>
            <div className="row g-0">
              {/* Imagen de la cartelera a la izquierda */}
              <div className="col-md-4">
                <img
                  src={movie.Poster}
                  className="img-fluid rounded-start"
                  alt={movie.Title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>

              <div className="col-md-8">
                <div className="card-body">
                  {/* Título de la película */}
                  <h5 className="card-title">{movie.Title}</h5>

                  {/* Sinopsis de la película */}
                  <p className="card-text">{movie.Plot}</p>

                  {/* Géneros */}
                  <div className="d-flex flex-wrap">
                    {movie.Genre.split(', ').map((genre, index) => (
                      <span key={index} className="badge bg-info me-2">
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Botones de comprar y alquilar */}
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary me-2" onClick={() => navigate(`/buy/${movie.imdbID}`)}>Comprar</button>
                    <button className="btn btn-secondary" onClick={() => navigate(`/rent/${movie.imdbID}`)}>Alquilar</button>
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
