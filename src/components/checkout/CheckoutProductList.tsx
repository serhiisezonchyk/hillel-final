import { cn } from '@/lib/utils';
import { CartProduct } from '@/types';
import CheckoutItem from './CheckoutItem';
interface Props {
  data: CartProduct[];
  className?: string;
}
const CheckoutProductList: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cn('grid gap-4 divide-y-[1px] divide-muted', className)}>
      {data.map((el) => (
        <CheckoutItem key={el.id} item={el} />
      ))}
    </div>
  );
};

export default CheckoutProductList;
