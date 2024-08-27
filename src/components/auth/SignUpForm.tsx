import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AppDispatch, RootState } from '@/store';
import { signUp } from '@/store/services/auth';
import { selectIsAuth } from '@/store/slices/auth';
import { signUpSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const SignUpForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { status, error } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await dispatch(signUp(values));
  };
  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success('Register succeed');
    } else if (status === 'error') toast.error(error);
  }, [status]);
  if (isAuth) return <Navigate to="/" />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full md:w-[400px]">
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input
                  placeholder="Login..."
                  autoComplete="email"
                  {...field}
                  className={cn({
                    'animate-shake': form.formState.errors[field.name],
                  })}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6 font-light text-center w-full text-sm text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password..."
                  autoComplete="current-password"
                  type="password"
                  {...field}
                  className={cn({
                    'animate-shake': form.formState.errors[field.name],
                  })}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6 font-light text-center w-full text-sm text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Repeat the password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password..."
                  autoComplete="current-password"
                  type="password"
                  {...field}
                  className={cn({
                    'animate-shake': form.formState.errors[field.name],
                  })}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6 font-light text-center w-full text-sm text-destructive" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-[400px]">
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
