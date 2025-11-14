import React, { useState, useRef } from "react";
import CategorySlider from "./CategorySlider";
import ProductCard from "./ProductCard";

/**
 * PopularProductsSection Component
 * Shows products with category filter tabs
 */
const PopularProductsSection = ({ title, subtitle, categoriesData }) => {
  const [activeCategory, setActiveCategory] = useState(categoriesData[0]?.id || "");
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Get products for active category
  const activeProducts = categoriesData.find(cat => cat.id === activeCategory)?.products || [];

  // Extract category list for slider
  const categories = categoriesData.map(cat => ({
    id: cat.id,
    name: cat.name,
  }));

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="py-4">
      {/* Header Section with Category Slider on Same Line */}
      <div className="mb-6">
        {/* Title and Category Tabs Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          
          {/* Category Slider on Right Side (Next Line on Mobile) */}
          <div className="flex-shrink-0 w-full sm:w-auto sm:max-w-md">
            <CategorySlider
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>
        
        {/* Subtitle Below */}
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      {/* Products Carousel */}
      <div className="relative group/carousel">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100 -translate-x-1/2"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Products Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {activeProducts.length > 0 ? (
            activeProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-1/2 sm:w-64">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 text-gray-500">
              No products available in this category
            </div>
          )}
        </div>

        {/* Right Arrow */}
        {showRightArrow && activeProducts.length > 0 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-all opacity-0 group-hover/carousel:opacity-100 translate-x-1/2"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularProductsSection;
