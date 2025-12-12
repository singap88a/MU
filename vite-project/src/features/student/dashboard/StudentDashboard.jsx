import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { LogOut, User, Calendar, FileText, Upload, CheckCircle, Clock, AlertCircle, BookOpen, Users } from 'lucide-react';
import { QuizUploadModal } from '../../../components/ui/QuizUploadModal';
import { useSectionContext } from '../../../context/SectionContext';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { submitAssignment } = useSectionContext();
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('exams'); // exams, assignments, grades
  const [selectedExam, setSelectedExam] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      navigate('/student/login');
      return;
    }
    const studentData = JSON.parse(storedUser);
    setStudent(studentData);

    console.log('👤 Student Data:', studentData);

    // Load section data for the student - always read from localStorage
    const storedSections = JSON.parse(localStorage.getItem('sections_data') || '[]');
    console.log('📚 Total Sections in localStorage:', storedSections.length);
    
    // Find student's section by code or number
    const section = storedSections.find(s => 
      s.sectionCode === studentData.sectionCode || s.number === studentData.section
    );

    console.log('🎯 Found Section:', section ? section.subject : 'NOT FOUND');

    if (section) {
      console.log('📊 Section Details:', {
        code: section.sectionCode,
        number: section.number,
        subject: section.subject,
        totalQuizzes: section.quizzes?.length || 0,
        activeQuizzes: section.quizzes?.filter(q => q.status === 'active').length || 0
      });

      // Load assignments
      if (section.assignments) {
        setAssignments(section.assignments);
      }

      // Load active quizzes
      if (section.quizzes) {
        const active = section.quizzes.filter(q => q.status === 'active');
        console.log('✅ Active Quizzes:', active.map(q => q.title));
        setActiveQuizzes(active);
      } else {
        console.log('⚠️ No quizzes array found in section');
      }
    } else {
      console.log('❌ Section not found for student:', {
        studentSectionCode: studentData.sectionCode,
        studentSection: studentData.section
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/student/login');
  };

  const handleUploadClick = (exam) => {
    setSelectedExam(exam);
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = (file) => {
    if (selectedExam && student) {
      const storedSections = JSON.parse(localStorage.getItem('sections_data') || '[]');
      const section = storedSections.find(s => s.number === student.section);
      
      if (section) {
        submitAssignment(section.id, selectedExam.id, {
          studentId: student.id,
          studentName: student.name,
          studentCode: student.universityId,
          fileName: file.name
        });
        
        // Refresh assignments to show updated status if needed
        // For now, we rely on the context update which might not trigger a re-render of this local state immediately
        // unless we subscribe to sections from context. 
        // But since we read from localStorage in useEffect, let's just update local state manually for UI feedback
        setAssignments(prev => prev.map(a => 
          a.id === selectedExam.id 
            ? { ...a, submissions: [...(a.submissions || []), {}] } // Mock update to show it's submitted
            : a
        ));
      }
    }
  };

  if (!student) return null;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Header */}
      <header className="bg-white dark:bg-secondary-800 shadow-sm border-b border-secondary-200 dark:border-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
              {student.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-lg font-bold text-secondary-900 dark:text-white">{student.name}</h1>
              <p className="text-xs text-secondary-500 dark:text-secondary-400">
                {student.department} - الفرقة {student.year} - سكشن {student.section}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل خروج
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">بيانات الطالب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-secondary-400" />
                    <div>
                      <p className="text-xs text-secondary-500">الرقم القومي</p>
                      <p className="font-medium">{student.nationalId}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-secondary-400" />
                    <div>
                      <p className="text-xs text-secondary-500">رقم الكارنيه</p>
                      <p className="font-medium">{student.universityId}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-secondary-400" />
                    <div>
                      <p className="text-xs text-secondary-500">السكشن</p>
                      <p className="font-medium">سكشن {student.section}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">تنبيه هام</h3>
                <p className="text-primary-100 text-sm mb-4">
                  يرجى التأكد من رفع الكويزات في الموعد المحدد. التأخير قد يؤدي إلى خصم درجات.
                </p>
                <div className="flex items-center gap-2 text-xs bg-primary-700/50 p-2 rounded">
                  <AlertCircle className="h-4 w-4" />
                  <span>آخر موعد للكويز القادم: 15 مارس</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Tabs */}
            <div className="flex gap-2 border-b border-secondary-200 dark:border-secondary-700 pb-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('exams')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  activeTab === 'exams' 
                    ? 'bg-white dark:bg-secondary-800 text-primary-600 border-b-2 border-primary-600' 
                    : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
                }`}
              >
                الاختبارات القادمة
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  activeTab === 'assignments' 
                    ? 'bg-white dark:bg-secondary-800 text-primary-600 border-b-2 border-primary-600' 
                    : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
                }`}
              >
                التسكوت والواجبات
              </button>
              <button
                onClick={() => setActiveTab('grades')}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  activeTab === 'grades' 
                    ? 'bg-white dark:bg-secondary-800 text-primary-600 border-b-2 border-primary-600' 
                    : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
                }`}
              >
                سجل الدرجات
              </button>
            </div>

            {activeTab === 'exams' && (
              <div className="space-y-4">
                {activeQuizzes.length > 0 ? (
                  activeQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-secondary-900 dark:text-white">{quiz.title}</h3>
                              <Badge variant="success">نشط</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{quiz.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{quiz.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>
                                  {Array.isArray(quiz.questions) 
                                    ? quiz.questions.length 
                                    : (quiz.questionsData ? quiz.questionsData.length : quiz.questions)} سؤال
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 min-w-[150px]">
                            <Button onClick={() => navigate(`/student/quiz/${quiz.id}`)} className="w-full gap-2">
                              <FileText className="h-4 w-4" />
                              بدء الاختبار
                            </Button>
                            <p className="text-xs text-center text-secondary-400">
                              المدة: {quiz.duration}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
                    <BookOpen className="h-12 w-12 mx-auto text-secondary-300 mb-4" />
                    <h3 className="text-lg font-medium text-secondary-900 dark:text-white">لا توجد اختبارات نشطة حالياً</h3>
                    <p className="text-secondary-500">سيتم إظهار الاختبارات هنا عند إضافتها.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-secondary-900 dark:text-white">{assignment.title}</h3>
                              <Badge variant={assignment.status === 'active' ? 'success' : 'secondary'}>
                                {assignment.status === 'active' ? 'مفتوح' : 'منتهي'}
                              </Badge>
                            </div>
                            <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-1">
                              {assignment.description || 'لا يوجد وصف'}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>آخر موعد: {assignment.deadline}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                <span>{assignment.total} درجات</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 min-w-[150px]">
                            <Button onClick={() => handleUploadClick(assignment)} className="w-full gap-2" variant="outline">
                              <Upload className="h-4 w-4" />
                              رفع الحل
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
                    <BookOpen className="h-12 w-12 mx-auto text-secondary-300 mb-4" />
                    <h3 className="text-lg font-medium text-secondary-900 dark:text-white">لا توجد تسكوت حالياً</h3>
                    <p className="text-secondary-500">سيتم إظهار التسكوت والواجبات هنا عند إضافتها.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'grades' && (
              <div className="text-center py-12 bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700">
                <CheckCircle className="h-12 w-12 mx-auto text-secondary-300 mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white">لا توجد درجات بعد</h3>
                <p className="text-secondary-500">سيتم إظهار درجات الاختبارات هنا بعد التصحيح.</p>
              </div>
            )}

          </div>
        </div>
      </main>

      <QuizUploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        examTitle={selectedExam?.title}
        student={student}
        onSubmit={handleUploadSubmit}
      />
    </div>
  );
}
