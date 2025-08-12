// Header.js
import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList
} from '@material-tailwind/react';

const Header = ({ onToggle, collapsed }) => {
  const navigate = useNavigate();

  return (
     <header className={`fixed top-0 right-0 h-16 z-40 backdrop-blur-sm px-6 py-4 shadow-md 
      ${collapsed ? 'left-20' : 'left-64'} transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onToggle} 
            className="text-white hover:text-cyan-400 focus:outline-none text-xl transition-all duration-200"
          >
            <FaBars />
          </button>
       
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              AquaBoard
            </h1>
        
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 w-64"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.894 2.553a1 1 0 00-.894.553L8 6H5a1 1 0 00-1 1v5a1 1 0 001 1h3l2 3.447a1 1 0 00.894.553z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <Menu placement="bottom-end">
            <MenuHandler>
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
                {!collapsed && (
                  <div className="text-sm text-left">
                    <p className="text-white font-medium">John Doe</p>
                    <p className="text-gray-400">Administrator</p>
                  </div>
                )}
              </div>
            </MenuHandler>

            <MenuList className="backdrop-blur-md bg-white/10 text-white border p-0 w-32 border-slate-600 z-[96] list">
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
              <MenuItem className='hover:bg-red-600' onClick={() => navigate("/login")}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;