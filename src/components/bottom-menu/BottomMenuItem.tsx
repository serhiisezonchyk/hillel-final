import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props extends ComponentPropsWithoutRef<'div'> {
  icon: ReactNode;
  link: string;
}

const BottomMenuItem: React.FC<Props> = ({ icon, link, children }) => {
  return (
    <Link
      to={link}
      className="flex flex-col justify-center items-center flex-1 cursor-pointer hover:text-primary duration-300 transition-colors ease-linear"
    >
      {icon}
      <span className="text-xs">{children}</span>
    </Link>
  );
};

export default BottomMenuItem;
