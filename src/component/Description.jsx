import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchMovies } from "../hook/useFetchMovies";

const Descripcion = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { movies, loading } = useFetchMovies(id, 1);
  const navigate = useNavigate();

  useEffect(() => {
    if (movies.length > 0) {
      setMovie(movies[0]);
    }
  }, [movies]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>No movie found!</div>;

  const handleAddToCart = (isRental) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser) {
      alert("Please log in to make a purchase or rent.");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const movieWithPrice = {
      ...movie,
      price: isRental ? 0.5 : 1.5,
      quantity: 1,
      isRental,
    };

    cart.push(movieWithPrice);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${movie.Title} has been ${isRental ? "rented" : "purchased"} successfully!`);
  };

  return (
    <div className="container mt-5 text-white">
      <div className="row">
        {/* Left column with image */}
        <div className="col-md-4 mb-4">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded border" />
        </div>

        {/* Right column with info */}
        <div className="col-md-8 d-flex flex-column justify-content-between">
          <div>
            <h2 className="mb-3">{movie.Title}</h2>
            <p className="text-muted">{movie.Year}</p>

            <p style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {movie.Plot || "No synopsis available."}
            </p>

            <div className="d-flex flex-wrap gap-2 mb-3">
              {movie.Genre?.split(",").map((genre, index) => (
                <span key={index} className="badge bg-secondary">
                  {genre.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3">
              <p className="mb-1"><strong>Rent:</strong> $0.50</p>
              <p className="mb-2"><strong>Buy:</strong> $1.50</p>
            </div>

            {/* Botones con más padding inferior */}
            <div className="d-flex gap-3 flex-column">
              <button
                className="btn btn-outline-primary mb-3 px-3 py-3"
                onClick={() => handleAddToCart(true)}
              >
                Rent
              </button>
              <button
                className="btn btn-success px-3 py-3"
                onClick={() => handleAddToCart(false)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Descripcion;
