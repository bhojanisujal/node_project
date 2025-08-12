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
import logo from "../assets/images/spiru_logo.png";
import Login from "./Login";
import Register from "./Registration";
import { NavLink, useNavigate } from "react-router-dom";
import CartSidebar from "./Cartsidebar";
import { useCart } from "./CartContext";
import { useDispatch, useSelector } from "react-redux";
import { CategoryFetch } from "../redux/slices/Categoryslices";

const BASE_URL = "http://localhost:4000";
const FALLBACK_IMAGE = "https://placehold.co/24x24";

const NavBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, CategoryData } = useSelector(
    (state) => state.Category
  );

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
  // console.log("Constructed image URL:", fullUrl);
  // console.log(fullUrl)

  return fullUrl;
};

  return (
    <nav className="section2 bg-white  mx-auto w-full sticky top-0 relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between relative">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden absolute left-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-2xl text-[#222222]"
          >
            <FiMenu />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <img
            src={logo}
            onClick={() => navigate("/")}
            alt="Spiru Swastha"
            className="logo"
          />
        </div>

        {/* Desktop Categories */}
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
                {/* {console.log(getImageUrl(Categorie.Categoryicone))} */}
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

        {/* Icons */}
        <div className="flex items-center space-x-4 text-gray-700 text-xl absolute right-4 lg:static">
          <FiSearch className="cursor-pointer hover:text-green-700" />
          <HiOutlineTruck className="cursor-pointer hover:text-green-700 hidden md:block" />
          <div
            onClick={() => setShowLogin(true)}
            className="cursor-pointer hover:text-green-700"
          >
            <FiUser />
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-700 ${
          isMenuOpen
            ? "opacity-100 backdrop-blur-md bg-white/20"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
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
        <div  className="p-4 flex flex-col space-y-4">
          {isLoading ? (
            <div >Loading categories...</div>
          ) : isError ? (
            <div>Error loading categories: {isError}</div>
          ) : memoizedCategoryData.length === 0 ? (
            <div>No categories available</div>
          ) : (
            memoizedCategoryData.map((categories) => (
              <>
              { categories.isactiv ?(
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
              ):(null)

              }
              </>
            ))
          )}
        </div>
      </div>

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
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </nav>
  );
};

export default NavBar;