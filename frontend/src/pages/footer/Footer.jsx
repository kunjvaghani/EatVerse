import React from "react";
import { Link } from "react-router-dom";

// Reusable Social Icon
const SocialIcon = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
  >
    {children}
  </a>
);

// Reusable Column
const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-semibold text-gray-800 mb-4 tracking-wide uppercase">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            to={link.href}
            className="text-gray-600 hover:text-red-600 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Footer Sections
  const sections = [
    {
      title: "About Eatverse",
      links: [
        { label: "Who We Are", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Work With Us", href: "#" },
        { label: "Investor Relations", href: "#" },
        { label: "Press Kit", href: "#" },
      ],
    },
    {
      title: "Eatverse Network",
      links: [
        { label: "Eatverse", href: "#" },
        { label: "Blinkit", href: "#" },
        { label: "Feeding India", href: "#" },
        { label: "Eatverse Land", href: "#" },
      ],
    },
    {
      title: "For Restaurants",
      links: [
        { label: "Partner With Us", href: "/food-partner/register" },
        { label: "Apps For You", href: "#" },
      ],
    },
    {
      title: "Learn More",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Security", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative bg-gray-50 pt-24 pb-10 mt-20">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[150px]"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-current text-gray-50"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-12">
          {/* Map columns */}
          {sections.map((section, idx) => (
            <FooterColumn key={idx} {...section} />
          ))}

          {/* Get App + Social */}
          <div className="col-span-2 lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="font-semibold text-gray-800 mb-4 tracking-wide uppercase">
              Get The App
            </h4>
            <div className="flex items-center space-x-4">
              <img
                src="https://i.ibb.co/L8d01z8/qr-code.png"
                alt="QR Code"
                className="w-24 h-24 border p-1 rounded-lg"
              />
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Scan the QR or download from the stores.
                </p>
                <div className="space-y-3">
                  <a href="#">
                    <img
                      src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf55e1674621523.png"
                      alt="App Store"
                      className="h-10"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1674621553.png"
                      alt="Google Play"
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <h4 className="font-semibold text-gray-800 mt-6 mb-4 tracking-wide uppercase">
              Social Links
            </h4>
            <div className="flex space-x-4">
              <SocialIcon href="#">
                {/* LinkedIn */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                {/* Instagram */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 ..."></path>
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                {/* Twitter */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656..."></path>
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2008-
            {new Date().getFullYear()} © Eatverse™ Ltd. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
