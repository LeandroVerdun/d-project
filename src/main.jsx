import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Importa el componente App
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* Renderiza el componente App que contiene el enrutamiento */}
  </StrictMode>
);
