import Mock from "../../mock";
import * as db from "./data";

import airmattressDatabase from "data/category-product/airmattress";
import bathroomsafetyDatabase from "data/category-product/bathroomsafety";
import bedsDatabase from "data/category-product/beds";
import cannesandstandingaidsDatabase from "data/category-product/cannesandstandingaids";
import dmeDatabase from "data/category-product/dme";
import hoistorpatienttransferDatabase from "data/category-product/hoistorpatienttransfer";
import mobilityDatabase from "data/category-product/mobility";
import orthopediccareDatabase from "data/category-product/orthopediccare";
import pediatricmobilityDatabase from "data/category-product/pediatricmobility";
import respiratorycareDatabase from "data/category-product/respiratorycare";
import specialneedsDatabase from "data/category-product/specialneeds";
import wheelchairrampDatabase from "data/category-product/wheelchairramp";

import ppe from "data/category-product/ppe";
import laboratory from "data/category-product/laboratory";

const products = db.products.filter((item) => item.for.type === "all-products");
const topProducts = db.products.filter(
  (item) => item.for.type === "top-new-products"
);

const categoryDatabaseMap = {
  airmattress: airmattressDatabase,
  bathsafety: bathroomsafetyDatabase,
  beds: bedsDatabase,
  cannes: cannesandstandingaidsDatabase,
  dme: dmeDatabase,
  hoist: hoistorpatienttransferDatabase,
  mobility: mobilityDatabase,
  orthopedic: orthopediccareDatabase,
  pediamob: pediatricmobilityDatabase,
  respcare: respiratorycareDatabase,
  specneeds: specialneedsDatabase,
  wheelchairramp: wheelchairrampDatabase,

  ppe,
  laboratory,
};

const allProducts = Object.values(categoryDatabaseMap).flat();

// Get unique products from product list
const uniqueProducts = [...new Set(allProducts.map((item) => item.slug))].map(
  (item) => allProducts.find((it) => it.slug === item)
); 

// Get all slugs
const slugs = allProducts.map((item) => ({
  params: {
    slug: item.slug,
  },
}))

// Returns a list of products tagged as "new"
Mock.onGet("/api/health-beauty/products?tag=new").reply(async () => {
  try {
    return [200, topProducts];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// Mock.onGet("/api/health-beauty/products").reply(async () => {
//   try {
//     return [200, products];
//   } catch (err) {
//     console.error(err);
//     return [
//       500,
//       {
//         message: "Internal server error",
//       },
//     ];
//   }
// });

// Returns a list of value-added company services
Mock.onGet("/api/health-beauty/services").reply(() => {
  try {
    return [200, db.serviceList];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// Returns categories as navigation items
Mock.onGet("/api/health-beauty/navigation").reply(() => {
  try {
    return [200, db.categoryNavigation]; // Returns an array of objects (Medical Equipment and Medical Supplies) with icon, title, href, and child (containing categories) properties
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// Returns a carousel of ads or products
Mock.onGet("/api/health-beauty/main-carousel").reply(() => {
  try {
    return [200, db.mainCarouselData];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// Returns an array of categories and their items with details
Mock.onGet("/api/health-beauty/categories").reply(() => {
  try {
    return [200, categoryDatabaseMap]; 
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

// Mock.onGet("/api/health-beauty/categories/all-products").reply(() => {
//   try {
//     return [200, allProducts];
//   } catch (err) {
//     console.error(err);
//     return [500, { message: "Internal server error" }];
//   }
// });

// Returns all or products with given Category-Property value
Mock.onGet("/api/health-beauty/products").reply((config) => {
  try {
    const { category } = config.params || {};
    const filteredProducts = category
      ? allProducts.filter((product) => product.category === category)
      : allProducts;
    // console.log("...health-beauty/products, (config): ", config);
    return [200, filteredProducts];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

// This is redundant to getProducts but is tolerated temporarily
Mock.onGet(/\/api\/health-beauty\/products-by-category\/([a-z]+)/).reply((config) => {
  try {
    const categoryKey = config.url.split("/").pop(); // Extract category slug
    const categoryProducts = categoryDatabaseMap[categoryKey];

    if (categoryProducts) {
      return [200, categoryProducts];
    } else {
      return [404, { message: "Category not found" }];
    }
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

// Get single product by slug
Mock.onGet("/api/health-beauty/products/slug").reply(async (config) => {
  try {
    if (config?.params?.slug) {
      const product = uniqueProducts.find(
        (item) => item.slug === config.params.slug
      );
      return [200, product];
    }

    return [200, shuffle(uniqueProducts)[0]];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
}); 

// All products slug list
Mock.onGet("/api/health-beauty/products/slug-list").reply(async () => {
  try {
    return [200, slugs];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// Returns all products with the search substring or text
Mock.onGet("/api/health-beauty/categories/search").reply((config) => {
  try {
    const query = new URLSearchParams(config.url.split("?")[1]);
    const searchWhat = query.get("q")?.toLowerCase();

    if (searchWhat) {
      const filteredProducts = allProducts.filter((product) =>
        product.title?.toLowerCase().includes(searchWhat)
      );
      return [200, filteredProducts];
    } else {
      return [400, { message: "Search query is required" }];
    }
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});