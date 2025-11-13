import React, { useState, useEffect } from "react";
import { heroSlides } from "../../data/products";

/**
 * HeroSlider Component
 * 
 * @param {Object[]} slides - Array of slide objects
 * @param {string} slides[].image - Image URL for the slide background
 * @param {string} slides[].heading - Primary heading text
 * @param {string} slides[].subheading - Secondary heading text
 * @param {string} slides[].description - Descriptive text for the slide
 * @param {string} slides[].ctaText - Call-to-action button text
 * @param {string} slides[].ctaLink - Call-to-action button link
 * @param {number} autoplayInterval - Autoplay interval in milliseconds (default: 5000)
 */
const HeroSlider = ({ 
  slides = heroSlides, 
  autoplayInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoplayInterval]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[280px] md:h-[350px] bg-gray-900 overflow-hidden rounded-2xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.heading || slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/src/assets/fashion-preview.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="max-w-xl ml-16 md:ml-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {slide.heading || slide.title}
                </h2>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  {slide.subheading || slide.subtitle}
                </h3>
                <p className="text-base md:text-lg text-gray-200 mb-4">
                  {slide.description}
                </p>
                <a
                  href={slide.ctaLink || slide.buttonLink}
                  className="inline-block bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  {slide.ctaText || slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/50 w-2 h-2 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
