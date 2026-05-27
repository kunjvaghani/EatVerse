import React from 'react';

const TestimonialCard = ({ name, role, text, avatar, rating }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-2xl">⭐</span>
        ))}
      </div>

      {/* Testimonial text */}
      <p className="text-gray-700 mb-6 leading-relaxed italic">&quot;{text}&quot;</p>

      {/* User info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Enthusiast',
      text: 'Eatverse has completely changed how I discover new restaurants. The video reels are addictive!',
      avatar: 'SJ',
      rating: 5
    },
    {
      name: 'Raj Patel',
      role: 'Restaurant Owner',
      text: 'As a partner, the platform has helped me reach thousands of new customers. Highly recommended!',
      avatar: 'RP',
      rating: 5
    },
    {
      name: 'Emily Chen',
      role: 'Food Blogger',
      text: 'The UI is beautiful and intuitive. I love how easy it is to find and save my favorite dishes.',
      avatar: 'EC',
      rating: 5
    },
    {
      name: 'Michael Brown',
      role: 'Delivery Partner',
      text: 'Great platform for partners to showcase their food. The community is amazing and supportive.',
      avatar: 'MB',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Loved by <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Users & Partners</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers and successful restaurant partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
