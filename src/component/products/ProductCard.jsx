import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as cartService from "../../services/cartService";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await cartService.getMyCart();
        const item = cart.items.find((item) => item.product._id === product._id);
        if (item) {
          setQuantityInCart(item.quantity);
        } else {
          setQuantityInCart(0);
        }
      } catch (err) {
        console.log("No se pudo verificar el carrito:", err.message);
      }
    };
    fetchCart();
  }, [product._id]);

  const handleAddToCart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await cartService.addOrUpdateItemInCart(product._id, quantityInCart + 1);
      setTimeout(() => {
        setQuantityInCart((prev) => prev + 1);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      alert("Debes iniciar sesión para realizar una compra.");
      setLoading(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

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
          <h5 className="card-title text-center text-truncate">{product.name}</h5>
          <p className="card-text text-center text-muted">por {product.author}</p>
          <h6 className="text-center text-warning mb-2">
            <strong>{formattedPrice}</strong>
          </h6>
          <div className="mt-auto text-center d-flex justify-content-center gap-2">
            <Link to={`/products/${product._id}`} className="btn btn-primary btn-sm">
              Ver Detalles
            </Link>
            {product.stock > 0 ? (
              <button
                className="btn btn-success btn-sm d-flex align-items-center justify-content-center"
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    style={{ width: "1rem", height: "1rem" }}
                  />
                ) : quantityInCart > 0 ? (
                  <>Añadido ({quantityInCart})</>
                ) : (
                  "Añadir al Carrito"
                )}
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
