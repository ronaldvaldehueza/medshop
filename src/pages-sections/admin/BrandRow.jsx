import { useState } from "react";
import { Avatar } from "@mui/material";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import MartSwitch from "components/MartSwitch";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents"; // ========================================================================

// ========================================================================
const BrandRow = ({ brand, selected }) => {
  const { name, featured, logo, id } = brand;
  const [featuredCategory, setFeaturedCategory] = useState(featured);
  const isItemSelected = selected.indexOf(name) !== -1;
  return (
    <StyledTableRow tabIndex={-1} role="checkbox" selected={isItemSelected}>
      <StyledTableCell align="center">#{id.split("-")[0]}</StyledTableCell>

      <StyledTableCell align="center">{name}</StyledTableCell>

      <StyledTableCell align="center">
        <Avatar
          src={logo}
          sx={{
            width: 55,
            height: "auto",
            margin: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <MartSwitch
          color="info"
          checked={featuredCategory}
          onChange={() => setFeaturedCategory((state) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default BrandRow;
