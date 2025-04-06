import { useState } from "react";
import { Fragment } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1a";
import { Span } from "components/Typography";

// ========================================================
const ProductCard1List = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 9; // Number of products per page

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
      {/* UI after Category clicked */}
      <Grid container spacing={3}>
        {currentProducts.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              brand={item.brand}
              // price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              images={item.images}
              // discount={item.discount}
              description={item.description}
              dimension={item.dimension}
              specification={item.specification}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length}
        </Span>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)} // Total pages based on products.length
          page={currentPage} // Controlled pagination
          onChange={handlePageChange} // Page change handler
          variant="outlined"
          color="primary"
        />
      </FlexBetween>
    </Fragment>
  );
};

export default ProductCard1List;
