import React, { useEffect, useRef, useState } from 'react';

const IconUser = ({ className = 'w-10 h-10 text-red-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 12c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5 2.2386 5 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 21c0-3.866 3.582-7 9-7s9 3.134 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconRestaurant = ({ className = 'w-10 h-10 text-red-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDelivery = ({ className = 'w-10 h-10 text-red-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 7h13v8H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 11h4l1 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="7.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="18.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const IconStar = ({ className = 'w-10 h-10 text-red-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2l2.6 6.9L22 11l-5 3.6L18 21l-6-3.6L6 21l1-6.4L2 11l7.4-2.1L12 2z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
  </svg>
);

const StatCard = ({ number, label, Icon }) => {
  const [value, setValue] = useState(0);
  const refStart = useRef(null);

  // parse number like '10M+' or '95%'
  const parsed = (() => {
    if (typeof number === 'number') return { target: number, suffix: '' };
    const pct = number.includes('%');
    const clean = number.replace(/[+,\s%]/g, '');
    let multiplier = 1;
    if (/M$/i.test(number) || /M\+/.test(number)) multiplier = 1000000;
    if (/K$/i.test(number) || /K\+/.test(number)) multiplier = 1000;
    // extract numeric part
    const numMatch = clean.match(/\d+(?:\.\d+)?/);
    const num = numMatch ? parseFloat(numMatch[0]) : 0;
    return { target: Math.round(num * multiplier), suffix: pct ? '%' : '' };
  })();

  useEffect(() => {
    let rafId;
    const duration = 1100;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(parsed.target * eased);
      setValue(current);
      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [number]);

  const display = parsed.suffix === '%' ? `${Math.min(100, value)}%` : value >= 1000 ? value.toLocaleString() : String(value);

  return (
    <div className="relative bg-gradient-to-br from-white/3 to-white/6 border border-white/6 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <div className="mb-3">
        <Icon />
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{display}</div>
      <div className="text-sm text-gray-300 font-medium">{label}</div>
      <div className="absolute -left-6 -top-6 w-24 h-24 bg-red-600 rounded-full opacity-7 blur-2xl -z-10" aria-hidden></div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section id="stats" className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" aria-hidden>
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff7a59" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ff3b30" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path fill="url(#g)" d="M0,128L48,138.7C96,149,192,171,288,176C384,181,480,171,576,154.7C672,139,768,117,864,112C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Trusted by <span className="text-red-400">Millions</span></h2>
          <p className="text-gray-400 mt-2">Join our community of food lovers and partners building the future of local food.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatCard number="10M+" label="Active Users" Icon={IconUser} />
          <StatCard number="500K+" label="Restaurants" Icon={IconRestaurant} />
          <StatCard number="50M+" label="Orders Delivered" Icon={IconDelivery} />
          <StatCard number="95%" label="Customer Satisfaction" Icon={IconStar} />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
