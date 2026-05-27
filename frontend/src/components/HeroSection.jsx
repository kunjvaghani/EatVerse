import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = ({ user, navigate, onShowVideos }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9zdmc+')] opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full w-fit hover:bg-red-500/20 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 2v6M12 22v-6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/></svg>
              <span className="text-red-500 font-semibold text-sm">NEW</span>
              <span className="text-gray-300 text-sm">Video Reels for Food Discovery</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
                Discover the <span className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent animate-pulse">Best Food</span> in Your City
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Watch short video reels from your favorite restaurants, explore trending dishes, order online, and join a vibrant community of food lovers.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {user ? (
                <button
                  onClick={onShowVideos || (() => navigate('/feed'))}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 3v18l15-9L5 3z"/></svg>
                  Explore Videos
                </button>
              ) : (
                <>
                  <Link
                    to="/user/register"
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/></svg>
                    Get Started
                  </Link>
                  <Link
                    to="/food-partner/register"
                    className="px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center gap-2 backdrop-blur-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 21v-4h10v4"/></svg>
                    Become a Partner
                  </Link>
                </>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div>
                <p className="text-3xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">10M+</p>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
              <div>
                <p className="text-3xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">500K+</p>
                <p className="text-sm text-gray-400">Restaurants</p>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
              <div>
                <p className="text-3xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">⭐ 4.8</p>
                <p className="text-sm text-gray-400">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Right side - Animated card showcase */}
          <div className="hidden lg:block relative h-[600px]">
            {/* Floating cards */}
            <div className="absolute inset-0 perspective">
              {/* Card 1 */}
              <div className="absolute top-0 right-0 w-80 h-96 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-3xl p-6 border border-red-500/30 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: '0s' }}>
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-4xl shadow-inner">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 12c3-6 17-6 20 0-4 4-8 4-11 4-3 0-7 0-9-4z"/></svg>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute top-32 left-0 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-3xl p-6 border border-orange-500/30 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-4xl shadow-inner">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 12h18M3 16h18M5 8h14"/></svg>
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute bottom-0 right-20 w-80 h-96 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-3xl p-6 border border-red-500/30 shadow-2xl transform hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-4xl shadow-inner">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 3c6 6 12 6 18 0"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default HeroSection;
