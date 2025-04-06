import { useState, useEffect, useRef } from "react";
import SEO from "components/SEO";
import ShopLayout2 from "components/layouts/ShopLayout2";
import PageFooter from "components/page-footer/PageFooter";
import { MobileNavigationBar2 } from "components/mobile-navigation";
import HealthBeautySidenav from "components/page-sidenav/HealthBeautySideNav";
import MainLayout from "pages-sections/health-beauty/MainLayout";

import ProductsByCategoryOrSearch from "./product/search/ProductsByCategoryOrSearch";
import api from "utils/__api__/healthbeauty-shop";
import shuffleArray from "utils/shuffleArray";
import { useAppContext } from "contexts/AppContext";
import AdhocContent from "./adhoc/AdhocContent";
import { useTheme } from "@mui/material/styles";

// ===============================================
const HealthAndBeauty = (props) => {

  const shuffledProductsRef = useRef([]); // Store shuffled products without triggering re-renders
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const { mainContent, setMainContent, 
    searchValue, 
    selectedCategory, setSelectedCategory,
    selectedCategoryTitle, setSelectedCategoryTitle,
  } = useAppContext();
  const [categoryDatabaseMap, setCategoryDatabaseMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {

    const fetchCategoryAndProductData = async () => {
      try {
        const [categoriesResponse, allProductsResponse] = await Promise.all([
          api.getCategories(),
          api.getAllProducts(),
        ]);

        setCategoryDatabaseMap(categoriesResponse);
        setAllProducts(allProductsResponse);

        if (allProductsResponse.length > 0 && shuffledProductsRef.current.length === 0) {
          // Shuffle allProducts for topNewProducts
          const shuffleForTopNewProducts = shuffleArray([...allProductsResponse]);
          const shuffleForAllProducts = shuffleArray([...allProductsResponse]);

          shuffledProductsRef.current = {
            topNewProducts: shuffleForTopNewProducts.slice(0, 14), // First 15 from the shuffle
            allProducts: shuffleForAllProducts, // Full shuffle for all products
          };
      
          setShuffledProducts(shuffledProductsRef.current);
        }
        
      } catch (error) {
        console.error("Error fetching category data: ", error);
      }

    }

    fetchCategoryAndProductData();

  }, []);
  

  const getCategoryArray = (category) => {
    return Array.isArray(categoryDatabaseMap[category]) 
      ? categoryDatabaseMap[category] 
      : null;
  };

  const getFilteredProducts = (searchWhat) => {
    return allProducts.filter((product) => product.title?.toLowerCase().includes(searchWhat.toLowerCase()));
  };

  const filteredProducts = searchValue ? 
    getFilteredProducts(searchValue)
    : null;

  const categoryArray = mainContent !== "HOME" 
    ? getCategoryArray(selectedCategory)
    : shuffledProducts;


  const renderMainContent = () => {
    const theme = useTheme();

    // console.log('@renderMainContent: ', { mainContent, selectedCategory, searchValue} );

    if (mainContent === "SEARCHRESULT") 
      return (
        <ProductsByCategoryOrSearch
          resultsBy={searchValue}
          resultsProduct={filteredProducts} 
          navigationList={props.navigationList}
        />
      );

    if (mainContent === "HOME")
      return shuffledProducts.topNewProducts && shuffledProducts.allProducts ? (
        <MainLayout
          mainCarouselData={props.mainCarouselData}
          topNewProducts={shuffledProducts.topNewProducts} // Use client-shuffled data
          allProducts={shuffledProducts.allProducts} // Full list, shuffled on the client
          serviceList={props.serviceList}
          navigationList={props.navigationList}
          selectedCategory={selectedCategory}
          footerComponent={
            <PageFooter
              id="footer"
              bgcolor={theme.palette.primary[800]}
              sx={{
                borderRadius: "8px",
              }}
            />
          }
        />
      ) : null;

    if (mainContent === "CATEGORYRESULT")
      return (
        <ProductsByCategoryOrSearch
          resultsBy={selectedCategoryTitle}
          resultsProduct={categoryArray}
          navigationList={props.navigationList}
        />
      )
      
    if (mainContent && ["HELP-CENTER", "CORPORATE-PURCHASING", "RETURNS-REFUNDS"]
        .some((substring) => mainContent.includes(substring)))
      return (
        <AdhocContent
          content={mainContent}
          navigationList={props.navigationList}
        />
      )


  }

  return (
    <ShopLayout2>
        <SEO title="Medical Equipment and Supplies" />

        { renderMainContent() }

        {/* SMALL DEVICE BOTTOM NAVIGATION */}
        <MobileNavigationBar2>
          <HealthBeautySidenav
            navList={props.navigationList}
          />
        </MobileNavigationBar2>
    </ShopLayout2>
  );
};

export const getStaticProps = async () => {
  const serviceList = await api.getServices();
  const navigationList = await api.getNavigation();
  // const topNewProducts = await api.getTopNewProducts();
  // const allProducts = await api.getAllProducts();
  const mainCarouselData = await api.getMainCarousel();

  // props: {
  //   serviceList,
  //   topNewProducts,
  //   allProducts,
  //   navigationList,
  //   mainCarouselData,
  // },
  
  return {
    props: {
      serviceList,
      navigationList,
      mainCarouselData,
    },
  };
};

export default HealthAndBeauty;