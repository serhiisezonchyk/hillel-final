import { DEFAULT_FILTER_PARAMS, filterProducts } from '@/lib/filteringData';
import { Filter, Product } from '@/types';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

const useProductFilters = (data: Product[]) => {
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER_PARAMS);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const applyStringFilter = ({ key, value }: { key: keyof Pick<Filter, 'name'>; value: string }) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyPriceFilter = ({ value }: { value: [number, number] }) => {
    setFilter((prev) => ({
      ...prev,
      price: value,
    }));
  };

  const applyArrayFilter = ({ key, value }: { key: keyof Pick<Filter, 'category'>; value: string }) => {
    const isFilterApplied = filter[key].includes(value);
    if (isFilterApplied)
      setFilter((prev) => ({
        ...prev,
        [key]: prev[key].filter((v) => v !== value),
      }));
    else {
      setFilter((prev) => ({ ...prev, [key]: [...prev[key], value] }));
    }
  };

  useEffect(() => {
    const debouncedFilter = debounce(() => {
      const result = filterProducts(data, filter);
      setFilteredData(result);
    }, 400);
    debouncedFilter();
    return () => debouncedFilter.cancel();
  }, [data, filter]);

  return {
    filter,
    setFilter,
    filteredData,
    applyStringFilter,
    applyPriceFilter,
    applyArrayFilter,
  };
};

export default useProductFilters;
