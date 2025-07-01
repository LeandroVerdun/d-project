// src/component/products/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Necesitamos Link para navegar al detalle
// Si tienes un archivo CSS para las tarjetas de películas (ej. MovieCard.module.css), puedes adaptarlo.
// import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-center text-truncate">
            {product.name}
          </h5>
          <p className="card-text text-center text-muted">
            por {product.author}
          </p>
          <div className="mt-auto text-center">
            {" "}
            {/* Empuja el botón hacia abajo */}
            <Link
              to={`/products/${product._id}`}
              className="btn btn-primary btn-sm"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
