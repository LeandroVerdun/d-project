import React from 'react';
import { useFetchMovies } from '../hook/useFetchMovies';

const MovieCard2 = ({ onHover }) => {
  const { movies, loading } = useFetchMovies('avengers');

  if (loading || movies.length === 0) return null;

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const genres = randomMovie.Genre?.split(',').map(g => g.trim()) || [];

  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ width: '100%', height: '25vh', cursor: 'pointer' }}
      onMouseEnter={() => onHover(randomMovie)}
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
        <div className="col-8 d-flex flex-column justify-content-between p-2">
          <h5 className="card-title text-truncate">{randomMovie.Title}</h5>
          <div>
            {genres.map((genre, index) => (
              <span key={index} className="badge bg-secondary me-1">{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard2;
