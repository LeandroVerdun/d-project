import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as cartService from "../../services/cartService";
import MessageModal from "../MessageModal";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantityInCart, setQuantityInCart] = useState(0);
  const navigate = useNavigate();

  const [messageModal, setMessageModal] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
    onModalCloseRedirect: null,
  });

  const showMessage = (
    type,
    title,
    message,
    onConfirm = null,
    onModalCloseRedirect = null
  ) => {
    setMessageModal({
      show: true,
      type,
      title,
      message,
      onConfirm,
      onModalCloseRedirect,
    });
  };

  const handleCloseMessageModal = () => {
    if (messageModal.onModalCloseRedirect) {
      messageModal.onModalCloseRedirect();
    }
    setMessageModal({ ...messageModal, show: false });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await cartService.getMyCart();
        const item = cart.items.find(
          (item) => item.product._id === product._id
        );
        if (item) {
          setQuantityInCart(item.quantity);
        } else {
          setQuantityInCart(0);
        }
      } catch (err) {
        console.log(
          "No se pudo verificar el carrito (posiblemente no logueado):",
          err.message
        );
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
        showMessage(
          "success",
          "Producto Añadido",
          `"${product.name}" ha sido añadido al carrito.`
        );
      }, 500);
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Ocurrió un error al añadir el producto al carrito.";

      if (error.response && error.response.status === 401) {
        showMessage(
          "warning",
          "Inicia Sesión para Comprar",
          "Debes iniciar sesión para poder añadir productos al carrito.",
          null,
          () => navigate("/login")
        );
      } else {
        showMessage("error", "Error al Añadir", errorMessage);
      }
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
            <Link
              to={`/products/${product._id}`}
              className="btn btn-primary btn-sm"
            >
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
      <MessageModal
        show={messageModal.show}
        handleClose={handleCloseMessageModal}
        type={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        onConfirm={messageModal.onConfirm}
        onModalCloseRedirect={messageModal.onModalCloseRedirect}
      />
    </div>
  );
};

export default ProductCard;
