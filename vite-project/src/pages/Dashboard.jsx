import React from 'react';
import { 
  Users, 
  FileText, 
  CheckSquare, 
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSectionContext } from '../context/SectionContext';

const attendanceData = [
  { name: 'الأسبوع 1', attendance: 95 },
  { name: 'الأسبوع 2', attendance: 88 },
  { name: 'الأسبوع 3', attendance: 92 },
  { name: 'الأسبوع 4', attendance: 85 },
  { name: 'الأسبوع 5', attendance: 90 },
  { name: 'الأسبوع 6', attendance: 82 },
];

const recentActivities = [
  {
    id: 1,
    user: 'أحمد محمد',
    action: 'قام برصد درجات الكويز الأول',
    time: 'منذ 2 ساعة',
    icon: FileText,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    user: 'سارة علي',
    action: 'سلمت التاسك الأول',
    time: 'منذ 4 ساعات',
    icon: CheckSquare,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 3,
    user: 'النظام',
    action: 'تنبيه: انخفاض نسبة الحضور',
    time: 'منذ 5 ساعات',
    icon: AlertCircle,
    color: 'bg-amber-100 text-amber-600',
  },
];

export default function Dashboard() {
  const { selectedSection } = useSectionContext();

  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">لم يتم اختيار سكشن</p>
      </div>
    );
  }

  const stats = [
    {
      title: 'الطلاب المسجلين',
      value: selectedSection.students.length.toString(),
      icon: Users,
      change: '100% نسبة اكتمال',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      title: 'الكويزات النشطة',
      value: selectedSection.quizzes.filter(q => q.status === 'active').length.toString(),
      icon: FileText,
      change: `من ${selectedSection.quizzes.length} كويز`,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    {
      title: 'تسكوت للتصحيح',
      value: selectedSection.assignments.filter(a => a.status === 'active').length.toString(),
      icon: CheckSquare,
      change: `من ${selectedSection.assignments.length} تاسك`,
      color: 'text-rose-600',
      bg: 'bg-rose-100',
    },
    {
      title: 'متوسط الحضور',
      value: '88%',
      icon: TrendingUp,
      change: 'آخر 6 أسابيع',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
          لوحة التحكم - سكشن {selectedSection.number}
        </h2>
        <p className="text-secondary-500 dark:text-secondary-400">
          {selectedSection.subject} • {selectedSection.year} • {selectedSection.department}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-secondary-500">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stat.value}</div>
              <p className="text-xs text-secondary-500 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>إحصائيات الحضور</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>آخر الأنشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="mr-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-secondary-900 dark:text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-secondary-500">
                      {activity.action}
                    </p>
                    <p className="text-xs text-secondary-400 flex items-center mt-1">
                      <Clock className="h-3 w-3 ml-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
