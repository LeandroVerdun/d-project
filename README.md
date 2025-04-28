# Chizato Zone

**Descripción:**

Chizato Zone es una aplicación web desarrollada con React y Vite que permite a los usuarios explorar información sobre películas. La aplicación ofrece funcionalidades como la búsqueda de películas, visualización de detalles, gestión de un carrito de compras y autenticación de usuarios. Además, incluye una página de categorías y manejo de errores con una página "404".

**Tabla de Contenidos**

1.  [Características](#características)
2.  [Tecnologías Utilizadas](#tecnologías-utilizadas)
3.  [API Utilizada](#api-utilizada)
4.  [Requisitos del Sistema](#requisitos-del-sistema)
5.  [Instalación](#instalación)
6.  [Uso](#uso)
7.  [Estructura del Proyecto](#estructura-del-proyecto)
8.  [Rutas de la Aplicación](#rutas-de-la-aplicación)
9.  [Contribuciones](#contribuciones)
10. [Licencia](#licencia)
11. [Contacto](#contacto)

**Características**

- **Búsqueda de Películas:** Los usuarios pueden buscar películas utilizando la API de OMDB.
- **Detalles de Películas:** Se muestra información detallada de cada película, incluyendo sinopsis y otros datos relevantes.
- **Autenticación de Usuarios:** Funcionalidades de inicio de sesión y registro de usuarios.
- **Carrito de Compras:** Los usuarios pueden agregar y gestionar películas en un carrito de compras.
- **Página de Categorías:** Navegación por categorías de películas.
- **Manejo de Errores:** Página personalizada para errores 404.
- **Diseño Responsivo:** Interfaz de usuario adaptada a diferentes tamaños de pantalla.

**Tecnologías Utilizadas**

- React (v19.0.0)
- React Router DOM (v7.5.0)
- React Bootstrap (v2.10.9)
- Vite (v6.2.0)
- OMDB API
- CSS
- ESLint

**API Utilizada**

- **OMDB API:** Se utiliza para obtener información sobre películas. Puedes encontrar más detalles sobre la API aquí: [http://www.omdbapi.com/](http://www.omdbapi.com/) apiKey = "d511530c"

**Requisitos del Sistema**

- Node.js (versión recomendada: >=18.x)
- npm o yarn

**Instalación**

1.  Clona el repositorio:

    ```bash
    git clone [https://github.com/LeandroVerdun/d-project.git](https://github.com/LeandroVerdun/d-project.git)
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd d-project
    ```

3.  Instala las dependencias:

    ```bash
    npm install  # o yarn install
    ```

**Uso**

1.  Ejecuta la aplicación en modo de desarrollo:

    ```bash
    npm run dev  # o yarn dev
    ```

2.  Abre tu navegador y visita la URL proporcionada (generalmente `http://localhost:5173`).

3.  Para construir la aplicación para producción:

    ```bash
    npm run build # o yarn build
    ```

4.  Para previsualizar la build de producción:

    ```bash
    npm run preview # o yarn preview
    ```

**Estructura del Proyecto**

d-project/
├── index.html # Archivo HTML principal
├── src/
│ ├── main.jsx # Punto de entrada de la aplicación React
│ ├── App.jsx # Componente raíz de la aplicación
│ ├── App.css # Estilos generales de la aplicación
│ ├── index.css # Estilos globales
│ ├── useFetchMovies.jsx # Hook personalizado para obtener datos de películas
│ ├── assets/
│ │ ├── pages/ # Componentes de las páginas
│ │ │ ├── main.jsx # Página principal
│ │ │ ├── Error404.jsx # Página de error 404
│ │ ├── layout/ # Componentes de layout (Navbar, Footer)
│ │ │ ├── navbar.jsx
│ │ │ ├── Footer.jsx
│ │ ├── component/ # Componentes reutilizables
│ │ │ ├── Login.jsx # Página de inicio de sesión
│ │ │ ├── Register.jsx # Página de registro
│ │ │ ├── CartPage.jsx # Página del carrito
│ │ │ ├── Categories.jsx # Página de categorías
│ │ ├── ... # Otros archivos y directorios
│ │

├── package.json # Archivo de configuración de npm
├── package-lock.json # Archivo de bloqueo de dependencias
├── vite.config.js # Archivo de configuración de Vite
├── eslint.config.js # Archivo de configuración de ESLint
└── README.md # Este archivo

**Rutas de la Aplicación**

- `/` : Página principal (MainPage)
- `/login` : Página de inicio de sesión (Login)
- `/register` : Página de registro (RegistrationForm)
- `/cart` : Página del carrito de compras (CartPage)
- `/categories` : Página de categorías (Categories)
- `/*` : Página de error 404 (NoFound)

**Contribuciones**

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una rama con tu funcionalidad (`git checkout -b feature/mi-nueva-funcionalidad`).
3.  Realiza los cambios y commitealos (`git commit -m 'Agrega una nueva funcionalidad'`).
4.  Sube los cambios a la rama (`git push origin feature/mi-nueva-funcionalidad`).
5.  Crea un Pull Request.

**Licencia**

Este proyecto está bajo la Licencia [MIT](https://opensource.org/licenses/MIT).

**Contacto**

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a [tu_correo@ejemplo.com](mailto:tu_correo@ejemplo.com) o a través de los issues del repositorio.
