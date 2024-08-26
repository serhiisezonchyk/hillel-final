import { lazy, Suspense } from 'react';

import CataloguePage from '@/pages/CataloguePage';
import CategoriesPage from '@/pages/CategoriesPage';
import CategoryPage from '@/pages/CategoryPage';
import LoadingPage from '@/pages/LoadingPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SingleItemPage from '@/pages/SingleItemPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import BreadcrumbLayout from './layout/BreadcrumbLayout';
import Layout from './layout/Layout';

const SignInPage = lazy(() => import('@/pages/SignInPage'));
const SignUpPage = lazy(() => import('@/pages/SignUpPage'));
const ShopsPage = lazy(() => import('@/pages/ShopsPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CartPageLayout = lazy(() => import('@/components/layout/CartPageLayout'));
const CheckOutPage = lazy(() => import('@/pages/CheckOutPage'));
const CheckOutPageLayout = lazy(() => import('@/components/layout/CheckOutPageLayout'));

function lazyLoadComponent(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component />
    </Suspense>
  );
}
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
          path: 'categories',
          element: <CategoriesPage />,
        },
        {
          path: 'shops',
          element: lazyLoadComponent(ShopsPage),
        },
        {
          path: 'sign-in',
          element: lazyLoadComponent(SignInPage),
        },
        {
          path: 'sign-up',
          element: lazyLoadComponent(SignUpPage),
        },
        {
          path: '404',
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: '/cart',
      element: lazyLoadComponent(CartPageLayout),
      children: [
        {
          index: true,
          element: lazyLoadComponent(CartPage),
        },
      ],
    },
    {
      path: '/checkout',

      element: lazyLoadComponent(CheckOutPageLayout),
      children: [
        {
          index: true,
          element: lazyLoadComponent(CheckOutPage),
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
