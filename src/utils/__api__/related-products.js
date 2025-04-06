import axios from "axios";
export const getFrequentlyBought = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/frequently-bought-products`);
  return response.data;
};
export const getRelatedProducts = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/related-products`);
  return response.data;
};
