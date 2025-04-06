import { useState, useEffect, Fragment } from "react";
import { Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard9 from "components/product-cards/ProductCard9a";
import { Span } from "../Typography";

// ==========================================================
const ProductCard9List = ({ products = [] }) => {
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
    <div>
      {/* UI after Category clicked */}
      {products.map((item) => (
        <ProductCard9
          id={item.id}
          key={item.id}
          slug={item.slug}
          title={item.title}
          // price={item.price}
          // off={item.discount}
          rating={item.rating}
          imgUrl={item.thumbnail}
        />
      ))}

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </div>
  );
};

export default ProductCard9List;
