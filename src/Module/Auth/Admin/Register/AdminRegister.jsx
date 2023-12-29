import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { registerAPI } from "../../../../APIs/UserApi";
import { LoadingButton } from "@mui/lab";

import dayjs from "dayjs";
import { ADMIN } from "../../../../Constant";

const AdminRegister = () => {
  const [gender, setGender] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: gender,
      role: ADMIN,
      skill: [""],
      certification: [""],
    },
  });
  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (values) => registerAPI(values),
    onSuccess: () => {
      alert("Register Successfully");
    },
    onError: () => {
      alert("loi~vai");
    },
  });

  const handleGender = (event) => {
    setGender(event.target.value);
  };
  

  const onSubmit = (values) => {
    const result = handleRegister(values);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Register
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item lg={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField label="Name" fullWidth {...register("name")} />

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

              <TextField label="Phone" fullWidth {...register("phone")} />

              <TextField
                label="Gender"
                select
                value={gender}
                onChange={handleGender}
              >
                <MenuItem value={true}>Nam</MenuItem>
                <MenuItem value={false}>Nữ</MenuItem>
              </TextField>
              <Controller
                name="birthday"
                control={control}
                render={(field) => {
                  return (
                    <DateTimePicker
                      label="Birthday"
                      format="DD/MM/YYYY"
                      views={["year", "month", "day"]}
                      onChange={(date) => {
                        const formatday = dayjs(date).format("DD/MM/YYYY");
                        setValue("birthday", formatday);
                      }}
                      {...field}
                    />
                  );
                }}
              />

              <LoadingButton
                variant="contained"
                fullWidth
                color="warning"
                size="large"
                type="submit"
                loading={isPending}
              >
                Register
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default AdminRegister;
