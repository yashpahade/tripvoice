import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Menu, Briefcase, ChevronDown, User, LogOut, Heart, 
  Wallet, Plane, Building2, Home as HomeIcon, Palmtree, 
  TrainFront, Bus, Car, Stamp, CreditCard, Shield,
  KeyRound
} from 'lucide-react';
import PromoStrip from './PromoStrip';
import TripNestLogo from '@/components/ui/TripNestLogo';
import { serviceNavItems } from '@/config/navigation';
import { toggleLoginModal, setCurrency } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';

const iconMap = {
  Plane,
  Building2,
  Home: HomeIcon,
  Palmtree,
  TrainFront,
  Bus,
  Car,
  Stamp,
  CreditCard,
  Shield,
  Briefcase
};

const Header = React.memo(({ toggleMobileNav }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const user = useSelector((state) => state.auth?.user || null);
  const currentCurrency = useSelector((state) => state.ui?.currency || 'INR');

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasPassedHero, setHasPassedHero] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setHasPassedHero(true);
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 80);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // On home page: only show navbar once the pinned hero zoom effect completes
    const checkScrollPosition = () => {
      const searchSection = document.getElementById('booking-search-section');
      if (searchSection) {
        const threshold = searchSection.offsetTop - 120;
        setHasPassedHero(window.scrollY >= threshold);
      } else {
        setHasPassedHero(window.scrollY > window.innerHeight * 5.5);
      }
      setIsScrolled(window.scrollY > 80);
    };

    checkScrollPosition();
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [isHome]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setIsProfileOpen(false);
  }, [dispatch]);

  // When header is displayed, it is always crisp white elevated bar
  const isTransparent = false;

  return (
    <header 
      id="site-header"
      className={`transition-all duration-500 z-50 ${
        isHome
          ? hasPassedHero
            ? 'sticky top-0 translate-y-0 opacity-100 bg-white/95 backdrop-blur-md shadow-md border-b border-[#E2E8F0]'
            : 'fixed top-0 left-0 right-0 -translate-y-full opacity-0 pointer-events-none'
          : 'sticky top-0 translate-y-0 opacity-100 bg-white shadow-sm border-b border-[#E2E8F0]'
      }`}
    >
      {(!isHome || hasPassedHero) && <PromoStrip />}

      {/* Top Bar */}
      <div className="max-w-[1240px] mx-auto px-4 h-16 md:h-18 flex items-center justify-between">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button 
            className={`md:hidden p-2 -ml-2 ${isTransparent ? 'text-white' : 'text-[#0F172A]'}`}
            onClick={toggleMobileNav}
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 group" aria-label="TripNest Home">
            <TripNestLogo isDark={isTransparent} />
          </Link>
        </div>

        {/* Right Nav Items */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* 1. List Your Property */}
          <Link
            to="/become-a-partner"
            className={`hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg transition-colors ${
              isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-[#0F172A]'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-[11px] font-bold">List Your Property</p>
              <p className={`text-[9px] ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>Grow your business!</p>
            </div>
          </Link>

          {/* 2. Introducing myBiz */}
          <Link
            to="/corporate-travel"
            className={`hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-lg transition-colors ${
              isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-[#0F172A]'
            }`}
          >
            <div className="px-1.5 py-0.5 rounded bg-[#F97316] text-white text-[10px] font-black tracking-tight shadow-2xs">
              myBiz
            </div>
            <div className="text-left leading-tight">
              <p className="text-[11px] font-bold">Introducing myBiz</p>
              <p className={`text-[9px] ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>Business Travel Solution</p>
            </div>
          </Link>

          {/* 3. My Trips */}
          <Link 
            to="/account/my-trips" 
            className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg transition-colors ${
              isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-[#0F172A]'
            }`}
          >
            <div className="text-teal-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-[11px] font-bold">My Trips</p>
              <p className={`text-[9px] ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>Manage your bookings</p>
            </div>
          </Link>

          {/* 4. Wishlist */}
          <Link 
            to="/account/wishlist" 
            className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg transition-colors ${
              isTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-[#0F172A]'
            }`}
          >
            <div className="text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500/20" />
            </div>
            <div className="text-left leading-tight hidden lg:block">
              <p className="text-[11px] font-bold">Wishlist</p>
              <p className={`text-[9px] ${isTransparent ? 'text-gray-300' : 'text-gray-500'}`}>Save favourites</p>
            </div>
          </Link>

          {/* Admin Console Quick Link */}
          <Link 
            to="/admin" 
            className={`hidden 2xl:flex items-center gap-2 px-2.5 py-1 rounded-lg border border-teal-500/30 transition-colors ${
              isTransparent ? 'bg-teal-950/40 hover:bg-teal-900/60 text-teal-300' : 'bg-teal-50 hover:bg-teal-100 text-teal-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-teal-500" />
            <div className="text-left leading-tight">
              <p className="text-[11px] font-bold">Admin</p>
              <p className="text-[9px] opacity-75">Panel</p>
            </div>
          </Link>

          {/* 5. Login or Create Account Button */}
          {!isAuthenticated ? (
            <button 
              onClick={() => dispatch(toggleLoginModal())}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden sm:inline">Login or Create Account</span>
              <span className="sm:hidden">Login</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
                className="flex items-center gap-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#0F766E] text-white font-black text-xs shadow">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 ${isTransparent ? 'text-white' : 'text-[#0F172A]'}`} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-[#E2E8F0] mb-1">
                    <p className="text-sm font-bold text-[#0F172A] truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  <Link to="/account/profile" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"><User className="w-3.5 h-3.5 text-gray-500"/> Profile</Link>
                  <Link to="/account/my-trips" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"><Briefcase className="w-3.5 h-3.5 text-gray-500"/> My Trips</Link>
                  <Link to="/account/wallet" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"><Wallet className="w-3.5 h-3.5 text-gray-500"/> Wallet</Link>
                  <Link to="/account/travellers" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"><Heart className="w-3.5 h-3.5 text-gray-500"/> Saved Travellers</Link>
                  <div className="border-t border-[#E2E8F0] my-1"></div>
                  <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50"><Shield className="w-3.5 h-3.5 text-teal-600"/> Admin Dashboard</Link>
                  <div className="border-t border-[#E2E8F0] my-1"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left">
                    <LogOut className="w-3.5 h-3.5"/> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 6. Country / Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              onBlur={() => setTimeout(() => setIsCurrencyOpen(false), 200)}
              className={`flex items-center gap-1.5 text-xs font-bold py-1.5 px-2 rounded-lg transition-colors ${
                isTransparent 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-[#0F172A] hover:bg-slate-100'
              }`}
            >
              <span className="text-sm">🇮🇳</span>
              <span>INR</span>
              <span className="opacity-40">|</span>
              <span className="hidden sm:inline">English</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl py-2 z-50">
                <button 
                  onClick={() => dispatch(setCurrency('INR'))}
                  className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"
                >
                  <span>🇮🇳 Indian Rupee (INR)</span>
                  {currentCurrency === 'INR' && <span className="text-[#0D9488]">✓</span>}
                </button>
                <button 
                  onClick={() => dispatch(setCurrency('USD'))}
                  className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"
                >
                  <span>🇺🇸 US Dollar (USD)</span>
                  {currentCurrency === 'USD' && <span className="text-[#0D9488]">✓</span>}
                </button>
                <button 
                  onClick={() => dispatch(setCurrency('AED'))}
                  className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-[#F8FAFC]"
                >
                  <span>🇦🇪 UAE Dirham (AED)</span>
                  {currentCurrency === 'AED' && <span className="text-[#0D9488]">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Tabs Row (ONLY on non-home pages to prevent DOM duplication on Home) */}
      {(!isHome && isScrolled) && (
        <div className="border-t border-[#E2E8F0] bg-white transition-all">
          <div className="max-w-[1240px] mx-auto px-4">
            <nav className="flex overflow-x-auto hide-scrollbar sm:justify-center" aria-label="Services">
              <ul className="flex items-center gap-1 sm:gap-6 py-1">
                {serviceNavItems?.map((item) => {
                  const Icon = iconMap[item.icon] || Plane;
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <li key={item.id} className="flex-shrink-0">
                      <Link 
                        to={item.path}
                        className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all border-b-2 ${
                          isActive 
                            ? 'border-[#0D9488] text-[#0D9488]' 
                            : 'border-transparent text-gray-600 hover:text-[#0F172A] hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-bold whitespace-nowrap">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
