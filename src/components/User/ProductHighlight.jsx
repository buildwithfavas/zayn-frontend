

import React from "react";

/**
 * ProductHighlight Component
 * Displays a product highlight banner with background image and stacked side images
 * All data comes from props (backend will provide this data)
 * 
 * @param {Object} props - Component props
 * @param {string} props.backgroundImage - Main background image URL
 * @param {string} props.sideImage1 - First side image URL (top)
 * @param {string} props.sideImage2 - Second side image URL (bottom)
 * @param {string} props.title - Product title
 * @param {string} props.description - Product description
 * @param {string} props.buttonText - Button text
 * @param {string} props.buttonLink - Button link URL
 * @param {string} props.badge - Optional badge text
 * @param {function} props.onButtonClick - Button click handler
 */
const ProductHighlight = ({
  backgroundImage,
  sideImage1,
  sideImage2,
  title,
  description,
  buttonText,
  buttonLink,
  badge,
  onButtonClick
}) => {
  // Debug: Log the backgroundImage value
  console.log('Background Image URL:', backgroundImage);
  
  return (
    <div className="py-2">
      {/* Main Container with Background Image */}
      <div 
        className="relative h-64 md:h-80 rounded-3xl overflow-hidden"
        style={{ 
          backgroundImage: backgroundImage ? `url("${backgroundImage}")` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability - TEMPORARILY REMOVED TO TEST */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-10 rounded-3xl"></div> */}
        
        {/* Content Container */}
        <div className="relative h-full flex items-end justify-between p-6 md:p-8">
          
          {/* Left Side - Text Content */}
          <div className="text-white max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {title}
            </h2>
            <p className="text-white/90 mb-6 text-sm md:text-base leading-relaxed max-w-xs" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              {description}
            </p>
            <button 
              onClick={onButtonClick}
              className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors uppercase"
            >
              {buttonText}
            </button>
          </div>

          {/* Right Side - Stacked Images */}
          <div className="flex flex-col gap-3">
            {/* Top Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
              <img
                src={sideImage1}
                alt="Product variant 1"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            
            {/* Bottom Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
              <img
                src={sideImage2}
                alt="Product variant 2"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Top Left Label (Optional) */}
        {badge && (
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHighlight;
