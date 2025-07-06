<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import "../css/Cart.css";  
=======
// src\component\CartPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as cartService from "../services/cartService";
import * as orderService from "../services/orderService"; // ¡NUEVA IMPORTACIÓN!
import "../css/CartPage.css";
import CheckoutModal from "./CheckoutModal";
import PurchaseSuccessModal from "./PurchaseSuccessModal";
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CartPage: useEffect de montaje. Llamando fetchCart.");
    fetchCart();
  }, []);

  useEffect(() => {
    console.log("CartPage: showCheckoutModal cambió a:", showCheckoutModal);
  }, [showCheckoutModal]);

  useEffect(() => {
    console.log("CartPage: showSuccessModal cambió a:", showSuccessModal);
  }, [showSuccessModal]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("CartPage: Iniciando fetchCart...");
      const data = await cartService.getMyCart();
      setCart(data);
      console.log("CartPage: Carrito obtenido con éxito.", data);
    } catch (err) {
      console.error("CartPage: Error al obtener el carrito:", err);
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
      console.log("CartPage: fetchCart finalizado. Loading:", false);
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
      console.log(
        `CartPage: Actualizando cantidad para producto ${productId} a ${newQuantity}`
      );
      await cartService.addOrUpdateItemInCart(productId, newQuantity);
      fetchCart();
      console.log("CartPage: Cantidad actualizada. Refetching cart.");
    } catch (err) {
      console.error("CartPage: Error al actualizar cantidad:", err);
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
        console.log(`CartPage: Eliminando producto ${productId}`);
        await cartService.removeItemFromCart(productId);
        fetchCart();
        console.log("CartPage: Producto eliminado. Refetching cart.");
      } catch (err) {
        console.error("CartPage: Error al eliminar producto:", err);
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
        console.log("CartPage: Vaciando carrito...");
        await cartService.clearMyCart();
        fetchCart();
        alert("Carrito vaciado con éxito.");
        console.log("CartPage: Carrito vaciado. Refetching cart.");
      } catch (err) {
        console.error("CartPage: Error al vaciar el carrito:", err);
        alert(
          `Error al vaciar el carrito: ${err.message || "Error desconocido"}`
        );
      }
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => {
      if (item && item.product && typeof item.product.price === "number") {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  const handleShowCheckoutModal = () => {
    console.log(
      "CartPage: handleShowCheckoutModal llamado. Setting showCheckoutModal a true."
    );
    setShowCheckoutModal(true);
  };

  const handleCloseCheckoutModal = () => {
    console.log(
      "CartPage: handleCloseCheckoutModal llamado. Setting showCheckoutModal a false."
    );
    setShowCheckoutModal(false);
  };

  const handleCloseSuccessModal = () => {
    console.log(
      "CartPage: handleCloseSuccessModal llamado. Setting showSuccessModal a false."
    );
    setShowSuccessModal(false);
  };

  // Esta función ahora recibe los detalles de la orden del CheckoutModal
  const handlePurchaseSuccess = async (orderDetailsFromCheckout) => {
    console.log(
      "CartPage: handlePurchaseSuccess (prop de CheckoutModal) llamado con detalles:",
      orderDetailsFromCheckout
    );
    try {
      // 1. Obtener los datos del carrito ACTUAL para crear la orden
      // Asegurarse de tener el carrito más reciente antes de crear la orden
      const currentCart = await cartService.getMyCart();

      if (!currentCart || currentCart.items.length === 0) {
        console.warn("CartPage: Intento de crear orden con carrito vacío.");
        alert("Error: El carrito está vacío, no se puede finalizar la compra.");
        setShowCheckoutModal(false); // Cierra el modal de checkout si el carrito está vacío
        return;
      }

      // Preparar los datos para la orden, combinando items del carrito y detalles del checkout
      const orderData = {
        items: currentCart.items.map((item) => ({
          product: item.product._id, // Enviar solo el ID del producto
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image, // Puedes incluir la imagen si tu esquema de orden la acepta
        })),
        totalAmount: calculateTotal(), // Calcula el total desde el carrito actual
        ...orderDetailsFromCheckout, // Añade los datos de envío y pago pasados desde CheckoutModal
      };

      console.log("CartPage: Creando orden con datos COMBINADOS:", orderData);
      const newOrder = await orderService.createOrder(orderData); // ¡Llama a createOrder!
      console.log("CartPage: Orden creada en el backend:", newOrder);

      // Ahora sí, vaciar el carrito después de que la orden se creó con éxito
      console.log("CartPage: Limpiando carrito después de compra exitosa...");
      await cartService.clearMyCart(); // Vacía el carrito en el backend
      fetchCart(); // Actualiza el estado local del carrito (lo pone vacío)
      console.log("CartPage: Carrito limpiado y refeteado.");

      setShowCheckoutModal(false); // Cierra el modal de checkout
      setShowSuccessModal(true); // Abre el nuevo modal de éxito
      console.log(
        "CartPage: CheckoutModal cerrado y PurchaseSuccessModal abierto."
      );
    } catch (err) {
      console.error(
        "CartPage: Error en handlePurchaseSuccess (creando orden o limpiando carrito):",
        err
      );
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message || "Error desconocido";
      alert(`Hubo un error al finalizar la compra: ${errorMessage}`);
      setShowCheckoutModal(false); // Si hay un error, cierra el modal de checkout
      // Opcional: navigate("/"); o navigate("/cart") si quieres que se quede en el carrito para reintentar
    }
  };

  console.log(
    "CartPage: Renderizando. showCheckoutModal actual:",
    showCheckoutModal,
    "showSuccessModal actual:",
    showSuccessModal
  );

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

  if (!cart || (cart.items.length === 0 && !showSuccessModal)) {
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
            {item.product ? (
              <>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>
                    Precio unitario: ${" "}
                    {typeof item.product.price === "number"
                      ? item.product.price.toFixed(2)
                      : "N/A"}{" "}
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
              </div>
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
<<<<<<< HEAD
      )}
=======
// src\component\CartPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as cartService from "../services/cartService";
import * as orderService from "../services/orderService";
import "../css/CartPage.css";
import CheckoutModal from "./CheckoutModal";
import PurchaseSuccessModal from "./PurchaseSuccessModal";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("CartPage: useEffect de montaje. Llamando fetchCart.");
    fetchCart();
  }, []);

  useEffect(() => {
    console.log("CartPage: showCheckoutModal cambió a:", showCheckoutModal);
  }, [showCheckoutModal]);

  useEffect(() => {
    console.log("CartPage: showSuccessModal cambió a:", showSuccessModal);
  }, [showSuccessModal]);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("CartPage: Iniciando fetchCart...");
      const data = await cartService.getMyCart();
      setCart(data);
      console.log("CartPage: Carrito obtenido con éxito.", data);
    } catch (err) {
      console.error("CartPage: Error al obtener el carrito:", err);
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
      console.log("CartPage: fetchCart finalizado. Loading:", false);
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
      console.log(
        `CartPage: Actualizando cantidad para producto ${productId} a ${newQuantity}`
      );
      await cartService.addOrUpdateItemInCart(productId, newQuantity);
      fetchCart();
      console.log("CartPage: Cantidad actualizada. Refetching cart.");
    } catch (err) {
      console.error("CartPage: Error al actualizar cantidad:", err);
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
        console.log(`CartPage: Eliminando producto ${productId}`);
        await cartService.removeItemFromCart(productId);
        fetchCart();
        console.log("CartPage: Producto eliminado. Refetching cart.");
      } catch (err) {
        console.error("CartPage: Error al eliminar producto:", err);
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
        console.log("CartPage: Vaciando carrito...");
        await cartService.clearMyCart();
        fetchCart();
        alert("Carrito vaciado con éxito.");
        console.log("CartPage: Carrito vaciado. Refetching cart.");
      } catch (err) {
        console.error("CartPage: Error al vaciar el carrito:", err);
        alert(
          `Error al vaciar el carrito: ${err.message || "Error desconocido"}`
        );
      }
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => {
      if (item && item.product && typeof item.product.price === "number") {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  const handleShowCheckoutModal = () => {
    console.log(
      "CartPage: handleShowCheckoutModal llamado. Setting showCheckoutModal a true."
    );
    setShowCheckoutModal(true);
  };

  const handleCloseCheckoutModal = () => {
    console.log(
      "CartPage: handleCloseCheckoutModal llamado. Setting showCheckoutModal a false."
    );
    setShowCheckoutModal(false);
  };

  const handleCloseSuccessModal = () => {
    console.log(
      "CartPage: handleCloseSuccessModal llamado. Setting showSuccessModal a false."
    );
    setShowSuccessModal(false);
  };

  // Esta función ahora recibe los detalles de la orden del CheckoutModal
  const handlePurchaseSuccess = async (orderDetailsFromCheckout) => {
    console.log(
      "CartPage: handlePurchaseSuccess (prop de CheckoutModal) llamado con detalles:",
      orderDetailsFromCheckout
    );
    try {
      // 1. Obtener los datos del carrito ACTUAL para crear la orden
      // Asegurarse de tener el carrito más reciente antes de crear la orden
      const currentCart = await cartService.getMyCart();

      if (!currentCart || currentCart.items.length === 0) {
        console.warn("CartPage: Intento de crear orden con carrito vacío.");
        alert("Error: El carrito está vacío, no se puede finalizar la compra.");
        setShowCheckoutModal(false); // Cierra el modal de checkout si el carrito está vacío
        return;
      }

      // Preparar los datos para la orden, combinando items del carrito y detalles del checkout
      const orderData = {
        items: currentCart.items.map((item) => ({
          product: item.product._id, // Enviar solo el ID del producto
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image, // Puedes incluir la imagen si tu esquema de orden la acepta
        })),
        totalAmount: calculateTotal(), // Calcula el total desde el carrito actual
        ...orderDetailsFromCheckout, // Añade los datos de envío y pago pasados desde CheckoutModal
      };

      console.log("CartPage: Creando orden con datos COMBINADOS:", orderData);
      const newOrder = await orderService.createOrder(orderData); // ¡Llama a createOrder!
      console.log("CartPage: Orden creada en el backend:", newOrder);

      // Ahora sí, vaciar el carrito después de que la orden se creó con éxito
      console.log("CartPage: Limpiando carrito después de compra exitosa...");
      await cartService.clearMyCart(); // Vacía el carrito en el backend
      fetchCart(); // Actualiza el estado local del carrito (lo pone vacío)
      console.log("CartPage: Carrito limpiado y refeteado.");

      setShowCheckoutModal(false); // Cierra el modal de checkout
      setShowSuccessModal(true); // Abre el nuevo modal de éxito
      console.log(
        "CartPage: CheckoutModal cerrado y PurchaseSuccessModal abierto."
      );
    } catch (err) {
      console.error(
        "CartPage: Error en handlePurchaseSuccess (creando orden o limpiando carrito):",
        err
      );
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message || "Error desconocido";
      alert(`Hubo un error al finalizar la compra: ${errorMessage}`);
      setShowCheckoutModal(false); // Si hay un error, cierra el modal de checkout
      // Opcional: navigate("/"); o navigate("/cart") si quieres que se quede en el carrito para reintentar
    }
  };

  console.log(
    "CartPage: Renderizando. showCheckoutModal actual:",
    showCheckoutModal,
    "showSuccessModal actual:",
    showSuccessModal
  );

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

  if (!cart || (cart.items.length === 0 && !showSuccessModal)) {
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
            {item.product ? (
              <>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.product.name}</h4>
                  <p>
                    Precio unitario: ${" "}
                    {typeof item.product.price === "number"
                      ? item.product.price.toFixed(2)
                      : "N/A"}{" "}
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
              </div>
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
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
      </div>

      <CheckoutModal
        show={showCheckoutModal}
        handleClose={handleCloseCheckoutModal}
        onPurchaseSuccess={handlePurchaseSuccess} // Pasa la función que ahora espera datos
        totalAmount={calculateTotal()}
      />

      <PurchaseSuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
      />
<<<<<<< HEAD
>>>>>>> backup-local-cambios
=======
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    </div>
  );
};

export default CartPage;
