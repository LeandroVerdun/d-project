import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovies } from "../hook/useFetchMovies";

const Descripcion = () => {
  const { id } = useParams(); // Obtiene el ID de la película desde la URL
  const [movie, setMovie] = useState(null);
  const { movies, loading } = useFetchMovies(id, 1); // Usamos el id para traer una sola película

  useEffect(() => {
    if (movies.length > 0) {
      setMovie(movies[0]); // Cuando la película es obtenida, guardamos en el estado
    }
  }, [movies]);

  // Muestra una pantalla de carga mientras obtenemos los detalles
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si no hay película encontrada
  if (!movie) {
    return <div>No movie found!</div>;
  }

  return (
    <div className="descripcion-container container mt-5">
      <div className="row">
        {/* Cartelera a la izquierda */}
        <div className="col-md-4">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          {/* Título de la película arriba */}
          <h1>{movie.Title}</h1>
          
          {/* Sinopsis de la película */}
          <p>{movie.Plot}</p>
          
          {/* Detalles debajo de la sinopsis */}
          <div className="descripcion-details">
            <h2>Detalles</h2>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Género:</strong> {movie.Genre}</p>
            <p><strong>Año:</strong> {movie.Year}</p>
          </div>
          
          {/* Botones de acción */}
          <div className="descripcion-buttons mt-3">
            <button className="btn btn-primary me-2">Alquilar</button>
            <button className="btn btn-success">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Descripcion;
