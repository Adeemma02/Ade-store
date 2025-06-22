import { useState, useEffect } from "react";
import { CartContext } from "./CartContextObject";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedSize = "Medium") => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity, selectedSize }];
      }
    });
  };

  const updateQuantity = (productId, selectedSize, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((sum, item) => sum + item.product.newPrice * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
