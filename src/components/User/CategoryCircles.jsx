import { useEffect, useRef, useState } from "react";
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
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2); // 2 on mobile by default
  const [isConstrained, setIsConstrained] = useState(true); // arrow-only for <=1024px

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const mqTablet = window.matchMedia("(min-width: 641px) and (max-width: 1024px)");

    const update = () => {
      if (mqMobile.matches) {
        setItemsPerPage(3); // target ~3 visible on mobile
        setIsConstrained(false); // mobile scrollable like desktop
      } else if (mqTablet.matches) {
        setItemsPerPage(4);
        setIsConstrained(false);
      } else {
        setIsConstrained(false);
      }
    };
    update();
    mqMobile.addEventListener?.("change", update);
    mqTablet.addEventListener?.("change", update);
    return () => {
      mqMobile.removeEventListener?.("change", update);
      mqTablet.removeEventListener?.("change", update);
    };
  }, []);

  const total = items?.length || 0;

  const scroll = (direction) => {
    if (isConstrained) {
      if (total === 0) return;
      setStartIndex((prev) => {
        const step = itemsPerPage;
        const next = direction === "left" ? (prev - step + total) % total : (prev + step) % total;
        return next;
      });
      return;
    }
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-8 pb-4 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Arrows - Top Right */}
        <div className="absolute right-0 -top-7 sm:-top-8 flex gap-1.5 sm:gap-2 z-10">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="bg-gray-800 hover:bg-gray-900 text-white p-2 sm:p-2.5 rounded-full transition-all shadow-md"
            aria-label="Scroll left"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="bg-gray-800 hover:bg-gray-900 text-white p-2 sm:p-2.5 rounded-full transition-all shadow-md"
            aria-label="Scroll right"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Items Container */}
        <div
          ref={scrollContainerRef}
          className={
            isConstrained
              ? "flex gap-8 overflow-hidden py-4"
              : "flex gap-3 sm:gap-6 md:gap-8 overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth py-3 sm:py-4"
          }
        >
          {(isConstrained
            ? (() => {
                if (total === 0) return [];
                const windowItems = [];
                for (let i = 0; i < itemsPerPage; i++) {
                  windowItems.push(items[(startIndex + i) % total]);
                }
                return windowItems;
              })()
            : items
          ).map((item, index) => (
            <a
              key={item?.id || `${item?.name || "item"}-${index}`}
              href={item?.href || item?.link}
              className="flex flex-col items-center group/item shrink-0"
              style={
                isConstrained
                  ? { width: itemsPerPage === 3 ? "calc(33.333% - 1rem)" : "calc(50% - 1rem)" }
                  : undefined
              }
            >
              {/* Circle Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-100 mb-2 sm:mb-3 group-hover/item:shadow-xl transition-all duration-300 group-hover/item:scale-110">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/src/assets/fashion-preview.jpg";
                  }}
                />
              </div>
              {/* Category Name */}
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 group-hover/item:text-blue-600 transition-colors text-center whitespace-nowrap">
                {item?.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCircles;
