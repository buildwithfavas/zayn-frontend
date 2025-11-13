import React from "react";

/**
 * PromoBanners Component
 * Displays two promotional banners side by side
 * Each banner can have an image background or solid color background with text overlay
 * 
 * @param {Object} props - Component props
 * @param {Array} props.banners - Array of banner objects
 * @param {string} props.banners[].id - Unique identifier
 * @param {string} props.banners[].backgroundImage - Background image URL (optional)
 * @param {string} props.banners[].backgroundColor - Background color (optional)
 * @param {string} props.banners[].badge - Small badge text (e.g., "Big saving days sale")
 * @param {string} props.banners[].title - Main title
 * @param {string} props.banners[].subtitle - Subtitle
 * @param {string} props.banners[].priceLabel - Price label (e.g., "Starting At Only")
 * @param {string} props.banners[].price - Price value
 * @param {string} props.banners[].buttonText - Button text
 * @param {string} props.banners[].buttonLink - Button link URL
 * @param {function} props.onButtonClick - Button click handler
 */
const PromoBanners = ({ banners, onButtonClick }) => {
  return (
    <div className="py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative h-40 md:h-48 lg:h-52 rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer"
            style={{
              backgroundImage: banner.backgroundImage ? `url("${banner.backgroundImage}")` : banner.gradientBackground || 'none',
              backgroundColor: banner.backgroundColor || 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-center p-3 md:p-4">
              {/* Overlay for better text readability */}
              {banner.backgroundImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl" />
              )}
              
              {/* Badge */}
              {banner.badge && (
                <div className="mb-1 relative z-10">
                  <span className="text-white text-[10px] md:text-xs font-medium opacity-90">
                    {banner.badge}
                  </span>
                </div>
              )}
              
              {/* Title */}
              <h2 
                className={`text-white font-bold mb-1.5 leading-tight max-w-full relative z-10 ${
                  banner.backgroundColor ? 'text-xs md:text-sm lg:text-base' : 'text-sm md:text-base lg:text-lg'
                }`}
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              >
                {banner.title}
              </h2>
              
              {/* Subtitle */}
              {banner.subtitle && (
                <p 
                  className={`text-white opacity-90 max-w-full line-clamp-2 relative z-10 ${
                    banner.backgroundColor ? 'text-[9px] md:text-xs lg:text-sm mb-2' : 'text-xs md:text-sm lg:text-base mb-2.5'
                  }`}
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {banner.subtitle}
                </p>
              )}
              
              {/* Price Section */}
              {banner.price && (
                <div className={banner.backgroundColor ? 'mb-2 relative z-10' : 'mb-2.5 relative z-10'}>
                  {banner.priceLabel && (
                    <p 
                      className="text-white text-[9px] md:text-xs mb-0.5 opacity-80"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {banner.priceLabel}
                    </p>
                  )}
                  <p 
                    className={`text-white font-bold ${
                      banner.backgroundColor ? 'text-sm md:text-base lg:text-lg' : 'text-base md:text-lg lg:text-xl'
                    }`}
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {banner.price}
                  </p>
                </div>
              )}
              
              {/* Button */}
              <button
                onClick={() => onButtonClick && onButtonClick(banner)}
                className={`bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors uppercase w-fit relative z-10 ${
                  banner.backgroundColor ? 'px-2.5 py-1.5 text-[10px] md:text-xs' : 'px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm'
                }`}
              >
                {banner.buttonText || "Shop Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
