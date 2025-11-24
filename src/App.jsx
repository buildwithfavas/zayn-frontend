import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/user/UserLayout";
import AdminLayout from "./components/admin/AdminLayout";
import ForgotPassEmail from "./pages/user/ForgotPassEmail";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import NewPassword from "./pages/user/NewPassword";
import OTPVerification from "./pages/user/OTPVerification";
import ProductListing from "./pages/user/ProductListing";
import ProductDetails from "./pages/user/ProductDetails";
import Signup from "./pages/user/Signup";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import UserDetails from "./pages/admin/UserDetails";
import CategoriesList from "./pages/admin/CategoriesList";
import CategoryCreate from "./pages/admin/CategoryCreate";
import SubcategoriesList from "./pages/admin/SubcategoriesList";
import ProductList from "./pages/admin/ProductList";
import ProductUpload from "./pages/admin/ProductUpload";
import ProductSizeCreate from "./pages/admin/ProductSizeCreate";
import AdminProductDetails from "./pages/admin/AdminProductDetails";

function App() {
  return (
    <Routes>
      {/* User Routes with Layout */}
      <Route
        path="/"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />
      <Route
        path="/products"
        element={
          <UserLayout>
            <ProductListing />
          </UserLayout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <UserLayout>
            <ProductDetails />
          </UserLayout>
        }
      />

      {/* Auth Routes without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassEmail />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/new-password" element={<NewPassword />} />
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="categories" element={<CategoriesList />} />
        <Route path="categories/new" element={<CategoryCreate />} />
        <Route path="subcategories" element={<SubcategoriesList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<AdminProductDetails />} />
        <Route path="products/upload" element={<ProductUpload />} />
        <Route path="product-sizes/new" element={<ProductSizeCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
