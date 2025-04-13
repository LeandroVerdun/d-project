import React, { useState } from 'react';
import MovieCard2 from './MovieCard2';
import MovieDetailCard from './MovieDetailCard';
import '../css/MainPage.css';

const MovieListWithHover = () => {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const handleHover = (movie) => {
    setHoveredMovie(movie);
  };

  return (
    <div className="d-flex justify-content-between mt-5 px-4" style={{ height: '80vh' }}>
      <div className="d-flex flex-column justify-content-between" style={{ width: '45vw' }}>
        {[...Array(4)].map((_, index) => (
          <MovieCard2 key={index} onHover={handleHover} />
        ))}
      </div>

      <div style={{ width: '50vw' }}>
        {hoveredMovie && <MovieDetailCard movie={hoveredMovie} />}
      </div>
    </div>
  );
};

export default MovieListWithHover;
