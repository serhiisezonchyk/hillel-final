import { DialogTitle } from '@radix-ui/react-dialog';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '../ui/dialog';

interface Props {
  open: boolean;
  image: { src: string; description: string };
  onOpenChange: (open: boolean) => void;
}

const PreviewImage: React.FC<Props> = ({ open, image, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image preview</DialogTitle>
          <DialogDescription>{image.description}</DialogDescription>
        </DialogHeader>
        <img src={image.src} className="max-w-full max-h-full object-contain" />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewImage;
