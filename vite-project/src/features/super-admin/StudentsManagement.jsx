import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  GraduationCap
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Load students either from main students list or aggregate from sections
    // In this app structure, we might look at both.
    // For now, let's look at sections which contain students as per SectionContext structure
    const storedSections = JSON.parse(localStorage.getItem('sections_data') || '[]');
    setSections(storedSections);
    
    // Flatten students from all sections
    let allStudents = [];
    storedSections.forEach(section => {
      if (section.students) {
        const enrichedStudents = section.students.map(s => ({
            ...s,
            sectionCode: section.sectionCode,
            sectionName: section.subject,
            instructorId: section.instructorId
        }));
        allStudents = [...allStudents, ...enrichedStudents];
      }
    });
    
    // Also merge with any standalone registered students if stored separately?
    // User auth uses 'students' key in localStorage for verification
    // Let's create a unified view
    const authStudents = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Just use authStudents as the master list of accounts, and potentially join with section info
    // Actually, authStudents has 'code' (universityId) and 'section' (number).
    // Let's display authStudents as they are the registered users.
    setStudents(authStudents);

  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.universityId.includes(searchQuery) ||
    s.nationalId.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">إدارة الطلاب</h1>
          <p className="text-secondary-500">عرض جميع الطلاب المسجلين في المنصة</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-1">
          {students.length} طالب
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="بحث بالاسم، الرقم الجامعي، أو الرقم القومي..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-secondary-400" />
            </div>
            {/* Could add filters by year/department here */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="border-b border-secondary-200 dark:border-secondary-800">
                <tr>
                  <th className="py-3 px-4 font-semibold text-secondary-900 dark:text-white">الطالب</th>
                  <th className="py-3 px-4 font-semibold text-secondary-900 dark:text-white">الرقم الجامعي</th>
                  <th className="py-3 px-4 font-semibold text-secondary-900 dark:text-white">الفرقة / القسم</th>
                  <th className="py-3 px-4 font-semibold text-secondary-900 dark:text-white">السكشن</th>
                  <th className="py-3 px-4 font-semibold text-secondary-900 dark:text-white">تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-secondary-500">
                      لا توجد بيانات مطابقة
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, idx) => (
                    <tr key={idx} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-secondary-600">
                            <Users className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900 dark:text-white">{student.name}</p>
                            <p className="text-xs text-secondary-500">{student.nationalId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono">{student.universityId}</td>
                      <td className="py-3 px-4">
                        <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs dark:bg-primary-900/20">
                          {student.year} - {student.department}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                           <span className="font-bold">سكشن {student.section}</span>
                           {student.sectionCode && <Badge variant="outline" className="text-xs font-mono">{student.sectionCode}</Badge>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-secondary-500 text-sm">
                        {student.createdAt ? new Date(student.createdAt).toLocaleDateString('ar-EG') : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
