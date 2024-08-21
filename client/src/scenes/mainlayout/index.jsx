import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const MainLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)"); // It returns a bool value if the screen is min than 600px
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId); //Cette ligne récupérera l'ID de l'utilisateur à partir de ReduxToolkit, et non de ReduxToolkit Query.
  const { data } = useGetUserQuery(userId);
  console.log("data:", data);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Nous avons ajouté ces deux lignes ici pour ajouter la fonction au bouton ajouté sur la barre de navigation */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
