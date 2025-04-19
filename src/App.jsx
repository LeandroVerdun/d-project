import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./assets/pages/main";
import Login from "./assets/pages/Login";
import RegistrationForm from "./assets/pages/Register";
import CartPage from "./component/CartPage";
import { Navbar } from "./assets/layout/navbar";
import { Footer } from "./assets/layout/Footer";
import Pueba from "./assets/pages/Pueba";
import Categories from "./component/Categories";
import NoFound from "./assets/pages/Error404";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/prueba" element={<Pueba />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
