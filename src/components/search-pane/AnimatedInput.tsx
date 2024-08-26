import { Input } from '@/components/ui/input';
import React, { forwardRef, useEffect, useState } from 'react';

interface AnimatedInputProps extends React.ComponentPropsWithRef<'input'> {
  placeholder?: string;
  delayAfterComplete?: number;
  value: string;
  setValue: (value: string) => void;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ placeholder: passedPlaceholder = '', delayAfterComplete = 1000, value, setValue, ...passedProps }, ref) => {
    const [placeholder, setPlaceholder] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
      let intr: NodeJS.Timeout;
      let timeout: NodeJS.Timeout;

      if (placeholderIndex < passedPlaceholder.length) {
        intr = setTimeout(
          () => {
            setPlaceholder(passedPlaceholder.slice(0, placeholderIndex + 1));
            setPlaceholderIndex((prevIndex) => prevIndex + 1);
          },
          Math.floor(Math.random() * 200 + 100),
        );
      } else {
        timeout = setTimeout(() => {
          setPlaceholder('');
          setPlaceholderIndex(0);
        }, delayAfterComplete);
      }

      return () => {
        clearTimeout(intr);
        clearTimeout(timeout);
      };
    }, [passedPlaceholder, placeholderIndex, delayAfterComplete]);

    return (
      <Input
        {...passedProps}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
);
