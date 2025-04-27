import React, { useState, useEffect } from 'react';
import "../css/Cart.css";  

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleDelete = (id) => {
    const updatedCart = cartItems.filter(item => item.imdbID !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    const purchasedItems = cartItems.map(item => ({
      ...item,
      purchased: !item.isRental,
      isRental: item.isRental,
    }));

    const purchasedStorage = JSON.parse(localStorage.getItem("purchased")) || [];
    localStorage.setItem("purchased", JSON.stringify([...purchasedStorage, ...purchasedItems]));

    localStorage.removeItem("cart");
    setCartItems([]);

    setShowThankYou(true);

    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  const total = cartItems.reduce((sum, item) => {
    const price = item.isRental ? 0.50 : 1.50;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="text-white">
      <h1 className="text-center text-uppercase fw-bold fs-3 mb-4">
        Your Shopping Cart
      </h1>
      <div className="container-lg row m-auto">
        <section className="my-purchases col-12 col-lg-7 overflow-auto" style={{ maxHeight: '600px', paddingTop: '20px', paddingBottom: '20px' }}>
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div 
                key={item.imdbID} 
                className="row align-items-center mb-4 product-container py-4"  
                style={{ height: '180px' }}  
              >
                <div className="col-3">
                  <img className="img-fluid w-100 h-auto" src={item.Poster} alt={item.Title} /> 
                </div>
                <div className="d-flex justify-content-between align-items-center col-8">
                  <div className="purchase-details">
                    <p className="fw-bold">
                      {item.Title} ({item.size}) × {item.quantity}
                    </p>
                  </div>
                  <div className="d-flex price-section flex-column">
                    <p className="fw-bold fs-4">
                      ${item.isRental ? '0.50' : '1.50'} x {item.quantity}
                    </p>
                    <button 
                      type="button" 
                      className="btn btn-dark w-100 my-2" 
                      onClick={() => handleDelete(item.imdbID)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="col-1 text-center p-0">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="25" 
                    height="25" 
                    fill="currentColor"
                    className="bi bi-trash3 mt-4" 
                    viewBox="0 0 16 16"
                    onClick={() => handleDelete(item.imdbID)}
                    style={{ cursor: 'pointer' }}
                  >
                    <path
                      d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </section>

        <article className="total-price col-12 col-lg-4 border rounded p-4">
          <h2 className="text-center fs-4">Estimated Total</h2>
          <div className="d-flex justify-content-between border-top my-3">
            <p>Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-3 my-2">
            <p>TOTAL</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="mb-3 d-flex border">
            <input type="text" className="form-control border-0 w-75" placeholder="Do you have a discount coupon?" />
            <button type="button" className="btn btn-secondary w-25">Submit</button>
          </div>
          <button type="button" className="btn btn-dark w-100" onClick={handleCheckout}>
            Buy
          </button>
        </article>
      </div>

      {showThankYou && (
        <div className="thank-you-overlay d-flex justify-content-center align-items-center position-fixed top-0 left-0 w-100 h-100 bg-dark bg-opacity-75 text-white">
          <h2 className="thank-you-message text-center">Thank you for your purchase!</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
