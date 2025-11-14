import { useRef } from "react";
import { categories } from "../../data/products";

/**
 * CategoryCircles Component
 * 
 * @param {Object[]} items - Array of category objects
 * @param {string} items[].name - Category name
 * @param {string} items[].image - Image URL for the category
 * @param {string} items[].href - Navigation link for the category
 */
const CategoryCircles = ({ items = categories }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="pt-8 pb-4 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Navigation Arrows - Top Right */}
        <div className="absolute right-4 sm:right-6 -top-8 flex gap-2 z-10">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="bg-gray-800 hover:bg-gray-900 text-white p-2.5 rounded-full transition-all shadow-md"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="bg-gray-800 hover:bg-gray-900 text-white p-2.5 rounded-full transition-all shadow-md"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth py-4"
        >
          {items.map((item, index) => (
            <a
              key={item.id || index}
              href={item.href || item.link}
              className="flex flex-col items-center group/item flex-shrink-0"
            >
              {/* Circle Image */}
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 mb-3 group-hover/item:shadow-xl transition-all duration-300 group-hover/item:scale-110">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    e.target.src = "/src/assets/fashion-preview.jpg";
                  }}
                />
              </div>
              {/* Category Name */}
              <span className="text-sm md:text-base font-medium text-gray-900 group-hover/item:text-blue-600 transition-colors text-center whitespace-nowrap">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCircles;
