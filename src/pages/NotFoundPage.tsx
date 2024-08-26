import HelmetMetadata from '@/components/shared/HelmetMetadata';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-2">
      <HelmetMetadata title="Not found | Comfy" />
      <div className="container ">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl text-foreground">Page not found!</h1>
          <p className="text-muted-foreground">This page doesn`t exist.</p>
          <div className="relative">
            <img src="/404.jpg" alt="Page not found" className="w-[400px] h-auto"></img>
            <Button className="absolute bottom-32 right-32 w-[150px] text-white" onClick={() => navigate('/')}>
              Home...
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
