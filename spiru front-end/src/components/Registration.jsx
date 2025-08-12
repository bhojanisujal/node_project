import React, { useState } from "react";
import { X } from "lucide-react";

const Register = ({ isOpen, onClose, onLoginClick }) => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-white/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
                    className="absolute top-4 right-4 text-gray-600 hover:text-black transition-transform duration-300 hover:rotate-180"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-xl font-semibold mb-4">REGISTER</h2>

                <div className="border-t-1 border-gray-300 pt-6 text-center text-sm text-gray-500 
        flex flex-wrap justify-center sm:justify-start">
                </div>

                {/* First Name */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded px-3 pt-6 pb-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                    <label
                        className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm 
              peer-focus:text-green-600"
                    >
                        First Name
                    </label>
                </div>

                {/* Last Name */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded px-3 pt-6 pb-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                    <label
                        className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm 
              peer-focus:text-green-600"
                    >
                        Last Name
                    </label>
                </div>

                {/* Email */}
                <div className="relative mb-4">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded px-3 pt-6 pb-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                    <label
                        className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm 
              peer-focus:text-green-600"
                    >
                        Email *
                    </label>
                </div>

                {/* Password */}
                <div className="relative mb-4">
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded px-3 pt-6 pb-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                    />
                    <label
                        className="absolute left-3 top-1.5 text-sm text-gray-500 transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm 
              peer-focus:text-green-600"
                    >
                        Password *
                    </label>
                </div>

                {/* Terms Text */}
                <p className="text-sm text-gray-500 mb-4">
                    Your personal data will be used to support your experience throughout
                    this website, to manage access to your account, and for other purposes
                    described in our privacy policy.
                </p>

                {/* Register Button */}
                <button className="w-full bg-green-700 text-white py-2 hover:bg-[#16569d] transition">
                    Register
                </button>

                {/* Already have account */}
                <div className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <button
                        className="text-green-700 hover:underline"
                        onClick={onLoginClick}
                    >
                        Login here
                    </button>
                </div>
            </div>
        </>
    );
};

export default Register;
