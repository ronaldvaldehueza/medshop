import { useEffect, useState, useRef } from "react";
import { Container, Grid, Pagination } from "@mui/material";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ShopNowLayout from "components/layouts/ShopNowLayout";
import ProductCard1a from "components/product-cards/ProductCard1a";
import { renderProductCount } from "../src/lib";
import api from "utils/__api__/healthbeauty-shop";
import ShopNowNavbar from "components/navbar/ShopNowNavbar";

import shuffleArray from "utils/shuffleArray";
import { setSearchValue, useAppContext } from "contexts/AppContext";


const PRODUCT_PER_PAGE = 28;

const ShopPage1 = ({ navigationList }) => {
  const [page, setPage] = useState(1);
  const [selectedDivision, setSelectedDivision] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("All Products");
  const [categoryDatabaseMap, setCategoryDatabaseMap] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const shuffledProductsRef = useRef([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const { searchValue, setSearchValue } = useAppContext();
  const [productList, setProductList] = useState([]); // handle page change
  const prevSearchValue = useRef(searchValue);

  const handlePageChange = (_, page) => setPage(page); // FETCH THE PRODUCTS

  const handleNavClick = (division, categorySlug, categoryTitle) => {
    setSelectedCategory(categorySlug);
    setSelectedCategoryTitle(categoryTitle);

    if (categorySlug === "all") {
      setProductList(allProducts);
    } else {
      const categoryProducts = categoryDatabaseMap[categorySlug] || [];
      setProductList(categoryProducts);
    }
    setPage(1);
    setSearchValue("");
  };

  const fetchProducts = async () => {
    try {
      const [categoriesResponse, allProductsResponse] = await Promise.all([
        api.getCategories(),
        api.getAllProducts(),
      ]);
      setCategoryDatabaseMap(categoriesResponse);
      setAllProducts(allProductsResponse);

      if (allProductsResponse.length > 0 && shuffledProductsRef.current.length === 0) {
        const shuffled = shuffleArray([...allProductsResponse]);
        shuffledProductsRef.current = {
          all: shuffled,
          topNewProducts: shuffled.slice(0, 14),
        };
        setShuffledProducts(shuffledProductsRef.current);
      }

      setProductList(allProductsResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchValue === "") return;
    const filteredProducts = allProducts.filter((product) =>
        product.title?.toLowerCase().includes(searchValue.toLowerCase())
      );

    // prevSearchValue.current = searchValue;
    setPage(1);
    setProductList(filteredProducts);
    setSelectedDivision(null);
    setSelectedCategory(null);
    setSelectedCategoryTitle(null);

  }, [searchValue]);


  // CATEGORY NAV LIST
  const categoryNav = (
      <ShopNowNavbar
        navigationList={navigationList}
        selectedDivision={selectedDivision}
        setSelectedDivision={setSelectedDivision}
        selectedCategory={selectedCategory}
        selectedCategoryTitle={selectedCategoryTitle}
        onChangeCategory={handleNavClick}
      />
  );

  return (
    <ShopNowLayout 
      type="two" 
      categoryNav={categoryNav}
    >
      <SEO title="Shop Now" />

      <Container sx={{ mt: 4, }}>
        {/* PRODUCT LIST AREA */}
        <Grid container spacing={3} minHeight={500}>
          {Array.isArray(productList) 
            ? productList.slice(
              (page - 1) * PRODUCT_PER_PAGE,
              page * PRODUCT_PER_PAGE
            ).map((item) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
              <ProductCard1a
                id={item.id}
                slug={item.slug}
                title={item.title}
                // price={item.price}
                // rating={item.rating}
                rating={5}
                imgUrl={item.thumbnail}
                images={item.images}
                // discount={item.discount}
              />
            </Grid>
            )) 
          : null}
        </Grid>

        {/* PAGINATION AREA */}
        <FlexBetween flexWrap="wrap" my={8}>
          <Span>
            {renderProductCount(page, PRODUCT_PER_PAGE, productList?.length)}
          </Span>

          <Pagination
            page={page}
            color="primary"
            variant="outlined"
            onChange={handlePageChange}
            count={Math.ceil((productList?.length || 0) / PRODUCT_PER_PAGE)}
          />
        </FlexBetween>
      </Container>
    </ShopNowLayout>
  );
};

export const getStaticProps = async () => {
  const navigationList = await api.getNavigation();

  return {
    props: {
      navigationList,
    },
  };
};

export default ShopPage1;
