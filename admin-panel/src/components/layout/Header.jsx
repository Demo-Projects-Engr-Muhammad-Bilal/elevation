// Header.jsx
import { useState } from 'react';
import { Bell, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Header({ onMenuToggle }) {
          const { user, logout } = useAuth();
          const [open, setOpen] = useState(false);

          return (
                    <header className="h-20 bg-white border-b border-[#D1CDC7] sticky top-0 z-30 px-4 md:px-10 flex items-center justify-between">
                              {/* Left side: Mobile Menu Button & Dashboard Title */}
                              <div className="flex items-center gap-2 md:gap-4">
                                        <button
                                                  onClick={onMenuToggle}
                                                  className="md:hidden p-2 rounded-md hover:bg-[#Fef9f2] text-black flex items-center justify-center"
                                        >
                                                  <Menu className="h-5 w-5" />
                                        </button>
                                        <h1 className="text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] md:tracking-[0.25em] text-gray-400 whitespace-nowrap">
                                                  Admin Console
                                        </h1>
                              </div>

                              {/* Right side: Admin Info & Mobile Logout */}
                              <div className="flex items-center gap-2 md:gap-6">
                                        {/* MOBILE ONLY LOGOUT BUTTON (Hidden on Desktop) */}
                                        <button
                                                  onClick={logout}
                                                  className="md:hidden p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center justify-center"
                                                  title="Logout"
                                        >
                                                  <LogOut className="h-4.5 w-4.5" strokeWidth={1.8} />
                                        </button>

                                        {/* User Profile Info */}
                                        <div className="relative">
                                                  <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-5 border-l border-gray-200 md:border-l-0">
                                                            {/* Desktop: inline text (hidden on small screens) */}
                                                            <div className="flex flex-col items-end hidden sm:flex">
                                                                      <span className="text-[11px] font-medium uppercase tracking-wider text-black">
                                                                                Admin
                                                                      </span>
                                                                      <span className="text-[10px] text-gray-400">
                                                                                {user?.email || 'admin@maisonedit.com'}
                                                                      </span>
                                                            </div>

                                                            {/* Mobile: icon trigger (visible on small screens only) */}
                                                            <div className="flex items-center sm:hidden">
                                                                      <button
                                                                                type="button"
                                                                                onClick={() => setOpen((v) => !v)}
                                                                                aria-expanded={open}
                                                                                aria-controls="mobile-profile-dropdown"
                                                                                className="h-8 w-8 md:h-9 md:w-9 bg-[#Fef9f2] border border-[#D1CDC7] rounded-full flex items-center justify-center text-black flex-shrink-0 cursor-pointer"
                                                                      >
                                                                                <User className="h-4 w-4" strokeWidth={1.5} />
                                                                      </button>
                                                            </div>

                                                            {/* Desktop icon (keeps original look) */}
                                                            <div className="hidden sm:flex">
                                                                      <div className="h-8 w-8 md:h-9 md:w-9 bg-[#Fef9f2] border border-[#D1CDC7] rounded-full flex items-center justify-center text-black flex-shrink-0">
                                                                                <User className="h-4 w-4" strokeWidth={1.5} />
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Mobile dropdown panel (toggles on icon click) */}
                                                  <div
                                                            id="mobile-profile-dropdown"
                                                            className={`sm:hidden absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-md shadow-lg z-50 transform origin-top-right transition-all ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                                                                      }`}
                                                            role="menu"
                                                            aria-hidden={!open}
                                                  >
                                                            <div className="px-3 py-2">
                                                                      <div className="flex items-center justify-between">
                                                                                <div>
                                                                                          <div className="text-xs font-semibold uppercase text-gray-700">Admin</div>
                                                                                          <div className="mt-1 text-[13px] text-gray-500 break-words">
                                                                                                    {user?.email || 'admin@maisonedit.com'}
                                                                                          </div>
                                                                                </div>

                                                  
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </header>
          );
}
