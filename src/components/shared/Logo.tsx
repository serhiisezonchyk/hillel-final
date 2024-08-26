import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Props {
  emoji?: string;
  className?: string;
}

const Logo = ({ emoji = '🎂', className }: Props) => {
  return (
    <Link to="/">
      <span
        className={cn(
          'font-extrabold bg-primary text-primary-foreground px-1 rounded-full uppercase text-2xl text-nowrap',
          className,
        )}
      >
        Comfy {emoji}
      </span>
    </Link>
  );
};

export default Logo;
