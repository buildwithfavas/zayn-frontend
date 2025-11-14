import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/user/UserLayout";
import ForgotPassEmail from "./pages/user/ForgotPassEmail";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import NewPassword from "./pages/user/NewPassword";
import OTPVerification from "./pages/user/OTPVerification";
import ProductListing from "./pages/user/ProductListing";
import ProductDetails from "./pages/user/ProductDetails";
import Signup from "./pages/user/Signup";

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
    </Routes>
  );
}

export default App;
