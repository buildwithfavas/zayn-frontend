import { useEffect, useState } from 'react';
import ProductCard from '../../components/user/ProductCard';
import { allProducts as products } from '../../data/dummyProducts';

// Debug: Check if products are imported correctly
console.log('Import check - products:', products);

const ProductListing = () => {
  console.log('ProductListing component is rendering!');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    color: [],
    categories: [],
    gender: [],
    brand: [],
    price: [0, 10000],
    rating: []
  });
  const [expandedSections, setExpandedSections] = useState({
    refineBy: true,
    size: true,
    color: true,
    categories: true,
    gender: true,
    brand: true,
    price: true,
    rating: true
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  // Debug: Log products to console
  console.log('Products loaded:', products);
  console.log('Products length:', products.length);

  const productsPerPage = 12;
  const totalProducts = products.length; // Dynamic total based on actual products
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  // Calculate dynamic product range for current page
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  // Calculate dynamic pagination buttons (sliding window)
  const getVisiblePages = (maxVisiblePages) => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePagesDesktop = getVisiblePages(5);
  const visiblePagesMobile = getVisiblePages(3);

  // Clamp currentPage within valid bounds when total pages change (e.g., after filters)
  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
      return;
    }
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages]);


  const sizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];
  const colors = [
    { name: "Blue", class: "bg-blue-600" },
    { name: "Orange", class: "bg-orange-500" },
    { name: "Black", class: "bg-black" },
    { name: "Green", class: "bg-green-700" },
    { name: "Gray", class: "bg-gray-600" },
    { name: "Red", class: "bg-red-500" },
    { name: "Light Gray", class: "bg-gray-300" },
    { name: "Blue Gray", class: "bg-slate-500" },
    { name: "Brown", class: "bg-amber-700" },
    { name: "Light Brown", class: "bg-orange-300" }
  ];
  const categories = ["Casual Shoes", "Runners", "Hiking", "Sneaker", "Basketball", "Golf", "Outdoor"];
  const genders = ["Men", "Women"];
  const brands = ["Adidas", "Puma"];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      size: [],
      color: [],
      categories: [],
      gender: [],
      brand: [],
      price: [0, 10000],
      rating: []
    });
  };

  // Reusable Filters form renderer so we can reuse inside sidebar and mobile modal
  const renderFilters = () => (
    <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-lg p-6 shadow-sm">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={() => clearAllFilters()}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      {/* Refine By */}
      <FilterSection
        title="REFINE BY"
        isExpanded={expandedSections.refineBy}
        onToggle={() => toggleSection('refineBy')}
      >
        <div className="flex flex-wrap gap-2">
          {selectedFilters.size.map(size => (
            <span key={`size-${size}`} className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg">
              Size {size}
            </span>
          ))}
          {selectedFilters.color.map(color => (
            <span key={`color-${color}`} className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-lg">
              {color}
            </span>
          ))}
          {selectedFilters.categories.map(category => (
            <span key={`category-${category}`} className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-lg">
              {category}
            </span>
          ))}
          {selectedFilters.gender.map(gender => (
            <span key={`gender-${gender}`} className="px-2 py-1 bg-pink-600 text-white text-xs font-medium rounded-lg">
              {gender}
            </span>
          ))}
          {selectedFilters.brand.map(brand => (
            <span key={`brand-${brand}`} className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded-lg">
              {brand}
            </span>
          ))}
          {selectedFilters.rating.map(rating => (
            <span key={`rating-${rating}`} className="px-2 py-1 bg-yellow-600 text-white text-xs font-medium rounded-lg">
              {rating} Stars
            </span>
          ))}
          {selectedFilters.price[1] !== 10000 && (
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-lg">
              ₹{selectedFilters.price[0]} - ₹{selectedFilters.price[1].toLocaleString('en-IN')}
            </span>
          )}
          {selectedFilters.size.length === 0 && 
           selectedFilters.color.length === 0 && 
           selectedFilters.categories.length === 0 && 
           selectedFilters.gender.length === 0 && 
           selectedFilters.brand.length === 0 && 
           selectedFilters.rating.length === 0 && 
           selectedFilters.price[1] === 10000 && (
            <span className="text-gray-500 text-sm italic">No filters selected</span>
          )}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection
        title="SIZE"
        isExpanded={expandedSections.size}
        onToggle={() => toggleSection('size')}
      >
        <div className="grid grid-cols-5 gap-3">
          {sizes.map(size => (
            <button
              type="button"
              key={size}
              onClick={() => toggleFilter('size', size)}
              className={`w-10 h-10 text-sm font-medium rounded-lg ${
                selectedFilters.size.includes(size)
                  ? 'bg-black text-white'
                  : size === '39' || size === '40' 
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-white text-black border border-gray-200 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection
        title="COLOR"
        isExpanded={expandedSections.color}
        onToggle={() => toggleSection('color')}
      >
        <div className="grid grid-cols-5 gap-3">
          {colors.map(color => (
            <button
              type="button"
              key={color.name}
              onClick={() => toggleFilter('color', color.name)}
              className={`w-10 h-10 rounded-lg ${color.class} ${
                selectedFilters.color.includes(color.name)
                  ? 'ring-2 ring-gray-900 ring-offset-2'
                  : 'hover:ring-2 hover:ring-gray-400 hover:ring-offset-1'
              }`}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection
        title="CATEGORIES"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection('categories')}
      >
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFilters.categories.includes(category)}
                onChange={() => toggleFilter('categories', category)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Gender */}
      <FilterSection
        title="GENDER"
        isExpanded={expandedSections.gender}
        onToggle={() => toggleSection('gender')}
      >
        <div className="space-y-2">
          {genders.map(gender => (
            <label key={gender} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFilters.gender.includes(gender)}
                onChange={() => toggleFilter('gender', gender)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection
        title="BRAND"
        isExpanded={expandedSections.brand}
        onToggle={() => toggleSection('brand')}
      >
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFilters.brand.includes(brand)}
                onChange={() => toggleFilter('brand', brand)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection
        title="PRICE"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-4">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="10000"
              value={selectedFilters.price[1]}
              onInput={(e) => {
                setSelectedFilters(prev => ({
                  ...prev,
                  price: [0, parseInt(e.target.value)]
                }));
              }}
              onChange={(e) => {
                setSelectedFilters(prev => ({
                  ...prev,
                  price: [0, parseInt(e.target.value)]
                }));
              }}
              onMouseMove={(e) => {
                if (e.buttons === 1) {
                  setSelectedFilters(prev => ({
                    ...prev,
                    price: [0, parseInt(e.target.value)]
                  }));
                }
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(selectedFilters.price[1] / 10000) * 100}%, #e5e7eb ${(selectedFilters.price[1] / 10000) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹{selectedFilters.price[0]}</span>
              <span>₹{selectedFilters.price[1].toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Filter by Rating */}
      <FilterSection
        title="FILTER BY RATING"
        isExpanded={expandedSections.rating}
        onToggle={() => toggleSection('rating')}
      >
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.rating.includes(rating)}
                onChange={() => toggleFilter('rating', rating)}
                className="mr-3 text-blue-600"
              />
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </label>
          ))}
        </div>
      </FilterSection>
    </form>
  );

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div
        onClick={() => onToggle()}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3 cursor-pointer"
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isExpanded && children}
    </div>
  );

  return (
    <>
    <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#e7e7e3'}}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-6">
        {/* Mobile Filters/Sort Bar */}
        <div className="sm:hidden flex items-center justify-between mb-3">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-medium shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 12h12M10 20h4" />
            </svg>
            Filters
          </button>
          <button
            onClick={() => setIsSortModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-semibold shadow-sm"
          >
            SORT BY
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Header with Sort */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Life Style Shoes</h1>
            <p className="text-gray-600 text-sm">Showing {startProduct}-{endProduct} out of {totalProducts} products</p>
          </div>
          <div className="relative hidden sm:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              style={{backgroundColor: '#f4f2f2'}}
            >
              <option value="default">SORT BY</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            {renderFilters()}
          </div>

          {/* Right Content - Products */}
          <div className="flex-1">

            {/* Products Grid: 2 on mobile, 3 on tablet, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-8">
              {products && products.length > 0 ? (
                products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No products found. Products length: {products ? products.length : 'undefined'}</p>
                </div>
              )}
            </div>

            {/* Pagination (Mobile) — dynamic window using visiblePages */}
            <div className="sm:hidden flex flex-wrap items-center justify-center gap-2 mt-2 w-full">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 text-xs rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
                aria-label="Previous page"
              >&lt;</button>

              {visiblePagesMobile.map(page => (
                <button
                  key={`m-${page}`}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs rounded-lg border ${currentPage === page ? 'bg-black text-white' : ''}`}
                  style={currentPage === page
                    ? { backgroundColor: '#232321', color: 'white', borderColor: '#232321' }
                    : { backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
                >
                  {page}
                </button>
              ))}

              {visiblePagesMobile[visiblePagesMobile.length - 1] < totalPages && (
                <>
                  <span className="px-1 text-gray-400 text-xs">…</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 text-xs rounded-lg border"
                    style={{ backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 text-xs rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
                aria-label="Next page"
              >&gt;</button>
            </div>

            <div className="hidden sm:flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
              >
                &lt; PREVIOUS
              </button>
              {visiblePagesDesktop.map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg border transition-colors ${currentPage === page ? 'bg-black text-white' : 'hover:opacity-80'}`}
                  style={currentPage === page
                    ? { backgroundColor: '#232321', color: 'white', borderColor: '#232321' }
                    : { backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
                >
                  {page}
                </button>
              ))}
              {visiblePagesDesktop[visiblePagesDesktop.length - 1] < totalPages && (
                <>
                  <span className="px-2 text-gray-400 text-sm">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-10 h-10 text-sm font-medium border rounded-lg hover:opacity-80"
                    style={{ backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#e7e7e3', color: '#232321', borderColor: '#232321' }}
              >
                NEXT &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Mobile Filter Modal */}
    {isFilterModalOpen && (
      <div className="fixed inset-0 z-50 sm:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterModalOpen(false)} />
        <div className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-2xl shadow-2xl overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={() => setIsFilterModalOpen(false)} aria-label="Close Filters">
              ✕
            </button>
          </div>
          <div className="p-4 space-y-4">
            {renderFilters()}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => clearAllFilters()}
                className="flex-1 border rounded-lg py-2 text-sm font-medium"
                style={{ backgroundColor: '#f4f2f2', color: '#232321', borderColor: '#232321' }}
              >
                RESET
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 rounded-lg py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: '#232321' }}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Mobile Sort Modal */}
    {isSortModalOpen && (
      <div className="fixed inset-0 z-50 sm:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsSortModalOpen(false)} />
        <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Sort By</h3>
            <button onClick={() => setIsSortModalOpen(false)} aria-label="Close Sort">✕</button>
          </div>
          <div className="space-y-2">
            {[
              { value: 'default', label: 'Default' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'rating', label: 'Rating' },
              { value: 'newest', label: 'Newest' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center justify-between p-3 rounded-lg border bg-white">
                <span className="text-sm">{opt.label}</span>
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === opt.value}
                  onChange={() => setSortBy(opt.value)}
                />
              </label>
            ))}
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              onClick={() => setIsSortModalOpen(false)}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: '#232321' }}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ProductListing;
