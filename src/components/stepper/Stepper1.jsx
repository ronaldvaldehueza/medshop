import { Fragment, useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { FlexRowCenter } from "components/flex-box"; 

// ========================================================
const Stepper1 = ({ selectedStep = 1, stepperList, onChange }) => {
  const [selected, setSelected] = useState(selectedStep - 1);

  // const handleStepClick = (step, ind) => () => {
  //   if (!step.disabled) {
  //     setSelected(ind);
  //     // if (onChange) onChange(ind);
  //     onChange?.(ind);
  //   }
  // };

  useEffect(() => {
    setSelected(selectedStep - 1);
  }, [selectedStep]);

  return (
    <FlexRowCenter flexWrap="wrap" my="-4px">
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          <Chip
            disabled={step.disabled}
            label={`${ind + 1}. ${step.title}`}
            // onClick={handleStepClick(step, ind)}
            sx={{
              backgroundColor:
                ind <= selected ? "primary.main" : "primary.light",
              color: ind <= selected ? "primary.contrastText" : "primary.main",

              // If disabled, show a lighter color (e.g., grey) or your choice
              ...(step.disabled && {
                backgroundColor: "grey.300",
                color: "grey.600",
                // No pointer on hover
                cursor: "not-allowed",
                pointerEvents: "none",
              }),

              p: "0.5rem 1rem",
              fontSize: "14px",
              fontWeight: "600",
              my: "4px",
              "&:hover:not(:disabled)": {
                // backgroundColor: "primary.main",
                // color: "primary.contrastText",
              },

              cursor: "default",
            }}
          />
          {ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bgcolor={ind < selected ? "primary.main" : "primary.light"}
            />
          )}
        </Fragment>
      ))}
    </FlexRowCenter>
  );
};

export default Stepper1;
