import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAppContext } from "contexts/AppContext";
import { FlexBetween, FlexBox } from "components/flex-box";

const CheckoutPageSection = () => {
  const { state } = useAppContext();

  const Heading = ({ number, title }) => {
    return (
      <FlexBox gap={1.5} alignItems="center" mb={3.5}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            color: "primary.text",
            backgroundColor: "primary.main",
          }}
        >
          {number}
        </Avatar>
        <Typography fontSize="20px">{title}</Typography>
      </FlexBox>
    );
  };

  const {
    shippingName,
    shippingContact,
    shippingWhatsApp,
    // shippingZip,
    shippingEmail,
    shippingCompany,
    shippingAddress1,
    // shippingAddress2,
    // shippingCountry,
    
    billingName,
    billingContact,
    billingWhatsApp,
    // billingZip,
    billingEmail,
    billingCompany,
    billingAddress1,
    // billingAddress2,
    // billingCountry,
    customerRequest, // Extract Customer Request
  } = state;

  const renderAddressSection = (title, fields) => (
    <Card
      sx={{
        mb: 4,
        padding: 3,
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        fontWeight="600"
        sx={{
          fontSize: "16px",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {fields.map((field, index) => (
        <Box
          key={index}
          sx={{
            mb: 0.5,
            padding: 0.3,
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            border: "0px solid #e0e0e0",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontSize: "10px",
              marginBottom: "1px",
            }}
          >
            {field.label}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="500"
            sx={{
              fontSize: "14px",
            }}
          >
            {field.value || "N/A"}
          </Typography>
        </Box>
      ))}
    </Card>
  );

  const shippingFields = [
    { label: "Full Name", value: shippingName },
    { label: "Phone Number", value: shippingContact },
    { label: "WhatsApp Number", value: shippingWhatsApp },
    // { label: "Zip Code", value: shippingZip },
    { label: "Email Address", value: shippingEmail },
    { label: "Company", value: shippingCompany },
    { label: "Address 1", value: shippingAddress1 },
    // { label: "Address 2", value: shippingAddress2 },
    // { label: "Country", value: shippingCountry?.label },
  ];

  const billingFields = [
    { label: "Full Name", value: billingName },
    { label: "Phone Number", value: billingContact },
    { label: "WhatsApp Number", value: billingWhatsApp },
    // { label: "Zip Code", value: billingZip },
    { label: "Email Address", value: billingEmail },
    { label: "Company", value: billingCompany },
    { label: "Address 1", value: billingAddress1 },
    // { label: "Address 2", value: billingAddress2 },
    // { label: "Country", value: billingCountry?.label },
  ];

  return (
    <Box>
      <Heading number={2} title="Request" />

      {/* Customer Request Section */}
      <Card
        sx={{
          mb: 4,
          padding: 3,
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          fontWeight="600"
          sx={{
            fontSize: "16px",
            mb: 1,
          }}
        >
          Customer Request
        </Typography>
        <Box
          sx={{
            padding: 0.3,
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            border: "0px solid #e0e0e0",
          }}
        >
          <Typography
            variant="body1"
            fontWeight="500"
            sx={{
              fontSize: "14px",
            }}
          >
            {customerRequest || "No customer request provided."}
          </Typography>
        </Box>
      </Card>

      <Heading number={3} title="Delivery and Contact" />
      {renderAddressSection("Shipping Address", shippingFields)}
      {renderAddressSection("Billing Address", billingFields)}

    </Box>
  );
};

export default CheckoutPageSection;
