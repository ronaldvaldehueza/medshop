import axios from "axios";
export const getTicketList = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/tickets`);
  return response.data;
};
export const getTicket = async (slug) => {
  const response = await axios.get(`${process.env.API_URL}/api/tickets/single`, {
    params: {
      slug,
    },
  });
  return response.data;
};
export const getSlugs = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/tickets/slugs`);
  return response.data;
};
export default {
  getTicketList,
  getTicket,
  getSlugs,
};
