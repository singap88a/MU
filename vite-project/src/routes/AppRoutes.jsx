import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../features/admin/layouts/DashboardLayout';
import { AuthLayout } from '../features/auth/layouts/AuthLayout';
import Login from '../features/auth/Login';
import InstructorRegister from '../features/auth/InstructorRegister';
import StudentLogin from '../features/auth/StudentLogin';
import StudentRegister from '../features/auth/StudentRegister';
import SectionSelection from '../features/admin/sections/SectionSelection';
import Dashboard from '../features/admin/dashboard/Dashboard';
import Students from '../features/admin/students/Students';
import AttendanceScanner from '../features/admin/attendance/AttendanceScanner';
import AttendanceGrading from '../features/admin/attendance/AttendanceGrading';
import Quizzes from '../features/admin/quizzes/Quizzes';
import QuizDetails from '../features/admin/quizzes/QuizDetails';
import TakeQuiz from '../features/student/quizzes/TakeQuiz';
import Assignments from '../features/admin/assignments/Assignments';
import AssignmentDetails from '../features/admin/assignments/AssignmentDetails';
import SubmitAssignment from '../features/student/assignments/SubmitAssignment';
import StudentProfile from '../features/student/profile/StudentProfile';
import StudentDashboard from '../features/student/dashboard/StudentDashboard';
import StudentQuiz from '../features/student/quizzes/StudentQuiz';
import StudentQuizResult from '../features/student/quizzes/StudentQuizResult';
import SuperAdminLayout from '../features/super-admin/SuperAdminLayout';
import SuperAdminDashboard from '../features/super-admin/SuperAdminDashboard';
import InstructorsManagement from '../features/super-admin/InstructorsManagement';
import StudentsManagement from '../features/super-admin/StudentsManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      
      {/* Instructor Routes */}
      <Route path="/instructor/register" element={<InstructorRegister />} />
      
      {/* Student Portal Routes */}
      <Route path="/student/login" element={<Navigate to="/" replace />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/quiz/:quizId" element={<StudentQuiz />} />
      <Route path="/student/quiz/result" element={<StudentQuizResult />} />

      {/* Section Selection (Admin/Teacher Entry) */}
      <Route path="/select-section" element={<SectionSelection />} />

      {/* Public Student Pages (Legacy/Direct Links) */}
      <Route path="/take-quiz/:sectionId/:quizId" element={<TakeQuiz />} />
      <Route path="/submit-assignment/:sectionId/:assignmentId" element={<SubmitAssignment />} />

      {/* Super Admin Routes - Platform Management */}
      <Route path="/admin" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="instructors" element={<InstructorsManagement />} />
        <Route path="students" element={<StudentsManagement />} />
        <Route path="settings" element={<div>صفحة الإعدادات (قريباً)</div>} />
      </Route>

      {/* Instructor Dashboard Routes (Renamed to avoid conflict) */}
      <Route path="/instructor-dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="attendance" element={<AttendanceScanner />} />
        <Route path="grading" element={<AttendanceGrading />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="quizzes/:quizId" element={<QuizDetails />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignments/:assignmentId" element={<AssignmentDetails />} />
        <Route path="student/:id" element={<StudentProfile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/select-section" replace />} />
    </Routes>
  );
};

export default AppRoutes;
