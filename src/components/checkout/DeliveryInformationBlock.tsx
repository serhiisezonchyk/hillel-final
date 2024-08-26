import { cn } from '@/lib/utils';
import {
  CheckoutSteps,
  editStep,
  nextStep,
  selectDelivery,
  selectStep,
  setDeliveryInfo,
} from '@/store/slices/checkout';
import { DeliveryMethod } from '@/types';
import { deliverySchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryMethodPreview from '../shared/DeliveryMethodPreview';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import NPWarehoseSelect from './NPWarehoseSelect';

const DeliveryInformationBlock = () => {
  const dispatch = useDispatch();
  const delivery = useSelector(selectDelivery);
  const step = useSelector(selectStep);

  const form = useForm<DeliveryMethod>({
    resolver: zodResolver(deliverySchema),
    defaultValues: delivery,
  });

  const deliveryMethod = form.watch('deliveryMethod');
  const onSubmit = (values: DeliveryMethod) => {
  dispatch(setDeliveryInfo(values));
    dispatch(nextStep());
  };

  if (step !== CheckoutSteps.DELIVERY_METHOD)
    return (
      <div
        className={cn('bg-card rounded-md p-4 space-y-2', {
          'border-red-500 border-[1px]': !form.formState.isValid,
        })}
      >
        <h2 className="text-xl font-semibold leading-relaxed">2. Method of delivery</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between px-2 sm:items-center">
          <DeliveryMethodPreview delivery={delivery} />
          <Button
            className="w-full mb-2 sm:mb-0 sm:w-auto"
            variant={'outline'}
            onClick={() => dispatch(editStep(CheckoutSteps.DELIVERY_METHOD))}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  return (
    <div className="bg-card rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold leading-relaxed">2. Method of delivery</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <FormField
            control={form.control}
            name={'deliveryMethod'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-4">
                    <FormItem
                      className={cn('flex items-center gap-2 space-y-0 border-border border-2 ', {
                        'border-primary': deliveryMethod === 'pickup',
                      })}
                    >
                      <FormControl className="mx-2">
                        <RadioGroupItem value="pickup" />
                      </FormControl>
                      <FormLabel className="font-normal w-full py-4 cursor-pointer flex gap-2 items-center justify-between sm:justify-start mr-2">
                        Pickup <img src="./CF_3.svg" alt="Pickup icon" />
                      </FormLabel>
                    </FormItem>
                    <FormItem
                      className={cn('flex items-center gap-2 space-y-0 border-border border-2 ', {
                        'border-primary': deliveryMethod === 'novapost',
                      })}
                    >
                      <FormControl className="mx-2">
                        <RadioGroupItem value="novapost" />
                      </FormControl>
                      <FormLabel className="font-normal w-full py-4 cursor-pointer flex gap-2 items-center justify-between sm:justify-start mr-2">
                        Nova Post <img src="./NP_3.svg" alt="Novapost icon" className="size-5" />
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {deliveryMethod === 'novapost' && (
            <div className="space-y-4 mt-2">
              <FormField
                control={form.control}
                name="deliveryInfo.warehouse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Warehouse" {...field} /> */}
                      <NPWarehoseSelect
                        value={field.value?.ref ? { value: field.value.ref, label: field.value.name } : null}
                        onChange={(e) => field.onChange({ ref: e?.value, name: e?.label })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryInfo.name"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryInfo.lastName"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryInfo.patronymic"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patronymic</FormLabel>
                    <FormControl>
                      <Input placeholder="Patronimyc..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <Button className="w-full sm:w-40 justify-self-center" type="submit">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DeliveryInformationBlock;
