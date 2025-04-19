import React, { useState } from "react";
import { MovieCarousel } from "../../component/MovieCarousel";
import { useFetchMovies } from "../../hook/useFetchMovies";
import PrincipalCategorias from "../../component/PrincipalCategorias";
import "../../css/MainPage.css";

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("a");
  const { movies, loading } = useFetchMovies(searchTerm, 10);

  return (
    <>
      <div>
        <h1>Bienvenido a la página principal</h1>
        <MovieCarousel />
        <PrincipalCategorias />
      </div>
    </>
  );
};
