import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import Stepper1 from "components/stepper/Stepper1";
import ShopLayout1 from "./ShopLayout1";
/**
 *  Used:
 *  1. cart page
 *  2. checkout page
 *  3. payment page
 */
// ======================================================

// ======================================================
const CheckoutNavLayout = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const router = useRouter();
  const { pathname } = router;

  // Disable stepper to force user to click "Next" button of the form. This also avoids bypassing validation of contact fields
  // const handleStepChange = (step) => {
  //   switch (step) {
  //     case 0:
  //       router.push("/cart");
  //       break;

  //     case 1:
  //       router.push("/checkout-contact");
  //       break;

  //     case 2:
  //       router.push("/checkout");
  //       break;
        
  //     // case 2:
  //     //   router.push("/payment");
  //     //   break;

  //     // case 3:
  //     //   router.push("/orders");
  //     //   break;

  //     default:
  //       break;
  //   }
  // };


  // Dynamically update `stepperList` based on the selected step
  const dynamicStepperList = stepperList.map((step, index) => ({
    ...step,
    disabled: index > selectedStep, // Enable the step only if it's the current or previous step
  }));


  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;

      case "/checkout-contact":
        setSelectedStep(2);
        break;

      case "/checkout":
        setSelectedStep(3);
        break;

      // case "/payment":
      //   setSelectedStep(3);
      //   break;

      default:
        break;
    }
  }, [pathname]);
  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        <Box
          mb={3}
          display={{
            sm: "block",
            xs: "none",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stepper1
                stepperList={dynamicStepperList}
                selectedStep={selectedStep}
                // onChange={handleStepChange}
              />
            </Grid>
          </Grid>
        </Box>

        {children}
      </Container>
    </ShopLayout1>
  );
};

const stepperList = [
  {
    title: "Cart",
    disabled: false,
  },
  {
    title: "Checkout Contact",
    disabled: true,
  },
  {
    title: "Checkout",
    disabled: true,
  },
  // {
  //   title: "Payment",
  //   disabled: true,
  // },
  // {
  //   title: "Review",
  //   disabled: true,
  // },
];
export default CheckoutNavLayout;
