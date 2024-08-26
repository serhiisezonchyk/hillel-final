import Logo from '../shared/Logo';
import HeaderCityChooser from './HeaderCityChooser';

const CartPageHeader = () => {
  return (
    <header className="">
      <div className="bg-background text-foreground">
        <div className="container">
          <div className="h-16 justify-between flex items-center ">
            <div className="flex flex-col gap-2">
              <Logo />
              <a href="tel:0-800-303-505" className="font-bold text-xs text-start md:hidden">
                0-800-303-505
              </a>
            </div>
            <p className="hidden md:block">
              Безкоштовно по Україні:{' '}
              <a href="tel:0-800-303-505" className="font-bold">
                0-800-303-505
              </a>
            </p>
            <HeaderCityChooser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default CartPageHeader;
