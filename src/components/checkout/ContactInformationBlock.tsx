import { cn } from '@/lib/utils';
import { CheckoutSteps, editStep, nextStep, selectStep, selectUserInfo, setUserInfo } from '@/store/slices/checkout';
import { userInfoSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from '@mona-health/react-input-mask';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
const ContactInformationBlock = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const step = useSelector(selectStep);
  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: userInfo,
  });
  function onSubmit(values: z.infer<typeof userInfoSchema>) {
    dispatch(setUserInfo(values));
    dispatch(nextStep());
  }
  if (step !== CheckoutSteps.USER_INFO)
    return (
      <div
        className={cn('bg-card rounded-md p-4 space-y-2', {
          'border-red-500 border-[1px]': !form.formState.isValid,
        })}
      >
        <h2 className="text-xl font-semibold leading-relaxed">1. Contact information</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between px-2 sm:items-center">
          <div className="text-muted-foreground">
            <p>{form.getValues('name')}</p>
            <p>{form.getValues('email')}</p>
            <p>{form.getValues('phone')}</p>
          </div>
          <Button
            className="w-full mb-2 sm:mb-0 sm:w-auto"
            variant={'outline'}
            onClick={() => dispatch(editStep(CheckoutSteps.USER_INFO))}
          >
            Edit
          </Button>
        </div>
      </div>
    );

  return (
    <div className="bg-card rounded-md p-4 space-y-2">
      <h2 className="text-xl font-semibold leading-relaxed">1. Contact information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <div className="flex flex-wrap sm:gap-4 gap-10 mb-10">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative w-full md:w-72">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <InputMask mask="+380 99 999 99 99" maskPlaceholder=" " {...field}>
                      <Input placeholder="+380" />
                    </InputMask>
                  </FormControl>
                  <FormMessage className="absolute top-16 " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative w-full md:w-72">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-16 " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative w-full md:w-72">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage className="absolute top-16 " />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full sm:w-40 justify-self-center" type="submit">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactInformationBlock;
