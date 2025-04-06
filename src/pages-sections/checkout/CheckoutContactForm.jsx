import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "components/Card1";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
// import countryList from "data/countryList";
import { useAppContext } from "contexts/AppContext";

const CheckoutContactForm = () => {
  const { state, dispatch } = useAppContext(); // Access the state and dispatch function from AppContext
  const router = useRouter();
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Initialize values from AppContext
  const initialValues = useMemo(() => ({
    shippingName: state.shippingName || "",
    shippingContact: state.shippingContact || "",
    shippingWhatsApp: state.shippingWhatsApp || "",
    // shippingZip: state.shippingZip || "",
    shippingEmail: state.shippingEmail || "",
    shippingCompany: state.shippingCompany || "",
    shippingAddress1: state.shippingAddress1 || "",
    // shippingAddress2: state.shippingAddress2 || "",
    // shippingCountry: state.shippingCountry || countryList[227],
    billingName: state.billingName || "",
    billingContact: state.billingContact || "",
    billingWhatsApp: state.billingWhatsApp || "",
    // billingZip: state.billingZip || "",
    billingEmail: state.billingEmail || "",
    billingCompany: state.billingCompany || "",
    billingAddress1: state.billingAddress1 || "",
    // billingAddress2: state.billingAddress2 || "",
    // billingCountry: state.billingCountry || countryList[227],
  }), [state]);

  const handleFormSubmit = async (values) => {
    // Update shipping information
    dispatch({
      type: "UPDATE_SHIPPING",
      payload: {
        shippingName: values.shippingName,
        shippingContact: values.shippingContact,
        shippingWhatsApp: values.shippingWhatsApp,
        // shippingZip: values.shippingZip,
        shippingEmail: values.shippingEmail,
        shippingCompany: values.shippingCompany,
        shippingAddress1: values.shippingAddress1,
        // shippingAddress2: values.shippingAddress2,
        // shippingCountry: values.shippingCountry,
      },
    });

    // Update billing information if not same as shipping
    if (!sameAsShipping) {
      dispatch({
        type: "UPDATE_BILLING",
        payload: {
          billingName: values.billingName,
          billingContact: values.billingContact,
          billingWhatsApp: values.billingWhatsApp,
          // billingZip: values.billingZip,
          billingEmail: values.billingEmail,
          billingCompany: values.billingCompany,
          billingAddress1: values.billingAddress1,
          // billingAddress2: values.billingAddress2,
          // billingCountry: values.billingCountry,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_BILLING",
        payload: {
          billingName: values.shippingName,
          billingContact: values.shippingContact,
          billingWhatsApp: values.shippingWhatsApp,
          // billingZip: values.shippingZip,
          billingEmail: values.shippingEmail,
          billingCompany: values.shippingCompany,
          billingAddress1: values.shippingAddress1,
          // billingAddress2: values.shippingAddress2,
          // billingCountry: values.shippingCountry,
        },
      });
    }

    try {
      router.push("/checkout");
    } catch (error) {
      console.error("Error navigating to checkout: ", error);
    }
  };

  const handleCheckboxChange = (values, setFieldValue) => (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
  
    if (checked) {
      // Update billing fields to match shipping fields
      Object.keys(values).forEach((key) => {
        if (key.startsWith("shipping")) {
          const billingKey = key.replace("shipping", "billing");
          setFieldValue(billingKey, values[key]); // Copy shipping to billing
        }
      });
    } else {

    }
  };

  const checkoutSchema = yup.object().shape({
    shippingName: yup.string().required("Required"),
    shippingEmail: yup.string().email("Invalid email").required("Required"),
    shippingContact: yup
      .string()
      .matches(/^\d{10}$/, "Must be a valid 10-digit number")
      .required("Required"),
    // shippingZip: yup
    //   .string()
    //   .matches(/^\d{5}$/, "Must be a valid 5-digit zip code")
    //   .required("Required"),
    // shippingCountry: yup.object().nullable().required("Required"),
    shippingAddress1: yup.string().required("Required"),

    billingName: yup.string().required("Required"),
    billingEmail: yup.string().required("Required"),
    billingContact: yup
      .string()
      .matches(/^\d{10}$/, "Must be a valid 10-digit number")
      .required("Required"),
    // billingZip: yup
    //   .string()
    //   .matches(/^\d{5}$/, "Must be a valid 5-digit zip code")
    //   .required("Required"),
    // billingCountry: yup.object().nullable().required("Required"),
    billingAddress1: yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 sx={{ mb: 4 }}>
            <Typography fontWeight="600" mb={2}>
              Shipping Address
            </Typography>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Full Name"
                  name="shippingName"
                  value={values.shippingName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingName && !!errors.shippingName}
                  helperText={touched.shippingName && errors.shippingName}
                />
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Phone Number"
                  name="shippingContact"
                  value={values.shippingContact}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingContact && !!errors.shippingContact}
                  helperText={touched.shippingContact && errors.shippingContact}
                />
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="WhatsApp Number"
                  name="shippingWhatsApp"
                  value={values.shippingWhatsApp}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingWhatsApp && !!errors.shippingWhatsApp}
                  helperText={touched.shippingWhatsApp && errors.shippingWhatsApp}
                />
                {/* <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Zip Code"
                  name="shippingZip"
                  value={values.shippingZip}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingZip && !!errors.shippingZip}
                  helperText={touched.shippingZip && errors.shippingZip}
                /> */}
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Address 1"
                  name="shippingAddress1"
                  value={values.shippingAddress1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingAddress1 && !!errors.shippingAddress1}
                  helperText={touched.shippingAddress1 && errors.shippingAddress1}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Email Address"
                  name="shippingEmail"
                  value={values.shippingEmail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingEmail && !!errors.shippingEmail}
                  helperText={touched.shippingEmail && errors.shippingEmail}
                />
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Company"
                  name="shippingCompany"
                  value={values.shippingCompany}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingCompany && !!errors.shippingCompany}
                  helperText={touched.shippingCompany && errors.shippingCompany}
                />
                {/* <Autocomplete
                  fullWidth
                  sx={{ mb: 3 }}
                  options={countryList}
                  value={values.shippingCountry}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) => setFieldValue("shippingCountry", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      placeholder="Select Country"
                      error={!!touched.shippingCountry && !!errors.shippingCountry}
                      helperText={touched.shippingCountry && errors.shippingCountry}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Address 2"
                  name="shippingAddress2"
                  value={values.shippingAddress2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.shippingAddress2 && !!errors.shippingAddress2}
                  helperText={touched.shippingAddress2 && errors.shippingAddress2}
                /> */}
              </Grid>
            </Grid>
          </Card1>
          <Card1 sx={{ mb: 4 }}>
            <Typography fontWeight="600" mb={2}>
              Billing Address / Contact
            </Typography>
            <FormControlLabel
              label="Same as shipping address"
              control={<Checkbox size="small" />}
              onChange={handleCheckboxChange(values, setFieldValue)}
            />
            {!sameAsShipping && (
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Full Name"
                    name="billingName"
                    value={values.billingName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingName && !!errors.billingName}
                    helperText={touched.billingName && errors.billingName}
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Phone Number"
                    name="billingContact"
                    value={values.billingContact}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingContact && !!errors.billingContact}
                    helperText={touched.billingContact && errors.billingContact}
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="WhatsApp Number"
                    name="billingWhatsApp"
                    value={values.billingWhatsApp}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingWhatsApp && !!errors.billingWhatsApp}
                    helperText={touched.billingWhatsApp && errors.billingWhatsApp}
                  />
                  {/* <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Zip Code"
                    name="billingZip"
                    value={values.billingZip}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingZip && !!errors.billingZip}
                    helperText={touched.billingZip && errors.billingZip}
                  /> */}
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Address 1"
                    name="billingAddress1"
                    value={values.billingAddress1}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingAddress1 && !!errors.billingAddress1}
                    helperText={touched.billingAddress1 && errors.billingAddress1}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Email Address"
                    name="billingEmail"
                    value={values.billingEmail}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingEmail && !!errors.billingEmail}
                    helperText={touched.billingEmail && errors.billingEmail}
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Company"
                    name="billingCompany"
                    value={values.billingCompany}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingCompany && !!errors.billingCompany}
                    helperText={touched.billingCompany && errors.billingCompany}
                  />
                  {/* <Autocomplete
                    fullWidth
                    sx={{ mb: 3 }}
                    options={countryList}
                    value={values.billingCountry}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => setFieldValue("billingCountry", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        placeholder="Select Country"
                        error={!!touched.billingCountry && !!errors.billingCountry}
                        helperText={touched.billingCountry && errors.billingCountry}
                      />
                    )}
                  />
                  <TextField
                    fullWidth
                    sx={{ mb: 3 }}
                    label="Address 2"
                    name="billingAddress2"
                    value={values.billingAddress2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.billingAddress2 && !!errors.billingAddress2}
                    helperText={touched.billingAddress2 && errors.billingAddress2}
                  /> */}
                </Grid>
              </Grid>
            )}
          </Card1>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart" passHref>
                <Button variant="outlined" color="primary" type="button" fullWidth>
                  Back to Cart
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Checkout
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutContactForm;
