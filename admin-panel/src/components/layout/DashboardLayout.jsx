// DashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
          const [isCollapsed, setIsCollapsed] = useState(false);
          const [mobileOpen, setMobileOpen] = useState(false);

          return (
                    <div className="min-h-screen bg-[#Fef9f2] overflow-x-hidden flex flex-col">
                              {/* Sidebar Component directly handles its own smooth mobile transition styling */}
                              <Sidebar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                        mobileOpen={mobileOpen}
                                        setMobileOpen={setMobileOpen}
                              />

                              {/* Backdrop overlay for mobile viewport */}
                              {mobileOpen && (
                                        <div
                                                  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                                                  onClick={() => setMobileOpen(false)}
                                        />
                              )}

                              {/* Main Content Wrapper (Left padding updates dynamically based on Desktop layout adjustments only) */}
                              <div
                                        className={`transition-all duration-300 min-h-screen flex flex-col flex-1 ${isCollapsed ? 'md:pl-20' : 'md:pl-64'
                                                  }`}
                              >
                                        {/* Header */}
                                        <Header onMenuToggle={() => setMobileOpen(!mobileOpen)} />

                                        {/* Content Panel Area */}
                                        <main className="flex-1 bg-white relative z-0 w-full h-full">
                                                  <Outlet />
                                        </main>
                              </div>
                    </div>
          );
}