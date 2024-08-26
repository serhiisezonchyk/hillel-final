import SignInForm from '@/components/auth/SignInForm';
import HelmetMetadata from '@/components/shared/HelmetMetadata';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className="h-full">
      <HelmetMetadata title="Sign in | Comfy" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[_50fr_100fr] lg:px-10 items-center ">
          <div className="h-full bg-primary border-t-2 border-primary px-8 py-14 hidden lg:block">
            <img src="/log-ll_4.svg" />
          </div>
          <div className="py-24 lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
                <p className="text-sm text-muted-foreground">Enter your email and password to access your account</p>
              </div>
              <SignInForm />
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
