import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SectionProvider } from './context/SectionContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <SectionProvider>
        <AppRoutes />
      </SectionProvider>
    </Router>
  );
}

export default App;
