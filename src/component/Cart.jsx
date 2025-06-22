import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContextObject";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-12 mx-auto bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        &larr; Back
      </button>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6 md:flex  md:space-x-5 md:justify-between">
          <div className="bg-white rounded-2xl overflow-y-auto max-h-100 md:h-100 h-fit  w-full shadow-md p-6">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-200 last:border-b-0"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg sm:block hidden"
                />
                {/* laptop view */}
                <div className="flex-1 sm:block hidden">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Size: {item.selectedSize}
                  </p>
                  <p className="text-sm text-gray-600">
                    ₦{item.product.newPrice.toFixed(2)} x {item.quantity} = ₦
                    {(item.product.newPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="sm:block hidden">
                  <div className="flex items-center gap-3 ">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedSize)
                      }
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* moblie view */}
                <div className="flex space-x-4 justify-between sm:hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg "
                  />
                  <div className="">
                    <div className="flex-1  ">
                      <h3 className="text-base font-semibold text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.selectedSize}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₦{item.product.newPrice.toFixed(2)} x {item.quantity} =
                        ₦{(item.product.newPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="">
                      <div className="flex items-center  gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity - 1
                              )
                            }
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedSize)
                          }
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl md:h-100  md:w-fit shadow-md p-6 md:py-10 flex flex-col justify-center items-center">
            <div className=" space-x-6 w-full flex flex-col justify-center ">
              <p className="text-sm flex items-center justify-center w-full text-gray-600">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
              <h3 className="text-lg mx-auto  font-semibold text-gray-900">
                Total: ₦{getTotalPrice()}
              </h3>
            </div>
            <button
              className="bg-blue-600 text-white mt-4 py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center "
              onClick={() => alert("Proceed to checkout (not implemented)")}
            >
              <ShoppingCart className="w-5 h-5" />
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
