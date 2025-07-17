import React, { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Grid3X3,
  List,
  ChevronDown,
  Filter,
  X,
} from "lucide-react";

// Custom Rating Component
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

// Sample product data with badges and categories
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 128,
    oldPrice: 199.99,
    newPrice: 137.99,
    discount: 31,
    badge: "Best Seller",
    badgeColor: "bg-red-500",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 89,
    oldPrice: 249.99,
    newPrice: 199.99,
    discount: 20,
    badge: "New",
    badgeColor: "bg-green-500",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes Ultra",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 245,
    oldPrice: 159.99,
    newPrice: 19.99,
    discount: 88,
    badge: null,
    category: "Sports",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 67,
    oldPrice: 89.99,
    newPrice: 79.12,
    discount: 12,
    badge: null,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Fitness Tracker Pro",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
    rating: 3.9,
    reviews: 156,
    oldPrice: 79.99,
    newPrice: 59.99,
    discount: 25,
    badge: null,
    category: "Sports",
  },
  {
    id: 6,
    name: "Digital Camera 4K",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 93,
    oldPrice: 399.99,
    newPrice: 319.99,
    discount: 20,
    badge: null,
    category: "Electronics",
  },
  {
    id: 7,
    name: "Gaming Mouse RGB",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 178,
    oldPrice: 59.99,
    newPrice: 47.99,
    discount: 20,
    badge: "Best Seller",
    badgeColor: "bg-red-500",
    category: "Electronics",
  },
  {
    id: 8,
    name: "Travel Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    rating: 4.1,
    reviews: 134,
    oldPrice: 89.99,
    newPrice: 69.99,
    discount: 22,
    badge: null,
    category: "Travel",
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 89,
    oldPrice: 39.99,
    newPrice: 29.99,
    discount: 25,
    badge: null,
    category: "Electronics",
  },
  {
    id: 10,
    name: "Noise Cancelling Earbuds",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 312,
    oldPrice: 179.99,
    newPrice: 139.99,
    discount: 22,
    badge: "New",
    badgeColor: "bg-green-500",
    category: "Electronics",
  },
  {
    id: 11,
    name: "Smartphone Case Premium",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop",
    rating: 4.0,
    reviews: 67,
    oldPrice: 29.99,
    newPrice: 19.99,
    discount: 33,
    badge: null,
    category: "Accessories",
  },
  {
    id: 12,
    name: "Portable Power Bank",
    image:
      "https://images.unsplash.com/photo-1609592142381-8c18c5bd9cb8?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 198,
    oldPrice: 49.99,
    newPrice: 39.99,
    discount: 20,
    badge: null,
    category: "Electronics",
  },
  {
    id: 13,
    name: "Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 156,
    oldPrice: 129.99,
    newPrice: 99.99,
    discount: 23,
    badge: "Best Seller",
    badgeColor: "bg-red-500",
    category: "Electronics",
  },
  {
    id: 14,
    name: "USB-C Hub Multi-Port",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop",
    rating: 4.1,
    reviews: 89,
    oldPrice: 59.99,
    newPrice: 44.99,
    discount: 25,
    badge: null,
    category: "Electronics",
  },
  {
    id: 15,
    name: "LED Desk Lamp",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 123,
    oldPrice: 69.99,
    newPrice: 49.99,
    discount: 29,
    badge: null,
    category: "Home",
  },
  {
    id: 16,
    name: "Monitor Stand Adjustable",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 234,
    oldPrice: 99.99,
    newPrice: 79.99,
    discount: 20,
    badge: null,
    category: "Home",
  },
  {
    id: 17,
    name: "Insulated Coffee Mug",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 167,
    oldPrice: 24.99,
    newPrice: 18.99,
    discount: 24,
    badge: null,
    category: "Home",
  },
  {
    id: 18,
    name: "Ceramic Plant Pot",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 78,
    oldPrice: 34.99,
    newPrice: 24.99,
    discount: 29,
    badge: "New",
    badgeColor: "bg-green-500",
    category: "Home",
  },
  {
    id: 19,
    name: "Wooden Book Stand",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    rating: 4.1,
    reviews: 45,
    oldPrice: 39.99,
    newPrice: 29.99,
    discount: 25,
    badge: null,
    category: "Home",
  },
  {
    id: 20,
    name: "Modern Wall Clock",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 134,
    oldPrice: 49.99,
    newPrice: 34.99,
    discount: 30,
    badge: null,
    category: "Home",
  },
  {
    id: 21,
    name: "Luxury Throw Pillow",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    rating: 4.2,
    reviews: 89,
    oldPrice: 29.99,
    newPrice: 22.99,
    discount: 23,
    badge: null,
    category: "Home",
  },
  {
    id: 22,
    name: "Adjustable Table Lamp",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 167,
    oldPrice: 79.99,
    newPrice: 59.99,
    discount: 25,
    badge: null,
    category: "Home",
  },
];

// Categories for filtering
const categories = [
  { name: "All", count: 22 },
  { name: "Electronics", count: 9 },
  { name: "Sports", count: 2 },
  { name: "Home", count: 8 },
  { name: "Travel", count: 1 },
  { name: "Accessories", count: 1 },
];

// Product Card Component
const ProductCard = ({
  product,
  isLiked,
  onToggleLike,
  onAddToCart,
  viewMode,
}) => {
  const {
    id,
    name,
    image,
    rating,
    reviews,
    oldPrice,
    newPrice,
    discount,
    badge,
    badgeColor,
    category,
  } = product;

  if (viewMode === "list") {
    return (
      <div className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-500 p-4">
        <div className="relative flex-shrink-0  w-32 h-32">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          {badge && (
            <span
              className={`absolute top-2 left-2 ${badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium`}
            >
              {badge}
            </span>
          )}
          {discount && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{discount}%
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(id);
            }}
            className={`absolute bottom-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
              isLiked
                ? "bg-red-100 text-red-500"
                : "bg-white/80 text-gray-400 hover:text-red-500"
            } shadow-sm`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex-1 ml-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
            <p className="text-sm text-gray-500 mb-2">{category}</p>
            <div className="flex items-center mb-2">
              <Rating value={rating} size="small" />
              <span className="text-sm text-gray-500 ml-2">
                ({reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through text-sm">
                ${oldPrice.toFixed(2)}
              </span>
              <span className="text-blue-600 font-bold text-lg">
                ${newPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 group">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 ${badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium`}
          >
            {badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(id);
          }}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isLiked
              ? "bg-red-100 text-red-500"
              : "bg-white/80 text-gray-400 hover:text-red-500"
          } shadow-sm`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
          {name}
        </h3>

        <div className="flex items-center mb-3">
          <Rating value={rating} size="small" />
          <span className="text-sm text-gray-500 ml-2">({reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 line-through text-sm">
            ${oldPrice.toFixed(2)}
          </span>
          <span className="text-blue-600 font-bold text-base">
            ${newPrice.toFixed(2)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Price Range Slider Component
const PriceRangeSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};

// Main Product Page Component
const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("grid");
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [cartItems, setCartItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice =
      product.newPrice >= priceRange[0] && product.newPrice <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.newPrice - b.newPrice;
      case "Price: High to Low":
        return b.newPrice - a.newPrice;
      case "Rating":
        return b.rating - a.rating;
      case "Newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

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
    alert(`Added "${product.name}" to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="text-sm">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Products
            </h1>
            <p className="text-gray-600">
              Showing {sortedProducts.length} products
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 space-y-6`}
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Search */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Search Products
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Price Range
                </h3>
                <PriceRangeSlider
                  min={0}
                  max={500}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.name
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-500">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isLiked={likedProducts.has(product.id)}
                    onToggleLike={handleToggleLike}
                    onAddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isLiked={likedProducts.has(product.id)}
                    onToggleLike={handleToggleLike}
                    onAddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Filter content would go here - same as sidebar */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
