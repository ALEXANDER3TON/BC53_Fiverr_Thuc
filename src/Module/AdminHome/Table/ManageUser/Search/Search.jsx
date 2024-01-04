import { Box, TextField } from "@mui/material";
import React, { useState } from "react";

const Search = ({ setKeyword }) => {
  return (
    <Box width={"72%"}>
      <TextField
        placeholder="name or id"
        onChange={(e) => setKeyword(e.target.value)}
        sx={{
          width: {
            xs: "72%",
          },
        }}
      />
    </Box>
  );
};

export default Search;
