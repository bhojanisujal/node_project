import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, resetLogin } from "../redux/slices/login";
import Swal from "sweetalert2";

const Login = ({ isOpen, onClose, onCreateAccountClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth || {});
  const { isLoading = false, isError = null, isLoggedIn = false } = authState;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Client-side validation
    if (!form.email || !form.password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address",
      });
      return;
    }

    dispatch(loginUser(form))
      .unwrap()
      .then((res) => {
        // Store token in localStorage
        console.log(res)
        localStorage.setItem("accessToken", res.token);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Logged in successfully!",
        });
        navigate("/dashboard");
        dispatch(resetLogin());
        setForm({ email: "", password: "" });
        onClose();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error,
        });
      });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-white/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 right-0 w-full max-w-sm bg-white h-full shadow-lg p-6 z-50 
          transform transition-transform duration-700 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition-transform duration-500 transform hover:rotate-180"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">LOGIN</h2>
        {isError && <p className="text-red-500 text-sm mb-4">{isError}</p>}
        {isLoggedIn && (
          <p className="text-green-500 text-sm mb-4">Logged in successfully!</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
          <div className="relative mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
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
          <div className="text-sm mb-6">
            <a href="#" className="text-green-700 hover:underline">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 transform transition-transform duration-700 ease-in-out hover:bg-[#16569d] disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <div className="text-sm text-center mt-4">
            New customer?{" "}
            <button
              className="text-green-700 hover:underline"
              onClick={() => {
                onClose();
                setTimeout(() => {
                  onCreateAccountClick();
                }, 300);
              }}
            >
              Create your account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;