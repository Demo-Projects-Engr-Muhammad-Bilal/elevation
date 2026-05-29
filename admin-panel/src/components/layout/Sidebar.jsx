// Sidebar.jsx
import {
  ChevronLeft,
  ChevronRight,
  LayoutTemplate,
  LogOut,
  Package,
  Users,
  ShoppingCart,
  Tags
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar({ isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }) {
  const { logout } = useAuth();

  const menuItems = [
    { title: "Products", icon: <Package className="h-5 w-5" strokeWidth={1.5} />, path: "/products" },
    { title: "Hero Section", icon: <LayoutTemplate className="h-5 w-5" strokeWidth={1.5} />, path: "/hero" },
    { title: "Categories", icon: <Tags className="h-5 w-5" strokeWidth={1.5} />, path: "/categories" },
    { title: "Orders", icon: <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />, path: "/orders" },
    { title: "Subscribers", icon: <Users className="h-5 w-5" strokeWidth={1.5} />, path: "/subscribers" }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen border-r border-[#D1CDC7] bg-white flex flex-col justify-between transition-all duration-300 ease-in-out
        w-64 ${isCollapsed ? 'md:w-20' : 'md:w-64'} 
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Top Logo Section */}
      <div>
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#D1CDC7]/60">
          <span className={`font-display text-sm font-bold tracking-[0.3em] uppercase text-black ${isCollapsed ? 'md:hidden' : 'block'}`}>
            Elevation
          </span>
          {isCollapsed && (
            <span className="font-display text-sm font-bold tracking-wider text-black mx-auto hidden md:block px-3">
              E
            </span>
          )}

          {/* Collapse Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1 rounded-md hover:bg-[#Fef9f2] text-gray-500 hover:text-black transition-colors"
          >
            {isCollapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 my-6">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setMobileOpen?.(false)}
              className={({ isActive }) => `
                flex items-center gap-4 px-3 py-3 rounded-md text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-200
                ${isActive ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:bg-[#Fef9f2] hover:text-black'}
                ${isCollapsed ? 'md:justify-center md:px-0' : ''}
              `}
              title={item.title}
            >
              <span className={`flex-shrink-0 ${isCollapsed ? 'mx-auto md:mx-0' : ''}`}>{item.icon}</span>
              <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 🛠️ DESKTOP ONLY LOGOUT (Hidden on mobile) */}
      <div className="hidden md:block p-4 border-t border-[#D1CDC7]/60">
        <button
          onClick={logout}
          className={`flex items-center gap-4 w-full px-3 py-3 rounded-md text-[11px] font-medium uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-all duration-200 
            ${isCollapsed ? 'md:justify-center md:px-0' : ''}
          `}
          title="Logout"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
          <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
}