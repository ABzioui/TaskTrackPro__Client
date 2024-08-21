import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "components/Header";

const Layout = () => {
  return (
    <Box>
      <Box>
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
