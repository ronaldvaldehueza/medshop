import { compose, display, spacing, styled } from "@mui/system";

const MartImage = styled("img")(
  compose(spacing, display),
  {
    display: "block", // Inline default style
  }
);

export default MartImage;
