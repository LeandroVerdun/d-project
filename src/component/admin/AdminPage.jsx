// src/component/admin/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as productService from "../../services/productService";
import ProductTable from "./ProductTable";
import AdminMenu from "./AdminMenu";
import AddProductModal from "./AddProductModal";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // **Paso 1: Verificación de acceso por rol 'isAdmin'**
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404");
    }
    // Llamamos a la función para obtener los productos del backend
    fetchProducts();
  }, [navigate]);

  // **Función para obtener los productos del backend (ahora con la API)**
  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Resetea el error antes de la llamada
    try {
      const data = await productService.getAllProducts();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener los productos:", err);

      setError(
        "No se pudieron cargar los productos. Asegúrate de que tu backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
    // Volver a cargar la lista de productos al cerrar el modal para ver los cambios
    fetchProducts();
  };

  // **Funciones para manejar el CRUD de productos con llamadas a la API**
  const handleAddProduct = async (newProduct) => {
    try {
      await productService.addProduct(newProduct);
      alert("Producto agregado con éxito!");
    } catch (err) {
      console.error("Error al agregar el producto:", err);
      alert("Error al agregar el producto. Revisa la consola.");
    } finally {
      // Volver a cargar los datos para reflejar el cambio
      fetchProducts();
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await productService.updateProduct(updatedProduct._id, updatedProduct);
      alert("Producto actualizado con éxito!");
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
      alert("Error al actualizar el producto. Revisa la consola.");
    } finally {
      // Volver a cargar los datos para reflejar el cambio
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        await productService.deleteProduct(productId);
        alert("Producto eliminado con éxito!");
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        alert("Error al eliminar el producto. Revisa la consola.");
      } finally {
        // Volver a cargar los datos para reflejar el cambio
        fetchProducts();
      }
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando productos...</div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  return (
    <div>
      <div className={styles.adminContainer}>
        <h1>Administrar Stock de la Librería</h1>
        {/* ENLACES DE NAVEGACIÓN DEL ADMINISTRADOR */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className={styles.newProductButton}
            onClick={() => openModal(null)}
          >
            Nuevo Producto
          </button>

          <AdminMenu
            onNewProduct={() => openModal(null)}
            isModalOpen={isModalOpen}
            onCloseModal={closeModal}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            productToEdit={productToEdit}
          />
        </div>
        <ProductTable
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={openModal}
        />
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addProduct={handleAddProduct}
        updateProduct={handleUpdateProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default AdminPage;
