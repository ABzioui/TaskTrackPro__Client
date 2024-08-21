import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Header = () => {
  const theme = useTheme();

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      data-testid="header-container"
    >
      <Box textAlign="center" data-testid="inner-box">
        <Typography
          variant="h1"
          fontWeight="bold"
          color={theme.palette.secondary.main}
          marginTop="20px"
          data-testid="header-title"
        >
          TaskTrack Pro
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
