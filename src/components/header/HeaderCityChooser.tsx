import { cn } from '@/lib/utils';
import { useGetCitiesQuery } from '@/store/api/novapostApi';
import React, { useCallback, useEffect, useMemo } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DEFAULT_CITY } from '@/consts';
import { CitiesNP } from '@/types';
import { ChevronsUpDown, CircleOffIcon, Loader2 } from 'lucide-react';
import { useDebounceValue, useLocalStorage } from 'usehooks-ts';
import { Input } from '../ui/input';
interface Props {
  className?: string;
}
const HeaderCityChooser: React.FC<Props> = ({ className }) => {
  const [lsCity, setLsCity] = useLocalStorage<CitiesNP>('city', DEFAULT_CITY);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500);
  const [open, setOpen] = React.useState(false);

  const { data: cities = [], isFetching } = useGetCitiesQuery({ findByString: debouncedSearchTerm });

  const handleSelectCity = useCallback(
    (city: CitiesNP) => {
      const savedValue = {
        Description: city.Description,
        Ref: city.Ref,
        CityID: city.CityID,
      };
      setLsCity(savedValue);
      setOpen(false);
    },
    [setLsCity],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener('scroll', handleClose);
      window.addEventListener('resize', handleClose);
    } else {
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('scroll', handleClose);
    }

    return () => {
      window.removeEventListener('resize', handleClose);
      window.removeEventListener('scroll', handleClose);
    };
  }, [open, handleClose]);

  const renderedCities = useMemo(() => {
    if (isFetching) return <Loader2 className="w-full text-center animate-spin" />;
    if (cities.length === 0)
      return (
        <div className="flex flex-col items-center gap-2 text-sm my-2">
          <CircleOffIcon className="size-4 text-center" />
          <p>No city found.</p>
        </div>
      );

    return (
      <div className="max-h-52 overflow-y-auto">
        {cities.map((city) => (
          <div
            key={city.Ref}
            className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 rounded text-sm"
            onClick={() => handleSelectCity(city)}
          >
            {city.Description}
          </div>
        ))}
      </div>
    );
  }, [cities, isFetching, handleSelectCity]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex items-center text-xs hover:text-muted-foreground transition-all duration-300 ease-in-out gap-2',
            className,
          )}
        >
          <p className="line-clamp-1">{lsCity.Description}</p>
          <ChevronsUpDown className="size-4 shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 mt-2" align="start">
        {open && (
          <>
            <Input
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b-[1px] rounded-none rounded-t-lg"
            />
            {renderedCities}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default HeaderCityChooser;
