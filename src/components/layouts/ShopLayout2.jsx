import { Fragment, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Header from "components/header/Header";
import Navbar from "components/navbar/Navbar";
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
/**
 *  Used in:
 *  1. grocery1, grocery2, healthbeauty-shop
 *  2. checkout
 **/

const ShopLayout2 = ({ children, showTopbar = true, showNavbar = true }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  return (
    <Fragment>
      {/* TOPBAR */}
      {showTopbar && <Topbar />}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={70}>
        <Header isFixed={isFixed} searchBoxType="type1" />
      </Sticky>

      <Box zIndex={4} position="relative" className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {/* {showNavbar && <Navbar elevation={0} />} */}

        {/* BODY CONTENT */}
        {children}
      </Box>
    </Fragment>
  );
};

export default ShopLayout2;
