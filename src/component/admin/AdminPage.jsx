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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404");
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
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
    fetchProducts();
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await productService.addProduct(newProduct);
      alert("Producto agregado con éxito!");
    } catch (err) {
      console.error("Error al agregar el producto:", err);
      alert("Error al agregar el producto. Revisa la consola.");
    } finally {
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

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-3">
          {" "}
          <button className="btn btn-success" onClick={() => openModal(null)}>
            Nuevo Producto
          </button>
          <AdminMenu />
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
