import { Outlet } from 'react-router-dom';
import CartPageHeader from '../header/CartPageHeader';

type Props = {};

const CartPageLayout = (props: Props) => {
  return (
    <>
      <CartPageHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default CartPageLayout;
