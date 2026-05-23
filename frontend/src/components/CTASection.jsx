import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Ready to Transform Your Food Experience?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join millions of food enthusiasts discovering amazing restaurants and trying new dishes every day.
            </p>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Access to exclusive restaurant deals and offers</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Fast and reliable food delivery to your doorstep</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Earn rewards and cashback on every order</span>
              </li>
            </ul>
          </div>

          {/* Right - CTAs */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">For Food Lovers</h3>
              <Link
                to="/user/register"
                className="block w-full px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105"
              >
                Start Exploring
              </Link>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">For Restaurant Owners</h3>
              <Link
                to="/food-partner/register"
                className="block w-full px-8 py-4 bg-white/20 border-2 border-white text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 text-center transform hover:scale-105 backdrop-blur-sm"
              >
                Grow Your Business
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
