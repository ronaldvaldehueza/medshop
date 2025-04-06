import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Rating,
  TextField,
} from "@mui/material";
import Accordion from "components/accordion/Accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/AccordionHeader";

const ProductFilterCard = () => {
  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >
      {/* CATEGORY VARIANT FILTER */}
      <H6 mb={1.25}>Categories</H6>

      {categoryList.map((item) =>
        item.subCategories ? (
          <Accordion key={item.title} expanded>
            <AccordionHeader px={0} py={0.75} color="grey.600">
              <Span
                sx={{
                  cursor: "pointer",
                  mr: "9px",
                }}
              >
                {item.title}
              </Span>
            </AccordionHeader>

            {item.subCategories.map((name) => (
              <Paragraph
                pl="22px"
                py={0.75}
                key={name}
                fontSize="14px"
                color="grey.600"
                sx={{
                  cursor: "pointer",
                }}
              >
                {name}
              </Paragraph>
            ))}
          </Accordion>
        ) : (
          <Paragraph
            py={0.75}
            fontSize="14px"
            color="grey.600"
            key={item.title}
            className="cursor-pointer"
          >
            {item.title}
          </Paragraph>
        )
      )}

      <Divider
        sx={{
          mt: 2,
          mb: 3,
        }}
      />

      
    </Card>
  );
};

const categoryList = [
  {
    title: "Bath Preparations",
    subCategories: ["Bubble Bath", "Bath Capsules", "Others"],
  },
  {
    title: "Eye Makeup Preparations",
  },
  {
    title: "Fragrance",
  },
  {
    title: "Hair Preparations",
  },
];
const brandList = ["Maccs", "Karts", "Baars", "Bukks", "Luasis"];
const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];
export default ProductFilterCard;
