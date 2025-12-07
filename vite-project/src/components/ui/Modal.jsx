import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className={cn(
          "relative w-full max-w-lg transform rounded-xl bg-white p-6 text-left shadow-xl transition-all dark:bg-secondary-900",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium leading-6 text-secondary-900 dark:text-white">
            {title}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export { Modal };
