// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import { MovieCarousel } from "../../component/MovieCarousel";
import { useFetchMovies } from "../../hook/useFetchMovies";
import PrincipalCategorias from "../../component/PrincipalCategorias";
import "../../css/MainPage.css";
import LogoChisato from "../../assets/img/logo-chisato-zone.png";
import CategoriesGrid from "../../component/CategoriesGrid";

const defaultAvatars = [
  "/img/avatar1.png",
  "/img/avatar2.png",
  "/img/avatar3.png"
];

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("a");
  const { movies, loading } = useFetchMovies(searchTerm, 10);

  useEffect(() => {
    const adminCreated = localStorage.getItem("adminCreated");
    if (!adminCreated) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const adminExists = existingUsers.some(user => user.username === "Chisato");

      if (!adminExists) {
        const adminUser = {
          firstName: "Chisato",
          lastName: "Nishikigi",
          username: "Chisato",
          email: "Chisato@gmail.com",
          phone: "1234567890",
          password: "1234",
          confirmPassword: "1234",
          cardNumber: "1111 2222 3333 4444",
          expirationDate: "12/25",
          securityCode: "123",
          avatar: defaultAvatars[0],
        };

        existingUsers.push(adminUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        localStorage.setItem("adminCreated", "true");
        console.log("✅ Usuario administrador creado automáticamente");
      }
    }
  }, []);

  return (
    <div className="text-white">
      {/* Logo centrado */}
      <div className="text-center px-4 pt-3">
        <img
          src={LogoChisato}
          alt="Logo principal"
          className="img-fluid"
          style={{ maxWidth: "150px" }}
        />
      </div>

      {/* Separador amarillo intenso */}
      <hr style={{ borderTop: "3px solid #FFD700", width: "60%", margin: "0 auto" }} />

      {/* Carrusel */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <MovieCarousel />
      </div>

      <br /><br />
      <hr style={{ borderTop: "3px solid #FFD700", width: "60%", margin: "0 auto" }} />
      <br /><br />

      {/* Categorías en grid */}
      <CategoriesGrid />

      <br /><br />
      <hr style={{ borderTop: "3px solid #FFD700", width: "60%", margin: "0 auto" }} />
      <br /><br />

      {/* Categorías principales */}
      <PrincipalCategorias />
    </div>
  );
};
