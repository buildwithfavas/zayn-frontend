import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Navigation from "./Navigation";
import ServicesSection from "./ServicesSection";
import Footer from "./Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar />
      <Header />
      <Navigation />
      <main className="flex-1">{children}</main>
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default UserLayout;

