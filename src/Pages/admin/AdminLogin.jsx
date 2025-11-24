import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { CircularProgress, TextField, Button } from "@mui/material";
import { loginValidationSchema } from "../../utils/YupSchemas";
import { useAdminLoginMutation } from "../../store/Api/admin/auth";
import { setAdmin } from "../../store/StoreSlices/adminAuthSlice";
import PasswordField from "../user/PasswordField";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  // Prevent back navigation to login page after login
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/admin/login", { replace: true });
    };
    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      toast.success(res.message || "Admin logged in successfully");
      dispatch(setAdmin(res.admin));
      navigate("/admin");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-left">
            Admin Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <TextField
                {...register("email")}
                id="email"
                label="Email"
                type="text"
                variant="outlined"
                fullWidth
                disabled={isLoading}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>

            <div>
              <PasswordField
                label="Password"
                register={register("password")}
                errors={errors.password?.message}
                isSubmitting={isLoading}
              />
            </div>

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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "SIGN IN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
