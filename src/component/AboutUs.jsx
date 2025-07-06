<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "../css/AboutUs.css";
import leanImg from "../assets/img/unnamed.jpg";
import santiImg from "../assets/img/snti.png";
import emmaImg from "../assets/img/emma.png";

const collaborators = [
  {
    name: "Lean",
    img: leanImg,
    text: (
      <ul>
        <li>Scrum Master</li>
        <li>Design</li>
        <li>Developer</li>
      </ul>
    ),
  },
  {
    name: "Santi",
    img: santiImg,
    text: (
      <ul>
        <li>Developer</li>
        <li>Testing</li>
        <li>Design</li>
      </ul>
    ),
  },
  {
    name: "Emma",
    img: emmaImg,
    text: (
      <ul>
        <li>Tester</li>
        <li>Mockup Design</li>
        <li>404 Design</li>
      </ul>
    ),
  },
];

export const AboutUs = () => {
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const animationDuration = collaborators.length * 6 * 1000;
    const timer = setTimeout(() => {
      setShowThankYou(true);
    }, animationDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-us-container d-flex justify-content-center align-items-center">
      <div className="about-us-background">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "814px",
            height: "338px",
            backgroundColor: "black",
            overflow: "hidden",
            border: "2px solid white",
            borderRadius: "8px",
            position: "relative",
            zIndex: -1,
            top: "6vh",
          }}
        >
          <div className="about-us-wrapper text-white w-100 h-100 d-flex flex-column align-items-center justify-content-center p-2 mt-5">
            {showThankYou ? (
              <div className="thank-you-message d-flex flex-column text-center">
                <h1 style={{ fontSize: "1.2rem" }}>Thank you for watching!</h1>
              </div>
            ) : (
              <div className="cinema-overlay text-center w-100">
                <h1 className="about-title" style={{ fontSize: "1.2rem" }}>
                  About Us
                </h1>
                <hr className="divider" style={{ borderColor: "white" }} />
                <div className="collab-list">
                  {collaborators.map((colab, index) => (
                    <div
                      key={index}
                      className="collab-card mb-2"
                      style={{
                        animationDelay: `${index * 6}s`,
                      }}
                    >
                      <img
                        src={colab.img}
                        alt={colab.name}
                        className="collab-img mb-1"
                      />
                      <div className="collab-info">
                        <h2
                          style={{
                            fontSize: "0.9rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {colab.name}
                        </h2>
                        <div style={{ fontSize: "0.7rem" }}>{colab.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
=======
import React from "react";
import "../css/TermsOfService.css";
import termsImage from "../assets/img/ChatGPT Image 23 abr 2025, 08_08_19 a.m..png";

const AboutUs = () => {
  return (
    <div className="terms-container">
      <div className="terms-image-container">
        <img src={termsImage} alt="Acerca de nosotros" className="terms-image" />
      </div>
      <div className="terms-content-wrapper">
        <div className="terms-content">
          <h1 className="terms-title">Acerca de Nosotros</h1>
          <hr className="terms-divider" />
          <div className="terms-scrollable">
            <p>
              <strong>Chisato Zone</strong>
              <br />

            </p>

            <p>
              En Chisato Zone nos dedicamos a ofrecer una amplia variedad de libros para todos los gustos y edades. Nuestro catálogo incluye desde clásicos de la literatura hasta las últimas novedades en distintos géneros.
            </p>

            <p>
              Nuestro objetivo es fomentar el amor por la lectura y facilitar el acceso a los mejores títulos mediante una plataforma fácil de usar y con envíos rápidos a todo el país.
            </p>

            <p>
              Ofrecemos un servicio de entrega confiable, con seguimiento en tiempo real para que puedas recibir tus libros cómodamente en la puerta de tu casa.
            </p>

            <p>
              Además, contamos con atención personalizada para ayudarte a elegir la mejor opción según tus intereses y necesidades.
            </p>

            <p>
              Gracias por elegir Chisato Zone. Estamos aquí para acompañarte en cada página.
            </p>
>>>>>>> backup-local-cambios
          </div>
        </div>
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

export default AboutUs;
>>>>>>> backup-local-cambios
