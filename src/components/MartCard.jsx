import { Card, styled } from "@mui/material"; // ===============================================

// ===============================================
const MartCard = styled(({ hoverEffect = false, children, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, hoverEffect }) => ({
  overflow: "unset",
  borderRadius: "8px",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    ...(hoverEffect && {
      boxShadow: theme.shadows[3],
    }),
  },
}));

export default MartCard;
