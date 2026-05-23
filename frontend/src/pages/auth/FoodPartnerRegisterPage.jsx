import React, { useState } from 'react';
import { Link  , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';


const FoodPartnerRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate  = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.restaurantName.value,
      contactname: form.contactName.value,
      phone: form.phone.value,
      email: form.email.value,
      address: form.address.value,
      password: form.password.value,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/food-partner/register`, data);
      if (response.status === 201) {
        login(response.data.partner || response.data.user || data);
        toast.success('Restaurant registered successfully! Welcome to Zomato 🎉');
        navigate('/');
      }
    }
    catch (error) {
      console.error('Error during registration:', error);
      const msg = error?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    }
  };


  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Panel */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 bg-gray-800 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=1974&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <Link
            to="/"
            className="text-4xl font-bold tracking-tighter"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            zomato <span className="font-light text-red-500">for Business</span>
          </Link>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight">
            Grow your business with Zomato.
          </h1>
          <ul className="mt-6 space-y-4 text-lg text-gray-200">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Reach millions of new customers.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Utilize our world-class delivery fleet.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-red-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Increase your revenue and visibility.
            </li>
          </ul>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="text-red-600 font-medium mb-4 inline-block">Go back to home</Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Register Your Restaurant
          </h2>
          <p className="text-gray-600 mb-6">Join our network of partners today.</p>

          <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-lg mb-6">
            <Link
              to="/user/register"
              className="flex justify-center items-center text-center py-2 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-300"
            >
              Register as User
            </Link>
            <label className="text-center py-2 rounded-md text-sm font-medium cursor-pointer bg-white text-red-600 shadow">
              Register as Partner
            </label>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-gray-700"
              >
                Restaurant Name
              </label>
              <input
                id="restaurantName"
                name="restaurantName"
                type="text"
                required
                placeholder="The Good Food Place"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="contactName"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Name
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                required
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 9876543210"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Business Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="business@restaurant.com"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Surat , Gujarat"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

            
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Create a strong password"
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
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already a partner?{" "}
              <Link
                to="/food-partner/login"
                className="font-semibold text-red-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegisterPage;
