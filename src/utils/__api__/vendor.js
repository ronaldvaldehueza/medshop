import axios from "axios";

const getAllProductReviews = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/vendor/product-reviews`);
  return response.data;
};

const getAllRefundRequests = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/vendor/refund-requests`);
  return response.data;
};

const getAllPayoutRequests = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/vendor/payout-requests`);
  return response.data;
};

export default {
  getAllProductReviews,
  getAllRefundRequests,
  getAllPayoutRequests,
};
