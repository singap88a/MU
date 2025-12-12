/**
 * Super Admin Utility Functions
 * Handles verification codes and global platform data
 */

export const generateVerificationCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 for clarity
  let code = '';
  // Format: XXX-XXXX-XXX (e.g., FAC-9X2A-8B)
  
  // Prefix
  code += 'FAC-';
  
  // Middle part
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  code += '-';
  
  // Last part
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
};

export const saveVerificationCode = (code) => {
  const codes = JSON.parse(localStorage.getItem('verification_codes') || '[]');
  const newCode = {
    code,
    status: 'unused', // unused, used
    createdAt: new Date().toISOString(),
    usedBy: null,
    usedAt: null
  };
  
  codes.push(newCode);
  localStorage.setItem('verification_codes', JSON.stringify(codes));
  return newCode;
};

export const getVerificationCodes = () => {
  return JSON.parse(localStorage.getItem('verification_codes') || '[]');
};

export const validateAndUseCode = (inputCode) => {
  // Allow hardcoded fallback for dev/testing if needed, or remove for production STRICT mode
  if (inputCode === 'FACULTY-2024') return true;

  const codes = getVerificationCodes();
  const codeIndex = codes.findIndex(c => c.code === inputCode && c.status === 'unused');
  
  if (codeIndex === -1) {
    throw new Error('كود التحقق غير صحيح أو تم استخدامه مسبقاً');
  }
  
  // Mark as used
  codes[codeIndex].status = 'used';
  codes[codeIndex].usedAt = new Date().toISOString();
  
  localStorage.setItem('verification_codes', JSON.stringify(codes));
  return true;
};

export const getAllPlatformStats = () => {
  const instructors = JSON.parse(localStorage.getItem('instructors') || '[]');
  const students = JSON.parse(localStorage.getItem('students') || '[]'); // Assuming we store students separately or aggregate them
  const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
  
  // Aggregate students from sections if main students list is not complete source of truth
  // For this app, it seems students are stored in students array in localStorage? 
  // Let's assume 'students' key is the master list as per verify auth logic
  
  const codes = getVerificationCodes();
  
  return {
    totalInstructors: instructors.length,
    totalStudents: students.length,
    totalSections: sections.length,
    pendingCodes: codes.filter(c => c.status === 'unused').length
  };
};
