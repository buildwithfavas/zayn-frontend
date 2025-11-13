// Dummy assets and content data for testing - Replace with backend API later

// Import actual asset images - Try different path formats
import shoeBannerMainPic from "../assets/shoe-banner-main-pic.png";
import shoeBannerSidePic from "../assets/shoe-banner-side-pic1.png";
import shoeBannerSidePic2 from "../assets/shoe-banner-side-pic2.png";
import ladyWithShoppingBags from "../assets/lady with shopping bags image.png";

// Alternative: Try with ?url suffix for explicit URL import
// import shoeBannerMainPic from "../assets/shoe-banner-main-pic.png?url";
// import shoeBannerSidePic from "../assets/shoe-banner-side-pic1.png?url";
// import shoeBannerSidePic2 from "../assets/shoe-banner-side-pic2.png?url";

// Debug: Log imported images
console.log('Imported Images:', {
  main: shoeBannerMainPic,
  side1: shoeBannerSidePic,
  side2: shoeBannerSidePic2
});

// Hero Slider Images
export const heroSliderData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends",
    buttonText: "Shop Now",
    buttonLink: "/collections/summer"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
    title: "New Arrivals",
    subtitle: "Fresh styles for every occasion",
    buttonText: "Explore",
    buttonLink: "/new-arrivals"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop",
    title: "Fashion Forward",
    subtitle: "Be ahead of the curve",
    buttonText: "Browse",
    buttonLink: "/trending"
  }
];

// Category Circles Data
export const categoryCirclesData = [
  {
    id: 1,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
    link: "/category/fashion"
  },
  {
    id: 2,
    name: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    link: "/category/footwear"
  },
  {
    id: 3,
    name: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    link: "/category/bags"
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop",
    link: "/category/beauty"
  },
  {
    id: 5,
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    link: "/category/watches"
  },
  {
    id: 6,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
    link: "/category/electronics"
  }
];

// Product Highlight Banner Data
export const productHighlightData = {
  id: 1,
  backgroundImage: "/src/assets/shoe-banner-main-pic.png",
  sideImage1: "/src/assets/shoe-banner-side-pic1.png",
  sideImage2: "/src/assets/shoe-banner-side-pic2.png",
  title: "NIKE AIR MAX",
  description: "Nike introducing the new air max for everyone's comfort",
  buttonText: "SHOP NOW",
  buttonLink: "/product/nike-air-max-270",
  badge: "Nike product of the year"
};

// Alternative with direct paths (fallback)
export const productHighlightDataFallback = {
  id: 1,
  backgroundImage: "/src/assets/shoe-banner-main-pic.png",
  sideImage1: "/src/assets/shoe-banner-side-pic1.png",
  sideImage2: "/src/assets/shoe-banner-side-pic2.png",
  title: "NIKE AIR MAX",
  description: "Nike introducing the new air max for everyone's comfort",
  buttonText: "SHOP NOW",
  buttonLink: "/product/nike-air-max-270",
  badge: "Nike product of the year"
};

// Promo Banners Data (Four banners in single row)
export const promoBannersData = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop&auto=format",
    badge: "Big saving days sale",
    title: "Women Black Cotton Blend Top",
    priceLabel: "Starting At Only",
    price: "₹1,550.00",
    buttonText: "Shop Now",
    buttonLink: "/women/cotton-blend-top"
  },
  {
    id: 2,
    backgroundImage: "/src/assets/lady with shopping bags image.png",
    title: "Fashion Collection 2024",
    subtitle: "Discover the latest trends",
    buttonText: "Explore Now",
    buttonLink: "/collections/women"
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&auto=format",
    badge: "Weekend Special",
    title: "Men's Premium Casual Wear",
    priceLabel: "Up to 50% Off",
    price: "₹899.00",
    buttonText: "Shop Men's",
    buttonLink: "/men/casual-wear"
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop&auto=format",
    title: "Summer Sale 2024",
    subtitle: "Exclusive collection",
    buttonText: "Shop Sale",
    buttonLink: "/summer-sale"
  }
];

// Promotional Banner Data
export const promoBannerData = {
  id: 1,
  title: "FIND CLOTHES\nTHAT MATCHES\nYOUR STYLE",
  description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
  buttonText: "Shop Now",
  buttonLink: "/shop",
  backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  stats: [
    { value: "200+", label: "International Brands" },
    { value: "2,000+", label: "High-Quality Products" },
    { value: "30,000+", label: "Happy Customers" }
  ]
};

// Free Shipping Banner Data
export const freeShippingBannerData = {
  id: 1,
  title: "Free Shipping",
  subtitle: "On orders over ₹999",
  description: "Get free delivery on all orders above ₹999. Limited time offer!",
  buttonText: "Shop Now",
  buttonLink: "/shop",
  icon: "🚚",
  backgroundColor: "#f3f4f6"
};

// Services Section Data
export const servicesData = [
  {
    id: 1,
    title: "Free Shipping",
    description: "Free shipping on orders over ₹999",
    icon: "🚚",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Round the clock customer support",
    icon: "💬",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "30-day return policy",
    icon: "↩️",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    title: "Secure Payment",
    description: "100% secure payment gateway",
    icon: "🔒",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop"
  }
];

// Footer Data
export const footerData = {
  logo: {
    text: "ZAYN",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=50&fit=crop"
  },
  description: "We have clothes that suits your style and which you're proud to wear. From women to men.",
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com", icon: "📘" },
    { platform: "Instagram", url: "https://instagram.com", icon: "📷" },
    { platform: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "💼" }
  ],
  sections: [
    {
      title: "Company",
      links: [
        { text: "About", url: "/about" },
        { text: "Features", url: "/features" },
        { text: "Works", url: "/works" },
        { text: "Career", url: "/career" }
      ]
    },
    {
      title: "Help",
      links: [
        { text: "Customer Support", url: "/support" },
        { text: "Delivery Details", url: "/delivery" },
        { text: "Terms & Conditions", url: "/terms" },
        { text: "Privacy Policy", url: "/privacy" }
      ]
    },
    {
      title: "FAQ",
      links: [
        { text: "Account", url: "/faq/account" },
        { text: "Manage Deliveries", url: "/faq/deliveries" },
        { text: "Orders", url: "/faq/orders" },
        { text: "Payments", url: "/faq/payments" }
      ]
    }
  ],
  newsletter: {
    title: "Stay up to date about our latest offers",
    placeholder: "Enter your email address",
    buttonText: "Subscribe"
  },
  copyright: "© 2024 Zayn. All Rights Reserved."
};

// Announcement Bar Data
export const announcementBarData = {
  id: 1,
  text: "Sign up and get 20% off to your first order.",
  buttonText: "Sign Up Now",
  buttonLink: "/signup",
  backgroundColor: "#000000",
  textColor: "#ffffff",
  isCloseable: true
};

// Navigation Data
export const navigationData = {
  logo: {
    text: "ZAYN",
    image: null
  },
  menuItems: [
    { text: "Shop", url: "/shop", hasDropdown: true },
    { text: "On Sale", url: "/sale" },
    { text: "New Arrivals", url: "/new-arrivals" },
    { text: "Brands", url: "/brands", hasDropdown: true }
  ],
  searchPlaceholder: "Search for products...",
  cartIcon: "🛒",
  userIcon: "👤",
  menuIcon: "☰"
};

// All dummy data export
export const allDummyData = {
  heroSlider: heroSliderData,
  categoryCircles: categoryCirclesData,
  productHighlight: productHighlightData,
  promoBanner: promoBannerData,
  freeShippingBanner: freeShippingBannerData,
  services: servicesData,
  footer: footerData,
  announcementBar: announcementBarData,
  navigation: navigationData
};
