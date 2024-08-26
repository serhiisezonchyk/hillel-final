import { Home, LogIn, MoreHorizontal, ShoppingCart } from 'lucide-react';
import BottomMenu from './BottomMenu';

const BottomNavigation = () => {
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
      <BottomMenu.Item icon={<LogIn size={16} />} link="/sign-in">
        Login
      </BottomMenu.Item>
    </BottomMenu>
  );
};

export default BottomNavigation;
