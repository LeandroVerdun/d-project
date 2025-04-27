import React from "react";
import ActionImg from "../assets/img/accion.jpg";
import ComedyImg from "../assets/img/Comedy.jpg";
import RomanceImg from "../assets/img/Romance.jpg";
import CategoryCard from "./CategoryCard";
import "../css/CategoriesGrid.css"; // Asegúrate de que este archivo solo tenga estilos para este componente

const CategoriesGrid = () => {
  return (
    <div className="categories-grid-container container py-5">
      {/* Carrusel de Categorías para móviles */}
      <div
        id="categoriesCarousel"
        className="carousel slide d-md-none" // Mostrar solo en móviles
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex justify-content-center">
              <div className="carousel-card">
                <CategoryCard title="Action" image={ActionImg} link="/categories/action" />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center">
              <div className="carousel-card">
                <CategoryCard title="Comedy" image={ComedyImg} link="/categories/comedy" />
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-center">
              <div className="carousel-card">
                <CategoryCard title="Romance" image={RomanceImg} link="/categories/romance" />
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#categoriesCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#categoriesCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Grid de Categorías para pantallas más grandes */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 my-4 d-none d-md-flex">
        <CategoryCard title="Action" image={ActionImg} link="/categories/action" />
        <CategoryCard title="Comedy" image={ComedyImg} link="/categories/comedy" />
        <CategoryCard title="Romance" image={RomanceImg} link="/categories/romance" />
      </div>
    </div>
  );
};

export default CategoriesGrid;
