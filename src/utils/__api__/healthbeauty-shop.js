import axios from "axios";

// Returns a list of products tagged as "new"
const getTopNewProducts = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/products?tag=new`);
  // console.log('API: getTopNewProducts');
  return response.data;
};

// Returns a list of value-added company services
const getServices = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/services`);
  // console.log('API: getServices');
  return response.data;
};

// Returns categories as navigation items
const getNavigation = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/navigation`);
  // console.log('API: getNavigation');
  return response.data;
};

// Returns a carousel of ads or products
const getMainCarousel = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/main-carousel`);
  // console.log('API: getMainCarousel');
  return response.data;
};

// Returns an array of categories and their items with details
const getCategories = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/categories`);
  // console.log('API: getCategories');
  return response.data;
};

// Returns all products or products with given Category-Property value
const getProducts = async ({ category = "" } = {}) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/products`, {
    params: { category },  
  });
  // console.log('API: getProducts');
  return response.data;
};

// This is redundant to getProducts but is tolerated temporarily
const getProductsByCategory = async ({ category = "" }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/products-by-category/${category}`, {});
  // console.log('API: getProductByCategory');
  return response.data;
};

const getAllProducts = async () => {
  // console.log('API: getAllProducts');
  return getProducts();
};

// Get single product by slug
const getProduct = async (slug) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/products/slug`, {
    params: {
      slug,
    },
  });
  // console.log('API: getProduct');
  return response.data;  
};

// All products slug list
const getSlugs = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/products/slug-list`);
  // console.log('API: getSlugs');
  return response.data;
}; 

// Returns all products with the search substring or text
const search = async (searchValue = "") => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/health-beauty/categories/search`, {
    params: { q }, // Pass the category as a query parameter
  });
  // console.log('API: search');
  return response.data;
};

export default {
  getTopNewProducts,
  getServices,
  getNavigation,
  getMainCarousel,
  getCategories,
  getProducts,
  getProductsByCategory,
  getAllProducts,
  getProduct,
  getSlugs,
  search
};


