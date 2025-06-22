import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ShoppingCart,
  Heart,
  Star,
  X,
  Plus,
  Minus,
  Eye,
  Share,
  ShieldCheck,
  Truck,
} from "lucide-react";

// Custom Rating Component (unchanged)
const Rating = ({ value, size = "small" }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={`${
            size === "small" ? "w-4 h-4" : "w-5 h-5"
          } fill-yellow-400 text-yellow-400`}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <Star
            className={`${
              size === "small" ? "w-4 h-4" : "w-5 h-5"
            } text-gray-300`}
          />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              className={`${
                size === "small" ? "w-4 h-4" : "w-5 h-5"
              } fill-yellow-400 text-yellow-400`}
            />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`${
            size === "small" ? "w-4 h-4" : "w-5 h-5"
          } text-gray-300`}
        />
      );
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

// Generate similar images for a product (unchanged)
const generateSimilarImages = (baseImage, productName) => {
  const images = [baseImage];
  for (let i = 1; i <= 3; i++) {
    const modifiedUrl = baseImage.replace(
      "?w=400&h=300&fit=crop",
      `?w=400&h=300&fit=crop&sat=${i * 10}&hue=${i * 20}`
    );
    images.push(modifiedUrl);
  }
  return images;
};

// Enhanced product data with descriptions (unchanged)
const enhanceProduct = (product) => ({
  ...product,
  description: `Premium ${product.name.toLowerCase()} with advanced features and modern design. Perfect for everyday use with excellent build quality and performance.`,
  features: [
    "High-quality materials",
    "Modern design",
    "Easy to use",
    "Durable construction",
  ],
  inStock: Math.floor(Math.random() * 50) + 10,
  shipping: "Free shipping on orders over $50",
  warranty: "1 year warranty included",
});

// Sample product data (fixed image URL)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.5,
    oldPrice: 99.99,
    newPrice: 79.99,
  },
  {
    id: 2,
    name: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.0,
    oldPrice: 149.99,
    newPrice: 129.99,
  },
  {
    id: 3,
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    rating: 4.7,
    oldPrice: 120.0,
    newPrice: 90.0,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    rating: 4.3,
    oldPrice: 89.99,
    newPrice: 69.99,
  },
  {
    id: 5,
    name: "Fitness Tracker",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
    rating: 3.8,
    oldPrice: 59.99,
    newPrice: 49.99,
  },
  {
    id: 6,
    name: "Digital Camera",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    rating: 4.6,
    oldPrice: 299.99,
    newPrice: 249.99,
  },
].map(enhanceProduct);

// Product Modal Component (fixed <gosubdiv> typo)
const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isLiked,
  onToggleLike,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");

  const similarImages = generateSimilarImages(product.image, product.name);
  const discount = Math.round(
    ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
  );

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity, selectedSize });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={similarImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onToggleLike(product.id)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                  isLiked
                    ? "bg-red-100 text-red-500"
                    : "bg-white/80 text-gray-400"
                } shadow-sm backdrop-blur-sm`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {similarImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <Rating value={product.rating} size="large" />
              <span className="text-sm text-gray-500">
                ({product.rating}) • 127 reviews
              </span>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.newPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded-full">
                  {discount}% OFF
                </span>
              </div>
              <div className="text-sm text-green-600 font-medium">
                Save ${(product.oldPrice - product.newPrice).toFixed(2)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Size</h3>
              <div className="flex gap-2">
                {["Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.inStock} in stock)
                </span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-500" />
                {product.shipping}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                {product.warranty}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4 text-purple-500" />
                24/7 Support
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ${(product.newPrice * quantity).toFixed(2)}
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share className="w-5 h-5" />
                Share Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProductCard Component (unchanged from previous optimization)
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
      className="relative flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 group"
      onClick={() => onClick(product)}
    >
      {/* Product Image with Heart Icon */}
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

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-3 sm:p-4">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center mb-2">
          <Rating value={rating} size="small" />
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>

        {/* Prices */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-sm sm:text-base">
              ${newPrice.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-xs sm:text-sm">
              ${oldPrice.toFixed(2)}
            </span>
          </div>
          <span className="text-green-600 text-xs font-medium bg-green-100 px-1.5 py-0.5 rounded-full sm:mt-0">
            {discount}% OFF
          </span>
        </div>

        {/* Mobile-Optimized Add to Cart Button */}
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

const Deal = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const lastProductRef = useRef(null);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine how many products to show
  const getProductsToShow = () => {
    if (showAll) return products;
    return isMobile ? products.slice(0, 4) : products.slice(0, 6);
  };

  const displayedProducts = getProductsToShow();

  const toggleShowAll = () => {
    if (showAll) {
      const lastVisibleIndex = isMobile ? 3 : 5;
      const lastProductElement = document.getElementById(
        `product-${products[lastVisibleIndex].id}`
      );
      if (lastProductElement) {
        lastProductElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
    setShowAll((prev) => !prev);
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
    setCartItems((prev) => [...prev, product]);
    if (isMobile) {
      const notification = document.createElement("div");
      notification.className =
        "fixed bottom-4 left-4 right-4 bg-green-500 text-white p-3 rounded-lg z-50 text-center font-medium";
      notification.textContent = `Added "${product.name}" to cart!`;
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 2000);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-12 mx-auto bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            🔥 Hot Deals
          </h2>
          <p className="text-gray-600 text-sm">
            Discover amazing products at unbeatable prices
          </p>
        </div>

        {/* Mobile-friendly stats */}
        <div className="text-right text-sm">
          <div className="text-gray-500 mb-1">
            {displayedProducts.length} of {products.length} products
          </div>
          <div className="text-gray-500">
            {likedProducts.size} liked • {cartItems.length} in cart
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            ref={
              index === (isMobile ? 3 : 5) && !showAll ? lastProductRef : null
            }
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

      {/* View More/Less Button */}
      <div className="flex justify-center">
        <button
          onClick={toggleShowAll}
          className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2.5 px-6 rounded-full border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
        >
          {showAll ? (
            <>
              <span>Show Less</span>
              <ArrowRight className="w-4 h-4 rotate-90" />
            </>
          ) : (
            <>
              <span>
                View More ({products.length - displayedProducts.length})
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={showModal}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
          isLiked={likedProducts.has(selectedProduct.id)}
          onToggleLike={handleToggleLike}
        />
      )}
    </section>
  );
};

export default Deal;
