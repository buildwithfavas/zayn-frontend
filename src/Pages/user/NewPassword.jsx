import fashionPreview from "../../assets/fashion-preview.jpg";
import UserLayout from "../../components/user/UserLayout";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassResetSchema } from "../../Utils/YupSchemas";
import { useResetPasswordMutation } from "../../Store/Api/user/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import PasswordField from "./PasswordField";

const NewPassword = () => {
  const [resetPass, { isLoading: isPending }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(forgotPassResetSchema),
  });

  const email = localStorage.getItem("userEmail");

  const onSubmit = async (data) => {
    try {
      const res = await resetPass({ ...data, email }).unwrap();
      toast.success(res.message || "Password reset successfully");
      //localStorage.removeItem("userEmail");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Password reset failed");
    }
  };

  return (
    <UserLayout>
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* New Password Form */}
            <div className="w-full lg:w-1/2 max-w-md order-1 lg:order-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-left">
                  Enter New Password
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* New Password Input */}
                  <PasswordField
                    label="New Password"
                    register={register("newPassword")}
                    errors={errors.newPassword?.message}
                    isSubmitting={isPending}
                  />

                  {/* Confirm New Password Input */}
                  <PasswordField
                    label="Confirm New Password"
                    register={register("confirmPassword")}
                    errors={errors.confirmPassword?.message}
                    isSubmitting={isPending}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#4A70E8] hover:bg-[#3d5fd4] text-white font-semibold py-3 rounded-lg transition uppercase tracking-wide text-sm sm:text-base flex items-center justify-between px-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isPending ? "RESETTING..." : "RESET PASSWORD"}</span>
                    {!isPending && (
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
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-2">
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

export default NewPassword;
