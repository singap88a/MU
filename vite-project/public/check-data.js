// Quick test to check localStorage sections
console.log('=== Checking Sections Data ===');
const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');

console.log('Total sections:', sections.length);

sections.forEach(s => {
  console.log(`\nSection Code: ${s.sectionCode}`);
  console.log(`  - Number: ${s.number}`);
  console.log(`  - Subject: ${s.subject}`);
  console.log(`  - Total Quizzes: ${s.quizzes?.length || 0}`);
  console.log(`  - Active Quizzes: ${s.quizzes?.filter(q => q.status === 'active').length || 0}`);
  
  if (s.quizzes) {
    s.quizzes.forEach(q => {
      console.log(`    • ${q.title} - Status: ${q.status} - Questions: ${q.questionsData?.length || 0}`);
    });
  }
});

console.log('\n=== Students ===');
const students = JSON.parse(localStorage.getItem('students') || '[]');
console.log('Total students:', students.length);
students.forEach(st => {
  console.log(`- ${st.name}: Section Code = ${st.sectionCode}, Section = ${st.section}`);
});
