import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import PasswordField from "./PasswordField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidationSchema } from "../../Utils/YupSchemas";
import CircularProgress from "@mui/material/CircularProgress";
import { useSignUpMutation } from "../../Store/Api/user/auth";
import toast from "react-hot-toast";
import fashionPreview1 from "../../assets/fashion-preview1.jpg";
import UserLayout from "../../components/user/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Store/StoreSlices/cartSlice";
const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      agreeTerms: false,
      keepLoggedIn: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await signUp(data).unwrap();
      toast.success(res.message || "User Registered Successfully");
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("otpExpiry", Date.now() + 60000);
      navigate("/verify");
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignup = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(clearCart());
    window.location.href = `${apiUrl}/api/user/google`;
  };

  const handleAppleSignup = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(clearCart());
    window.location.href = `${apiUrl}/api/user/facebook`;
  };

  return (
    <UserLayout>
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Signup Form */}
            <div className="w-full lg:w-1/2 max-w-md order-1 lg:order-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-left">
                  Register
                </h2>

                {/* Sign up with text */}
                <p className="text-sm text-gray-700 mb-4">Sign up with</p>

                {/* Social Login Buttons - Side by Side */}
                <div className="mb-4 flex gap-3">
                  {/* Google Signup */}
                  <button
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="flex-1 bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FcGoogle className="w-6 h-6" />
                  </button>

                  {/* Apple Signup */}
                  <button
                    onClick={handleAppleSignup}
                    disabled={isLoading}
                    className="flex-1 bg-white border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaApple className="w-6 h-6" />
                  </button>
                </div>

                {/* OR Divider */}
                <div className="mb-4">
                  <p className="text-sm text-gray-700 font-medium">OR</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Your Name Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Your Name</h3>

                    {/* First Name */}
                    <div className="mb-3">
                      <TextField
                        {...register("firstName")}
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        disabled={isLoading}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <TextField
                        {...register("lastName")}
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        disabled={isLoading}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    </div>
                  </div>

                  {/* Gender Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Gender</h3>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="Male"
                          {...register("gender")}
                          disabled={isLoading}
                          className="mr-2 h-4 w-4 text-gray-900 border-gray-400 focus:ring-gray-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ accentColor: "#1f2937" }}
                        />
                        <span className="text-sm text-gray-900">Male</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="Female"
                          {...register("gender")}
                          disabled={isLoading}
                          className="mr-2 h-4 w-4 text-gray-900 border-gray-400 focus:ring-gray-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ accentColor: "#1f2937" }}
                        />
                        <span className="text-sm text-gray-900">Female</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="Other"
                          {...register("gender")}
                          disabled={isLoading}
                          className="mr-2 h-4 w-4 text-gray-900 border-gray-400 focus:ring-gray-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ accentColor: "#1f2937" }}
                        />
                        <span className="text-sm text-gray-900">Other</span>
                      </label>
                    </div>
                    {errors.gender && (
                      <p className="text-xs text-red-500 mt-1">{errors.gender?.message}</p>
                    )}
                  </div>

                  {/* Login Details Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Login Details</h3>

                    {/* Email Input */}
                    <div className="mb-3">
                      <TextField
                        {...register("email")}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        disabled={isLoading}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                      <PasswordField
                        label="Password"
                        register={register("password")}
                        errors={errors.password?.message}
                        isSubmitting={isLoading}
                      />
                    </div>

                    {/* Password Requirements */}
                    <p className="text-xs text-gray-600 mt-2">
                      Minimum 8 characters with at least one upper case, one lower case, one special
                      character and a number
                    </p>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="flex items-start">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      {...register("agreeTerms")}
                      disabled={isLoading}
                      className="mt-1 h-4 w-4 shrink-0 text-gray-900 border-gray-400 rounded cursor-pointer focus:ring-gray-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ accentColor: "#1f2937", minWidth: "16px", minHeight: "16px" }}
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="ml-3 text-xs text-gray-900 leading-relaxed"
                    >
                      By clicking 'Log In' you agree to our website Zayn Club{" "}
                      <a href="#" className="text-gray-900 underline">
                        Terms & Conditions
                      </a>
                      , Zayn's{" "}
                      <a href="#" className="text-gray-900 underline">
                        Privacy Notice
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-gray-900 underline">
                        Terms & Conditions
                      </a>
                      .
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-xs text-red-500 ml-7">{errors.agreeTerms?.message}</p>
                  )}

                  {/* Keep Me Logged In Checkbox */}
                  <div className="flex items-start">
                    <input
                      id="keepLoggedIn"
                      type="checkbox"
                      {...register("keepLoggedIn")}
                      disabled={isLoading}
                      className="mt-1 h-4 w-4 shrink-0 text-gray-900 border-gray-400 rounded cursor-pointer focus:ring-gray-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ accentColor: "#1f2937", minWidth: "16px", minHeight: "16px" }}
                    />
                    <label
                      htmlFor="keepLoggedIn"
                      className="ml-3 text-xs text-gray-900 leading-relaxed"
                    >
                      <div>Keep me logged in - applies to all log in options below.</div>
                      <div>
                        <a href="#" className="text-gray-900 underline">
                          More info
                        </a>
                      </div>
                    </label>
                  </div>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
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
                      !isLoading && (
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
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "REGISTER"}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="mt-4 text-center text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className={`text-gray-900 font-semibold underline hover:text-gray-700 ${
                      isLoading ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-2">
              <img
                src={fashionPreview1}
                alt="Fashion preview"
                className="rounded-xl shadow-lg w-full max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Signup;
