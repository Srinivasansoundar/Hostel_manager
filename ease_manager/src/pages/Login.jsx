import React from 'react';
import {Link} from "react-router-dom"
export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center bg-white text-center">
        <h2 className="text-3xl font-bold mt-8 ml-44">Welcome!</h2>
        <h3 className="text-2xl mt-1 ml-44">Login to your account</h3>
        <img src="./src/images/login_img.png" alt="login_img" className="max-w-full h-auto mt-5 ml-44" />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="border border-gray-200 p-12 mx-16 h-96 flex flex-col items-center justify-center shadow-md w-96">
          <div className="flex items-center justify-center mb-5">
            <img src="./src/images/PSG_img.png" alt="pst_img" className="w-12 h-auto mr-2" />
            <h1 className="text-xl text-darkblue font-bold m-0">PSG INSTITUTION</h1>
          </div>
          
          <div className="flex flex-col w-full mb-2 pt-4">
            <h3 className="text-black font-bold">Email</h3>
            <input type="text" className="p-1 w-full border border-gray-300 rounded mt-1 box-border" />
          </div>
          
          <div className="flex flex-col w-full mb-2 pt-4">
            <h3 className="text-black font-bold">Password</h3>
            <input type="text" className="p-1 w-full border border-gray-300 rounded mt-1 box-border" />
          </div>
          
          <div className="flex justify-between w-full mt-2">
            <p className="text-black cursor-pointer text-sm">Forgot Password?</p>
            <a href="/Dashboard">
            <button className="bg-darkblue text-white py-1 px-5 border-none rounded cursor-pointer text-lg transition-colors duration-300 bg-blue-900">
                Login
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
