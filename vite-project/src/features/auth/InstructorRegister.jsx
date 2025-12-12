import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, GraduationCap, ArrowRight, ArrowLeft, CheckCircle2, Building2, Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useInstructorContext } from '../../context/InstructorContext';

export default function InstructorRegister() {
  const navigate = useNavigate();
  const { registerInstructor } = useInstructorContext();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    department: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('كلمة المرور غير متطابقة');
        return;
      }
      if (formData.password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      try {
        // Here we would upload the file to storage
        // For simulation, we'll just proceed
        
        registerInstructor({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          university: formData.university,
          department: formData.department,
          status: 'pending', // Important: New pending status
          proofFile: formData.proofFile ? URL.createObjectURL(formData.proofFile) : null // Simulate file URL
        });
        
        setIsLoading(false);
        // Show success confirmation instead of immediate login redirect
        alert('تم إرسال طلبك بنجاح! سيتم مراجعته وإبلاغك عند التفعيل.');
        navigate('/');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }, 1500);
  };


  const steps = [
    { number: 1, title: 'البيانات الشخصية', icon: User },
    { number: 2, title: 'البيانات الأكاديمية', icon: Building2 },
    { number: 3, title: 'تأكيد البيانات', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen flex bg-secondary-50 dark:bg-secondary-950">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-primary-600">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 flex flex-col h-full p-12 text-white">
          <div className="mb-12">
            <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">إنشاء حساب معيد جديد</h1>
            <p className="text-primary-100">
              انضم إلى منصة التعليم وأنشئ سكاشنك الخاصة وإدارة طلابك بكل سهولة.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.number} className={`flex items-center gap-4 transition-opacity ${step >= s.number ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.number ? 'bg-white/20 border-white' : 'border-white/30'}`}>
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
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      required 
                      className="pr-10"
                      placeholder="أدخل اسمك الكامل" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      required 
                      type="email"
                      className="pr-10"
                      placeholder="email@university.edu.eg" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      required 
                      type="password"
                      className="pr-10"
                      placeholder="6 أحرف على الأقل" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      required 
                      type="password"
                      className="pr-10"
                      placeholder="أعد إدخال كلمة المرور" 
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-8 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">الجامعة (اختياري)</label>
                  <div className="relative">
                    <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      className="pr-10"
                      placeholder="مثال: جامعة القاهرة" 
                      value={formData.university}
                      onChange={(e) => setFormData({...formData, university: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">القسم (اختياري)</label>
                  <div className="relative">
                    <GraduationCap className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <Input 
                      className="pr-10"
                      placeholder="مثال: علوم الحاسب" 
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="bg-secondary-50 dark:bg-secondary-800/50 p-6 rounded-xl space-y-4">
                  <h3 className="font-bold text-lg text-secondary-900 dark:text-white">إثبات الهوية</h3>
                  <p className="text-secondary-500 text-sm">
                    يرجى رفع صورة لإثبات الهوية (كارنيه الجامعة أو البطاقة الشخصية) ليتم مراجعة طلبك من قبل المشرفين.
                  </p>
                  
                  <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-700 rounded-lg p-8 text-center hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-white dark:bg-secondary-900">
                    <input 
                      type="file" 
                      id="proof-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => setFormData({...formData, proofFile: e.target.files[0]})}
                    />
                    <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        {formData.proofFile ? (
                          <span className="text-emerald-600 font-bold">{formData.proofFile.name}</span>
                        ) : (
                          <>
                            <p className="font-bold text-secondary-900 dark:text-white mb-1">اضغط لرفع الصورة</p>
                            <p className="text-secondary-500 text-xs">JPG, PNG بحد أقصى 5MB</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex gap-3">
                   <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-1 h-fit">
                     <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                   </div>
                   <div className="text-sm">
                     <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">تنبيه هام</p>
                     <p className="text-blue-700 dark:text-blue-400">
                       سيتم مراجعة طلبك يدويًا من قبل إدارة المنصة. ستصلك رسالة عبر البريد الإلكتروني عند الموافقة على الطلب وتمكينك من الدخول.
                     </p>
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
                <Button type="button" variant="ghost" onClick={() => navigate('/')}>
                  إلغاء
                </Button>
              )}

              <Button type="submit" isLoading={isLoading} disabled={step === 3 && !formData.proofFile}>
                {step === 3 ? 'إرسال الطلب للمراجعة' : 'التالي'}
                {step !== 3 && <ArrowLeft className="mr-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
