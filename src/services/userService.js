// src/services/userService.js

const API_URL = "http://localhost:5000/api/users"; // Asegúrate que esta URL sea la correcta de tu backend para usuarios

// Función auxiliar para obtener los encabezados de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Obtener todos los usuarios (solo para administradores)
export const getAllUsers = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los usuarios.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    throw error;
  }
};

// Eliminar un usuario por ID (solo para administradores)
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar el usuario.");
    }

    // La respuesta puede no tener cuerpo para DELETE exitoso (ej. 204 No Content)
    // Pero si tu backend envía un mensaje de éxito, lo puedes leer.
    const data = await response.text(); // Intenta leer como texto primero
    return data ? JSON.parse(data) : { message: "Usuario eliminado con éxito" };
  } catch (error) {
    console.error(`Error en deleteUser para ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un usuario por ID (solo para administradores)
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(), // Reutiliza la función para obtener los headers
      body: JSON.stringify(userData), // Envía los datos en formato JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el usuario.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en updateUser para ID ${id}:`, error);
    throw error;
  }
};
