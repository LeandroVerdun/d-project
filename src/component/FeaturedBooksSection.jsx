// src/components/FeaturedBooksSection.jsx
import React, { useState, useEffect } from "react";
// ¡CAMBIO CLAVE AQUÍ! Importamos getAllProducts con llaves y su nombre correcto
import { getAllProducts } from "../services/productService"; // <-- Importamos getAllProducts directamente
import "../css/FeaturedBooksSection.css";

const FeaturedBooksSection = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Iniciando la carga de libros destacados...");
        // ¡CAMBIO CLAVE AQUÍ! Llamamos a getAllProducts con su nombre correcto
        const allBooks = await getAllProducts(); // <-- Llamamos a la función directamente
        console.log("Libros recibidos de getAllProducts():", allBooks);

        // Ordenar por stock de forma descendente y tomar los primeros 3
        const sortedBooks = allBooks
          .sort((a, b) => b.stock - a.stock) // b.stock - a.stock para orden descendente
          .slice(0, 3); // Tomar solo los primeros 3 libros

        setFeaturedBooks(sortedBooks);
        console.log("Libros destacados (ordenados y limitados):", sortedBooks);
      } catch (err) {
        console.error("Error al cargar libros destacados:", err);
        setError("No se pudieron cargar los libros destacados.");
      } finally {
        setLoading(false);
        console.log("Carga de libros destacados finalizada. Loading:", false);
      }
    };

    fetchFeaturedBooks();
  }, []); // Se ejecuta solo una vez al montar el componente

  if (loading) {
    return (
      <div className="featured-books-container text-center text-white">
        Cargando libros destacados...
      </div>
    );
  }

  if (error) {
    return (
      <div className="featured-books-container text-center text-danger">
        Error: {error}
      </div>
    );
  }

  if (featuredBooks.length === 0) {
    return (
      <div className="featured-books-container text-center text-white">
        No hay libros destacados disponibles. Asegúrate de que haya libros en tu
        base de datos con stock.
      </div>
    );
  }

  return (
    <div className="featured-books-container d-flex flex-wrap justify-content-center gap-4">
      {featuredBooks.map((book) => (
        <div
          key={book._id}
          className="featured-book-item card bg-dark text-white p-0 overflow-hidden"
        >
          <img
            src={book.image}
            alt={book.name}
            className="featured-book-image card-img-top"
            // Manejo de imágenes 403: Puedes poner un placeholder si la imagen no carga
            onError={(e) => {
              e.target.onerror = null; // Evita bucles infinitos de error
              e.target.src =
                "https://via.placeholder.com/300x450?text=Imagen+no+disponible"; // URL de un placeholder
              e.target.alt = "Imagen no disponible";
            }}
          />
          <div className="featured-book-overlay d-flex flex-column justify-content-end p-3">
            <h5 className="card-title text-warning">{book.name}</h5>
            <p className="card-text">
              <small>{book.author}</small>
            </p>
            <p className="card-text featured-description">{book.description}</p>
            <span className="badge bg-primary">Stock: {book.stock}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBooksSection;
