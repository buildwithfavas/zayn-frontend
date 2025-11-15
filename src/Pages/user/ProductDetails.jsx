import { useEffect, useState } from 'react';
import { allProducts } from '../../data/dummyProducts';
import ProductCard from '../../components/user/ProductCard';

const ProductDetails = ({ product: incomingProduct, similarProducts: incomingSimilarProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [similarPage, setSimilarPage] = useState(0);
  const [isLarge, setIsLarge] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1024px)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e) => setIsLarge(e.matches);
    // Older Safari uses addListener
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else if (mq.addListener) {
      mq.addListener(handler);
    }
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else if (mq.removeListener) {
        mq.removeListener(handler);
      }
    };
  }, []);

  const itemsPerPage = isLarge ? 5 : 6;

  // Sample product data (you can pass this as props or get from URL params)
  const fallbackProduct = {
    id: 1,
    brand: "ADIDAS",
    title: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    oldPrice: 5500.00,
    price: 4786.00,
    rating: 4.5,
    reviews: 73,
    inStock: true,
    stockCount: 483,
    description: "This product is constructed through all promotional discounts and offers.",
    features: [
      "Pay over range in installments with free installments with Affirm, Sezzle/Klarna or other/Afterpay",
      "Join adidas/Runtastic to get unlimited free big shopping, reductions, & early access"
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    ],
    colors: [
      { name: "Black", value: "black", class: "bg-black" },
      { name: "Gray", value: "gray", class: "bg-gray-500" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46", "47"]
  };
  const product = incomingProduct || fallbackProduct;
  const similarProducts = incomingSimilarProducts || allProducts;

  const sizes = ["39", "40", "41", "42", "43", "44", "45", "46", "47"];

  const fallbackReviews = [
    {
      id: 1,
      user: "Jessica L.",
      rating: 5,
      comment: "Absolutely love this serum! My skin has never felt so hydrated and smooth. It absorbs so quickly and doesn't feel greasy at all. Highly recommend!",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      user: "Marcus T.",
      rating: 4,
      comment: "Great product. I've noticed a visible difference in my skin's texture. It feels more plump and looks brighter. The only reason for not 5 stars is the price, but it's worth it.",
      date: "1 month ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      user: "Emily R.",
      rating: 5,
      comment: "Amazing results! My skin looks so much healthier and more radiant. Will definitely repurchase.",
      date: "3 weeks ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ];
  const reviews = product.reviewsList || fallbackReviews;

  const ratingBreakdown = [
    { stars: 5, percentage: 90, count: 113 },
    { stars: 4, percentage: 5, count: 6 },
    { stars: 3, percentage: 3, count: 4 },
    { stars: 2, percentage: 1, count: 1 },
    { stars: 1, percentage: 1, count: 1 }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-lg ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e7e7e3' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-2">
          {/* Left Side - Images */}
          <div className="flex flex-col h-full">
            {/* 2x2 Image Grid - Full Height */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {product.images.map((image, index) => {
                // Define corner radius classes for each position
                const cornerClasses = {
                  0: 'rounded-tl-2xl', // Top-left: only top-left corner rounded
                  1: 'rounded-tr-2xl', // Top-right: only top-right corner rounded
                  2: 'rounded-bl-2xl', // Bottom-left: only bottom-left corner rounded
                  3: 'rounded-br-2xl'  // Bottom-right: only bottom-right corner rounded
                };
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-full bg-gray-50 overflow-hidden border-2 transition-colors ${cornerClasses[index]} ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price and Stock Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
              <div className="flex items-center space-x-3">
                <span className="text-2xl text-gray-500 line-through">
                  ₹{product.oldPrice.toFixed(2)}
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="text-green-600 font-medium">Available in Stock</span>
                <span className="text-gray-600">{product.stockCount} Items</span>
              </div>
            </div>

            {/* Brand and Rating (stack on mobile) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-medium">Brand:</span>
                <span className="text-gray-900 font-medium">{product.brand}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">({product.reviews})</span>
              </div>
            </div>

            {/* About the Product */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ABOUT THE PRODUCT</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-3 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 text-sm flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">COLOR</h3>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.value 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    } ${color.class}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">SIZE</h3>
                <button className="text-blue-600 text-sm hover:underline">SIZE CHART</button>
              </div>
              <div className="flex space-x-1">
                {sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg ${
                      selectedSize === size
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
            </div>

            {/* Free Shipping */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm font-medium">
                Free Shipping (Est. Delivery: Time 2-3 Days)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* ADD TO CART and WISHLIST on same row */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>ADD TO CART</span>
                </button>
                
                <button className="w-12 h-12 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              {/* BUY IT NOW - Full width, highest priority */}
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 pt-2 mb-12">
          <div className="flex space-x-8 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === 'description'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 rounded-lg p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Overall Rating Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Overall Rating Display */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="text-5xl font-bold text-blue-600 mb-2">4.8</div>
                    <div className="flex items-center mb-2">
                      {renderStars(4.8)}
                    </div>
                    <p className="text-sm text-gray-600">Based on 125 reviews</p>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="flex-1 space-y-2">
                    {ratingBreakdown.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 w-2">{item.stars}</span>
                        <span className="text-yellow-400">★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  {reviews.map((review) => (
                    <div key={review.id} className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                      {/* User Avatar */}
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{review.date}</p>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show More Button */}
                  <div className="text-center pt-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Show more reviews
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Array.from({ length: itemsPerPage }, (_, i) => {
              const p = similarProducts[(similarPage * itemsPerPage + i) % similarProducts.length];
              return (
                <ProductCard key={`${p.id}-${i}-${similarPage}-${itemsPerPage}`} product={p} />
              );
            })}
          </div>

          {/* Pagination Indicators (below grid) */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => setSimilarPage(index)}
                aria-label={`Show similar products page ${index + 1}`}
                className={`h-1.5 w-12 sm:h-2 sm:w-16 rounded-full transition-colors ${
                  index === similarPage
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
