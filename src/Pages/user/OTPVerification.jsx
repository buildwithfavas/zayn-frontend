import { useEffect, useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { useResendOtpMutation, useVerifyEmailMutation } from "../../Store/Api/user/auth";
import OtpBox from "../../components/user/OtpBox";

const OTPVerification = () => {
  // RTK Query mutations
  const [verifyEmail, { isLoading: isPending }] = useVerifyEmailMutation();
  const [resend, { isLoading: isResending }] = useResendOtpMutation();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  // Get email from localStorage
  const email = localStorage.getItem("userEmail");

  // Timer logic based on expiry timestamp (persistent across refreshes)
  const updateTimer = () => {
    const expiry = Number(localStorage.getItem("otpExpiry"));
    if (!expiry) return setTimer(0);

    const remaining = Math.floor((expiry - Date.now()) / 1000);
    setTimer(remaining > 0 ? remaining : 0);
  };

  useEffect(() => {
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleResendOTP = async () => {
    try {
      const res = await resend({ email });
      // Set new expiry time (60 seconds from now)
      localStorage.setItem("otpExpiry", Date.now() + 60000);
      updateTimer();
      setOtp("");
      toast.success(res.message || "OTP resent to your email");
    } catch (error) {
      toast.error(error.data || "Could not resend OTP");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the complete OTP");
      return;
    }

    try {
      const res = await verifyEmail({ otp, email }).unwrap();

      // Check which flow the user came from
      const verificationType = localStorage.getItem("verificationType");

      if (verificationType === "forgotPassword") {
        // Forgot password flow: redirect to reset password page
        navigate("/new-password");
        toast.success(res.message || "OTP verified successfully");
      } else if (verificationType === "signup") {
        // Signup flow: redirect to login page
        navigate("/login");
        toast.success(res.message || "User verified successfully");
      } else {
        // Fallback: if no verificationType found, assume signup
        navigate("/login");
        toast.error("User verification failed");
      }
      // Clean up
      localStorage.removeItem("verificationType");
    } catch (error) {
      toast.error(error.data || "Verification failed");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <UserLayout>
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            {/* OTP Verification Form */}
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                  OTP Verification Code
                </h2>

                {/* Instruction Text */}
                <p className="text-sm text-gray-700 mb-6 text-center">
                  Code has been send to <span className="text-blue-600 font-medium">{email}</span>
                </p>

                {/* OTP Input Fields */}
                <form onSubmit={handleVerify} className="space-y-6">
                  <OtpBox length={6} onChange={handleOtpChange} />

                  {/* Resend OTP */}
                  <div className="text-center">
                    <p className="text-sm text-gray-700">
                      Didn't get the otp?{" "}
                      {timer === 0 ? (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isResending}
                          className="text-blue-600 hover:text-blue-700 underline font-medium disabled:opacity-50"
                        >
                          {isResending ? <CircularProgress size={10} color="inherit" /> : "Resend"}
                        </button>
                      ) : (
                        <span className="text-gray-500">
                          Resend in{" "}
                          <span className="font-semibold text-gray-700">{formatTime(timer)}</span>
                        </span>
                      )}
                    </p>
                    {timer === 0 && !isResending && (
                      <p className="text-xs text-red-500 mt-1">OTP Expired</p>
                    )}
                  </div>

                  {/* Verify OTP Button */}
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
                  >
                    {isPending ? <CircularProgress size={24} color="inherit" /> : "VERIFY OTP"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default OTPVerification;
