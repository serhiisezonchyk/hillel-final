import QuickOrderSheetBody from '@/components/shared/QuickOrderSheetBody';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CartProduct } from '@/types';
import { createContext, useContext, useState } from 'react';

interface QuickOrderContextType {
  openSheet: (product: CartProduct) => void;
  closeSheet: () => void;
  isOpen: boolean;
}
export const QuickOrderContext = createContext<QuickOrderContextType>({
  openSheet: () => {},
  closeSheet: () => {},
  isOpen: false,
});

export const QuickOrderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CartProduct | null>(null);

  const openSheet = (product: CartProduct) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeSheet = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };
  return (
    <QuickOrderContext.Provider value={{ openSheet, closeSheet, isOpen }}>
      {children}
      <Sheet open={isOpen} onOpenChange={closeSheet}>
        <SheetContent className="w-full sm:max-w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
          <SheetHeader className="mb-6">
            <SheetTitle>The product has been added to the cart</SheetTitle>
          </SheetHeader>
          {selectedProduct && <QuickOrderSheetBody item={selectedProduct} handleClose={closeSheet} />}
        </SheetContent>
      </Sheet>
    </QuickOrderContext.Provider>
  );
};

export const useQuickOrder = () => useContext(QuickOrderContext);
