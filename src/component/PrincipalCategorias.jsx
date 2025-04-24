// components/PrincipalCategorias.jsx
import React from "react";
import MovieSlider from "./MovieSlider";
import { useFetchMovies } from "../hook/useFetchMovies";
import "../css/MainPage.css";

const categoryGenres = {
  Action: "Action",
  Comedy: "Comedy",
  Drama: "Drama"
};

const categorySearchTerms = {
  Action: "war",
  Comedy: "funny",
  Drama: "family"
};

const PrincipalCategorias = () => {
  return (
    <div>
      {Object.entries(categoryGenres).map(([category, genre]) => {
        const { movies, loading } = useFetchMovies(categorySearchTerms[category], 10);

        // Filtramos solo las películas que realmente coincidan con el género
        const filteredMovies = movies.filter((movie) =>
          movie.Genre?.includes(genre)
        ).slice(0, 5); // Nos quedamos con 5

        if (loading) return <div key={category}>Cargando {category}...</div>;

        return (
          <MovieSlider
            key={category}
            category={category}
            movies={filteredMovies}
          />
        );
      })}
    </div>
  );
};

export default PrincipalCategorias;
