import React from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Navigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import ServicesSection from "./ServicesSection";
import Footer from "./Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AnnouncementBar />
      <Header />
      <Navigation />
      <Breadcrumb />
      <main className="flex-1">{children}</main>
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default UserLayout;

