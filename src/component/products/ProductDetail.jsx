// src/component/products/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as productService from "../../services/productService.js";
import * as cartService from "../../services/cartService.js"; // Importamos el servicio de carrito

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        console.log(
          "1. Datos recibidos del backend (dentro de fetchProduct):",
          data
        );
        setProduct(data);
        console.log(
          "2. Estado del producto después de setProduct (dentro de fetchProduct):",
          data
        );
      } catch (err) {
        console.error(`Error al cargar el producto ${id}:`, err);
        console.error(
          "Detalles del error:",
          err.response ? err.response.data : err.message
        );
        setError(
          err.response?.data?.message ||
            "No se pudo cargar el detalle del libro. Asegúrate de que el ID es correcto y el backend funciona."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Función para manejar el clic en "Añadir al Carrito"
  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) {
      alert("Este producto no está disponible o no tiene stock.");
      return;
    }
    try {
      await cartService.addOrUpdateItemInCart(product._id, 1);
      alert(`${product.name} ha sido añadido al carrito.`);
    } catch (error) {
      console.error("Error al añadir al carrito desde el detalle:", error);
      alert(
        `No se pudo añadir ${product.name} al carrito. Motivo: ${
          error.message || "Error desconocido"
        }`
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5" style={{ color: "black" }}>
        Cargando detalles del libro...
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-5" style={{ color: "black" }}>
        Libro no encontrado o datos no disponibles.
      </div>
    );
  }

  // Formatear el precio aquí para la vista de detalle
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  return (
    <div className="container mt-5 text-dark">
      <div className="row">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>
          <p className="lead">
            <strong>Autor:</strong> {product.author}
          </p>
          <p>
            <strong>Categoría:</strong> {product.category}
          </p>
          <p>
            <strong>Descripción:</strong> {product.description}
          </p>
          <p>
            <strong>Stock Disponible:</strong> {product.stock}
          </p>
          {/* ELIMINADO: Muestra el Rating (ya no visible al cliente) */}
          {/* <p>
            <strong>Rating:</strong> {product.rating} / 5
          </p> */}
          <h3 className="text-primary mt-3">
            <strong>Precio: {formattedPrice}</strong>
          </h3>
          {/* Aquí añadimos el botón "Añadir al Carrito" */}
          <div className="mt-4">
            {product.stock > 0 ? (
              <button
                className="btn btn-success btn-lg w-100" // Botón grande y ancho
                onClick={handleAddToCart}
              >
                Añadir al Carrito
              </button>
            ) : (
              <button className="btn btn-secondary btn-lg w-100" disabled>
                Sin Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
