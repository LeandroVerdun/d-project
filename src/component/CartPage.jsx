// src/pages/CartPage.jsx

import React, { useState } from 'react';

const CartPage = () => {
  // Lista de productos en el carrito (estado)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Remera YOU LOSE Estilo ANIME ALTERNATIVE',
      size: 'Oversize, L, Negro',
      price: 35900,
      quantity: 1,
      imgSrc: '../multimedia/imagenes/remera-1.jpg',
    },
    {
      id: 2,
      name: 'Remera HELL IN HEAVEN ESTILO ANIME ALTERNATIVE',
      size: 'Oversize, L, Negro',
      price: 35900,
      quantity: 1,
      imgSrc: '../multimedia/imagenes/remera-2.jpg',
    }
  ]);

  // Función para eliminar un producto del carrito
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Calcular el total del carrito
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-center text-uppercase fw-bold fs-3 col-11">
        Tu carro de la compra
      </h1>
      <div className="container-lg row m-auto">
        <section className="mis_compras col-sm-12 col-lg-8">
          {cartItems.length === 0 ? (
            <p className="text-center">Tu carrito está vacío.</p>
          ) : (
            cartItems.map(item => (
              <div className="row" key={item.id}>
                <div className="col-3">
                  <img className="img-fluid w-100" src={item.imgSrc} alt={item.name} />
                </div>
                <div className="d-flex flex-wrap justify-content-between align-items-center col-8">
                  <div className="detalles_compra">
                    <p className="fw-bold">
                      {item.name} ({item.size}) × {item.quantity}
                    </p>
                  </div>
                  <div className="d-flex precio_ropa flex-column">
                    <p className="fw-bold fs-4">${item.price.toLocaleString()}</p>
                    <button 
                      type="button" 
                      className="btn bonto_de_carrito w-100 my-2" 
                      onClick={() => handleDelete(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="col-1 text-center p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    className="bi bi-trash3 mt-4" viewBox="0 0 16 16">
                    <path
                      d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>
              </div>
            ))
          )}
        </section>
        <article className="precio_total col-sm-12 col-lg-4 border rounded p-4">
          <h2 className="text-center fs-4">Total estimado</h2>
          <div className="d-flex justify-content-between border-top my-3">
            <p>Sub total</p>
            <p>${total.toLocaleString()}</p>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-3 my-2">
            <p>TOTAL</p>
            <p>${total.toLocaleString()}</p>
          </div>
          <div className="mb-3 d-flex border">
            <input type="text" className="form-control border-0 w-75" placeholder="¿Tienes un cupón de descuento?" />
            <button type="button" className="btn boton_cupon w-25">Enviar</button>
          </div>
          <button type="button" className="btn bonto_de_carrito w-100 my-2">
            <a href="./404.html">Continuar con la compra</a>
          </button>
          <div className="w-100 mx-auto">
            <button type="button" className="btn boton_seguir_viendo w-100 my-3 mx-auto">
              <a href="../../index.html">Seguir comprando</a>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CartPage;
