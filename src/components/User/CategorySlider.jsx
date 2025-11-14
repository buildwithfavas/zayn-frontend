import React, { useEffect, useRef, useState } from "react";

/**
 * CategorySlider Component
 * Horizontal scrollable category tabs with active state
 */
const CategorySlider = ({ categories, activeCategory, onCategoryChange }) => {
  const scrollContainerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2); // 2 on mobile by default
  const [isConstrained, setIsConstrained] = useState(true); // arrow-only for <=1024px

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 640px)');
    const mqTablet = window.matchMedia('(min-width: 641px) and (max-width: 1024px)');

    const update = () => {
      if (mqMobile.matches) {
        setItemsPerPage(3);
        setIsConstrained(true);
      } else if (mqTablet.matches) {
        setItemsPerPage(4);
        setIsConstrained(false);
      } else {
        setIsConstrained(false);
      }
    };
    update();
    mqMobile.addEventListener?.('change', update);
    mqTablet.addEventListener?.('change', update);
    return () => {
      mqMobile.removeEventListener?.('change', update);
      mqTablet.removeEventListener?.('change', update);
    };
  }, []);

  const total = categories?.length || 0;

  const scroll = (direction) => {
    if (isConstrained) {
      if (total === 0) return;
      setStartIndex((prev) => {
        const step = itemsPerPage;
        const next = direction === 'left' ? (prev - step + total) % total : (prev + step) % total;
        return next;
      });
      return;
    }
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
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Category Tabs Container */}
      <div
        ref={scrollContainerRef}
        className={
          isConstrained
            ? "flex gap-4 overflow-hidden px-2"
            : "flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
        }
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {(isConstrained ? (() => {
            if (total === 0) return [];
            const windowItems = [];
            for (let i = 0; i < itemsPerPage; i++) {
              windowItems.push(categories[(startIndex + i) % total]);
            }
            return windowItems;
          })() : categories)
          .map((category, index) => (
          <button
            key={category?.id || `${category?.name || 'cat'}-${index}`}
            onClick={() => onCategoryChange(category.id)}
            className={`flex-shrink-0 py-1.5 sm:py-2 px-2.5 sm:px-3 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all relative whitespace-nowrap border-b-2 ${
              activeCategory === category.id
                ? "text-pink-500 border-pink-500"
                : "text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300"
            }`}
            style={isConstrained ? { width: itemsPerPage === 3 ? 'calc(33.333% - 0.5rem)' : 'calc(50% - 0.5rem)', textAlign: 'center' } : undefined}
          >
            {category?.name}
          </button>
        ))}
      </div>

      {/* Right Arrow - Always Visible */}
      <button
        onClick={() => scroll("right")}
        className="ml-2 p-1.5 rounded-full hover:bg-gray-100 transition-all text-gray-600 hover:text-gray-900"
        aria-label="Scroll right"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CategorySlider;
