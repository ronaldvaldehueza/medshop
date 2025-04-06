import { useCallback, useState } from "react";
import { Apps, ViewList } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FlexBox } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
import ProductCardList from "components/products/ProductCardList";
import HealthBeautySidenav from "components/page-sidenav/HealthBeautySideNav";

const ProductsByCategoryOrSearch = ({ resultsBy, resultsProduct = [], navigationList }) => {
  const [view, setView] = useState("grid");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);

  const filteredProducts = Array.isArray(resultsProduct) ? resultsProduct : [];

  if (!Array.isArray(filteredProducts)) {
    console.error("filteredProducts is not an array:", filteredProducts);
    return <div>No products available for this category.</div>;
  }

  return (
    <Container
      sx={{
        mt: 4,
        mb: 6,
      }}
    >
      {/* {console.log('PBCOS', {resultsBy, filteredProducts})} */}
      {/* TOP BAR AREA */}
      <Card
        id="ProductsByCategoryOrSearchSection"
        elevation={1}
        sx={{
          mb: "15px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          p: {
            sm: "1rem 1.25rem",
            md: "0.5rem 1.25rem",
            xs: "1.25rem 1.25rem 0.25rem",
          },
        }}
      >
        <Box>
          <H5>Searching for: {resultsBy}</H5>
          <Paragraph color="grey.600">
            {filteredProducts.length} results found
          </Paragraph>
        </Box>

        <FlexBox
          alignItems="center"
          columnGap={4}
          flexWrap="wrap"
          my="0.5rem"
        >
          {/* <FlexBox alignItems="center" gap={1} flex="1 1 0">
            <Paragraph color="grey.600" whiteSpace="pre">
              Sort by:
            </Paragraph>

            <TextField
              select
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Sort by"
              defaultValue={sortOptions[0].value}
              sx={{
                flex: "1 1 0",
                minWidth: "150px",
              }}
            >
              {sortOptions.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </FlexBox> */}

          <FlexBox alignItems="center" my="0.25rem">
            <Paragraph color="grey.600" mr={1}>
              View:
            </Paragraph>

            <IconButton onClick={toggleView("grid")}>
              <Apps
                color={view === "grid" ? "primary" : "inherit"}
                fontSize="small"
              />
            </IconButton>

            <IconButton onClick={toggleView("list")}>
              <ViewList
                color={view === "list" ? "primary" : "inherit"}
                fontSize="small"
              />
            </IconButton>
          </FlexBox>
        </FlexBox>
      </Card>

      {/* GRID AND SIDEBAR AREA */}
      <Grid container spacing={3}>
        {/* PRODUCT FILTER SIDEBAR AREA */}
        <Grid
          item
          md={3}
          sx={{
            display: {
              md: "block",
              xs: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: "100px",
              overflowY: "auto",
              height: "calc(100vh - 100px)",
            }}
          >
            <HealthBeautySidenav 
              navList={navigationList || []} 
            />
          </Box>
        </Grid>

        {/* PRODUCT VIEW AREA */}
        <Grid item md={9} xs={12}>
          <ProductCardList 
            products={filteredProducts}
            view={view}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const sortOptions = [
  {
    label: "Relevance",
    value: "Relevance",
  },
  {
    label: "Date",
    value: "Date",
  },
];

export default ProductsByCategoryOrSearch;
