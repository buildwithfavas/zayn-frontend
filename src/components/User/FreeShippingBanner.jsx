
const FreeShippingBanner = () => {
  return (
    <div className="py-4">
      <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="px-5 py-6 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 rounded-full p-3">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                  />
                </svg>
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">
              🚚 Free Shipping
            </h3>
            
            {/* Description */}
            <p className="text-white/90 text-sm font-medium mb-3 leading-relaxed">
              Free Delivery On Your First Order<br />
              <span className="text-white font-semibold">& Orders Over ₹200</span>
            </p>
            
            {/* Price Badge */}
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-bold">
                Only ₹200 Minimum*
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="px-6 md:px-8 py-5 md:py-6 flex items-center gap-4 md:gap-6">
            {/* Package Icon */}
            <div className="flex-shrink-0">
              <div className="bg-white/20 rounded-full p-3">
                <svg 
                  className="w-10 h-10 md:w-12 md:h-12 text-white" 
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
            </div>

            {/* Text Content */}
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                🚚 Free Shipping
              </h3>
              <p className="text-white/90 text-sm md:text-base font-medium">
                Free Delivery Now On Your First Order and over ₹200
              </p>
            </div>

            {/* Price Tag */}
            <div className="flex-shrink-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-base md:text-lg font-bold whitespace-nowrap">
                  Only ₹200*
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
