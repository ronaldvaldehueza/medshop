/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAppContext } from "contexts/AppContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Card1 from "components/Card1";
import { FlexBetween, FlexBox } from "components/flex-box";
import LazyImage from "components/LazyImage";
import { H6, Paragraph } from "components/Typography";
import { months, years } from "data/months-years";
import { format } from "date-fns";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
import EditAddressForm from "./EditAddressForm";
import NewAddressForm from "./NewAddressForm"; 

import ProductCard7a from "components/product-cards/ProductCard7a";

// ====================================================================
const Heading = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="20px">{title}</Typography>
    </FlexBox>
  );
};

const CheckoutForm = () => {
  const router = useRouter();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selected, setSelected] = useState(false);

  const { state } = useAppContext();
  const cartList = state.cart;

  const handleFormSubmit = async (values) => {
    router.push("/none");
  };

  const toggleHasVoucher = () => setHasVoucher((has) => !has);

  const editHandler = (value) => {
    const data = addressData.find((item) => item.name === value);
    setSelected(data);
    openEditForm ? setOpenEditForm(false) : setOpenEditForm(true);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>

          <Heading number={1} title="Orders" />
          <Card1
            sx={{
              mb: 3,
            }}
          >

            <Grid container spacing={3}>
              {/* CART PRODUCT LIST */}
              <Grid item xs={12}>
                {cartList.map((item) => (
                  <ProductCard7a key={item.id} {...item} />
                ))}
              </Grid>

            </Grid>

          </Card1>

        </form>
      )}
    </Formik>
  );
};


const checkoutSchema = yup.object().shape({
  address: yup.string().required("required"),
});

export default CheckoutForm;
