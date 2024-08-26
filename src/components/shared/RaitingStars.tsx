import { StarIcon } from 'lucide-react';
import React from 'react';

interface Props {
  rate: number;
  count: number;
  size?: 'small' | 'large';
}

const RatingStars: React.FC<Props> = ({ rate, count, size = 'large' }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  const sizeClass = size === 'large' ? 'size-6' : 'size-4';

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, idx) => (
          <StarIcon key={`full-${idx}`} className={`${sizeClass} fill-yellow-300 stroke-none`} />
        ))}
        {halfStar && <StarIcon key="half-star" className={`${sizeClass} fill-yellow-300 stroke-none`} />}
        {[...Array(emptyStars)].map((_, idx) => (
          <StarIcon key={`empty-${idx}`} className={`${sizeClass} fill-muted stroke-none`} />
        ))}
      </div>
      <div className="text-sm text-muted-foreground">({count})</div>
    </div>
  );
};

export default RatingStars;
