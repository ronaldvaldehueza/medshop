import { Fragment } from "react";
import { Divider } from "@mui/material";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import Navbar from "components/navbar/Navbar";
import Topbar from "components/topbar/Topbar";
import { MobileNavigationBar } from "components/mobile-navigation";

// =============================================================
const ShopNowLayout = ({ children, type = "one", categoryNav }) => {
  return (
    <Fragment>
      <Topbar />
      <Header />

      {type === "one" && (
        <Fragment>
          <Navbar />
          {children}
        </Fragment>
      )}

      {type === "two" && (
        <Fragment>
          <Divider />
          {categoryNav}
          <div 
            className="section-after-sticky"
            style={{
                maxWidth: "1400px", // Adjust width here
                margin: "0 auto",
                padding: "1rem",
              }}
          >{children}</div>
        </Fragment>
      )}

      {/* <Footer /> TODO DEBUG: CAUSES NESTED <a>s*/}
      <MobileNavigationBar />
    </Fragment>
  );
};

export default ShopNowLayout;
