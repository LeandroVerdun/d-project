import React from "react";
import ActionImg from "../assets/img/accion.jpg";
import ComedyImg from "../assets/img/Comedy.jpg";
import RomanceImg from "../assets/img/Romance.jpg";
import CategoryCard from "./CategoryCard";
import "../css/CategoriesGrid.css"; // Asegúrate de que este archivo solo tenga estilos para este componente

const CategoriesGrid = () => {
  return (
    <div className="categories-grid-container container card-escritorio" style={{ maxWidth: "80%" }}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <CategoryCard title="Action" image={ActionImg} link="/categories/action" />
        <CategoryCard title="Comedy" image={ComedyImg} link="/categories/comedy" />
        <CategoryCard title="Romance" image={RomanceImg} link="/categories/romance" />
      </div>
    </div>
  );
};

export default CategoriesGrid;
