import { useCallback, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Overlay: React.FC<Props> = ({ isOpen, onClose }) => {
  const close = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    document.body.addEventListener('keydown', close);
    return () => {
      document.body.removeEventListener('keydown', close);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, close]);

  if (!isOpen) return null;

  return <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-md backdrop-brightness-50 z-10"></div>;
};

export default Overlay;
