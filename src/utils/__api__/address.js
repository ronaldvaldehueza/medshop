import axios from "axios";

const mockData = {
  addressList: [
    { id: 1, name: "Home Address", city: "City A" },
    { id: 2, name: "Office Address", city: "City B" },
  ],
  ids: [1, 2],
  address: { id: 1, name: "Home Address", city: "City A" },
};

const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true";

const getAddressList = async () => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockData.addressList);
  }
  const response = await axios.get(`${process.env.API_URL}/api/address/user`);
  return response.data;
};

const getIds = async () => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockData.ids);
  }
  const response = await axios.get(`${process.env.API_URL}/api/address/address-ids`);
  return response.data;
};

const getAddress = async (id) => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockData.address);
  }
  const response = await axios.get(`${process.env.API_URL}/api/address/user/1`, {
    params: { id },
  });
  return response.data;
};

export default {
  getAddressList,
  getIds,
  getAddress,
};
