// Paso 1: Configurar la URL base de tu backend
const BASE_URL = "http://localhost:5000/api";

// Paso 2: Crear una función para el registro de usuarios
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Verificar si la respuesta fue exitosa (código 2xx)
    if (!response.ok) {
      // Si hay un error, leer el mensaje del backend y lanzarlo
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Something went wrong during registration."
      );
    }

    // Si es exitoso, devolver la data de la respuesta (por ejemplo, el usuario creado)
    const data = await response.json();
    return data;
  } catch (error) {
    // Capturar cualquier error de red o de la petición
    console.error("Error in registerUser:", error);
    throw error; // Relanzar el error para que el componente lo maneje
  }
};

// Puedes añadir más funciones aquí más adelante, como loginUser, getProducts, etc.
// Paso 3: Crear una función para el inicio de sesión
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Incorrect email or password.");
    }

    const data = await response.json();
    return data; // Esto debería contener el token JWT y la información del usuario
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};
