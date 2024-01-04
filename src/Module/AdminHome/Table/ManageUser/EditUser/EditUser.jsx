import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { registerAPI } from "../../../../../APIs/UserApi";

import dayjs from "dayjs";
import { UpdateUserData } from "../../../../../APIs/AdminTechnique";
const EditUser = ({ user }) => {
  console.log("user.birthday", user.birthday);
  const formatBirthday = dayjs(user.birthday).format("DD/MM/YYYY");
  console.log("formatBirthday", formatBirthday);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
      role: user.role,
      skill: user.skill,
      certification: user.certification,
    },
  });

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: (values) => UpdateUserData(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["LIST_USER_PAGINATION"]);
    },
    onError: () => {
      alert("loi~vai");
    },
  });
  const onSubmit = (values) => {
    const result = handleUpdate(values);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Edit Data User
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
              <TextField
                label="Name"
                fullWidth
                name="name"
                {...register("name")}
              />

              <TextField
                label="Email"
                fullWidth
                name="email"
                {...register("email")}
                disabled
              />

              <TextField
                label="Password"
                name="password"
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

              <TextField
                label="Phone"
                name="phone"
                fullWidth
                {...register("phone")}
              />

              <TextField
                select
                name="gender"
                label="Gender"
                {...register("gender")}
                defaultValue={user.gender}
              >
                <MenuItem value={true}>Male</MenuItem>
                <MenuItem value={false}>Female</MenuItem>
              </TextField>
              <Controller
                name="birthday"
                control={control}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Birthday"
                      format="DD/MM/YYYY"
                      views={["day", "month", "year"]}
                      defaultValue={dayjs(user.birthday)}
                      name="birthday"
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
                Update
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default EditUser;
