// src\component\PurchaseSuccessModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PurchaseSuccessModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    handleClose(); // Cierra el modal primero
    navigate("/"); // Luego navega a la página principal
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        className="bg-success text-white"
        closeButton
        onClick={handleClose}
      >
        <Modal.Title>¡Compra Exitosa!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark text-center p-4">
        <h4 className="text-success mb-3">🎉 ¡Gracias por tu compra! 🎉</h4>
        <p>Tu pedido ha sido procesado con éxito.</p>

        <div className="d-flex justify-content-center mt-4">
          <Button variant="primary" onClick={handleGoHome}>
            {" "}
            Volver al Inicio
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark"></Modal.Footer>
    </Modal>
  );
};

export default PurchaseSuccessModal;
