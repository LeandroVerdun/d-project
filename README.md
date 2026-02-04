# Chisato Zone 📚  
**Fullstack Bookstore / E-commerce App**

Chisato Zone es una aplicación web fullstack orientada a la venta y gestión de libros.
Implementa control de stock, autenticación de usuarios, roles de administrador y gestión de órdenes de compra.

El proyecto fue desarrollado en conjunto con otro desarrollador como una experiencia colaborativa,
aplicando buenas prácticas de arquitectura frontend y backend.

## 🚀 Demo
- Frontend: [https://chisato-lib2.netlify.app](https://chisato-lib2.netlify.app)
- Backend API: [https://chizatoback.onrender.com](https://chizatoback.onrender.com)

## 🧠 Qué demuestra este proyecto
- Arquitectura frontend / backend desacoplada
- Autenticación y autorización con JWT (usuarios y administradores)
- CRUD completo con reglas de negocio reales
- Control de stock y validaciones en tiempo real
- Gestión de órdenes con estados
- Consumo de API REST desde React
- Deploy en producción

## ✨ Funcionalidades Principales

El sistema se divide en dos roles principales: Administrador y Usuario, cada uno con funcionalidades específicas.

👨‍💼 Administrador

- **Gestión Completa de libros (CRUD)**:
  - **Crear**: Añadir nuevos libros con detalles (nombre, stock, descripción, fecha de último control).
  - **Leer**: Visualizar todos los libros, con opciones de filtrado por categoría. Vista detallada de cada producto.
  - **Actualizar**: Modificar la información de libros existentes (stock, precio, descripción).
  - **Eliminar**: Dar de baja libros del inventario.
  - _Nota_: Todas las operaciones CRUD están protegidas y requieren autenticación y autorización de administrador.
- **Administración de Usuarios**:
  - Visualizar y listar todos los usuarios registrados.
  - Capacidad de eliminar o suspender cuentas de usuario.
  - Funcionalidad para otorgar o revocar roles de administrador a usuarios existentes.

👤 Usuario

- **Registro y Autenticación**: Proceso seguro de creación de cuentas y inicio de sesión.
- **Exploración de libros**: Navegación intuitiva por el catálogo de libros con filtros por categorías.
- **Proceso de Compra**:
  - Gestión del carrito de compras (selección de libros).
  - Proceso de checkout y confirmación de compra.
- **Historial de Compras**: Acceso a un listado detallado de todas las órdenes realizadas, incluyendo libros, cantidades, precios unitarios y el estado de cada pedido.

📄 Secciones adicionales

- **Quiénes Somos**: Información sobre el negocio.
- **Contacto**: Canales de comunicación para soporte o consultas.

## ⚙️ Especificaciones Técnicas y Arquitectura

El proyecto está diseñado con una arquitectura cliente-servidor (frontend y backend desacoplados), lo que permite un desarrollo independiente, mayor escalabilidad y facilidad de mantenimiento.

### 🌐 Frontend

- **Tecnologías**:
  - React.js, React Router DOM
  - Bootstrap y CSS personalizado
  - Axios para comunicación con la API
  - Arquitectura basada en componentes y servicios
  - Manejo de estado con useState y efectos con useEffect
- **Estructura principal (src/)**:
  - `assets/`: recursos estáticos.
  - `component/`: componentes reutilizables.
  - `css/`: estilos personalizados.
  - `services/`: lógica de consumo de API.
  - `App.jsx`/`main.jsx`: estructura principal y ruteo.

### 💻 Backend

- **Tecnologías**:
  - Node.js, Express.js
  - MongoDB + Mongoose
  - Autenticación con JWT
  - Hashing de contraseñas con Bcrypt
- **Arquitectura**:
  - **`models/`**: esquemas y lógica de datos.
  - **`controllers/`**: lógica de negocio.
  - **`routes/`**: definición de endpoints.
  - **`middleware/`**: autenticación, autorización y manejo de errores.
 
## 🤝 Gestión del Proyecto y Buenas Prácticas


- Control de versiones con Git y GitHub
- Trabajo colaborativo
- Diseño responsivo
- Validaciones en frontend y backend
- Manejo centralizado de errores
- Uso correcto de códigos de estado HTTP

## 🚀 Cómo Ejecutar el Proyecto

- Node.js (v14+)
- npm o Yarn
- MongoDB (local o Atlas)

 Backend:

1.  git clone <URL_DEL_REPOSITORIO_BACKEND>
    
2.  cd <backend>

3.  npm install
   
4.  npm start

Variables de entorno:

env

PORT=5000
MONGO_URI=tu_uri
JWT_SECRET=tu_secreto


Frontend:

1.  git clone <URL_DEL_REPOSITORIO_FRONTEND>

2.  cd <frontend>

3.  npm install
  
4.  npm start

env

REACT_APP_BACKEND_URL=https://chizatoback.onrender.com/api


## 📞 Contacto

Para cualquier consulta o colaboración, no dudes en contactarme.

---
