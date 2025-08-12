import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  let navigate = useNavigate()

  return (
    <div className="h-dvh flex">
      <div className="relative m-auto flex w-1/3 flex-col rounded-xl bg-white text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/40">
          <h3 className="text-3xl font-semibold">Login</h3>
        </div>

        <div className="flex flex-col gap-4 p-6">
     
        <div className="relative h-11 w-full min-w-[200px]">
      <input
        type='email'
        placeholder=""
        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      />
      <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
      >
        Email
      </label>
    </div>

   
       <div className="relative h-11 w-full min-w-[200px]">
      <input
        type='password'
        placeholder=""
        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      />
      <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
      >
        Password
      </label>
    </div>
        </div>
 <div className="mt-4 text-end pe-5 pb-2  text-sm text-gray-500">
            <button
              className=" hover:text-cyan-500 cursor-pointer  font-medium hover:underline"
              onClick={() => navigate('/Email')}
              >
              <span>Forgot password? </span>
              
            </button>
          </div>
        <div className="p-6 pt-0">
          <button
            type="submit"
            onClick={() => navigate('/Dashboard')} 
            className="block w-full cursor-pointer rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md hover:shadow-lg"
          >
            Login
          </button>

         <div className="mt-4 text-center   text-sm text-gray-500">
           <span> </span>
            <button
              className="hover:text-cyan-500   cursor-pointerfont-medium hover:underline"
              onClick={() => navigate('/Singupform')}
              >
              <span>Register new account</span>
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
