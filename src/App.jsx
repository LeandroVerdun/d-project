import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Componentes de autenticación y protección
import Login from "./component/Login";
import Register from "./component/Register";
import { ProtectedUserAdmin } from "./component/ProtectedUserAdmin"; // Asegúrate que esta ruta es correcta y que es una exportación nombrada

// Componentes de Layout y Páginas principales
import NotFound from "./assets/pages/Error404";
import Navbar from "./assets/layout/navbar";
import Footer from "./assets/layout/Footer";
import { HomePage } from "./assets/pages/HomePage";

// Componentes de Productos (parte pública del sitio)
import ProductList from "./component/products/ProductList";
import ProductDetail from "./component/products/ProductDetail";

// Componente de Administración
import AdminPage from "./component/admin/AdminPage";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/products" element={<ProductList />} />{" "}
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* La ruta principal del panel de administración */}
          <Route
            path="/admin"
            element={
              <ProtectedUserAdmin>
                <AdminPage />
              </ProtectedUserAdmin>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
