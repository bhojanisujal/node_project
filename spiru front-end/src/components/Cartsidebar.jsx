import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { X, Trash, Minus, Plus } from "lucide-react";
import { useCart } from "./CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const CartSidebar = () => {
   const {
    cartItems,
    isSidebarOpen,
    setIsSidebarOpen,
    removeFromCart,
    incrementQty,
    decrementQty,
    addToCart,
  } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
  const isOnAddToCartPage = location.pathname === "/cart";

  if (isOnAddToCartPage) return null;

  const freeShippingThreshold = 500;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-base font-semibold">SHOPPING CART</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping message */}
        <div className="px-4 pt-4 text-xs text-gray-700">
          <p className="mb-2">
            Almost there, add{" "}
            <span className="text-green-700 font-bold">
              ₹{Math.max(freeShippingThreshold - subtotal, 0).toFixed(2)}
            </span>{" "}
            more to get <strong>FREE SHIPPING!</strong>
          </p>
          <div className="relative w-full bg-gray-200 h-2 rounded-full mb-3">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
            <div
              className="absolute -top-4 text-lg transition-all duration-500"
              style={{ left: `calc(${shippingProgress}% - 10px)` }}
            >
              <FaTruckFast className="text-green-700" />
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {cartItems.length === 0 ? (
           
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
      alt="Empty cart"
      className="w-16 h-16 mb-4 opacity-80"
    />
    <p className="text-gray-600 text-sm mb-4">Your cart is empty.</p>
    <button
      onClick={() => {
        setIsSidebarOpen(false);
        navigate("/collection/shopeall");
      }}
      className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 text-sm rounded font-semibold"
    >
      RETURN TO SHOP
    </button>
  </div>

          ) : (
           cartItems.map((item) => (
  <div
    key={item.id}
    className="flex items-start gap-4 py-4 border-b"
  >
    <img
      src={item.productImage}
      alt={item.title}
      className="w-20 h-20 object-cover rounded-md border"
    />
    <div className="flex-1">
      <h4 className="text-sm font-medium truncate pr-2">{item.title}</h4>
      <p className="text-xs text-green-700 mt-1">{item.weight}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs line-through text-gray-400">₹399.00</span>
        <span className="text-sm text-green-600 font-bold">₹{item.price}</span>
      </div>

      <div className="flex items-center border rounded mt-2 w-fit">
        <button
          className="px-2 py-1 text-sm text-gray-700"
          onClick={() => decrementQty(item.id)}
        >
          <Minus size={14} />
        </button>
        <span className="px-3 py-1 text-sm">{item.quantity}</span>
        <button
          className="px-2 py-1 text-sm text-gray-700"
          onClick={() => incrementQty(item.id)}
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 mt-2"
      >
        <Trash size={16} />
      </button>
    </div>
  </div>
))
          )}
        </div>
        {/* Add Test Product Button */}
<div className="absolute bottom-4 left-4 z-50">
  <button
    onClick={() =>
      addToCart({
        id: Date.now(),
        title: "Natural Moringa Leaf Powder",
        price: 284,
        quantity: 1,
        weight: "100gm",
        productImage: "https://dummyimage.com/100x100/eee/aaa&text=Moringa",
      })
    }
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm"
  >
    + Add Test Product
  </button>
</div>


        {/* Checkout Sticky Footer */}
     {cartItems.length > 0 && (
  <div className="border-t px-4 py-3">
    <div className="flex justify-between text-sm font-semibold mb-2">
      <span>Subtotal:</span>
      <span>₹{subtotal.toFixed(2)}</span>
    </div>
    <button
      onClick={() => {
        setIsSidebarOpen(false);
        navigate("/cart");
      }}
      className="w-full border border-black text-black py-2 rounded mb-2 text-sm font-medium"
    >
      View Cart
    </button>
    <button
      onClick={() => {
        setIsSidebarOpen(false);
        navigate("/checkout");
      }}
      className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded text-sm font-medium"
    >
      Check Out
    </button>

    {/* Payment icons */}
    <div className="flex justify-center gap-2 mt-3">
      <img src="https://img.icons8.com/color/24/000000/amazon.png" alt="Amazon" />
      <img src="https://img.icons8.com/color/24/000000/google-pay-india.png" alt="GPay" />
      <img src="https://img.icons8.com/color/24/000000/paypal.png" alt="PayPal" />
      <img src="https://img.icons8.com/color/24/000000/mastercard.png" alt="Card" />
      <img src="https://img.icons8.com/color/24/000000/visa.png" alt="Visa" />
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default CartSidebar;
