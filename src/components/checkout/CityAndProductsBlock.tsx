import { CheckoutSteps, editStep, nextStep, selectStep } from '@/store/slices/checkout';
import { CartProduct } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import CheckoutProductList from './CheckoutProductList';
import CitySelect from './CitySelect';

interface Props {
  dataToOrder: CartProduct[];
}
const CityAndProductsBlock: React.FC<Props> = ({ dataToOrder }) => {
  const dispatch = useDispatch();
  const step = useSelector(selectStep);

  if (step !== CheckoutSteps.REVIEW_ORDER)
    return (
      <div className="bg-card rounded-md space-y-2">
        <h2 className="text-xl font-semibold leading-relaxed px-4">Your order:</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between px-2 sm:items-center">
          <ul className="flex gap-2 flex-1 flex-row flex-nowrap overflow-y-auto justify-start">
            {dataToOrder.map((el) => (
              <li className="p-2 shrink-0 w-16" key={el.id}>
                <img className="size-14" src={el.image} alt={el.title} />
              </li>
            ))}
          </ul>
          <Button
            className="w-full mb-2 sm:mb-0 sm:w-auto"
            variant={'outline'}
            onClick={() => dispatch(editStep(CheckoutSteps.REVIEW_ORDER))}
          >
            Edit
          </Button>
        </div>
      </div>
    );

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold leading-relaxed px-4">Your order:</h2>
      <div className="bg-card p-4 rounded-md">
        <CitySelect />
      </div>
      <div className="bg-card rounded-md">
        <CheckoutProductList className="p-2" data={dataToOrder} />
        <div className="w-full grid px-2 py-4 ">
          <Button onClick={() => dispatch(nextStep())} className=" place-self-center w-full sm:w-40">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CityAndProductsBlock;
