import React from 'react';
import { useFetchMovies } from '../hook/useFetchMovies';

const MovieCard = () => {
  const { movies, loading } = useFetchMovies('avengers');

  if (loading) {
    return <div className="text-center mt-5">Cargando película...</div>;
  }

  if (movies.length === 0) {
    return <div className="text-center mt-5">No se encontraron películas.</div>;
  }

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const genres = randomMovie.Genre?.split(',').map(g => g.trim()) || [];

  return (
    <div className="container mt-5">
      <div
        className="card mb-3 shadow-lg"
        style={{ width: '60vw', height: '40vh' }}
      >
        <div className="row g-0 h-100">
          <div className="col-4 h-100">
            <img
              src={randomMovie.Poster !== 'N/A' ? randomMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              className="img-fluid rounded-start h-100"
              style={{ objectFit: 'cover' }}
              alt={randomMovie.Title}
            />
          </div>
          <div className="col-8 d-flex flex-column justify-content-between p-3">
            <div>
              <h5 className="card-title mb-2 text-truncate">{randomMovie.Title}</h5>
              <div
                className="card-text small mb-2"
                style={{
                  maxHeight: '16vh',
                  overflowY: 'auto',
                }}
              >
                {randomMovie.Plot}
              </div>
              <div className="mb-2">
                {genres.map((genre, index) => (
                  <span key={index} className="badge bg-secondary me-1">{genre}</span>
                ))}
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-sm btn-outline-primary me-2">Alquilar</button>
              <button className="btn btn-sm btn-primary">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
