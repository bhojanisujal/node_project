import React, { useEffect, useMemo, useState } from "react";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { HiOutlineTruck } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/spiru_logo.png";
import Login from "./Login";
import Register from "./Registration";
import CartSidebar from "./Cartsidebar";
import { useCart } from "./CartContext";
import { CategoryFetch } from "../redux/slices/Categoryslices";

import { resetLogin } from "../redux/slices/login";
import axios from "axios";
import Swal from "sweetalert2";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiFilePaper2Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { GrLocation } from "react-icons/gr";

const BASE_URL = "http://localhost:4000";
const FALLBACK_IMAGE = "https://placehold.co/24x24";

const UserDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {

      localStorage.removeItem("accessToken");
 
     
  };

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
      <NavLink
        to="/dashboard"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        <LuLayoutDashboard className="mr-2 h-4 w-4" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/order-history"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        <RiFilePaper2Line className="mr-2 h-4 w-4" />
        <span>Order History</span>
      </NavLink>
      <NavLink
        to="/addresses"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        <GrLocation className="mr-2 h-4 w-4" />
        <span>Addresses</span>
      </NavLink>
      <button
        onClick={handleLogout}
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <MdOutlineLogout className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

const NavBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, CategoryData } = useSelector(
    (state) => state.Category
  );
  // Check localStorage for accessToken to determine authentication state
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const memoizedCategoryData = useMemo(() => CategoryData, [CategoryData]);

  useEffect(() => {
    console.log("Fetching categories...");
    dispatch(CategoryFetch());
  }, [dispatch]);

  const getImageUrl = (path) => {
    if (!path || typeof path !== "string") {
      console.warn("Invalid or missing image path, using fallback:", path);
      return FALLBACK_IMAGE;
    }

    const cleanPath = path
      .replace(/^public\\category\\/, "")
      .replace(/^public\/category\//, "")
      .replace(/\\/g, "/")
      .replace(/^\/+|\/+$/g, "");
    const fullUrl = `${BASE_URL}/category/${cleanPath}`;
    return fullUrl;
  };

  return (
    <nav className="section2 bg-white mx-auto w-full sticky top-0 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between relative">
        <div className="lg:hidden absolute left-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-2xl text-[#222222]"
          >
            <FiMenu />
          </button>
        </div>
        <div className="flex-1 flex justify-center lg:justify-start">
          <img
            src={logo}
            onClick={() => navigate("/")}
            alt="Spiru Swastha"
            className="logo"
          />
        </div>
        <div className="hidden lg:flex justify-center absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="flex space-x-6 items-center pointer-events-auto">
            {isLoading ? (
              <div>Loading categories...</div>
            ) : isError ? (
              <div className="flex flex-col items-center">
                <span className="text-red-500">Error: {isError}</span>
                <button
                  onClick={() => dispatch(CategoryFetch())}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Retry
                </button>
              </div>
            ) : memoizedCategoryData.length === 0 ? (
              <div>No categories available</div>
            ) : (
              memoizedCategoryData.map((Categorie) => (
                <div key={Categorie._id}>
                  {Categorie.isactiv ? (
                    <NavLink to={`/collection/${Categorie.slug}`}>
                      <div className="flex items-center text-sm font-medium text-[#222222] hover:text-green-700 cursor-pointer whitespace-nowrap">
                        <img
                          src={getImageUrl(Categorie.Categoryicone)}
                          alt={Categorie.Categoryname}
                          className="w-6 h-6 object-contain me-2"
                          onError={(e) => {
                            console.error(
                              `Failed to load image for ${Categorie.Categoryname}:`,
                              Categorie.Categoryicone
                            );
                            e.target.src = FALLBACK_IMAGE;
                          }}
                          loading="lazy"
                        />
                        <span>{Categorie.Categoryname}</span>
                      </div>
                    </NavLink>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-700 text-xl absolute right-4 lg:static">
          <FiSearch className="cursor-pointer hover:text-green-700" />
          <HiOutlineTruck className="cursor-pointer hover:text-green-700 hidden md:block" />
          <div
            onClick={() =>
              isAuthenticated ? setShowDropdown(!showDropdown) : setShowLogin(true)
            }
            className="relative cursor-pointer hover:text-green-700"
          >
            <FiUser />
            {showDropdown && isAuthenticated && (
              <UserDropdown onClose={() => setShowDropdown(false)} />
            )}
          </div>
          <NavLink
            to="/wishlist"
            className="relative cursor-pointer hover:text-green-700"
          >
            <FiHeart />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs px-1">
              0
            </span>
          </NavLink>
          <div
            onClick={() => setIsSidebarOpen(true)}
            className="relative cursor-pointer hover:text-green-700"
          >
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs px-1">
              0
            </span>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          isMenuOpen
            ? "opacity-100 backdrop-blur-md bg-white/20"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-700 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#222222]">Categories</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#222222] text-2xl transform transition-transform duration-700 hover:rotate-180"
          >
            <FiX />
          </button>
        </div>
        <div className="p-4 flex flex-col space-y-4">
          {isLoading ? (
            <div>Loading categories...</div>
          ) : isError ? (
            <div>Error loading categories: {isError}</div>
          ) : memoizedCategoryData.length === 0 ? (
            <div>No categories available</div>
          ) : (
            memoizedCategoryData.map((categories) => (
              <>
                {categories.isactiv ? (
                  <NavLink
                    key={categories._id}
                    to={`/collection/${categories.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center text-sm font-medium text-[#222222] hover:text-green-700 cursor-pointer">
                      <img
                        src={getImageUrl(categories.Categoryicone)}
                        alt={categories.Categoryname}
                        className="w-6 h-6 object-contain me-2"
                        onError={(e) => {
                          console.error(
                            `Failed to load image for ${categories.Categoryname}:`,
                            categories.Categoryicone
                          );
                          e.target.src = FALLBACK_IMAGE;
                        }}
                        loading="lazy"
                      />
                      <span>{categories.Categoryname}</span>
                    </div>
                  </NavLink>
                ) : null}
              </>
            ))
          )}
        </div>
      </div>
      {!isAuthenticated && (
        <>
          <Login
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onCreateAccountClick={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
          <Register
            isOpen={showRegister}
            onClose={() => setShowRegister(false)}
            onLoginClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </>
      )}
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </nav>
  );
};

export default NavBar;