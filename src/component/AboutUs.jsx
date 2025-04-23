import React, { useEffect, useState } from 'react';
import '../css/AboutUs.css';

const collaborators = [
  {
    name: 'Lean',
    img: '/assets/lean.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Santi',
    img: '/assets/santi.png',
    text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'AiBroy',
    img: '/assets/aibroy.png',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  },
  {
    name: 'Julian',
    img: '/assets/julian.png',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  },
];

export const AboutUs = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % collaborators.length);
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
