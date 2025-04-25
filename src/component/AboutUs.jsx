import React, { useEffect, useState } from "react";
import "../css/AboutUs.css";

const collaborators = [
  {
    name: "Lean",
    img: "/assets/lean.png",
    text: "Coding courage builds the web's future.",
  },
  {
    name: "Santi",
    img: "/assets/santi.png",
    text: "Valor in code: persistence over bugs.",
  },
  {
    name: "AiBroy",
    img: "/assets/aibroy.png",
    text: "Bravery: coding beyond the known.",
  },
];

export const AboutUs = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collaborators.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const colab = collaborators[current];

  return (
    <div className="about-us-wrapper">
      <div className="cinema-overlay">
        <h1 className="about-title">About Us</h1>
        <hr className="divider" />
        <div className="collab-card">
          <img src={colab.img} alt={colab.name} className="collab-img" />
          <div className="collab-info">
            <h2>{colab.name}</h2>
            <p>{colab.text}</p>
          </div>
        </div>
      </div>
      <div className="background-image" />
    </div>
  );
};
