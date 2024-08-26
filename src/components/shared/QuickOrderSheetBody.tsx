import { STORAGE_KEYS } from '@/consts';
import { StorageService } from '@/lib/StorageService';
import { updateProduct } from '@/store/slices/cart';
import { Product, RedirectedCart } from '@/types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import QuantityInput from './QuantityInput';

interface Props {
  handleClose: () => void;
  item: Product;
}
const orderService = new StorageService<RedirectedCart>(STORAGE_KEYS.order.type, STORAGE_KEYS.order.key);

const QuickOrderSheetBody: React.FC<Props> = ({ item, handleClose }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const link = `/${item.category}/${item.id}`;
  const totalDiscount = (item.discount ?? 0) * quantity;
  const price = item.price * quantity - totalDiscount;

  useEffect(() => {
    dispatch(updateProduct({ id: item.id, quantity }));
    if (quantity === 0) handleClose();
  }, [quantity, dispatch, handleClose, item.id]);

  const handleOrderClick = () => {
    orderService.setItems({
      totalPrice: item.price * quantity,
      totalDiscount: totalDiscount,
      finalPrice: price,
      uniqueCount: 1,
      countToOrder: quantity,
      itemsToOrder: [{ ...item, quantity, selected: true }],
    });
    window.location.href = '/checkout';
  };

  return (
    <div className="grid gap-6">
      {/* Item  */}
      <div className="flex flex-row gap-6">
        <div className="">
          <a href={link} target="_blank">
            <img src={item.image} className="max-h-16 sm:max-h-32 w-full" alt={item.title} />
          </a>
        </div>
        <div className="flex-1 space-y-2">
          <a href={link} target="_blank" className="hover:underline">
            <h2 className="leading-relaxed font-light text-sm sm:text-base">{item.title}</h2>
          </a>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">Code: {item.id}</p>
        </div>
        <div className="text-end space-y-4">
          <p className="font-semibold">$ {price.toFixed(2)}</p>
          <QuantityInput value={quantity} setValue={setQuantity} />
        </div>
      </div>

      {/* Actions  */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant={'outline'} onClick={handleClose} className="font-light">
          Back to shopping
        </Button>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button variant={'default'} asChild className="font-light">
            <a href="/cart">Go to cart</a>
          </Button>
          <Button variant="secondary" className="font-light" onClick={handleOrderClick}>
            Go to ordering
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderSheetBody;
