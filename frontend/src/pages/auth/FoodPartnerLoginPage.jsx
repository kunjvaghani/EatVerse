import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const FoodPartnerLoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };


    try {
      const response = await axios.post('http://localhost:3000/api/food-partner/login', data, {
        withCredentials: true,
      });
      console.log('Login successful:', response.data);
      alert('Login successful!');
      navigate('/'); 
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Panel */}
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-gray-800 text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <Link to="/" className="text-4xl font-bold tracking-tighter" style={{ fontFamily: "'Merriweather', serif" }}>
            zomato <span className="font-light text-red-500">for Business</span>
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              {/* <input id="password" name="password" type="password" required placeholder="••••••••" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /> */}
              <input id="password" name="password" type="password" required placeholder="••••••••" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900" />
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