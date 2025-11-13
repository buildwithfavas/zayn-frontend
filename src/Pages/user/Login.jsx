import { useState } from "react";
import { Link } from "react-router-dom";
import fashionPreview from "../../assets/fashion-preview.jpg";
import UserLayout from "../../components/user/UserLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    // Replace with your backend API call
    console.log("Login attempt:", { email, password, keepLoggedIn });
  };

  const handleGoogleLogin = () => {
    // Replace with Google OAuth implementation
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    // Replace with Apple OAuth implementation
    console.log("Apple login clicked");
  };

  return (
    <UserLayout>
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Login Form */}
            <div className="w-full lg:w-1/2 max-w-md order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-left">
                  Login
                </h2>

                {/* Forgot Password Link */}
                <div className="mb-6">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-700 hover:text-gray-900 underline ml-1"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Keep Me Logged In Checkbox */}
                  <div className="flex items-start">
                    <input
                      id="keepLoggedIn"
                      type="checkbox"
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                      className="mt-1 h-4 w-4 text-gray-900 border-gray-400 rounded cursor-pointer focus:ring-gray-500 focus:ring-2"
                      style={{ accentColor: '#1f2937' }}
                    />
                    <label
                      htmlFor="keepLoggedIn"
                      className="ml-3 text-sm text-gray-900 leading-relaxed"
                    >
                      <div>Keep me logged in - applies to all log in options below.</div>
                      <div>
                        <a href="#" className="text-gray-900 underline">
                          More info
                        </a>
                      </div>
                    </label>
                  </div>

                  {/* Email Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#4A70E8] hover:bg-[#3d5fd4] text-white font-semibold py-3 rounded-lg transition uppercase tracking-wide text-sm sm:text-base flex items-center justify-between px-4"
                  >
                    <span>EMAIL LOGIN</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </form>

                {/* Social Login Buttons - Side by Side */}
                <div className="mt-6 flex gap-3">
                  {/* Google Login */}
                  <button
                    onClick={handleGoogleLogin}
                    className="flex-1 bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>

                  {/* Apple Login */}
                  <button
                    onClick={handleAppleLogin}
                    className="flex-1 bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm text-gray-700">
                  Not Registered?{" "}
                  <Link to="/signup" className="text-gray-900 font-semibold underline hover:text-gray-700">
                    Sign Up
                  </Link>
                </div>

                {/* Legal Text */}
                <p className="mt-6 text-xs text-gray-700 text-center leading-relaxed">
                  By clicking 'Log In' you agree to our website{" "}
                  <a href="#" className="text-gray-900 underline">
                    Al Zayn Terms & Conditions
                  </a>
                  ,{" "}
                  <a href="#" className="text-gray-900 underline">
                    Al Zayn Privacy Notice
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-900 underline">
                    Terms & Conditions
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <img
                src={fashionPreview}
                alt="Ecommerce preview"
                className="rounded-xl shadow-lg w-full max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Login;

