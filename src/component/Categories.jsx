import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFetchMovies } from "../hook/useFetchMovies";

function Categories() {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const navigate = useNavigate();

  // Usamos el hook de fetching con categoría
  const { movies: fetchedMovies, loading } = useFetchMovies(category, 10); // Limitamos a 10 películas

  useEffect(() => {
    if (fetchedMovies.length > 0) {
      // Filtrar las películas basadas en el género elegido
      const filteredMovies = fetchedMovies.filter((movie) =>
        movie.Genre?.toLowerCase().split(",").map((g) => g.trim()).includes(category?.toLowerCase())
      );

      // Mezclar las películas de manera aleatoria
      const shuffledMovies = filteredMovies.sort(() => 0.5 - Math.random());
      setMovies(shuffledMovies); // Guardar las películas filtradas y mezcladas
    }
  }, [fetchedMovies, category]); // Se vuelve a ejecutar cuando cambiamos el `category` o `fetchedMovies`

  if (loading) {
    return <div>Loading...</div>;
  }

  // Función para agregar película al carrito
  const handleAddToCart = (movie, isRental) => {
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
    <div className="container my-5">
      {/* Título de la categoría en inglés */}
      <h2 className="text-center mb-4 text-white">
        {category ? `Movies of ${category}` : "Movies by Category"}
      </h2>

      {/* Línea amarilla separadora */}
      <hr style={{ width: "80%", height: "4px", backgroundColor: "yellow", border: "none", margin: "0 auto 20px" }} />

      {movies.length === 0 ? (
        <p>No movies found in this category.</p>
      ) : (
        <div className="row d-flex justify-content-center">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="card mb-3 text-white"
              style={{
                maxWidth: "85%",
                cursor: "pointer",
                backgroundColor: "#1c1c1c",
                transition: "background-color 0.3s ease",
                position: "relative", // Para posicionar los botones en la esquina inferior
              }}
              onClick={() => navigate(`/descripcion/${movie.imdbID}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#001f3f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1c1c1c";
              }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={movie.Poster === "N/A" ? "https://via.placeholder.com/150" : movie.Poster}
                    className="img-fluid rounded-start"
                    alt={movie.Title}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    {/* Mostrar solo el título en pantallas más pequeñas */}
                    <h5 className="card-title">{movie.Title}</h5>

                    {/* Descripción oculta en pantallas más pequeñas */}
                    <p className="card-text d-none d-md-block">{movie.Plot}</p>

                    <div className="d-flex flex-wrap mb-3">
                      {movie.Genre.split(", ").map((genre, index) => (
                        <span key={index} className="badge bg-info me-2 mb-1">
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Botones en la esquina inferior derecha */}
                    <div
                      className="d-flex justify-content-end"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      <button
                        className="btn btn-outline-primary btn-sm btn-mobile me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(movie, true); // Alquiler
                        }}
                      >
                        Rent
                      </button>
                      <button
                        className="btn btn-success btn-sm btn-mobile"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(movie, false); // Compra
                        }}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
