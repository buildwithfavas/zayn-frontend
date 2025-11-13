
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
      <div className="relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[450px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Banner"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </div>

        {/* Star Vectors */}
        {showStarVectors && (
          <>
            <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-20">
              <img
                src={starVectorImage}
                alt="Star decoration"
                className="w-12 h-12 lg:w-16 lg:h-16 opacity-90"
              />
            </div>
            
            <div className="absolute bottom-16 right-16 lg:bottom-20 lg:right-20 z-20">
              <img
                src={starVectorImage}
                alt="Star decoration"
                className="w-8 h-8 lg:w-10 lg:h-10 opacity-60 transform rotate-12"
              />
            </div>
          </>
        )}

        {/* Content Overlay - Only show if there's content */}
        {hasContent && (
          <div className="relative z-10 px-8 md:px-16 py-10 lg:py-12 h-full flex flex-col justify-center">
            <div className="max-w-2xl space-y-5">
              {/* Main Heading */}
              {title && (
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-[0.9] tracking-tight">
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
                <p className="text-gray-700 text-sm lg:text-base leading-relaxed max-w-lg">
                  {description}
                </p>
              )}

              {/* Button */}
              {buttonText && (
                <div className="pt-2">
                  <button 
                    onClick={handleButtonClick}
                    className="bg-black text-white px-10 py-3 rounded-full text-sm lg:text-base font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                  >
                    {buttonText}
                  </button>
                </div>
              )}

              {/* Stats */}
              {stats.length > 0 && (
                <div className="flex flex-wrap gap-6 lg:gap-10 pt-4">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-black">
                        {stat.value}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-700 mt-1">
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
