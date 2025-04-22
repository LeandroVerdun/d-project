import React, { useState, useEffect } from "react";
import { MovieCarousel } from "../../component/MovieCarousel";
import { useFetchMovies } from "../../hook/useFetchMovies";
import PrincipalCategorias from "../../component/PrincipalCategorias";
import "../../css/MainPage.css";

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
        localStorage.setItem("adminCreated", "true"); // ✅ Marca que ya se creó
        console.log("✅ Usuario administrador creado automáticamente");
      }
    }
  }, []);

  return (
    <>
      <div>
        <h1>Bienvenido a la página principal</h1>
        <MovieCarousel />
        <PrincipalCategorias />
      </div>
    </>
  );
};
