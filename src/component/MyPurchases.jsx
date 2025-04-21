import React, { useState, useEffect } from 'react';
import "../css/MyPurchases.css";

export const MyPurchases = () => {
  // State to store purchased items
  const [purchasedItems, setPurchasedItems] = useState([]);

  // Load purchased items from localStorage
  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem("purchased")) || [];
    setPurchasedItems(storedPurchases);
  }, []);

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
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={item.imdbID}>
              <div className="card h-100 border border-light my-card">
                <img src={item.Poster} className="card-img-top" alt={item.Title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.Title} ({item.size})</h5>
                  {/* Contenedor de la sinopsis con overflow */}
                  <div className="card-text-container">
                    <p className="card-text">
                      {item.Plot || 'No synopsis available.'} {/* Default message if no plot */}
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
