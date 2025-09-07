import React from 'react';
import { Link  , useNavigate} from 'react-router-dom';
import axios from 'axios';


const FoodPartnerRegisterPage = () => {

  const navigate  = useNavigate();

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
      const response = await axios.post('http://localhost:3000/api/food-partner/register', data);
      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/food-partner/login');
      }
    }
    catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
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
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a strong password"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
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
