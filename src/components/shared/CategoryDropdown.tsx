import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { capitalize, cn } from '@/lib/utils';
import { useGetCategoriesQuery } from '@/store/api/productApi';
import { ArrowRightIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface Props {
  className?: string;
  children: ReactNode;
}

const CategoryDropdown: React.FC<Props> = ({ children, className }) => {
  const { data } = useGetCategoriesQuery();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-52 bg-primary-dark text-background px-2 items-center font-light flex justify-between cursor-pointer md:transition-colors md:hover:bg-primary-dark/90 md:ease-in',
          className,
        )}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {data?.map((el) => (
          <DropdownMenuItem asChild key={el} className="cursor-pointer">
            <Link to={`/${el}`} className="flex justify-between">
              <p>{capitalize(el)}</p>
              <ArrowRightIcon />
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
