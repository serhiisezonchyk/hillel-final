import { Button } from '@/components/ui/button';
import { DEFAULT_DELIVERY_PRICE, DEFAULT_LIFTING_PRICE } from '@/consts';
import { checkFreeDelivery, cn } from '@/lib/utils';
import { selectItems } from '@/store/slices/checkout';
import React from 'react';
import { useSelector } from 'react-redux';
interface Props {
  className?: string;
}
const CreateOrder: React.FC<Props> = ({ className }) => {
  
  const items = useSelector(selectItems);
  const isFreeDelivery = checkFreeDelivery(items.finalPrice);

  // Calculate delivery and lifting costs
  const deliveryCost = isFreeDelivery ? 0 : DEFAULT_DELIVERY_PRICE;
  const liftingCost = isFreeDelivery ? 0 : DEFAULT_LIFTING_PRICE;

  // Calculate the total due amount
  const totalDue = items.finalPrice + deliveryCost + liftingCost;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="w-full leading-relaxed">
        <h2 className="text-3xl my-4">Total</h2>
        <div className="w-full flex justify-between items-center">
          <p className="font-light">{items.countToOrder} products</p>
          <span className="font-semibold text-lg">${items.finalPrice.toFixed(2)}</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="font-light">Delivery</p>
          <p className="font-semibold text-lg">
            {isFreeDelivery ? <span className="text-primary">Free</span> : `$ ${DEFAULT_DELIVERY_PRICE}`}
          </p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="font-light">Cost of lifting</p>
          <span className="font-semibold text-lg">
            {isFreeDelivery ? <span className="text-primary">Free</span> : `$ ${DEFAULT_LIFTING_PRICE}`}
          </span>
        </div>
        <div className="w-full flex justify-between my-6 pt-4 border-t-border border-t-2 items-center">
          <p className="font-medium text-xl">Due:</p>
          <span className="font-semibold text-2xl">${totalDue.toFixed(2)}</span>
        </div>
      </div>
      <Button className="w-full mt-8 lg:mt-0 lg:h-14">Checkout</Button>
    </div>
  );
};

export default CreateOrder;
