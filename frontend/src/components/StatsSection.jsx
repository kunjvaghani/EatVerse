import React, { useEffect, useState } from 'react';

const StatCard = ({ number, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(number.replace(/\D/g, ''));
    if (count < target) {
      const timer = setTimeout(() => setCount(count + Math.ceil(target / 50)), 50);
      return () => clearTimeout(timer);
    }
  }, [count, number]);

  return (
    <div className="text-center group cursor-pointer transform hover:scale-110 transition duration-300">
      <div className="relative inline-block mb-4">
        <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          {count.toLocaleString()}
        </div>
        <div className="text-4xl absolute -top-2 -right-8 animate-bounce">{icon}</div>
      </div>
      <p className="text-gray-400 font-semibold">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section id="stats" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Trusted by <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Millions</span>
          </h2>
          <p className="text-gray-400 text-lg">Join our growing community of food lovers and restaurant partners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <StatCard number="10M+" label="Active Users" icon="👥" />
          <StatCard number="500K+" label="Restaurants" icon="🍽️" />
          <StatCard number="50M+" label="Orders Delivered" icon="🚚" />
          <StatCard number="95%" label="Customer Satisfaction" icon="⭐" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
