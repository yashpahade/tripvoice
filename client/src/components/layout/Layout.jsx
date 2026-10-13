import React, { useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

const Layout = React.memo(() => {
  const { pathname } = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileNavOpen(false);
  }, [pathname]);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Header toggleMobileNav={toggleMobileNav} />
      
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>
      
      <Footer />
      <MobileNav />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
