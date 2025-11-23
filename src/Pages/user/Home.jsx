import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  CategoryCircles,
  FreeShippingBanner,
  HeroSlider,
  PopularProductsSection,
  ProductCarousel,
  ProductHighlight,
  PromoBanner,
  PromoBanners,
} from "../../components/user";
import { productHighlightData, promoBannersData } from "../../data/dummyAssets";
import { clearParams } from "../../store/StoreSlices/uiSlice";
import { useGetCategoriesByLevelQuery } from "../../store/Api/admin/category";
import { useGetProductsQuery } from "../../store/Api/admin/product";

const Home = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("Fashion");

  useEffect(() => {
    dispatch(clearParams());
  }, [dispatch]);

  // Fetch Root Categories for CategoryCircles
  const { data: rootCatsData, isLoading: catsLoading } = useGetCategoriesByLevelQuery({
    level: "first",
  });

  const mapProducts = (products) => {
    return (
      products?.map((p) => ({
        ...p,
        id: p._id,
        title: p.name, // Explicitly map name to title to override ProductCard default
        price: p.defaultVariant?.price,
        oldPrice: p.defaultVariant?.oldPrice,
        discount: p.defaultVariant?.discount,
        image: p.defaultVariant?.images?.[0],
        stock: p.defaultVariant?.stock,
      })) || []
    );
  };

  // Fetch Popular Products
  const { data: popularDataRaw, isLoading: popularLoading } = useGetProductsQuery({
    category: activeCategory ? [activeCategory] : [],
    popular: true,
  });
  const popularProducts = mapProducts(popularDataRaw?.products);

  // Fetch Trending Products
  const { data: trendingDataRaw, isLoading: trendingLoading } = useGetProductsQuery({
    isFeatured: true,
  });
  const trendingProducts = mapProducts(trendingDataRaw?.products);

  // Fetch New Arrivals
  const { data: newArrivalsDataRaw, isLoading: newArrivalsLoading } = useGetProductsQuery({
    latest: true,
  });
  const newArrivalsProducts = mapProducts(newArrivalsDataRaw?.products);

  // Fetch Specific Categories
  const { data: footwearDataRaw } = useGetProductsQuery({ category: ["Footwear"] });
  const footwearProducts = mapProducts(footwearDataRaw?.products);

  const { data: bagsDataRaw } = useGetProductsQuery({ category: ["Bags"] });
  const bagsProducts = mapProducts(bagsDataRaw?.products);

  const { data: beautyDataRaw } = useGetProductsQuery({ category: ["Beauty"] });
  const beautyProducts = mapProducts(beautyDataRaw?.products);

  // console.log("Home Page Debug Logs:");
  // console.log("rootCatsData:", rootCatsData);
  // console.log("popularProducts:", popularProducts);
  // console.log("trendingProducts:", trendingProducts);
  // console.log("newArrivalsProducts:", newArrivalsProducts);
  // console.log("footwearProducts:", footwearProducts);
  // console.log("activeCategory:", activeCategory);

  // Loading State
  if (catsLoading || popularLoading || trendingLoading || newArrivalsLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  // Process Data
  const categories = rootCatsData?.categories?.filter((cat) => !cat.isBlocked) || [];

  // Map categories for CategoryCircles
  const categoryCirclesItems = categories.map((cat) => ({
    id: cat._id,
    name: cat.name,
    image: cat.image,
    href: `/shop?category=${cat._id}`, // Assuming shop page takes category param
  }));

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-6 space-y-3 sm:space-y-6 w-full">
        {/* Hero Banner / Slider */}
        <section>
          <HeroSlider />
        </section>

        {/* Category Circles */}
        <section className="-mb-1">
          <CategoryCircles items={categoryCirclesItems} />
        </section>

        {/* Top Rated Products with Category Slider */}
        <section>
          <PopularProductsSection
            title="Top Rated Products"
            subtitle="Don't miss the current offers until the end of the month"
            categoriesData={categories.map((cat) => ({
              id: cat.name,
              name: cat.name,
              products: cat.name === activeCategory ? popularProducts : [],
            }))}
            externalActiveCategory={activeCategory}
            onCategoryChange={setActiveCategory}
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
              { value: "30,000+", label: "Happy Customers" },
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
        {footwearProducts?.length > 0 && (
          <section>
            <ProductCarousel title="Footwear" products={footwearProducts} />
          </section>
        )}

        {/* Bags Section */}
        {bagsProducts?.length > 0 && (
          <section className="-mt-2">
            <ProductCarousel title="Bags" products={bagsProducts} />
          </section>
        )}

        {/* Beauty Section */}
        {beautyProducts?.length > 0 && (
          <section className="-mt-2">
            <ProductCarousel title="Beauty" products={beautyProducts} />
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
