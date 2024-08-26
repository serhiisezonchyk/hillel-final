import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  value: number;
  setValue: (value: number) => void;
  max?: number;
  className?: string;
}
const QuantityInput: React.FC<Props> = ({ value, setValue, max = Infinity, className }) => {
  const handleMinusClick = () => {
    if (value > 0) setValue(value - 1);
  };
  const handlePlusClick = () => {
    if (value < max) setValue(value + 1);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;
    if (!isNaN(newValue) && newValue <= max) {
      setValue(newValue);
    }
  };
  return (
    <div className={cn('inline-flex w-20', className)}>
      <Button variant={'outline'} className="w-6 p-2 border-r-0 rounded-r-none" onClick={handleMinusClick}>
        -
      </Button>
      <Input
        className="mx-0 flex-1 p-2 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={handleChange}
      />
      <Button variant={'outline'} className="w-6 p-2 border-l-0 rounded-l-none" onClick={handlePlusClick}>
        +
      </Button>
    </div>
  );
};

export default QuantityInput;
