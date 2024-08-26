import { useQuickOrder } from '@/context/QuickOrderContext';
import { cn } from '@/lib/utils';
import { addToCart, removeFromCart } from '@/store/slices/cart';
import { Product } from '@/types';
import { DeleteIcon, ShoppingCart } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  iconSize?: number;
  product: Product;
  isInCart: boolean;
  quantity?: number;
  selected?: boolean;
}

const BuyButton: React.FC<Props> = ({
  size = 'default',
  variant = 'default',
  className,
  iconSize = 18,
  product,
  isInCart,
  quantity = 1,
  selected = true,
  ...rest
}) => {
  const { openSheet } = useQuickOrder();

  const dispatch = useDispatch();

  const handleClick = (product: Product) => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast.success(`"${product.title}" was removed from cart.`);
    } else {
      dispatch(addToCart({ ...product, quantity, selected }));
      openSheet(product);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'text-md flex flex-nowrap gap-2',
        isInCart ? 'bg-orange-500 hover:bg-orange-400' : 'text-primary-foreground',
        className,
      )}
      {...rest}
      onClick={() => handleClick(product)}
    >
      {isInCart ? <DeleteIcon size={iconSize} /> : <ShoppingCart size={iconSize} />}
      {size !== 'icon' && <p>{isInCart ? 'Remove' : 'Buy'}</p>}
    </Button>
  );
};

export default BuyButton;
