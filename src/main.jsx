import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importar BrowserRouter y Routes
import { MainPage } from "./assets/pages/main";
import Login from "./assets/pages/Login";
import RegistrationForm from "./assets/pages/Register";
import CartPage from "./component/CartPage";
import { Navbar } from "./assets/layout/navbar";
import { Footer } from "./assets/layout/Footer";
import Pueba from "./assets/pages/Pueba";
import Categories from "./component/Categories";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/prueba" element={<Pueba />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
      <Footer />
    </Router>
  </StrictMode>
);
