import React from 'react';

const MovieDetailCard = ({ movie }) => {
  const genres = movie.Genre?.split(',').map(g => g.trim()) || [];

  return (
    <div className="card shadow-lg" style={{ height: '100%', width: '100%' }}>
      <div className="row g-0 h-100">
        <div className="col-5">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
            className="img-fluid rounded-start h-100"
            style={{ objectFit: 'cover' }}
            alt={movie.Title}
          />
        </div>
        <div className="col-7 p-3 d-flex flex-column justify-content-between">
          <div>
            <h4>{movie.Title}</h4>
            <p style={{ maxHeight: '40vh', overflowY: 'auto' }}>{movie.Plot}</p>
            <div>
              {genres.map((genre, index) => (
                <span key={index} className="badge bg-secondary me-1">{genre}</span>
              ))}
            </div>
          </div>
          <div className="text-end">
            <button className="btn btn-outline-primary me-2">Alquilar</button>
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailCard;
