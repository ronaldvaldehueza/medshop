import { Rating } from "@mui/material";
import { compose, spacing, styled, typography } from "@mui/system";

const MartRating = styled(Rating)(
  compose(spacing, typography),
  {
    fontSize: "1.25rem", // Inline default style
  }
);

export default MartRating;
