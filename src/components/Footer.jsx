import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ onReset }) =>{ 

  const navigate = useNavigate();
  const onClickReset= () => {
    navigate('/reset-request');
  }
  return (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-bold text-white">E-Notes</span>
          </div>
          <p className="text-sm">
            Your digital companion for organizing thoughts and ideas.
          </p>
        </div>

        <div id="contact">
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: support@enotes.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={onClickReset}
              className="text-sm text-left hover:text-indigo-400"
            >
              Reset Password
            </button>
            <a href="/privacy" className="text-sm hover:text-indigo-400">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm hover:text-indigo-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; 2025 E-Notes INDUS. All rights reserved.</p>
      </div>
    </div>
  </footer>
);}

export default Footer;
