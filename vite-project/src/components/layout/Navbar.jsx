import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-secondary-200 bg-white px-6 dark:border-secondary-800 dark:bg-secondary-900">
      <div className="flex items-center gap-4">
        <div className="w-64">
          <Input 
            placeholder="بحث..." 
            icon={Search} 
            className="bg-secondary-50 dark:bg-secondary-800"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-secondary-900" />
        </Button>
        <div className="flex items-center gap-3 border-r border-secondary-200 pr-4 dark:border-secondary-800">
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-secondary-900 dark:text-white">د. أحمد محمد</p>
            <p className="text-xs text-secondary-500">أستاذ مساعد</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
            أ.م
          </div>
        </div>
      </div>
    </header>
  );
}
