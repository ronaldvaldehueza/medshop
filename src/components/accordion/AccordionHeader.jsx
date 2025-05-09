import { styled } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { FlexBox } from "components/flex-box"; // styled components

const StyledFlexBox = styled(({ children, open, ...rest }) => (
  <FlexBox {...rest}>{children}</FlexBox>
))(({ open, theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  ".caretIcon": {
    transition: "transform 250ms ease-in-out",
    ...(theme.direction === "rtl"
      ? {
          transform: open ? "rotate(90deg)" : "rotate(180deg)",
        }
      : {
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
        }),
  },
})); // =================================================================

// =================================================================
const AccordionHeader = (props) => {
  const { 
    sx, 
    open, 
    children, 
    showIcon = true, 
    px = "1rem", 
    py = "0.5rem", 
    ...others } = props;
  return (
    <StyledFlexBox open={open} sx={sx} {...others}>
      {children}
      {showIcon && <ChevronRight className="caretIcon" fontSize="small" />}
    </StyledFlexBox>
  );
}; 

export default AccordionHeader;
