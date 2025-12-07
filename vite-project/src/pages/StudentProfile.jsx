import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';

const activities = [
  { id: 1, type: 'attendance', title: 'حضور سكشن 5', date: '2023-11-20', status: 'present' },
  { id: 2, type: 'quiz', title: 'كويز 1: مقدمة في البرمجة', date: '2023-11-15', score: '4/5' },
  { id: 3, type: 'assignment', title: 'تاسك 1: تصميم واجهة', date: '2023-11-10', score: '9/10' },
  { id: 4, type: 'attendance', title: 'حضور سكشن 4', date: '2023-11-05', status: 'absent' },
];

export default function StudentProfile() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">ملف الطالب</h2>
          <p className="text-secondary-500 dark:text-secondary-400">عرض تفاصيل ودرجات الطالب.</p>
        </div>
        <Button variant="outline">تعديل البيانات</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-700 mb-4">
                أ.م
              </div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white">أحمد محمود علي</h3>
              <p className="text-secondary-500">الفرقة الرابعة - علوم حاسب</p>
              <div className="mt-6 space-y-3 text-right">
                <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                  <User className="ml-2 h-4 w-4" />
                  2020001
                </div>
                <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                  <Mail className="ml-2 h-4 w-4" />
                  ahmed.ali@student.edu.eg
                </div>
                <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                  <Phone className="ml-2 h-4 w-4" />
                  01000000000
                </div>
                <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
                  <BookOpen className="ml-2 h-4 w-4" />
                  سكشن 1
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملخص الدرجات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">الحضور (5)</span>
                <span className="font-bold text-emerald-600">5/5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary-100 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">الكويزات (5)</span>
                <span className="font-bold text-primary-600">4/5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary-100 overflow-hidden">
                <div className="h-full rounded-full bg-primary-500" style={{ width: '80%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">التسكوت (10)</span>
                <span className="font-bold text-amber-600">9/10</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary-100 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '90%' }} />
              </div>

              <div className="pt-4 border-t border-secondary-200 dark:border-secondary-800 flex justify-between items-center">
                <span className="font-bold text-lg">المجموع</span>
                <span className="font-bold text-xl text-primary-700">18/20</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>سجل النشاط</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary-200 before:to-transparent">
                {activities.map((activity) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 dark:bg-secondary-800 dark:border-secondary-900">
                      {activity.type === 'attendance' ? (
                        <CheckCircle2 className={`h-5 w-5 ${activity.status === 'present' ? 'text-emerald-500' : 'text-red-500'}`} />
                      ) : activity.type === 'quiz' ? (
                        <FileText className="h-5 w-5 text-primary-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-secondary-200 bg-white shadow-sm dark:bg-secondary-900 dark:border-secondary-800">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-secondary-900 dark:text-white">{activity.title}</div>
                        <time className="font-caveat font-medium text-secondary-500 text-xs">{activity.date}</time>
                      </div>
                      <div className="text-secondary-500 text-sm">
                        {activity.type === 'attendance' ? (
                          <Badge variant={activity.status === 'present' ? 'success' : 'destructive'}>
                            {activity.status === 'present' ? 'حاضر' : 'غائب'}
                          </Badge>
                        ) : (
                          <span className="font-medium">الدرجة: {activity.score}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
