import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { InstructorProvider } from './context/InstructorContext';
import { SectionProvider } from './context/SectionContext';
import AppRoutes from './routes/AppRoutes';
import { useInitializeDefaultData } from './hooks/useInitializeDefaultData';

function App() {
  // Initialize default instructor for testing
  useInitializeDefaultData();

  return (
    <Router>
      <InstructorProvider>
        <SectionProvider>
          <AppRoutes />
        </SectionProvider>
      </InstructorProvider>
    </Router>
  );
}

export default App;
