import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ title, image, link }) => {
  return (
    <Link to={link} className="col-12 col-md-4 d-flex text-decoration-none">
      <div className="card text-bg-dark card-carousel-mobile">
        <img src={image} className="card-img-top img-publicidad" alt={title} />
        <div className="card-img-overlay d-flex align-items-center justify-content-center">
          <h5 className="card-title fs-1">{title}</h5>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
