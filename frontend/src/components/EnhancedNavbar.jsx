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
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-3xl font-black tracking-tighter bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            zomato
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-medium text-gray-300 hover:text-white transition">
              Features
            </a>
            <a href="#stats" className="font-medium text-gray-300 hover:text-white transition">
              About
            </a>
            <a href="#testimonials" className="font-medium text-gray-300 hover:text-white transition">
              Testimonials
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserProfile />
          ) : (
            <>
              <Link to="/user/login" className="px-4 py-2 font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition">
                Login
              </Link>
              <Link to="/user/register" className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105">
                Sign Up
              </Link>
            </>
          )}
          <Link to="/food-partner/register" className="hidden md:inline-flex items-center px-5 py-2 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-white/10 transition">
            Become a Partner
          </Link>
        </div>
      </div>
    </header>
  )
}

export default EnhancedNavbar;
