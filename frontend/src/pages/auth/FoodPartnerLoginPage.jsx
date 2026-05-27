import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';


const FoodPartnerLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };


    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/food-partner/login`, data, {
        withCredentials: true,
      });
      console.log('Login successful:', response.data);
      login(response.data.partner || response.data.user);
      toast.success('Partner login successful! Welcome to your dashboard 🎉');
      navigate('/create-food');
    } catch (error) {
      console.error('Error during login:', error);
      const msg = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
    }
  };


  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Panel */}
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-gray-800 text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <Link to="/" className="text-4xl font-bold tracking-tighter" style={{ fontFamily: "'Merriweather', serif" }}>
            Eatverse <span className="font-light text-red-500">for Business</span>
          </Link>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight">Your Partner in Growth.</h1>
          <p className="mt-4 text-lg text-gray-200">Log in to your dashboard to manage orders, update your menu, and track your business performance.</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md">
              <Link to="/" className="text-red-600 font-medium mb-4 inline-block">Go back to home</Link>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Partner Sign In</h2>
              <p className="text-gray-600 mb-8">Access your restaurant dashboard.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
              {/* <input id="email" name="email" type="email" required placeholder="business@restaurant.com" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /> */}
              <input id="email" name="email" type="email" required placeholder="business@restaurant.com" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900" />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="mt-1 w-full pr-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 mr-3 flex items-center text-red-600 hover:text-red-800 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.9 10.9 0 0 1 12 20c-5 0-9.27-3-11-8 1.03-2.48 2.58-4.62 4.5-6.11" />
                      <path d="M1 1l22 22" />
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            <div>
              <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition">Sign In</button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">Don't have a partner account? <Link to="/food-partner/register" className="font-semibold text-red-600 hover:underline">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodPartnerLoginPage;