import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./assets/pages/main";
import { Navbar } from "./assets/layout/navbar"; // Importación correcta
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

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Navbar /> {/* Aquí importamos el Navbar correctamente */}
      <Routes>
        {/* Rutas principales */}
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
        <Route path="/profile" element={<Profile />} /> {/* Ruta añadida para el perfil */}
        <Route path="*" element={<NoFound />} />

        {/* Rutas protegidas */}
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
