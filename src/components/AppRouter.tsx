import CartPage from '@/pages/CartPage';
import CataloguePage from '@/pages/CataloguePage';
import CategoryPage from '@/pages/CategoryPage';
import CheckOutPage from '@/pages/CheckOutPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SingleItemPage from '@/pages/SingleItemPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import BreadcrumbLayout from './layout/BreadcrumbLayout';
import CartPageLayout from './layout/CartPageLayout';
import CheckOutPageLayout from './layout/CheckOutPageLayout';
import Layout from './layout/Layout';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <CataloguePage />,
        },
        {
          element: <BreadcrumbLayout />,
          children: [
            {
              path: ':category',
              element: <CategoryPage />,
            },
            {
              path: ':category/:itemId',
              element: <SingleItemPage />,
            },
          ],
        },
        {
          path: '404',
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: '/cart',
      element: <CartPageLayout />,
      children: [
        {
          index: true,
          element: <CartPage />,
        },
      ],
    },
    {
      path: '/checkout',
      element: <CheckOutPageLayout />,
      children: [
        {
          index: true,
          element: <CheckOutPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
