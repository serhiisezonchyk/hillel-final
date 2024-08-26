import { Outlet, ScrollRestoration } from 'react-router-dom';
import BottomMenu from '../bottom-menu/BottomNavigation';
import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="mb-[49px]">
        <Outlet />
      </main>
      <Footer className="mb-8 md:mb-0" />
      <BottomMenu />
    </>
  );
};

export default Layout;
