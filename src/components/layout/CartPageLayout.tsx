import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../footer/Footer';
import CartPageHeader from '../header/CartPageHeader';

const CartPageLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <CartPageHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CartPageLayout;
