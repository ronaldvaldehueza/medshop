import Link from "next/link";
import { Box, Container, Grid, IconButton, styled } from "@mui/material";
import AppStore from "components/AppStore";
import { FlexBox } from "components/flex-box";
import MartImage from "components/MartImage";
import { Paragraph } from "components/Typography";
import LinkedIn from "components/icons/LinkedIn";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import Facebook from "components/icons/Facebook";
import Instagram from "components/icons/Instagram"; // styled components
import { useRouter } from "next/router";

import { useAppContext } from "contexts/AppContext";


const StyledFooter = styled("footer")(({ theme, bgcolor }) => ({
  color: "white",
  padding: "40px 10px 40px 20px",
  background: bgcolor ? bgcolor : theme.palette.secondary.main,
  borderRadius: "8px 8px 0 0 !important", 
  [theme.breakpoints.down("md")]: {
    marginBottom: "4rem",
  },
}));

const StyledLink = styled("a")(({ theme }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[300],
  "&:hover": {
    color: theme.palette.grey[100],
  },
})); 

// =================================================================
const PageFooter = ({ sx, id, bgcolor }) => {

  const { mainContent, setMainContent } = useAppContext();

  return (
    <StyledFooter id={id} sx={sx} bgcolor={bgcolor}>
      <Container mb={"1rem"}>
        {/* Parent Grid Container */}
        <Grid container spacing={6}>

          {/* First Column */}
          <Grid item xs={12} md={7}>
            <Link href="/">
              <MartImage
                src="/assets/images/amslogo-w.png"
                style={{ width: "132px", marginBottom: "2rem" }}
                alt="logo"
              />
            </Link>
    
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Paragraph mb={2.5} color="grey.300" maxWidth="370px">
                  Equipping healthcare professionals with dependable tools for a healthier tomorrow.
                </Paragraph>
    
                <AppStore />
              </Grid>
            </Grid>
          </Grid>
    
          {/* Second Column */}
          <Grid item xs={12} md={5} sx={{marginTop: "40px"}}>
            <Grid item xs={12}>
              <Box mt={-0.6}>
                {customerCareLinks.map((cclink, ind) => (
                  <Link 
                    href={cclink.content} 
                    key={ind} 
                    passHref
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('foot', cclink.content);
                      setMainContent(cclink.content);
                      }
                    } 
                  >
                    <Box
                      component="span"
                      sx={{
                        borderRadius: 4,
                        display: "block",
                        cursor: "pointer",
                        color: "grey.300",
                        padding: "0.3rem 0",
                        "&:hover": { color: "grey.100" },
                      }}
                    >
                      {cclink.label}
                    </Box>
                  </Link>
                ))}
              </Box>
              
              {/* Social Media icons */}
              <FlexBox className="flex" mx={-0.625} mt={2}>
                {iconList.map((iconlist, ind) => (
                  <a
                    href={iconlist.url}
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
                      <iconlist.icon fontSize="inherit" />
                    </IconButton>
                  </a>
                ))}
              </FlexBox>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  
  );
};

const customerCareLinks = [
  { label: "Help Center", content: "HELP-CENTER" },
  { label: "Corporate & Bulk Purchasing", content: "CORPORATE-PURCHASING" },
  { label: "Returns & Refunds", content: "RETURNS-REFUNDS" },
];

const iconList = [
  {
    icon: Facebook,
    url: "https://www.youtube.com/@tradeforceuae",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/tradeforceuae",
  },
  {
    icon: Youtube,
    url: "https://www.linkedin.com/company/tradeforceuae/",
  },
  {
    icon: LinkedIn,
    url: "https://www.linkedin.com/company/tradeforceuae/",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/tradeforceuae/",
  },
];
export default PageFooter;
