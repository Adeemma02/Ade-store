import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart, Heart } from "lucide-react";
import { CartContext } from "../context/CartContextObject";
import { products } from "../data/products";
import Rating from "../component/Rating";

const ProductCard = ({
  product,
  isLiked,
  onToggleLike,
  onAddToCart,
  onClick,
}) => {
  const { id, name, image, rating, oldPrice, newPrice } = product;
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  return (
    <div
      className="relative flex flex-col bg-white overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 group"
      onClick={() => onClick(product)}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-32 sm:h-40 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(id);
          }}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
            isLiked
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-500"
          } shadow-sm backdrop-blur-sm`}
        >
          <Heart
            className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
              isLiked ? "fill-current" : ""
            }`}
          />
        </button>
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {discount}% OFF
        </div>
      </div>
      <div className="flex flex-col flex-grow p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>
        <div className="flex items-center mb-2">
          <Rating value={rating} size="small" />
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-sm sm:text-base">
              ₦{newPrice.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-xs sm:text-sm">
              ₦{oldPrice.toFixed(2)}
            </span>
          </div>
          <span className="text-green-600 text-xs font-medium bg-green-100 px-1.5 py-0.5 rounded-full sm:mt-0">
            {discount}% OFF
          </span>
        </div>
        <button
          type="button"
          className="mt-auto w-full bg-blue-600 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-1.5"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedProducts, setLikedProducts] = useState(new Set());
  const { addToCart, getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const lastProductRef = useRef(null);
  const productsPerPage = 10;

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Sport",
    "Health",
    "Toy",
    "Automotives",
    "Accessories",
    "Computer",
    "Wearables",
    "Camera",
  ];

  const getFilteredProducts = () => {
    if (selectedCategory === "All") return products;
    return products.filter((product) => product.category === selectedCategory);
  };

  const getProductsToShow = () => {
    const filtered = getFilteredProducts();
    return filtered.slice(0, currentIndex + productsPerPage);
  };

  const displayedProducts = getProductsToShow();

  const handleViewMore = () => {
    setCurrentIndex((prev) => prev + productsPerPage);
    const firstNewProductIndex = currentIndex;
    if (firstNewProductIndex < getFilteredProducts().length) {
      const firstNewProductElement = document.getElementById(
        `product-${getFilteredProducts()[firstNewProductIndex].id}`
      );
      if (firstNewProductElement) {
        firstNewProductElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleViewLess = () => {
    setCurrentIndex((prev) => Math.max(0, prev - productsPerPage));
    const firstPreviousProductIndex = Math.max(
      0,
      currentIndex - productsPerPage
    );
    const firstPreviousProductElement = document.getElementById(
      `product-${getFilteredProducts()[firstPreviousProductIndex].id}`
    );
    if (firstPreviousProductElement) {
      firstPreviousProductElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Reset pagination when category changes
    // Scroll to top of section
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleToggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1, "Medium");
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 left-4 right-4 bg-green-500 text-white p-3 rounded-lg z-50 text-center font-medium";
    notification.textContent = `Added "${product.name}" to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const getProductRef = (index) => {
    return index === displayedProducts.length - 1 ? lastProductRef : null;
  };

  return (
    <section
      id="products-section"
      className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-12 mx-auto bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Home
      </button>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h2>
          <p className="text-gray-600 text-sm">
            Explore our wide range of products from trusted vendors.
          </p>
          <div className="flex space-x-6">
            <div className="text-gray-500 text-sm mb-1">
              {Math.min(
                currentIndex + productsPerPage,
                getFilteredProducts().length
              )}{" "}
              of {getFilteredProducts().length} products
            </div>
            <div className="text-gray-500 text-sm">
              {likedProducts.size} liked • {getTotalItems()} in cart
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            ref={getProductRef(index)}
          >
            <ProductCard
              product={product}
              isLiked={likedProducts.has(product.id)}
              onToggleLike={handleToggleLike}
              onAddToCart={handleAddToCart}
              onClick={handleProductClick}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {currentIndex + productsPerPage < getFilteredProducts().length && (
          <button
            onClick={handleViewMore}
            className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2.5 px-6 rounded-full border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <span>
              View More (
              {getFilteredProducts().length - (currentIndex + productsPerPage)})
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {currentIndex > 0 && (
          <button
            onClick={handleViewLess}
            className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2.5 px-6 rounded-full border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <span>Show Less</span>
            <ArrowRight className="w-4 h-4 rotate-90" />
          </button>
        )}
      </div>
    </section>
  );
};

export default Products;
