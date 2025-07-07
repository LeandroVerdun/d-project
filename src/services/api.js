// C:\Users\Usuario\Desktop\Rolling Code School\Proyecto final\d-project\src\services\api.js
import axios from "axios";

// Paso 1: Configurar la URL base de tu backend
export const API_BASE_URL = "https://chizatoback.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Paso 2: Configurar un interceptor para añadir el token JWT a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Paso 3: Configurar un interceptor para manejar errores de respuesta comunes
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Aquí puedes manejar errores globales, como redireccionar al login si el token expira
    if (error.response && error.response.status === 401) {
      console.error("Error 401: No autorizado. Redirigiendo al login...");
    }
    return Promise.reject(error);
  }
);

// Funciones de Autenticación (movidas y adaptadas a Axios)
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/api/users/register", userData); // ¡CORREGIDO!
    return response.data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/api/users/login", credentials);
    return response.data; // Esto debería contener el token JWT y la información del usuario
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export default apiClient;
