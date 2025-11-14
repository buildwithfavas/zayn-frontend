import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Fashion", href: "/products" },
    { name: "Bags", href: "/products" },
    { name: "Footwear", href: "/products" },
    { name: "Beauty", href: "/products" },
    { name: "Jewellery", href: "/products" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-0">
          {/* Shop By Categories Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition w-full lg:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-sm sm:text-base">Shop By Categories</span>
          </button>

          {/* Navigation Links - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm xl:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-gray-50 rounded-lg p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#"
                className="block text-gray-700 hover:text-gray-900 font-medium py-2 border-t border-gray-200 pt-2 mt-2"
              >
                International Delivery
              </a>
            </div>
          )}

          {/* International Delivery - Hidden on mobile, shown on desktop */}
          <a
            href="#"
            className="hidden lg:block text-gray-700 hover:text-gray-900 font-medium text-sm xl:text-base whitespace-nowrap"
          >
            International Delivery
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

