// src/component/products/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import * as cartService from "../../services/cartService"; // Importa tu nuevo servicio de carrito (ajusta la ruta si es necesario)

const ProductCard = ({ product }) => {
  // Formatear el precio aquí para la vista de tarjeta
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price); // Usa product.price directamente

  // Función para manejar el clic en "Añadir al Carrito"
  const handleAddToCart = async () => {
    try {
      // Por defecto, añadimos 1 unidad. Puedes añadir un input para que el usuario elija la cantidad.
      await cartService.addOrUpdateItemInCart(product._id, 1);
      alert(`${product.name} ha sido añadido al carrito.`);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      // Muestra un mensaje de error más amigable al usuario
      alert(
<<<<<<< HEAD
        `No se pudo añadir ${product.name} al carrito. Motivo: Debes de estar logueado para realizar una compra.`
      );
    }
  };

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
          <h6 className="text-center text-warning mb-2">
            <strong>{formattedPrice}</strong>
          </h6>
          <div className="mt-auto text-center d-flex justify-content-center gap-2">
            {" "}
            <Link
              to={`/products/${product._id}`}
              className="btn btn-primary btn-sm"
            >
              Ver Detalles
            </Link>
            {/* Botón de añadir al carrito */}
            {product.stock > 0 ? ( // Solo muestra el botón si hay stock disponible
              <button
                className="btn btn-success btn-sm" // Color diferente para añadir al carrito
                onClick={handleAddToCart}
              >
                Añadir al Carrito
              </button>
            ) : (
              <button className="btn btn-secondary btn-sm" disabled>
                Sin Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
