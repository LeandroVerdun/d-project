// components/PrincipalCategorias.jsx
import React from "react";
import MovieSlider from "./MovieSlider";
import { useFetchMovies } from "../hook/useFetchMovies";
import "../css/MainPage.css";

const categoryGenres = {
  Action: "Action",
  Comedy: "Comedy",
  Drama: "Drama",
};

const categorySearchTerms = {
  Action: ["Action"],
  Comedy: ["Comedy"],
  Drama: ["Drama"],
};

const PrincipalCategorias = () => {
  return (
    <div>
      {Object.entries(categoryGenres).map(([category, genre]) => {
        const { movies, loading } = useFetchMovies(
          categorySearchTerms[category][0],
          10
        );

        if (loading) return <div key={category}>Cargando {category}...</div>;

        return (
          <MovieSlider key={category} category={category} movies={movies} />
        );
      })}
    </div>
  );
};

export default PrincipalCategorias;
