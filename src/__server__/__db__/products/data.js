const productList = [
]; // get unique products from prouct list

const uniqueProudcts = [...new Set(productList.map((item) => item.slug))].map(
  (item) => productList.find((it) => it.slug === item)
); // get the all slugs

const slugs = uniqueProudcts.map((item) => ({
  params: {
    slug: item.slug,
  },
}));
export { uniqueProudcts, slugs };
