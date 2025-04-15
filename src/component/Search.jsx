export const MovieList = ({ movies }) => {
    return (
      <div className="container mt-4">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.imdbID}>
              <div className="card h-100">
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Plot.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  