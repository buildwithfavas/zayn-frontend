import CategoryCircles from "../../components/user/CategoryCircles";
import FreeShippingBanner from "../../components/user/FreeShippingBanner";
import HeroSlider from "../../components/user/HeroSlider";
import PopularProductsSection from "../../components/user/PopularProductsSection";
import ProductCarousel from "../../components/user/ProductCarousel";
import ProductHighlight from "../../components/user/ProductHighlight";
import PromoBanner from "../../components/user/PromoBanner";
import PromoBanners from "../../components/user/PromoBanners";
import { productHighlightData, promoBannersData } from "../../data/dummyAssets";
import {
    bagsProducts,
    beautyProducts,
    footwearProducts,
    newArrivalsProducts,
    popularProductsByCategory,
    trendingProducts,
} from "../../data/dummyProducts";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Banner / Slider */}
        <section>
          <HeroSlider />
        </section>

        {/* Category Circles */}
        <section className="-mb-1">
          <CategoryCircles />
        </section>

        {/* Top Rated Products with Category Slider */}
        <section>
          <PopularProductsSection 
            title="Top Rated Products"
            subtitle="Don't miss the current offers until the end of the month"
            categoriesData={popularProductsByCategory}
          />
        </section>

        {/* Promotional Banner */}
        <section className="-mt-4">
          <PromoBanner 
            title={`FIND CLOTHES
THAT MATCHES
YOUR STYLE`}
            description="Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style."
            buttonText="Shop Now"
            buttonLink="/shop"
            stats={[
              { value: "200+", label: "International Brands" },
              { value: "2,000+", label: "High-Quality Products" },
              { value: "30,000+", label: "Happy Customers" }
            ]}
          />
        </section>

        {/* Free Shipping Banner */}
        <section className="-mt-6">
          <FreeShippingBanner />
        </section>

        {/* Trending Products */}
        <section className="-mt-2">
          <ProductCarousel title="Trending Products" products={trendingProducts} />
        </section>

        {/* Nike Air Max Product Highlight */}
        <section>
          <ProductHighlight 
            backgroundImage={productHighlightData.backgroundImage}
            sideImage1={productHighlightData.sideImage1}
            sideImage2={productHighlightData.sideImage2}
            title={productHighlightData.title}
            description={productHighlightData.description}
            buttonText={productHighlightData.buttonText}
            buttonLink={productHighlightData.buttonLink}
            badge={productHighlightData.badge}
            onButtonClick={() => console.log(`Navigate to ${productHighlightData.buttonLink}`)}
          />
        </section>

        {/* New Arrivals Products */}
        <section className="-mt-2">
          <ProductCarousel title="New Arrivals" products={newArrivalsProducts} />
        </section>

        {/* Promo Banners */}
        <section>
          <PromoBanners 
            banners={promoBannersData}
            onButtonClick={(banner) => console.log(`Navigate to ${banner.buttonLink}`)}
          />
        </section>

        {/* Footwear Section */}
        <section>
          <ProductCarousel title="Footwear" products={footwearProducts} />
        </section>

        {/* Bags Section */}
        <section className="-mt-2">
          <ProductCarousel title="Bags" products={bagsProducts} />
        </section>

        {/* Beauty Section */}
        <section className="-mt-2">
          <ProductCarousel title="Beauty" products={beautyProducts} />
        </section>
      </div>
    </div>
  );
};

export default Home;
