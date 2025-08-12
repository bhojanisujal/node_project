import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/checkout_logo_x320.svg';
// import { ShoppingBag } from "lucide-react";
import visa from '../assets/visa.svg'
import master from '../assets/mastercard.svg'
import upi from '../assets/upi.svg'
import netbanking from '../assets/Bank.svg'
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "./CartContext";
import { cartItems } from "../constant/Constant";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [billingOption, setBillingOption] = useState("same");


  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <img src={logo} alt="Logo" className="h-16" />
              <div className="flex items-center gap-4">
                <FaShoppingBag className="h-6 w-6 text-green-700" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <NavLink to="/login">
                <span className="text-sm text-green-700 hover:underline">
                  Log in
                </span>
              </NavLink>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-2 border border-gray-400 rounded"
            />
            <label className="inline-flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              Email me with news and offers
            </label>

            <h2 className="text-xl font-semibold mb-4 mt-6">Delivery</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country/Region
              </label>
              <select className="p-2 border border-gray-400 rounded w-full">
                <option>India</option>
                <option>USA</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="p-2 border border-gray-400 rounded w-full"
              />
              <input
                type="text"
                placeholder="Last name"
                className="p-2 border border-gray-400 rounded w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="mb-4 p-2 border border-gray-400 rounded w-full"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc."
              className="mb-4 p-2 border border-gray-400 rounded w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                className="p-2 border border-gray-400 rounded w-full"
              />
              <div className="relative">
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
                  State
                </label>
                <select className="p-2 border border-gray-400 rounded w-full mt-2">
                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="PIN code"
                className="p-2 border border-gray-400 rounded w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Phone"
              className="mb-4 p-2 border border-gray-400 rounded w-full"
            />

            <label className="inline-flex items-center mb-6">
              <input type="checkbox" className="mr-2" />
              Save this information for next time
            </label>

            <div className="mt-1">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <div className="space-y-4">
                <label
                  className={`block border border-gray-400 rounded cursor-pointer ${
                    selectedPayment === "razorpay"
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                >
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
                    onClick={() => setSelectedPayment("razorpay")}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "razorpay"}
                        onChange={() => setSelectedPayment("razorpay")}
                        className="mr-3"
                      />
                      <span className="font-medium text-green-700">
                        Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 items-center">
                      <img src={upi} alt="UPI" className="w-12 h-12" />
                      <img
                        src={visa}
                        alt="Visa"
                      />
                      <img
                        src={master}
                        alt="MasterCard"
                      />
                     <svg width="38" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <g fill="black" stroke="black" stroke-width="1">
    <polygon points="32,4 4,16 60,16" />
    <rect x="10" y="20" width="6" height="24" />
    <rect x="20" y="20" width="6" height="24" />
    <rect x="30" y="20" width="6" height="24" />
    <rect x="40" y="20" width="6" height="24" />
    <rect x="50" y="20" width="6" height="24" />
    <rect x="4" y="48" width="56" height="6" />
  </g>
</svg>

                      <span className="text-xs font-semibold">+11</span>
                    </div>
                  </div>
                  {selectedPayment === "razorpay" && (
                    <div className="bg-gray-100 p-6 text-center">
                      <img
                        src="https://img.icons8.com/ios-filled/50/000000/internet.png"
                        alt="Redirect"
                        className="mx-auto mb-2"
                      />
                      <p className="text-md text-gray-700">
                        After clicking “Pay now”, you will be redirected to{" "}
                        <br />
                        Razorpay Secure (UPI, Cards, Wallets, NetBanking) to{" "}
                        <br />
                        complete your purchase securely.
                      </p>
                    </div>
                  )}
                </label>

                <label className="flex items-center p-4 border border-gray-400 rounded cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === "cod"}
                    onChange={() => setSelectedPayment("cod")}
                    className="mr-3"
                  />
                  <span className="font-medium">Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>

            {/* Billing Address */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Billing address</h2>
              <div className="mb-4">
                <label className="block mb-2">
                  <input
                    type="radio"
                    name="billing"
                    value="same"
                    checked={billingOption === "same"}
                    onChange={() => setBillingOption("same")}
                    className="mr-2"
                  />
                  Same as shipping address
                </label>
                <label className="block mb-2">
                  <input
                    type="radio"
                    name="billing"
                    value="different"
                    checked={billingOption === "different"}
                    onChange={() => setBillingOption("different")}
                    className="mr-2"
                  />
                  Use a different billing address
                </label>
              </div>

              {billingOption === "different" && (
                <div className="p-4 rounded-md space-y-4">
                  <select className="p-2 border border-gray-400 rounded w-full">
                    <option>India</option>
                    <option>USA</option>
                    <option>Canada</option>
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="p-2 border border-gray-400 rounded w-full"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="p-2 border border-gray-400 rounded w-full"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="p-2 border border-gray-400 rounded w-full"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="p-2 border border-gray-400 rounded w-full"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="p-2 border border-gray-400 rounded w-full"
                    />
                    <div className="relative">
                      <select className="peer p-4 pt-6 border border-gray-300 rounded w-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option>Gujarat</option>
                        <option>Maharashtra</option>
                        <option>Delhi</option>
                      </select>
                      <label className="absolute left-4 top-1 text-sm text-gray-500 transition-all peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1">
                        State
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="PIN code"
                      className="p-2 border border-gray-400 rounded w-full"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone (optional)"
                    className="p-2 border border-gray-400 rounded w-full"
                  />
                </div>
              )}
            </div>

            <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
              Complete Order
            </button>

            {/* Footer */}
            <div className="mt-8 text-sm text-center text-green-700 flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:underline">
                Refund policy
              </a>
              <a href="#" className="hover:underline">
                Shipping policy
              </a>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
              <a href="#" className="hover:underline">
                Terms of service
              </a>
              <a href="#" className="hover:underline">
                Contact information
              </a>
            </div>
          </div>

          {/* Right Section: Summary */}
          {
            cartItems.map((product) => {
               return <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                {console.log(product)}
              <div className="flex items-center space-x-3">
                <img
                  src={product.proImage}
                  alt="Product"
                  className="w-14 h-14 rounded"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">50g</p>
                </div>
              </div>
              <span className="font-medium">₹{product.newPrice}</span>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Discount code"
                className="p-2 border border-gray-400 rounded w-full"
              />
              <button className="bg-gray-200 text-sm px-4 rounded hover:bg-gray-300">
                Apply
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(product.newPrice * product.quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500">Enter shipping address</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{(product.newPrice * product.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
            })
          }
        </div>
      </div>
    </>
  );
};

export default Checkout;
