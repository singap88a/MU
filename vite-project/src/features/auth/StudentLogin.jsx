import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { CreditCard, Lock, GraduationCap } from 'lucide-react';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nationalId: '',
    universityId: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const student = students.find(
        s => s.nationalId === formData.nationalId && s.universityId === formData.universityId
      );

      if (student) {
        localStorage.setItem('currentUser', JSON.stringify(student));
        navigate('/student/dashboard');
      } else {
        setError('بيانات الدخول غير صحيحة. تأكد من الرقم القومي ورقم الكارنيه.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">بوابة الطلاب</h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">سجل دخولك لمتابعة درجاتك واختباراتك</p>
        </div>

        <Card className="shadow-xl border-0 ring-1 ring-secondary-200 dark:ring-secondary-800">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">الرقم القومي</label>
                <Input
                  name="nationalId"
                  placeholder="أدخل الرقم القومي"
                  icon={CreditCard}
                  required
                  value={formData.nationalId}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">رقم الكارنيه</label>
                <Input
                  name="universityId"
                  placeholder="أدخل رقم الكارنيه"
                  icon={Lock}
                  required
                  value={formData.universityId}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white" type="submit" isLoading={isLoading}>
                دخول
              </Button>
              <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
                ليس لديك حساب؟{' '}
                <Link to="/student/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  تسجيل حساب جديد
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
