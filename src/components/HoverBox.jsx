import { Box, styled } from "@mui/material";

const HoverBox = styled(Box)(({ overflow = "hidden" }) => ({
  position: "relative",
  overflow, // Using the default parameter
  "&:after": {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    bottom: 0,
    content: '""', // Corrected syntax for empty string
    position: "absolute",
    transition: "all 250ms ease-in-out",
  },
  "&:hover:after": {
    background: "rgba(0, 0, 0, 0.3)",
  },
}));

export default HoverBox;
