// src/services/productService.js

const API_URL = "http://localhost:5000/api/products"; // Asegúrate que esta URL sea la correcta de tu backend

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  console.log(user);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Obtener todos los productos (Esta es la función que usa FeaturedBooksSection)
export const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los productos.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error;
  }
};

// Agregar un nuevo producto
export const addProduct = async (product) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al agregar el producto.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en addProduct:", error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el producto.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en updateProduct:", error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar el producto.");
    }
    const data = await response.json(); // Puede ser un mensaje de éxito, o el producto eliminado
    return data;
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener el producto por ID."
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getProductById para ID ${id}:`, error);
    throw error;
  }
};
