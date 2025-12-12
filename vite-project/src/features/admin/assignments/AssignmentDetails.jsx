import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Download, CheckCircle, XCircle, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { useSectionContext } from '../../../context/SectionContext';

export default function AssignmentDetails() {
  const { assignmentId } = useParams();
  const { selectedSection } = useSectionContext();
  const navigate = useNavigate();
  const [currentStudent, setCurrentStudent] = useState(0);
  const [grades, setGrades] = useState({});
  const [notes, setNotes] = useState({});

  if (!selectedSection) {
    return null;
  }

  const assignment = selectedSection.assignments.find(a => a.id === parseInt(assignmentId));

  if (!assignment) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">التاسك غير موجود</p>
      </div>
    );
  }

  // Use real submissions or fallback to empty array
  const submittedStudents = assignment.submissions || [];
  const submission = submittedStudents[currentStudent];
  // Find full student details if needed, or use what's in submission
  const student = submission ? {
    id: submission.studentId,
    name: submission.studentName,
    code: submission.studentCode,
    fileName: submission.fileName
  } : null;

  const handleGrade = () => {
    if (currentStudent < submittedStudents.length - 1) {
      setCurrentStudent(currentStudent + 1);
    }
  };

  const progress = ((currentStudent + 1) / submittedStudents.length) * 100;


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/assignments')}>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
            {assignment.title}
          </h2>
          <p className="text-secondary-500 dark:text-secondary-400">
            آخر موعد: {assignment.deadline}
          </p>
        </div>
        <Badge variant={assignment.status === 'active' ? 'success' : 'secondary'}>
          {assignment.status === 'active' ? 'جاري الاستلام' : 'منتهي'}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500 flex items-center gap-2">
              <Users className="h-4 w-4" />
              إجمالي الطلاب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignment.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              تم التسليم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{assignment.submissions ? assignment.submissions.length : 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              لم يسلم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{assignment.total - (assignment.submissions ? assignment.submissions.length : 0)}</div>
          </CardContent>
        </Card>
      </div>



      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-secondary-900 dark:text-white">تصحيح التسليمات</h3>
          <div className="text-sm text-secondary-500">
            {currentStudent + 1} من {submittedStudents.length}
          </div>
        </div>

        <div className="mb-4">
          <div className="h-2 bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {student && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold">
                    {student.name ? (student.name.split(' ')[0][0] + (student.name.split(' ')[1]?.[0] || '')) : '?'}
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">{student.name}</p>
                    <p className="text-sm text-secondary-500">{student.code}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="ml-2 h-4 w-4" />
                  {student.fileName || 'تحميل الملف'}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">الدرجة (من 10)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    max="10"
                    value={grades[student.id] || ''}
                    onChange={(e) => setGrades({ ...grades, [student.id]: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">ملاحظات</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                    placeholder="اكتب ملاحظاتك للطالب..."
                    value={notes[student.id] || ''}
                    onChange={(e) => setNotes({ ...notes, [student.id]: e.target.value })}
                  />
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-secondary-200 dark:border-secondary-800">
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentStudent(Math.max(0, currentStudent - 1))}
                    disabled={currentStudent === 0}
                  >
                    السابق
                  </Button>
                  <Button onClick={handleGrade} disabled={!grades[student.id]}>
                    {currentStudent < submittedStudents.length - 1 ? 'حفظ والتالي' : 'حفظ وإنهاء'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
