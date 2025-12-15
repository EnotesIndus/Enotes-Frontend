import { BookOpen, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  

  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full px-6 h-16 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold">E-Notes</span>
        </div>

        <div className="hidden md:flex gap-6">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button onClick={() => navigate('/login')}>Login</button>
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Get Started
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
