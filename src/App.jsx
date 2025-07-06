<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./App.css";
=======
// App.jsx
import React from "react";
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Componentes de autenticación y protección
import Login from "./component/Login";
import Register from "./component/Register";
import { ProtectedUserAdmin } from "./component/ProtectedUserAdmin"; // Asegúrate de que esta ruta es correcta

// Componentes de Layout y Páginas principales
import NotFound from "./assets/pages/Error404";
import Navbar from "./assets/layout/navbar";
import Footer from "./assets/layout/Footer";
import { HomePage } from "./assets/pages/HomePage";

// Componentes de Productos (parte pública del sitio)
import ProductList from "./component/products/ProductList";
import ProductDetail from "./component/products/ProductDetail";
// SearchResultsPage
import SearchResultsPage from "./component/products/SearchResultsPage";

// Componente de Administración
import AdminPage from "./component/admin/AdminPage";
import UserManagementPage from "./component/admin/UserManagementPage"; // Asegúrate de que esta ruta es correcta
import AdminOrderHistoryPage from "./component/admin/AdminOrderHistoryPage"; // <--- ¡NUEVA IMPORTACIÓN!

// Componente del Carrito
import CartPage from "./component/CartPage"; // Asegúrate que esta ruta es correcta: src/component/CartPage.jsx

// ¡NUEVA IMPORTACIÓN PARA MIS COMPRAS!
import MyPurchases from "./component/MyPurchases"; // Asegúrate que esta ruta es correcta: src/component/MyPurchases.jsx

function App() {
  return (
    <Router>
      <Navbar />
<<<<<<< HEAD
      <div className="container-fluid p-0">
        <div className="container-cover">
          <div className="cover"></div>
          <div className="page-wrapper">
            <div className="routes-wrapper pt-5" style={{ minHeight: "100vh" }}>
              <div className="container d-flex justify-content-center py-4" style={{ marginTop: "13%" }}>
                <div
                  className="w-100 d-flex justify-content-center border border-white rounded-3 mb-5"
                  style={{
                    backgroundImage: "linear-gradient(to right, rgba(23, 26, 33, 0.75), rgba(45, 53, 66, 0.75))",
                  }}
                >
                  <div className="w-100" style={{ maxWidth: "70rem" }}>
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/search/:query" element={<SearchResult />} />
                        <Route path="/descripcion/:id" element={<Descripcion />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/mypurchases" element={<MyPurchases />} />
                        <Route path="/404" element={<NoFound />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/terms-of-service" element={<TermsofService />} />
                        <Route
                          path="/useradmin"
                          element={
                            <ProtectedUserAdmin>
                              <UserAdmin />
                            </ProtectedUserAdmin>
                          }
                        />
                        <Route path="/play" element={<Play />} />
                        <Route path="*" element={<NoFound />} />
                      </Routes>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Componentes de autenticación y protección
import Login from "./component/Login";
import Register from "./component/Register";
import { ProtectedUserAdmin } from "./component/ProtectedUserAdmin";
// Si tenés ProtectedUser para usuarios normales, importalo aquí:
// import { ProtectedUser } from "./component/ProtectedUser";

// Componentes de Layout y Páginas principales
import NotFound from "./assets/pages/Error404";
import Navbar from "./assets/layout/navbar";
import Footer from "./assets/layout/Footer";
import { HomePage } from "./assets/pages/HomePage";
import AboutUs from "./component/AboutUs"; 
import { TermsofService } from "./component/TermsofService";


// Componentes de Productos (parte pública)
import ProductList from "./component/products/ProductList";
import ProductDetail from "./component/products/ProductDetail";
import SearchResultsPage from "./component/products/SearchResultsPage";

// Componentes de administración
import AdminPage from "./component/admin/AdminPage";
import UserManagementPage from "./component/admin/UserManagementPage";
import AdminOrderHistoryPage from "./component/admin/AdminOrderHistoryPage";

// Componente carrito
import CartPage from "./component/CartPage";

// Compras
import MyPurchases from "./component/MyPurchases";

// Perfil
import Profile from "./component/profile";

// Olvidaste tu contraseña

import ForgotPassword from "./component/ForgotPassword";

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ backgroundColor: "black", minHeight: "100vh" }}
            className="d-flex justify-content-center align-items-center">
        <div className="container py-5 border border-white rounded mt-4 mb-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/search/books/:query" element={<SearchResultsPage />} />
            <Route path="/mypurchases" element={<MyPurchases />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsofService />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/admin/stock"
              element={
                <ProtectedUserAdmin>
                  <AdminPage />
                </ProtectedUserAdmin>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedUserAdmin>
                  <AdminPage />
                </ProtectedUserAdmin>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedUserAdmin>
                  <UserManagementPage />
                </ProtectedUserAdmin>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedUserAdmin>
                  <AdminOrderHistoryPage />
                </ProtectedUserAdmin>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
</main>

>>>>>>> backup-local-cambios
=======
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Ruta para el Carrito */}
          <Route path="/cart" element={<CartPage />} />
          {/* NUEVA RUTA PARA BÚSQUEDA */}
          <Route path="/search/books/:query" element={<SearchResultsPage />} />

          {/* ¡NUEVA RUTA PARA MIS COMPRAS DEL USUARIO! */}
          {/* Esta ruta NO necesita ProtectedUserAdmin, ya que es para usuarios normales */}
          <Route path="/mypurchases" element={<MyPurchases />} />

          {/* Rutas protegidas para administradores */}
          <Route
            path="/admin"
            element={
              <ProtectedUserAdmin>
                <AdminPage />
              </ProtectedUserAdmin>
            }
          />
          <Route
            path="/admin/users" // Ruta para la gestión de usuarios
            element={
              <ProtectedUserAdmin>
                <UserManagementPage />
              </ProtectedUserAdmin>
            }
          />
          <Route
            path="/admin/orders" // <--- ¡NUEVA RUTA PARA EL HISTORIAL DE ÓRDENES DE ADMINISTRADOR!
            element={
              <ProtectedUserAdmin>
                <AdminOrderHistoryPage />
              </ProtectedUserAdmin>
            }
          />

          {/* Ruta 404 para cualquier otra cosa */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
>>>>>>> e15b98533c8a38368c98fefbab410f256d85b0f4
      <Footer />
    </Router>
  );
}

export default App;
