import React, { useState } from "react";
// import { MovieCarousel } from "../../component/MovieCarousel";
// import { MovieCardWithSubcards } from "../../component/MovieCardWithSubcards";
// import MovieCard from "../../component/SaleCard";
import VerticalTableRow from "../../component/MovieList";
import { useFetchMovies } from "../../hook/useFetchMovies";
import PrincipalCategorias from "../../component/PrincipalCategorias";
import "../../css/MainPage.css";

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("a");
  const { movies, loading } = useFetchMovies(searchTerm, 10);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center"
        // style={{
        //   minHeight: "100vh",
        //   width: "100vw",
        //   overflowY: "auto",
        // }}
      >
        {/* <MovieCarousel /> */}
        <h1>Bienvenido a la página principal</h1>
        <PrincipalCategorias />
        {/* <MovieCardWithSubcards /> */}
        {/* <MovieCard /> */}
        {/* {loading ? (
          <p className="mt-4">Cargando películas...</p>
        ) : (
          <VerticalTableRow movies={movies} />
        )} */}
      </div>
    </>
  );
};
