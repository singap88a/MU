import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Users, Calendar, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

const sectionsData = [
  { id: 1, number: '1', day: 'الأحد', time: '08:00 ص - 10:00 ص', students: 45, location: 'معمل 3' },
  { id: 2, number: '2', day: 'الأحد', time: '10:00 ص - 12:00 م', students: 42, location: 'معمل 3' },
  { id: 3, number: '3', day: 'الاثنين', time: '08:00 ص - 10:00 ص', students: 48, location: 'قاعة 101' },
  { id: 4, number: '4', day: 'الاثنين', time: '10:00 ص - 12:00 م', students: 40, location: 'قاعة 101' },
  { id: 5, number: '5', day: 'الثلاثاء', time: '12:00 م - 02:00 م', students: 44, location: 'معمل 2' },
];

export default function Sections() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">إدارة السكاشن</h2>
          <p className="text-secondary-500 dark:text-secondary-400">عرض وإدارة جميع السكاشن الدراسية.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة سكشن جديد
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sectionsData.map((section) => (
          <Card 
            key={section.id} 
            className="cursor-pointer transition-all hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800"
            onClick={() => setSelectedSection(section)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">سكشن {section.number}</CardTitle>
              <Badge variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                {section.location}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-secondary-500">
                  <Calendar className="ml-2 h-4 w-4 text-secondary-400" />
                  {section.day}
                </div>
                <div className="flex items-center text-sm text-secondary-500">
                  <Clock className="ml-2 h-4 w-4 text-secondary-400" />
                  {section.time}
                </div>
                <div className="flex items-center text-sm text-secondary-500">
                  <Users className="ml-2 h-4 w-4 text-secondary-400" />
                  {section.students} طالب
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إضافة سكشن جديد"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">رقم السكشن</label>
            <Input placeholder="مثال: 1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">اليوم</label>
              <select className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800">
                <option>الأحد</option>
                <option>الاثنين</option>
                <option>الثلاثاء</option>
                <option>الأربعاء</option>
                <option>الخميس</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المكان</label>
              <Input placeholder="مثال: معمل 3" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">الوقت</label>
            <Input type="time" />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!selectedSection}
        onClose={() => setSelectedSection(null)}
        title={`تفاصيل سكشن ${selectedSection?.number}`}
      >
        {selectedSection && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-800">
                <p className="text-sm text-secondary-500">اليوم</p>
                <p className="font-medium">{selectedSection.day}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-800">
                <p className="text-sm text-secondary-500">الوقت</p>
                <p className="font-medium">{selectedSection.time}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-800">
                <p className="text-sm text-secondary-500">المكان</p>
                <p className="font-medium">{selectedSection.location}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary-50 dark:bg-secondary-800">
                <p className="text-sm text-secondary-500">عدد الطلاب</p>
                <p className="font-medium">{selectedSection.students}</p>
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSelectedSection(null)}>إغلاق</Button>
              <Button>عرض قائمة الطلاب</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
