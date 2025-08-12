import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import logo from "../assets/images/spiru_logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const Navigate =useNavigate()
  return (
    <>
      <footer className="py-15 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          {/* Logo & Social */}
          <div className="w-full md:w-1/4">
            <img
              src={logo}
              alt="Spiru Swastha Logo"
              className="max-w-[140px] mb-4"
            />
            <p className="text-md text-gray-700 max-w-[220px]">
              Swastha for Life with Spirulina & Superfood Goodness
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="bg-green-600 hover:bg-green-900 text-white p-2 rounded flex items-center justify-center"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-green-600 hover:bg-green-900 text-white p-2 rounded flex items-center justify-center"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-green-600 hover:bg-green-900 text-white p-2 rounded flex items-center justify-center"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/4">
            <h4 className="font-semibold text-xl text-black mb-4">Company</h4>
            <div className="flex gap-8">
              <ul className="space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600 font-semibold"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                  onClick={()=>{Navigate("/Shopall")}}
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    Shop all
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    Faqs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    Training Center
                  </a>
                </li>
              </ul>
              <ul className="space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-md text-gray-900 hover:text-green-600"
                  >
                    Track Your Order
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Best Selling Products */}
          <div className="w-full md:w-1/4">
            <h4 className="font-semibold text-xl text-black mb-4">
              Best Selling Products
            </h4>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="text-md text-gray-900 hover:text-green-600"
                >
                  Spirulina Tablet
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-900 hover:text-green-600"
                >
                  Spirulina Capsule
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-900 hover:text-green-600"
                >
                  Spiruvita Oil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-900 hover:text-green-600"
                >
                  Spirushine Shampoo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-md text-gray-900 hover:text-green-600"
                >
                  Moringa Tablet
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/4">
            <h4 className="font-semibold text-xl text-black mb-4">
              Contact Us
            </h4>
            <p className="text-md text-gray-700 leading-relaxed">
              <strong>Address :</strong> 2nd Floor, Flat No. A/203, Dev Prayag
              Residency, Opp. Shraddhadip Society, Causeway Singanpor Road,
              Singanpor, Surat, Gujarat, 395004
            </p>
            <p className="text-md text-gray-700 mt-2">
              <strong>E-mail:</strong> info@spiruswastha.com
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t-1 border-gray-300 pt-6 text-center text-sm text-gray-500 
        flex flex-wrap gap-x-10 gap-20 justify-center sm:justify-start">
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <a href="#" className="hover:text-green-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-green-600">
            Return and Refund Policy
          </a>
          <a href="#" className="hover:text-green-600">
            Shipping Policy
          </a>
          <a href="#" className="hover:text-green-600">
            Contact Information
          </a>
        </div>

      </footer>

      <div className="bg-green-700 text-white text-sm py-3 text-center">
        © 2025 Spiru Swastha Developed By{" "}
        <a
          href="https://visioninfotech.com"
          className="underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vision Infotech
        </a>
      </div>
    </>
  );
};

export default Footer;
