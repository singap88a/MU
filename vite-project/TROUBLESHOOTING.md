# كيفية حل مشكلة عدم ظهور الكويزات

## المشكلة
الطالب مسجل بنجاح لكن ما بيشوفش الكويزات في الداشبورد.

## الحل

### 1. افتح Console في المتصفح (F12)
اضغط F12 وروح على تبويب Console

### 2. شغّل الكود التالي
الصق الكود ده في الConsole واضغط Enter:

```javascript
// عرض كل الأكواد المتاحة
const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
console.log('=== الأكواد المتاحة ===');
sections.forEach(s => {
  console.log(`\nكود: ${s.sectionCode}`);
  console.log(`  السكشن: ${s.number} - ${s.subject}`);
  console.log(`  الكويزات النشطة: ${s.quizzes?.filter(q => q.status === 'active').length || 0}`);
});

// عرض بيانات الطالب الحالي
const student = JSON.parse(localStorage.getItem('currentUser') || '{}');
console.log('\n=== بيانات الطالب ===');
console.log('الاسم:', student.name);
console.log('كود السكشن:', student.sectionCode);
console.log('رقم السكشن:', student.section);
```

### 3. تأكد من البيانات الصحيحة
الأكواد الصحيحة هي:
- **ABC123** - سكشن 1 (هندسة البرمجيات) - 10 أسئلة
- **DEF456** - سكشن 2 (قواعد البيانات) - 8 أسئلة
- **GHI789** - سكشن 3 (الشبكات) - 6 أسئلة

### 4. إعادة التسجيل
إذا كان الكود مختلف، سجل خروج وسجل مرة تانية بالكود الصحيح:

```javascript
// حذف بيانات الطالب الحالي
localStorage.removeItem('currentUser');
// ثم ارجع لصفحة التسجيل
window.location.href = '/student/register';
```

### 5. إعادة تحميل البيانات الافتراضية
إذا كانت البيانات مش موجودة، شغّل الكود ده:

```javascript
// حذف كل البيانات وإعادة تحميل الصفحة
localStorage.clear();
location.reload();
```

## مع تحديث الكود
- زوّدت console logging عشان نشوف إيه اللي بيحصل
- افتح Console وهتشوف رسائل تفصيلية عن الكويزات
