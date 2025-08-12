// Sidebar.js
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaOpencart } from "react-icons/fa";
import {
  MdOutlineContentPaste,
  MdOutlineReviews,
  MdPermMedia,
} from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14l-4-2-4 2V5z"
          />
        </svg>
      ),
    },
    {
      name: "Category",
      path: "/Category",
      icon: <TbCategoryPlus className="w-5 h-5" />,
    },
    {
      name: "Products",
      path: "/Products",
      icon: <AiOutlineProduct className="w-5 h-5" />,
    },
    {
      name: "Content",
      path: "/Content",
      icon: <MdOutlineContentPaste className="w-5 h-5" />,
    },
    {
      name: "Review",
      path: "/Review",
      icon: <MdOutlineReviews className="w-5 h-5" />,
    },
    {
      name: "Media",
      path: "/Media",
      icon: <MdPermMedia className="w-5 h-5" />,
    },
    {
      name: "Order",
      path: "/Order",
      icon: <FaOpencart className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      name: "Users",
      path: "/Users",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      name: "Log-Out",
      path: "/login",
      icon: <BiLogOut className="w-5 h-5" />,
    },
  ];

  return (
      <div className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} 
      shadow-md 
      `}>

      <div className="p-4">
        {!collapsed ? (
          <div className="flex items-center space-x-3 mb-8 p-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AquaDash</h2>
              <p className="text-sm text-gray-400">Admin Panel</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-8 p-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-gray-300 hover:text-white hover:bg-gradient-to-r from-cyan-500/10 to-teal-500/10"
                } ${collapsed ? 'justify-center' : 'px-4'}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;