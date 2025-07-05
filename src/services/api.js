import axios from "axios";

// Paso 1: Configurar la URL base de tu backend
const API_BASE_URL = "http://localhost:5000/api"; // Asegúrate que esta URL sea la correcta de tu backend

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
      // Opcional: limpiar el token y redirigir
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Funciones de Autenticación (movidas y adaptadas a Axios)
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    return response.data; // Esto debería contener el token JWT y la información del usuario
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

export default apiClient; // Exporta la instancia de Axios para usarla en otros servicios
