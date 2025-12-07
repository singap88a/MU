import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { useSectionContext } from '../context/SectionContext';

export function DashboardLayout() {
  const { selectedSection } = useSectionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedSection) {
      navigate('/select-section', { replace: true });
    }
  }, [selectedSection, navigate]);

  if (!selectedSection) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-secondary-50 dark:bg-secondary-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
