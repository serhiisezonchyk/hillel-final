import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="flex flex-col gap-6 items-center lg:flex-row mb-32">
      <div className="space-y-6 text-center lg:text-start">
        <h2 className="text-2xl font-semibold leading-relaxed">The basket is empty</h2>
        <p className="leading-relaxed font-light">
          Go to the main page and use the search or the catalog to find everything you need.
        </p>
        <Button asChild className="font-light">
          <Link to={'/'}>Go to the main page</Link>
        </Button>
      </div>
      <div>
        <img src="/empty-page.png" className="max-h-52" />
      </div>
    </div>
  );
};

export default CartEmpty;
