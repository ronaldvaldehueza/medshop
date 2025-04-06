import Link from "next/link";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "contexts/AppContext";

const Cart = () => {
  const { state, dispatch } = useAppContext(); // Access state and dispatch from AppContext
  const cartList = state.cart;

  // Calculate total price of cart items
  const getTotalPrice = () =>
    cartList.reduce((accum, item) => accum + item.price * item.qty, 0);

  // Handle change in the comments TextField
  const handleCustomerRequestChange = (event) => {
    dispatch({
      type: "UPDATE_CUSTOMER_REQUEST", // Dispatch action to update comments
      payload: event.target.value,
    });
  };

  return (
    <CheckoutNavLayout>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {cartList.map((item) => (
            <ProductCard7 key={item.id} {...item} />
          ))}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card
            sx={{
              padding: 3,
            }}
          >

            <FlexBox alignItems="center" columnGap={1} mb={2}>
              <Span fontWeight="600">Customer Request</Span>
            </FlexBox>

            {/* TextField to capture customer request */}
            <TextField
              variant="outlined"
              rows={6}
              fullWidth
              multiline
              value={state.customerRequest} // Bind to AppContext state
              onChange={handleCustomerRequestChange} // Handle change
              sx={{
                mb: 2,
              }}
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Link href="/checkout-contact" passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mt: 4,
            }}
          >
            Next: Shipping and Billing Contact
          </Button>
        </Link>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Cart;
