import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="max-w-md mx-auto bg-white py-8 px-16 rounded-lg shadow-lg">
      <form>
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
        <span className="text-sm text-gray-600 block text-center mb-6">Welcome! Sign up</span>
        <div className="flex w-full p-3 border-2 border-gray-300 rounded-[15px] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Mail color="grey" />
          <input type="email" className="ml-4 w-full hover:border-transparent focus:outline-none" placeholder="Email" />
        </div>
        <div className="flex w-full p-3 border-2 border-gray-300 rounded-[15px] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <LockKeyhole color="grey" />
          <input type="password" className="ml-4 w-full hover:border-transparent focus:outline-none" placeholder="Enter Password" />
        </div>
        <div className="flex w-full p-3 border-2 border-gray-300 rounded-[15px] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <LockKeyhole color="grey" />
          <input type="password" className="ml-4 w-full hover:border-transparent focus:outline-none" placeholder="Confim Password" />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-[15px] font-thin text-lg hover:bg-blue-700 transition-colors mb-4 font"
        >
          Create
        </button>

        <div className="flex justify-center items-center">
          <span className="text-gray-700 text-sm">Already have an account?</span>
          <Link href="/login" id="registerLink" className="ml-1 text-blue-600 text-sm hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
