import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";
import CAPImage from "../../assets/CAP-removebg-preview.png";
import TaskTrack from "../../assets/TaskTrackPro_V3-removebg-preview.png";

const SignIn = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <FlexBetween>
          <img
            src={TaskTrack}
            alt="TaskTrack"
            style={{
              width: "195px",
              height: "auto",
            }}
          />
          <img
            src={CAPImage}
            alt="CAPImage"
            style={{
              width: "165px",
              height: "auto",
            }}
          />
        </FlexBetween>
      </Box>
      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem" }}
          color={theme.palette.secondary.main}
        >
          Welcome to TaskTrackPro, the way to track your projects
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default SignIn;
