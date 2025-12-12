import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateSectionCode, getInstructorByEmail } from '../lib/instructorUtils';

const InstructorContext = createContext();

export const useInstructorContext = () => {
  const context = useContext(InstructorContext);
  if (!context) {
    throw new Error('useInstructorContext must be used within InstructorProvider');
  }
  return context;
};

export const InstructorProvider = ({ children }) => {
  const [currentInstructor, setCurrentInstructor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load instructor from localStorage on mount
  useEffect(() => {
    const storedInstructorId = localStorage.getItem('currentInstructorId');
    if (storedInstructorId) {
      const instructors = JSON.parse(localStorage.getItem('instructors') || '[]');
      const instructor = instructors.find(i => i.id === parseInt(storedInstructorId));
      if (instructor) {
        setCurrentInstructor(instructor);
        setIsAuthenticated(true);
      }
    }
  }, []);

  /**
   * Register a new instructor
   */
  const registerInstructor = (instructorData) => {
    const instructors = JSON.parse(localStorage.getItem('instructors') || '[]');
    
    // Check if email already exists
    const existingInstructor = instructors.find(i => i.email === instructorData.email);
    if (existingInstructor) {
      throw new Error('البريد الإلكتروني مسجل بالفعل');
    }

    const newInstructor = {
      id: Date.now(),
      name: instructorData.name,
      email: instructorData.email,
      password: instructorData.password, // In production, this should be hashed
      department: instructorData.department || '',
      university: instructorData.university || '',
      createdAt: new Date().toISOString(),
    };

    instructors.push(newInstructor);
    localStorage.setItem('instructors', JSON.stringify(instructors));
    
    return newInstructor;
  };

  /**
   * Login instructor
   */
  const loginInstructor = (email, password) => {
    const instructor = getInstructorByEmail(email);
    
    if (!instructor) {
      throw new Error('البريد الإلكتروني غير مسجل');
    }

    if (instructor.password !== password) {
      throw new Error('كلمة المرور غير صحيحة');
    }

    setCurrentInstructor(instructor);
    setIsAuthenticated(true);
    localStorage.setItem('currentInstructorId', instructor.id.toString());
    
    return instructor;
  };

  /**
   * Logout instructor
   */
  const logoutInstructor = () => {
    setCurrentInstructor(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentInstructorId');
    localStorage.removeItem('selectedSectionId');
  };

  /**
   * Create a new section for the current instructor
   */
  const createSection = (sectionData) => {
    if (!currentInstructor) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
    
    // Generate unique section code
    let sectionCode = generateSectionCode();
    // Ensure uniqueness
    while (sections.some(s => s.sectionCode === sectionCode)) {
      sectionCode = generateSectionCode();
    }

    const newSection = {
      id: Date.now(),
      instructorId: currentInstructor.id,
      sectionCode: sectionCode,
      number: sectionData.number || (sections.length + 1).toString(),
      year: sectionData.year,
      department: sectionData.department,
      subject: sectionData.subject,
      day: sectionData.day,
      time: sectionData.time,
      location: sectionData.location,
      students: [],
      quizzes: [],
      assignments: [],
      createdAt: new Date().toISOString(),
    };

    sections.push(newSection);
    localStorage.setItem('sections_data', JSON.stringify(sections));
    
    return newSection;
  };

  /**
   * Get sections for current instructor
   */
  const getInstructorSections = () => {
    if (!currentInstructor) return [];
    
    const sections = JSON.parse(localStorage.getItem('sections_data') || '[]');
    return sections.filter(s => s.instructorId === currentInstructor.id);
  };

  const value = {
    currentInstructor,
    isAuthenticated,
    registerInstructor,
    loginInstructor,
    logoutInstructor,
    createSection,
    getInstructorSections,
  };

  return (
    <InstructorContext.Provider value={value}>
      {children}
    </InstructorContext.Provider>
  );
};
