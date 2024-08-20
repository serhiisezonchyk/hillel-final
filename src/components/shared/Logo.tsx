import { cn } from '@/lib/utils';

type Props = { emoji?: string; className?: string };

const Logo = ({ emoji = '🎂', className }: Props) => {
  return (
    <span className={cn('font-extrabold bg-primary text-white px-1 rounded-full mt-2 uppercase text-2xl', className)}>
      Comfy{emoji}
    </span>
  );
};

export default Logo;
