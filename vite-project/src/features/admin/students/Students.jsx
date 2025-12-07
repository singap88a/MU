import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, FileDown } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { useSectionContext } from '../../../context/SectionContext';
import { useNavigate } from 'react-router-dom';

export default function Students() {
  const { selectedSection } = useSectionContext();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">لم يتم اختيار سكشن</p>
      </div>
    );
  }

  const filteredStudents = selectedSection.students.filter(student => 
    student.name.includes(searchTerm) || student.code.includes(searchTerm)
  );

  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
            إدارة الطلاب - سكشن {selectedSection.number}
          </h2>
          <p className="text-secondary-500 dark:text-secondary-400">
            {selectedSection.subject} • {selectedSection.students.length} طالب
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="ml-2 h-4 w-4" />
            تصدير Excel
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة طالب
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-secondary-200 dark:bg-secondary-900 dark:border-secondary-800">
        <div className="flex-1">
          <Input 
            placeholder="بحث بالاسم أو رقم الكارنيه..." 
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <Filter className="ml-2 h-4 w-4" />
          فلترة
        </Button>
      </div>

      <div className="rounded-xl border border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>رقم الكارنيه</TableHead>
              <TableHead>الحضور</TableHead>
              <TableHead>الكويزات</TableHead>
              <TableHead>التسكوت</TableHead>
              <TableHead>المجموع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => {
              const total = student.attendance + student.quizzes + student.assignments;
              return (
                <TableRow 
                  key={student.id} 
                  className="cursor-pointer"
                  onClick={() => handleStudentClick(student.id)}
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.code}</TableCell>
                  <TableCell>{student.attendance}/9</TableCell>
                  <TableCell>{student.quizzes}/5</TableCell>
                  <TableCell>{student.assignments}/10</TableCell>
                  <TableCell className="font-bold text-primary-600">{total}/24</TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'success' : 'secondary'}>
                      {student.status === 'active' ? 'منتظم' : 'منقطع'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="إضافة طالب جديد"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">الاسم الرباعي</label>
            <Input placeholder="اسم الطالب" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الكارنيه</label>
              <Input placeholder="202XXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الطالب (ID)</label>
              <Input placeholder="ID" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>إلغاء</Button>
            <Button type="submit">إضافة</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
