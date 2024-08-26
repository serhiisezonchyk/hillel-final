import { cn } from '@/lib/utils';
import { CartProduct } from '@/types';
import React from 'react';
import CartItem from './CartItem';
interface Props {
  data: CartProduct[];
  className?: string;
}
const CartProductList: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('grid gap-4', className)}>
      {data.map((el) => (
        <CartItem key={el.id} item={el} />
      ))}
    </div>
  );
};

export default CartProductList;
