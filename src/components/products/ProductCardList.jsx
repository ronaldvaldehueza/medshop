import { useState, useEffect, Fragment } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1a from "components/product-cards/ProductCard1a";
import ProductCard9a from "components/product-cards/ProductCard9a";
import { Span } from "components/Typography";


// ========================================================
const ProductCardList = ({ products = [], view }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Whenever `products` array changes, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Fragment>
      {view === "grid" ? (
            <Grid container spacing={3}>
                {currentProducts.map((item) => (
                    <Grid item lg={4} sm={6} xs={12} key={item.id}>
                        <ProductCard1a
                            id={item.id}
                            slug={item.slug}
                            title={item.title}
                            brand={item.brand}
                            rating={item.rating}
                            imgUrl={item.thumbnail}
                            images={item.images}
                            description={item.description}
                            dimension={item.dimension}
                            specification={item.specification}
                        />
                    </Grid>
                ))}
            </Grid>
        ) : (
            currentProducts.map((item) => (
                <ProductCard9a
                    id={item.id}
                    key={item.id}
                    slug={item.slug}
                    title={item.title}
                    brand={item.brand}
                    rating={item.rating}
                    imgUrl={item.thumbnail}
                    images={item.images}
                    description={item.description}
                    dimension={item.dimension}
                    specification={item.specification}
                />
            ))
        )
      }

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">
          Showing {indexOfFirstProduct + 1}-
          {Math.min(indexOfLastProduct, products.length)} of {products.length}
        </Span>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </FlexBetween>

    </Fragment>
  );
};

export default ProductCardList;
