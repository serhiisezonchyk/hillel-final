import { FilterSheet, PriceFilter, SearchFilter } from '@/components/filters';
import { ProductsList } from '@/components/product';
import DataPagintaion from '@/components/shared/DataPagintaion';
import HelmetMetadata from '@/components/shared/HelmetMetadata';
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';
import SortButton from '@/components/shared/SortButton';
import usePagination from '@/hooks/usePagination';
import useProductFilters from '@/hooks/useProductFilter';
import { useGetProductsByCategoryQuery } from '@/store/api/productApi';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const CategoryPage = () => {
  const itemsPerPage = 10;
  const { category } = useParams();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data = [], isLoading } = useGetProductsByCategoryQuery({ category: category as string, sort: sortOrder });
  const { filter, applyStringFilter, applyPriceFilter, filteredData } = useProductFilters(data);
  const { paginatedData, currentPage, totalPages, handlePageChange } = usePagination(filteredData, itemsPerPage);

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };
  if (!isLoading && data.length === 0) return <Navigate to={'/404'} />;
  return (
    <div>
      <HelmetMetadata title={`${category} | Comfy`} />
      <div className="container">
        <div className="flex flex-col md:flex-row ">
          <div className="w-52 flex-shrink-0 hidden md:block space-y-6 mt-6">
            <SearchFilter
              className="mr-2"
              value={filter.name}
              onChange={(value) => {
                applyStringFilter({
                  key: 'name',
                  value,
                });
              }}
            />
            <PriceFilter
              className="mr-2 border-none shadow-none p-0 hidden md:block bg-background"
              value={filter.price}
              onPriceChange={({ value }) => applyPriceFilter({ value })}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-end items-center flex-row my-2">
              <SortButton sortOrder={sortOrder} onSortChange={handleSortChange} />
              <FilterSheet className="md:hidden">
                <div className="space-y-6">
                  <SearchFilter
                    value={filter.name}
                    onChange={(value) =>
                      applyStringFilter({
                        key: 'name',
                        value,
                      })
                    }
                  />
                  <PriceFilter value={filter.price} onPriceChange={({ value }) => applyPriceFilter({ value })} />
                </div>
              </FilterSheet>
            </div>
            <ProductsList data={paginatedData} isLoading={isLoading} />
            <DataPagintaion
              className="mt-2"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
