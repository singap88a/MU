import React from 'react';
import { FileDown, Calculator } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { useSectionContext } from '../../../context/SectionContext';

export default function AttendanceGrading() {
  const { selectedSection } = useSectionContext();

  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">لم يتم اختيار سكشن</p>
      </div>
    );
  }

  // Constants
  const TOTAL_SECTIONS = 12; // This could be dynamic or set by admin
  const MAX_GRADE = 5;

  // Calculate stats
  const students = selectedSection.students.map(student => {
    // Mock attendance data if not present (random for demo purposes if 0)
    // In a real app, this would come from the attendance records
    const attended = student.attendance || Math.floor(Math.random() * TOTAL_SECTIONS);
    const percentage = Math.round((attended / TOTAL_SECTIONS) * 100);
    const grade = ((attended / TOTAL_SECTIONS) * MAX_GRADE).toFixed(1);
    
    return {
      ...student,
      totalSections: TOTAL_SECTIONS,
      attended,
      percentage,
      grade
    };
  });

  const averageAttendance = Math.round(
    students.reduce((acc, curr) => acc + curr.percentage, 0) / students.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">تقييم الحضور - سكشن {selectedSection.number}</h2>
          <p className="text-secondary-500 dark:text-secondary-400">حساب درجات الحضور تلقائياً بناءً على عدد السكاشن.</p>
        </div>
        <Button variant="outline">
          <FileDown className="ml-2 h-4 w-4" />
          تصدير Excel
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500">إجمالي السكاشن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TOTAL_SECTIONS}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500">الدرجة الكلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MAX_GRADE}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500">متوسط الحضور</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{averageAttendance}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-secondary-200 bg-white dark:border-secondary-800 dark:bg-secondary-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الطالب</TableHead>
              <TableHead>عدد السكاشن الكلي</TableHead>
              <TableHead>عدد مرات الحضور</TableHead>
              <TableHead>نسبة الحضور</TableHead>
              <TableHead>الدرجة المستحقة ({MAX_GRADE})</TableHead>
              <TableHead>التقدير</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.totalSections}</TableCell>
                <TableCell>{student.attended}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-secondary-100 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          student.percentage >= 85 ? 'bg-emerald-500' : 
                          student.percentage >= 70 ? 'bg-amber-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${student.percentage}%` }} 
                      />
                    </div>
                    <span className="text-xs text-secondary-500">{student.percentage}%</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-primary-600">{student.grade}</TableCell>
                <TableCell>
                  <Badge variant={
                    student.percentage >= 85 ? 'success' : 
                    student.percentage >= 70 ? 'warning' : 'destructive'
                  }>
                    {student.percentage >= 85 ? 'ممتاز' : 
                     student.percentage >= 70 ? 'جيد' : 'ضعيف'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
