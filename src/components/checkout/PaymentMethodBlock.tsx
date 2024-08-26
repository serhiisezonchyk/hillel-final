import { PAYMENT_METHODS } from '@/consts';
import { cn } from '@/lib/utils';
import { CheckoutSteps, editStep, selectPaymentMethod, selectStep, setPaymentMehod } from '@/store/slices/checkout';
import { Payment } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const PaymentMethodBlock = () => {
  const dispatch = useDispatch();
  const step = useSelector(selectStep);
  const paymentMethod = useSelector(selectPaymentMethod);
  if (step !== CheckoutSteps.PAYMENT_METHOD)
    return (
      <div className={cn('bg-card rounded-md p-4 space-y-2')}>
        <h2 className="text-xl font-semibold leading-relaxed">3. Method of payment</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between px-2 sm:items-center">
          <div>{PAYMENT_METHODS.find((el) => el.value === paymentMethod)?.label}</div>
          <Button
            className="w-full mb-2 sm:mb-0 sm:w-auto"
            variant={'outline'}
            onClick={() => dispatch(editStep(CheckoutSteps.PAYMENT_METHOD))}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  return (
    <div className="bg-card rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold leading-relaxed">3. Method of payment</h2>

      <RadioGroup
        onValueChange={(e: Payment) => dispatch(setPaymentMehod(e))}
        defaultValue={paymentMethod}
        className="flex flex-col space-y-1"
      >
        {PAYMENT_METHODS.map((el) => (
          <div key={el.value} className="flex items-center gap-2 space-y-0 border-border border-2 px-2">
            <RadioGroupItem value={el.value} id={el.value} />
            <Label
              htmlFor={el.value}
              className="font-normal w-full py-4 cursor-pointer flex gap-2 items-center justify-between sm:justify-start mr-2"
            >
              {el.label} <img src={el.icon} alt={`${el.value}-icon`} />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodBlock;
