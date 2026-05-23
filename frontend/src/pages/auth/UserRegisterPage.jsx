// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';


// const UserRegisterPage =  () => {
  
//   const handlesubmit =  async (e) => {
//     e.preventDefault();
    
//     console.log("Form submitted");
//     const name = e.target.fullName.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     const userData = {
//       fullName,
//       email,
//       password
//     };

//     const resposne = await axios.post('http://localhost:3000/api/user/register', userData)
//     console.log(resposne);

//     res.status(201).json({ message: 'User registered successfully', user: resposne.data});
//   }; 

  
//   return (
//     <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
//       {/* Left Branding Panel */}
//       <div className="relative hidden md:flex flex-col justify-between p-12 bg-red-600 text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')" }}>
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="relative z-10">
//           <Link to="/" className="text-4xl font-bold tracking-tighter" style={{fontFamily: "'Merriweather', serif"}}>zomato</Link>
//         </div>
//         <div className="relative z-10">
//           <h1 className="text-5xl font-bold leading-tight">Join millions of food lovers.</h1>
//           <p className="mt-4 text-lg text-gray-200">Sign up to explore the best restaurants and dishes in your city.</p>
//         </div>
//       </div>

//       {/* Right Form Panel */}
//       <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
//           <p className="text-gray-600 mb-6">Let's get you started!</p>
          
//           <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-lg mb-6">
//             <label className="text-center py-2 rounded-md text-sm font-medium cursor-pointer bg-white text-red-600 shadow">
//                 Register as User
//             </label>
//             <Link to="/food-partner/register" className="flex justify-center items-center text-center py-2 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-300">
//                 Register as Partner
//             </Link>
//           </div>
          
//           <form className="space-y-5">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input id="name" name="name" type="text" required placeholder="John Doe" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
//             </div>

//             <div >
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input id="password" name="password" type="password" required placeholder="Create a strong password" className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
//             </div>
            
//             <div>
//               <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition" onSubmit={handlesubmit}>Create Account</button>
//             </div>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             <p className="text-gray-600">Already have an account? <Link to="/user/login" className="font-semibold text-red-600 hover:underline">Log In</Link></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserRegisterPage;

import React, { useState } from 'react';
import { Link  , useNavigate} from 'react-router-dom';
import axios from 'axios';

const UserRegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const userData = {
      fullName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        userData , {
          withCredentials: true});

          
      console.log('User registered:', response.data);

      alert('User registered successfully!');
      navigate('/');


    } catch (error) {
      console.error('Error registering user:', error);  
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Panel */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 bg-red-600 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')",
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
            Join millions of food lovers.
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Sign up to explore the best restaurants and dishes in your city.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Link to="/" className="text-red-600 font-medium mb-4 inline-block">Go back to home</Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create an Account
          </h2>
          <p className="text-gray-600 mb-6">Let's get you started!</p>

          <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-lg mb-6">
            <label className="text-center py-2 rounded-md text-sm font-medium cursor-pointer bg-white text-red-600 shadow">
              Register as User
            </label>
            <Link
              to="/food-partner/register"
              className="flex justify-center items-center text-center py-2 rounded-md text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-300"
            >
              Register as Partner
            </Link>
          </div>

          {/* FIXED: onSubmit belongs here, not on the button */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
              />
            </div>

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
                placeholder="you@example.com"
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
              Already have an account?{' '}
              <Link
                to="/user/login"
                className="font-semibold text-red-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
