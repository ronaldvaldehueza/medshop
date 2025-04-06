import { Box } from "@mui/material";
import { H3 } from "components/Typography"; // ======================================================

// ======================================================
const ProductDescription = ({ product }) => {
  const { brand, description, specification } = product;
  return (
    <Box>
      <H3 mb={2}>Description:</H3>
      <Box>
        Brand: {brand} <br />
        {description?.map((line, index) =>
          index === 0 && line.toUpperCase() === "FEATURES" ? (
            line
          ) : (
            <Box key={index} component="li">
              {line}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default ProductDescription;
