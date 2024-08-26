import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumb from '../shared/Breadcrumb';

const BreadcrumbLayout = () => {
  const location = useLocation();
  const pathnames = useMemo(
    () =>
      location.pathname
        .split('/')
        .filter((x) => x)
        .map((el) => decodeURIComponent(el)),
    [location.pathname],
  );
  return (
    <>
      <div className="container my-2">
        <Breadcrumb pathnames={pathnames} />
      </div>
      <Outlet />
    </>
  );
};

export default BreadcrumbLayout;
