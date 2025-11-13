import React, { useState } from "react";

/**
 * ProductCard Component
 * 
 * @param {Object} product - Product object
 * @param {string} product.brand - Brand name
 * @param {string} product.title - Product title
 * @param {number} product.rating - Product rating (0-5)
 * @param {number} product.price - Current/discounted price
 * @param {number} product.oldPrice - Original price before discount
 * @param {number} product.discount - Discount percentage
 * @param {string} product.image - Product image URL
 */
const ProductCard = ({ product }) => {
  const {
    brand = "Brand Name",
    title = "Product Title",
    name,
    rating = 4,
    price,
    oldPrice,
    originalPrice,
    discount,
    image,
  } = product;

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Use new or old property names for backward compatibility
  const displayTitle = title || name;
  const displayOldPrice = oldPrice || originalPrice;

  // Render star rating
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
      {/* Image Container */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            {discount}% OFF
          </div>
        )}

        {/* Wishlist Button - Shows on Hover */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 hover:bg-red-50 group/wishlist"
          aria-label="Add to wishlist"
        >
          <svg
            className={`w-5 h-5 transition-all ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "fill-none text-gray-700 group-hover/wishlist:fill-red-500 group-hover/wishlist:text-red-500"
            }`}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Product Image */}
        <img
          src={image}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand */}
        {brand && (
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            {brand}
          </p>
        )}

        {/* Product Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[48px]">
          {displayTitle}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">{renderStars()}</div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{price?.toLocaleString('en-IN')}
          </span>
          {displayOldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{displayOldPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-all text-sm font-semibold mt-auto flex items-center justify-center gap-2 group/button">
          <svg
            className="w-5 h-5 group-hover/button:animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
