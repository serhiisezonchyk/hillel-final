import { cn } from '@/lib/utils';
import { selectCartCount } from '@/store/slices/cart';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
interface Props {
  className?: string;
}
const CartLink: React.FC<Props> = ({ className }) => {
  const quantity = useSelector(selectCartCount);
  return (
    <Button asChild size={'icon'} variant="secondary" className={cn('relative', className)}>
      <Link to="/cart">
        <ShoppingCart />
        <span
          className={cn('hidden', {
            'absolute -top-2 -right-2 bg-orange-500 text-white size-5 rounded-full flex items-center justify-center text-xs':
              quantity > 0,
          })}
        >
          {quantity}
        </span>
      </Link>
    </Button>
  );
};

export default CartLink;
