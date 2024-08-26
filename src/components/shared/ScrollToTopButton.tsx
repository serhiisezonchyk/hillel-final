import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <Button
      variant={'default'}
      size={'icon'}
      asChild
      className={cn('rounded-full fixed bottom-2 right-3 opacity-0 transition-all duration-300', {
        'opacity-1 sm:bottom-4 bottom-16': visible,
      })}
      onClick={handleClick}
    >
      <ChevronUp />
    </Button>
  );
};

export default ScrollToTopButton;
