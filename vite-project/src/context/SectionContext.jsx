import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateSectionCode } from '../lib/instructorUtils';

const SectionContext = createContext();

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within SectionProvider');
  }
  return context;
};

// Default instructor ID for migrating existing sections
const DEFAULT_INSTRUCTOR_ID = 1;

// Mock data for sections - will be migrated to default instructor
const sectionsData = [
  {
    id: 1,
    instructorId: DEFAULT_INSTRUCTOR_ID,
    sectionCode: 'ABC123',
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
      { 
        id: 1, 
        title: 'كويز 1: مقدمة في البرمجة', 
        questions: 10, 
        duration: '15 دقيقة', 
        status: 'closed', 
        date: '2023-11-10',
        questionsData: []
      },
      { 
        id: 2, 
        title: 'كويز 2: المتغيرات والدوال', 
        questions: 15, 
        duration: '20 دقيقة', 
        status: 'active', 
        date: '2023-11-20',
        questionsData: [
          {
            id: 1,
            question: 'ما هي المتغيرات في البرمجة؟',
            type: 'multiple',
            options: [
              'مساحات لتخزين البيانات',
              'أوامر لتنفيذ العمليات',
              'وظائف لمعالجة البيانات',
              'ملفات لحفظ الكود'
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            question: 'أي من الأنواع التالية يستخدم لتخزين النصوص؟',
            type: 'multiple',
            options: ['int', 'string', 'boolean', 'float'],
            correctAnswer: 1
          },
          {
            id: 3,
            question: 'ما هو الناتج من العملية: 5 + 3 * 2',
            type: 'multiple',
            options: ['16', '11', '13', '10'],
            correctAnswer: 1
          },
          {
            id: 4,
            question: 'ما هي الدالة (Function)؟',
            type: 'multiple',
            options: [
              'مجموعة من الأوامر المجمعة معاً',
              'متغير يحتوي على قيمة',
              'نوع من أنواع البيانات',
              'طريقة لكتابة التعليقات'
            ],
            correctAnswer: 0
          },
          {
            id: 5,
            question: 'أي رمز يستخدم للتعليق في JavaScript؟',
            type: 'multiple',
            options: ['#', '//', '/*', '%%'],
            correctAnswer: 1
          },
          {
            id: 6,
            question: 'ما هو Boolean؟',
            type: 'multiple',
            options: [
              'نوع بيانات يحتوي فقط على true أو false',
              'نوع بيانات للأرقام',
              'نوع بيانات للنصوص',
              'نوع بيانات للقوائم'
            ],
            correctAnswer: 0
          },
          {
            id: 7,
            question: 'ما الفرق بين == و ===؟',
            type: 'multiple',
            options: [
              'لا يوجد فرق',
              '=== تقارن القيمة والنوع معاً',
              '== أسرع في التنفيذ',
              '=== تستخدم فقط مع الأرقام'
            ],
            correctAnswer: 1
          },
          {
            id: 8,
            question: 'كيف نعلن عن متغير في JavaScript؟',
            type: 'multiple',
            options: ['var x', 'let x', 'const x', 'كل ما سبق'],
            correctAnswer: 3
          },
          {
            id: 9,
            question: 'ما هي قيمة x بعد: let x = 10; x += 5;',
            type: 'multiple',
            options: ['10', '15', '5', '105'],
            correctAnswer: 1
          },
          {
            id: 10,
            question: 'ما هو typeof operator؟',
            type: 'multiple',
            options: [
              'يستخدم لمعرفة نوع البيانات',
              'يستخدم لتحويل البيانات',
              'يستخدم لحذف المتغيرات',
              'يستخدم لطباعة البيانات'
            ],
            correctAnswer: 0
          }
        ]
      },
    ],
    assignments: [
      { id: 1, title: 'تاسك 1: تصميم واجهة مستخدم', deadline: '2023-11-25', submissions: [], total: 3, status: 'active' },
      { id: 2, title: 'تاسك 2: تحليل البيانات', deadline: '2023-12-01', submissions: [], total: 3, status: 'active' },
    ],
  },
  {
    id: 2,
    instructorId: DEFAULT_INSTRUCTOR_ID,
    sectionCode: 'DEF456',
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
      { 
        id: 3, 
        title: 'كويز 1: SQL Basics', 
        questions: 12, 
        duration: '20 دقيقة', 
        status: 'active', 
        date: '2023-11-05',
        questionsData: [
          {
            id: 1,
            question: 'ما هو SQL؟',
            type: 'multiple',
            options: [
              'لغة للاستعلام عن قواعد البيانات',
              'لغة برمجة كائنية',
              'نظام تشغيل',
              'أداة تصميم'
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            question: 'ما الأمر المستخدم لاسترجاع البيانات من جدول؟',
            type: 'multiple',
            options: ['GET', 'RETRIEVE', 'SELECT', 'FETCH'],
            correctAnswer: 2
          },
          {
            id: 3,
            question: 'ما هو Primary Key؟',
            type: 'multiple',
            options: [
              'مفتاح فريد لتحديد السجلات',
              'كلمة مرور الجدول',
              'نوع من البيانات',
              'أمر SQL'
            ],
            correctAnswer: 0
          },
          {
            id: 4,
            question: 'ما الأمر لإضافة سجل جديد؟',
            type: 'multiple',
            options: ['ADD', 'INSERT', 'CREATE', 'NEW'],
            correctAnswer: 1
          },
          {
            id: 5,
            question: 'ما هو Foreign Key؟',
            type: 'multiple',
            options: [
              'مفتاح يربط جدولين',
              'مفتاح خارجي للنظام',
              'نوع من الفهرس',
              'أمر SQL'
            ],
            correctAnswer: 0
          },
          {
            id: 6,
            question: 'ما الأمر لحذف سجل؟',
            type: 'multiple',
            options: ['REMOVE', 'DELETE', 'DROP', 'ERASE'],
            correctAnswer: 1
          },
          {
            id: 7,
            question: 'ما هو JOIN؟',
            type: 'multiple',
            options: [
              'دمج البيانات من جداول متعددة',
              'إضافة صفوف جديدة',
              'حذف بيانات مكررة',
              'ترتيب البيانات'
            ],
            correctAnswer: 0
          },
          {
            id: 8,
            question: 'ما الفرق بين WHERE و HAVING؟',
            type: 'multiple',
            options: [
              'لا يوجد فرق',
              'WHERE للصفوف و HAVING للمجموعات',
              'HAVING أسرع',
              'WHERE فقط مع SELECT'
            ],
            correctAnswer: 1
          }
        ]
      },
    ],
    assignments: [
      { id: 3, title: 'تاسك 1: تصميم قاعدة بيانات', deadline: '2023-11-28', submissions: [], total: 2, status: 'active' },
    ],
  },
  {
    id: 3,
    instructorId: DEFAULT_INSTRUCTOR_ID,
    sectionCode: 'GHI789',
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
      { id: 4, title: 'كويز 1: OSI Model', questions: 8, duration: '15 دقيقة', status: 'closed', date: '2023-11-08', questionsData: [] },
      { 
        id: 5, 
        title: 'كويز 2: TCP/IP', 
        questions: 10, 
        duration: '15 دقيقة', 
        status: 'active', 
        date: '2023-11-22',
        questionsData: [
          {
            id: 1,
            question: 'ما هو عدد طبقات نموذج TCP/IP؟',
            type: 'multiple',
            options: ['3', '4', '5', '7'],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'ما هي وظيفة بروتوكول IP؟',
            type: 'multiple',
            options: [
              'توجيه الحزم عبر الشبكة',
              'تشفير البيانات',
              'ضغط الملفات',
              'إدارة الذاكرة'
            ],
            correctAnswer: 0
          },
          {
            id: 3,
            question: 'ما الفرق بين TCP و UDP؟',
            type: 'multiple',
            options: [
              'TCP موثوق و UDP غير موثوق',
              'UDP أسرع فقط',
              'لا يوجد فرق',
              'TCP للصوت فقط'
            ],
            correctAnswer: 0
          },
          {
            id: 4,
            question: 'ما هو عنوان IP؟',
            type: 'multiple',
            options: [
              'معرّف فريد للجهاز على الشبكة',
              'كلمة مرور الشبكة',
              'اسم الجهاز',
              'نوع الكيبل'
            ],
            correctAnswer: 0
          },
          {
            id: 5,
            question: 'ما هو DNS؟',
            type: 'multiple',
            options: [
              'نظام تحويل الأسماء لعناوين IP',
              'بروتوكول للبريد الإلكتروني',
              'نوع من الفيروسات',
              'جدار حماية'
            ],
            correctAnswer: 0
          },
          {
            id: 6,
            question: 'ما هي وظيفة Router؟',
            type: 'multiple',
            options: [
              'توجيه البيانات بين الشبكات',
              'تخزين البيانات',
              'طباعة المستندات',
              'عرض الصور'
            ],
            correctAnswer: 0
          }
        ]
      },
    ],
    assignments: [
      { id: 4, title: 'تاسك 1: Network Design', deadline: '2023-11-30', submissions: [], total: 3, status: 'active' },
    ],
  },
];

export const SectionProvider = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [sections, setSections] = useState([]);

  // Initialize sections from localStorage or use default data
  useEffect(() => {
    const storedSections = localStorage.getItem('sections_data');
    
    if (storedSections) {
      const parsedSections = JSON.parse(storedSections);
      // Ensure all sections have instructorId and sectionCode
      const migratedSections = parsedSections.map(section => {
        if (!section.instructorId) {
          section.instructorId = DEFAULT_INSTRUCTOR_ID;
        }
        if (!section.sectionCode) {
          section.sectionCode = generateSectionCode();
        }
        return section;
      });
      setSections(migratedSections);
      localStorage.setItem('sections_data', JSON.stringify(migratedSections));
    } else {
      // First time: initialize with default data
      setSections(sectionsData);
      localStorage.setItem('sections_data', JSON.stringify(sectionsData));
    }
  }, []);

  // Load students from localStorage and merge with sections
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
    
    if (storedStudents.length > 0 && sections.length > 0) {
      setSections(prevSections => {
        return prevSections.map(section => {
          // Find students belonging to this section (by section code or number)
          const sectionStudents = storedStudents.filter(s => 
            s.sectionCode === section.sectionCode || s.section === section.number
          );
          
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
  }, [sections.length]);

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

  /**
   * Get section by code
   */
  const getSectionByCode = (code) => {
    return sections.find(s => s.sectionCode === code) || null;
  };

  /**
   * Filter sections by instructor ID
   */
  const getInstructorSections = (instructorId) => {
    return sections.filter(s => s.instructorId === instructorId);
  };

  const addSection = (sectionData) => {
    setSections(prevSections => {
      const newSection = {
        ...sectionData,
        id: Date.now(),
        sectionCode: generateSectionCode(),
        students: [],
        quizzes: [],
        assignments: [],
        instructorId: sectionData.instructorId || DEFAULT_INSTRUCTOR_ID // Ensure instructorId is set
      };

      const updatedSections = [...prevSections, newSection];
      localStorage.setItem('sections_data', JSON.stringify(updatedSections));
      return updatedSections;
    });
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
    <SectionContext.Provider value={{ 
      selectedSection, 
      sections, 
      selectSection, 
      clearSection, 
      getSectionByCode,
      getInstructorSections,
      addSection, // Add this
      addAssignment, 
      addQuiz, 
      updateQuizQuestions, 
      submitAssignment 
    }}>
      {children}
    </SectionContext.Provider>
  );
};
