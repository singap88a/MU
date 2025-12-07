import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, FileText, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useSectionContext } from '../context/SectionContext';

export default function Quizzes() {
  const { selectedSection, addQuiz } = useSectionContext();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    marks: 5,
    duration: 15
  });

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    addQuiz(selectedSection.id, {
      title: newQuiz.title,
      questions: [], // Initial empty questions
      duration: `${newQuiz.duration} دقيقة`,
      date: new Date().toISOString().split('T')[0], // Today's date
      status: 'upcoming'
    });
    setIsCreateModalOpen(false);
    setNewQuiz({ title: '', marks: 5, duration: 15 });
  };

  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-secondary-500">لم يتم اختيار سكشن</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 dark:text-white">
            إدارة الكويزات - سكشن {selectedSection.number}
          </h2>
          <p className="text-secondary-500 dark:text-secondary-400">
            {selectedSection.subject} • {selectedSection.quizzes.length} كويز
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إنشاء كويز جديد
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedSection.quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant={
                  quiz.status === 'active' ? 'success' : 
                  quiz.status === 'upcoming' ? 'warning' : 'secondary'
                }>
                  {quiz.status === 'active' ? 'نشط الآن' : 
                   quiz.status === 'upcoming' ? 'قادم' : 'منتهي'}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="mt-2">{quiz.title}</CardTitle>
              <CardDescription>{quiz.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-secondary-500">
                <div className="flex items-center">
                  <FileText className="ml-1 h-4 w-4" />
                  {quiz.questions ? quiz.questions.length : 0} سؤال
                </div>
                <div className="flex items-center">
                  <Clock className="ml-1 h-4 w-4" />
                  {quiz.duration}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" onClick={() => navigate(`/admin/quizzes/${quiz.id}`)}>
                عرض التفاصيل
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="إنشاء كويز جديد"
        className="max-w-2xl"
      >
        <form onSubmit={handleCreateQuiz} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان الكويز</label>
            <Input 
              placeholder="مثال: كويز 1: مقدمة في البرمجة" 
              value={newQuiz.title}
              onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">عدد الدرجات</label>
              <Input 
                type="number" 
                placeholder="5" 
                value={newQuiz.marks}
                onChange={(e) => setNewQuiz({...newQuiz, marks: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">مدة الكويز (بالدقائق)</label>
              <Input 
                type="number" 
                placeholder="15" 
                value={newQuiz.duration}
                onChange={(e) => setNewQuiz({...newQuiz, duration: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end gap-2 border-t border-secondary-200 mt-4 dark:border-secondary-800">
            <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>إلغاء</Button>
            <Button type="submit">إنشاء الكويز</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
