import React, { useState } from "react";
import MovieSlider from "./MovieSlider";
import { useFetchMovies } from "../hook/useFetchMovies";
import "../css/MainPage.css";

const categoryGenres = ["Action", "Comedy", "Drama"];

const PrincipalCategorias = () => {
  const [selectedCategory, setSelectedCategory] = useState("Action");
  const { movies: actionMovies, loading: loadingAction } = useFetchMovies("Action", 10);
  const { movies: comedyMovies, loading: loadingComedy } = useFetchMovies("Comedy", 10);
  const { movies: dramaMovies, loading: loadingDrama } = useFetchMovies("Drama", 10);

  if (loadingAction || loadingComedy || loadingDrama) {
    return <div className="text-center my-5">Cargando categorías...</div>;
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Seleccionar las categorias
  let movies = [];
  if (selectedCategory === "Action") movies = actionMovies;
  if (selectedCategory === "Comedy") movies = comedyMovies;
  if (selectedCategory === "Drama") movies = dramaMovies;

  return (
    <div className="container my-4">
      {/* Menú desplegable */}
      <div className="d-md-none mb-4">
        <select
          className="form-select custom-select"
          aria-label="Selecciona una categoría"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categoryGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar MovieSlider solo en móviles y tabletas */}
      <div className="d-md-none mb-4">
        <MovieSlider category={selectedCategory} movies={movies} />
      </div>

      {/* Mostrar MovieSlider para todas las categorías en pantallas más grandes */}
      <div className="d-none d-md-block">
        <MovieSlider category="Action" movies={actionMovies} />
        <MovieSlider category="Comedy" movies={comedyMovies} />
        <MovieSlider category="Drama" movies={dramaMovies} />
      </div>
    </div>
  );
};

export default PrincipalCategorias;
