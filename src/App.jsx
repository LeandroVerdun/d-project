import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./assets/pages/main";
import { Navbar } from "./assets/layout/Navbar";
import { Footer } from "./assets/layout/Footer";
import Categories from "./component/Categories";
import NoFound from "./assets/pages/Error404";
import AdminPage from "./component/admin/AdminPage"; // ¡Añadido! Importa AdminPage
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
        <Route path="*" element={<NoFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
