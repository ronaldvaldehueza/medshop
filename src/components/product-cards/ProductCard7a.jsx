import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/MartImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib"; // styled components

const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%",
    },
  },
})); // =========================================================

// =========================================================
const ProductCard7a = ({ id, name, qty, price, imgUrl, slug }) => {
  const { dispatch } = useAppContext(); // handle change cart

  const handleCartAmountChange = (amount) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        name,
        price,
        imgUrl,
        qty: amount,
        slug,
      },
    });
  };

  return (
    <Wrapper>
      <Image
        alt={name}
        width={140}
        height={140}
        display="block"
        src={imgUrl}
      />

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/product/${slug}`}>
            <Span ellipsis fontWeight="600" fontSize={18}>
              {name}
            </Span>
        </Link>

        <FlexBox alignItems="center">
          <Span mx={1} fontWeight={600} fontSize={15}>
            x {qty}
          </Span>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7a;
