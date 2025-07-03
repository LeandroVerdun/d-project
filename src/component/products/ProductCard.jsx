// src/component/products/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Formatear el precio aquí para la vista de tarjeta
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price); // Usa product.price directamente

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
          {/* MUESTRA EL PRECIO AQUI EN LA TARJETA DEL PRODUCTO */}
          <h6 className="text-center text-warning mb-2">
            <strong>{formattedPrice}</strong>
          </h6>
          <div className="mt-auto text-center">
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
