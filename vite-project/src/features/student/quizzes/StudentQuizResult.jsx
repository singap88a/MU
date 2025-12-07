import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Home, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';

export default function StudentQuizResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return navigate('/student/dashboard');

  const { score, total, quizTitle } = state;
  const percentage = (score / total) * 100;
  const isPassed = percentage >= 50;

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center overflow-hidden">
        <div className={`h-32 flex items-center justify-center ${isPassed ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {isPassed ? (
            <CheckCircle2 className="h-20 w-20 text-white animate-bounce" />
          ) : (
            <XCircle className="h-20 w-20 text-white animate-pulse" />
          )}
        </div>
        
        <CardContent className="pt-12 pb-8 px-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
              {isPassed ? 'مبروك! لقد اجتزت الاختبار' : 'للأسف، لم تجتز الاختبار'}
            </h1>
            <p className="text-secondary-500">{quizTitle}</p>
          </div>

          <div className="flex justify-center">
            <div className="relative h-40 w-40 flex items-center justify-center rounded-full border-8 border-secondary-100 dark:border-secondary-800">
              <div className="text-center">
                <span className={`text-4xl font-bold block ${isPassed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {percentage}%
                </span>
                <span className="text-sm text-secondary-400">النتيجة النهائية</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-secondary-50 dark:bg-secondary-900 p-4 rounded-xl">
            <div>
              <p className="text-secondary-500">الإجابات الصحيحة</p>
              <p className="font-bold text-lg">{score}</p>
            </div>
            <div>
              <p className="text-secondary-500">إجمالي الأسئلة</p>
              <p className="font-bold text-lg">{total}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1" onClick={() => navigate('/student/dashboard')}>
              <Home className="ml-2 h-4 w-4" />
              العودة للرئيسية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
