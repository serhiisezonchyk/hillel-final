import { cn } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
interface Props {
  className?: string;
}
const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn('bg-muted py-8 md:py-12', className)}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col items-start gap-4 basis-1/3 bg-card rounded-md p-4 md:p-0 md:bg-muted">
            <Logo />
            <p className="text-muted-foreground">
              Comfy is a cozy and comfortable e-commerce shop offering a wide range of home goods and accessories.
            </p>
          </div>
          <div className="grid gap-2 basis-1/3 bg-card rounded-md p-4 md:p-0 md:bg-muted">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <Link to="/" className="text-muted-foreground hover:underline">
              Home
            </Link>
            <Link to="/categories" className="text-muted-foreground hover:underline">
              Categories
            </Link>
            <Link to="/shops" className="text-muted-foreground hover:underline">
              Shops
            </Link>
          </div>
          <div className="grid gap-2 basis-1/3 bg-card rounded-md p-4 md:p-0 md:bg-muted">
            <h4 className="text-lg font-medium">Contact</h4>
            <p className="text-muted-foreground">
              Slavy Boulevard, 6 B <br />
              Dnipro, Ukraine, 49100
            </p>
            <p className="text-muted-foreground">
              Phone: <a href="tel:0-800-303-505">0-800-303-505</a>
              <br />
              Email: <a href="mailto:info@comfy.com">info@comfy.ua</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-md text-muted-foreground">
          &copy; 2024 Comfy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
