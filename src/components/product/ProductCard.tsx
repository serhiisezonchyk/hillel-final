import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RootState } from '@/store';
import { selectIsInCart } from '@/store/slices/cart';
import { Product } from '@/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BuyButton from '../shared/BuyButton';
import RatingStars from '../shared/RaitingStars';

interface Props {
  item: Product;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  const isInCart = useSelector((state: RootState) => selectIsInCart(state, item.id));
  return (
    <Card className="group hover:shadow-md w-full md:max-w-56 md:min-w-52 transition-shadow duration-300 ease-in-out">
      <div className="aspect-square w-full max-h-36 overflow-hidden rounded-t-lg p-2">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="object-contain w-full h-full  transition-transform duration-300 ease-in-out md:group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 block">
        <Link to={`/${item.category}/${item.id}`} className="text-lg  line-clamp-2 hover:underline min-h-14">
          {item.title}
        </Link>
        <RatingStars size="small" rate={item.rating.rate} count={item.rating.count} />
        <p className="text-sm leading-relaxed line-clamp-3 text-muted-foreground mt-2 min-h-[68.250px]">
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-2xl font-semibold">${item.price}</p>
          <BuyButton size="icon" product={item} isInCart={isInCart} />
        </div>
      </CardContent>
    </Card>
  );
};
export const ProductCardSkeleton = () => {
  return <Skeleton className="h-96" />;
};
export default ProductCard;
