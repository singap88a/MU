import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SectionProvider } from './context/SectionContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import Login from './pages/Login';
import SectionSelection from './pages/SectionSelection';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AttendanceScanner from './pages/AttendanceScanner';
import AttendanceGrading from './pages/AttendanceGrading';
import Quizzes from './pages/Quizzes';
import QuizDetails from './pages/QuizDetails';
import TakeQuiz from './pages/TakeQuiz';
import Assignments from './pages/Assignments';
import AssignmentDetails from './pages/AssignmentDetails';
import SubmitAssignment from './pages/SubmitAssignment';
import StudentProfile from './pages/StudentProfile';
import StudentLogin from './pages/Login'; // Updated to use the unified Login page
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import StudentQuiz from './pages/StudentQuiz';
import StudentQuizResult from './pages/StudentQuizResult';

function App() {
  return (
    <Router>
      <SectionProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          
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

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
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
      </SectionProvider>
    </Router>
  );
}

export default App;
