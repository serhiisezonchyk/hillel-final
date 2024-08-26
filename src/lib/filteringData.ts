import { Filter, Product } from '@/types';
export const DEFAULT_FILTER_PARAMS = {
  name: '',
  price: [0, 0] as [number, number],
  category: [],
};
export const filterProducts = (data: Product[] | undefined, filters: Filter) => {
  if (!data) return [];

  return data
    .filter((product) => (filters.category.length > 0 ? filters.category.includes(product.category) : true))
    .filter((product) => (filters.name ? product.title.toLowerCase().includes(filters.name.toLowerCase()) : true))
    .filter((product) => {
      const productPrice = product.price;
      return productPrice >= (filters.price[0] || 0) && productPrice <= (filters.price[1] || Infinity);
    });
};
