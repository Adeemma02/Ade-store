import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Edit, Trash2 } from "lucide-react";
import { ProductContext } from "../../ProductContext";
import { Helmet } from "react-helmet";

const Products = () => {
  const { products, deleteProduct } = useContext(ProductContext);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      (filter === "All" || product.category === filter) &&
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Manage Products - Vendor Dashboard</title>
        <meta
          name="description"
          content="Manage your product listings as a vendor."
        />
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#3D99F5]">Manage Products</h2>
        <Link
          to="/vendor-dashboard/products/add"
          className="bg-[#3D99F5] text-white px-4 py-2 rounded-md hover:bg-[#3D99F5]/80"
        >
          Add New Product
        </Link>
      </div>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-sm relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-xl font-bold text-green-600">
                ₦{product.currentPrice}
              </p>
              {product.previousPrice && (
                <p className="text-sm line-through text-gray-500">
                  ₦{product.previousPrice}
                </p>
              )}
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500">
                Tags: {product.tags.join(", ")}
              </p>
              <div className="flex space-x-2 mt-4">
                <Link
                  to={`/vendor-dashboard/products/edit/${product.id}`}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={`Edit ${product.title}`}
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Delete ${product.title}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
