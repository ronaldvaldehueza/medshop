import { useState } from "react";
import { Button, Grid, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import ProductCard14a from "components/product-cards/ProductCard14a";
import CategorySectionCreator from "components/CategorySectionCreator";

// styled component
const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ===========================================================
const Section4 = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 items

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Load 6 more items
  };

  return (
    <CategorySectionCreator title="All Products" seeMoreLink="#" mb={0}>
      <SubTitle>Best deal with medical equipment</SubTitle>
      <Grid container mb={-0.5} spacing={3}>
        {products.slice(0, visibleCount).map((item) => (
          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard14a
              id={item.id}
              slug={item.slug}
              title={item.title}
              brand={item.brand}
              // price={item.price}
              // off={item.discount}
              // rating={item.rating}
              imgUrl={item.thumbnail}
            />
          </Grid>
        ))}
      </Grid>

      {visibleCount < products.length && ( // Show "Load More" button only if there are more items to load
        <FlexRowCenter mt={6}>
          <Button color="primary" variant="contained" onClick={handleLoadMore}>
            Load More...
          </Button>
        </FlexRowCenter>
      )}
    </CategorySectionCreator>
  );
};

export default Section4;
