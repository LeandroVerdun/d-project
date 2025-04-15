// src/context/CartContext.js

import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (movie) => {
    setCartItems([...cartItems, movie]);
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => {
  return useContext(CartContext);
};
