import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const loginData = { email, password };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/login',
        loginData,
        { withCredentials: true }
      );

      console.log('Login successful:', response.data);
      alert('Login successful!');
      navigate('/'); // ✅ Redirect on success
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Panel */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 bg-red-600 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <Link
            to="/"
            className="text-4xl font-bold tracking-tighter"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            zomato
          </Link>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight">
            Your next meal is just a few clicks away.
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Log in to discover restaurants, track your orders, and enjoy a
            seamless food experience.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
            <Link to="/" className="text-red-600 font-medium mb-4 inline-block">Go back to home</Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">
            Sign in to continue your culinary journey.
          </p>

          <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-lg mb-6">
            <label className="text-center py-2 rounded-md text-sm font-medium cursor-pointer bg-white text-red-600 shadow">
              User Login
            </label>
            <Link
              to="/food-partner/login"
              className="flex justify-center items-center text-center py-2 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-300"
            >
              Partner Login
            </Link>
          </div>

          <form className="space-y-5" aria-label="login form" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@domain.com"
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-red-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              New here?{" "}
              <Link
                to="/user/register"
                className="font-semibold text-red-600 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;



