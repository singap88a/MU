import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, GraduationCap, ArrowRight, ArrowLeft, CheckCircle2, Hash } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { useSectionContext } from '../../context/SectionContext';

export default function StudentRegister() {
  const navigate = useNavigate();
  const { getSectionByCode } = useSectionContext();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sectionInfo, setSectionInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    universityId: '',
    year: '1',
    department: 'عام',
    sectionCode: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSectionCodeChange = (e) => {
    const code = e.target.value.toUpperCase();
    setFormData({...formData, sectionCode: code});
    
    if (code.length === 6) {
      // Try to get section from context first
      let section = getSectionByCode(code);
      
      // If not found in context, try localStorage directly
      if (!section) {
        const storedSections = JSON.parse(localStorage.getItem('sections_data') || '[]');
        section = storedSections.find(s => s.sectionCode === code);
      }
      
      if (section) {
        setSectionInfo(section);
        setError('');
      } else {
        setSectionInfo(null);
        setError('كود السكشن غير صحيح');
      }
    } else {
      setSectionInfo(null);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!sectionInfo) {
      setError('يجب إدخال كود سكشن صحيح');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const newStudent = { 
        ...formData, 
        id: Date.now(),
        section: sectionInfo.number, // For backward compatibility
        instructorId: sectionInfo.instructorId // Link to instructor
      };
      localStorage.setItem('students', JSON.stringify([...storedStudents, newStudent]));
      
      setIsLoading(false);
      alert('تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول');
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
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

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
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium">كود السكشن</label>
                        <div className="relative">
                          <Hash className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                          <Input 
                              required 
                              className="pr-10 font-mono uppercase"
                              placeholder="أدخل الكود المكون من 6 أحرف" 
                              maxLength={6}
                              value={formData.sectionCode}
                              onChange={handleSectionCodeChange}
                          />
                        </div>
                        {sectionInfo && (
                          <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                              ✓ سكشن {sectionInfo.number} - {sectionInfo.subject}
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                              {sectionInfo.year} • {sectionInfo.department}
                            </p>
                          </div>
                        )}
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
                                <span className="text-secondary-500 block">كود السكشن</span>
                                <span className="font-medium font-mono">{formData.sectionCode}</span>
                            </div>
                            {sectionInfo && (
                              <div className="col-span-2">
                                <span className="text-secondary-500 block">معلومات السكشن</span>
                                <span className="font-medium">
                                  {sectionInfo.subject} - {sectionInfo.year} ({sectionInfo.department})
                                </span>
                              </div>
                            )}
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
