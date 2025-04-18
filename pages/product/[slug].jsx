import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "components/products/ProductIntro";
// import ProductReview from "components/products/ProductReview";
// import AvailableShops from "components/products/AvailableShops";
// import RelatedProducts from "components/products/RelatedProducts";
// import FrequentlyBought from "components/products/FrequentlyBought";
// import ProductDescription from "components/products/ProductDescription";
// import {
//   getFrequentlyBought,
//   getRelatedProducts,
// } from "utils/__api__/related-products";
// import api from "utils/__api__/products"; // styled component

import api from "utils/__api__/healthbeauty-shop";
import { useAppContext } from "contexts/AppContext";


const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
})); 

const ProductDetails = (props) => {
  // const { frequentlyBought, relatedProducts, product } = props;
  const { product } = props;
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value); // Show a loading state when the fallback is rendered

  const { mainContent, setMainContent } = useAppContext();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  useEffect(() => {
    setMainContent("PRODUCTDETAIL");
  }, [])

  const renderMainContent = () => {

    // console.log('[slug]@renderMainContent: ', { mainContent, searchValue} );

    if (mainContent === "SEARCHRESULT") {
      router.push({
        pathname: "/",
      });
      return null; // Do not render anything as the page is redirecting
    }

    if (mainContent === "PRODUCTDETAIL") {
      return (
        <ShopLayout1>
          <Container
            sx={{
              my: 4,
            }}
          >
            {/* PRODUCT DETAILS INFO AREA */}
            {product ? 
              <Box mb={6}>
                <ProductIntro product={product} /> 
                {/* <ProductDescription product={product} /> */}
              </Box>
            : <H2>Loading...</H2>
            }
    
            {/* PRODUCT DESCRIPTION AND REVIEW */}
            {/* <StyledTabs
              textColor="primary"
              value={selectedOption}
              indicatorColor="primary"
              onChange={handleOptionClick}
            >
              <Tab className="inner-tab" label="Description" />
              <Tab className="inner-tab" label="Review (3)" />
            </StyledTabs>
    
            <Box mb={6}>
              {(selectedOption === 0 && product) ? (
                <ProductDescription product={product} />
                ) : (
                <H4>Loading...</H4>
              )}
    
              {selectedOption === 1 && <ProductReview />}
            </Box> 
    
            frequentlyBought && (
              <FrequentlyBought productsData={frequentlyBought} />
            )
    
            <AvailableShops />
    
            relatedProducts && <RelatedProducts productsData={relatedProducts} />*/}
          </Container>
          <div>
    
          </div>
        </ShopLayout1>
      );
    }

  }

  
  return renderMainContent();

};


export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async ({ params }) => {
  // const relatedProducts = await getRelatedProducts();
  // const frequentlyBought = await getFrequentlyBought();
  const product = await api.getProduct(params.slug);

  return {
    props: {
      // frequentlyBought,
      // relatedProducts,
      product,
    },
  };
};

export default ProductDetails;