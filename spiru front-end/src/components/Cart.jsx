import React from "react";
import { X, Trash, Minus, Plus } from "lucide-react";
import { FaTruckFast } from "react-icons/fa6";
// import productImg from "../assets/images/moringa.png"; // Replace with actual path
import { useNavigate } from "react-router-dom";
import {  cartItems } from "../constant/Constant";

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Sample Cart Data
  const cartItem = cartItems;

  const freeShippingThreshold = 500;
  const cartTotal = cartItem.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  const progressPercent = Math.min(
    (cartTotal / freeShippingThreshold) * 100,
    100
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full max-w-3xl bg-white h-full shadow-lg z-50 
        transform transition-transform duration-700 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black transition-transform duration-300 hover:rotate-180"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-6 h-full px-6 py-4 overflow-y-auto">

          {/* Cart Items Section */}
          <div className="flex-1 bg-white rounded-xl shadow border p-4">
            <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>

            {/* Table Headers */}
            <div className="grid grid-cols-6 gap-4 text-sm font-semibold text-gray-600 border-b pb-2">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {/* Cart Item */}
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 items-center py-4 border-b"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-xs text-gray-500">
                      Weight:{" "}
                      <span className="text-green-700 font-semibold">
                        {item.weight}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="line-through text-gray-400 text-sm">₹{item.price}</p>
                  <p className="text-green-600 font-semibold text-sm">₹{item.discountedPrice}</p>
                </div>

                <div className="text-center flex justify-center items-center gap-2">
                  <button className="p-1 rounded border">
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button className="p-1 rounded border">
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right flex items-center justify-end gap-2">
                  <p className="font-semibold">₹{item.discountedPrice * item.quantity}</p>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals Sidebar */}
          <div className="w-full md:w-[300px] bg-white rounded-xl shadow border p-4">
            <h3 className="text-lg font-semibold mb-4">Cart Totals</h3>

            <p className="text-sm text-gray-700 mb-2">
              Almost there, add{" "}
              <span className="text-green-700 font-semibold">
                ₹{Math.max(freeShippingThreshold - cartTotal, 0).toFixed(2)}
              </span>{" "}
              more to get <span className="font-bold">FREE SHIPPING!</span>
            </p>

            {/* Progress Bar */}
            <div className="relative w-full bg-gray-200 h-2 rounded-full mb-6">
              <div
                className="bg-green-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div
                className="absolute -top-4 text-xl transition-all duration-500"
                style={{
                  left: `calc(${progressPercent}% - 12px)`,
                }}
              >
                <FaTruckFast className="text-green-700" />
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
