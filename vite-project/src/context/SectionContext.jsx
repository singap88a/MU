import React, { createContext, useContext, useState, useEffect } from 'react';

const SectionContext = createContext();

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within SectionProvider');
  }
  return context;
};

// Mock data for sections
const sectionsData = [
  {
    id: 1,
    number: '1',
    year: 'الرابعة',
    department: 'علوم حاسب',
    subject: 'هندسة البرمجيات',
    day: 'الأحد',
    time: '08:00 ص - 10:00 ص',
    location: 'معمل 3',
    students: [
      { id: 1, name: 'أحمد محمود علي', code: '2020001', status: 'active', attendance: 9, quizzes: 4, assignments: 9 },
      { id: 2, name: 'سارة إبراهيم حسن', code: '2020002', status: 'active', attendance: 8, quizzes: 4.5, assignments: 8 },
      { id: 3, name: 'محمد سمير كمال', code: '2020003', status: 'inactive', attendance: 5, quizzes: 2.5, assignments: 6 },
    ],
    quizzes: [
      { id: 1, title: 'كويز 1: مقدمة في البرمجة', questions: 10, duration: '15 دقيقة', status: 'closed', date: '2023-11-10' },
      { id: 2, title: 'كويز 2: المتغيرات والدوال', questions: 15, duration: '20 دقيقة', status: 'active', date: '2023-11-20' },
    ],
    assignments: [
      { id: 1, title: 'تاسك 1: تصميم واجهة مستخدم', deadline: '2023-11-25', submissions: [], total: 3, status: 'active' },
      { id: 2, title: 'تاسك 2: تحليل البيانات', deadline: '2023-12-01', submissions: [], total: 3, status: 'active' },
    ],
  },
  {
    id: 2,
    number: '2',
    year: 'الثالثة',
    department: 'نظم معلومات',
    subject: 'قواعد البيانات',
    day: 'الاثنين',
    time: '10:00 ص - 12:00 م',
    location: 'معمل 5',
    students: [
      { id: 4, name: 'نور الدين علي', code: '2021001', status: 'active', attendance: 7, quizzes: 4, assignments: 8 },
      { id: 5, name: 'مريم أحمد السيد', code: '2021002', status: 'active', attendance: 9, quizzes: 5, assignments: 10 },
    ],
    quizzes: [
      { id: 3, title: 'كويز 1: SQL Basics', questions: 12, duration: '20 دقيقة', status: 'closed', date: '2023-11-05' },
    ],
    assignments: [
      { id: 3, title: 'تاسك 1: تصميم قاعدة بيانات', deadline: '2023-11-28', submissions: [], total: 2, status: 'active' },
    ],
  },
  {
    id: 3,
    number: '3',
    year: 'الرابعة',
    department: 'تكنولوجيا معلومات',
    subject: 'الشبكات',
    day: 'الثلاثاء',
    time: '12:00 م - 02:00 م',
    location: 'معمل 2',
    students: [
      { id: 6, name: 'خالد محمد', code: '2020004', status: 'active', attendance: 8, quizzes: 3.5, assignments: 7 },
      { id: 7, name: 'فاطمة علي', code: '2020005', status: 'active', attendance: 9, quizzes: 4.5, assignments: 9 },
      { id: 8, name: 'يوسف أحمد', code: '2020006', status: 'active', attendance: 6, quizzes: 3, assignments: 5 },
    ],
    quizzes: [
      { id: 4, title: 'كويز 1: OSI Model', questions: 8, duration: '15 دقيقة', status: 'closed', date: '2023-11-08' },
      { id: 5, title: 'كويز 2: TCP/IP', questions: 10, duration: '15 دقيقة', status: 'upcoming', date: '2023-11-22' },
    ],
    assignments: [
      { id: 4, title: 'تاسك 1: Network Design', deadline: '2023-11-30', submissions: [], total: 3, status: 'active' },
    ],
  },
];

export const SectionProvider = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sections, setSections] = useState(sectionsData);

  // Load students from localStorage and merge with sections
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    
    if (storedStudents.length > 0) {
      setSections(prevSections => {
        return prevSections.map(section => {
          // Find students belonging to this section
          const sectionStudents = storedStudents.filter(s => s.section === section.number);
          
          if (sectionStudents.length > 0) {
            // Map stored students to match the structure expected by the dashboard
            const formattedStudents = sectionStudents.map(s => ({
              id: s.universityId, // Use universityId as ID
              name: s.name,
              code: s.universityId,
              status: 'active',
              attendance: 0, // Default values
              quizzes: 0,
              assignments: 0
            }));

            // Merge with existing students, avoiding duplicates
            const existingIds = new Set(section.students.map(s => s.code));
            const newStudents = formattedStudents.filter(s => !existingIds.has(s.code));
            
            if (newStudents.length > 0) {
              return {
                ...section,
                students: [...section.students, ...newStudents]
              };
            }
          }
          return section;
        });
      });
    }
  }, []); // Run once on mount

  useEffect(() => {
    // Load selected section from localStorage
    const savedSectionId = localStorage.getItem('selectedSectionId');
    if (savedSectionId) {
      const section = sections.find(s => s.id === parseInt(savedSectionId));
      if (section) {
        setSelectedSection(section);
      }
    }
  }, [sections]);

  const selectSection = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setSelectedSection(section);
      localStorage.setItem('selectedSectionId', sectionId);
    }
  };

  const clearSection = () => {
    setSelectedSection(null);
    localStorage.removeItem('selectedSectionId');
  };

  const addAssignment = (sectionId, assignment) => {
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            assignments: [...section.assignments, { ...assignment, id: Date.now(), submissions: 0, status: 'active' }]
          };
        }
        return section;
      });
      
      if (selectedSection && selectedSection.id === sectionId) {
        setSelectedSection(updatedSections.find(s => s.id === sectionId));
      }
      
      localStorage.setItem('sections_data', JSON.stringify(updatedSections));
      return updatedSections;
    });
  };

  const addQuiz = (sectionId, quiz) => {
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            quizzes: [...section.quizzes, { ...quiz, id: Date.now(), status: 'upcoming', questions: [] }]
          };
        }
        return section;
      });

      if (selectedSection && selectedSection.id === sectionId) {
        setSelectedSection(updatedSections.find(s => s.id === sectionId));
      }

      localStorage.setItem('sections_data', JSON.stringify(updatedSections));
      return updatedSections;
    });
  };

  const updateQuizQuestions = (sectionId, quizId, questions) => {
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            quizzes: section.quizzes.map(q => {
              if (q.id === quizId) {
                return { ...q, questions: questions };
              }
              return q;
            })
          };
        }
        return section;
      });

      if (selectedSection && selectedSection.id === sectionId) {
        setSelectedSection(updatedSections.find(s => s.id === sectionId));
      }

      localStorage.setItem('sections_data', JSON.stringify(updatedSections));
      return updatedSections;
    });
  };

  const submitAssignment = (sectionId, assignmentId, submission) => {
    setSections(prevSections => {
      const updatedSections = prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            assignments: section.assignments.map(a => {
              if (a.id === assignmentId) {
                return { 
                  ...a, 
                  submissions: [...(a.submissions || []), { ...submission, id: Date.now(), date: new Date().toISOString() }] 
                };
              }
              return a;
            })
          };
        }
        return section;
      });

      if (selectedSection && selectedSection.id === sectionId) {
        setSelectedSection(updatedSections.find(s => s.id === sectionId));
      }

      localStorage.setItem('sections_data', JSON.stringify(updatedSections));
      return updatedSections;
    });
  };

  return (
    <SectionContext.Provider value={{ selectedSection, sections, selectSection, clearSection, addAssignment, addQuiz, updateQuizQuestions, submitAssignment }}>
      {children}
    </SectionContext.Provider>
  );
};
