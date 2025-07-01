import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes de la app con rutas y tipos de importación corregidos
// NOTA: Hemos quitado las llaves {} porque ahora esperamos exportaciones por defecto
import Login from "./component/Login"; // ¡CORREGIDO!
import Register from "./component/Register"; // ¡CORREGIDO!
import NotFound from "./assets/pages/Error404"; // ¡CORREGIDO!
import Navbar from "./assets/layout/navbar";
import Footer from "./assets/layout/Footer";

// Importamos AdminPage ya refactorizado
import AdminPage from "./component/admin/AdminPage";

// Importamos el componente de ruta protegida (ruta confirmada por ti)
import { ProtectedUserAdmin } from "./component/ProtectedUserAdmin";

// NUEVOS COMPONENTES para la librería (los refactorizaremos a continuación)
import ProductList from "./component/products/ProductList";
import ProductDetail from "./component/products/ProductDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />{" "}
          {/* Renderiza el componente Register */}
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
