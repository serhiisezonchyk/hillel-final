import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}
const CheckoutPageFooter: React.FC<Props> = ({ className }) => {
  return (
    <footer className={cn('bg-muted py-8 md:py-12', className)}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">&copy; 2024 Comfy. All rights reserved.</div>
    </footer>
  );
};

export default CheckoutPageFooter;
