import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-950 p-4">
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
