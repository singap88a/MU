import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, Clock, MoreHorizontal, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { useSectionContext } from '../../../context/SectionContext';

export default function Assignments() {
  const navigate = useNavigate();
  const { selectedSection, addAssignment } = useSectionContext();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    deadline: '',
    total: 10,
    description: ''
  });

  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">لم يتم اختيار سكشن</p>
      </div>
    );
  }

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    addAssignment(selectedSection.id, newAssignment);
    setIsCreateModalOpen(false);
    setNewAssignment({ title: '', deadline: '', total: 10, description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
            التسكوت - سكشن {selectedSection.number}
          </h2>
          <p className="text-secondary-500 dark:text-secondary-400">
            {selectedSection.subject} • {selectedSection.assignments.length} تاسك
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Upload className="ml-2 h-4 w-4" />
          رفع تاسك جديد
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedSection.assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant={assignment.status === 'active' ? 'success' : 'secondary'}>
                  {assignment.status === 'active' ? 'جاري الاستلام' : 'منتهي'}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="mt-2">{assignment.title}</CardTitle>
              <CardDescription>آخر موعد: {assignment.deadline}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-secondary-500">
                  <span>تم التسليم</span>
                  <span>{assignment.submissions ? assignment.submissions.length : 0} / {assignment.total}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-primary-600" 
                    style={{ width: `${((assignment.submissions ? assignment.submissions.length : 0) / assignment.total) * 100}%` }} 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 gap-2">
              <Button variant="outline" className="flex-1" onClick={() => navigate(`/admin/assignments/${assignment.id}`)}>عرض التفاصيل</Button>
              <Button className="flex-1" onClick={() => navigate(`/admin/assignments/${assignment.id}`)}>تصحيح</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create Assignment Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="إضافة تاسك جديد"
      >
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان التاسك</label>
            <Input 
              required
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
              placeholder="مثال: تصميم واجهة مستخدم"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">تاريخ التسليم</label>
              <Input 
                type="date"
                required
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({...newAssignment, deadline: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الدرجة الكلية</label>
              <Input 
                type="number"
                required
                value={newAssignment.total}
                onChange={(e) => setNewAssignment({...newAssignment, total: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">الوصف</label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
              placeholder="اكتب تفاصيل التاسك..."
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>إلغاء</Button>
            <Button type="submit">نشر التاسك</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
        title="تصحيح التاسك: تصميم واجهة مستخدم"
        className="max-w-3xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg dark:bg-secondary-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                أ.م
              </div>
              <div>
                <p className="font-medium">أحمد محمود علي</p>
                <p className="text-xs text-secondary-500">2020001</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="ml-2 h-4 w-4" />
              تحميل الملف
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">الدرجة (من 10)</label>
            <Input type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ملاحظات</label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
              placeholder="اكتب ملاحظاتك للطالب..."
            />
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-secondary-200 mt-4 dark:border-secondary-800">
            <div className="text-sm text-secondary-500">
              1 من {selectedSection.students.length} طالب
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">السابق</Button>
              <Button>حفظ والتالي</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
