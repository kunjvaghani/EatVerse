import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserProfile from './UserProfile'

const EnhancedNavbar = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-black/60 backdrop-blur-md'
      }`}
    >
      {/* Single row: zomato left | nav links center (desktop) | actions right */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent flex-shrink-0">
          Eatverse
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="font-medium text-gray-300 hover:text-white transition text-sm">Features</a>
          <a href="#stats" className="font-medium text-gray-300 hover:text-white transition text-sm">About</a>
          <a href="#testimonials" className="font-medium text-gray-300 hover:text-white transition text-sm">Testimonials</a>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <UserProfile />
          ) : (
            <>
              <Link to="/user/login" className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition">
                Login
              </Link>
              <Link to="/user/register" className="px-4 py-1.5 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105">
                Sign Up
              </Link>
            </>
          )}
          {/* Partner button — desktop only */}
          <Link to="/food-partner/register" className="hidden md:inline-flex items-center px-4 py-1.5 border border-white/20 rounded-full text-xs font-medium text-white hover:bg-white/10 transition">
            Become a Partner
          </Link>
        </div>
      </div>
    </header>
  )
}

export default EnhancedNavbar;
