// src/component/OfferSection.jsx
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";
import "../css/OfferSection.css"; // Este CSS debe estar correcto para las ofertas
import { Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const OfferSection = () => {
  const [offerBooks, setOfferBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función auxiliar para mezclar un array
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    const fetchOfferBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const allBooks = await getAllProducts();

        // Filtrar libros con rating 1, 2 o 3
        const lowRatingBooks = allBooks.filter(
          (book) => book.rating >= 1 && book.rating <= 3
        );

        // Mezclar y tomar hasta 6 libros aleatorios para las ofertas
        const shuffledBooks = shuffleArray([...lowRatingBooks]);
        const selectedOfferBooks = shuffledBooks.slice(0, 6);

        setOfferBooks(selectedOfferBooks);
      } catch (err) {
        console.error("Error al cargar libros de oferta:", err);
        setError("No se pudieron cargar las ofertas.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfferBooks();
  }, []);

  if (loading) {
    return (
      <div className="offer-section-container text-center text-white">
        Cargando ofertas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-section-container text-center text-danger">
        Error: {error}
      </div>
    );
  }

  if (offerBooks.length === 0) {
    return (
      <div className="offer-section-container text-center text-white">
        No hay ofertas disponibles en este momento.
      </div>
    );
  }

  // Agrupamos los libros de 4 en 4 para el carrusel (según tu requisito)
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const bookChunks = chunkArray(offerBooks, 4); // Aseguramos 4 libros por slide aquí

  // Define el porcentaje de descuento aquí para usarlo en el cálculo
  const DISCOUNT_PERCENTAGE = 0.15; // 15% de descuento

  return (
    <div className="offer-section-carousel-wrapper">
      <h2 className="text-warning text-center mb-4">¡Ofertas Imperdibles!</h2>
      <Carousel interval={null} indicators={false}>
        {bookChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center gap-4">
              {chunk.map((book) => {
                const originalPrice = book.price;
                const discountedPrice =
                  originalPrice * (1 - DISCOUNT_PERCENTAGE);

                return (
                  <Card
                    key={book._id}
                    className="offer-book-item bg-dark text-white p-0 overflow-hidden"
                  >
                    <div className="offer-image-wrapper">
                      {/* El Link ahora solo envuelve la imagen y el badge */}
                      <Link
                        to={{
                          pathname: `/products/${book._id}`,
                          state: {
                            isOffer: true,
                            discountPercentage: DISCOUNT_PERCENTAGE,
                          },
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={book.image}
                          alt={book.name}
                          className="offer-book-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300x450?text=Imagen+no+disponible";
                            e.target.alt = "Imagen no disponible";
                          }}
                        />
                        {/* Badge de oferta */}
                        <div className="offer-badge">
                          {Math.round(DISCOUNT_PERCENTAGE * 100)}% OFF
                        </div>
                      </Link>
                    </div>
                    {/* Este Card.Body es NUEVO y debe estar AQUÍ, fuera del Link */}
                    <Card.Body className="offer-card-body d-flex flex-column justify-content-end p-2">
                      <Card.Title className="text-white text-center mb-1">
                        <small>{book.name}</small>
                      </Card.Title>
                      <div className="price-container text-center mt-auto">
                        {/* Precio original tachado en ROJO */}
                        <span className="original-price text-danger">
                          {new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(originalPrice)}
                        </span>
                        <br />
                        {/* Precio con descuento en VERDE */}
                        <span className="discounted-price text-success fw-bold fs-5">
                          {new Intl.NumberFormat("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(discountedPrice)}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default OfferSection;
