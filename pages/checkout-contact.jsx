import { Grid } from "@mui/material";
import SEO from "components/SEO";
import CheckoutContactForm from "pages-sections/checkout/CheckoutContactForm";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";

const CheckoutContact = () => {
  return (
    <CheckoutNavLayout>
      <SEO title="Checkout" />
      <Grid 
        container 
        flexWrap="wrap-reverse" 
        spacing={3}
        justifyContent="center"  
        alignItems="center"  

      >

        <Grid 
          item lg={8} md={8} xs={12}
          sx={{
            display: "flex",  
            justifyContent: "center", 
            alignItems: "center",  
          }}
        >
          <CheckoutContactForm />
        </Grid>

      </Grid>
    </CheckoutNavLayout>
  );
};

export default CheckoutContact;
