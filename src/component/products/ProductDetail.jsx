import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as productService from "../../services/productService.js";
import * as cartService from "../../services/cartService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(
          err.response?.data?.message ||
            "No se pudo cargar el detalle del libro."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await cartService.getMyCart();
        const item = cart.items.find((item) => item.product._id === id);
        if (item) {
          setQuantityInCart(item.quantity);
        } else {
          setQuantityInCart(0);
        }
      } catch (err) {
        console.warn("No se pudo obtener el carrito:", err.message);
      }
    };

    fetchCart();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0 || adding) return;

    setAdding(true);
    try {
      await cartService.addOrUpdateItemInCart(product._id, quantityInCart + 1);
      setTimeout(() => {
        setQuantityInCart((prev) => prev + 1);
        setAdding(false);
      }, 1000);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("Debes iniciar sesión para comprar.");
      setAdding(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product?.price || 0);

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

  return (
    <div className="container mt-5 text-light">
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

          <h3 className="text-primary mt-3">
            <strong>Precio: {formattedPrice}</strong>
          </h3>

          <div className="mt-4">
            {product.stock > 0 ? (
              <button
                className="btn btn-success btn-lg w-100 d-flex justify-content-center align-items-center"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  />
                ) : quantityInCart > 0 ? (
                  <>Añadido ({quantityInCart})</>
                ) : (
                  "Añadir al Carrito"
                )}
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
