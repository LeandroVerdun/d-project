// src/component/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as cartService from "../services/cartService";
import "../css/CartPage.css"; // Asegúrate que la ruta sea correcta
import CheckoutModal from "./CheckoutModal";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.getMyCart();
      setCart(data);
    } catch (err) {
      console.error("Error al obtener el carrito:", err);
      if (
        err.message.includes("No autorizado") ||
        err.message.includes("token")
      ) {
        navigate("/login");
        setError("Necesitas iniciar sesión para ver tu carrito.");
      } else {
        setError(
          "No se pudo cargar el carrito. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const itemInCart = cart.items.find(
      (item) => item.product._id === productId
    );
    if (
      itemInCart &&
      itemInCart.product &&
      itemInCart.product.stock < newQuantity
    ) {
      alert("No hay suficiente stock disponible para esta cantidad.");
      return;
    }

    try {
      await cartService.addOrUpdateItemInCart(productId, newQuantity);
      fetchCart();
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
      alert(
        `Error al actualizar la cantidad: ${err.message || "Error desconocido"}`
      );
    }
  };

  const handleRemoveItem = async (productId) => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar este producto del carrito?"
      )
    ) {
      try {
        await cartService.removeItemFromCart(productId);
        fetchCart();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert(
          `Error al eliminar el producto: ${err.message || "Error desconocido"}`
        );
      }
    }
  };

  const handleClearCart = async () => {
    if (
      window.confirm("¿Estás seguro de que quieres vaciar todo el carrito?")
    ) {
      try {
        await cartService.clearMyCart();
        fetchCart();
        alert("Carrito vaciado con éxito.");
      } catch (err) {
        console.error("Error al vaciar el carrito:", err);
        alert(
          `Error al vaciar el carrito: ${err.message || "Error desconocido"}`
        );
      }
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => {
      // Comprobar que item.product y item.product.price existan
      if (item && item.product && typeof item.product.price === "number") {
        return acc + item.product.price * item.quantity;
      }
      return acc; // Si no es válido, no lo sumamos al total
    }, 0);
  };

  const handleShowCheckoutModal = () => setShowCheckoutModal(true);
  const handleCloseCheckoutModal = () => setShowCheckoutModal(false);

  const handlePurchaseSuccess = () => {
    fetchCart();
  };

  if (loading) {
    return (
      <div className="cart-container text-center text-white mt-5">
        Cargando carrito...
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container text-center text-danger mt-5">
        Error: {error}
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container empty-cart text-white text-center mt-5">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>¡Añade algunos productos para empezar a comprar!</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Ir de compras
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Mi Carrito de Compras</h2>
      <div className="cart-items-list">
        {cart.items.map((item) => (
          <div key={item.product?._id || item._id} className="cart-item-card">
            {" "}
            {/* Uso de optional chaining para key */}
            {item.product ? ( // Comprobar si item.product existe antes de renderizar
              <>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>
                    Precio unitario: $
                    {
                      typeof item.product.price === "number"
                        ? item.product.price.toFixed(2)
                        : "N/A" // Si no es número, muestra N/A
                    }
                  </p>
                  <div className="item-quantity-control">
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      disabled={item.product.stock === item.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm remove-item-btn"
                  onClick={() => handleRemoveItem(item.product._id)}
                >
                  Eliminar
                </button>
              </>
            ) : (
              <div className="text-danger">
                Producto no disponible o eliminado.
              </div> // Mensaje si el producto no existe
            )}
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        <div className="cart-actions">
          <button
            className="btn btn-warning me-2"
            onClick={handleClearCart}
            disabled={cart.items.length === 0}
          >
            Vaciar Carrito
          </button>
          <button
            className="btn btn-success"
            onClick={handleShowCheckoutModal}
            disabled={calculateTotal() === 0 || loading}
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      <CheckoutModal
        show={showCheckoutModal}
        handleClose={handleCloseCheckoutModal}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </div>
  );
};

export default CartPage;
