import { Box } from "@mui/material";
import React from "react";
import HeaderAdmin from "../../Component/Admin/Header/HeaderAdmin";
import { Outlet } from "react-router-dom";
import FooterAdmin from "../../Component/Admin/Footer/FooterAdmin";

const AdminLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
