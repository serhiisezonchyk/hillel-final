import React, { ComponentPropsWithoutRef } from 'react';
import BottomMenuItem from './BottomMenuItem';
import BottomMenuItemCart from './BottomMenuItemCart';

const BottomMenuComponent: React.FC<ComponentPropsWithoutRef<'div'>> = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex border-t-[1px] py-2 md:hidden bg-background text-foreground">
      {children}
    </div>
  );
};

const BottomMenu = Object.assign(BottomMenuComponent, {
  Item: BottomMenuItem,
  ItemCart: BottomMenuItemCart,
});
export default BottomMenu;
