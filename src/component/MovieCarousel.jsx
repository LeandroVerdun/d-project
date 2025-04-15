import React, { useEffect, useState } from 'react';
import { useFetchMovies } from '../hook/useFetchMovies';
import '../css/MainPage.css';

export const MovieCarousel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const terms = ['a', 'the', 'star', 'man', 'love', 'action', 'life', 'adventure', 'space', 'hero'];

  useEffect(() => {
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    setSearchTerm(randomTerm);
  }, []);

  const { movies, loading } = useFetchMovies(searchTerm, 5);

  if (loading) return <div>Loading...</div>;

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide w-100 h-100 p-5"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-inner h-100">
        {movies.map((movie, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={movie.imdbID}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
              <div className="card bg-dark text-white position-relative" style={{ width: '50vw', height: 'auto' }}>
                <div className="row g-0" style={{ height: '100%' }}>
                  <div className="col-md-5">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                      className="img-fluid h-100 w-100 rounded-start"
                      alt={movie.Title}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className="col-md-7 d-flex flex-column justify-content-between p-3 position-relative">
                    <div className="text-center">
                      <h5 className="card-title" style={{ marginBottom: '1rem' }}>{movie.Title}</h5>
                      <p
                        className="card-text mx-auto"
                        style={{
                          maxHeight: '150px',
                          overflowY: 'auto',
                          maxWidth: '90%',
                          textAlign: 'center',
                        }}
                      >
                        {movie.Plot}
                      </p>
                    </div>

                    <div
                      className="d-flex flex-wrap justify-content-center gap-2 mt-3 mb-5"
                      style={{ padding: '10px' }}
                    >
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Genre:</span>
                      {movie.Genre.split(',').map((genre, idx) => (
                        <div
                          key={idx}
                          className="genre-box"
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#444',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.8rem', // <--- Tamaño reducido aquí
                          }}
                        >
                          {genre.trim()}
                        </div>
                      ))}
                    </div>

                    <div className="d-flex gap-2" style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                      <button className="btn btn-primary">Comprar</button>
                      <button className="btn btn-secondary">Alquilar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};
