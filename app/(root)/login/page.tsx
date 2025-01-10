"use client";

import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [checkOn, setCheckOn] = useState(true);
  function toggleCheck() {
    setCheckOn(!checkOn)
  }
  return (
    <div className="max-w-md mx-auto bg-white py-8 px-16 rounded-lg shadow-lg">
      <form>
        <h1 className="text-2xl font-bold text-center mb-4">Log in to your Account</h1>
        <span className="text-sm text-gray-600 block text-center mb-6">Welcome! Sign in</span>

        <div className="flex w-full p-3 border-2 border-gray-300 rounded-[15px] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Mail color="grey" />
          <input type="email" className="ml-4 w-full hover:border-transparent focus:outline-none" placeholder="Email" />
        </div>
        <div className="flex w-full p-3 border-2 border-gray-300 rounded-[15px] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <LockKeyhole color="grey" />
          <input type="password" className="ml-4 w-full hover:border-transparent focus:outline-none" placeholder="Enter Password" />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input className="form-check-input" type="checkbox" id="rememberMe" onClick={toggleCheck} checked={checkOn}/>
            <label className="ml-2 text-sm text-blue-600" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="/register" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-[15px] font-thin text-lg hover:bg-blue-700 transition-colors mb-4 font"
        >
          Log In
        </button>

        <div className="flex justify-center items-center">
          <span className="text-gray-700 text-sm">Not a member?</span>
          <Link href="/register" id="registerLink" className="ml-1 text-blue-600 text-sm hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
