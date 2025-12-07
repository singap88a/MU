import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export default function StudentRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    universityId: '',
    year: '1',
    department: 'عام',
    section: '1'
  });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const newStudent = { ...formData, id: Date.now() };
      localStorage.setItem('students', JSON.stringify([...storedStudents, newStudent]));
      
      setIsLoading(false);
      navigate('/login'); // Redirect to the main login page
    }, 1500);
  };

  const steps = [
    { number: 1, title: 'البيانات الشخصية', icon: User },
    { number: 2, title: 'البيانات الأكاديمية', icon: GraduationCap },
    { number: 3, title: 'تأكيد البيانات', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen flex bg-secondary-50 dark:bg-secondary-950">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-secondary-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-900/50 to-secondary-900"></div>
        
        <div className="relative z-10 flex flex-col h-full p-12 text-white">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">إنشاء حساب طالب جديد</h1>
            <p className="text-secondary-400">
              انضم إلى المنصة التعليمية وتابع محاضراتك وواجباتك بسهولة.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.number} className={`flex items-center gap-4 transition-opacity ${step >= s.number ? 'opacity-100' : 'opacity-50'}`}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.number ? 'bg-primary-600 border-primary-600' : 'border-secondary-600'}`}>
                    {step > s.number ? <CheckCircle2 className="h-6 w-6" /> : <s.icon className="h-5 w-5" />}
                 </div>
                 <div>
                    <p className="font-bold">{s.title}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-8">
            
            {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">الاسم الرباعي</label>
                        <Input 
                            required 
                            placeholder="أدخل اسمك بالكامل" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">الرقم القومي</label>
                        <Input 
                            required 
                            placeholder="14 رقم" 
                            value={formData.nationalId}
                            onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">رقم الكارنيه (ID)</label>
                        <Input 
                            required 
                            placeholder="مثال: 2020001" 
                            value={formData.universityId}
                            onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">الفرقة الدراسية</label>
                            <select 
                                className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                                value={formData.year}
                                onChange={(e) => setFormData({...formData, year: e.target.value})}
                            >
                                <option value="1">الفرقة الأولى</option>
                                <option value="2">الفرقة الثانية</option>
                                <option value="3">الفرقة الثالثة</option>
                                <option value="4">الفرقة الرابعة</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">القسم</label>
                            <select 
                                className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                                value={formData.department}
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                            >
                                <option value="عام">عام</option>
                                <option value="CS">علوم حاسب</option>
                                <option value="IS">نظم معلومات</option>
                                <option value="IT">تكنولوجيا معلومات</option>
                            </select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">السكشن</label>
                        <select 
                            className="flex h-10 w-full rounded-lg border border-secondary-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-950 dark:border-secondary-800"
                            value={formData.section}
                            onChange={(e) => setFormData({...formData, section: e.target.value})}
                        >
                            <option value="1">سكشن 1</option>
                            <option value="2">سكشن 2</option>
                            <option value="3">سكشن 3</option>
                            <option value="4">سكشن 4</option>
                            <option value="5">سكشن 5</option>
                            <option value="6">سكشن 6</option>
                        </select>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                    <div className="bg-secondary-50 dark:bg-secondary-800/50 p-6 rounded-xl space-y-4">
                        <h3 className="font-bold text-lg">مراجعة البيانات</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-secondary-500 block">الاسم</span>
                                <span className="font-medium">{formData.name}</span>
                            </div>
                            <div>
                                <span className="text-secondary-500 block">الرقم القومي</span>
                                <span className="font-medium">{formData.nationalId}</span>
                            </div>
                             <div>
                                <span className="text-secondary-500 block">الرقم الجامعي</span>
                                <span className="font-medium">{formData.universityId}</span>
                            </div>
                             <div>
                                <span className="text-secondary-500 block">الفرقة / القسم</span>
                                <span className="font-medium">{formData.year} - {formData.department}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-secondary-200 dark:border-secondary-800">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowRight className="ml-2 h-4 w-4" />
                  السابق
                </Button>
              ) : (
                <Button type="button" variant="ghost" onClick={() => navigate('/login')}>
                  إلغاء
                </Button>
              )}

              <Button type="submit" isLoading={isLoading}>
                {step === 3 ? 'إنشاء الحساب' : 'التالي'}
                {step !== 3 && <ArrowLeft className="mr-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
