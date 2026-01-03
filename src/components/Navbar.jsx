import { BookOpen, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();
  

  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full px-6 h-16 flex justify-between items-center">
       

        <div className="hidden md:flex gap-6">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
