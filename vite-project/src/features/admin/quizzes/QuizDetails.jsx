import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Trash2, Edit, Play, Users, Clock, CheckCircle, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { useSectionContext } from '../../../context/SectionContext';

export default function QuizDetails() {
  const { quizId } = useParams();
  const { selectedSection, updateQuizQuestions } = useSectionContext();
  const navigate = useNavigate();
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  
  // Find quiz first to initialize state
  const quiz = selectedSection?.quizzes.find(q => q.id === parseInt(quizId));
  
  const [questions, setQuestions] = useState(quiz?.questions || []);

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  if (!selectedSection) return null;
  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">الكويز غير موجود</p>
      </div>
    );
  }

  const handleAddQuestion = () => {
    if (newQuestion.text && newQuestion.options.every(opt => opt.trim())) {
      const updatedQuestions = [...questions, { ...newQuestion, id: Date.now() }];
      setQuestions(updatedQuestions);
      updateQuizQuestions(selectedSection.id, quiz.id, updatedQuestions);
      
      setNewQuestion({ text: '', options: ['', '', '', ''], correctAnswer: 0 });
      setIsAddQuestionOpen(false);
    }
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    updateQuizQuestions(selectedSection.id, quiz.id, updatedQuestions);
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/quizzes')}>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
            {quiz.title}
          </h2>
          <p className="text-secondary-500 dark:text-secondary-400">
            {quiz.date} • {quiz.duration}
          </p>
        </div>
        <Badge variant={quiz.status === 'active' ? 'success' : quiz.status === 'upcoming' ? 'warning' : 'secondary'}>
          {quiz.status === 'active' ? 'نشط' : quiz.status === 'upcoming' ? 'قادم' : 'منتهي'}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              عدد الأسئلة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{questions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500 flex items-center gap-2">
              <Users className="h-4 w-4" />
              الطلاب المشاركين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedSection.students.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-secondary-500 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              تم الحل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {Math.floor(selectedSection.students.length * 0.8)} / {selectedSection.students.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary-600" />
            لوحة تحكم الكويز
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary-50 dark:bg-secondary-800">
                <div>
                  <p className="font-medium">حالة الكويز</p>
                  <p className="text-sm text-secondary-500">
                    {quiz.status === 'active' ? 'متاح للطلاب' : 'مغلق'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`relative flex h-3 w-3`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${quiz.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${quiz.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  </span>
                  <Button 
                    size="sm" 
                    variant={quiz.status === 'active' ? 'destructive' : 'default'}
                    onClick={() => {
                      // Toggle logic would go here
                      alert('تم تغيير حالة الكويز');
                    }}
                  >
                    {quiz.status === 'active' ? 'إيقاف' : 'تفعيل'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">الحد الأقصى للطلاب</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="مثال: 50" defaultValue="100" />
                <Button variant="outline">تحديث</Button>
              </div>
              <p className="text-xs text-secondary-500">سيتم إغلاق الكويز تلقائياً عند اكتمال العدد</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-500">الطلاب النشطين الآن</span>
                <span className="font-bold text-primary-600">12</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-2 dark:bg-secondary-800">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-secondary-500">
                <span>تم التسليم: 45</span>
                <span>المتبقي: 43</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-secondary-900 dark:text-white">الأسئلة</h3>
        <Button onClick={() => setIsAddQuestionOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة سؤال
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={question.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="text-xs">سؤال {index + 1}</Badge>
                  </div>
                  <h4 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                    {question.text}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          optIndex === question.correctAnswer
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-secondary-200 bg-secondary-50 dark:border-secondary-800 dark:bg-secondary-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            optIndex === question.correctAnswer
                              ? 'bg-emerald-500 text-white'
                              : 'bg-secondary-300 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </div>
                          <span className="text-sm">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mr-4">
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDeleteQuestion(question.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isAddQuestionOpen}
        onClose={() => setIsAddQuestionOpen(false)}
        title="إضافة سؤال جديد"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">نص السؤال</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
              placeholder="اكتب السؤال هنا..."
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">الخيارات</label>
            {newQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                <Input
                  placeholder={`الخيار ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                  className="flex-1"
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={newQuestion.correctAnswer === index}
                  onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                  className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                />
              </div>
            ))}
            <p className="text-xs text-secondary-500">اختر الإجابة الصحيحة بالضغط على الدائرة</p>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-secondary-200 dark:border-secondary-800">
            <Button variant="secondary" onClick={() => setIsAddQuestionOpen(false)}>إلغاء</Button>
            <Button onClick={handleAddQuestion}>إضافة السؤال</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
