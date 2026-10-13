import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plane, Building2, TrainFront, Briefcase } from 'lucide-react';

const MobileNav = React.memo(() => {
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'flights', label: 'Flights', icon: Plane, path: '/flights' },
    { id: 'hotels', label: 'Hotels', icon: Building2, path: '/hotels' },
    { id: 'trains', label: 'Trains', icon: TrainFront, path: '/railways' },
    { id: 'mytrips', label: 'My Trips', icon: Briefcase, path: '/account/my-trips' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <nav className="flex justify-around items-center h-16 px-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                active ? 'text-[#0D9488]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'fill-teal-50 stroke-[#0D9488]' : 'stroke-current'}`} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${active ? 'text-[#0D9488]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
});

MobileNav.displayName = 'MobileNav';

export default MobileNav;
