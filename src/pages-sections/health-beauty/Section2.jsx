import Link from "next/link";
import { Box, Button, Card, Grid, styled } from "@mui/material";
import Image from "components/MartImage";
import { FlexRowCenter } from "components/flex-box";
import { H4, H5, H6, Paragraph } from "components/Typography"; // styled components

const ContentBox = styled(Card)(() => ({
  height: 220,
  display: "flex",
  alignItems: "center",
  "& .content": {
    width: "50%",
  },
}));
const RightContent = styled(FlexRowCenter)(({ theme }) => ({
  width: "50%",
  height: "100%",
  flexDirection: "column",
  borderRadius: "0px 50% 50% 0px",
  background: theme.palette.primary[200],
  "& p": {
    fontSize: 13,
    lineHeight: 1.4,
  },
}));
const LeftContent = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "100%",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  "& img": {
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    "& img": {
      width: "100%",
    },
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: "12px",
  marginTop: "16px",
  padding: "4px 12px",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary[400],
  },
}));

const Section2 = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <Link href="/shop-page-1" passHref>
            <ContentBox>
              <RightContent px="20px">
                <Image
                  width="40px"
                  src="/assets/images/Health Shop/Vector (1).png"
                  alt="shop"
                />
                <Paragraph
                  sx={{
                    mt: 2,
                  }}
                >
                  Dedicated to supporting your health with 
                </Paragraph>
                <Paragraph>exceptional care and expert customer service.</Paragraph>
              </RightContent>

              <LeftContent px="10px">
                <Image src="/assets/images/Health Shop/Doctor.png" alt="shop" />
              </LeftContent>
            </ContentBox>
        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>

            <ContentBox
              sx={{
                px: "20px",
              }}
            >
              <Box className="content">
                <Paragraph
                  sx={{
                    fontSize: 12,
                  }}
                >
                  Mobility Equipment
                </Paragraph>
                <H4 fontWeight="700">Start M6 Junior</H4>
                <H6 fontWeight="700">Nylon seat and back upholstery
                </H6>
                <Link href="/product/mob13" passHref>
                  <StyledButton>Shop Now</StyledButton>
                </Link>
              </Box>

              <Box className="content">
                <Image
                  width="100%"
                  src="/assets/images/products/medshop/mobility/mob13/1.png"
                  alt="shop"
                />
              </Box>
            </ContentBox>

      </Grid>
    </Grid>
  );
};

export default Section2;
