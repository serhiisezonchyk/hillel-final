import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { clearOrderedData } from '@/store/slices/cart';
import { CheckoutStatus, selectItems, selectPrices, selectStatus, submitOrder } from '@/store/slices/checkout';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AlertAction from '../shared/AlertAction';
interface Props {
  className?: string;
}
const CreateOrder: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const items = useSelector(selectItems);
  const prices = useSelector(selectPrices);
  const handleClick = () => {
    dispatch(submitOrder());
    toast.success('Order submitted successfully! Please wait while we process your phone order.');
    dispatch(clearOrderedData(items.itemsToOrder.map((el) => el.id)));
    navigate('/');
  };
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="w-full leading-relaxed">
        <h2 className="text-3xl my-4">Total</h2>
        <div>
          <div className="w-full flex justify-between items-center ">
            <p className="tracking-wider">Count of products: </p>
            <p className="font-semibold ">{items.countToOrder} pcs.</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="tracking-wider">Unique products: </p>
            <p className="font-semibold ">{items.uniqueCount} pcs.</p>
          </div>
        </div>
        <div className="py-4 my-4 border-y-2 border-border">
          <div className="w-full flex justify-between items-center">
            <p className="font-light tracking-wider">Price</p>
            <p className="font-semibold text-lg">$ {prices.totalPrice}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="font-light tracking-wider">Discount</p>
            <p className="font-semibold text-lg"> {prices.totalDiscount === 0 ? 0 : `-$ ${prices.totalDiscount}`}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="font-light tracking-wider">Delivery</p>
            <p className="font-semibold text-lg">
              {prices.deliveryCosts.deliveryPrice === 0 ? (
                <span className="text-green-500">Free</span>
              ) : (
                `$ ${prices.deliveryCosts.deliveryPrice}`
              )}
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="font-light tracking-wider">Lifting</p>
            <p className="font-semibold text-lg">
              {prices.deliveryCosts.liftingPrice === 0 ? (
                <span className="text-green-500">Free</span>
              ) : (
                `$ ${prices.deliveryCosts.liftingPrice}`
              )}
            </p>
          </div>
        </div>

        <div className="w-full flex justify-between my-6 pt-4 items-center">
          <p className="font-medium text-xl tracking-wider">Due:</p>
          <span className="font-semibold text-2xl">$ {prices.priceWithShipping}</span>
        </div>
      </div>
      <AlertAction
        title="Click 'Continue' to submit order"
        onSubmit={handleClick}
        description="Ensure all the details are correct before proceeding. Review your information, delivery method, and payment options to confirm everything is accurate. Once you’re ready, click 'Continue' to finalize your order."
      >
        <Button className="w-full mt-8 lg:mt-0 lg:h-14" disabled={status !== CheckoutStatus.READY_TO_ORDER}>
          Checkout
        </Button>
      </AlertAction>
    </div>
  );
};

export default CreateOrder;
