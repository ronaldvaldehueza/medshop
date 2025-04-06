import axios from "axios";

// get all product slug
const getSlugs = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/slug-list`);
  return response.data;
}; 

// get product based on slug
const getProduct = async (slug) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/slug`, {
    params: {
      slug,
    },
  });
  return response.data;
};

export default {
  getSlugs,
  getProduct,
};
