import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSectionContext } from '../../../context/SectionContext';
import { useInstructorContext } from '../../../context/InstructorContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Calendar, Clock, MapPin, BookOpen, Users, GraduationCap, Copy, Check, LogOut } from 'lucide-react';
import { ThemeToggle } from '../../../components/ThemeToggle';
import { Button } from '../../../components/ui/Button';

export default function SectionSelection() {
  const { getInstructorSections, selectSection } = useSectionContext();
  const { currentInstructor, logoutInstructor } = useInstructorContext();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

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
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/20 mb-4">
            <GraduationCap className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-2">
            مرحباً، {currentInstructor.name}
          </h1>
          <p className="text-secondary-500 dark:text-secondary-400 text-lg">
            اختر السكشن للبدء في الإدارة
          </p>
        </div>

        {instructorSections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary-500 dark:text-secondary-400 text-lg mb-4">
              لا توجد سكاشن مسجلة بعد
            </p>
            <p className="text-sm text-secondary-400">
              سيتم إضافة السكاشن قريباً
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
    </div>
  );
}
