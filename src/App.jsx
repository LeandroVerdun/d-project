import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./assets/pages/main";
import { Navbar } from "./assets/layout/navbar";
import { Footer } from "./assets/layout/Footer";
import Categories from "./component/Categories";
import NoFound from "./assets/pages/Error404";
import AdminPage from "./component/admin/AdminPage";
import SearchResult from "./component/SearchResult";
import Descripcion from "./component/Description";
import CartPage from "./component/CartPage";
import Register from "./component/Register";
import Login from "./component/Login";
import { UserAdmin } from "./component/UserAdmin";
import MyPurchases from "./component/MyPurchases";
import { ProtectedUserAdmin } from "./component/ProtectedUserAdmin";
import Play from "./component/Play";
import Profile from "./component/Profile"; // Importación del componente Profile
import { AboutUs } from "./component/AboutUs"; // Importación de AboutUs

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/descripcion/:id" element={<Descripcion />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypurchases" element={<MyPurchases />} />
        <Route path="/404" element={<NoFound />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUs />} /> {/* Nueva ruta para AboutUs */}
        <Route path="*" element={<NoFound />} />
        <Route path="/useradmin" element={
          <ProtectedUserAdmin>
            <UserAdmin />
          </ProtectedUserAdmin>
        } />
        <Route path="/play" element={<Play />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
