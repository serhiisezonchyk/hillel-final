import { CategoriesFilter, FilterSheet, PriceFilter, SearchFilter } from '@/components/filters';
import { ProductsList } from '@/components/product';
import DataPagintaion from '@/components/shared/DataPagintaion';
import HelmetMetadata from '@/components/shared/HelmetMetadata';
import ImageCarousel from '@/components/shared/ImageCarousel';
import ScrollToTopButton from '@/components/shared/ScrollToTopButton';
import SortButton from '@/components/shared/SortButton';
import { CATALOGUE_OFFER_IMAGES } from '@/consts';
import usePagination from '@/hooks/usePagination';
import useProductFilters from '@/hooks/useProductFilter';
import { useGetCategoriesQuery, useGetProductsQuery } from '@/store/api/productApi';
import { useMemo, useState } from 'react';

const itemsPerPage = 10;

const CataloguePage = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data: products = [], isLoading } = useGetProductsQuery({ sort: sortOrder });
  const { filter, applyStringFilter, applyPriceFilter, applyArrayFilter, filteredData } = useProductFilters(products);
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { paginatedData, currentPage, totalPages, handlePageChange } = usePagination(filteredData, itemsPerPage);
  const handleSortChange = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };
  const memoizedCarouselProps = useMemo(
    () => ({
      classNames: { carousel: 'my-2', image: 'basis-1/3 sm:basis-1/4' },
      data: CATALOGUE_OFFER_IMAGES,
      loop: true,
      autoplayDelay: 4000,
    }),
    [],
  );

  return (
    <div>
      <HelmetMetadata title="Comfy" />
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
            <CategoriesFilter
              className="mr-2 border-none shadow-none p-0 hidden md:block bg-background"
              selectedCategories={filter.category}
              data={categories}
              isLoading={isCategoriesLoading}
              onCategoryChange={(value) =>
                applyArrayFilter({
                  key: 'category',
                  value,
                })
              }
            />
            <PriceFilter
              className="mr-2 border-none shadow-none p-0 hidden md:block bg-background"
              value={filter.price}
              onPriceChange={({ value }) => applyPriceFilter({ value })}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-end items-center flex-row my-2 gap-4">
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
                  <CategoriesFilter
                    selectedCategories={filter.category}
                    data={categories}
                    isLoading={isCategoriesLoading}
                    onCategoryChange={(value) =>
                      applyArrayFilter({
                        key: 'category',
                        value,
                      })
                    }
                  />
                  <PriceFilter value={filter.price} onPriceChange={({ value }) => applyPriceFilter({ value })} />
                </div>
              </FilterSheet>
            </div>
            <ImageCarousel {...memoizedCarouselProps} />
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

export default CataloguePage;
