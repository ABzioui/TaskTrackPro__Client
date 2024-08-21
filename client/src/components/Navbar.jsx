import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state";
import profileImage from "assets/CAPNoWord.png";
import {
  AppBar,
  Button,
  Box,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  Menu,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CapImage from "assets/Cap-Enge--removebg-preview.png";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateToRoute();
    }
  };

  const navigateToRoute = () => {
    const availableRoutes = [
      "/overview",
      "/admin",
      "/daily",
      "/dashboard",
      "/geography",
      "/monthly",
    ]; // Example of available routes
    const formattedInput = `/${searchInput}`;
    if (availableRoutes.includes(formattedInput)) {
      navigate(formattedInput);
    } else {
      alert("Route not found!");
    }
  };

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase
              data-testid="Search"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
            />
            <IconButton onClick={navigateToRoute}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <img
          src={CapImage}
          alt="CAPImage"
          style={{
            width: "200px",
            height: "auto",
          }}
        />
        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.firstName}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </Button>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/*Le composant Navbar contient des sections gauche et droite, chacune contenant divers icônes et champs de saisie.
Des icônes telles que le menu, la recherche, le basculement de mode et les paramètres sont utilisées à partir de la bibliothèque d'icônes de Material-UI.
Le crochet useDispatch est utilisé pour envoyer des actions au magasin Redux, et l'action setMode est envoyée pour basculer entre les modes clair et sombre.
Des composants Material-UI tels que AppBar, Toolbar, IconButton et InputBase sont utilisés pour le style et la fonctionnalité.
Le composant FlexBetween est utilisé pour créer des mises en page flexibles avec des éléments espacés entre eux.
Les styles sont appliqués à l'aide de la prop sx de la solution de style de Material-UI.*/
