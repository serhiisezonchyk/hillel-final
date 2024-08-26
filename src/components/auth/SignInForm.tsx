import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signInSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });
  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.error(values);
  }
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
        <Button type="submit" className="w-full md:w-[400px]">
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
