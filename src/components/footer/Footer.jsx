import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import Image from "components/MartImage";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import Google from "components/icons/Google";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram"; // styled component

const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));

const Footer = () => {
  return (
    <footer>
      <Box bgcolor="#222935">
        <Container
          sx={{
            p: "0.5rem",
            color: "white",
          }}
        >
          <Box py={5} overflow="hidden">
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                      <Link href="/">
                          <Image 
                            style={{ marginBottom: "2rem", width: "132px"  }}
                            src="/assets/images/amslogo-w.png" 
                            alt="logo" 
                          />
                      </Link>

                      <Paragraph mb={2.5} color="grey.500">
                      Equipping healthcare professionals with dependable tools for a healthier tomorrow.
                      </Paragraph>

                      <AppStore />
                    </Grid>

                    <Grid item lg={2} md={6} sm={6} xs={12}>
                      <Box
                        fontSize="18px"
                        fontWeight="600"
                        mb={1.5}
                        lineHeight="1"
                        color="white"
                      >
                        About Us
                      </Box>

                      <div>
                        {aboutLinks.map((item, ind) => (
                          <Link href="/" key={ind} passHref>
                            <StyledLink>{item}</StyledLink>
                          </Link>
                        ))}
                      </div>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                      <Box
                        fontSize="18px"
                        fontWeight="600"
                        mb={1.5}
                        lineHeight="1"
                        color="white"
                      >
                        Customer Care
                      </Box>

                      <div>
                        {customerCareLinks.map((item, ind) => (
                          <Link href="/" key={ind} passHref>
                            <StyledLink>{item}</StyledLink>
                          </Link>
                        ))}
                      </div>
                    </Grid>

                    <Grid item lg={3} md={6} sm={6} xs={12}>
                      <Box
                        fontSize="18px"
                        fontWeight="600"
                        mb={1.5}
                        lineHeight="1"
                        color="white"
                      >
                        Contact Us
                      </Box>
                      <Box py={0.6} color="grey.500">
                      DUBAI, UAE
                      </Box>
                      <Box py={0.6} color="grey.500">
                        Email: med@tradeforceuae.com
                      </Box>
                      <Box py={0.6} mb={2} color="grey.500">
                        Phone: +971 58 553 1227
                      </Box>

                      <FlexBox className="flex" mx={-0.625}>
                        {iconList.map((item, ind) => (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopenner"
                            key={ind}
                          >
                            <IconButton
                              sx={{
                                margin: 0.5,
                                fontSize: 12,
                                padding: "10px",
                                backgroundColor: "rgba(0,0,0,0.2)",
                              }}
                            >
                              <item.icon fontSize="inherit" />
                            </IconButton>
                          </a>
                        ))}
                      </FlexBox>
                    </Grid>
                </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  "Terms & Conditions",
  "Privacy Policy",
];
const customerCareLinks = [
  "Help Center",
  "How to Buy",
];
const iconList = [
  {
    icon: Facebook,
    url: "/",
  },
  {
    icon: Twitter,
    url: "/",
  },
  {
    icon: Youtube,
    url: "/",
  },
  {
    icon: Google,
    url: "/",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/tradeforceuae/",
  },
];
export default Footer;
