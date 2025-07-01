// src/component/products/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Asegúrate que la ruta a productService sea correcta
import * as productService from "../../services/productService";

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID del producto de la URL (ej. /products/123)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        // MODIFICACIÓN AQUÍ: Loguea el error completo
        console.error(`Error al cargar el producto ${id}:`, err);
        console.error(
          "Detalles del error:",
          err.response ? err.response.data : err.message
        ); // Intenta acceder a más detalles del error de Axios
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
  }, [id]); // El efecto se vuelve a ejecutar si el ID de la URL cambia

  if (loading) {
    return (
      <div className="text-white text-center mt-5">
        Cargando detalles del libro...
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="text-white text-center mt-5">Libro no encontrado.</div>
    );
  }

  return (
    <div className="container mt-5 text-white">
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
          <p>
            <strong>Último Control de Stock:</strong>{" "}
            {new Date(product.lastStockControlDate).toLocaleDateString()}
          </p>
          {/* Aquí podrías añadir botones para "Agregar al Carrito", "Comprar", etc. */}
          {/* <button className="btn btn-primary me-2">Añadir al Carrito</button> */}
          {/* <button className="btn btn-success">Comprar Ahora</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
