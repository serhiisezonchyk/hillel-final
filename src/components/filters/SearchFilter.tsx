import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchFilter: React.FC<Props> = ({ className, value, onChange }) => {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor="name" className="tracking-tight text-lg font-bold">
        Name
      </Label>
      <Input id="name" placeholder="Name..." value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default SearchFilter;
