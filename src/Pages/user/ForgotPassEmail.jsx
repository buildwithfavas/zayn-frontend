import fashionPreview from "../../assets/fashion-preview.jpg";
import UserLayout from "../../components/user/UserLayout";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPassEmailMutation } from "../../Store/Api/user/auth";
import { forgotPassEmailSchema } from "../../Utils/YupSchemas";

const ForgotPassEmail = () => {
  const [sendOtp, { isLoading }] = useForgotPassEmailMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPassEmailSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const res = await sendOtp(data).unwrap();
      toast.success(res.message || "OTP Send Successfully");
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("otpExpiry", Date.now() + 60000);
      localStorage.setItem("verificationType", "forgotPassword"); // Mark as forgot password flow
      navigate("/verify");
    } catch (error) {
      toast.error(error.data || "Some Error Occurred");
    }
  };

  return (
    <UserLayout>
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Forgot Password Form */}
            <div className="w-full lg:w-1/2 max-w-md order-2 lg:order-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                  Forgot Password
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <TextField
                    {...register("email")}
                    id="email"
                    label="Enter your Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    disabled={isLoading}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "48px",
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#4A70E8",
                      "&:hover": { bgcolor: "#3d5fd4" },
                      py: 1.5,
                      mt: 2,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "VERIFY EMAIL"}
                  </Button>
                </form>
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

export default ForgotPassEmail;
