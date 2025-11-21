import { useEffect, useRef, useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import toast from "react-hot-toast";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const [email] = useState("example@gmail.com"); // You can get this from props or state management
  const inputRefs = useRef([]);

  useEffect(() => {
    // Start countdown timer
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, canResend]);

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendOTP = () => {
    if (canResend) {
      // Reset timer and resend OTP
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      // Add your resend OTP logic here
      console.log("Resending OTP to:", email);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      toast.error("Please enter the complete OTP");
      return;
    }
    
    // Replace with your backend API call
    console.log("Verifying OTP:", otpCode);
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
                  Code has been send to{" "}
                  <span className="text-blue-600 font-medium">{email}</span>
                </p>

                {/* OTP Input Fields */}
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="flex justify-center gap-3 sm:gap-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    ))}
                  </div>

                  {/* Resend OTP */}
                  <div className="text-center">
                    <p className="text-sm text-gray-700">
                      Didn't get the otp?{" "}
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          className="text-blue-600 hover:text-blue-700 underline font-medium"
                        >
                          Resend
                        </button>
                      ) : (
                        <span className="text-gray-500">
                          Resend in{" "}
                          <span className="font-semibold text-gray-700">
                            {formatTime(timer)}
                          </span>
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Verify OTP Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#4A70E8] hover:bg-[#3d5fd4] text-white font-semibold py-3 rounded-lg transition uppercase tracking-wide text-sm sm:text-base"
                  >
                    VERIFY OTP
                  </button>
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

