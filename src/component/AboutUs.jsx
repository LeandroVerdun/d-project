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
            position: "absolute",
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
          </div>
        </div>
      </div>
    </div>
  );
};
