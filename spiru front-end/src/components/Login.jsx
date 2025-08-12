import React, { useState } from "react";
import { X } from "lucide-react";

const Login = ({ isOpen, onClose, onCreateAccountClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-white/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full max-w-sm bg-white h-full shadow-lg p-6 z-50 
          transform transition-transform duration-700 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
         className="absolute top-4 right-4 text-gray-600 hover:text-black transition-transform duration-500 transform hover:rotate-180"

        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">LOGIN</h2>

        <div
          className="border-t-1 border-gray-300 pt-10 text-center text-sm text-gray-500 
        flex flex-wrap justify-center sm:justify-start"
        ></div>

        {/* Email Field (Floating Label) */}
        <div className="relative mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full border border-gray-300 rounded px-3 pt-6 pb-1 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm 
      peer-focus:text-green-600"
          >
            Email *
          </label>
        </div>

        {/* Password Field (Floating Label) */}
        <div className="relative mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full border border-gray-300 rounded px-3 pt-6 pb-1 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm 
      peer-focus:text-green-600"
          >
            Password *
          </label>
        </div>

        {/* Forgot Password */}
        <div className="text-sm mb-6">
          <a href="#" className="text-green-700 hover:underline">
            Forgot your password?
          </a>
        </div>

        {/* Sign In */}
        <button
          className="w-full bg-green-700 text-white py-2 transform transition-transform duration-700 ease-in-out
         hover:bg-[#16569d]"
        >
          Sign In
        </button>

        {/* Create Account */}
        <div className="text-sm text-center mt-4">
          New customer?{" "}
          <a
            href="#"
            className="text-green-700 hover:underline"
            onClick={() => {
              onClose(); // close login first
              setTimeout(() => {
                onCreateAccountClick(); // ✅ this will show register from NavBar
              }, 300);
            }}
          >
            Create your account
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
