import { useRef, useState } from "react";
import { Box, Grid, Button, Modal, Typography } from "@mui/material";
import SEO from "components/SEO";
import CheckoutForm from "pages-sections/checkout/CheckoutForm";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import CheckoutPageSection from "pages-sections/checkout/CheckoutPageSection";
import generateIMG from "utils/save/generateIMG";
import { state, useAppContext } from "contexts/AppContext";
import { useRouter } from "next/router";
import ProductCard7a1 from "components/product-cards/ProductCard7a1";
import ReactDOMServer from "react-dom/server";


const Checkout = () => {
  const domRefToSave = useRef(null);
  const { state, dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // State to track button status

  const router = useRouter();  

  const { shippingEmail, billingEmail } = state;
  const cartList = state.cart;

  const handleGenerateIMGAndSendEmail = async () => {
    setIsProcessing(true); // Disable the button

    try {
      console.log("Generating Image...");

      const imgBase64 = await generateIMG(domRefToSave); // Generate Base64 image

      if (imgBase64) {
        console.log("Sending email...");

        const orderForm = ReactDOMServer.renderToStaticMarkup(
          <Grid item xs={4}>
            {cartList.map((item) => (
              <ProductCard7a1 key={item.id} {...item} />
            ))}
          </Grid>
        );

        const emailMessage = `
              <div>
                <h1>Your RFQ or Order Summary</h1>
                <p>Please find your RFQ or Order summary below:</p>
                ${orderForm}
                <p/>
                <p>Summary form grab:</p>
                <img src="cid:rfq-order-summary" alt="RFQ/Order Summary" style="width:70%;"/>
              </div>
            `;

        // Send the email
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: billingEmail || shippingEmail,
            cc: "ams.sales@tradeforceuae.com",
            subject: "Your RFQ or Order Summary",
            html: emailMessage,

            attachment: {
              fileName: "RFQ-Order-Summary.png", 
              file: imgBase64.split("base64,")[1], // Only the Base64 data
              cid: "rfq-order-summary"
            },
          }),
        });

        if (response.ok) {
          console.log("Email sent successfully!");
          setModalOpen(true); // Open the modal
          clearAppContext(); // Clear fields in AppContext

          // Redirect after 3 seconds
          setTimeout(() => {
            router.push("/order-placed");
          }, 3000);
        } else {
          console.error("Failed to send email");
        }
      } else {
        console.error("Failed to generate image.");
      }
    } catch (error) {
      console.error("Error during order processing:", error);
    } finally {
      setIsProcessing(false); // Re-enable the button
    }
  };

  const clearAppContext = () => {
    // Reset AppContext fields and cart
    dispatch({ type: "CLEAR_CART" });  
    dispatch({ type: "CLEAR_ALL_FIELDS" }); // Reset all fields
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <CheckoutNavLayout>
      <SEO title="Checkout" />

      {/* Modal Box */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="order-success-title"
        aria-describedby="order-success-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="order-success-title" variant="h6" fontWeight="600" mb={2}>
            Request for Quote or Order has been placed successfully.
          </Typography>
          <Typography id="order-success-description" variant="body1" mb={2}>
            Request for Quote or Order is now processed.
          </Typography>
          <Button
            onClick={handleModalClose}
            variant="contained"
            color="primary"
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Modal>

      {/* Main Checkout Content */}
      <Grid ref={domRefToSave} container flexWrap="wrap" spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Button
              type="button"
              color="primary"
              variant="contained"
              sx={{ mt: 3, width: "60%" }}
              onClick={handleGenerateIMGAndSendEmail}
              disabled={isProcessing} // Disable the button when processing
            >
              {isProcessing ? "Processing..." : "Place Order / Request for Quote"}
            </Button>
          </Box>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutPageSection />
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Checkout;
