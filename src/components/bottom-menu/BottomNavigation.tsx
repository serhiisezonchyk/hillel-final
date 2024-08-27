import { logout, selectIsAuth } from '@/store/slices/auth';
import { Home, LogIn, LogOut, MoreHorizontal, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import BottomMenu from './BottomMenu';

const BottomNavigation = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  return (
    <BottomMenu>
      <BottomMenu.Item icon={<Home size={16} />} link="/">
        Home
      </BottomMenu.Item>
      <BottomMenu.Item icon={<MoreHorizontal size={16} />} link="/categories">
        Categories
      </BottomMenu.Item>
      <BottomMenu.ItemCart icon={<ShoppingCart size={16} />} link="/cart">
        Cart
      </BottomMenu.ItemCart>
      {isAuth ? (
        <BottomMenu.Item icon={<LogOut size={16} />} link="" onClick={() => dispatch(logout())}>
          Logout
        </BottomMenu.Item>
      ) : (
        <BottomMenu.Item icon={<LogIn size={16} />} link="/sign-in">
          Login
        </BottomMenu.Item>
      )}
    </BottomMenu>
  );
};

export default BottomNavigation;
