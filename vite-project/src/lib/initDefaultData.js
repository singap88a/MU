/**
 * Initialize default instructor and sections for testing
 * This file should be run once to set up initial data
 */

// Create default instructor
const defaultInstructor = {
  id: 1,
  name: 'د. أحمد محمد',
  email: 'instructor@edu.eg',
  password: '123456',
  department: 'علوم الحاسب',
  university: 'جامعة القاهرة',
  createdAt: new Date().toISOString(),
};

// Store default instructor
const existingInstructors = JSON.parse(localStorage.getItem('instructors') || '[]');
if (!existingInstructors.find(i => i.id === 1)) {
  existingInstructors.push(defaultInstructor);
  localStorage.setItem('instructors', JSON.stringify(existingInstructors));
  console.log('✓ Default instructor created:', defaultInstructor.email);
}

// Note: Sections are already created with instructorId: 1 and section codes in SectionContext
console.log('✓ Default sections already configured for instructor ID: 1');
console.log('📝 Section Codes:');
console.log('  - ABC123 for سكشن 1');
console.log('  - DEF456 for سكشن 2');
console.log('  - GHI789 for سكشن 3');
console.log('\n🔐 Default Instructor Login:');
console.log('  Email: instructor@edu.eg');
console.log('  Password: 123456');
