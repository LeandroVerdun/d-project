// src/component/admin/AdminPage.jsx (Refactorizado para productos)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// NOTA: En los siguientes pasos, refactorizaremos MovieTable y AddMovieModal
// y los cambiaremos a ProductTable y AddProductModal.
// Asegúrate de que los archivos existan o créalos con un componente vacío por ahora.
import ProductTable from "./ProductTable";
import AddProductModal from "./AddProductModal";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]); // <-- Cambiamos de 'movies' a 'products'
  const [productToEdit, setProductToEdit] = useState(null); // <-- Cambiamos a 'productToEdit'
  const [loading, setLoading] = useState(true);

  // **Paso 1: Verificación de acceso por rol 'isAdmin'** (Ya lo actualizaste)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/404");
    }
    // Llama a la función para obtener los productos del backend al cargar el componente
    fetchProducts();
  }, [navigate]);

  // **Función para obtener los productos del backend (CRUD - Read)**
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // TODO: Aquí implementaremos la llamada real a la API para obtener productos
      // Por ahora, usamos datos de ejemplo para que puedas ver el panel
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: () =>
                Promise.resolve([
                  {
                    _id: "1",
                    name: "Clean Code",
                    stock: 10,
                    description: "Un manual fundamental para programadores.",
                    category: "Programación",
                    author: "Robert C. Martin",
                    image:
                      "https://images-na.ssl-images-amazon.com/images/I/41xR-c7R-6L._SY445_SX342_QL70_FMjpg_.jpg",
                    lastStockControlDate: "2025-06-30",
                  },
                  {
                    _id: "2",
                    name: "Dune",
                    stock: 5,
                    description:
                      "Un clásico de ciencia ficción sobre una guerra por un planeta desértico.",
                    category: "Ciencia Ficción",
                    author: "Frank Herbert",
                    image:
                      "https://images-na.ssl-images-amazon.com/images/I/51Wl8gHl4EL._SY445_SX342_QL70_FMjpg_.jpg",
                    lastStockControlDate: "2025-06-29",
                  },
                ]),
            }),
          1000
        )
      );

      if (!response.ok) {
        throw new Error("No se pudieron cargar los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      // Aquí podrías mostrar un mensaje de error en la UI
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

  // **Funciones para manejar el CRUD de productos (faltan las llamadas a la API)**
  const addProduct = (newProduct) => {
    // TODO: Aquí implementaremos la llamada a la API POST /api/products
    console.log("Añadir nuevo producto (TODO: API POST):", newProduct);
    // Después de la llamada exitosa, volvemos a cargar los datos
    fetchProducts();
  };

  const updateProduct = (updatedProduct) => {
    // TODO: Aquí implementaremos la llamada a la API PUT /api/products/:id
    console.log("Actualizar producto (TODO: API PUT):", updatedProduct);
    // Después de la llamada exitosa, volvemos a cargar los datos
    fetchProducts();
  };

  const deleteProduct = (productId) => {
    // TODO: Aquí implementaremos la llamada a la API DELETE /api/products/:id
    console.log("Eliminar producto con ID (TODO: API DELETE):", productId);
    // Después de la llamada exitosa, volvemos a cargar los datos
    fetchProducts();
  };

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="text-white text-center mt-5">Cargando productos...</div>
    );
  }

  return (
    <div>
      <div className={styles.adminContainer}>
        <h1>Administrar Stock de la Librería</h1>
        <button
          className={styles.newMovieButton} // Puedes cambiar el nombre de esta clase CSS
          onClick={() => openModal(null)}
        >
          Nuevo Producto
        </button>
        {/* Usamos el nuevo componente ProductTable, que aún no hemos creado */}
        <ProductTable
          products={products}
          onDelete={deleteProduct}
          onEdit={openModal}
        />
      </div>
      {/* Usamos el nuevo componente AddProductModal, que aún no hemos creado */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addProduct={addProduct}
        updateProduct={updateProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default AdminPage;
