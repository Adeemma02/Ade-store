import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../ProductContext";
import { Helmet } from "react-helmet";

const AddProductForm = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    category: "",
    currentPrice: "",
    previousPrice: "",
    description: "",
    tags: "",
    image: null, // Changed to store File object or base64 string
  });
  const [imagePreview, setImagePreview] = useState(null); // For displaying image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      currentPrice: parseFloat(product.currentPrice),
      previousPrice: product.previousPrice
        ? parseFloat(product.previousPrice)
        : null,
      tags: product.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    addProduct(newProduct);
    navigate("/vendor-dashboard/products");
  };

  return (
    <div>
      <Helmet>
        <title>Add Product - Vendor Dashboard</title>
        <meta
          name="description"
          content="Add a new product to your vendor catalog."
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Current Price (₦)
            </label>
            <input
              type="number"
              name="currentPrice"
              value={product.currentPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Previous Price (₦, optional)
            </label>
            <input
              type="number"
              name="previousPrice"
              value={product.previousPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={product.tags}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., tech, laptop"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Choose Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            type="submit"
            className="bg-[#3D99F5] text-white px-4 py-2 rounded-md hover:bg-[#3D99F5]/80"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => navigate("/vendor-dashboard/products")}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
