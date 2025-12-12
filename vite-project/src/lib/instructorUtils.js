/**
 * Generate a unique 6-character section code
 * Format: ABC123 (3 uppercase letters + 3 numbers)
 */
export const generateSectionCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let code = '';
  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return code;
};

/**
 * Validate if a section code exists
 * @param {string} code - The section code to validate
 * @returns {boolean} - True if code exists
 */
export const validateSectionCode = (code) => {
  const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
  return sections.some(section => section.sectionCode === code);
};

/**
 * Get section by code
 * @param {string} code - The section code
 * @returns {Object|null} - Section object or null
 */
export const getSectionByCode = (code) => {
  const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
  return sections.find(section => section.sectionCode === code) || null;
};

/**
 * Get all sections for a specific instructor
 * @param {number} instructorId - The instructor ID
 * @returns {Array} - Array of sections
 */
export const getInstructorSections = (instructorId) => {
  const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
  return sections.filter(section => section.instructorId === instructorId);
};

/**
 * Get instructor by ID
 * @param {number} id - The instructor ID
 * @returns {Object|null} - Instructor object or null
 */
export const getInstructorById = (id) => {
  const instructors = JSON.parse(localStorage.getItem('instructors') || '[]');
  return instructors.find(instructor => instructor.id === id) || null;
};

/**
 * Get instructor by email
 * @param {string} email - The instructor email
 * @returns {Object|null} - Instructor object or null
 */
export const getInstructorByEmail = (email) => {
  const instructors = JSON.parse(localStorage.getItem('instructors') || '[]');
  return instructors.find(instructor => instructor.email === email) || null;
};
