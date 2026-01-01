import { useState, useRef } from 'react';
import {
  Home,
  FileText,
  CheckSquare,
  MessageSquare,
  Package,
  BookOpen,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserBox from './UserBox';

export default function Navbar() {
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);
  const userBoxRef = useRef(null);
  const navigate = useNavigate();

  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Notes', path: '/notes', icon: FileText },
    { label: 'Todo', path: '/todo', icon: CheckSquare },
    { label: 'GPT', path: '/gpt', icon: MessageSquare },
    { label: 'Products', path: '/products', icon: Package },
  ];

  return (
    <nav className="w-full shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <span className="text-2xl font-bold text-indigo-600">E-Notes</span>
        </div>

        <div className="flex items-center gap-4">
          {tabs.map(({ label, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white"
            >
              <Icon size={18} />
              {label}
            </button>
          ))}

          <div className="relative" ref={userBoxRef}>
            <button
              onClick={() => setIsUserBoxOpen(!isUserBoxOpen)}
              className="w-10 h-10 rounded-full text-white shadow-md"
            >
              <User size={20} />
            </button>

            <UserBox
              isOpen={isUserBoxOpen}
              onClose={() => setIsUserBoxOpen(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
