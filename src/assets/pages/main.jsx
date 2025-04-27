import React, { useState, useEffect } from "react";
import { MovieCarousel } from "../../component/MovieCarousel";
import { useFetchMovies } from "../../hook/useFetchMovies";
import PrincipalCategorias from "../../component/PrincipalCategorias";
import "../../css/MainPage.css";
import LogoChisato from "../../assets/img/logo-main.png";
import CategoriesGrid from "../../component/CategoriesGrid";
import { createAdminIfNeeded } from "../../component/admin/createAdmin";

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("a");
  const { movies, loading } = useFetchMovies(searchTerm, 10);

  useEffect(() => {
    createAdminIfNeeded();
  }, []);

  return (
    <div className="container text-white">
      {/* Logo centrado */}
      <div className="row">
        <div className="col-12 text-center py-4">
          <img
            src={LogoChisato}
            alt="Logo principal"
            className="img-fluid"
            style={{ maxWidth: "150px" }}
          />
        </div>
      </div>

      {/* Separador */}
      <div className="row">
        <div className="col-12">
          <hr className="border-warning" style={{ borderTopWidth: "3px" }} />
        </div>
      </div>

      {/* Carrusel */}
      <div className="row my-4">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <MovieCarousel />
        </div>
      </div>

      {/* Separador */}
      <div className="row">
        <div className="col-12">
          <hr className="border-warning" style={{ borderTopWidth: "3px" }} />
        </div>
      </div>

      {/* Categorías en grid, oculta en móviles */}
      <div className="row my-5">
        <div className="col-12  d-sm-block">
          <CategoriesGrid />
        </div>
      </div>

      {/* Separador */}
      <div className="row">
        <div className="col-12">
          <hr className="border-warning" style={{ borderTopWidth: "3px" }} />
        </div>
      </div>

      {/* Categorías principales */}
      <div className="row my-5">
        <div className="col-12">
          <PrincipalCategorias />
        </div>
      </div>
    </div>
  );
};
