// src/component/MessageModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa"; // Iconos para los diferentes tipos de mensajes

const MessageModal = ({
  show,
  handleClose,
  type = "info", // 'success', 'error', 'warning', 'info', 'confirm'
  title = "Mensaje",
  message,
  onConfirm, // Para el tipo 'confirm'
  confirmButtonText = "Aceptar",
  cancelButtonText = "Cancelar",
}) => {
  const getModalProps = () => {
    switch (type) {
      case "success":
        return {
          headerClass: "bg-success text-white",
          icon: <FaCheckCircle className="me-2" />,
          iconClass: "text-success",
          defaultTitle: "¡Éxito!",
          centered: true,
          backdrop: "static",
        };
      case "error":
        return {
          headerClass: "bg-danger text-white",
          icon: <FaTimesCircle className="me-2" />,
          iconClass: "text-danger",
          defaultTitle: "¡Error!",
          centered: true,
          backdrop: "static",
        };
      case "warning":
        return {
          headerClass: "bg-warning text-dark",
          icon: <FaExclamationTriangle className="me-2" />,
          iconClass: "text-warning",
          defaultTitle: "Advertencia",
          centered: true,
          backdrop: "static",
        };
      case "confirm":
        return {
          headerClass: "bg-primary text-white", // Puedes ajustar este color
          icon: <FaQuestionCircle className="me-2" />,
          iconClass: "text-primary",
          defaultTitle: "Confirmación",
          centered: true,
          backdrop: "static",
          keyboard: false, // No se cierra con ESC
        };
      case "info":
      default:
        return {
          headerClass: "bg-info text-white",
          icon: <FaInfoCircle className="me-2" />,
          iconClass: "text-info",
          defaultTitle: "Información",
          centered: true,
          backdrop: true,
        };
    }
  };

  const { headerClass, icon, iconClass, defaultTitle, ...modalConfig } =
    getModalProps();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} {...modalConfig}>
      <Modal.Header
        className={`${headerClass} d-flex align-items-center`}
        closeButton
      >
        {icon}
        <Modal.Title>{title || defaultTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark text-center p-4">
        <p className="lead">{message}</p>
      </Modal.Body>
      <Modal.Footer className="bg-light d-flex justify-content-center">
        {type === "confirm" ? (
          <>
            <Button variant="secondary" onClick={handleClose}>
              {cancelButtonText}
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              {confirmButtonText}
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleClose}>
            Cerrar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
