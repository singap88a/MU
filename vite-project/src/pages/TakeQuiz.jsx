import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

// Mock quiz data - في التطبيق الحقيقي سيتم جلبها من API
const mockQuiz = {
  id: 1,
  title: 'كويز 1: مقدمة في البرمجة',
  duration: '15 دقيقة',
  questions: [
    {
      id: 1,
      text: 'ما هي لغة البرمجة المستخدمة في تطوير تطبيقات الويب؟',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: 'ما هو الفرق بين let و const في JavaScript؟',
      options: ['لا يوجد فرق', 'const للثوابت', 'let للثوابت', 'كلاهما متشابهان'],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: 'ما هو DOM في JavaScript؟',
      options: ['Data Object Model', 'Document Object Model', 'Digital Object Model', 'Dynamic Object Model'],
      correctAnswer: 1,
    },
  ],
};

export default function TakeQuiz() {
  const { sectionId, quizId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  React.useEffect(() => {
    if (hasStarted && !isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasStarted, isSubmitted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">{mockQuiz.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الاسم</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                placeholder="أدخل اسمك"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">رقم الكارنيه</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                placeholder="أدخل رقم الكارنيه"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
              />
            </div>
            <div className="bg-secondary-100 dark:bg-secondary-800 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">معلومات الكويز:</p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">• عدد الأسئلة: {mockQuiz.questions.length}</p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">• المدة: {mockQuiz.duration}</p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">• لا يمكن العودة للسؤال بعد الإجابة عليه</p>
            </div>
            <Button 
              className="w-full" 
              onClick={() => setHasStarted(true)}
              disabled={!studentName || !studentCode}
            >
              بدء الكويز
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    const score = calculateScore();
    const percentage = (score / mockQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              percentage >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {percentage >= 70 ? <CheckCircle className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
            </div>
            <h2 className="text-2xl font-bold mb-2">تم إرسال الإجابات!</h2>
            <p className="text-secondary-500 mb-6">شكراً {studentName}</p>
            <div className="bg-secondary-100 dark:bg-secondary-800 p-6 rounded-lg">
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">النتيجة</p>
              <p className="text-4xl font-bold text-primary-600">{score} / {mockQuiz.questions.length}</p>
              <p className="text-sm text-secondary-500 mt-2">{percentage.toFixed(0)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = mockQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">{mockQuiz.title}</h1>
            <p className="text-sm text-secondary-500">الطالب: {studentName}</p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-secondary-900 px-4 py-2 rounded-lg border border-secondary-200 dark:border-secondary-800">
            <Clock className="w-5 h-5 text-primary-600" />
            <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="h-2 bg-secondary-200 dark:bg-secondary-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-secondary-500 mt-2">
            السؤال {currentQuestion + 1} من {mockQuiz.questions.length}
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-6">
              {question.text}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`w-full p-4 text-right rounded-lg border-2 transition-all ${
                    answers[question.id] === index
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-secondary-200 hover:border-primary-300 dark:border-secondary-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      answers[question.id] === index
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-200 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            السابق
          </Button>
          {currentQuestion === mockQuiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={!answers[question.id] && answers[question.id] !== 0}>
              إرسال الإجابات
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!answers[question.id] && answers[question.id] !== 0}
            >
              التالي
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
