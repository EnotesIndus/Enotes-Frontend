const HeroSection = ({ onReset }) => (
  <div className="w-full py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Your Digital Notebook
        <span className="block text-indigo-600 mt-2">Simplified</span>
      </h1>

      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Create, organize, and share your notes effortlessly. E-Notes helps
        you stay productive and keep your thoughts organized.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => (window.location.href = '/register')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition shadow-lg"
        >
          Start Taking Notes
        </button>

        <button
          onClick={onReset}
          className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition border-2 border-indigo-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  </div>
);

export default HeroSection;
