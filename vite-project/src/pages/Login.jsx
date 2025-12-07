import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'student'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nationalId: '',
    universityId: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'admin') {
        // Admin Login Logic
        if (formData.email === 'admin@edu.eg' && formData.password === '123456') {
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/admin');
        } else {
          alert('بيانات الدخول غير صحيحة (جرب admin@edu.eg / 123456)');
        }
      } else {
        // Student Login Logic
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        const student = storedStudents.find(
          s => s.nationalId === formData.nationalId && s.universityId === formData.universityId
        );

        if (student) {
          localStorage.setItem('currentUser', JSON.stringify(student));
          navigate('/student/dashboard');
        } else {
          alert('بيانات الطالب غير صحيحة');
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-secondary-50 dark:bg-secondary-950">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-600">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          <div>
            <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">بوابة التعليم الجامعي</h1>
            <p className="text-primary-100 text-lg max-w-md">
              منصة تعليمية متكاملة لإدارة المحاضرات، الكويزات، والواجبات بأحدث التقنيات.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">نظام آمن ومحمي</h3>
                <p className="text-sm text-primary-200">بياناتك مشفرة ومحمية بأعلى المعايير</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-right">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">تسجيل الدخول</h2>
            <p className="mt-2 text-secondary-500 dark:text-secondary-400">
              مرحباً بك مجدداً، قم باختيار نوع الحساب للمتابعة
            </p>
          </div>

          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-secondary-100 dark:bg-secondary-800 rounded-xl">
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'admin'
                  ? 'bg-white dark:bg-secondary-700 text-primary-600 shadow-sm'
                  : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              عضو هيئة تدريس
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'student'
                  ? 'bg-white dark:bg-secondary-700 text-primary-600 shadow-sm'
                  : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              طالب
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'admin' ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      type="email" 
                      className="pr-10" 
                      placeholder="name@university.edu.eg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      className="pr-10" 
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">الرقم القومي</label>
                  <Input 
                    placeholder="أدخل الرقم القومي المكون من 14 رقم"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">رقم الكارنيه الجامعي</label>
                  <Input 
                    placeholder="مثال: 2020001"
                    value={formData.universityId}
                    onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full h-11 text-base" isLoading={isLoading}>
              {isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
              {!isLoading && <ArrowRight className="mr-2 h-5 w-5" />}
            </Button>

            {activeTab === 'student' && (
              <p className="text-center text-sm text-secondary-500">
                ليس لديك حساب؟{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/student/register')} 
                  className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
                >
                  تسجيل حساب جديد
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
