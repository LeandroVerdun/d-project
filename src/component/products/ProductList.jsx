// src/component/products/ProductList.jsx (ACTUALIZADO)
import React, { useState, useEffect } from "react";
import * as productService from "../../services/productService";
import ProductCard from "./ProductCard"; // ¡Ahora importamos ProductCard!
// import styles from './ProductList.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError(
          "No se pudieron cargar los libros. Por favor, asegúrate de que el backend esté funcionando y tengas productos."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando libros...</div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-white text-center mt-5">
        No hay libros disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-white mb-4 text-center">
        Nuestra Colección de Libros
      </h2>
      <div className="row justify-content-center">
        {products.map((product) => (
          // ¡Ahora usamos ProductCard para cada producto!
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
