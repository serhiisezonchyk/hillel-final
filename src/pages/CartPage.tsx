import { CartEmpty, CartProductList } from '@/components/cart';
import SubmitOrder from '@/components/cart/SubmitOrder';
import AlertAction from '@/components/shared/AlertAction';
import HelmetMetadata from '@/components/shared/HelmetMetadata';
import { Button } from '@/components/ui/button';
import { removeAllFromCart, selectCartItems } from '@/store/slices/cart';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const handleDeleteAll = () => {
    dispatch(removeAllFromCart());
  };
  return (
    <div className="bg-muted">
      <HelmetMetadata title="Cart | Comfy" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center">
          <div className="flex gap-4 mt-2 mb-6">
            <Button size={'icon'} variant={'ghost'} asChild className="hover:bg-muted-foreground/10 rounded-full">
              <Link to="/">
                <ChevronLeft />
              </Link>
            </Button>
            <h1 className="text-2xl text-foreground self-center">
              Cart <span className="text-muted-foreground text-xl ml-4">{cartItems.length} goods</span>
            </h1>
          </div>
          {cartItems.length > 0 ? (
            <div className="grid gap-9 mb-9 grid-cols-1 lg:grid-cols-[_100fr_58fr]">
              <div className="flex flex-col gap-2">
                <div className="bg-card p-4">
                  <AlertAction
                    onSubmit={handleDeleteAll}
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete all items from your cart."
                  >
                    <Button variant={'ghost'}>
                      <Trash2 className="mr-2" /> Delete all
                    </Button>
                  </AlertAction>
                </div>
                <CartProductList data={cartItems} />
              </div>
              <SubmitOrder className="bg-card p-4 h-fit" />
            </div>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
