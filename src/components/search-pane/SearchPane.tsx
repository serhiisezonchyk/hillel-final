import Overlay from '@/components/shared/Overlay';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLazyGetProductsQuery } from '@/store/api/productApi';
import { Product } from '@/types';
import { Search } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts';
import { AnimatedInput, SearchList } from '.';

interface Props {
  className?: string;
}
const SearchPane: React.FC<Props> = ({ className }) => {
  const searchPaneRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounceValue(value, 400);
  const [isSearch, setIsSearch] = useState(false);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [getProducts, { isFetching }] = useLazyGetProductsQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedValue.trim().length !== 0) {
        try {
          const data = await getProducts({ sort: 'asc' }).unwrap();
          const filteredData = data
            .filter((product) =>
              debouncedValue ? product.title.toLowerCase().includes(debouncedValue.toLowerCase()) : true,
            )
            .slice(0, 3);

          setFilteredData(filteredData);
        } catch (error) {
          console.error('Error fetching products: ', error);
        }
      } else {
        setFilteredData([]);
      }
    };
    fetchData();
  }, [debouncedValue, getProducts]);
  const handleCloseSearching = useCallback(() => {
    setIsSearch(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  useOnClickOutside(searchPaneRef, handleCloseSearching);

  return (
    <>
      {isSearch && <Overlay isOpen={isSearch} onClose={handleCloseSearching} />}
      <div ref={searchPaneRef} className={cn('flex flex-1 relative z-20', className)}>
        <AnimatedInput
          ref={inputRef}
          className="rounded-r-none border-r-0 focus-visible:ring-offset-0 bg-background text-foreground border-none ring-0 focus-visible:ring-0"
          placeholder="Search..."
          value={value}
          setValue={setValue}
          onFocus={() => setIsSearch(true)}
        />
        <Button
          size="icon"
          className="rounded-l-none bg-background text-primary hover:text-background hover:bg-primary-dark"
        >
          <Search />
        </Button>
        {isSearch && (
          <div className="absolute top-12 left-0 right-0 w-full 2xl:w-1/2 2xl:left-1/2 2xl:transform 2xl:-translate-x-1/2  z-20 bg-background text-foreground rounded-md p-4">
            <SearchList isLoading={isFetching} data={filteredData} onClick={handleCloseSearching} />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPane;
