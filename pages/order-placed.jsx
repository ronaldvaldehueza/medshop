// order-placed.jsx
import dynamic from "next/dynamic";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

// Dynamically import Player with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

import successAnimation from "lottie/couple-high-five.json";

const OrderPlaced = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/shop-page-1"); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
        padding: 3,
        bgcolor: "#f9f9f9",
      }}
    >
      <Box sx={{ width: "80%", maxWidth: 400, mb: 4 }}>
        {/* Now Player runs only on the client */}
        <Player
          autoplay
          loop
          src={successAnimation}
          style={{ height: "300px", width: "300px" }}
        />
      </Box>

      <Typography variant="h4" fontWeight="600" mb={2}>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        Thank you for your order!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinueShopping}
        sx={{
          px: 5,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 500,
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderPlaced;
