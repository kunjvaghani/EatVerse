import React from 'react';

const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <div className="group relative p-8 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-gray-600 group-hover:text-gray-100 transition-colors leading-relaxed">{description}</p>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: '🍴',
      title: 'Explore Restaurants',
      description: 'Discover thousands of restaurants, cafes, and bars with detailed menus, ratings, and reviews.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🎬',
      title: 'Video Reels Feed',
      description: 'Watch Instagram-style food videos from your favorite restaurants. Like, save, and share your favorites.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🚀',
      title: 'Order Online',
      description: 'Order your favorite meals online with fast, reliable delivery straight to your doorstep.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: '📊',
      title: 'Partner Dashboard',
      description: 'Manage your restaurant, upload food videos, track orders, and grow your business effortlessly.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: '❤️',
      title: 'Save Your Favorites',
      description: 'Create collections of your favorite food items and restaurants for quick access anytime.',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: '🤝',
      title: 'Community & Rewards',
      description: 'Follow your favorite partners, earn rewards, and become part of our growing food community.',
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
            Everything You Need to <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Enjoy Food</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From discovering new restaurants to ordering your favorite dishes, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
