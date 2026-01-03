import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
  <div className="w-full py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Your Digital Notebook
        <span className="block text-indigo-600 mt-2">Simplified</span>
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Create, organize, and share your notes effortlessly. E-Notes helps you
        stay productive and keep your thoughts organized.
      </p>

      <div className="flex flex-col gap-4 items-center">
        {/* Start Taking Notes */}
        <button
          onClick={() => navigate("/register")}
          className="bg-indigo-600 text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition shadow-lg"
        >
          Start Taking Notes
        </button>

        {/* Login & Register below */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600  px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default HeroSection;
