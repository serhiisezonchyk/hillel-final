import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="grid h-[600px]">
      <Loader2 className="size-8 animate-spin place-self-center" />
    </div>
  );
};

export default LoadingPage;
