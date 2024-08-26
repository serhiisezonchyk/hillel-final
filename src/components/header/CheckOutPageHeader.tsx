import Logo from '../shared/Logo';

const CheckOutPageHeader = () => {
  return (
    <header className="">
      <div className="bg-background text-foreground">
        <div className="container">
          <div className="h-16 justify-between flex items-center ">
            <Logo />

            <div className="text-xs sm:text-sm md:text-md">
              <p className="hidden md:block">Безкоштовно по Україні:</p>
              <a href="tel:0-800-303-505" className="font-bold">
                0-800-303-505
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckOutPageHeader;
