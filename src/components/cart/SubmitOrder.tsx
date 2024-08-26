import { Button } from '@/components/ui/button';
import { STORAGE_KEYS } from '@/consts';
import { StorageService } from '@/lib/StorageService';
import { cn } from '@/lib/utils';
import { RootState } from '@/store';
import { CartProduct, Order, RedirectedCart } from '@/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
}
const orderService = new StorageService<RedirectedCart>(STORAGE_KEYS.order.type, STORAGE_KEYS.order.key);

const SubmitOrder: React.FC<Props> = ({ className }) => {

  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className={cn('flex flex-col-reverse lg:flex-col', className)}>
      <Button
        className="w-full mt-8 lg:mt-0 lg:h-14"
        disabled={cart.countToOrder < 1}
        onClick={() => {
          orderService.setItems({
            totalPrice: cart.totalPrice,
            totalDiscount: cart.totalDiscount,
            finalPrice: cart.finalPrice,
            uniqueCount: cart.items.length,
            countToOrder: cart.countToOrder,
            itemsToOrder: cart.itemsToOrder,
          });
          navigate('/checkout');
        }}
      >
        Go to checkout
      </Button>
      <div className="lg:mt-6 w-full leading-relaxed">
        <div className="w-full flex justify-between items-center">
          <p className="font-light">{cart.countToOrder} products</p>
          <span className="font-semibold text-lg">$ {cart.totalPrice.toFixed(2)}</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="font-light">Discount</p>
          <span className="font-semibold text-lg">$ {cart.totalDiscount.toFixed(2)}</span>
        </div>
        <div className="w-full flex justify-between mt-6 items-center">
          <p className="font-medium">Total</p>
          <span className="font-semibold text-2xl">$ {cart.finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SubmitOrder;
