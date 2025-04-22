import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyPurchases.css";

export const MyPurchases = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem("purchased")) || [];
    setPurchasedItems(storedPurchases);
  }, []);

  const handleCardClick = (item) => {
    navigate("/play", { state: { item } });
  };

  return (
    <div>
      <h1 className="text-center text-uppercase fw-bold fs-3 col-11">
        My Purchases
      </h1>
      <div className="container-lg row m-auto">
        {purchasedItems.length === 0 ? (
          <p className="text-center">You have no purchases yet.</p>
        ) : (
          purchasedItems.map(item => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 mb-4"
              key={item.imdbID}
              onClick={() => handleCardClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100 border border-light my-card">
                <img src={item.Poster} className="card-img-top" alt={item.Title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.Title} ({item.size})</h5>
                  <div className="card-text-container">
                    <p className="card-text">
                      {item.Plot || 'No synopsis available.'}
                    </p>
                  </div>
                  <div className="d-flex flex-wrap mb-2">
                    {item.Genre?.split(",").map((genre, index) => (
                      <span key={index} className="badge bg-secondary me-1">
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="fw-bold">
                    {item.isRental ? 'Rented' : 'Purchased'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
