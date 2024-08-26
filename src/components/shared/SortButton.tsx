import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface Props {
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

const SortButton: React.FC<Props> = ({ sortOrder, onSortChange }) => {
  return (
    <Button variant="ghost" onClick={onSortChange} className="font-light text-xs sm:text-sm">
      {sortOrder === 'asc' ? (
        <ArrowDown className="mr-1 size-4 sm:size-5" />
      ) : (
        <ArrowUp className="mr-1 size-4 sm:size-5" />
      )}
      Sort({sortOrder})
    </Button>
  );
};

export default SortButton;
