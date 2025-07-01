import React, { useState, useEffect } from "react";
// NOTA: Asegúrate de tener instalado react-bootstrap y bootstrap
// Si no lo tienes, puedes instalarlo con 'npm install react-bootstrap bootstrap'
// y agregar 'import "bootstrap/dist/css/bootstrap.min.css";' en tu App.js
import { Modal, Button, Form } from "react-bootstrap";

const AddProductModal = ({
  isOpen,
  onClose,
  addProduct,
  updateProduct,
  productToEdit,
}) => {
  const [productData, setProductData] = useState({
    name: "",
    stock: "",
    description: "",
    category: "",
    author: "",
    image: "",
    lastStockControlDate: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Sincronizar el estado del formulario con el producto a editar
  useEffect(() => {
    if (productToEdit) {
      setProductData({
        ...productToEdit,
        // Formatear la fecha para el input de tipo 'date'
        lastStockControlDate: productToEdit.lastStockControlDate
          ? new Date(productToEdit.lastStockControlDate)
              .toISOString()
              .split("T")[0]
          : "",
      });
      setIsEditMode(true);
    } else {
      // Resetear el formulario si no hay producto para editar
      setProductData({
        name: "",
        stock: "",
        description: "",
        category: "",
        author: "",
        image: "",
        // Establecer la fecha actual por defecto en modo "Agregar"
        lastStockControlDate: new Date().toISOString().split("T")[0],
      });
      setIsEditMode(false);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSubmit = {
      ...productData,
      stock: parseInt(productData.stock, 10), // Aseguramos que el stock sea un número
    };

    if (isEditMode) {
      updateProduct(productToSubmit);
    } else {
      addProduct(productToSubmit);
    }
    onClose(); // Cierra el modal después de la acción
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Libro</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={productData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="url"
              name="image"
              value={productData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Último Control de Stock</Form.Label>
            <Form.Control
              type="date"
              name="lastStockControlDate"
              value={productData.lastStockControlDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {isEditMode ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
