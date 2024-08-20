import { Outlet } from 'react-router-dom';

type Props = {};

const BreadcrumbLayout = (props: Props) => {
  return (
    <>
      <div>breadcrumb</div>
      <Outlet />
    </>
  );
};

export default BreadcrumbLayout;
