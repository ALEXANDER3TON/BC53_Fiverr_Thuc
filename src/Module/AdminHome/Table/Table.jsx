import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ManageUser from "./ManageUser";
import ManageJob from "./ManageJob";
import ManageJobStyle from "./ManageJobStyle";
import ManageServices from "./ManageServices";

const Table = ({ info }) => {
   
  return (
    <Box>
      {info === "ManageUser" ? (
        <ManageUser />
      ) : info === "ManageJob" ? (
        <ManageJob />
      ) : info === "ManageJobStyle" ? (
        <ManageJobStyle />
      ) : info === "ManageServices" ? (
        <ManageServices />
      ) : null}
    </Box>
  );
};

export default Table;
