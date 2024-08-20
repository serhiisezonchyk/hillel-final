import { Outlet } from 'react-router-dom';
import CheckOutPageHeader from '../header/CheckOutPageHeader';

type Props = {};

const CheckOutPageLayout = (props: Props) => {
  return (
    <>
      <CheckOutPageHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default CheckOutPageLayout;
