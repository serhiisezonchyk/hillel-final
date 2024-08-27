import { logout, selectIsAuth } from '@/store/slices/auth';
import { ArrowDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchPane } from '../search-pane';
import CartLink from '../shared/CartLink';
import CategoryDropdown from '../shared/CategoryDropdown';
import Logo from '../shared/Logo';
import { ModeToggle } from '../shared/ToggleThemeMode';
import { Button } from '../ui/button';
import HeaderCityChooser from './HeaderCityChooser';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  return (
    <>
      <header className="">
        <div className="bg-primary text-background md:bg-background md:text-foreground">
          <div className="container">
            <div className="h-16 flex justify-center md:justify-between">
              <div className="flex flex-row items-center gap-4">
                <Logo className="m-1 text-2xl md:text-primary-foreground md:bg-primary bg-primary-foreground text-primary" />
                <HeaderCityChooser className="hidden md:flex cursor-pointer " />
              </div>
              <nav className="flex-row items-center hidden md:flex font-thin shrink-0">
                <Link
                  to={'/sale'}
                  className="mx-2 bg-destructive text-destructive-foreground rounded-full px-2 py-[4px]"
                >
                  Sale
                </Link>
                <Link to={'/gift-card'} className="mx-2">
                  Gift cards
                </Link>
                <hr />
                <Link to={'/shops'} className="mx-2">
                  Shops
                </Link>
                <ModeToggle />
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-primary text-background sticky top-0 py-2 z-10">
        <div className="container">
          <div className="flex content-center gap-2">
            <CategoryDropdown className="hidden md:flex">
              <div>
                <p>Categories</p>
                <ArrowDown />
              </div>
            </CategoryDropdown>
            <SearchPane />
            {isAuth ? (
              <Button
                onClick={() => dispatch(logout())}
                className="hidden md:block content-center bg-primary-dark font-light"
              >
                Logout
              </Button>
            ) : (
              <Button asChild className="hidden md:block content-center bg-primary-dark font-light">
                <Link to="/sign-in">Sign in</Link>
              </Button>
            )}

            <CartLink className="hidden md:flex justify-center items-center" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
