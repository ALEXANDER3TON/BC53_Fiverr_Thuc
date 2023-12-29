import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../Routes/path";
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAdmin } from "../../../../Store/LoginAdminSlice/slice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      matKhau: "",
    },
  });
  const onSubmit = (values) => {
    dispatch(loginAdmin(values)).then((result) => {
      if (result.payload.maLoaiNguoiDung === "ADMIN") {
        navigate(PATH.ADMIN);
      }

      if (result.payload.maLoaiNguoiDung === "USER") {
        navigate(PATH.HOME);
      }
    });
  };
  return (
    <Container>
      <Box padding={12}>
        <Typography
          sx={{ fontSize: "36px", fontWeight: "600" }}
          textAlign={"center"}
        >
          Đăng nhập
        </Typography>
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item lg={6} xs={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <TextField label="Email" fullWidth {...register("email")} />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="warning"
                >
                  Đăng Nhập
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminLogin;
