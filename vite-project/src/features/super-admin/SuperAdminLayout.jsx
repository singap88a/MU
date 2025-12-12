import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { 
      title: 'لوحة التحكم', 
      path: '/admin', 
      icon: LayoutDashboard,
      exact: true 
    },
    { 
      title: 'إدارة المعيدين', 
      path: '/admin/instructors', 
      icon: GraduationCap 
    },
    { 
      title: 'إدارة الطلاب', 
      path: '/admin/students', 
      icon: Users 
    },
    { 
      title: 'الإعدادات', 
      path: '/admin/settings', 
      icon: Settings 
    },
  ];

  const handleLogout = () => {
    // No login required currently, but good to have for future
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex" dir="rtl">
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 right-0 z-50 w-64 bg-secondary-900 text-white transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-secondary-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            <span className="font-bold text-lg">إدارة المنصة</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-secondary-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-600 text-white' 
                    : 'text-secondary-400 hover:bg-secondary-800 hover:text-white'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-secondary-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header for Mobile */}
        <header className="lg:hidden h-16 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between px-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-secondary-600 dark:text-secondary-400"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-secondary-900 dark:text-white">لوحة الإدارة</span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
