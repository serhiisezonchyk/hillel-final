import { cn } from '@/lib/utils';
import { Product } from '@/types';
import React from 'react';
import ProductCard, { ProductCardSkeleton } from './ProductCard';

interface Props {
  data: Product[] | undefined;
  isLoading: boolean;
  className?: string;
}

const ProductsList: React.FC<Props> = ({ data, isLoading, className }) => {
  if (isLoading) return <ProductListSkeleton className={className} />;
  if (data?.length === 0) return <p className="text-center text-muted-foreground">Products not found.</p>;
  return (
    <div
      className={cn(
        'w-full grid gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] justify-items-center',
        className,
      )}
    >
      {data?.map((el) => <ProductCard key={el.id} item={el} />)}
    </div>
  );
};

export default ProductsList;

const ProductListSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('w-full grid gap-2 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]', className)}>
    {Array(4)
      .fill(null)
      .map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
  </div>
);
