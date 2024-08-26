import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  availableCount: number;
}
enum Statuses {
  OUT_OF_STOCK = 'Out of stock',
  SMALL_COUNT = 'Few goods left',
  AVAILABLE = 'Available',
}
const checkStatus = (availableStatus: number): Statuses => {
  switch (true) {
    case availableStatus < 1:
      return Statuses.OUT_OF_STOCK;
    case availableStatus < 5:
      return Statuses.SMALL_COUNT;
    case availableStatus >= 5:
      return Statuses.AVAILABLE;
    default:
      return Statuses.AVAILABLE;
  }
};
const AvailableString: React.FC<Props> = ({ availableCount }) => {
  const status = checkStatus(availableCount);
  return (
    <p
      className={cn('text-sm', {
        'text-gray-500': status === Statuses.OUT_OF_STOCK,
        'text-orange-500': status === Statuses.SMALL_COUNT,
        'text-green-500': status === Statuses.AVAILABLE,
      })}
    >
      {status} ({availableCount})
    </p>
  );
};

export default AvailableString;
