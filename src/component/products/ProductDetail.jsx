// src/component/products/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Asegúrate que la ruta a productService sea correcta
import * as productService from "../../services/productService.js";

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
        {" "}
        {/* Color temporal para que se vea */}
        Cargando detalles del libro...
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  // **IMPORTANTE**: Este bloque if (!product) lo quitamos temporalmente para confirmar que se ve.
  // Es una buena práctica tenerlo, pero si los datos siempre llegan, podemos dejar que el componente se renderice.
  // Si en algún caso un ID no devuelve nada, entonces podríamos volver a añadirlo o manejarlo de otra forma.
  // Por ahora, lo más crucial es que veas el texto.
  if (!product) {
    // Se mantiene esta comprobación para evitar errores si product es null, aunque los logs sugieren que no debería serlo.
    return (
      <div className="text-center mt-5" style={{ color: "black" }}>
        Libro no encontrado o datos no disponibles.
      </div>
    );
  }

  return (
    <div className="container mt-5 text-dark">
      {" "}
      {/* CAMBIO CLAVE AQUÍ: text-white a text-dark */}
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
