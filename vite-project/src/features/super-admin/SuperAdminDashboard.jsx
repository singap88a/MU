import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { getAllPlatformStats } from '../../lib/superAdminUtils';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalInstructors: 0,
    totalStudents: 0,
    totalSections: 0,
    pendingCodes: 0
  });

  useEffect(() => {
    setStats(getAllPlatformStats());
  }, []);

  const statCards = [
    {
      title: 'المعيدين',
      value: stats.totalInstructors,
      icon: GraduationCap,
      color: 'bg-primary-600',
      description: 'معيد مسجل في المنصة'
    },
    {
      title: 'الطلاب',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-emerald-600',
      description: 'طالب نشط'
    },
    {
      title: 'السكاشن',
      value: stats.totalSections,
      icon: BookOpen,
      color: 'bg-blue-600',
      description: 'سكشن دراسي'
    },
    {
      title: 'أكواد التفعيل',
      value: stats.pendingCodes,
      icon: ShieldCheck,
      color: 'bg-amber-600',
      description: 'كود جاهز للاستخدام'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">لوحة التحكم الرئيسية</h1>
        <p className="text-secondary-500">نظرة عامة على إحصائيات وأداء المنصة التعليمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Card key={idx} className="overflow-hidden border-0 shadow-lg group">
            <CardContent className="p-0">
              <div className="relative p-6">
                <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-10 transition-transform group-hover:scale-110 ${stat.color}`} />
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} text-white shadow-lg shadow-primary-900/10`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  {/* Badge or trend indicator could go here */}
                </div>
                
                <h3 className="text-3xl font-bold text-secondary-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-secondary-500 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-xs text-secondary-400">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions or Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary-500" />
                نشاط المنصة
              </h3>
            </div>
            <div className="h-64 flex items-center justify-center bg-secondary-50 dark:bg-secondary-800/50 rounded-lg border-2 border-dashed border-secondary-200 dark:border-secondary-800">
              <div className="text-center text-secondary-400">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>مخطط النشاط سيظهر هنا قريباً</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status / Alerts */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">حالة النظام</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">الخادم يعمل</span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-500">100%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <span className="text-sm font-medium">قاعدة البيانات</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full dark:bg-emerald-900/30 dark:text-emerald-400">متصل</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <span className="text-sm font-medium">آخر نسخ احتياطي</span>
                <span className="text-xs text-secondary-500">منذ 2 ساعة</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
