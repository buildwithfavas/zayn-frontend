import React, { useRef } from "react";

/**
 * CategorySlider Component
 * Horizontal scrollable category tabs with active state
 */
const CategorySlider = ({ categories, activeCategory, onCategoryChange }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/slider flex items-center">
      {/* Left Arrow - Always Visible */}
      <button
        onClick={() => scroll("left")}
        className="mr-2 p-1.5 rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-gray-900"
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Category Tabs Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 py-2 px-3 text-sm font-semibold uppercase tracking-wide transition-all relative whitespace-nowrap border-b-2 ${
              activeCategory === category.id
                ? "text-pink-500 border-pink-500"
                : "text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Right Arrow - Always Visible */}
      <button
        onClick={() => scroll("right")}
        className="ml-2 p-1.5 rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-gray-900"
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CategorySlider;
