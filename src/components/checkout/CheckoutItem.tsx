import { CartProduct } from '@/types';
import React from 'react';

interface Props {
  item: CartProduct;
}
const CheckoutItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="p-2 sm:p-6 flex flex-nowrap gap-4 flex-row">
      <img src={item.image} alt={item.title} className="object-contain size-24" />
      <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
        <div className="flex-1 leading-relaxed space-y-4">
          <p className="text-sm sm:pl-3 hover:underline">{item.title}</p>
          <p className="text-xs sm:pl-3 text-muted-foreground">Code: {item.id}</p>
        </div>

        <div className="flex flex-nowrap flex-row sm:min-w-48 justify-between items-center">
          <p>{item.quantity} pc.</p>

          <p className="text-xl font-semibold">
            <span className="text-sm mr-2">$</span>
            {item.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
