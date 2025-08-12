import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const OTPCODE = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);



  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length === 4) {
      // Add OTP verification logic here
      navigate('/Forgotpassword');
    } else {
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Please enter all 4 digits.",

});
      // alert('Please enter all 4 digits.');
    }
  };

  return (
    <div className="h-dvh flex">
      <div className="relative m-auto w-1/3 flex flex-col rounded-xl bg-white text-gray-700 shadow-md">
        {/* Header */}
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/40">
          <h3 className="text-3xl font-semibold">OTP Verification</h3>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input  key={index}  type="text"  maxLength="1"  value={digit}  onChange={(e) => handleChange(e.target.value, index)}  onKeyDown={(e) => handleKeyDown(e, index)}  ref={(el) => (inputsRef.current[index] = el)}  className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
            ))}
          </div>
        
        </div>

        {/* Button */}
        <div className="p-6 pt-0">
          <button
            onClick={handleVerify}
            className="block w-full rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
          >
            Submit OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPCODE;
