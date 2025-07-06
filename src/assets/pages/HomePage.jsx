import React, { useState, useEffect } from "react";
// Asegúrate de que las rutas a los CSS y assets sean correctas
import "../../css/MainPage.css";
import FeaturedBooksSection from "../../component/FeaturedBooksSection";
import CategoryCarousel from "../../component/CategoryCarousel"; // <-- ¡IMPORTAMOS EL NUEVO COMPONENTE AQUÍ!
import LogoChisato from "../../assets/img/logo-main.png";

export const HomePage = () => {
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

      {/* Título para la sección de libros destacados */}
      <div className="row mt-5 mb-3">
        {" "}
        {/* Agregamos margen superior e inferior */}
        <div className="col-12 text-center">
          <h2 className="text-warning display-4 fw-bold">Destacados</h2>{" "}
          {/* Título "Destacados" */}
        </div>
      </div>

      {/* Sección de libros destacados */}
      <div className="row my-4">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <FeaturedBooksSection />
        </div>
      </div>

      {/* Separador */}
      <div className="row">
        <div className="col-12">
          <hr className="border-warning" style={{ borderTopWidth: "3px" }} />
        </div>
      </div>

      {/* TODO: Aquí irán las secciones de las 3 Mejores Categorías de Libros con Sliders.
          Necesitaremos un nuevo componente que gestione esto, por ejemplo, <BookCategoriesSliders />
          Este componente probablemente necesitará:
          1. Un endpoint para obtener las "mejores" categorías.
          2. Un endpoint para obtener libros por categoría (y con un límite para los sliders).
      */}
      <div className="row my-5">
        <div className="col-12">
          {/* Aquí insertamos el nuevo componente del carrusel de categorías */}
          <CategoryCarousel /> {/* <-- ¡NUEVO COMPONENTE AGREGADO AQUÍ! */}
        </div>
      </div>

      {/* Separador */}
      <div className="row">
        <div className="col-12">
          <hr className="border-warning" style={{ borderTopWidth: "3px" }} />
        </div>
      </div>

      {/* Puedes añadir más secciones aquí si lo deseas */}
    </div>
  );
};
