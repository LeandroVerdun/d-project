<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
=======
// src\component\CheckoutModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
// import { createOrder } from "../services/orderService"; // YA NO SE NECESITA AQUÍ
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({
  show,
  handleClose,
<<<<<<< HEAD
  onPurchaseSuccess,
=======
  onPurchaseSuccess, // Esta prop ahora DEBE recibir los datos del formulario
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
  totalAmount,
}) => {
  const navigate = useNavigate();

  const [deliveryOption, setDeliveryOption] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    province: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetFormStates = () => {
    setDeliveryOption("");
    setShippingAddress({
      address: "",
      city: "",
      postalCode: "",
      country: "",
      province: "",
    });
    setPaymentMethod("");
    setCardNumber("");
    setExpirationDate("");
    setCvv("");
    setError(null);
  };

  useEffect(() => {
    if (show) {
      resetFormStates();
    }
  }, [show]);

  const handleCloseModalAndReset = () => {
<<<<<<< HEAD
    resetFormStates();
    setLoading(false);
=======
    console.log("CheckoutModal: handleCloseModalAndReset llamado.");
    resetFormStates();
    setLoading(false);
    console.log("CheckoutModal: Llamando handleClose (prop de CartPage).");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
=======
    console.log(`CheckoutModal: handleChange - Name: ${name}, Value: ${value}`);
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4

    if (name === "cardNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      let formattedCardNumber = "";
      for (let i = 0; i < digitsOnly.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedCardNumber += " ";
        }
        formattedCardNumber += digitsOnly[i];
      }
      setCardNumber(formattedCardNumber);
    } else if (name === "expirationDate") {
      const formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 2) {
        setExpirationDate(
          `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`
        );
      } else {
        setExpirationDate(formattedValue);
      }
    } else if (name === "cvv") {
      setCvv(value.replace(/\D/g, "").slice(0, 3));
    } else if (name === "deliveryOption") {
      setDeliveryOption(value);
      setShippingAddress({
        address: "",
        city: "",
        postalCode: "",
        country: "",
        province: "",
      });
      setPaymentMethod("");
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
    } else if (
      ["address", "city", "postalCode", "country", "province"].includes(name)
    ) {
<<<<<<< HEAD
      let newValue = value;

      if (["city", "province", "country"].includes(name)) {
        newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      }

      if (name === "postalCode") {
        newValue = value.replace(/\D/g, "").slice(0, 4);
      }

      if (newValue.length <= 10) {
        setShippingAddress({ ...shippingAddress, [name]: newValue });
      }
=======
      setShippingAddress({ ...shippingAddress, [name]: value });
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    } else if (name === "paymentMethod") {
      setPaymentMethod(value);
      if (value !== "credit_card") {
        setCardNumber("");
        setExpirationDate("");
        setCvv("");
      }
    }
  };

  const validateForm = () => {
    setError(null);
<<<<<<< HEAD

    if (!deliveryOption) {
      setError("Por favor, seleccione una opción de entrega.");
=======
    console.log("CheckoutModal: Validando formulario...");

    if (!deliveryOption) {
      setError("Por favor, seleccione una opción de entrega.");
      console.log("CheckoutModal: Validación fallida - deliveryOption.");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
      return false;
    }

    if (deliveryOption === "home_delivery") {
<<<<<<< HEAD
      const { address, city, province, postalCode, country } = shippingAddress;

      if (!address || !city || !postalCode || !country || !province) {
        setError("Por favor, complete todos los campos de la dirección de envío.");
        return false;
      }

      const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,10}$/;
      if (
        !regexLetras.test(city) ||
        !regexLetras.test(province) ||
        !regexLetras.test(country)
      ) {
        setError("Ciudad, Provincia y País solo pueden contener letras y hasta 10 caracteres.");
        return false;
      }

      if (address.length > 10) {
        setError("La dirección no puede superar los 10 caracteres.");
        return false;
      }

      const regexPostal = /^\d{4}$/;
      if (!regexPostal.test(postalCode)) {
        setError("El código postal debe tener exactamente 4 números.");
=======
      if (
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.postalCode ||
        !shippingAddress.country ||
        !shippingAddress.province
      ) {
        setError(
          "Por favor, complete todos los campos de la dirección de envío."
        );
        console.log("CheckoutModal: Validación fallida - shippingAddress.");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
        return false;
      }
    }

    if (!paymentMethod) {
      setError("Por favor, seleccione un método de pago.");
<<<<<<< HEAD
=======
      console.log("CheckoutModal: Validación fallida - paymentMethod.");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
      return false;
    }

    if (paymentMethod === "credit_card") {
      const cleanCardNumber = cardNumber.replace(/\s/g, "");
      if (!cleanCardNumber || cleanCardNumber.length < 16) {
<<<<<<< HEAD
        setError("Por favor, ingrese un número de tarjeta válido (16 dígitos).");
=======
        setError(
          "Por favor, ingrese un número de tarjeta válido (16 dígitos)."
        );
        console.log("CheckoutModal: Validación fallida - cardNumber.");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
        return false;
      }
      if (!expirationDate || !/^\d{2}\/\d{2}$/.test(expirationDate)) {
        setError("Por favor, ingrese una fecha de expiración válida (MM/AA).");
<<<<<<< HEAD
=======
        console.log(
          "CheckoutModal: Validación fallida - expirationDate format."
        );
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
        return false;
      }
      const [month, year] = expirationDate.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        setError("Mes de expiración no válido.");
<<<<<<< HEAD
        return false;
      }
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        setError("La tarjeta ha expirado.");
=======
        console.log(
          "CheckoutModal: Validación fallida - expirationDate month."
        );
        return false;
      }
      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        setError("La tarjeta ha expirado.");
        console.log(
          "CheckoutModal: Validación fallida - expirationDate expired."
        );
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
        return false;
      }

      if (!cvv || cvv.length < 3) {
        setError("Por favor, ingrese un CVV válido (3 dígitos).");
<<<<<<< HEAD
        return false;
      }
    } else if (paymentMethod === "paypal" && deliveryOption === "store_pickup") {
      setError("PayPal no está disponible para retiro en el local.");
      return false;
    } else if (paymentMethod === "pay_at_store" && deliveryOption === "home_delivery") {
      setError("Pago en el local no está disponible para envío a domicilio.");
      return false;
    }

=======
        console.log("CheckoutModal: Validación fallida - cvv.");
        return false;
      }
    } else if (
      paymentMethod === "paypal" &&
      deliveryOption === "store_pickup"
    ) {
      setError("PayPal no está disponible para retiro en el local.");
      console.log(
        "CheckoutModal: Validación fallida - PayPal con store_pickup."
      );
      return false;
    } else if (
      paymentMethod === "pay_at_store" &&
      deliveryOption === "home_delivery"
    ) {
      setError("Pago en el local no está disponible para envío a domicilio.");
      console.log(
        "CheckoutModal: Validación fallida - Pay at store con home_delivery."
      );
      return false;
    }

    console.log("CheckoutModal: Formulario validado con éxito.");
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderDetails = {
        deliveryOption,
        shippingAddress: deliveryOption === "home_delivery" ? shippingAddress : undefined,
        paymentMethod,
        paymentDetails:
          paymentMethod === "credit_card"
            ? {
                cardNumber: cardNumber.replace(/\s/g, ""),
=======
    console.log("CheckoutModal: handleSubmit llamado.");

    if (!validateForm()) {
      console.log(
        "CheckoutModal: Validación de formulario fallida en handleSubmit."
      );
      return;
    }

    setLoading(true);
    setError(null);
    console.log(
      "CheckoutModal: Estados de carga y error reseteados para la sumisión."
    );

    try {
      console.log("CheckoutModal: Simulando retraso de red (1.5s)...");
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula un retraso de red
      console.log("CheckoutModal: Simulación de pago completada.");

      // Recopilar todos los datos necesarios para la orden
      const orderDetails = {
        deliveryOption,
        // Solo incluir shippingAddress si la opción de entrega es a domicilio
        shippingAddress:
          deliveryOption === "home_delivery" ? shippingAddress : undefined,
        paymentMethod,
        // Solo incluir paymentDetails si el método de pago es tarjeta de crédito
        paymentDetails:
          paymentMethod === "credit_card"
            ? {
                cardNumber: cardNumber.replace(/\s/g, ""), // Limpiar espacios del número de tarjeta
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                expirationDate,
                cvv,
              }
            : undefined,
<<<<<<< HEAD
      };

      onPurchaseSuccess(orderDetails);
    } catch (err) {
      setError("Error al procesar la compra. Por favor, inténtelo de nuevo.");
      handleCloseModalAndReset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleCloseModalAndReset} centered backdrop="static" keyboard={false}>
      <Modal.Header className="bg-dark text-white" closeButton onClick={handleCloseModalAndReset}>
=======
        // No pasamos totalAmount aquí, ya que CartPage lo calculará desde el carrito real
      };

      console.log(
        "CheckoutModal: Llamando onPurchaseSuccess con detalles de la orden:",
        orderDetails
      );
      // Llama a la prop onPurchaseSuccess y PÁSALE los detalles de la orden
      onPurchaseSuccess(orderDetails);

      // Este modal NO se cierra desde aquí directamente, CartPage lo cerrará
      // cuando llame a setShowCheckoutModal(false) después de onPurchaseSuccess.
    } catch (err) {
      console.error(
        "CheckoutModal: Error al finalizar la compra en handleSubmit:",
        err
      );
      setError(
        err.response?.data?.message ||
          "Error al procesar la compra. Por favor, inténtelo de nuevo."
      );
      handleCloseModalAndReset();
      console.log(
        "CheckoutModal: Error en la compra, llamando handleCloseModalAndReset."
      );
    } finally {
      setLoading(false);
      console.log("CheckoutModal: Loading seteado a false.");
    }
  };

  console.log(`CheckoutModal: Renderizando. Prop 'show': ${show}`);

  return (
    <Modal
      show={show}
      onHide={handleCloseModalAndReset}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        className="bg-dark text-white"
        closeButton
        onClick={handleCloseModalAndReset}
      >
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
        <Modal.Title>Finalizar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark">
        <Form onSubmit={handleSubmit}>
<<<<<<< HEAD
=======
          {/* ... (el resto del formulario de CheckoutModal, sin cambios) ... */}
          {/* Opción de Entrega/Retiro */}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          <Form.Group className="mb-3" controlId="deliveryOption">
            <Form.Label>¿Cómo deseas recibir tu pedido?</Form.Label>
            <Form.Control
              as="select"
              name="deliveryOption"
              value={deliveryOption}
              onChange={handleChange}
              required
              className="bg-info text-white border-primary"
            >
              <option value="">Seleccione una opción</option>
              <option value="home_delivery">Envío a domicilio</option>
              <option value="store_pickup">Retirar en el local</option>
            </Form.Control>
          </Form.Group>

<<<<<<< HEAD
=======
          {/* Campos para la dirección de envío (se muestran condicionalmente) */}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          {deliveryOption === "home_delivery" && (
            <>
              <h5 className="mt-4 mb-3">Datos de Envío</h5>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Calle y número"
                  value={shippingAddress.address}
                  onChange={handleChange}
<<<<<<< HEAD
                  required
                  className="bg-info text-white border-primary"
                  maxLength={10}
=======
                  required={deliveryOption === "home_delivery"}
                  className="bg-info text-white border-primary"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={shippingAddress.city}
                  onChange={handleChange}
<<<<<<< HEAD
                  required
                  className="bg-info text-white border-primary"
                  maxLength={10}
=======
                  required={deliveryOption === "home_delivery"}
                  className="bg-info text-white border-primary"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="province">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  name="province"
<<<<<<< HEAD
                  placeholder="Provincia"
                  value={shippingAddress.province}
                  onChange={handleChange}
                  required
                  className="bg-info text-white border-primary"
                  maxLength={10}
=======
                  placeholder="Provincia (Ej: Tucumán)"
                  value={shippingAddress.province}
                  onChange={handleChange}
                  required={deliveryOption === "home_delivery"}
                  className="bg-info text-white border-primary"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  placeholder="Ej: 4000"
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
<<<<<<< HEAD
                  required
                  className="bg-info text-white border-primary"
                  maxLength={4}
=======
                  required={deliveryOption === "home_delivery"}
                  className="bg-info text-white border-primary"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
<<<<<<< HEAD
                  placeholder="País"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  required
                  className="bg-info text-white border-primary"
                  maxLength={10}
=======
                  placeholder="País (Ej: Argentina)"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  required={deliveryOption === "home_delivery"}
                  className="bg-info text-white border-primary"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                />
              </Form.Group>
            </>
          )}

<<<<<<< HEAD
=======
          {/* Campo para el método de pago (se muestran condicionalmente según la opción de entrega) */}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          {deliveryOption && (
            <Form.Group className="mb-3 mt-4" controlId="paymentMethod">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Control
                as="select"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handleChange}
                required
                className="bg-info text-white border-primary"
              >
                <option value="">Seleccione un método</option>
<<<<<<< HEAD
=======
                {/* Opciones para Envío a Domicilio */}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                {deliveryOption === "home_delivery" && (
                  <>
                    <option value="credit_card">Tarjeta de Crédito</option>
                    <option value="paypal">PayPal</option>
<<<<<<< HEAD
                    <option value="cash_on_delivery">Pago Contra Entrega</option>
                  </>
                )}
=======
                    <option value="cash_on_delivery">
                      Pago Contra Entrega
                    </option>
                  </>
                )}
                {/* Opciones para Retiro en el Local */}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                {deliveryOption === "store_pickup" && (
                  <>
                    <option value="credit_card">Tarjeta de Crédito</option>
                    <option value="pay_at_store">Pagar en el Local</option>
                  </>
                )}
              </Form.Control>
            </Form.Group>
          )}

<<<<<<< HEAD
=======
          {/* CAMPOS DE LA TARJETA DE CRÉDITO (SE MUESTRAN CONDICIONALMENTE) */}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          {paymentMethod === "credit_card" && (
            <>
              <h5 className="mt-4 mb-3">Datos de Tarjeta de Crédito</h5>
              <Form.Group className="mb-3" controlId="cardNumber">
                <Form.Label>Número de Tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  onChange={handleChange}
<<<<<<< HEAD
                  required
                  className="bg-info text-white border-primary"
                  maxLength={19}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group className="mb-3 flex-grow-1 me-2" controlId="expirationDate">
=======
                  required={paymentMethod === "credit_card"}
                  className="bg-info text-white border-primary"
                  maxLength="19" // 16 dígitos + 3 espacios
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group
                  className="mb-3 flex-grow-1 me-2"
                  controlId="expirationDate"
                >
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                  <Form.Label>Fecha de Vencimiento (MM/AA)</Form.Label>
                  <Form.Control
                    type="text"
                    name="expirationDate"
                    placeholder="MM/AA"
                    value={expirationDate}
                    onChange={handleChange}
<<<<<<< HEAD
                    required
                    className="bg-info text-white border-primary"
                    maxLength={5}
=======
                    required={paymentMethod === "credit_card"}
                    className="bg-info text-white border-primary"
                    maxLength="5"
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                  />
                </Form.Group>
                <Form.Group className="mb-3 flex-grow-1 ms-2" controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    placeholder="XXX"
                    value={cvv}
                    onChange={handleChange}
<<<<<<< HEAD
                    required
                    className="bg-info text-white border-primary"
                    maxLength={3}
=======
                    required={paymentMethod === "credit_card"}
                    className="bg-info text-white border-primary"
                    maxLength="3" // Limitado a 3 dígitos
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
                  />
                </Form.Group>
              </div>
            </>
          )}

<<<<<<< HEAD
          {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
=======
          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4

          <Button
            type="submit"
            className="btn btn-success mt-3"
            disabled={loading || !totalAmount || totalAmount <= 0}
            style={{ width: "100%", marginTop: "15px" }}
          >
            {loading
              ? "Procesando compra..."
<<<<<<< HEAD
              : `Pagar $${totalAmount?.toFixed(2) || "0.00"}`}
=======
              : `Pagar $${
                  typeof totalAmount === "number" && totalAmount > 0
                    ? totalAmount.toFixed(2)
                    : "0.00"
                }`}
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button
          variant="secondary"
          onClick={handleCloseModalAndReset}
          disabled={loading}
        >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
