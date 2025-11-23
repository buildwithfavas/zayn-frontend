import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import fashionPreview from "../../assets/fashion-preview.jpg";
import UserLayout from "../../components/user/UserLayout";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import PasswordField from "./PasswordField";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../Utils/YupSchemas";
import { useUserLoginMutation } from "../../Store/Api/user/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Store/StoreSlices/userAuthSlice";
import { useAddToCartMutation } from "../../Store/Api/user/cart";
import { clearCart } from "../../Store/StoreSlices/cartSlice";

const apiUrl = import.meta.env.VITE_API_URL || "";

const Login = () => {
  // RTK Query mutations
  const [login, { isLoading: isPending }] = useUserLoginMutation();
  const [searchParams] = useSearchParams();
  const cart = useSelector((state) => state.cart);
  const [add] = useAddToCartMutation();

  // Handle OAuth errors from URL params
  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    if (error && message) {
      const decodedMessage = decodeURIComponent(message);
      toast.error(decodedMessage);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [searchParams]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setUser(res.user));

      // Sync cart if user has items
      if (cart.length) {
        await add(cart).unwrap();
      }
      dispatch(clearCart());

      navigate("/");
      toast.success(res.message || "User Logged In Successfully");
    } catch (error) {
      toast.error(error.data || "Some Error Occurred");
    }
  };

  const handleGoogleLogin = async () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(clearCart());
    window.location.href = `${apiUrl}/api/user/google`;
  };

  const handleAppleLogin = async () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(clearCart());
    window.location.href = `${apiUrl}/api/user/facebook`;
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <TextField
                      {...register("email")}
                      id="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      disabled={isPending}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <PasswordField
                      label="Password"
                      register={register("password")}
                      errors={errors.password?.message}
                      isSubmitting={isPending}
                    />
                  </div>

                  {/* Keep Me Logged In Checkbox */}
                  <div className="flex items-start">
                    <input
                      {...register("remember")}
                      id="keepLoggedIn"
                      type="checkbox"
                      disabled={isPending}
                      className="mt-1 h-4 w-4 text-gray-900 border-gray-400 rounded cursor-pointer focus:ring-gray-500 focus:ring-2 disabled:opacity-50"
                      style={{ accentColor: "#1f2937" }}
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
                  <Button
                    type="submit"
                    disabled={isPending}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#4A70E8",
                      "&:hover": { bgcolor: "#3d5fd4" },
                      py: 1.5,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                    endIcon={
                      !isPending && (
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
                      )
                    }
                  >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : "EMAIL LOGIN"}
                  </Button>
                </form>

                {/* Social Login Buttons - Side by Side */}
                <div className="mt-6 flex gap-3">
                  {/* Google Login */}
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isPending}
                    className="flex-1 bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center disabled:opacity-50"
                  >
                    <FcGoogle className="w-6 h-6" />
                  </button>

                  {/* Apple Login */}
                  <button
                    onClick={handleAppleLogin}
                    disabled={isPending}
                    className="flex-1 bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center disabled:opacity-50"
                  >
                    <FaApple className="w-6 h-6" />
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm text-gray-700">
                  Not Registered?{" "}
                  <Link
                    to="/signup"
                    className="text-gray-900 font-semibold underline hover:text-gray-700"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Legal Text */}
                <p className="mt-6 text-xs text-gray-700 text-center leading-relaxed">
                  By clicking 'Log In' you agree to our website{" "}
                  <a href="#" className="text-gray-900 underline">
                    Zayn Terms & Conditions
                  </a>
                  ,{" "}
                  <a href="#" className="text-gray-900 underline">
                    Zayn Privacy Notice
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
