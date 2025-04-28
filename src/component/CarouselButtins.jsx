// src/component/CarouselButtons.jsx
import React from "react";

export const CarouselButtons = () => {
  return (
    <>
      <button
        className="btn btn-outline-light me-3"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        ◀
      </button>
      <button
        className="btn btn-outline-light ms-3"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        ▶
      </button>
    </>
  );
};
