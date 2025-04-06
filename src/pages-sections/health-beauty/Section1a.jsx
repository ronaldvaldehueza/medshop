import { Box, Button, Grid, styled, useTheme } from "@mui/material";
import { H1 } from "components/Typography";
import LazyImage from "components/LazyImage";
import Carousel from "components/carousel/Carousel";
import Link from "next/link";

// styled components
const StyledBox = styled(Box)(() => ({
  overflow: "hidden",
  // backgroundColor: "transparent",
  background: "#e9fff9",
  "& .carousel-dot": {
    left: 0,
    right: 0,
    bottom: "30px",
    margin: "auto",
    position: "absolute",
  },
}));

const StyledGrid = styled(Grid)
  (({ theme, bgimage }) => ({ /* bgimage must be in lower case to avoid "React does not recognize `bgImage` prop on a DOM element" */
  // background: `url("${bgimage}")`,
  // backgroundSize: "cover",
  // backgroundPosition: "center",

  margin: "auto",
  maxWidth: 1200,
  position: "relative",
  alignItems: "center",
  // padding: "2rem 0px 5rem 0px",
  padding: "0.5rem 0px 0.5rem 4rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
  },
}));

const GridItemOne = styled(Grid)(({ theme }) => ({
  padding: 20,
  "& .titleBox": {
    marginBottom: 30,
    "& h1": {
      fontSize: 20,
      lineHeight: 1.3,
    },
  },
  [theme.breakpoints.down("md")]: {
    "& .titleBox": {
      "& h1": {
        fontSize: 20,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    "& .titleBox": {
      textAlign: "center",
      "& h1": {
        fontSize: 15,
      },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: "14px",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary[400],
  },
}));

const GridItemTwo = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));  


const Section1a = ({ carouselData }) => {
  const { palette } = useTheme();
  return (
    <StyledBox id="carouselBox">
      <Carousel
        spacing="0px"
        totalSlides={3}
        showDots={true}
        autoPlay={true}
        interval={20000}
        showArrow={false}
        visibleSlides={1}
        dotClass="carousel-dot"
        dotColor={palette.primary.main}
      >
        {carouselData.map((item) => (
          <StyledGrid 
            container 
            key={item.id}
            // bgimage={item.imgUrl}
          >
            <GridItemOne item md={6} sm={6} xs={12}>
              <Box className="titleBox">
                <H1 maxWidth={380}>{item.title}</H1>
              </Box>
              <Box height={20} />
              <Link href="/shop-page-1" passHref>
                <StyledButton variant="contained" sx={{ px: "25px" }} >
                  Shop Now
                </StyledButton>
              </Link>

            </GridItemOne>

            <GridItemTwo item md={6} sm={6} xs={12}>
              {/* <LazyImage
                priority
                width={900}
                height={360}
                src={item.imgUrl}
                alt={item.title}
              /> */}
              <img
                src={item.imgUrl}
                alt={item.title}
              />
            </GridItemTwo>
          </StyledGrid>
        ))}
      </Carousel>
    </StyledBox>
  );
};

export default Section1a;
