import { Box, Stack } from "@mui/material";
import SidenavContainer from "components/sidenav-container/SidenavContainer";
import HealthBeautySideNav from "components/page-sidenav/HealthBeautySideNav";
import Section1a from "pages-sections/health-beauty/Section1a";
import Section2 from "pages-sections/health-beauty/Section2";
import Section3 from "pages-sections/health-beauty/Section3";
import Section4 from "pages-sections/health-beauty/Section4";
import Section5 from "pages-sections/health-beauty/Section5";

const MainLayout = (props) => {
  return (
    <>
      {/* TOP HERO CAROUSEL AREA */}
      <Box id="healthBeautySection1">
        <Section1a carouselData={props.mainCarouselData} />
      </Box>

      {/* SIDE NAVIGATION CONTAINER */}
      <SidenavContainer
        navFixedComponentID="healthBeautySection1"
        SideNav={() => 
          <HealthBeautySideNav 
            navList={props.navigationList} 
          />
        }
      >
        <Stack spacing={6}>
          {/* BANNER AREA */}
          <Section2 />

          {/* TOP NEW PRODUCTS AREA */}
          <Section3 products={props.topNewProducts} />

          {/* ALL PRODUCTS AREA */}
          <Section4 products={props.allProducts} />

          {/* SERVICE LIST AREA */}
          {/* <Section5 services={props.serviceList} /> */}

          {/* FOOTER AREA */}
          {props.footerComponent}
        </Stack>
      </SidenavContainer>
    </>
  );
};

export default MainLayout;
