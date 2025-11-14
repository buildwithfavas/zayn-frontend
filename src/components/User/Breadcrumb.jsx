import React from 'react';
import { useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Generate breadcrumb items based on current path
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    
    // Base breadcrumb always starts with Home
    const items = [
      { label: 'Home', href: '/', isActive: false }
    ];
    
    // Add specific breadcrumb based on current route
    switch (path) {
      case '/products':
        items.push({ label: 'Shoes', href: '/products', isActive: true });
        break;
      case '/login':
        items.push({ label: 'Login', href: '/login', isActive: true });
        break;
      case '/signup':
        items.push({ label: 'Sign Up', href: '/signup', isActive: true });
        break;
      case '/forgot-password':
        items.push({ label: 'Forgot Password', href: '/forgot-password', isActive: true });
        break;
      default:
        // For home page, don't add additional items
        if (path === '/') {
          items[0].isActive = true;
        }
        break;
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();
  
  // Don't show breadcrumb if only home item exists and it's active (home page)
  if (breadcrumbItems.length === 1 && breadcrumbItems[0].isActive) {
    return null;
  }

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.isActive ? (
                <span className="text-gray-900">{item.label}</span>
              ) : (
                <a href={item.href} className="text-gray-500 hover:text-gray-700">
                  {item.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
