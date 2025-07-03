// src/component/CheckoutModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as cartService from "../services/cartService"; // Asegúrate que la ruta sea correcta

const CheckoutModal = ({ show, handleClose, onPurchaseSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\D/g, "");
      value = value.substring(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (name === "expiryDate") {
      value = value.replace(/\D/g, "");
      value = value.substring(0, 4);
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }
    } else if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  const validateForm = () => {
    const { cardNumber, cardName, expiryDate, cvv } = formData;
    let newError = "";

    // Validación de Número de Tarjeta (16 dígitos y formato)
    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      newError = "El número de tarjeta debe tener 16 dígitos.";
    }
    // Validación de Nombre en la Tarjeta
    else if (!cardName || cardName.trim() === "") {
      newError = "El nombre en la tarjeta es requerido.";
    }
    // Validación de Fecha de Caducidad (MM/AA y formato)
    else if (
      !expiryDate ||
      expiryDate.length !== 5 ||
      !expiryDate.includes("/")
    ) {
      newError = "La fecha de caducidad debe tener formato MM/AA.";
    }
    // Validación de Fecha de Caducidad (Validez: mes y no vencida)
    else {
      const [monthStr, yearStr] = expiryDate.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);

      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        newError = "El mes de caducidad no es válido (01-12).";
      } else if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newError = "La tarjeta está vencida.";
      }
    }
    // Validación de CVV (se ejecuta solo si no hay errores previos)
    if (newError === "" && (!cvv || (cvv.length !== 3 && cvv.length !== 4))) {
      newError = "El CVV debe tener 3 o 4 dígitos.";
    }

    setError(newError);
    return newError === ""; // Retorna true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setPurchaseComplete(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de retraso

      const isSuccess = Math.random() > 0.1; // 90% de éxito (revertido a la simulación original)

      if (isSuccess) {
        await cartService.clearMyCart(); // Vaciar el carrito tras el éxito
        setPurchaseComplete(true);
        // REMOVIDO: onPurchaseSuccess(); // Esta llamada se ha movido
      } else {
        setError(
          "La transacción fue rechazada. Por favor, verifica tus datos o inténtalo de nuevo."
        );
      }
    } catch (err) {
      console.error("Error durante la simulación de compra:", err);
      setError(
        `Ocurrió un error inesperado: ${err.message || "Error desconocido"}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cierre del modal desde el botón 'x' o 'Cancelar'
  // Solo permite el cierre si la compra NO está completa
  const handleOnHide = () => {
    if (!purchaseComplete && !loading) {
      setFormData({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      });
      setError(null);
      handleClose(); // Cierra el modal
    }
    // Si purchaseComplete es true, no hacemos nada aquí, forzando que el usuario use el botón de "Cerrar" del mensaje de éxito
  };

  // Función específica para cerrar el modal después de una compra exitosa
  const handleCloseSuccessModal = () => {
    setFormData({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    });
    setError(null);
    setPurchaseComplete(false); // Reseteamos purchaseComplete
    if (onPurchaseSuccess) {
      onPurchaseSuccess(); // AHORA se llama aquí, después de que el usuario vio el mensaje
    }
    handleClose(); // Cerramos el modal
  };

  return (
    <Modal
      show={show}
      onHide={handleOnHide} // Ahora onHide usa la lógica ajustada
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        closeButton={!purchaseComplete} // 'x' visible solo si la compra NO está completa
        className="bg-primary text-white border-bottom border-secondary"
      >
        <Modal.Title>Finalizar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark">
        {!purchaseComplete ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="cardNumber">
              <Form.Label>Número de Tarjeta</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
                className="bg-info text-white border-primary"
                inputMode="numeric"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cardName">
              <Form.Label>Nombre en la Tarjeta</Form.Label>
              <Form.Control
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Nombre Completo"
                required
                className="bg-info text-white border-primary"
              />
            </Form.Group>

            <div className="row">
              <Form.Group className="mb-3 col-md-6" controlId="expiryDate">
                <Form.Label>Fecha de Caducidad</Form.Label>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/AA"
                  required
                  className="bg-info text-white border-primary"
                  inputMode="numeric"
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="***"
                  required
                  className="bg-info text-white border-primary"
                  inputMode="numeric"
                />
              </Form.Group>
            </div>

            {error && <p className="text-danger mt-2">{error}</p>}

            <Button
              variant="success"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              {loading ? "Procesando pago..." : "Pagar"}
            </Button>
          </Form>
        ) : (
          <div className="text-center p-4">
            <h4 className="text-success">¡Compra completada con éxito! 🎉</h4>
            <p className="mt-3">
              Felicidades por tu compra. Gracias por tu confianza.
              <br />
              Tu pedido ha sido procesado y será enviado a la brevedad.
            </p>
            {/* El botón 'Cerrar' ahora usa la nueva función */}
            <Button
              variant="primary"
              onClick={handleCloseSuccessModal}
              className="mt-4"
            >
              Cerrar
            </Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-primary text-white border-top border-secondary">
        {!purchaseComplete && ( // El botón 'Cancelar' visible solo si la compra NO está completa
          <Button variant="secondary" onClick={handleOnHide} disabled={loading}>
            Cancelar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
