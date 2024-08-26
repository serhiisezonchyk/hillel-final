import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';
import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
  className?: string;
}

const FilterSheet: React.FC<Props> = ({ children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className={cn('font-light text-xs sm:text-sm', className)}>
          <Filter className="mr-1 size-4 sm:size-5" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-3/4">
        <SheetHeader className="mb-2">
          <SheetTitle>Choose filters</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
