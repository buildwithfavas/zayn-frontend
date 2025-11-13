import React from "react";

const AnnouncementBar = () => {
  return (
    <header className="bg-gray-800 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm">
        {/* Mobile: Single line with better text wrapping */}
        <div className="block sm:hidden text-center">
          <p className="whitespace-nowrap">🎉 50% off new styles - Limited time!</p>
        </div>
        
        {/* Desktop: Full text */}
        <div className="hidden sm:block">
          <p className="text-left">Get up to 50% off new season styles, limited time only 🎉</p>
        </div>
        
        <div className="flex gap-3 sm:gap-4">
          <a href="#" className="hover:text-gray-300 whitespace-nowrap">Help Center</a>
          <a href="#" className="hover:text-gray-300 whitespace-nowrap">Order Tracking</a>
        </div>
      </div>
    </header>
  );
};

export default AnnouncementBar;
