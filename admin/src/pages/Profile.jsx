// import React from 'react'
// import HOC from '../compoent/HOC'

// const Profile = () => {
//   return (
//     <div>
//       Profile
//     </div>
//   )
// }

// export default HOC(Profile)


import React, { useState } from 'react';
import { Camera, Edit, Save, X, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';
import HOC from '../compoent/HOC';
import profile from '../img/download.jpg'
import { Link, useNavigate } from 'react-router';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate administrator with 5+ years of experience in system management and team leadership.',
    role: 'System Administrator',
    department: 'IT Operations',
    joinDate: '2019-03-15'
  });

  const NAvigate = useNavigate()
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Saving profile data:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values if needed
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Profile Details</h1>
          <p className="text-gray-400">Manage your personal information and account settings.</p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-500/30"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors duration-200">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-1">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-cyan-400 mb-2">{formData.role}</p>
              <p className="text-gray-400 text-sm mb-4">{formData.department}</p>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(formData.joinDate).getFullYear()}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Verified Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white">
                      {formData.firstName}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white">
                      {formData.lastName}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white">
                    {formData.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white">
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white">
                    {formData.location}
                  </div>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none"
                  />
                ) : (
                  <div className="px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white min-h-[100px]">
                    {formData.bio}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Account Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     
          <button onClick={()=>{NAvigate("/Changepassword")}} className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg text-left hover:bg-slate-700/50 transition-colors duration-200">
            <h4 className="font-medium text-white mb-1">Change Password</h4>
            <p className="text-sm text-gray-400">Update your account password</p>
          </button>
      
          
          <button className="p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg text-left hover:bg-slate-700/50 transition-colors duration-200">
            <h4 className="font-medium text-white mb-1">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-400">Add an extra layer of security</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HOC(Profile);