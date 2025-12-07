import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function StudentQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch quiz from localStorage
    const storedSections = JSON.parse(localStorage.getItem('sections_data') || '[]');
    let foundQuiz = null;
    
    for (const section of storedSections) {
      const q = section.quizzes?.find(q => q.id === parseInt(quizId));
      if (q) {
        foundQuiz = q;
        break;
      }
    }

    if (foundQuiz) {
      setQuiz(foundQuiz);
    }
  }, [quizId]);

  if (!quiz) return <div className="flex items-center justify-center h-screen">جاري التحميل...</div>;

  // If no questions, show message
  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <p>عفواً، لا توجد أسئلة في هذا الاختبار حالياً.</p>
        <Button onClick={() => navigate('/student/dashboard')}>العودة للرئيسية</Button>
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [currentQuestion]: index });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Calculate Score
    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });

    setTimeout(() => {
      navigate('/student/quiz/result', { 
        state: { 
          score, 
          total: quiz.questions.length,
          quizTitle: quiz.title 
        } 
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg text-secondary-900 dark:text-white">{quiz.title}</h1>
            <p className="text-sm text-secondary-500">سؤال {currentQuestion + 1} من {quiz.questions.length}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-600'}`}>
            <Clock className="h-5 w-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-6 leading-relaxed">
              {quiz.questions[currentQuestion].text}
            </h2>
            
            <div className="space-y-3">
              {quiz.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between ${
                    answers[currentQuestion] === idx 
                      ? 'border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/20' 
                      : 'border-secondary-200 hover:border-primary-300 dark:border-secondary-700'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {answers[currentQuestion] === idx && <CheckCircle2 className="h-5 w-5 text-primary-600" />}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronRight className="ml-2 h-4 w-4" />
            السابق
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button 
              onClick={handleSubmit} 
              isLoading={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              تسليم الاختبار
            </Button>
          ) : (
            <Button 
              onClick={() => setCurrentQuestion(prev => Math.min(quiz.questions.length - 1, prev + 1))}
            >
              التالي
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </main>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-secondary-200 dark:bg-secondary-800">
        <div 
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
