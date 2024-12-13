import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0 };
  });

  const updateCart = (updatedCart) => {
    const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);

    const newCartState = { items: updatedCart, totalQuantity };
    setCartItems(newCartState);

    localStorage.setItem('cart', JSON.stringify(newCartState));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems: updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
