import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContextObject";
import {
  Heart,
  ShoppingCart,
  // Share,
  Truck,
  ShieldCheck,
  Eye,
  Plus,
  Minus,
} from "lucide-react";
import { products } from "../data/products";
import Rating from "./Rating";

const generateSimilarImages = (baseImage) => {
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

const ProductDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedImage, setSelectedImage] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return (
      <div className="text-center py-6 text-red-600">Product not found</div>
    );
  }

  const similarImages = generateSimilarImages(product.image);
  const discount = Math.round(
    ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 left-4 right-4 bg-green-500 text-white p-3 rounded-lg z-50 text-center font-medium";
    notification.textContent = `Added "${product.name}" to cart!`;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  const handleToggleLike = () => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(product.id)) {
        newLiked.delete(product.id);
      } else {
        newLiked.add(product.id);
      }
      return newLiked;
    });
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-12 mx-auto bg-gradient-to-br from-gray-50 to-blue-50">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-md">
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={similarImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleToggleLike}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                likedProducts.has(product.id)
                  ? "bg-red-100 text-red-500"
                  : "bg-white/80 text-gray-400"
              } shadow-sm backdrop-blur-sm`}
            >
              <Heart
                className={`w-5 h-5 ${
                  likedProducts.has(product.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>
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
        <div className="space-y-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <div className="flex items-center gap-4">
            <Rating value={product.rating} size="large" />
            <span className="text-sm text-gray-500">
              ({product.rating}) • 127 reviews
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-blue-600">
                ₦{product.newPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ₦{product.oldPrice.toFixed(2)}
              </span>
              <span className="bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded-full">
                {discount}% OFF
              </span>
            </div>
            <div className="text-sm text-green-600 font-medium">
              Save ₦{(product.oldPrice - product.newPrice).toFixed(2)}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
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
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ₦{(product.newPrice * quantity).toFixed(2)}
            </button>
            {/* <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Share className="w-5 h-5" />
              Share Product
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
