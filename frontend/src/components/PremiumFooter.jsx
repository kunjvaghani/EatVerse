import React from 'react';
import { Link } from 'react-router-dom';

const PremiumFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-3xl font-black mb-4 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              zomato
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover the best food & drinks in your city. Order online, explore restaurants, and grow your business with Zomato.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Careers</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Blog</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Press</a></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Users</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/user/login" className="hover:text-red-500 transition">Login</Link></li>
              <li><Link to="/user/register" className="hover:text-red-500 transition">Register</Link></li>
              <li><a href="#" className="hover:text-red-500 transition">Browse Restaurants</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Help</a></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Partners</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/food-partner/login" className="hover:text-red-500 transition">Partner Login</Link></li>
              <li><Link to="/food-partner/register" className="hover:text-red-500 transition">Register Restaurant</Link></li>
              <li><a href="#" className="hover:text-red-500 transition">Partner App</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Section - Social & Download */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-400">Follow us:</p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center hover:from-red-500 hover:to-red-600 transition text-red-500 hover:text-white"
                >
                  <span className="text-xs font-bold">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-medium flex items-center gap-2">
              <span>📱</span> App Store
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-medium flex items-center gap-2">
              <span>🎮</span> Play Store
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a>
            <a href="#" className="hover:text-gray-300 transition">Cookie Policy</a>
          </div>
          <p>&copy; 2024 Zomato Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
