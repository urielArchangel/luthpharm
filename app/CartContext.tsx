'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface Drug {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Drug[];
  addToCart: (drug: Drug) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Drug[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (drug: Drug) => {
    setCart((prev) => [...prev, drug]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
