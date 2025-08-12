import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const addToCart = (item) => {
  setCartItems((prev) => {
    const exists = prev.find((p) => p.id === item.id);
    if (exists) {
      return prev.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      return [...prev, item];
    }
  });
};


  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isSidebarOpen,
        setIsSidebarOpen,
        incrementQty,
        decrementQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
