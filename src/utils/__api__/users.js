import axios from "axios";
export const getUser = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/user-list/1`);
  return response.data;
};
export const getUserIds = async () => {
  const response = await axios.get(`${process.env.API_URL}/api/user-list/id-list`);
  return response.data;
};
export default {
  getUser,
  getUserIds,
};
