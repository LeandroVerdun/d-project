// src\services\cartService.js
import apiClient from "./api"; // Importa el cliente Axios desde api.js

// Obtener el carrito del usuario actual
export const getMyCart = async () => {
  try {
    const response = await apiClient.get("/api/cart"); // <-- ¡CAMBIO AQUÍ!
    return response.data;
  } catch (error) {
    console.error("Error en getMyCart:", error);
    throw error;
  }
};

// Añadir un producto al carrito o actualizar su cantidad
export const addOrUpdateItemInCart = async (productId, quantity) => {
  try {
    const response = await apiClient.post("/api/cart", { productId, quantity }); // <-- ¡CAMBIO AQUÍ!
    return response.data;
  } catch (error) {
    console.error("Error en addOrUpdateItemInCart:", error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeItemFromCart = async (productId) => {
  try {
    const response = await apiClient.delete(`/api/cart/${productId}`); // <-- ¡CAMBIO AQUÍ!
    return response.data;
  } catch (error) {
    console.error("Error en removeItemFromCart:", error);
    throw error;
  }
};

// Vaciar el carrito completo
export const clearMyCart = async () => {
  try {
    const response = await apiClient.delete("/api/cart"); // <-- ¡CAMBIO AQUÍ!
    return response.data;
  } catch (error) {
    console.error("Error en clearMyCart:", error);
    throw error;
  }
};
