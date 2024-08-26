import { Outlet, ScrollRestoration } from 'react-router-dom';
import CheckoutPageFooter from '../footer/CheckoutPageFooter';
import CheckOutPageHeader from '../header/CheckOutPageHeader';

const CheckOutPageLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <CheckOutPageHeader />
      <main>
        <Outlet />
      </main>
      <CheckoutPageFooter />
    </>
  );
};

export default CheckOutPageLayout;
