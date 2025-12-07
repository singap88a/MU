import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
  default: 'border-transparent bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
  destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
  outline: 'text-secondary-950 border-secondary-200',
  success: 'border-transparent bg-emerald-100 text-emerald-700',
  warning: 'border-transparent bg-amber-100 text-amber-700',
};

function Badge({ className, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
