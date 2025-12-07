import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  QrCode, 
  Calculator, 
  FileText, 
  CheckSquare, 
  LogOut,
  ArrowLeftRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useSectionContext } from '../../context/SectionContext';
import { Badge } from '../ui/Badge';

const navigation = [
  { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { name: 'إدارة الطلاب', href: '/admin/students', icon: Users },
  { name: 'ماسح الحضور', href: '/admin/attendance', icon: QrCode },
  { name: 'تقييم الحضور', href: '/admin/grading', icon: Calculator },
  { name: 'الكويزات', href: '/admin/quizzes', icon: FileText },
  { name: 'التسكوت', href: '/admin/assignments', icon: CheckSquare },
];

export function Sidebar() {
  const { selectedSection, clearSection } = useSectionContext();
  const navigate = useNavigate();

  const handleSwitchSection = () => {
    clearSection();
    navigate('/select-section');
  };

  return (
    <div className="flex h-full w-64 flex-col border-l border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900">
      <div className="flex h-16 items-center px-6 border-b border-secondary-200 dark:border-secondary-800">
        <h1 className="text-xl font-bold text-primary-700 dark:text-primary-500">نظام السكاشن</h1>
      </div>

      {selectedSection && (
        <div className="p-4 border-b border-secondary-200 dark:border-secondary-800 bg-primary-50 dark:bg-primary-900/10">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-primary-700 dark:text-primary-400">سكشن {selectedSection.number}</h3>
              <Badge variant="secondary" className="text-xs">{selectedSection.location}</Badge>
            </div>
            <p className="text-xs text-secondary-600 dark:text-secondary-400">{selectedSection.subject}</p>
            <p className="text-xs text-secondary-500">{selectedSection.year} • {selectedSection.department}</p>
            <button
              onClick={handleSwitchSection}
              className="mt-2 w-full flex items-center justify-center gap-2 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              <ArrowLeftRight className="w-3 h-3" />
              تبديل السكشن
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800'
                )
              }
            >
              <item.icon
                className={cn('ml-3 h-5 w-5 flex-shrink-0')}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-secondary-200 p-4 dark:border-secondary-800">
        <button className="group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
          <LogOut className="ml-3 h-5 w-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
