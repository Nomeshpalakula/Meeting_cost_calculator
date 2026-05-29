import { Link, useLocation } from 'react-router-dom';
import { Calculator, History, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MeetCost</h1>
              <p className="text-xs text-gray-500 -mt-1">Know the real cost</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-10 text-lg">
            <Link
              to="/"
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calculator className="w-5 h-5" />
              Calculator
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-2 transition-colors ${
                location.pathname === '/history'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="w-5 h-5" />
              History
            </Link>
          </div>

          {/* Right Side Info */}
          <div className="text-sm text-gray-500 hidden md:block">
            Built with ❤️ for better meetings
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;