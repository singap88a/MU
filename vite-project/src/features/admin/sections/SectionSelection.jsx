import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSectionContext } from '../../../context/SectionContext';
import { useInstructorContext } from '../../../context/InstructorContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Calendar, Clock, MapPin, BookOpen, Users, GraduationCap, Copy, Check, LogOut } from 'lucide-react';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { Button } from '../../../components/ui/Button';

import { Modal } from '../../../components/ui/Modal';
import { Plus } from 'lucide-react';

export default function SectionSelection() {
  const { getInstructorSections, selectSection, addSection } = useSectionContext();
  const { currentInstructor, logoutInstructor } = useInstructorContext();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSectionData, setNewSectionData] = useState({
    number: '',
    year: '',
    department: '',
    subject: '',
    day: '',
    time: '',
    location: ''
  });

  const handleAddSectionSubmit = (e) => {
    e.preventDefault();
    if (Object.values(newSectionData).some(val => !val)) {
        alert("يرجى ملء جميع الحقول");
        return;
    }
    
    addSection({
        ...newSectionData,
        instructorId: currentInstructor.id
    });
    
    setIsAddModalOpen(false);
    setNewSectionData({
        number: '',
        year: '',
        department: '',
        subject: '',
        day: '',
        time: '',
        location: ''
    });
  };

  // Filter sections by current instructor
  const instructorSections = currentInstructor 
    ? getInstructorSections(currentInstructor.id) 
    : [];

  const handleSelectSection = (sectionId) => {
    selectSection(sectionId);
    navigate('/instructor-dashboard');
  };

  const handleCopyCode = (code, e) => {
    e.stopPropagation(); // Prevent card click
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLogout = () => {
    logoutInstructor();
    navigate('/');
  };

  if (!currentInstructor) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 p-6">
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>
      
      <div className="absolute top-4 right-4">
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Button>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-8 relative">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-4">
            <GraduationCap className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-2">
            مرحباً، {currentInstructor.name}
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400 text-lg mb-6">
            اختر السكشن للبدء في الإدارة
          </p>
          
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 mx-auto bg-primary-600 hover:bg-primary-700 text-white"
          >
            <Plus className="w-4 h-4" />
            إضافة سكشن جديد
          </Button>
        </div>

        {instructorSections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary-500 dark:text-secondary-400 text-lg mb-4">
              لا توجد سكاشن مسجلة بعد
            </p>
            <p className="text-sm text-secondary-400">
              ابدأ بإضافة سكشن جديد
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instructorSections.map((section) => (
              <Card
                key={section.id}
                className="cursor-pointer transition-all hover:shadow-xl hover:scale-105 hover:border-primary-300 dark:hover:border-primary-700"
                onClick={() => handleSelectSection(section.id)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary-700 dark:text-primary-500">
                        سكشن {section.number}
                      </CardTitle>
                      <p className="text-sm text-secondary-500 mt-1">{section.subject}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                      {section.location}
                    </Badge>
                  </div>
                  
                  {/* Section Code */}
                  <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-primary-600 dark:text-primary-400 font-medium block mb-1">
                        كود السكشن
                      </span>
                      <span className="text-lg font-bold text-primary-700 dark:text-primary-300 font-mono">
                        {section.sectionCode}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleCopyCode(section.sectionCode, e)}
                      className="p-2 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                      title="نسخ الكود"
                    >
                      {copiedCode === section.sectionCode ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      )}
                    </button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <GraduationCap className="w-4 h-4 text-secondary-400" />
                      <span>{section.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <BookOpen className="w-4 h-4 text-secondary-400" />
                      <span>{section.department}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-secondary-200 dark:border-secondary-800">
                    <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <Calendar className="w-4 h-4 text-secondary-400" />
                      <span>{section.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <Clock className="w-4 h-4 text-secondary-400" />
                      <span>{section.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <MapPin className="w-4 h-4 text-secondary-400" />
                      <span>{section.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-secondary-200 dark:border-secondary-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
                        <Users className="w-4 h-4" />
                        <span>{section.students.length} طالب</span>
                      </div>
                      <div className="text-xs text-secondary-500">
                        {section.quizzes.length} كويز • {section.assignments.length} تاسك
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="إضافة سكشن جديد"
        className="max-w-2xl"
      >
        <form onSubmit={handleAddSectionSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">رقم السكشن</label>
                    <select
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.number}
                        onChange={(e) => setNewSectionData({...newSectionData, number: e.target.value})}
                    >
                        <option value="">اختر الرقم</option>
                        {[...Array(20)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">السنة الدراسية</label>
                    <select
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.year}
                        onChange={(e) => setNewSectionData({...newSectionData, year: e.target.value})}
                    >
                        <option value="">اختر السنة</option>
                        <option value="الاولى">الفرقة الاولى</option>
                        <option value="الثانية">الفرقة الثانية</option>
                        <option value="الثالثة">الفرقة الثالثة</option>
                        <option value="الرابعة">الفرقة الرابعة</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">القسم</label>
                    <select
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.department}
                        onChange={(e) => setNewSectionData({...newSectionData, department: e.target.value})}
                    >
                        <option value="">اختر القسم</option>
                        <option value="عام">عام</option>
                        <option value="علوم حاسب">علوم حاسب</option>
                        <option value="نظم معلومات">نظم معلومات</option>
                        <option value="تكنولوجيا معلومات">تكنولوجيا معلومات</option>
                        <option value="ذكاء اصطناعي">ذكاء اصطناعي</option>
                        <option value="دعم اتخاذ القرار">دعم اتخاذ القرار</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">المادة</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.subject}
                        onChange={(e) => setNewSectionData({...newSectionData, subject: e.target.value})}
                        placeholder="مثال: هندسة البرمجيات"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">اليوم</label>
                    <select
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.day}
                        onChange={(e) => setNewSectionData({...newSectionData, day: e.target.value})}
                    >
                        <option value="">اختر اليوم</option>
                        <option value="السبت">السبت</option>
                        <option value="الأحد">الأحد</option>
                        <option value="الاثنين">الاثنين</option>
                        <option value="الثلاثاء">الثلاثاء</option>
                        <option value="الأربعاء">الأربعاء</option>
                        <option value="الخميس">الخميس</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">الوقت</label>
                    <select
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.time}
                        onChange={(e) => setNewSectionData({...newSectionData, time: e.target.value})}
                    >
                        <option value="">اختر الوقت</option>
                        <option value="08:00 ص - 10:00 ص">08:00 ص - 10:00 ص</option>
                        <option value="10:00 ص - 12:00 م">10:00 ص - 12:00 م</option>
                        <option value="12:00 م - 02:00 م">12:00 م - 02:00 م</option>
                        <option value="02:00 م - 04:00 م">02:00 م - 04:00 م</option>
                        <option value="04:00 م - 06:00 م">04:00 م - 06:00 م</option>
                    </select>
                </div>
                <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">المكان (المعمل/القاعة)</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={newSectionData.location}
                        onChange={(e) => setNewSectionData({...newSectionData, location: e.target.value})}
                        placeholder="مثال: معمل 3"
                    />
                </div>
            </div>
            <div className="flex justify-end pt-4 gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    إلغاء
                </Button>
                <Button type="submit">
                    إضافة السكشن
                </Button>
            </div>
        </form>
      </Modal>
    </div>
  );
}
