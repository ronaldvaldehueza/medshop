import { Add, Close, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import MartImage from "components/MartImage";
import MartRating from "components/MartRating";
import Carousel from "components/carousel/Carousel";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib"; // styled components

const ContentWrapper = styled(Box)(({ theme }) => ({
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": {
      opacity: 1,
      left: 10,
    },
    "& .carousel__next-button": {
      opacity: 1,
      right: 10,
    },
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 0,
    boxShadow: "none",
    transition: "all 0.3s",
    background: "transparent",
    color: theme.palette.primary.main,
    ":disabled": {
      color: theme.palette.grey[500],
    },
    ":hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  "& .carousel__back-button": {
    left: 0,
  },
  "& .carousel__next-button": {
    right: 0,
  },
})); // =====================================================

// =====================================================
const ProductViewDialog = (props) => {
  const { product, openDialog, handleCloseDialog } = props;
  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === product.id);

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount,
        name: product.title,
        imgUrl: product.imgGroup[0],
      },
    });
  };

  return (
    <Dialog
      open={openDialog}
      maxWidth={false}
      onClose={handleCloseDialog}
      sx={{
        zIndex: 1501,
      }}
    >
      <DialogContent
        sx={{
          maxWidth: 900,
          width: "100%",
        }}
      >

        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel 
                totalSlides={Array.isArray(product?.imgGroup) ? product.imgGroup.length : 0} 
                visibleSlides={1}
              >
                {Array.isArray(product?.imgGroup) && 
                  product.imgGroup.map((item, index) => (
                  <MartImage
                    key={index}
                    src={item}
                    sx={{
                      mx: "auto",
                      width: "100%",
                      objectFit: "contain",
                      height: {
                        sm: 400,
                        xs: 250,
                      },
                    }}
                  />
                ))}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2>{product.title}</H2>

              <Paragraph py={1} color="grey.500" fontWeight={600} fontSize={13}>
                Brand: {product.brand}
              </Paragraph>

              {/* <H1 color="primary.main">{currency(product.price)}</H1> */}

              <FlexBox alignItems="center" gap={1}>
                <MartRating
                  color="warn"
                  fontSize="1.25rem"
                  value={4}
                  readOnly
                />
                <H6 lineHeight="1">(4)</H6>
              </FlexBox>

              <FlexBox my={2}>
                {product?.description && 
                  typeof product?.description === "string" &&
                  product.description.length > 0 ? (
                    product.description.split('|').map((line, index) => (
                      index === 0 && ["FEATURES", "SPECIFICATION", "DETAILS"].includes(line.trim().toUpperCase()) ? (
                        <Box key={index}>{line}</Box> // Render without bullet for the first line if it matches
                      ) : (
                        <Box key={index} component="li">
                          {line}
                        </Box> // Render as list item for all other lines
                      )
                    ))
                  ) : (
                    <Box>{/*No description available.*/}</Box> 
                  )
                }
              </FlexBox>

              <Divider
                sx={{
                  mb: 2,
                }}
              />

              {!cartItem?.qty ? (
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleCartAmountChange(1)}
                  sx={{
                    height: 45,
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
                <FlexBox alignItems="center">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      p: ".6rem",
                      height: 45,
                    }}
                    onClick={handleCartAmountChange(cartItem?.qty - 1)}
                  >
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      p: ".6rem",
                      height: 45,
                    }}
                    onClick={handleCartAmountChange(cartItem?.qty + 1)}
                  >
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>
              )}
            </Grid>
          </Grid>
        </ContentWrapper>

        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
          }}
          onClick={handleCloseDialog}
        >
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;
