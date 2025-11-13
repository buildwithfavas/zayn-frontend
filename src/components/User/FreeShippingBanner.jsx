
const FreeShippingBanner = () => {
  return (
    <div className="py-4">
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-8 py-5 flex items-center gap-6">
          {/* Package Icon */}
          <div className="flex-shrink-0">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex-grow flex items-center gap-4 flex-wrap">
            <h3 className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
              Free Shipping
            </h3>
            <p className="text-white text-sm md:text-base font-normal">
              Free Delivery Now On Your First Order and over ₹200
            </p>
          </div>

          {/* Price Tag */}
          <div className="flex-shrink-0">
            <span className="text-white text-lg md:text-xl font-semibold whitespace-nowrap">
              - Only ₹200*
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
