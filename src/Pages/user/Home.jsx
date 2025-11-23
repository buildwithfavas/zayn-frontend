import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import CategoryCircles from "../../components/user/CategoryCircles";
import FreeShippingBanner from "../../components/user/FreeShippingBanner";
import HeroSlider from "../../components/user/HeroSlider";
import PopularProductsSection from "../../components/user/PopularProductsSection";
import ProductCarousel from "../../components/user/ProductCarousel";
import ProductHighlight from "../../components/user/ProductHighlight";
import PromoBanner from "../../components/user/PromoBanner";
import PromoBanners from "../../components/user/PromoBanners";
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

  // Fetch Popular Products
  // Note: Using the same logic as reference project, passing category as array if needed
  // or just fetching popular products. The reference used: { category: [category], popular: true }
  // We'll try to match that.
  // Helper to map API product structure to UI component props
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

  console.log("Home Page Debug Logs:");
  console.log("rootCatsData:", rootCatsData);
  console.log("popularProducts:", popularProducts);
  console.log("trendingProducts:", trendingProducts);
  console.log("newArrivalsProducts:", newArrivalsProducts);
  console.log("footwearProducts:", footwearProducts);
  console.log("activeCategory:", activeCategory);

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

  // Process Popular Products Data for the Section
  // The PopularProductsSection expects `categoriesData` which is an array of categories
  // each having a `products` array.
  // Since the API returns a flat list of products for the selected category,
  // we need to adapt this.
  // However, the reference project had a tab system to switch categories.
  // Our UI component `PopularProductsSection` also has a `CategorySlider`.
  // We can pass the root categories to `PopularProductsSection` and let it handle the selection,
  // BUT `PopularProductsSection` expects `categoriesData` to ALREADY contain products.
  // To make this work with the existing UI component without rewriting it entirely:
  // We will construct a single "category" object that matches the `activeCategory`
  // and contains the fetched `popularData.products`.
  // Or better, we pass the list of categories (for the tabs) and the products separately?
  // Looking at `PopularProductsSection.jsx`:
  // It takes `categoriesData`.
  // `const activeProducts = categoriesData.find((cat) => cat.id === activeCategory)?.products || [];`
  // `const categories = categoriesData.map((cat) => ({ id: cat.id, name: cat.name }));`
  // So it expects the FULL structure.
  // This is tricky because we are fetching products dynamically based on selection.
  // We might need to slightly adjust `PopularProductsSection` to accept `products` and `categories` separately
  // OR we construct the object here.

  // Let's construct the object here to avoid changing the UI component if possible.
  // But we only have products for the *active* category.
  // So we can create a list of categories where only the active one has products.
  const popularProductsCategoriesData = categories.map((cat) => ({
    id: cat.name,
    name: cat.name,
    products: cat.name === activeCategory ? popularProducts : [],
  }));

  // However, `PopularProductsSection` handles `onCategoryChange`.
  // We need to lift that state up or pass a handler.
  // The current `PopularProductsSection` has internal state `activeCategory`.
  // We need to control it to trigger the API call.
  // I will modify `PopularProductsSection` slightly to accept `activeCategory` and `onCategoryChange`
  // if it doesn't already (it does! I saw it in the file view).
  // Wait, `PopularProductsSection` has:
  // `const [activeCategory, setActiveCategory] = useState(categoriesData[0]?.id || "");`
  // It uses internal state. I should probably change it to controlled component or
  // just pass the data in a way that works.
  // Actually, I'll modify `PopularProductsSection` to be controlled in a separate step if needed.
  // For now, let's try to pass the props.
  // If I can't change `PopularProductsSection` easily, I might have to fetch ALL popular products? No, that's bad.

  // Let's assume I will modify `PopularProductsSection` to be controlled.
  // For now, I will pass `categoriesData` constructed as above.
  // And I need to pass `onCategoryChange` to it.
  // But `PopularProductsSection` doesn't accept `onCategoryChange` prop in the definition I saw?
  // Let me check the file content again.
  // Line 9: `const PopularProductsSection = ({ title, subtitle, categoriesData }) => {`
  // It does NOT accept `onCategoryChange`.
  // I MUST modify `PopularProductsSection` to accept `onCategoryChange` and `activeCategory` props.
  // I will do that in a separate tool call.

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
