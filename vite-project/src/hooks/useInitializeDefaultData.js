import { useEffect } from 'react';

/**
 * Initialize default instructor for testing
 * This component should be included once in the app to set up test data
 */
export const useInitializeDefaultData = () => {
  useEffect(() => {
    // Create default instructor if not exists
    const instructors = JSON.parse(localStorage.getItem('instructors') || '[]');
    
    if (!instructors.find(i => i.email === 'instructor@edu.eg')) {
      const defaultInstructor = {
        id: 1,
        name: 'د. أحمد محمد',
        email: 'instructor@edu.eg',
        password: '123456',
        department: 'علوم الحاسب',
        university: 'جامعة القاهرة',
        createdAt: new Date().toISOString(),
      };
      
      instructors.push(defaultInstructor);
      localStorage.setItem('instructors', JSON.stringify(instructors));
      
      console.log('✅ Default instructor initialized');
    }

    // Force update sections to ensure correct codes and questions
    const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
    let updated = false;

    // Patch Section 1
    const s1 = sections.find(s => s.number === '1');
    if (s1 && s1.sectionCode !== 'ABC123') {
      s1.sectionCode = 'ABC123';
      s1.instructorId = 1;
      
      // Ensure quiz questions exist
      if (!s1.quizzes || !s1.quizzes[1].questionsData) {
         s1.quizzes = [
            { id: 1, title: 'كويز 1: مقدمة في البرمجة', questions: 10, duration: '15 دقيقة', status: 'closed', date: '2023-11-10', questionsData: [] },
            { 
              id: 2, 
              title: 'كويز 2: المتغيرات والدوال', 
              questions: 10, 
              duration: '20 دقيقة', 
              status: 'active', 
              date: '2023-11-20',
              questionsData: [
                  { id: 1, question: 'ما هي المتغيرات في البرمجة؟', type: 'multiple', options: ['مساحات لتخزين البيانات', 'أوامر لتنفيذ العمليات', 'وظائف لمعالجة البيانات', 'ملفات لحفظ الكود'], correctAnswer: 0 },
                  { id: 2, question: 'أي من الأنواع التالية يستخدم لتخزين النصوص؟', type: 'multiple', options: ['int', 'string', 'boolean', 'float'], correctAnswer: 1 },
                  { id: 3, question: 'ما هو الناتج من العملية: 5 + 3 * 2', type: 'multiple', options: ['16', '11', '13', '10'], correctAnswer: 1 },
                  { id: 4, question: 'ما هي الدالة (Function)؟', type: 'multiple', options: ['مجموعة من الأوامر المجمعة معاً', 'متغير يحتوي على قيمة', 'نوع من أنواع البيانات', 'طريقة لكتابة التعليقات'], correctAnswer: 0 },
                  { id: 5, question: 'أي رمز يستخدم للتعليق في JavaScript؟', type: 'multiple', options: ['#', '//', '/*', '%%'], correctAnswer: 1 },
                  { id: 6, question: 'ما هو Boolean؟', type: 'multiple', options: ['نوع بيانات يحتوي فقط على true أو false', 'نوع بيانات للأرقام', 'نوع بيانات للنصوص', 'نوع بيانات للقوائم'], correctAnswer: 0 },
                  { id: 7, question: 'ما الفرق بين == و ===؟', type: 'multiple', options: ['لا يوجد فرق', '=== تقارن القيمة والنوع معاً', '== أسرع في التنفيذ', '=== تستخدم فقط مع الأرقام'], correctAnswer: 1 },
                  { id: 8, question: 'كيف نعلن عن متغير في JavaScript؟', type: 'multiple', options: ['var x', 'let x', 'const x', 'كل ما سبق'], correctAnswer: 3 },
                  { id: 9, question: 'ما هي قيمة x بعد: let x = 10; x += 5;', type: 'multiple', options: ['10', '15', '5', '105'], correctAnswer: 1 },
                  { id: 10, question: 'ما هو typeof operator؟', type: 'multiple', options: ['يستخدم لمعرفة نوع البيانات', 'يستخدم لتحويل البيانات', 'يستخدم لحذف المتغيرات', 'يستخدم لطباعة البيانات'], correctAnswer: 0 }
              ]
            }
         ];
      }
      updated = true;
    }

    // Patch Section 2
    const s2 = sections.find(s => s.number === '2');
    if (s2 && s2.sectionCode !== 'DEF456') {
      s2.sectionCode = 'DEF456';
      s2.instructorId = 1;
      // Add quiz data if missing (abbreviated for brevity, relying on context to have full data usually, but forcing keys)
      if (!s2.quizzes || !s2.quizzes[0].questionsData) {
         s2.quizzes = [
           { 
            id: 3, 
            title: 'كويز 1: SQL Basics', 
            questions: 8, 
            duration: '20 دقيقة', 
            status: 'active', 
            date: '2023-11-05',
            questionsData: [
                { id: 1, question: 'ما هو SQL؟', type: 'multiple', options: ['لغة للاستعلام عن قواعد البيانات', 'لغة برمجة كائنية', 'نظام تشغيل', 'أداة تصميم'], correctAnswer: 0 },
                { id: 2, question: 'ما الأمر المستخدم لاسترجاع البيانات من جدول؟', type: 'multiple', options: ['GET', 'RETRIEVE', 'SELECT', 'FETCH'], correctAnswer: 2 },
                { id: 3, question: 'ما هو Primary Key؟', type: 'multiple', options: ['مفتاح فريد لتحديد السجلات', 'كلمة مرور الجدول', 'نوع من البيانات', 'أمر SQL'], correctAnswer: 0 },
                { id: 4, question: 'ما الأمر لإضافة سجل جديد؟', type: 'multiple', options: ['ADD', 'INSERT', 'CREATE', 'NEW'], correctAnswer: 1 },
                { id: 5, question: 'ما هو Foreign Key؟', type: 'multiple', options: ['مفتاح يربط جدولين', 'مفتاح خارجي للنظام', 'نوع من الفهرس', 'أمر SQL'], correctAnswer: 0 },
                { id: 6, question: 'ما الأمر لحذف سجل؟', type: 'multiple', options: ['REMOVE', 'DELETE', 'DROP', 'ERASE'], correctAnswer: 1 },
                { id: 7, question: 'ما هو JOIN؟', type: 'multiple', options: ['دمج البيانات من جداول متعددة', 'إضافة صفوف جديدة', 'حذف بيانات مكررة', 'ترتيب البيانات'], correctAnswer: 0 },
                { id: 8, question: 'ما الفرق بين WHERE و HAVING؟', type: 'multiple', options: ['لا يوجد فرق', 'WHERE للصفوف و HAVING للمجموعات', 'HAVING أسرع', 'WHERE فقط مع SELECT'], correctAnswer: 1 }
            ]
           }
         ];
      }
      updated = true;
    }

    // Patch Section 3
    const s3 = sections.find(s => s.number === '3');
    if (s3 && s3.sectionCode !== 'GHI789') {
      s3.sectionCode = 'GHI789';
      s3.instructorId = 1;
        if (!s3.quizzes || !s3.quizzes[1].questionsData) {
         s3.quizzes = [
            { id: 4, title: 'كويز 1: OSI Model', questions: 8, duration: '15 دقيقة', status: 'closed', date: '2023-11-08', questionsData: [] },
            { 
                id: 5, 
                title: 'كويز 2: TCP/IP', 
                questions: 6, 
                duration: '15 دقيقة', 
                status: 'active', 
                date: '2023-11-22',
                questionsData: [
                    { id: 1, question: 'ما هو عدد طبقات نموذج TCP/IP؟', type: 'multiple', options: ['3', '4', '5', '7'], correctAnswer: 1 },
                    { id: 2, question: 'ما هي وظيفة بروتوكول IP؟', type: 'multiple', options: ['توجيه الحزم عبر الشبكة', 'تشفير البيانات', 'ضغط الملفات', 'إدارة الذاكرة'], correctAnswer: 0 },
                    { id: 3, question: 'ما الفرق بين TCP و UDP؟', type: 'multiple', options: ['TCP موثوق و UDP غير موثوق', 'UDP أسرع فقط', 'لا يوجد فرق', 'TCP للصوت فقط'], correctAnswer: 0 },
                    { id: 4, question: 'ما هو عنوان IP؟', type: 'multiple', options: ['معرّف فريد للجهاز على الشبكة', 'كلمة مرور الشبكة', 'اسم الجهاز', 'نوع الكيبل'], correctAnswer: 0 },
                    { id: 5, question: 'ما هو DNS؟', type: 'multiple', options: ['نظام تحويل الأسماء لعناوين IP', 'بروتوكول للبريد الإلكتروني', 'نوع من الفيروسات', 'جدار حماية'], correctAnswer: 0 },
                    { id: 6, question: 'ما هي وظيفة Router؟', type: 'multiple', options: ['توجيه البيانات بين الشبكات', 'تخزين البيانات', 'طباعة المستندات', 'عرض الصور'], correctAnswer: 0 }
                ]
            }
         ];
      }
      updated = true;
    }

    if (updated) {
      localStorage.setItem('sections_data', JSON.stringify(sections));
      console.log('✅ Sections patched with correct codes (ABC123, etc.)');
    }
  }, []);
};

