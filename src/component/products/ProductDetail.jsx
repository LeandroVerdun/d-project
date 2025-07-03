// src/component/products/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as productService from "../../services/productService.js";

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
  }).format(product.price); // Usa product.price directamente

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
          {/* Muestra el Rating */}
          <p>
            <strong>Rating:</strong> {product.rating} / 5
          </p>
          {/* MUESTRA EL PRECIO AQUI EN LA VISTA DE DETALLE */}
          <h3 className="text-primary mt-3">
            <strong>Precio: {formattedPrice}</strong>
          </h3>
          {/* Aquí podrías añadir botones para "Agregar al Carrito", "Comprar", etc. */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
