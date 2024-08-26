import { cn } from '@/lib/utils';
import { selectCartCount } from '@/store/slices/cart';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props extends ComponentPropsWithoutRef<'div'> {
  icon: ReactNode;
  link: string;
}

const BottomMenuItemCart: React.FC<Props> = ({ icon, link, children }) => {
  const haveItems = useSelector(selectCartCount);

  return (
    <Link
      to={link}
      className={cn(
        'flex flex-col justify-center items-center flex-1 cursor-pointer hover:text-primary duration-300 transition-colors ease-linear',
        {
          relative: haveItems,
        },
      )}
    >
      {icon}
      <span className="text-xs">{children}</span>
      <span
        className={cn('hidden', {
          'block absolute top-0 translate-x-3 size-2 bg-orange-500 rounded-full': haveItems,
        })}
      />
    </Link>
  );
};

export default React.memo(BottomMenuItemCart);
