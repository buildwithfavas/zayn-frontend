import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";

const PasswordField = ({ label, register, errors, isSubmitting }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined" className="w-full !mb-5 ">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        disabled={isSubmitting}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        {...register}
        error={!!errors}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide the password" : "display the password"}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {errors && <FormHelperText error>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordField;
