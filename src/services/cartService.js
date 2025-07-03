// src/services/cartService.js

const API_URL = "http://localhost:5000/api/cart"; // La URL base de tus rutas de carrito en el backend

// Función auxiliar para obtener los encabezados de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No autorizado: No se encontró token.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Obtener el carrito del usuario actual
export const getMyCart = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener el carrito.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getMyCart:", error);
    throw error;
  }
};

// Añadir un producto al carrito o actualizar su cantidad
export const addOrUpdateItemInCart = async (productId, quantity) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          "Error al añadir/actualizar producto en el carrito."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en addOrUpdateItemInCart:", error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeItemFromCart = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al eliminar producto del carrito."
      );
    }

    const data = await response.json();
    return data
      ? data
      : { message: "Producto eliminado del carrito exitosamente." };
  } catch (error) {
    console.error("Error en removeItemFromCart:", error);
    throw error;
  }
};

// Vaciar el carrito completo
export const clearMyCart = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al vaciar el carrito.");
    }

    const data = await response.json();
    return data ? data : { message: "Carrito vaciado exitosamente." };
  } catch (error) {
    console.error("Error en clearMyCart:", error);
    throw error;
  }
};

// NOTA: La función para "finalizar compra" o "checkout" se implementará más adelante,
// una vez que el manejo básico del carrito esté operativo en el frontend.
