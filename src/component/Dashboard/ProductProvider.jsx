import React, { useState } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Laptop",
      category: "Electronics",
      currentPrice: 999,
      previousPrice: 1099,
      description: "High-performance laptop",
      tags: ["tech", "laptop"],
      image: "https://via.placeholder.com/150", // Placeholder URL
    },
  ]);

  const addProduct = (newProduct) => {
    const processImage = (image) => {
      if (image instanceof File) {
        // Convert File to base64 for storage (or handle via backend upload)
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(image);
        });
      }
      return Promise.resolve(image); // Already a URL
    };

    processImage(newProduct.image).then((processedImage) => {
      setProducts([
        ...products,
        { id: products.length + 1, ...newProduct, image: processedImage },
      ]);
    });
  };

  const updateProduct = (id, updatedProduct) => {
    const processImage = (image) => {
      if (image instanceof File) {
        // Convert File to base64 for storage
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(image);
        });
      }
      return Promise.resolve(image); // Already a URL
    };

    processImage(updatedProduct.image).then((processedImage) => {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { id, ...updatedProduct, image: processedImage }
            : product
        )
      );
    });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
