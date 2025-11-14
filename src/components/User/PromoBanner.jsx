
const PromoBanner = ({ 
  image = "/src/assets/fashion banner.png",
  fallbackImage = "/src/assets/fashion-preview.jpg",
  title,
  description,
  buttonText,
  buttonLink,
  onButtonClick,
  stats = [],
  showStarVectors = true,
  starVectorImage = "/src/assets/star vector.png"
}) => {
  // Check if there's any content to display
  const hasContent = title || description || buttonText || stats.length > 0;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonLink) {
      window.location.href = buttonLink;
    }
  };

  return (
    <div className="py-4">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Banner"
            className="w-full h-full object-cover object-left-center sm:object-center"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent"></div>
        </div>

        {/* Star Vectors - Positioned to avoid text overlap */}
        {showStarVectors && (
          <>
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-12 lg:right-12 z-10">
              <img
                src={starVectorImage}
                alt="Star decoration"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-70"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            <div className="absolute bottom-12 right-12 sm:bottom-16 sm:right-16 lg:bottom-20 lg:right-20 z-10">
              <img
                src={starVectorImage}
                alt="Star decoration"
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 opacity-50 transform rotate-12"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </>
        )}

        {/* Content Overlay - Only show if there's content */}
        {hasContent && (
          <div className="relative z-20 px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-10 h-full flex flex-col justify-center">
            <div className="max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4">
              {/* Main Heading */}
              {title && (
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-black leading-[0.95] tracking-tight drop-shadow-sm">
                  {title.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < title.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h1>
              )}
              
              {/* Description */}
              {description && (
                <p className="text-gray-800 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg font-medium drop-shadow-sm">
                  {description}
                </p>
              )}

              {/* Button */}
              {buttonText && (
                <div className="pt-2 sm:pt-3">
                  <button 
                    onClick={handleButtonClick}
                    className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {buttonText}
                  </button>
                </div>
              )}

              {/* Stats */}
              {stats.length > 0 && (
                <div className="flex flex-wrap gap-4 lg:gap-8 pt-3">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-lg lg:text-xl xl:text-2xl font-bold text-black">
                        {stat.value}
                      </div>
                      <div className="text-[10px] lg:text-xs text-gray-700 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
