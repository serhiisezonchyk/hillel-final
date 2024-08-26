import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { removeFromCart, updateProduct } from '@/store/slices/cart';
import { CartProduct } from '@/types';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import QuantityInput from '../shared/QuantityInput';

interface Props {
  item: CartProduct;
}
const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [selected, setSelected] = useState(item.selected);
  const link = `/${item.category}/${item.id}`;

  const handleDeleteItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    dispatch(updateProduct({ id: item.id, selected, quantity }));
  }, [selected, quantity, dispatch, item.id]);
  return (
    <div className="bg-card p-6 flex flex-wrap gap-4 flex-col sm:flex-row ">
      <div className="flex-1 flex gap-4 flex-row items-center relative">
        <Link to={link}>
          <img src={item.image} alt={item.title} className="object-contain size-24" />
        </Link>
        <div className="flex-1 leading-relaxed space-y-4">
          <Link to={link} className="text-sm sm:pl-3 hover:underline">
            {item.title}
          </Link>
          <p className="text-xs sm:pl-3 text-muted-foreground">Code: {item.id}</p>
          <Button
            variant={'ghost'}
            size={'sm'}
            className="font-light float-end sm:float-start"
            onClick={() => handleDeleteItem(item.id)}
          >
            <Trash2 className="mr-2" />
            Delete
          </Button>
        </div>
        <Checkbox
          checked={selected}
          onCheckedChange={() => setSelected((prev) => !prev)}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2"
        />
      </div>

      <div className="text-end flex flex-row justify-between items-center sm:items-end sm:justify-start sm:flex-col gap-4 ">
        <p className="text-xl font-semibold">
          <span className="text-sm mr-2">$</span>
          {item.price}
        </p>

        <QuantityInput value={quantity} setValue={setQuantity} />
      </div>
    </div>
  );
};
export default CartItem;
