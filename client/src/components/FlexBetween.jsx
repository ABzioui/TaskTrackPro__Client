const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

// "styled" est une façon de réutiliser les styles CSS dans un composant
// Material UI a ce composant Box qui vous permet de passer des propriétés comme s'il s'agissait de propriétés CSS.
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
