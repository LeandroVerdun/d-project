import React from 'react';
import { useFetchMovies } from '../hook/useFetchMovies'; // Asegúrate de tener la ruta correcta

// Componente para cargar una película aleatoria en cada sub-tarjeta
const MovieSubcard = ({ term }) => {
  const { movies, loading } = useFetchMovies(term, 1); // Usamos el hook para obtener 1 película por término

  return (
    <div className="col-md-3 mb-3">
      <div className="card bg-dark text-white">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <>
                <img
                  src={movies[0].Poster !== 'N/A' ? movies[0].Poster : 'https://via.placeholder.com/300x450'}
                  className="card-img-top"
                  alt={movies[0].Title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movies[0].Title}</h5>
                  <p className="card-text" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                    {movies[0].Plot}
                  </p>
                  <p className="card-text">
                    <strong>Género: </strong>{movies[0].Genre}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-light">No se encontraron películas</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const MovieCardWithSubcards = () => {
  const terms = ['a', 'the', 'star', 'man', 'love', 'action', 'life', 'adventure', 'space', 'hero'];
  const randomTerms = Array.from({ length: 4 }, () => terms[Math.floor(Math.random() * terms.length)]);

  return (
    <div className="card p-3" style={{ width: '80%', margin: 'auto', backgroundColor: '#333' }}>
      <h3 className="text-white text-center mb-4">Películas Aleatorias</h3>
      <div className="row">
        {randomTerms.map((term, index) => (
          <MovieSubcard key={index} term={term} />
        ))}
      </div>
    </div>
  );
};
